import { parseWebhookEvent } from '../services/tomtom.js';
import { sendMessage } from '../services/whatsapp.js';
import { uploadSummary } from '../services/dropbox.js';

const eventLog = [];

export function handleGeofenceEvent(rawBody) {
  const event = parseWebhookEvent(rawBody);
  const ts = event.timestamp?.slice(0, 16).replace('T', ' ') ?? new Date().toISOString().slice(0, 16);

  eventLog.push(event);
  if (eventLog.length > 200) eventLog.shift();

  const emoji = event.eventType === 'entry' ? '🟢' : '🔴';
  const msg = `${emoji} [${ts}] ${event.objectId} ${event.eventType === 'entry' ? 'entered' : 'left'} ${event.fenceName}`;

  console.log('[geofence]', msg);

  sendMessage(msg).catch(() => {});

  const logLine = `${ts} | ${event.eventType} | object: ${event.objectId} | fence: ${event.fenceName} | ${event.lat},${event.lon}\n`;
  const today = new Date().toISOString().slice(0, 10);
  uploadSummary(`geofence_log_${today}.txt`, getGeofenceLogText()).catch(() => {});

  return event;
}

function getGeofenceLogText() {
  return eventLog
    .map((e) => `${e.timestamp?.slice(0, 16)} | ${e.eventType} | ${e.objectId} | ${e.fenceName}`)
    .join('\n');
}

export function getRecentEvents(limit = 20) {
  return eventLog.slice(-limit);
}
