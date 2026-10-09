/*
 * Dynamic Zoom for Premiere Pro - CEP panel entry point.
 */
(function () {
  "use strict";

  // Match the panel background to Premiere's UI brightness.
  try {
    const env = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    const c = env.appSkinInfo.panelBackgroundColor.color;
    document.body.style.backgroundColor = `rgb(${Math.round(c.red)}, ${Math.round(c.green)}, ${Math.round(c.blue)})`;
  } catch (_) {
    // outside Premiere, keep the stylesheet colours
  }

  const { createCaller, cepEvalScript, createCepHost } = window.DZCepHost;
  const store = window.DZPanel.createStore();
  const host = createCepHost(createCaller(cepEvalScript), store, window.DZMath);
  window.DZPanel.startPanel(host, store);
})();
