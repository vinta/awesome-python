/**
 * Rotates the Dropbox refresh token and pushes it to all Render cron jobs automatically.
 *
 * One-time setup:
 *   1. Get a Render API key from: https://dashboard.render.com/u/settings#apikeys
 *   2. Add to .env (or Render env vars):
 *        RENDER_API_KEY=rnd_...
 *        RENDER_SERVICE_IDS=srv-abc123,srv-def456,srv-ghi789
 *      (find service IDs in each cron job's Settings page — last part of the URL)
 *
 * Usage:
 *   node scripts/rotate-dropbox.js
 */
import 'dotenv/config';
import { createInterface } from 'readline';

const APP_KEY        = process.env.DROPBOX_APP_KEY;
const APP_SECRET     = process.env.DROPBOX_APP_SECRET;
const RENDER_API_KEY = process.env.RENDER_API_KEY;
const SERVICE_IDS    = (process.env.RENDER_SERVICE_IDS ?? '').split(',').map((s) => s.trim()).filter(Boolean);

if (!APP_KEY || !APP_SECRET) {
  console.error('❌ DROPBOX_APP_KEY and DROPBOX_APP_SECRET must be set.');
  process.exit(1);
}

// ── Step 1: Dropbox OAuth ────────────────────────────────────────────────────

const authUrl =
  `https://www.dropbox.com/oauth2/authorize` +
  `?client_id=${APP_KEY}` +
  `&response_type=code` +
  `&token_access_type=offline`;

console.log('\n── STEP 1: Dropbox Auth ──────────────────────────────────────');
console.log('Open this URL:\n');
console.log('  ' + authUrl);
console.log('');

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question('Paste the code Dropbox gives you: ', async (code) => {
  rl.close();

  const params = new URLSearchParams({
    code:          code.trim(),
    grant_type:    'authorization_code',
    client_id:     APP_KEY,
    client_secret: APP_SECRET,
  });

  const tokenRes = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    console.error('❌ Dropbox token exchange failed:', tokenData.error_description ?? tokenData.error);
    process.exit(1);
  }

  const refreshToken = tokenData.refresh_token;
  console.log('\n✅ New refresh token obtained.');

  // ── Step 2: Push to Render ─────────────────────────────────────────────────

  if (!RENDER_API_KEY || SERVICE_IDS.length === 0) {
    console.log('\n── No Render credentials set ─────────────────────────────────');
    console.log('Add these to your .env or Render env vars to auto-push next time:');
    console.log('  RENDER_API_KEY=rnd_...');
    console.log('  RENDER_SERVICE_IDS=srv-abc,srv-def,srv-ghi');
    console.log('\nManually set this token in Render:');
    console.log(`  DROPBOX_REFRESH_TOKEN=${refreshToken}`);
    return;
  }

  console.log(`\n── STEP 2: Pushing to ${SERVICE_IDS.length} Render service(s) ──────────`);

  for (const serviceId of SERVICE_IDS) {
    try {
      // Get current env vars
      const listRes = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
        headers: { Authorization: `Bearer ${RENDER_API_KEY}`, Accept: 'application/json' },
      });

      if (!listRes.ok) {
        console.error(`  ❌ ${serviceId}: failed to fetch env vars (${listRes.status})`);
        continue;
      }

      const existing = await listRes.json();

      // Build updated list — replace DROPBOX_REFRESH_TOKEN, keep everything else
      const updated = existing.map((v) =>
        v.key === 'DROPBOX_REFRESH_TOKEN' ? { key: v.key, value: refreshToken } : v
      );

      if (!updated.find((v) => v.key === 'DROPBOX_REFRESH_TOKEN')) {
        updated.push({ key: 'DROPBOX_REFRESH_TOKEN', value: refreshToken });
      }

      const putRes = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${RENDER_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updated),
      });

      if (putRes.ok) {
        console.log(`  ✅ ${serviceId}: DROPBOX_REFRESH_TOKEN updated`);
      } else {
        const err = await putRes.text();
        console.error(`  ❌ ${serviceId}: update failed (${putRes.status}): ${err}`);
      }
    } catch (e) {
      console.error(`  ❌ ${serviceId}: ${e.message}`);
    }
  }

  console.log('\n✅ Done. Render services will redeploy with the new token shortly.');
});
