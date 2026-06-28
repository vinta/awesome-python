import { fetchSnapshot, summariseSnapshot } from '../services/agrefine.js';
import { readFolderFiles, uploadSummary, readLatestSummaries } from '../services/dropbox.js';
import { sendMessage } from '../services/whatsapp.js';
import { haiku } from '../services/claude.js';
import { FARM_SYSTEM, PULSE_PROMPT } from '../prompts/system.js';
import { config } from '../config.js';

export async function runPulse() {
  const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
  console.log(`[pulse] starting ${ts}`);

  const [agSnap, dairycompFiles, feedlyncFiles] = await Promise.allSettled([
    fetchSnapshot(),
    readFolderFiles(config.dropbox.paths.dairycomp, 3),
    readFolderFiles(config.dropbox.paths.feedlync, 3),
  ]);

  const contextParts = [];

  if (agSnap.status === 'fulfilled') {
    contextParts.push(summariseSnapshot(agSnap.value));
  } else {
    contextParts.push(`AG-Refine: unavailable (${agSnap.reason?.message})`);
  }

  if (dairycompFiles.status === 'fulfilled' && dairycompFiles.value.length) {
    contextParts.push('\n--- DairyComp logs ---');
    dairycompFiles.value.forEach((f) => {
      contextParts.push(`[${f.name}]\n${f.text.slice(0, 1000)}`);
    });
  }

  if (feedlyncFiles.status === 'fulfilled' && feedlyncFiles.value.length) {
    contextParts.push('\n--- FeedLync files ---');
    feedlyncFiles.value.forEach((f) => {
      contextParts.push(`[${f.name}]\n${f.text.slice(0, 1000)}`);
    });
  }

  const context = contextParts.join('\n\n');
  const prompt = PULSE_PROMPT(context).replace('{timestamp}', ts);
  const summary = await haiku(FARM_SYSTEM, prompt, 512);

  console.log('[pulse] summary:\n', summary);

  const filename = `pulse_${ts.replace(/ /g, '_').replace(/:/g, '')}.txt`;
  await uploadSummary(filename, summary).catch((e) =>
    console.warn('[pulse] Dropbox upload failed:', e.message)
  );

  await sendMessage(summary).catch((e) =>
    console.warn('[pulse] WhatsApp failed:', e.message)
  );

  return summary;
}
