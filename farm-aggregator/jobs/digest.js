import { fetchSnapshot, summariseSnapshot } from '../services/agrefine.js';
import { readFolderFiles, readLatestSummaries, uploadSummary } from '../services/dropbox.js';
import { sendMessage } from '../services/whatsapp.js';
import { haiku, sonnet } from '../services/claude.js';
import { FARM_SYSTEM, DAILY_PROMPT, WEEKLY_PROMPT } from '../prompts/system.js';
import { config } from '../config.js';

async function buildContext() {
  const [agSnap, dairycomp, feedlync] = await Promise.allSettled([
    fetchSnapshot(),
    readFolderFiles(config.dropbox.paths.dairycomp, 5),
    readFolderFiles(config.dropbox.paths.feedlync, 5),
  ]);

  const parts = [];
  if (agSnap.status === 'fulfilled') parts.push(summariseSnapshot(agSnap.value));
  if (dairycomp.status === 'fulfilled') dairycomp.value.forEach((f) => {
    parts.push(`--- DairyComp: ${f.name} ---\n${f.text.slice(0, 2000)}`);
  });
  if (feedlync.status === 'fulfilled') feedlync.value.forEach((f) => {
    parts.push(`--- FeedLync: ${f.name} ---\n${f.text.slice(0, 2000)}`);
  });
  return parts.join('\n\n');
}

export async function runDaily() {
  const ts = new Date().toISOString().slice(0, 10);
  console.log(`[daily] starting ${ts}`);

  const [context, priorDocs] = await Promise.all([
    buildContext(),
    readLatestSummaries(3),
  ]);

  const priorText = priorDocs.map((d) => `[${d.name}]\n${d.text}`).join('\n\n---\n\n');
  const prompt = DAILY_PROMPT(context, priorText);

  const summary = await haiku(FARM_SYSTEM, prompt, 1024);
  console.log('[daily] summary:\n', summary);

  const filename = `daily_${ts}.txt`;
  await uploadSummary(filename, summary).catch((e) =>
    console.warn('[daily] Dropbox upload failed:', e.message)
  );
  await sendMessage(`🌾 Daily Farm Digest — ${ts}\n\n${summary}`).catch((e) =>
    console.warn('[daily] WhatsApp failed:', e.message)
  );

  return summary;
}

export async function runWeekly() {
  const ts = new Date().toISOString().slice(0, 10);
  console.log(`[weekly] starting ${ts}`);

  const [context, priorDocs] = await Promise.all([
    buildContext(),
    readLatestSummaries(7),
  ]);

  const priorText = priorDocs.map((d) => `[${d.name}]\n${d.text}`).join('\n\n---\n\n');
  const prompt = WEEKLY_PROMPT(context, priorText);

  const summary = await sonnet(FARM_SYSTEM, prompt, 2048);
  console.log('[weekly] summary:\n', summary);

  const filename = `weekly_${ts}.txt`;
  await uploadSummary(filename, summary).catch((e) =>
    console.warn('[weekly] Dropbox upload failed:', e.message)
  );
  await sendMessage(`📋 Weekly Farm Summary — week ending ${ts}\n\n${summary}`).catch((e) =>
    console.warn('[weekly] WhatsApp failed:', e.message)
  );

  return summary;
}
