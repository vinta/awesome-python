/*
 * Dynamic Zoom for Premiere Pro - panel entry point.
 */
"use strict";

const ppro = require("premierepro");
const uxp = require("uxp");
const Z = require("./src/zoomMath.js");
const { createPremiere } = require("./src/premiere.js");
const { createRectEditor } = require("./src/rectEditor.js");
const { createFrameGrabber } = require("./src/frameGrab.js");

const SETTINGS_KEY = "dz-settings-v1";

const store = {
  get(key) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch (_) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // storage unavailable - settings just won't persist
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      // ignore
    }
  },
};

const DEFAULTS = {
  start: Z.makeRect(0.5, 0.5, 1),
  end: Z.makeRect(0.5, 0.5, 0.8),
  easing: "linear",
  zoomPath: "linear",
  stepFrames: 2,
  timeBase: "media",
  keepInside: true,
};

const state = Object.assign({}, DEFAULTS, store.get(SETTINGS_KEY) || {});
const premiere = createPremiere(ppro, store);
const grabber = createFrameGrabber(ppro, uxp);

const $ = (id) => document.getElementById(id);
const save = () => store.set(SETTINGS_KEY, state);

// --- Status ---------------------------------------------------------------

function setStatus(text, kind) {
  const el = $("status");
  el.textContent = text || "";
  el.className = `status${kind ? ` ${kind}` : ""}`;
}

function report(results, verb) {
  const done = results.filter((r) => !r.error && !r.skipped);
  const failed = results.filter((r) => r.error);
  const skipped = results.filter((r) => r.skipped && !/no Motion effect/.test(r.skipped));
  const lines = [];
  if (done.length === 1 && done[0].keys) {
    lines.push(`${verb} "${done[0].name}" (${done[0].keys} keyframes).`);
  } else if (done.length) {
    lines.push(`${verb} ${done.length} clip${done.length > 1 ? "s" : ""}.`);
  }
  for (const r of done) for (const w of r.warnings || []) lines.push(`⚠ ${r.name}: ${w}`);
  for (const r of skipped) lines.push(`– ${r.name || "clip"}: ${r.skipped}`);
  for (const r of failed) lines.push(`✕ ${r.name}: ${r.error}`);
  if (!lines.length) lines.push("No video clips in the selection.");
  setStatus(lines.join("\n"), failed.length ? "error" : done.length ? "ok" : "");
}

// --- Editor + inputs -----------------------------------------------------

let editor = null;

const fmt = (v) => String(Math.round(v * 10) / 10);

function syncInputs() {
  for (const which of ["start", "end"]) {
    const r = state[which];
    $(`${which}-zoom`).value = fmt(100 / r.size);
    $(`${which}-x`).value = fmt(r.cx * 100);
    $(`${which}-y`).value = fmt(r.cy * 100);
  }
}

function pullFromEditor() {
  const r = editor.get();
  state.start = r.start;
  state.end = r.end;
  syncInputs();
  save();
}

function onInput(which) {
  const zoom = parseFloat($(`${which}-zoom`).value);
  const x = parseFloat($(`${which}-x`).value);
  const y = parseFloat($(`${which}-y`).value);
  const cur = state[which];
  editor.set(
    which,
    Z.makeRect(
      isFinite(x) ? x / 100 : cur.cx,
      isFinite(y) ? y / 100 : cur.cy,
      isFinite(zoom) && zoom > 0 ? 100 / zoom : cur.size
    )
  );
  pullFromEditor();
}

async function refreshAspect() {
  try {
    const { sequence } = await premiere.getActive();
    const f = await premiere.getFrameInfo(sequence);
    editor.setAspect(f.width / f.height);
  } catch (_) {
    editor.render();
  }
}

function settings() {
  return {
    start: state.start,
    end: state.end,
    easing: state.easing,
    zoomPath: state.zoomPath,
    stepFrames: Number(state.stepFrames) || 2,
    timeBase: state.timeBase,
  };
}

let busy = false;
async function run(label, fn) {
  if (busy) return;
  busy = true;
  setStatus(`${label}…`);
  try {
    await fn();
  } catch (e) {
    setStatus(String((e && e.message) || e), "error");
  } finally {
    busy = false;
  }
}

function init() {
  editor = createRectEditor($("viewer"), {
    keepInside: () => !!state.keepInside,
    onChange: pullFromEditor,
  });
  editor.setBoth(state.start, state.end);
  pullFromEditor();

  for (const which of ["start", "end"]) {
    for (const f of ["zoom", "x", "y"]) $(`${which}-${f}`).addEventListener("change", () => onInput(which));
  }

  const presetSel = $("preset");
  presetSel.innerHTML =
    `<option value="">Choose…</option>` +
    Object.keys(Z.PRESETS)
      .map((k) => `<option value="${k}">${Z.PRESETS[k].label}</option>`)
      .join("");
  presetSel.addEventListener("change", () => {
    if (!presetSel.value) return;
    const p = Z.presetRects(presetSel.value);
    editor.setBoth(p.start, p.end);
    pullFromEditor();
    presetSel.value = "";
  });

  const bindSelect = (id, key, cast = (v) => v) => {
    const sel = $(id);
    sel.value = String(state[key]);
    sel.addEventListener("change", () => {
      state[key] = cast(sel.value);
      save();
    });
  };
  bindSelect("easing", "easing");
  bindSelect("zoomPath", "zoomPath");
  bindSelect("stepFrames", "stepFrames", Number);
  bindSelect("timeBase", "timeBase");

  const keep = $("keepInside");
  keep.checked = !!state.keepInside;
  keep.addEventListener("change", () => {
    state.keepInside = keep.checked;
    editor.setBoth(state.start, state.end);
    pullFromEditor();
  });

  const adv = $("advanced");
  adv.removeAttribute("hidden");
  adv.style.display = "none";
  $("advanced-toggle").addEventListener("click", () => {
    const open = adv.style.display === "none";
    adv.style.display = open ? "block" : "none";
    $("advanced-toggle").textContent = `${open ? "▾" : "▸"} Advanced`;
  });

  $("swap").addEventListener("click", () => {
    editor.setBoth(state.end, state.start);
    pullFromEditor();
  });
  $("reset").addEventListener("click", () => {
    editor.setBoth(DEFAULTS.start, DEFAULTS.end);
    pullFromEditor();
  });
  $("preview").addEventListener("click", () => editor.playPreview(state.easing, state.zoomPath));

  $("grab").addEventListener("click", () =>
    run("Grabbing frame", async () => {
      const { sequence } = await premiere.getActive();
      const frame = await premiere.getFrameInfo(sequence);
      editor.setAspect(frame.width / frame.height);
      const entry = await grabber.grab(sequence, frame);
      let src;
      try {
        src = await grabber.toDataUrl(entry);
      } catch (_) {
        src = entry; // <img> also accepts a UXP File entry
      }
      editor.setImage(src);
      setStatus("Boxes are relative to this framing. Grab before applying, or after Remove.");
    })
  );

  $("apply").addEventListener("click", () =>
    run("Applying dynamic zoom", async () => {
      await refreshAspect();
      report(await premiere.applyToSelection(settings()), "Dynamic zoom applied to");
    })
  );
  $("remove").addEventListener("click", () =>
    run("Removing dynamic zoom", async () => {
      report(await premiere.removeFromSelection(settings()), "Dynamic zoom removed from");
    })
  );

  window.addEventListener("resize", () => editor.render());
  refreshAspect();
}

init();

try {
  uxp.entrypoints.setup({
    panels: {
      dynamicZoomPanel: {
        show() {
          if (editor) refreshAspect();
        },
      },
    },
  });
} catch (_) {
  // setup() is optional; ignore if the host already initialised the panel
}
