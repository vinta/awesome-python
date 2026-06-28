/**
 * Tests Dropbox connectivity and upload access.
 * Run: node scripts/dropbox-test.js
 */
import 'dotenv/config';
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  clientId:     process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

async function run() {
  // 1. Check account info
  try {
    const account = await dbx.usersGetCurrentAccount();
    console.log('✅ Connected as:', account.result.name.display_name);
  } catch (e) {
    console.error('❌ Auth failed:', e.message);
    process.exit(1);
  }

  // 2. Try listing root
  try {
    const root = await dbx.filesListFolder({ path: '' });
    console.log('\n📁 Root folder contents:');
    root.result.entries.forEach((e) => console.log(' ', e['.tag'] === 'folder' ? '📁' : '📄', e.name));
  } catch (e) {
    console.error('❌ Cannot list root:', e.message);
  }

  // 3. Try uploading a test file to /Farm/Summaries
  const outbox = process.env.DROPBOX_OUTBOX_PATH ?? '/Farm/Summaries';
  const testPath = `${outbox}/test_${Date.now()}.txt`;
  try {
    await dbx.filesUpload({
      path: testPath,
      contents: `Test upload at ${new Date().toISOString()}`,
      mode: { '.tag': 'overwrite' },
    });
    console.log(`\n✅ Upload succeeded → ${testPath}`);
    // Clean up
    await dbx.filesDeleteV2({ path: testPath });
    console.log('🧹 Test file cleaned up');
  } catch (e) {
    console.error(`\n❌ Upload to ${testPath} failed:`, e.message ?? e);
    console.log('\n→ If this is a 400/path error, your Dropbox app likely has App Folder access only.');
    console.log('  Fix: go to dropbox.com/developers → your app → Permissions → change to Full Dropbox');
    console.log('  Then regenerate your refresh token (run dropbox-auth.js again).');
  }
}

run();
