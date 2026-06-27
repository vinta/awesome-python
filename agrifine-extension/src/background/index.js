import { sessionGet, sessionSet, KEYS } from '../utils/storage.js';
import { fetchAnthropic } from '../utils/api.js';
import { syncFromAgRefine } from '../utils/agrefine-bridge.js';

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
      sendResponse({ ok: true });
      return false;

    case 'CAPTURE_SCREENSHOT':
      captureActiveTabScreenshot()
        .then(sendResponse)
        .catch((err) => sendResponse({ error: err.message }));
      return true;

    case 'GET_ACTIVE_TAB_CONTENT':
      getActiveTabContent()
        .then(sendResponse)
        .catch((err) => sendResponse({ error: err.message }));
      return true;

    case 'OPEN_TAB':
      openUrlInTab(message.payload.url)
        .then(sendResponse)
        .catch((err) => sendResponse({ error: err.message }));
      return true;

    case 'READ_TAB_CONTENT':
      readTabContent(message.payload?.tab_id)
        .then(sendResponse)
        .catch((err) => sendResponse({ error: err.message }));
      return true;

    case 'AGREFINE_SYNC':
      syncFromAgRefine()
        .then(sendResponse)
        .catch((err) => sendResponse({ ok: false, error: err.message }));
      return true;

    default:
      return false;
  }
});

async function handleAnthropicRequest({ system, userMessage, maxTokens }) {
  const text = await fetchAnthropic({ system, userMessage, maxTokens });
  return { text };
}

async function captureActiveTabScreenshot() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error('No active tab found');
  const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'jpeg', quality: 80 });
  return { dataUrl, url: tab.url, title: tab.title };
}

async function getActiveTabContent() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error('No active tab found');
  try {
    const resp = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_INFO' });
    return { url: tab.url, title: tab.title, text: resp?.text ?? '', source: 'active_tab' };
  } catch (_) {
    return {
      url: tab.url,
      title: tab.title,
      text: '',
      source: 'active_tab',
      note: 'Content script unavailable on this page (chrome://, extensions, etc.)',
    };
  }
}

function waitForTabLoad(tabId, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener);
      chrome.tabs.get(tabId).then(resolve).catch(() => reject(new Error('Tab load timed out')));
    }, timeoutMs);
    function listener(id, info, tab) {
      if (id !== tabId || info.status !== 'complete') return;
      chrome.tabs.onUpdated.removeListener(listener);
      clearTimeout(timer);
      resolve(tab);
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
}

async function openUrlInTab(url) {
  const tab = await chrome.tabs.create({ url, active: true });
  const loaded = await waitForTabLoad(tab.id);
  return { tab_id: loaded.id, url: loaded.url, title: loaded.title, status: 'ready' };
}

async function readTabContent(tabId) {
  const targetId = tabId
    ?? (await chrome.tabs.query({ active: true, currentWindow: true }))[0]?.id;
  if (!targetId) throw new Error('No tab found');

  const [result] = await chrome.scripting.executeScript({
    target: { tabId: targetId },
    func: () => {
      const selectors = ['article', 'main', '[role="main"]', '.content', '#content'];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const clone = el.cloneNode(true);
          clone.querySelectorAll('script,style,nav,header,footer,aside').forEach((n) => n.remove());
          return { url: location.href, title: document.title, text: clone.innerText.trim().slice(0, 8000) };
        }
      }
      return { url: location.href, title: document.title, text: document.body?.innerText?.slice(0, 8000) ?? '' };
    },
  });
  return result.result;
}

// Keep service worker alive during active side-panel sessions
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepalive') {
    port.onDisconnect.addListener(() => {});
  }
});
