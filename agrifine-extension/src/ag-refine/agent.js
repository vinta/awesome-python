import { sessionGet, KEYS, buildContextBundle } from '../utils/storage.js';
import { TOOL_DEFINITIONS, executeTool } from './tools.js';

const MODEL = 'claude-sonnet-4-6';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MAX_ITERATIONS = 10;

/**
 * AgrifineAgent — agentic loop with tool use.
 *
 * Runs entirely in the sidebar context via the background worker proxy.
 * Each call to run() streams back events via an onEvent callback so the
 * UI can update incrementally as the agent thinks and calls tools.
 */
export class AgrifineAgent {
  constructor({ onEvent }) {
    this.onEvent = onEvent; // ({ type, data }) => void
  }

  async run(userMessage) {
    const apiKey = await sessionGet(KEYS.API_KEY);
    if (!apiKey) {
      this.onEvent({ type: 'error', data: 'No API key set. Open ⚙ Settings to add your Anthropic key.' });
      return;
    }

    const contextBundle = await buildContextBundle();

    const systemPrompt = `You are AgriAgent, the dedicated AI advisor for this farm operation. You maintain a persistent "farm memory" — a synthesized knowledge base you build and update over time as you learn more about the operation.

IDENTITY AND ROLE
- You are this farm's trusted advisor with deep, specific knowledge of its fields, crops, soils, finances, and operations.
- You think both tactically (today's weather, this week's harvest window) and strategically (long-term soil health, carbon sequestration, USDA program eligibility).
- Your answers are always grounded in the farm's actual data — never guess or use generic advice when specific data is available.

MEMORY PROTOCOL
- The FARM CONTEXT section below is pre-loaded with all available data from every source, including your previously stored farm memory.
- The farm memory (if present) is the most important section — it is your synthesized understanding of this operation built from prior analysis. Reference it first.
- When you discover something significant (a pattern, risk, or opportunity not already captured), call update_farm_memory to preserve it for future sessions.
- If farm memory is absent or stale (>14 days old), proactively synthesize one after reviewing the available field and file data.

REASONING APPROACH — follow this order:
1. GROUND: What does the farm memory and pre-loaded context already tell me?
2. GAPS: What additional data do I need? Use the right tool — don't query what's already in context.
3. CONNECT: Link data across sources (e.g. soil type + weather + crop history → harvest recommendation).
4. CITE: Always name fields, dates, acreages, and numbers from the actual data.
5. REMEMBER: Did this conversation reveal anything new? If so, update_farm_memory.

TOOL SELECTION GUIDE
- get_field_profiles — field locations, soil type, acreage, crop history, harvest records
- get_weather(lat, lon) — live 7-day forecast + GDD; always get field coordinates first
- lookup_usda_soil(lat, lon) — USDA soil classification and organic matter data
- get_ingested_files — uploaded CSVs, Excel files, PDFs with extracted structured data
- get_reading_list — saved articles, research, USDA notices
- calculate_gdd(highs, lows) — growing degree day accumulation from temperature data
- screenshot_active_tab — capture the current browser page as an image you can see
- get_page_content — read text from the active tab or a saved reading-list URL
- open_tab(url) + read_tab_content(tab_id) — navigate to a URL and parse its content
- export_farm_data — generate and download CSV/JSON of farm data
- get_farm_memory — retrieve the stored farm knowledge snapshot
- update_farm_memory — save new insights about this farm for future sessions

FARM CONTEXT (all data sources pre-loaded — memory, field profiles, ingested files, reading list):
${contextBundle}`;

    const messages = [{ role: 'user', content: userMessage }];

    this.onEvent({ type: 'thinking', data: 'Analysing your question…' });

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const body = {
        model: MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        tools: TOOL_DEFINITIONS,
        messages,
      };

      let response;
      try {
        response = await this._callAPI(apiKey, body);
      } catch (err) {
        this.onEvent({ type: 'error', data: err.message });
        return;
      }

      // Append assistant turn
      messages.push({ role: 'assistant', content: response.content });

      if (response.stop_reason === 'end_turn' || response.stop_reason === 'max_tokens') {
        const text = response.content
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('\n');
        this.onEvent({ type: 'answer', data: text });
        return;
      }

      if (response.stop_reason === 'tool_use') {
        const toolUseBlocks = response.content.filter((b) => b.type === 'tool_use');
        const toolResults = [];

        for (const block of toolUseBlocks) {
          this.onEvent({ type: 'tool_call', data: { name: block.name, input: block.input } });

          let result;
          try {
            result = await executeTool(block.name, block.input);
          } catch (err) {
            result = { error: err.message };
          }

          this.onEvent({ type: 'tool_result', data: { name: block.name, result } });

          // Screenshot tool returns an image — pass it as a vision content block
          if (result && result._type === 'image') {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: [
                {
                  type: 'image',
                  source: { type: 'base64', media_type: result.media_type, data: result.data },
                },
                {
                  type: 'text',
                  text: `Screenshot of "${result.title}" (${result.url})`,
                },
              ],
            });
          } else {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify(result),
            });
          }
        }

        messages.push({ role: 'user', content: toolResults });
        continue;
      }

      // Unexpected stop reason
      this.onEvent({ type: 'error', data: `Unexpected stop reason: ${response.stop_reason}` });
      return;
    }

    this.onEvent({ type: 'error', data: 'Agent reached maximum iterations without completing.' });
  }

  async _callAPI(apiKey, body) {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Anthropic API ${res.status}: ${text}`);
    }

    return res.json();
  }
}
