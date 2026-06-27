/**
 * Agrifine storage schema
 *
 * chrome.storage.local keys:
 *   agrifine_reading_list   — Array<ReadingItem>
 *   agrifine_ingested_files — Array<IngestedFile>
 *   agrifine_field_profiles — Array<FieldProfile>
 *   agrifine_settings       — Settings
 *   agrifine_farm_memory    — FarmMemory (AI-synthesized knowledge base)
 *
 * chrome.storage.session keys:
 *   agrifine_api_key        — string (never persisted to local)
 *
 * FarmMemory shape:
 *   {
 *     lastUpdated: ISO string,
 *     aiGeneratedSummary: string,   // Claude's narrative synthesis of the whole farm
 *     farm_name: string | null,
 *     total_acres: number | null,
 *     primary_crops: string[],
 *     soil_overview: string | null,
 *     key_insights: string[],       // important observations
 *     action_items: string[],       // recommended next steps
 *     risk_flags: string[],         // risks or concerns to watch
 *     opportunities: string[],      // identified opportunities
 *   }
 */

export const KEYS = {
  READING_LIST:   'agrifine_reading_list',
  INGESTED_FILES: 'agrifine_ingested_files',
  FIELD_PROFILES: 'agrifine_field_profiles',
  SETTINGS:       'agrifine_settings',
  FARM_MEMORY:    'agrifine_farm_memory',
  API_KEY:        'agrifine_api_key',        // session storage (always)
  API_KEY_SAVED:  'agrifine_api_key_saved',  // local storage (when user opts to remember)
};

// ── Generic helpers ──────────────────────────────────────────────────────────

export async function localGet(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      resolve(result[key] ?? null);
    });
  });
}

export async function localSet(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      resolve();
    });
  });
}

export async function sessionGet(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.session.get(key, (result) => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      resolve(result[key] ?? null);
    });
  });
}

export async function sessionSet(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.session.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      resolve();
    });
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

// ── Farm Memory ──────────────────────────────────────────────────────────────

export async function getFarmMemory() {
  return (await localGet(KEYS.FARM_MEMORY)) ?? null;
}

export async function saveFarmMemory(memory) {
  await localSet(KEYS.FARM_MEMORY, { ...memory, lastUpdated: new Date().toISOString() });
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
  const [list, profiles, files, memory] = await Promise.all([
    getReadingList(),
    getFieldProfiles(),
    getIngestedFiles(),
    getFarmMemory(),
  ]);

  // ── 1. Farm memory (AI-synthesized knowledge — most important, goes first) ──
  let memorySection;
  if (memory) {
    const lines = [
      `FARM MEMORY (last updated ${memory.lastUpdated?.slice(0, 10) ?? 'unknown'}):`,
      memory.aiGeneratedSummary ?? '',
    ];
    if (memory.primary_crops?.length) lines.push(`Primary crops: ${memory.primary_crops.join(', ')}`);
    if (memory.total_acres != null) lines.push(`Total acreage: ${memory.total_acres} ac`);
    if (memory.key_insights?.length) {
      lines.push('Key insights:');
      memory.key_insights.forEach((s) => lines.push(`  • ${s}`));
    }
    if (memory.action_items?.length) {
      lines.push('Action items:');
      memory.action_items.forEach((s) => lines.push(`  • ${s}`));
    }
    if (memory.risk_flags?.length) {
      lines.push('Risk flags:');
      memory.risk_flags.forEach((s) => lines.push(`  ⚠ ${s}`));
    }
    memorySection = lines.filter(Boolean).join('\n');
  } else {
    memorySection = 'FARM MEMORY: (none yet — after reviewing field data, call update_farm_memory to build a persistent knowledge base)';
  }

  // ── 2. Field profiles with crop history and harvest records ──────────────────
  const fieldLines = profiles.length === 0 ? ['(none)'] : profiles.map((p) => {
    const coords = p.coordinates?.lat != null && p.coordinates?.lon != null
      ? `${p.coordinates.lat.toFixed(4)}, ${p.coordinates.lon.toFixed(4)}`
      : null;
    const history = (p.cropHistory ?? []).slice(0, 4).map((h) => `${h.year}: ${h.crop}`).join(', ');
    const harvests = (p.harvestRecords ?? []).slice(0, 3)
      .map((h) => `${h.date?.slice(0, 10) ?? '?'}: ${h.yield} ${h.unit ?? ''}`.trim()).join('; ');
    const parts = [
      `Field "${p.name}" | ${p.acres ?? '?'} ac | ${p.soilType ?? 'unknown soil'}`,
      coords ? `  Coords: ${coords}` : null,
      p.cluId ? `  CLU: ${p.cluId}` : null,
      history ? `  Crop history: ${history}` : null,
      harvests ? `  Harvests: ${harvests}` : null,
      p.notes ? `  Notes: ${p.notes}` : null,
    ];
    return parts.filter(Boolean).join('\n');
  });

  // ── 3. Ingested data files ───────────────────────────────────────────────────
  const fileLines = files.length === 0 ? ['(none)'] : files.slice(0, 10).map((f) => {
    const preview = f.structuredData
      ? Object.entries(f.structuredData)
          .filter(([k]) => k !== 'raw_preview' && k !== 'parse_error')
          .slice(0, 5)
          .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 120)}`)
          .join(' | ')
      : f.preview?.slice(0, 200) ?? '(no structured data)';
    return `[${f.type}] ${f.filename} (${f.uploadedAt?.slice(0, 10) ?? '?'}): ${preview}`;
  });

  // ── 4. Reading list (recent saved articles) ──────────────────────────────────
  const readingLines = list.length === 0 ? ['(none)'] : list.slice(0, 15).map((item) =>
    `[${item.tags?.join(', ') ?? 'general'}] "${item.title}": ${item.summary ?? '(no summary)'}`
  );

  return [
    memorySection,
    '',
    '── FIELD PROFILES ──',
    fieldLines.join('\n\n'),
    '',
    '── INGESTED DATA FILES ──',
    fileLines.join('\n'),
    '',
    '── READING LIST (recent articles) ──',
    readingLines.join('\n'),
  ].join('\n');
}
