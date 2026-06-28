import 'dotenv/config';
import cron from 'node-cron';
import express from 'express';
import { config } from './config.js';
import { runPulse } from './jobs/pulse.js';
import { runDaily, runWeekly } from './jobs/digest.js';
import { handleGeofenceEvent, getRecentEvents } from './jobs/geofence-handler.js';

// ── HTTP server ──────────────────────────────────────────────────────────────

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// TomTom geofence webhook — configure this URL in TomTom Geofencing API
app.post('/webhook/tomtom', (req, res) => {
  try {
    const event = handleGeofenceEvent(req.body);
    res.json({ ok: true, event });
  } catch (e) {
    console.error('[webhook/tomtom]', e.message);
    res.status(400).json({ ok: false, error: e.message });
  }
});

// WhatsApp inbound messages (Meta sends a GET for verification)
app.get('/webhook/whatsapp', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Forbidden');
  }
});

app.post('/webhook/whatsapp', (req, res) => {
  console.log('[whatsapp webhook]', JSON.stringify(req.body).slice(0, 200));
  res.sendStatus(200);
});

// Status dashboard — last N geofence events
app.get('/status', (_req, res) => {
  res.json({ events: getRecentEvents(50) });
});

// Manual trigger endpoints (for testing)
app.post('/run/pulse',  async (_req, res) => { const s = await runPulse();  res.json({ ok: true, summary: s }); });
app.post('/run/daily',  async (_req, res) => { const s = await runDaily();  res.json({ ok: true, summary: s }); });
app.post('/run/weekly', async (_req, res) => { const s = await runWeekly(); res.json({ ok: true, summary: s }); });

app.listen(config.server.port, () => {
  console.log(`[server] listening on :${config.server.port}`);
});

// ── Scheduler ────────────────────────────────────────────────────────────────

cron.schedule(config.schedule.pulse, async () => {
  try { await runPulse(); }
  catch (e) { console.error('[cron:pulse]', e.message); }
});

cron.schedule(config.schedule.daily, async () => {
  try { await runDaily(); }
  catch (e) { console.error('[cron:daily]', e.message); }
});

cron.schedule(config.schedule.weekly, async () => {
  try { await runWeekly(); }
  catch (e) { console.error('[cron:weekly]', e.message); }
});

console.log('[farm-aggregator] started');
console.log(`  pulse:  ${config.schedule.pulse}`);
console.log(`  daily:  ${config.schedule.daily}`);
console.log(`  weekly: ${config.schedule.weekly}`);
console.log(`  port:   ${config.server.port}`);
console.log(`  whatsapp: ${config.whatsapp.enabled ? 'enabled' : 'disabled (no credentials)'}`);
