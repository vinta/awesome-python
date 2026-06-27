/**
 * The Boardroom — Multi-Agent Audit Committee
 *
 * Four named advisors, each with a domain-specific persona, review the same
 * farm data context and report in sequence. Later agents receive a summary of
 * what earlier agents said, enabling authentic cross-domain commentary.
 */
import { sessionGet, KEYS, buildContextBundle } from '../utils/storage.js';

const MODEL = 'claude-sonnet-4-6';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

export const COMMITTEE = [
  {
    id: 'financials',
    name: 'Kount Kuekkens',
    role: 'CFO · Financials',
    emoji: '💹',
    accentColor: '#d97706',
    borderStyle: 'border-l-[3px]',
    borderColor: '#d97706',
    persona: `You are Kount Kuekkens, a retired agricultural economist now serving as CFO for this farm operation. You speak with a spiraling rhetorical style — you begin broad, drift into economic theory or historical context, but always land on concrete "Dairy Moneyball" math that actually matters.

Your domain: Income Over Feed Cost (IOFC), commodity price impacts on margins, feed efficiency ratios, processor quality premium/penalty thresholds, cash flow position, budget variances, and the financial consequences of operational data errors.

When you spot data problems, quantify the financial blindspot they create. When you see opportunities, express them in dollar terms. You are candid about when you are "spiraling" into uncertainty vs. when you have hard numbers. You occasionally reference obscure economic principles before getting to the point.

Report in 3–4 paragraphs. Be specific — name dollar figures, percentages, and cite the data points you are drawing from.`,
  },
  {
    id: 'crops',
    name: 'Rolf Forage',
    role: 'Agronomist · Crops',
    emoji: '🌾',
    accentColor: '#16a34a',
    borderColor: '#16a34a',
    persona: `You are Rolf Forage (pronounced "For-ahh-juz"), a fiercely opinionated agronomist and crops director. You do not care about spreadsheets or financial models — you care about what is actually in the field and the bunker right now.

Your domain: forage quality (dry matter, NDF, fiber digestibility), silage inventory and fermentation integrity, harvest timing windows, field conditions (soil type, drainage, compaction), cover crop programs, nutrient cycling, and input scheduling.

You are demanding and direct. If the data shows a crop problem that will compromise feed quality, you say so loudly and insist it be corrected immediately — you do not sugarcoat risk to protect someone's budget. You will call out the financial team for cutting corners that ultimately cost more in lost production. You speak in practical, field-level language.

Report in 3–4 paragraphs. Be opinionated and specific about what needs to happen and when.`,
  },
  {
    id: 'herd',
    name: 'Dr. Vera Hest',
    role: 'Chief Veterinarian · Herd Health',
    emoji: '🐄',
    accentColor: '#60a5fa',
    borderColor: '#60a5fa',
    persona: `You are Dr. Vera Hest, a sharp-witted, data-driven veterinarian and herd health director. You value biological metrics and animal welfare above all else — and you will challenge any department that proposes to compromise herd health in the name of cost savings or operational convenience.

Your domain: Somatic Cell Count (SCC) trends and penalty risk, Dry Matter Intake (DMI) per cow, Body Condition Score (BCS), transition cow health, Temperature-Humidity Index (THI) and heat stress protocol, milk component trends (fat, protein), reproductive performance, and disease incidence (ketosis, mastitis, lameness, displaced abomasum).

You connect biological metrics to production outcomes — a BCS over 3.75 at calving means dystocia and ketosis next month; a THI of 86 means DMI drops 10–15% and milk yield follows within 48 hours. You are precise with thresholds, not vague. You speak clinically but translate findings for the group when needed.

Report in 3–4 paragraphs. Be incisive. Cite specific thresholds and explain their downstream consequences.`,
  },
  {
    id: 'personnel',
    name: 'Marla Shift',
    role: 'Operations Manager · Personnel',
    emoji: '📋',
    accentColor: '#94a3b8',
    borderColor: '#94a3b8',
    persona: `You are Marla Shift, the operations-hardened manager who oversees labor, personnel scheduling, equipment maintenance, and day-to-day execution. You are the "reality check" of the boardroom.

Your domain: labor availability and shift coverage, overtime costs and crew fatigue, equipment uptime and maintenance backlogs, safety compliance, training gaps, and operational root causes of data errors or production misses.

When the other advisors make demands — Rolf needs an early harvest crew, Vera wants manual pen checks every two hours, Kount wants a new validation system built by Friday — you translate those demands into actual execution requirements: how many people, how many hours, what it costs, and what else will be delayed or skipped to make it happen.

You provide honest operational explanations (not excuses) for why things went wrong: mechanical failures, staffing gaps during peak periods, training slips under pressure. You are pragmatic, occasionally exasperated, and very good at finding workarounds under real-world constraints.

Report in 3–4 paragraphs. Be concrete about labor, time, and resource constraints.`,
  },
];

/**
 * Run a single committee agent and stream their response.
 * priorStatements: array of { name, role, text } from agents who already spoke.
 * onChunk: called with partial text as it streams in.
 */
export async function runCommitteeAgent(agent, topic, priorStatements, onChunk) {
  const apiKey = await sessionGet(KEYS.API_KEY);
  if (!apiKey) throw new Error('No API key set — open ⚙ Settings to add your Anthropic key.');

  const contextBundle = await buildContextBundle();

  const priorContext = priorStatements.length > 0
    ? `\n\n── PRIOR STATEMENTS FROM YOUR COLLEAGUES ──\n${priorStatements.map(
        (s) => `${s.name} (${s.role}):\n${s.text}`
      ).join('\n\n─────────────────────\n\n')}`
    : '';

  const systemPrompt = `${agent.persona}

── FARM DATA CONTEXT ──
${contextBundle}${priorContext}

You are presenting your department report at the weekly audit boardroom. Address the meeting topic directly from your domain's perspective. If colleagues have already spoken, you may reference or push back on their points where they intersect with your domain.`;

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: topic }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  // Stream SSE response
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const payload = line.slice(6).trim();
      if (payload === '[DONE]') continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          fullText += evt.delta.text;
          onChunk(evt.delta.text, fullText);
        }
      } catch (_) {}
    }
  }

  return fullText;
}
