/**
 * Lists all files under /Farm in Dropbox so you can see what's available.
 * Run from the farm-aggregator directory:
 *   node scripts/dropbox-explore.js
 */
import 'dotenv/config';
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  clientId:     process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

async function listFolder(path, indent = '') {
  try {
    const res = await dbx.filesListFolder({ path, recursive: false });
    for (const entry of res.result.entries) {
      if (entry['.tag'] === 'folder') {
        console.log(`${indent}📁 ${entry.name}/`);
        await listFolder(entry.path_lower, indent + '  ');
      } else {
        const size = entry.size ? `(${(entry.size / 1024).toFixed(1)} KB)` : '';
        const date = entry.client_modified?.slice(0, 10) ?? '?';
        console.log(`${indent}📄 ${entry.name} ${size} — ${date}`);
      }
    }
    if (res.result.entries.length === 0) {
      console.log(`${indent}(empty)`);
    }
  } catch (e) {
    console.log(`${indent}⚠ Could not read ${path}: ${e.message}`);
  }
}

console.log('Scanning your Dropbox /Farm folder...\n');
listFolder('/Farm').then(() => {
  console.log('\nDone. Copy relevant files into /Farm/DairyComp or /Farm/FeedLync.');
});
