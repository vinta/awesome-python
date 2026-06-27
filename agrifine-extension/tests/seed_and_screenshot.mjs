/**
 * Agrifine seeder + screenshot test
 * Seeds all storage with realistic farm data and screenshots every tab.
 * Run: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tests/seed_and_screenshot.mjs
 */

import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const UNIT_ROOT = resolve(__dir, '..');
const DIST = resolve(UNIT_ROOT, 'dist');
const SCREENSHOTS = resolve(UNIT_ROOT, 'screenshots');
const CHROMIUM = process.env.PLAYWRIGHT_BROWSERS_PATH
  ? `${process.env.PLAYWRIGHT_BROWSERS_PATH}/chromium-1194/chrome-linux/chrome`
  : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

mkdirSync(SCREENSHOTS, { recursive: true });

// ── Seed data ────────────────────────────────────────────────────────────────

const SEED = {
  agrifine_field_profiles: [
    {
      id: 'fp_001', name: 'North 80', acres: 78.4, soilType: 'Silty Clay Loam',
      cluId: 'IL-147-0412', coordinates: { lat: 41.8827, lon: -88.0071 },
      notes: 'Tile-drained. Historically strong corn yields. Slight compaction issue in SW corner.',
      cropHistory: [
        { year: 2023, crop: 'Corn', yield: 212, unit: 'bu/ac' },
        { year: 2022, crop: 'Soybeans', yield: 58, unit: 'bu/ac' },
        { year: 2021, crop: 'Corn', yield: 198, unit: 'bu/ac' },
        { year: 2020, crop: 'Soybeans', yield: 54, unit: 'bu/ac' },
      ],
      harvestRecords: [
        { date: '2023-10-14', crop: 'Corn', yield: 212, unit: 'bu/ac', moisture: 17.2 },
        { date: '2022-09-28', crop: 'Soybeans', yield: 58, unit: 'bu/ac', moisture: 13.1 },
      ],
      carbonPotential: null, weatherData: null,
      createdAt: '2024-01-15T10:00:00Z', _source: 'manual',
    },
    {
      id: 'fp_002', name: 'South Bottoms', acres: 112.0, soilType: 'Silt Loam',
      cluId: 'IL-147-0413', coordinates: { lat: 41.8750, lon: -88.0120 },
      notes: 'Flood risk near creek. Reduced tillage program since 2021. Good organic matter.',
      cropHistory: [
        { year: 2023, crop: 'Soybeans', yield: 62, unit: 'bu/ac' },
        { year: 2022, crop: 'Corn', yield: 205, unit: 'bu/ac' },
        { year: 2021, crop: 'Soybeans', yield: 57, unit: 'bu/ac' },
      ],
      harvestRecords: [
        { date: '2023-09-22', crop: 'Soybeans', yield: 62, unit: 'bu/ac', moisture: 12.8 },
      ],
      carbonPotential: null, weatherData: null,
      createdAt: '2024-01-15T10:30:00Z', _source: 'manual',
    },
    {
      id: 'fp_003', name: 'East Pivot', acres: 134.5, soilType: 'Sandy Loam',
      cluId: 'IL-147-0414', coordinates: { lat: 41.8900, lon: -87.9980 },
      notes: 'Center pivot irrigation. Drought-susceptible. Cover crop trial started 2022.',
      cropHistory: [
        { year: 2023, crop: 'Corn', yield: 225, unit: 'bu/ac' },
        { year: 2022, crop: 'Corn', yield: 218, unit: 'bu/ac' },
      ],
      harvestRecords: [
        { date: '2023-10-20', crop: 'Corn', yield: 225, unit: 'bu/ac', moisture: 15.9 },
      ],
      carbonPotential: null, weatherData: null,
      createdAt: '2024-01-16T08:00:00Z', _source: 'manual',
    },
  ],

  agrifine_ingested_files: [
    {
      id: 'file_001', filename: 'harvest_2023_fall.csv', type: 'CSV',
      uploadedAt: '2024-01-10T14:22:00Z',
      structuredData: {
        operation_type: 'Corn Harvest',
        fields: ['North 80', 'East Pivot'],
        total_acres: 212.9,
        avg_yield_bu_ac: 218.5,
        avg_moisture_pct: 16.6,
        equipment: 'Case IH 8250',
        total_bushels: 46520,
      },
      preview: 'operation_type: "Corn Harvest" | fields: ["North 80","East Pivot"] | total_acres: 212.9 | avg_yield_bu_ac: 218.5',
    },
    {
      id: 'file_002', filename: 'soil_test_results_2023.xlsx', type: 'Excel',
      uploadedAt: '2024-01-08T09:15:00Z',
      structuredData: {
        test_date: '2023-08-15',
        fields_tested: 3,
        avg_ph: 6.8,
        avg_p_ppm: 42,
        avg_k_ppm: 180,
        cec: 22.4,
        organic_matter_pct: 3.8,
        recommendations: 'Apply 200 lbs/ac 0-46-0 on South Bottoms before corn planting',
      },
      preview: 'test_date: "2023-08-15" | avg_ph: 6.8 | avg_p_ppm: 42 | organic_matter_pct: 3.8',
    },
    {
      id: 'file_003', filename: 'input_expense_report_2023.pdf', type: 'PDF',
      uploadedAt: '2024-01-05T16:40:00Z',
      structuredData: {
        year: 2023,
        total_seed_cost: 48750,
        total_fertilizer_cost: 112400,
        total_chemical_cost: 31200,
        total_fuel_cost: 22800,
        total_expenses: 215150,
        cost_per_acre: 652,
      },
      preview: 'year: 2023 | total_seed_cost: 48750 | total_fertilizer_cost: 112400 | cost_per_acre: 652',
    },
  ],

  agrifine_reading_list: [
    {
      id: 'rl_001',
      url: 'https://www.farmprogress.com/corn/usda-raises-corn-yield-forecast',
      title: 'USDA Raises 2023 Corn Yield Forecast to 174.9 Bu/Acre',
      savedAt: '2024-01-18T11:30:00Z',
      summary: 'USDA updated its corn yield forecast to 174.9 bushels per acre for the 2023 crop, up 1.2 bu from the November estimate, citing favorable harvest conditions across the Corn Belt.',
      tags: ['USDA', 'agriculture', 'finance'],
    },
    {
      id: 'rl_002',
      url: 'https://www.dtnpf.com/agriculture/web/ag/news/article/2024/01/15/la-nina-threat-corn-belt-spring',
      title: 'La Niña Threat Could Dry Out Corn Belt This Spring',
      savedAt: '2024-01-17T09:15:00Z',
      summary: 'Meteorologists warn a developing La Niña pattern may reduce spring rainfall across Illinois and Indiana, raising drought risk for early-planted corn. Irrigation demand could spike 20-30% above normal.',
      tags: ['weather', 'agriculture'],
    },
    {
      id: 'rl_003',
      url: 'https://www.agriculture.com/carbon-markets-eqip-2024',
      title: 'EQIP Carbon Market Signup Opens February 2024',
      savedAt: '2024-01-16T14:00:00Z',
      summary: 'USDA NRCS opened signup for the Environmental Quality Incentives Program carbon track, offering $45-65 per acre for verified no-till and cover crop practices across enrolled fields.',
      tags: ['carbon', 'USDA', 'finance'],
    },
  ],

  agrifine_farm_memory: {
    lastUpdated: '2024-01-18T12:00:00Z',
    farm_name: 'Hendricks Family Farms',
    total_acres: 324.9,
    primary_crops: ['Corn', 'Soybeans'],
    soil_overview: 'Mixed silty clay loam and sandy loam soils. Average OM 3.8%. Tile drainage on North 80. Flood risk on South Bottoms near creek.',
    aiGeneratedSummary: 'Hendricks Family Farms operates 324.9 acres across three fields in Kane County, IL. The 2023 corn crop averaged 218.5 bu/ac — above county average — driven by strong yields on the irrigated East Pivot (225 bu/ac). South Bottoms carries meaningful flood risk but benefits from 3+ years of reduced tillage. Soil tests indicate adequate fertility; phosphorus application recommended on South Bottoms ahead of 2024 corn rotation. Total 2023 input costs of $215,150 ($652/ac) leave healthy margin at current corn prices.',
    key_insights: [
      'East Pivot leads yield performance at 225 bu/ac with irrigation advantage',
      'South Bottoms organic matter at 3.8% — reduced tillage program paying off',
      'Total operation averaged 218.5 bu/ac corn in 2023 vs 174.9 national average',
      'EQIP carbon program could generate $14,620–$21,118 annually across enrolled acres',
    ],
    action_items: [
      'Apply 200 lbs/ac 0-46-0 on South Bottoms before corn planting',
      'Evaluate EQIP carbon signup before February deadline',
      'Address SW corner compaction on North 80 — consider subsoiling pass',
      'Extend cover crop trial from East Pivot to North 80',
    ],
    risk_flags: [
      'La Niña pattern threatens spring drought — irrigation scheduling critical for East Pivot',
      'South Bottoms flood risk near creek — monitor spring soil moisture before planting',
      'Input costs at $652/ac — watch corn futures for margin compression',
    ],
    opportunities: [
      'Carbon credit program: $45-65/ac for documented no-till + cover crops',
      'East Pivot irrigation gives drought hedge — consider expanding irrigated acres',
      'Soybean rotation on North 80 in 2024 — lower input cost year',
    ],
  },
};

async function main() {
  if (!existsSync(DIST + '/manifest.json')) {
    console.error('ERROR: dist/ not found. Run: npm run build');
    process.exit(1);
  }

  console.log('Launching Chrome with seeded Agrifine extension…');

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

  const page = await context.newPage();

  // Stub chrome.* with SEEDED data
  await page.addInitScript((seed) => {
    const store = { ...seed };
    const sessionStore = {};

    window.chrome = {
      storage: {
        local: {
          get: (k, cb) => setTimeout(() => cb({ [k]: store[k] ?? null }), 0),
          set: (obj, cb) => { Object.assign(store, obj); cb && cb(); },
        },
        session: {
          get: (k, cb) => setTimeout(() => cb({ [k]: sessionStore[k] ?? null }), 0),
          set: (obj, cb) => { Object.assign(sessionStore, obj); cb && cb(); },
        },
      },
      runtime: {
        sendMessage: (_msg, cb) => cb && setTimeout(() => cb({ error: 'No background in test mode' }), 0),
        connect: () => ({ onDisconnect: { addListener: () => {} } }),
        lastError: null,
      },
      tabs: {
        query: (_q, cb) => cb([{ id: 1, url: 'https://farmprogress.com/corn', title: 'Farm Progress' }]),
        sendMessage: (_id, _msg, cb) => cb && cb({ text: 'test page content' }),
      },
      sidePanel: { setPanelBehavior: () => Promise.resolve() },
      scripting: { executeScript: (_opts, cb) => cb && cb([{ result: {} }]) },
    };
  }, SEED);

  await page.goto(`file://${DIST}/sidebar.html`);
  await page.waitForSelector('#main-content', { timeout: 8000 });
  await page.waitForTimeout(600);

  async function ss(name) {
    const file = `${SCREENSHOTS}/${name}.png`;
    await page.screenshot({ path: file });
    console.log(`  Screenshot: ${file}`);
    return file;
  }

  async function tab(name) {
    const TAB_MAP = {
      reading: '[data-tab="reading-list"]',
      ingest:  '[data-tab="data-ingest"]',
      fields:  '[data-tab="field-profile"]',
      dashboard: '[data-tab="dashboard"]',
      carbon:  '[data-tab="carbon-estimator"]',
      agent:   '[data-tab="ag-refine"]',
    };
    await page.click(TAB_MAP[name]);
    await page.waitForTimeout(500);
  }

  // ── 1. Reading List (default tab) ──────────────────────────────────────────
  console.log('\n[1/6] Reading List tab');
  await ss('01_reading_list');

  // ── 2. Data Ingest ─────────────────────────────────────────────────────────
  console.log('\n[2/6] Data Ingest tab');
  await tab('ingest');
  await ss('02_data_ingest');

  // ── 3. Field Profiles ──────────────────────────────────────────────────────
  console.log('\n[3/6] Field Profiles tab');
  await tab('fields');
  await page.waitForTimeout(300);
  await ss('03_field_profiles');

  // Expand first field
  const firstCard = page.locator('.agri-card').first();
  if (await firstCard.count()) {
    await firstCard.click();
    await page.waitForTimeout(400);
    await ss('03b_field_expanded');
  }

  // ── 4. Dashboard ──────────────────────────────────────────────────────────
  console.log('\n[4/6] Dashboard tab');
  await tab('dashboard');
  await page.waitForTimeout(400);
  await ss('04_dashboard');

  // ── 5. Carbon Estimator ───────────────────────────────────────────────────
  console.log('\n[5/6] Carbon Estimator tab');
  await tab('carbon');
  await ss('05_carbon');

  // ── 6. AgriAgent ─────────────────────────────────────────────────────────
  console.log('\n[6/6] AgriAgent tab');
  await tab('agent');
  await ss('06_agent');

  // ── Probe: settings panel ─────────────────────────────────────────────────
  console.log('\n[probe] Settings panel');
  await page.click('#btn-settings');
  await page.waitForTimeout(300);
  await ss('07_settings_panel');

  // ── Probe: new field form ─────────────────────────────────────────────────
  console.log('\n[probe] New field form');
  await tab('fields');
  await page.waitForTimeout(300);
  await page.click('#fp-new-btn');
  await page.waitForTimeout(300);
  await ss('08_new_field_form');

  // ── Report what is and isn't visible ─────────────────────────────────────
  const fieldCount = await page.evaluate(() =>
    document.querySelectorAll('.agri-card').length
  );
  console.log(`\nField cards visible after form open: ${fieldCount}`);

  await context.close();
  console.log('\nAll screenshots saved to:', SCREENSHOTS);
}

main().catch(err => { console.error(err); process.exit(1); });
