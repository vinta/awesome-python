/**
 * TomTom Geofencing
 *
 * This module:
 *  - Provides a webhook receiver for TomTom geofence entry/exit events
 *  - Creates geofences around field boundaries via the TomTom Geofencing API
 *  - Emits structured events consumed by jobs (e.g. log truck departure from field)
 *
 * TomTom Geofencing API docs:
 *   https://developer.tomtom.com/geofencing-api/documentation/product-information/introduction
 */
import { config } from '../config.js';

const BASE = 'https://api.tomtom.com';

export async function createGeofence({ name, lat, lon, radiusMeters = 500 }) {
  const url = `${BASE}/geofencing/1/projects/project/fences?key=${config.tomtom.apiKey}`;
  const body = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      radius: radiusMeters,
      coordinates: [lon, lat],
    },
    properties: { name },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`TomTom geofence create ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function listGeofences() {
  const url = `${BASE}/geofencing/1/projects/project/fences?key=${config.tomtom.apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TomTom list fences ${res.status}`);
  return res.json();
}

export async function registerObject({ objectId, externalId = objectId }) {
  const url = `${BASE}/geofencing/1/projects/project/objects/${objectId}?key=${config.tomtom.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ externalId }),
  });
  if (!res.ok) throw new Error(`TomTom register object ${res.status}`);
  return res.json();
}

export async function reportPosition({ objectId, lat, lon }) {
  const url = `${BASE}/geofencing/1/report/${objectId}?key=${config.tomtom.apiKey}&position=${lon},${lat}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TomTom report position ${res.status}`);
  return res.json();
}

export function parseWebhookEvent(body) {
  return {
    objectId:   body.objectId   ?? body.object_id,
    fenceName:  body.fenceName  ?? body.fence_name,
    eventType:  body.eventType  ?? body.event_type,   // 'entry' | 'exit'
    lat:        body.lat        ?? body.latitude,
    lon:        body.lon        ?? body.longitude,
    timestamp:  body.timestamp  ?? new Date().toISOString(),
  };
}
