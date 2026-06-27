/**
 * AG-Refine Sister-App Bridge
 *
 * Calls AG-Refine's REST API through the tab's own page context so session
 * cookies work without any CORS setup on the server. Requires AG-Refine to
 * be open in a browser tab and the user to be logged in there.
 *
 * Tab detection: matches any tab whose URL starts with the configured base URL
 * (default: localhost:* or any URL containing "ag-refine" / "agrefine").
 * Set Settings → AG-Refine URL to pin it to a specific origin.
 */

import { getFieldProfiles, saveFieldProfile, localGet, localSet } from './storage.js';

const AGREFINE_KEY    = 'agrifine_agrefine_url';
const SYNC_LOG_KEY    = 'agrifine_agrefine_sync_log';

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

async function findAgRefineTab(configuredUrl) {
  const allTabs = await chrome.tabs.query({});
  return allTabs.find((t) => tabMatchesAgRefine(t, configuredUrl)) ?? null;
}

// ── Functions injected into the AG-Refine tab ─────────────────────────────────
// These run in the page's origin context — same-origin, session cookies included.
// They must be fully self-contained (no closures over outer-scope variables).

async function _injectFetchAll() {
  const base = window.location.origin;

  async function get(path) {
    try {
      const res = await fetch(base + path, { credentials: 'include' });
      if (res.status === 401) return { __auth_error: true };
      return res.ok ? res.json() : null;
    } catch (_) {
      return null;
    }
  }

  const [fields, tickets, labSamples, harvestPlans] = await Promise.all([
    get('/api/fields/'),
    get('/api/scales/tickets/all'),
    get('/api/intelligence/lab-samples'),
    get('/api/harvest/plans'),
  ]);

  return { fields, tickets, labSamples, harvestPlans };
}

async function _injectPushFields(newFields) {
  const base = window.location.origin;
  const results = [];

  for (const field of newFields) {
    try {
      const res = await fetch(base + '/api/fields/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(field),
      });
      const body = res.ok ? await res.json() : null;
      results.push({ name: field.name, ok: res.ok, status: res.status, agRefineId: body?.id ?? null });
    } catch (err) {
      results.push({ name: field.name, ok: false, status: 0, error: err.message });
    }
  }

  return results;
}

// ── Data mapping ──────────────────────────────────────────────────────────────

function mapAgFieldToProfile(agField, ticketsByFieldId, labSamplesByFieldId) {
  const fieldTickets = (ticketsByFieldId[agField.id] ?? [])
    .filter((t) => t.net_weight != null)
    .map((t) => ({
      date: t.captured_at,
      yield: t.net_weight,
      unit: t.unit ?? 'lb',
      moisture: t.dry_matter_pct != null ? +(100 - t.dry_matter_pct).toFixed(1) : null,
      quality: {
        dm_pct: t.dry_matter_pct ?? null,
        protein_pct: t.protein_pct ?? null,
        starch_pct: t.starch_pct ?? null,
      },
      commodity: t.commodity ?? null,
      harvest_label: t.harvest ?? null,
      ticket_id: t.id,
      source: 'ag-refine',
    }));

  const cropHistory = [];
  if (agField.crop) {
    const year = agField.planting_date
      ? parseInt(agField.planting_date.slice(0, 4), 10)
      : new Date().getFullYear();
    cropHistory.push({ year, crop: agField.crop, variety: agField.variety ?? null });
  }

  const labSamples = (labSamplesByFieldId[agField.id] ?? []).map((s) => ({
    date: s.sampled_at ?? null,
    dm_pct: s.dry_matter_pct ?? null,
    ndf_pct: s.ndf_pct ?? null,
    adf_pct: s.adf_pct ?? null,
    rfv: s.rfv ?? null,
    rfq: s.rfq ?? null,
    nel: s.nel ?? null,
    digestibility_pct: s.digestibility_pct ?? null,
  }));

  return {
    id: `agr_${agField.id}`,
    name: agField.name,
    farmName: agField.farm_name ?? null,
    acres: agField.acres_fsa ?? agField.acres_calculated ?? null,
    soilType: null,
    coordinates: { lat: null, lon: null },
    notes: agField.notes ?? null,
    cropHistory,
    harvestRecords: fieldTickets,
    labSamples,
    carbonPotential: null,
    weatherData: null,
    createdAt: new Date().toISOString(),
    _source: 'ag-refine',
    _agRefineId: agField.id,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function syncFromAgRefine() {
  const configuredUrl = await getAgRefineUrl();
  const tab = await findAgRefineTab(configuredUrl);

  if (!tab) {
    return { ok: false, error: 'No AG-Refine tab found. Open AG-Refine in a browser tab first.' };
  }

  let raw;
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: _injectFetchAll,
    });
    raw = result.result;
  } catch (err) {
    return { ok: false, error: `Cannot reach AG-Refine tab: ${err.message}` };
  }

  if (!raw || raw.fields?.__auth_error) {
    return { ok: false, error: 'AG-Refine returned 401 — please log in to AG-Refine first.' };
  }

  const agFields     = Array.isArray(raw.fields)      ? raw.fields.filter((f) => f.active !== false) : [];
  const allTickets   = Array.isArray(raw.tickets)     ? raw.tickets : [];
  const allLabSamples = Array.isArray(raw.labSamples) ? raw.labSamples : [];

  // Index by field_id for O(1) lookup
  const ticketsByFieldId = {};
  for (const t of allTickets) {
    if (t.field_id == null) continue;
    (ticketsByFieldId[t.field_id] ??= []).push(t);
  }
  const labSamplesByFieldId = {};
  for (const s of allLabSamples) {
    if (s.field_id == null) continue;
    (labSamplesByFieldId[s.field_id] ??= []).push(s);
  }

  const incomingProfiles = agFields.map((f) =>
    mapAgFieldToProfile(f, ticketsByFieldId, labSamplesByFieldId)
  );

  const existing = await getFieldProfiles();
  let added = 0;
  let updated = 0;

  for (const profile of incomingProfiles) {
    const match =
      existing.find((e) => e._agRefineId === profile._agRefineId) ??
      existing.find((e) => e.name.toLowerCase() === profile.name.toLowerCase());

    if (match) {
      await saveFieldProfile({
        ...profile,
        id: match.id,
        cropHistory: match.cropHistory?.length ? match.cropHistory : profile.cropHistory,
        harvestRecords: profile.harvestRecords.length
          ? profile.harvestRecords
          : (match.harvestRecords ?? []),
        soilType: match.soilType ?? profile.soilType,
        coordinates: match.coordinates?.lat != null ? match.coordinates : profile.coordinates,
        notes: match.notes ?? profile.notes,
        _source: 'ag-refine-merged',
      });
      updated++;
    } else {
      await saveFieldProfile(profile);
      added++;
    }
  }

  const logEntry = {
    at: new Date().toISOString(),
    tabUrl: tab.url,
    fieldsAdded: added,
    fieldsUpdated: updated,
    ticketsPulled: allTickets.length,
    labSamplesPulled: allLabSamples.length,
  };

  const history = await getSyncLog();
  history.unshift(logEntry);
  await localSet(SYNC_LOG_KEY, history.slice(0, 20));

  return { ok: true, added, updated, ticketsPulled: allTickets.length, labSamplesPulled: allLabSamples.length };
}

export async function pushToAgRefine(profiles) {
  const configuredUrl = await getAgRefineUrl();
  const tab = await findAgRefineTab(configuredUrl);

  if (!tab) {
    return { ok: false, error: 'No AG-Refine tab found. Open AG-Refine in a browser tab first.' };
  }

  // Only push profiles that haven't been synced from AG-Refine yet
  const toCreate = profiles
    .filter((p) => !p._agRefineId)
    .map((p) => ({
      name: p.name,
      farm_name: p.farmName ?? null,
      acres_fsa: p.acres ?? null,
      crop: p.cropHistory?.[0]?.crop ?? null,
      variety: p.cropHistory?.[0]?.variety ?? null,
      notes: p.notes ?? null,
    }));

  if (toCreate.length === 0) {
    return { ok: true, pushed: 0, message: 'All profiles are already synced with AG-Refine.' };
  }

  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: _injectPushFields,
      args: [toCreate],
    });
    const results = result.result ?? [];
    const pushed   = results.filter((r) => r.ok).length;
    const failures = results.filter((r) => !r.ok);

    // Back-fill _agRefineId on successfully pushed profiles
    const existing = await getFieldProfiles();
    for (const res of results) {
      if (!res.ok || !res.agRefineId) continue;
      const p = existing.find((e) => e.name === res.name);
      if (p) {
        await saveFieldProfile({ ...p, _agRefineId: res.agRefineId, _source: 'ag-refine-merged' });
      }
    }

    return { ok: failures.length === 0, pushed, failures: failures.length ? failures : undefined };
  } catch (err) {
    return { ok: false, error: `Cannot write to AG-Refine: ${err.message}` };
  }
}
