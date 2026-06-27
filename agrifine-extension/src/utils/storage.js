/**
 * Agrifine storage schema
 *
 * chrome.storage.local keys:
 *   agrifine_reading_list   — Array<ReadingItem>
 *   agrifine_ingested_files — Array<IngestedFile>
 *   agrifine_field_profiles — Array<FieldProfile>
 *   agrifine_settings       — Settings
 *
 * chrome.storage.session keys:
 *   agrifine_api_key        — string (never persisted to local)
 */

export const KEYS = {
  READING_LIST:    'agrifine_reading_list',
  INGESTED_FILES:  'agrifine_ingested_files',
  FIELD_PROFILES:  'agrifine_field_profiles',
  SETTINGS:        'agrifine_settings',
  API_KEY:         'agrifine_api_key',   // session only
};

// ── Generic helpers ──────────────────────────────────────────────────────────

export async function localGet(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result[key] ?? null));
  });
}

export async function localSet(key, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

export async function sessionGet(key) {
  return new Promise((resolve) => {
    chrome.storage.session.get(key, (result) => resolve(result[key] ?? null));
  });
}

export async function sessionSet(key, value) {
  return new Promise((resolve) => {
    chrome.storage.session.set({ [key]: value }, resolve);
  });
}

// ── Reading List ─────────────────────────────────────────────────────────────

export async function getReadingList() {
  return (await localGet(KEYS.READING_LIST)) ?? [];
}

export async function saveReadingItem(item) {
  const list = await getReadingList();
  list.unshift(item);
  await localSet(KEYS.READING_LIST, list);
}

export async function deleteReadingItem(id) {
  const list = await getReadingList();
  await localSet(KEYS.READING_LIST, list.filter((i) => i.id !== id));
}

// ── Ingested Files ───────────────────────────────────────────────────────────

export async function getIngestedFiles() {
  return (await localGet(KEYS.INGESTED_FILES)) ?? [];
}

export async function saveIngestedFile(file) {
  const files = await getIngestedFiles();
  files.unshift(file);
  await localSet(KEYS.INGESTED_FILES, files);
}

export async function deleteIngestedFile(id) {
  const files = await getIngestedFiles();
  await localSet(KEYS.INGESTED_FILES, files.filter((f) => f.id !== id));
}

// ── Field Profiles ───────────────────────────────────────────────────────────

export async function getFieldProfiles() {
  return (await localGet(KEYS.FIELD_PROFILES)) ?? [];
}

export async function saveFieldProfile(profile) {
  const profiles = await getFieldProfiles();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.unshift(profile);
  }
  await localSet(KEYS.FIELD_PROFILES, profiles);
}

export async function deleteFieldProfile(id) {
  const profiles = await getFieldProfiles();
  await localSet(KEYS.FIELD_PROFILES, profiles.filter((p) => p.id !== id));
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings() {
  return (await localGet(KEYS.SETTINGS)) ?? { theme: 'light', defaultState: 'all' };
}

export async function saveSettings(patch) {
  const current = await getSettings();
  await localSet(KEYS.SETTINGS, { ...current, ...patch });
}

// ── Context bundle (used as AI system context) ───────────────────────────────

export async function buildContextBundle() {
  const list = await getReadingList();
  const profiles = await getFieldProfiles();

  const readingCtx = list.slice(0, 20).map((item) =>
    `[${item.tags?.join(', ') ?? 'general'}] ${item.title}: ${item.summary ?? ''}`
  ).join('\n');

  const fieldCtx = profiles.map((p) =>
    `Field "${p.name}" (${p.acres ?? '?'} ac, ${p.soilType ?? 'unknown soil'}): ${p.notes ?? ''}`
  ).join('\n');

  return [
    'USER READING LIST CONTEXT:',
    readingCtx || '(none)',
    '',
    'FIELD PROFILES:',
    fieldCtx || '(none)',
  ].join('\n');
}
