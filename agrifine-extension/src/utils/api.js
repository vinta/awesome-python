import { sessionGet, KEYS } from './storage.js';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

/**
 * Send a message to the Anthropic API via the background service worker.
 * Content scripts and sidebar cannot call external APIs directly due to CSP,
 * so all API calls are proxied through the background worker.
 */
export async function callAnthropic({ system, userMessage, maxTokens = 1024 }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'ANTHROPIC_REQUEST', payload: { system, userMessage, maxTokens } },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (response?.error) {
          reject(new Error(response.error));
          return;
        }
        resolve(response?.text ?? '');
      }
    );
  });
}

/**
 * Direct fetch from background worker — keeps API key off content scripts.
 */
export async function fetchAnthropic({ system, userMessage, maxTokens = 1024 }) {
  const apiKey = await sessionGet(KEYS.API_KEY);
  if (!apiKey) throw new Error('No API key set. Open Agrifine settings to add your key.');

  const body = {
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: userMessage }],
  };

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

export const AGRICULTURE_TAGS = [
  'agriculture', 'equipment', 'land', 'carbon',
  'USDA', 'dairy', 'finance', 'weather',
];
