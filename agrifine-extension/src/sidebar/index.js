import './sidebar.css';
import { ReadingListModule } from '../modules/reading-list/index.js';
import { DataIngestModule } from '../modules/data-ingest/index.js';
import { FieldProfileModule } from '../modules/field-profile/index.js';
import { DashboardModule } from '../modules/dashboard/index.js';
import { CarbonEstimatorModule } from '../modules/carbon-estimator/index.js';
import { AgRefineModule } from '../ag-refine/index.js';
import { sessionSet, sessionGet, localGet, localSet, KEYS } from '../utils/storage.js';
import { getAgRefineUrl, setAgRefineUrl } from '../utils/agrefine-bridge.js';

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
    const active = btn.dataset.tab === id;
    btn.classList.toggle('active-tab', active);
    btn.style.color = active ? '' : '#3d4f66';
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
  const rememberChk = document.getElementById('api-key-remember');
  const forgetBtn = document.getElementById('btn-forget-key');

  const agRefineInput = document.getElementById('agrefine-url-input');
  const agRefineStatus = document.getElementById('agrefine-url-status');
  const agRefineSaveBtn = document.getElementById('btn-save-agrefine-url');

  btn.addEventListener('click', async () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      const sessionKey = await sessionGet(KEYS.API_KEY);
      const savedKey = await localGet(KEYS.API_KEY_SAVED);
      if (sessionKey || savedKey) {
        input.value = '';
        input.placeholder = 'Key set — enter new key to replace';
        status.textContent = savedKey
          ? '✓ Key saved across sessions'
          : '✓ Key active this session only';
        status.style.color = '#4ade80';
      }
      if (savedKey) {
        rememberChk.checked = true;
        forgetBtn.classList.remove('hidden');
      }
      const agUrl = await getAgRefineUrl();
      if (agUrl) agRefineInput.value = agUrl;
    }
  });

  saveBtn.addEventListener('click', async () => {
    const key = input.value.trim();
    if (!key.startsWith('sk-ant-')) {
      status.textContent = 'Key must start with sk-ant-';
      status.style.color = '#f87171';
      return;
    }
    const remember = rememberChk.checked;
    await chrome.runtime.sendMessage({ type: 'SET_API_KEY', payload: { key, remember } });
    input.value = '';
    input.placeholder = 'Key set — enter new key to replace';
    status.textContent = remember ? '✓ Key saved across sessions' : '✓ Saved for this session';
    status.style.color = '#4ade80';
    forgetBtn.classList.toggle('hidden', !remember);
  });

  forgetBtn.addEventListener('click', async () => {
    await localSet(KEYS.API_KEY_SAVED, null);
    rememberChk.checked = false;
    forgetBtn.classList.add('hidden');
    status.textContent = 'Saved key removed';
    status.style.color = '#3d4f66';
  });

  agRefineSaveBtn.addEventListener('click', async () => {
    const url = agRefineInput.value.trim();
    await setAgRefineUrl(url);
    agRefineStatus.textContent = url ? '✓ AG-Refine URL saved' : '✓ Cleared';
    agRefineStatus.style.color = '#4ade80';
    setTimeout(() => {
      agRefineStatus.style.color = '#3d4f66';
      agRefineStatus.textContent = 'Used to sync fields and outputs from your AG-Refine app.';
    }, 2500);
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
