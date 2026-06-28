export const FARM_SYSTEM = `You are an AI farm data analyst for a dairy operation. Your job is to synthesise incoming data from multiple sources — weigh tickets, lab samples, field operations, DairyComp herd logs, and FeedLync ration records — into clear, actionable summaries.

Rules:
- Be specific: cite actual numbers (DM%, net weights, field names, ticket IDs) rather than vague statements.
- Flag anomalies: DM below target, missing lab samples after harvest, gaps in ticket sequence, SCC trends.
- Separate facts from inference — if you are estimating, say so.
- Keep it tight: farmers are busy. Lead with what matters most right now.
- Use plain language, not academic phrasing.`;

export const PULSE_PROMPT = (context) => `
Produce a brief hourly pulse report based on the farm data below.

Format:
📊 HOURLY PULSE — {timestamp}

ACTIVITY (last hour):
- [list any new weigh tickets, operations, or field events]

FLAGS:
- [any anomalies or items requiring attention]

STANDING STATUS:
- [1-2 sentences on current harvest / ration / herd status]

Data:
${context}
`.trim();

export const DAILY_PROMPT = (context, priorSummaries) => `
Produce a daily farm digest. Cover:
1. Yesterday's harvest activity (loads, fields, total tonnage, average DM%)
2. Feed quality highlights (any lab results, NDF/NEL concerns)
3. Operational notes (any gaps, equipment issues, crew items visible in data)
4. Action items for today

${priorSummaries ? `Recent context from prior summaries:\n${priorSummaries}\n\n` : ''}
Today's data:
${context}
`.trim();

export const WEEKLY_PROMPT = (context, priorSummaries) => `
Produce a weekly farm summary for the week ending today. Cover:
1. Harvest totals by field and cut number
2. Feed quality trend (DM%, NDF, RFV averages vs. targets)
3. Income over feed cost signal (if ticket + lab data supports it)
4. Top 3 risk flags this week
5. Top 3 priorities for next week

${priorSummaries ? `Recent summaries for context:\n${priorSummaries}\n\n` : ''}
This week's data:
${context}
`.trim();
