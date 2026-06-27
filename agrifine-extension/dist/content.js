/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
// Content script — minimal surface. Relays page metadata to background on request.

chrome.runtime.onMessage.addListener(function (message, _sender, sendResponse) {
  if (message.type === 'GET_PAGE_INFO') {
    sendResponse({
      url: window.location.href,
      title: document.title,
      text: extractMainText()
    });
  }
});
function extractMainText() {
  var _document$body$innerT, _document$body;
  var selectors = ['article', 'main', '[role="main"]', '.content', '#content', 'body'];
  for (var _i = 0, _selectors = selectors; _i < _selectors.length; _i++) {
    var sel = _selectors[_i];
    var el = document.querySelector(sel);
    if (el) {
      // Strip scripts and styles, return first 8000 chars
      var clone = el.cloneNode(true);
      clone.querySelectorAll('script,style,nav,header,footer,aside').forEach(function (n) {
        return n.remove();
      });
      return clone.innerText.trim().slice(0, 8000);
    }
  }
  return (_document$body$innerT = (_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.innerText) === null || _document$body === void 0 ? void 0 : _document$body.slice(0, 8000)) !== null && _document$body$innerT !== void 0 ? _document$body$innerT : '';
}
/******/ })()
;
//# sourceMappingURL=content.js.map