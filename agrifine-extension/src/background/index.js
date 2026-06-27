import { sessionGet, sessionSet, KEYS } from '../utils/storage.js';
import { fetchAnthropic } from '../utils/api.js';

// Open the side panel when the action icon is clicked
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);

// ── Message router ────────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case 'ANTHROPIC_REQUEST':
      handleAnthropicRequest(message.payload).then(sendResponse).catch((err) =>
        sendResponse({ error: err.message })
      );
      return true; // keep channel open for async response

    case 'SET_API_KEY':
      sessionSet(KEYS.API_KEY, message.payload.key)
        .then(() => sendResponse({ ok: true }))
        .catch((err) => sendResponse({ error: err.message }));
      return true;

    case 'GET_PAGE_CONTENT':
      // Content script relays page text; background stores it temporarily
      sendResponse({ ok: true });
      return false;

    default:
      return false;
  }
});

async function handleAnthropicRequest({ system, userMessage, maxTokens }) {
  const text = await fetchAnthropic({ system, userMessage, maxTokens });
  return { text };
}

// Keep service worker alive during active side-panel sessions
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepalive') {
    port.onDisconnect.addListener(() => {});
  }
});
