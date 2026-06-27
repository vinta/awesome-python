import { getReadingList, getIngestedFiles, getFieldProfiles } from '../utils/storage.js';

function csvEscape(val) {
  const s = String(val ?? '');
  return (s.includes(',') || s.includes('"') || s.includes('\n'))
    ? `"${s.replace(/"/g, '""')}"` : s;
}

// ── Tool definitions sent to Claude ──────────────────────────────────────────

export const TOOL_DEFINITIONS = [
  {
    name: 'get_reading_list',
    description: 'Retrieve saved web pages from the user\'s reading list. Can filter by tag.',
    input_schema: {
      type: 'object',
      properties: {
        tag: {
          type: 'string',
          description: 'Optional tag to filter by: agriculture, equipment, land, carbon, USDA, dairy, finance, weather',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_field_profiles',
    description: 'Retrieve all farm field profiles including acreage, soil type, coordinates, crop history, and notes.',
    input_schema: {
      type: 'object',
      properties: {
        field_name: {
          type: 'string',
          description: 'Optional field name to filter by (partial match)',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_ingested_files',
    description: 'Retrieve all uploaded and parsed farm data files (CSV, Excel, PDF). Returns structured JSON extracted from each file.',
    input_schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['CSV', 'Excel', 'PDF'],
          description: 'Optional file type filter',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_weather',
    description: 'Fetch current conditions, 7-day forecast, and calculate Growing Degree Days (GDD) for a field location using Open-Meteo (free, no key required).',
    input_schema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude of the field',
        },
        longitude: {
          type: 'number',
          description: 'Longitude of the field',
        },
        field_name: {
          type: 'string',
          description: 'Human-readable field name for context',
        },
      },
      required: ['latitude', 'longitude'],
    },
  },
  {
    name: 'lookup_usda_soil',
    description: 'Look up soil data from the USDA Web Soil Survey API by coordinates. Returns soil series, texture, organic matter, and drainage class.',
    input_schema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude',
        },
        longitude: {
          type: 'number',
          description: 'Longitude',
        },
      },
      required: ['latitude', 'longitude'],
    },
  },
  {
    name: 'screenshot_active_tab',
    description: 'Take a screenshot of the currently active browser tab. Returns an image Claude can visually inspect — use this to see what the user is currently viewing, check a web page layout, verify data on screen, or analyse any visible content.',
    input_schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Optional note about why the screenshot is being taken (for context)',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_page_content',
    description: 'Fetch the full text content of the currently active browser tab, or look up a saved reading-list URL. Use this to read articles, extract data from web pages, or analyse the text of any page the user has open.',
    input_schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'Optional URL to look up in the saved reading list. If omitted, reads the active tab.',
        },
      },
      required: [],
    },
  },
  {
    name: 'export_farm_data',
    description: 'Generate and download a CSV or JSON export of farm data. Triggers a file download in the user\'s browser. Use when the user asks to export, download, or save their farm data.',
    input_schema: {
      type: 'object',
      properties: {
        data_type: {
          type: 'string',
          enum: ['reading_list', 'field_profiles', 'ingested_files', 'all'],
          description: 'Which data set to export',
        },
        format: {
          type: 'string',
          enum: ['csv', 'json'],
          description: 'File format (csv or json). "all" data_type always uses json.',
        },
      },
      required: ['data_type'],
    },
  },
  {
    name: 'open_tab',
    description: 'Open a URL in a new browser tab and wait for it to load. Use this to navigate to a relevant website — USDA, weather services, commodity markets, farm news, etc. After opening, call read_tab_content or screenshot_active_tab to extract information.',
    input_schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The full URL to open (must start with https:// or http://)',
        },
        reason: {
          type: 'string',
          description: 'Why you are opening this URL — shown to the user',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'read_tab_content',
    description: 'Extract and parse the text content of a browser tab. Call after open_tab to read the page that was just loaded, or omit tab_id to read the currently active tab.',
    input_schema: {
      type: 'object',
      properties: {
        tab_id: {
          type: 'number',
          description: 'Tab ID returned by open_tab. Omit to read the currently active tab.',
        },
      },
      required: [],
    },
  },
  {
    name: 'calculate_gdd',
    description: 'Calculate Growing Degree Days from temperature data. Uses base temp of 50°F for forage crops.',
    input_schema: {
      type: 'object',
      properties: {
        daily_highs: {
          type: 'array',
          items: { type: 'number' },
          description: 'Array of daily high temperatures in Fahrenheit',
        },
        daily_lows: {
          type: 'array',
          items: { type: 'number' },
          description: 'Array of daily low temperatures in Fahrenheit',
        },
        base_temp: {
          type: 'number',
          description: 'Base temperature in °F (default 50 for forage crops)',
        },
      },
      required: ['daily_highs', 'daily_lows'],
    },
  },
];

// ── Tool implementations ──────────────────────────────────────────────────────

export async function executeTool(name, input) {
  switch (name) {
    case 'get_reading_list':
      return toolGetReadingList(input);
    case 'get_field_profiles':
      return toolGetFieldProfiles(input);
    case 'get_ingested_files':
      return toolGetIngestedFiles(input);
    case 'get_weather':
      return toolGetWeather(input);
    case 'lookup_usda_soil':
      return toolLookupUSDAsoil(input);
    case 'calculate_gdd':
      return toolCalculateGDD(input);
    case 'screenshot_active_tab':
      return toolScreenshotActiveTab(input);
    case 'get_page_content':
      return toolGetPageContent(input);
    case 'export_farm_data':
      return toolExportFarmData(input);
    case 'open_tab':
      return toolOpenTab(input);
    case 'read_tab_content':
      return toolReadTabContent(input);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

async function toolGetReadingList({ tag } = {}) {
  const list = await getReadingList();
  const filtered = tag ? list.filter((i) => i.tags?.includes(tag)) : list;
  return {
    count: filtered.length,
    items: filtered.slice(0, 30).map((i) => ({
      title: i.title,
      url: i.url,
      summary: i.summary,
      tags: i.tags,
      savedAt: i.savedAt,
    })),
  };
}

async function toolGetFieldProfiles({ field_name } = {}) {
  const profiles = await getFieldProfiles();
  const filtered = field_name
    ? profiles.filter((p) => p.name?.toLowerCase().includes(field_name.toLowerCase()))
    : profiles;
  return {
    count: filtered.length,
    profiles: filtered.map((p) => ({
      id: p.id,
      name: p.name,
      acres: p.acres,
      soilType: p.soilType,
      cluId: p.cluId,
      coordinates: p.coordinates,
      notes: p.notes,
      cropHistory: p.cropHistory,
      harvestRecords: p.harvestRecords,
      createdAt: p.createdAt,
    })),
  };
}

async function toolGetIngestedFiles({ type } = {}) {
  const files = await getIngestedFiles();
  const filtered = type ? files.filter((f) => f.type === type) : files;
  return {
    count: filtered.length,
    files: filtered.map((f) => ({
      filename: f.filename,
      type: f.type,
      uploadedAt: f.uploadedAt,
      structuredData: f.structuredData,
    })),
  };
}

async function toolGetWeather({ latitude, longitude, field_name = 'field' }) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set('current', 'temperature_2m,precipitation,wind_speed_10m,weather_code');
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max');
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('precipitation_unit', 'inch');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('timezone', 'auto');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  const data = await res.json();

  const current = data.current;
  const daily = data.daily;

  // GDD accumulation from forecast
  const gddDays = daily.temperature_2m_max.map((hi, i) => {
    const lo = daily.temperature_2m_min[i];
    return Math.max(0, ((hi + lo) / 2) - 50);
  });
  const totalGDD = gddDays.reduce((a, b) => a + b, 0);

  // Rain alert: >0.5 inch in next 48h
  const rainAlert = (daily.precipitation_sum[0] ?? 0) + (daily.precipitation_sum[1] ?? 0) > 0.5;

  // Harvest window
  const avgRainProb = (daily.precipitation_probability_max.slice(0, 3).reduce((a, b) => a + b, 0) / 3);
  const harvestWindow = avgRainProb < 20 ? 'GREEN' : avgRainProb < 50 ? 'YELLOW' : 'RED';

  return {
    field: field_name,
    coordinates: { latitude, longitude },
    current: {
      temperature_f: current.temperature_2m,
      precipitation_in: current.precipitation,
      wind_mph: current.wind_speed_10m,
    },
    forecast_7day: daily.time.map((date, i) => ({
      date,
      high_f: daily.temperature_2m_max[i],
      low_f: daily.temperature_2m_min[i],
      precip_in: daily.precipitation_sum[i],
      rain_probability_pct: daily.precipitation_probability_max[i],
      gdd: gddDays[i].toFixed(1),
    })),
    gdd_7day_total: totalGDD.toFixed(1),
    rain_alert_48h: rainAlert,
    harvest_window: harvestWindow,
  };
}

async function toolLookupUSDAsoil({ latitude, longitude }) {
  // USDA Web Soil Survey SDA REST API
  const query = `SELECT mapunit.muname, component.compname, component.comppct_r,
    component.taxorder, component.taxsubgrp, chorizon.texture, chorizon.om_r,
    chorizon.drainagecl
    FROM mapunit
    INNER JOIN component ON mapunit.mukey = component.mukey
    INNER JOIN chorizon ON component.cokey = chorizon.cokey
    WHERE mu_lks.mukey IN (
      SELECT * FROM SDA_Get_Mukey_from_intersection_with_WktWgs84(
        'point(${longitude} ${latitude})')
    )
    AND component.majcompflag = 'Yes'
    ORDER BY component.comppct_r DESC`;

  try {
    const res = await fetch('https://sdmdataaccess.sc.egov.usda.gov/TABULAR/post.rest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `request=query&query=${encodeURIComponent(query)}&format=JSON`,
    });
    if (!res.ok) throw new Error(`USDA SDA API ${res.status}`);
    const data = await res.json();
    const rows = data.Table ?? [];
    return {
      coordinates: { latitude, longitude },
      soil_data: rows.slice(0, 5).map((r) => ({
        map_unit: r[0],
        component: r[1],
        percent: r[2],
        tax_order: r[3],
        subgroup: r[4],
        texture: r[5],
        organic_matter_pct: r[6],
        drainage_class: r[7],
      })),
    };
  } catch (_) {
    return {
      coordinates: { latitude, longitude },
      note: 'USDA SDA API unavailable — soil data requires network access from background worker',
    };
  }
}

function toolScreenshotActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }
      // Strip data URL prefix — agent.js will format this as an image content block
      const base64 = response.dataUrl.replace(/^data:image\/\w+;base64,/, '');
      resolve({
        _type: 'image',
        media_type: 'image/jpeg',
        data: base64,
        url: response.url,
        title: response.title,
      });
    });
  });
}

async function toolGetPageContent({ url } = {}) {
  // Check reading list cache first if a URL was given
  if (url) {
    const list = await getReadingList();
    const saved = list.find((i) => i.url === url || i.url.startsWith(url));
    if (saved) {
      return {
        url: saved.url,
        title: saved.title,
        summary: saved.summary,
        tags: saved.tags,
        source: 'reading_list_cache',
      };
    }
  }

  // Fall back to reading the active tab via content script
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'GET_ACTIVE_TAB_CONTENT' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }
      resolve(response);
    });
  });
}

async function toolExportFarmData({ data_type, format = 'csv' }) {
  let records;
  let filename;
  let content;
  const date = new Date().toISOString().slice(0, 10);

  if (data_type === 'all') {
    const [rl, files, profiles] = await Promise.all([getReadingList(), getIngestedFiles(), getFieldProfiles()]);
    filename = `agrifine_export_${date}.json`;
    content = JSON.stringify({ reading_list: rl, ingested_files: files, field_profiles: profiles }, null, 2);
    records = rl.length + files.length + profiles.length;
  } else if (data_type === 'reading_list') {
    const list = await getReadingList();
    records = list.length;
    filename = `agrifine_reading_list_${date}.${format}`;
    if (format === 'json') {
      content = JSON.stringify(list, null, 2);
    } else {
      const hdrs = ['title', 'url', 'summary', 'tags', 'savedAt'];
      const rows = list.map((i) => [i.title, i.url, i.summary ?? '', (i.tags ?? []).join('; '), i.savedAt].map(csvEscape));
      content = [hdrs.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }
  } else if (data_type === 'field_profiles') {
    const profiles = await getFieldProfiles();
    records = profiles.length;
    filename = `agrifine_field_profiles_${date}.${format}`;
    if (format === 'json') {
      content = JSON.stringify(profiles, null, 2);
    } else {
      const hdrs = ['name', 'acres', 'soil_type', 'latitude', 'longitude', 'clu_id', 'notes', 'created_at'];
      const rows = profiles.map((p) => [
        p.name, p.acres ?? '', p.soilType ?? '',
        p.coordinates?.lat ?? '', p.coordinates?.lon ?? '',
        p.cluId ?? '', p.notes ?? '', p.createdAt,
      ].map(csvEscape));
      content = [hdrs.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }
  } else if (data_type === 'ingested_files') {
    const files = await getIngestedFiles();
    records = files.length;
    filename = `agrifine_ingested_files_${date}.json`;
    content = JSON.stringify(files, null, 2);
  } else {
    return { error: `Unknown data_type: ${data_type}` };
  }

  // Trigger download inside the sidebar page
  const mimeType = filename.endsWith('.json') ? 'application/json' : 'text/csv';
  const blob = new Blob([content], { type: mimeType });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);

  return { exported: true, filename, record_count: records, format: filename.split('.').pop(), data_type };
}

function toolOpenTab({ url, reason }) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return Promise.resolve({ error: 'URL must start with http:// or https://' });
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'OPEN_TAB', payload: { url } }, (response) => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      if (response?.error) { reject(new Error(response.error)); return; }
      resolve({ ...response, reason: reason ?? null });
    });
  });
}

function toolReadTabContent({ tab_id } = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'READ_TAB_CONTENT', payload: { tab_id: tab_id ?? null } }, (response) => {
      if (chrome.runtime.lastError) { reject(new Error(chrome.runtime.lastError.message)); return; }
      if (response?.error) { reject(new Error(response.error)); return; }
      resolve(response);
    });
  });
}

function toolCalculateGDD({ daily_highs, daily_lows, base_temp = 50 }) {
  const gdd_per_day = daily_highs.map((hi, i) => {
    const lo = daily_lows[i] ?? hi;
    const avg = (hi + lo) / 2;
    return Math.max(0, avg - base_temp);
  });
  const total = gdd_per_day.reduce((a, b) => a + b, 0);
  return {
    base_temp_f: base_temp,
    days: gdd_per_day.length,
    gdd_per_day: gdd_per_day.map((g) => parseFloat(g.toFixed(1))),
    total_gdd: parseFloat(total.toFixed(1)),
    interpretation:
      total < 200 ? 'Early growth stage' :
      total < 500 ? 'Vegetative growth' :
      total < 900 ? 'Approaching harvest window' :
      'Harvest recommended',
  };
}
