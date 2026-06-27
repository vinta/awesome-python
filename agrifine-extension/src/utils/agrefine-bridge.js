/**
 * AG-Refine Sister-App Bridge
 *
 * Detects an open AG-Refine tab, pulls field and output data from its
 * localStorage/sessionStorage, and maps it into Agrifine field profiles.
 *
 * AG-Refine tab detection: any tab whose URL matches a configurable pattern
 * (default: localhost:* OR any URL containing "ag-refine" or "agrefine").
 * Set the URL in Settings > AG-Refine URL to pin it to a specific origin.
 */

import { getFieldProfiles, saveFieldProfile, localGet, localSet } from './storage.js';

const AGREFINE_KEY = 'agrifine_agrefine_url';
const SYNC_LOG_KEY = 'agrifine_agrefine_sync_log';

export async function getAgRefineUrl() {
  return (await localGet(AGREFINE_KEY)) ?? '';
}

export async function setAgRefineUrl(url) {
  await localSet(AGREFINE_KEY, url);
}

export async function getSyncLog() {
  return (await localGet(SYNC_LOG_KEY)) ?? [];
}

function tabMatchesAgRefine(tab, configuredUrl) {
  if (!tab.url) return false;
  if (configuredUrl) {
    try {
      const origin = new URL(configuredUrl).origin;
      return tab.url.startsWith(origin);
    } catch (_) {}
  }
  const u = tab.url.toLowerCase();
  return (
    u.includes('ag-refine') ||
    u.includes('agrefine') ||
    u.startsWith('http://localhost') ||
    u.startsWith('http://127.0.0.1')
  );
}

// Injected into the AG-Refine tab — reads all storage and DOM hints
function scrapeAgRefineTab() {
  const out = { localStorage: {}, sessionStorage: {}, domHints: {} };

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    try { out.localStorage[k] = JSON.parse(localStorage.getItem(k)); }
    catch (_) { out.localStorage[k] = localStorage.getItem(k); }
  }
  for (let i = 0; i < sessionStorage.length; i++) {
    const k = sessionStorage.key(i);
    try { out.sessionStorage[k] = JSON.parse(sessionStorage.getItem(k)); }
    catch (_) { out.sessionStorage[k] = sessionStorage.getItem(k); }
  }

  // Pull field-name-like text from the DOM as a fallback hint
  const fieldEls = document.querySelectorAll('[data-field],[data-name],[data-id]');
  fieldEls.forEach((el) => {
    const id = el.dataset.field ?? el.dataset.id ?? el.dataset.name;
    if (id) out.domHints[id] = (el.textContent ?? '').trim().slice(0, 200);
  });

  return out;
}

/**
 * Map raw AG-Refine storage dump to Agrifine field profile shape.
 * Tries common key patterns used by React/Next.js ag apps.
 */
function extractFields(raw) {
  const all = { ...raw.localStorage, ...raw.sessionStorage };
  const candidates = [];

  for (const [key, val] of Object.entries(all)) {
    const k = key.toLowerCase();
    if (!k.includes('field') && !k.includes('load') && !k.includes('farm') && !k.includes('plot')) continue;

    const arr = Array.isArray(val) ? val : (val && typeof val === 'object' ? [val] : null);
    if (!arr) continue;

    for (const item of arr) {
      if (!item || typeof item !== 'object') continue;
      const name = item.name ?? item.fieldName ?? item.field_name ?? item.title ?? item.label ?? null;
      if (!name) continue;

      candidates.push({
        id: `agr_${item.id ?? item.fieldId ?? Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: String(name),
        cluId: item.cluId ?? item.clu_id ?? item.clu ?? null,
        acres: parseFloat(item.acres ?? item.area ?? item.size ?? item.acreage) || null,
        soilType: item.soilType ?? item.soil_type ?? item.soil ?? null,
        coordinates: {
          lat: parseFloat(item.lat ?? item.latitude ?? item.coordinates?.lat) || null,
          lon: parseFloat(item.lon ?? item.lng ?? item.longitude ?? item.coordinates?.lon ?? item.coordinates?.lng) || null,
        },
        notes: item.notes ?? item.description ?? item.comments ?? null,
        cropHistory: Array.isArray(item.cropHistory ?? item.crop_history) ? (item.cropHistory ?? item.crop_history) : [],
        harvestRecords: Array.isArray(item.harvests ?? item.harvestRecords) ? (item.harvests ?? item.harvestRecords) : [],
        carbonPotential: item.carbonPotential ?? null,
        weatherData: null,
        createdAt: item.createdAt ?? item.created_at ?? new Date().toISOString(),
        _source: 'ag-refine',
      });
    }
  }

  return candidates;
}

/**
 * Loads also come over — map to ingested file records for the dashboard.
 */
function extractLoads(raw) {
  const all = { ...raw.localStorage, ...raw.sessionStorage };
  const loads = [];

  for (const [key, val] of Object.entries(all)) {
    const k = key.toLowerCase();
    if (!k.includes('load') && !k.includes('scale') && !k.includes('ticket') && !k.includes('delivery')) continue;

    const arr = Array.isArray(val) ? val : null;
    if (!arr) continue;

    for (const item of arr) {
      if (!item || typeof item !== 'object') continue;
      loads.push(item);
    }
  }

  return loads;
}

export async function syncFromAgRefine() {
  const configuredUrl = await getAgRefineUrl();
  const allTabs = await chrome.tabs.query({});
  const agRefineTabs = allTabs.filter((t) => tabMatchesAgRefine(t, configuredUrl));

  if (agRefineTabs.length === 0) {
    return { ok: false, error: 'No AG-Refine tab found. Open AG-Refine in a browser tab first.' };
  }

  const tab = agRefineTabs[0];

  let raw;
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeAgRefineTab,
    });
    raw = result.result;
  } catch (err) {
    return { ok: false, error: `Cannot read AG-Refine tab: ${err.message}` };
  }

  const fields = extractFields(raw);
  const loads = extractLoads(raw);

  // Merge fields — update existing by name, insert new ones
  const existing = await getFieldProfiles();
  let added = 0;
  let updated = 0;

  for (const f of fields) {
    const match = existing.find((e) => e.name.toLowerCase() === f.name.toLowerCase());
    if (match) {
      // Merge: fill in missing data without overwriting user edits
      const merged = {
        ...f,
        ...match,
        coordinates: match.coordinates?.lat != null ? match.coordinates : f.coordinates,
        cropHistory: match.cropHistory?.length ? match.cropHistory : f.cropHistory,
        notes: match.notes ?? f.notes,
        cluId: match.cluId ?? f.cluId,
        _source: 'ag-refine-merged',
      };
      await saveFieldProfile(merged);
      updated++;
    } else {
      await saveFieldProfile(f);
      added++;
    }
  }

  const log = {
    at: new Date().toISOString(),
    tabUrl: tab.url,
    fieldsAdded: added,
    fieldsUpdated: updated,
    loadsFound: loads.length,
    rawKeys: Object.keys({ ...raw.localStorage, ...raw.sessionStorage }),
  };

  const history = await getSyncLog();
  history.unshift(log);
  await localSet(SYNC_LOG_KEY, history.slice(0, 20));

  return { ok: true, added, updated, loadsFound: loads.length, loads, tabUrl: tab.url };
}
