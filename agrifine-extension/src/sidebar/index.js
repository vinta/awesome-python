import './sidebar.css';
import { ReadingListModule } from '../modules/reading-list/index.js';
import { DataIngestModule } from '../modules/data-ingest/index.js';
import { FieldProfileModule } from '../modules/field-profile/index.js';
import { DashboardModule } from '../modules/dashboard/index.js';
import { CarbonEstimatorModule } from '../modules/carbon-estimator/index.js';
import { AgRefineModule } from '../ag-refine/index.js';
import { sessionSet, sessionGet, KEYS } from '../utils/storage.js';

// ── Module registry ───────────────────────────────────────────────────────────
const MODULES = [
  ReadingListModule(),
  DataIngestModule(),
  FieldProfileModule(),
  DashboardModule(),
  CarbonEstimatorModule(),
  AgRefineModule(),
];

const moduleMap = Object.fromEntries(MODULES.map((m) => [m.id, m]));
let activeModuleId = 'reading-list';

// ── Tab navigation ────────────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });
}

async function activateTab(id) {
  if (!moduleMap[id]) return;
  activeModuleId = id;

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active-tab', btn.dataset.tab === id);
  });

  const main = document.getElementById('main-content');
  main.innerHTML = '';
  await moduleMap[id].render(main);
}

// ── Settings panel ────────────────────────────────────────────────────────────
function setupSettings() {
  const btn = document.getElementById('btn-settings');
  const panel = document.getElementById('settings-panel');
  const saveBtn = document.getElementById('btn-save-key');
  const input = document.getElementById('api-key-input');
  const status = document.getElementById('api-key-status');

  btn.addEventListener('click', async () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      const existing = await sessionGet(KEYS.API_KEY);
      if (existing) {
        input.value = '';
        input.placeholder = 'Key set — enter new key to replace';
        status.textContent = '✓ API key is active this session';
      }
    }
  });

  saveBtn.addEventListener('click', async () => {
    const key = input.value.trim();
    if (!key.startsWith('sk-ant-')) {
      status.textContent = 'Key must start with sk-ant-';
      return;
    }
    await chrome.runtime.sendMessage({ type: 'SET_API_KEY', payload: { key } });
    input.value = '';
    input.placeholder = 'Key set — enter new key to replace';
    status.textContent = '✓ Saved for this session';
  });
}

// ── Keepalive port (prevents service worker from being killed) ────────────────
function keepAlive() {
  try {
    const port = chrome.runtime.connect({ name: 'keepalive' });
    port.onDisconnect.addListener(() => {
      setTimeout(keepAlive, 5000);
    });
  } catch (_) {}
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  setupSettings();
  keepAlive();
  await activateTab(activeModuleId);
});
