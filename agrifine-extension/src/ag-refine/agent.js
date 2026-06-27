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

    const systemPrompt = [
      'You are AgriAgent, an expert AI assistant for farm operations management.',
      'You have access to the user\'s farm data through tools — always use them before answering.',
      'When answering questions about fields, weather, yields, or finances: first query the relevant data, then synthesize a clear answer.',
      'Be specific: cite field names, dates, acreage, and numbers from the actual data.',
      'For weather queries on a field, always look up the field profile first to get coordinates.',
      '',
      'FARM CONTEXT (reading list summaries + field profiles):',
      contextBundle,
    ].join('\n');

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

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
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
