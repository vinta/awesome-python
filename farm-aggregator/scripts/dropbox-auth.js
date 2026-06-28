/**
 * One-time Dropbox OAuth setup — run this once to get your refresh token.
 *
 * Usage:
 *   node scripts/dropbox-auth.js
 *
 * You need DROPBOX_APP_KEY and DROPBOX_APP_SECRET in your .env (or pass inline):
 *   DROPBOX_APP_KEY=xxx DROPBOX_APP_SECRET=yyy node scripts/dropbox-auth.js
 */
import 'dotenv/config';
import { createInterface } from 'readline';

const APP_KEY    = process.env.DROPBOX_APP_KEY;
const APP_SECRET = process.env.DROPBOX_APP_SECRET;

if (!APP_KEY || !APP_SECRET) {
  console.error('Set DROPBOX_APP_KEY and DROPBOX_APP_SECRET in .env first.');
  process.exit(1);
}

const authUrl =
  `https://www.dropbox.com/oauth2/authorize` +
  `?client_id=${APP_KEY}` +
  `&response_type=code` +
  `&token_access_type=offline`;

console.log('\n1. Open this URL in your browser:\n');
console.log('   ' + authUrl);
console.log('\n2. Authorize the app and copy the code Dropbox gives you.\n');

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question('3. Paste the code here: ', async (code) => {
  rl.close();

  const params = new URLSearchParams({
    code:          code.trim(),
    grant_type:    'authorization_code',
    client_id:     APP_KEY,
    client_secret: APP_SECRET,
  });

  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await res.json();

  if (data.error) {
    console.error('\nError:', data.error_description ?? data.error);
    process.exit(1);
  }

  console.log('\n✅ Success! Add these to your .env:\n');
  console.log(`DROPBOX_REFRESH_TOKEN=${data.refresh_token}`);
  console.log('\nThe access_token below expires in 4 hours — use the refresh_token above instead.');
  console.log(`# access_token (short-lived, ignore): ${data.access_token?.slice(0, 20)}...`);
});
