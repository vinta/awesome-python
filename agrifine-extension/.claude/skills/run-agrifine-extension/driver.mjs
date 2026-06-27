#!/usr/bin/env node
/**
 * Agrifine Extension driver
 * Launches Chrome with the unpacked extension loaded, opens the sidebar
 * page directly, and exposes a simple REPL for agent interaction.
 *
 * Usage:
 *   node driver.mjs [command]
 *
 * Commands (interactive REPL if none given):
 *   ss [file]          Take screenshot → screenshots/<file>.png
 *   click <selector>   Click element
 *   tab <name>         Click tab by label (reading|ingest|fields|dashboard|carbon|agent)
 *   type <sel> <text>  Type into element
 *   eval <js>          Evaluate JS in page, print result
 *   quit               Exit
 */

import { chromium } from 'playwright';
import { createInterface } from 'readline';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
// Skill lives at .claude/skills/run-agrifine-extension/
// Unit root (agrifine-extension/) is 3 levels up
const UNIT_ROOT = resolve(__dir, '..', '..', '..');
const DIST = resolve(UNIT_ROOT, 'dist');
const SCREENSHOTS = resolve(UNIT_ROOT, 'screenshots');
const CHROMIUM = process.env.PLAYWRIGHT_BROWSERS_PATH
  ? `${process.env.PLAYWRIGHT_BROWSERS_PATH}/chromium-1194/chrome-linux/chrome`
  : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

mkdirSync(SCREENSHOTS, { recursive: true });

async function main() {
  if (!existsSync(DIST + '/manifest.json')) {
    console.error('ERROR: dist/ not found. Run: npm run build');
    process.exit(1);
  }

  console.log('Launching Chrome with Agrifine extension…');

  // Chrome requires a persistent context to load extensions
  const context = await chromium.launchPersistentContext('', {
    executablePath: CHROMIUM,
    headless: true,
    args: [
      `--disable-extensions-except=${DIST}`,
      `--load-extension=${DIST}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  // Open the sidebar HTML directly — works for visual/UI testing
  // (chrome.* APIs are mocked via the stub below)
  const page = await context.newPage();

  // Stub chrome.* APIs so the page renders without a real extension context
  await page.addInitScript(() => {
    const store = {};
    window.chrome = {
      storage: {
        local: {
          get: (k, cb) => cb({ [k]: null }),
          set: (_o, cb) => cb && cb(),
        },
        session: {
          get: (k, cb) => cb({ [k]: null }),
          set: (_o, cb) => cb && cb(),
        },
      },
      runtime: {
        sendMessage: (_msg, cb) => cb && cb({ error: 'No background in test mode' }),
        connect: () => ({ onDisconnect: { addListener: () => {} } }),
        lastError: null,
      },
      tabs: {
        query: (_q, cb) => cb([{ id: 1, url: 'https://example.com', title: 'Test Page' }]),
        sendMessage: (_id, _msg, cb) => cb && cb({ text: 'test page content', title: 'Test' }),
      },
      sidePanel: { setPanelBehavior: () => Promise.resolve() },
    };
  });

  await page.goto(`file://${DIST}/sidebar.html`);
  await page.waitForSelector('#main-content', { timeout: 5000 });
  console.log('Extension sidebar loaded.');

  // Single command mode
  const args = process.argv.slice(2);
  if (args.length > 0) {
    await runCommand(page, args.join(' '));
    await context.close();
    return;
  }

  // Interactive REPL
  console.log('REPL ready. Commands: ss [file] | click <sel> | tab <name> | type <sel> <text> | eval <js> | quit');
  const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: 'agrifine> ' });
  rl.prompt();
  rl.on('line', async (line) => {
    const cmd = line.trim();
    if (!cmd) { rl.prompt(); return; }
    if (cmd === 'quit' || cmd === 'exit') { await context.close(); process.exit(0); }
    await runCommand(page, cmd);
    rl.prompt();
  });
  rl.on('close', async () => { await context.close(); });
}

async function runCommand(page, cmd) {
  const [verb, ...rest] = cmd.split(/\s+/);
  try {
    if (verb === 'ss') {
      const name = rest[0] || `screenshot_${Date.now()}`;
      const file = `${SCREENSHOTS}/${name.endsWith('.png') ? name : name + '.png'}`;
      await page.screenshot({ path: file, fullPage: false });
      console.log(`Screenshot: ${file}`);

    } else if (verb === 'tab') {
      const label = rest[0]?.toLowerCase();
      const TAB_MAP = {
        reading: '[data-tab="reading-list"]',
        ingest:  '[data-tab="data-ingest"]',
        fields:  '[data-tab="field-profile"]',
        dashboard: '[data-tab="dashboard"]',
        carbon:  '[data-tab="carbon-estimator"]',
        agent:   '[data-tab="ag-refine"]',
      };
      const sel = TAB_MAP[label] ?? `[data-tab="${label}"]`;
      await page.click(sel);
      await page.waitForTimeout(300);
      console.log(`Clicked tab: ${label}`);

    } else if (verb === 'click') {
      await page.click(rest.join(' '));
      await page.waitForTimeout(200);
      console.log('Clicked.');

    } else if (verb === 'type') {
      const [sel, ...words] = rest;
      await page.fill(sel, words.join(' '));
      console.log('Typed.');

    } else if (verb === 'eval') {
      const result = await page.evaluate(rest.join(' '));
      console.log(JSON.stringify(result, null, 2));

    } else {
      console.log(`Unknown command: ${verb}. Try: ss | tab | click | type | eval | quit`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
