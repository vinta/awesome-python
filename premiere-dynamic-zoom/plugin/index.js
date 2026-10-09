/*
 * Dynamic Zoom for Premiere Pro - UXP panel entry point.
 */
"use strict";

const ppro = require("premierepro");
const uxp = require("uxp");
const { createPremiere } = require("./src/premiere.js");
const { createFrameGrabber } = require("./src/frameGrab.js");
const { startPanel, createStore } = require("./src/panel.js");

const store = createStore();
const premiere = createPremiere(ppro, store);
const grabber = createFrameGrabber(ppro, uxp);

async function activeFrame() {
  const { sequence } = await premiere.getActive();
  return { sequence, frame: await premiere.getFrameInfo(sequence) };
}

const panel = startPanel(
  {
    async getAspect() {
      const { frame } = await activeFrame();
      return frame.width / frame.height;
    },
    async grabFrame() {
      const { sequence, frame } = await activeFrame();
      const entry = await grabber.grab(sequence, frame);
      let src;
      try {
        src = await grabber.toDataUrl(entry);
      } catch (_) {
        src = entry; // <img> also accepts a UXP File entry
      }
      return { src, aspect: frame.width / frame.height };
    },
    applyToSelection: (settings) => premiere.applyToSelection(settings),
    removeFromSelection: (settings) => premiere.removeFromSelection(settings),
  },
  store
);

try {
  uxp.entrypoints.setup({
    panels: {
      dynamicZoomPanel: {
        show() {
          panel.refreshAspect();
        },
      },
    },
  });
} catch (_) {
  // setup() is optional; ignore if the host already initialised the panel
}
