/**
 * Farm Bridge — Dropbox → Claude → WhatsApp
 * Reads FeedLync and DairyComp files from Dropbox, generates a daily digest
 * via Claude Haiku, sends to WhatsApp, and saves back to Dropbox.
 *
 * Run: node bridge.js
 * Env: copy .env.example → .env and fill in credentials
 */
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { Dropbox } from 'dropbox';

const FEEDLYNC  = process.env.DROPBOX_FEEDLYNC_PATH  ?? '/Farm/FeedLync';
const DAIRYCOMP = process.env.DROPBOX_DAIRYCOMP_PATH ?? '/Farm/DairyComp';
const OUTBOX    = process.env.DROPBOX_OUTBOX_PATH     ?? '/Farm/Summaries';

const dbx = new Dropbox({
  clientId:     process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Dropbox helpers ────────────────────────────────────────────────────────

async function readFolder(folder, maxFiles = 5) {
  let list;
  try {
    list = await dbx.filesListFolder({ path: folder });
  } catch (e) {
    console.warn(`⚠ Could not read ${folder}: ${e.message}`);
    return '';
  }

  const files = list.result.entries
    .filter(e => e['.tag'] === 'file')
    .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified))
    .slice(0, maxFiles);

  if (!files.length) return '';

  const parts = await Promise.allSettled(
    files.map(async f => {
      const dl = await dbx.filesDownload({ path: f.path_lower });
      return `--- ${f.name} ---\n${dl.result.fileBinary.toString('utf8')}`;
    })
  );

  return parts
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
    .join('\n\n');
}

// ── WhatsApp helper ────────────────────────────────────────────────────────

async function sendWhatsApp(text) {
  const token     = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId   = process.env.WHATSAPP_PHONE_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT;

  if (!token || !phoneId || !recipient) {
    console.log('WhatsApp not configured — skipping send.');
    return;
  }

  const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to:   recipient,
      type: 'text',
      text: { body: text.slice(0, 4096) },
    }),
  });

  if (!res.ok) console.error('WhatsApp error:', await res.text());
  else         console.log('✅ WhatsApp sent');
}

// ── Main ───────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n── Farm Bridge ${new Date().toISOString()} ─────────────────────`);

  const [feedlync, dairycomp] = await Promise.all([
    readFolder(FEEDLYNC),
    readFolder(DAIRYCOMP),
  ]);

  const sections = [
    feedlync  && `FeedLync TMR loads:\n${feedlync}`,
    dairycomp && `DairyComp herd log:\n${dairycomp}`,
  ].filter(Boolean);

  if (!sections.length) {
    console.log('No files found in Dropbox. Check DROPBOX_FEEDLYNC_PATH / DROPBOX_DAIRYCOMP_PATH.');
    return;
  }

  console.log(`Processing ${sections.length} source(s)…`);

  const msg = await ai.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: `You are a farm AI analyst for Drumgoon Dairy.
Analyse FeedLync TMR load records and DairyComp herd logs and produce a clear daily digest.
Rules:
- Be specific: cite actual numbers, feedplan names, operators, error percentages, costs.
- Flag load errors: >5% note, >10% flag, >20% urgent.
- Lead with what matters most. Farmers are busy — keep it tight.
FeedLync columns: Start Time, Finish Time, Feedplan/Ingredient, Operator, Device, Planned Quantity, Quantity (mixed), Unloaded Quantity, Error (%), Cost`,
    messages: [{ role: 'user', content: sections.join('\n\n---\n\n') }],
  });

  const summary = msg.content[0].text;
  console.log('\n' + summary + '\n');

  const date    = new Date().toISOString().slice(0, 10);
  const outPath = `${OUTBOX}/digest_${date}.txt`;

  const [, uploadResult] = await Promise.allSettled([
    sendWhatsApp(summary),
    dbx.filesUpload({ path: outPath, contents: summary, mode: { '.tag': 'overwrite' } }),
  ]);

  if (uploadResult.status === 'fulfilled') console.log(`✅ Saved → ${outPath}`);
  else console.error('Dropbox upload failed:', uploadResult.reason?.message);
}

run().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
