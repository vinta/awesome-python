// Content script — minimal surface. Relays page metadata to background on request.

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_PAGE_INFO') {
    sendResponse({
      url: window.location.href,
      title: document.title,
      text: extractMainText(),
    });
  }
});

function extractMainText() {
  const selectors = ['article', 'main', '[role="main"]', '.content', '#content', 'body'];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) {
      // Strip scripts and styles, return first 8000 chars
      const clone = el.cloneNode(true);
      clone.querySelectorAll('script,style,nav,header,footer,aside').forEach((n) => n.remove());
      return clone.innerText.trim().slice(0, 8000);
    }
  }
  return document.body?.innerText?.slice(0, 8000) ?? '';
}
