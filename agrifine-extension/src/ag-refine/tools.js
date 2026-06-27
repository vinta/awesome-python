import { getReadingList, getIngestedFiles, getFieldProfiles } from '../utils/storage.js';

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
