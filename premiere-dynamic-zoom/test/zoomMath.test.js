"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Z = require("../plugin/src/zoomMath.js");

const close = (a, b, eps = 1e-6, msg) => assert.ok(Math.abs(a - b) <= eps, msg || `${a} != ${b}`);

test("easings hit their endpoints and are monotonic", () => {
  for (const name of Object.keys(Z.EASINGS)) {
    const f = Z.getEasing(name);
    close(f(0), 0);
    close(f(1), 1);
    let prev = -1;
    for (let i = 0; i <= 100; i++) {
      const v = f(i / 100);
      assert.ok(v >= prev - 1e-9, `${name} not monotonic at ${i}`);
      prev = v;
    }
  }
  close(Z.EASINGS.easeInOut(0.5), 0.5, 1e-4);
  assert.ok(Z.EASINGS.easeIn(0.25) < 0.25);
  assert.ok(Z.EASINGS.easeOut(0.25) > 0.25);
});

test("full-frame rectangle leaves Motion untouched", () => {
  const base = { position: { x: 0.42, y: 0.61 }, scale: 87, scaleWidth: 120 };
  const m = Z.motionForRect(Z.fullFrameRect(), base);
  close(m.position.x, 0.42);
  close(m.position.y, 0.61);
  close(m.scale, 87);
  close(m.scaleWidth, 120);
});

test("Motion values really show the requested rectangle", () => {
  // Simulate Premiere: an image point drawn at q with the base framing is drawn
  // at P + (S / S0) * (q - P0) with the new Position P and Scale S.
  const base = { position: { x: 0.55, y: 0.45 }, scale: 110 };
  const rect = Z.makeRect(0.3, 0.7, 0.4);
  const m = Z.motionForRect(rect, base);
  const k = m.scale / base.scale;
  const screen = (q) => ({
    x: m.position.x + k * (q.x - base.position.x),
    y: m.position.y + k * (q.y - base.position.y),
  });
  // Rectangle corners must land on the frame corners.
  const tl = screen({ x: rect.cx - rect.size / 2, y: rect.cy - rect.size / 2 });
  const br = screen({ x: rect.cx + rect.size / 2, y: rect.cy + rect.size / 2 });
  close(tl.x, 0);
  close(tl.y, 0);
  close(br.x, 1);
  close(br.y, 1);
  const back = Z.rectForMotion(m, base);
  close(back.cx, rect.cx);
  close(back.cy, rect.cy);
  close(back.size, rect.size);
});

test("linear zoom path interpolates the rectangle linearly", () => {
  const a = Z.makeRect(0.5, 0.5, 1);
  const b = Z.makeRect(0.3, 0.6, 0.5);
  const mid = Z.rectAt(a, b, 0.5, "linear", "linear");
  close(mid.cx, 0.4);
  close(mid.cy, 0.55);
  close(mid.size, 0.75);
});

test("constant zoom path has even zoom speed and a still fixed point", () => {
  const a = Z.makeRect(0.5, 0.5, 1);
  const b = Z.makeRect(0.7, 0.4, 0.25);
  // Zoom factor grows geometrically: 1x -> 2x -> 4x.
  close(1 / Z.rectAt(a, b, 0.5, "linear", "constant").size, 2);
  // Homothety centre O of a -> b stays at the same spot on screen.
  const k = b.size / a.size;
  const O = { x: (b.cx - k * a.cx) / (1 - k), y: (b.cy - k * a.cy) / (1 - k) };
  const onScreen = (r) => ({ x: (O.x - r.cx) / r.size + 0.5, y: (O.y - r.cy) / r.size + 0.5 });
  const s0 = onScreen(a);
  for (const u of [0.1, 0.33, 0.5, 0.8, 1]) {
    for (const easing of ["linear", "easeInOut"]) {
      const s = onScreen(Z.rectAt(a, b, u, easing, "constant"));
      close(s.x, s0.x, 1e-9);
      close(s.y, s0.y, 1e-9);
    }
  }
  const end = Z.rectAt(a, b, 1, "easeOut", "constant");
  close(end.cx, b.cx);
  close(end.size, b.size);
});

test("normalizeRect keeps boxes inside the frame", () => {
  const r = Z.normalizeRect(Z.makeRect(0.95, 0.02, 0.5), true);
  close(r.cx, 0.75);
  close(r.cy, 0.25);
  assert.equal(Z.normalizeRect(Z.makeRect(0.5, 0.5, 3), true).size, 1);
  assert.equal(Z.normalizeRect(Z.makeRect(0.5, 0.5, 3), false).size, 3);
  assert.equal(Z.normalizeRect(Z.makeRect(0.5, 0.5, 0), false).size, 1);
  assert.equal(Z.normalizeRect(Z.makeRect(0.5, 0.5, 0.001), false).size, Z.MIN_SIZE);
});

test("key times cover first to last frame in source-media time", () => {
  const clip = { durationSec: 4, frameSec: 1 / 25, inPointSec: 10, outPointSec: 14 };
  const keys = Z.planKeyTimes(clip, { stepFrames: 2, timeBase: "media" });
  close(keys[0].timeSec, 10);
  close(keys[0].u, 0);
  close(keys[keys.length - 1].timeSec, 10 + 4 - 1 / 25);
  close(keys[keys.length - 1].u, 1);
  assert.equal(keys.length, 51); // 99-frame span: every 2nd frame (50 keys) + the last frame
  for (let i = 1; i < keys.length; i++) assert.ok(keys[i].timeSec > keys[i - 1].timeSec);
});

test("speed changes stretch key times through the in/out points", () => {
  const clip = { durationSec: 4, frameSec: 1 / 25, inPointSec: 10, outPointSec: 18 }; // 200%
  const keys = Z.planKeyTimes(clip, { stepFrames: 1, timeBase: "media" });
  close(keys[keys.length - 1].timeSec, 10 + (4 - 1 / 25) * 2);
  const clipBase = Z.planKeyTimes(clip, { stepFrames: 1, timeBase: "clip" });
  close(clipBase[0].timeSec, 0);
  close(clipBase[clipBase.length - 1].timeSec, 4 - 1 / 25);
});

test("key count is capped for very long clips", () => {
  const clip = { durationSec: 3600, frameSec: 1 / 60, inPointSec: 0, outPointSec: 3600 };
  const keys = Z.planKeyTimes(clip, { stepFrames: 1, maxKeys: 300 });
  assert.equal(keys.length, 300);
  close(keys[299].u, 1);
});

test("pure linear pans need only two keys; zooms are sampled", () => {
  const clip = { durationSec: 2, frameSec: 1 / 30, inPointSec: 0, outPointSec: 2 };
  const base = { position: { x: 0.5, y: 0.5 }, scale: 100 };
  const pan = Z.presetRects("panRight");
  const panKeys = Z.planKeyframes({ ...pan, easing: "linear", zoomPath: "linear", base, clip, stepFrames: 1 });
  assert.equal(panKeys.length, 2);
  const zoom = Z.presetRects("zoomIn");
  const zoomKeys = Z.planKeyframes({ ...zoom, easing: "linear", zoomPath: "linear", base, clip, stepFrames: 1 });
  assert.equal(zoomKeys.length, 60);
  close(zoomKeys[0].scale, 100);
  close(zoomKeys[zoomKeys.length - 1].scale, 125);
});

test("every preset is valid and inside the frame", () => {
  for (const name of Object.keys(Z.PRESETS)) {
    const { start, end } = Z.presetRects(name);
    for (const r of [start, end]) {
      const n = Z.normalizeRect(r, true);
      assert.ok(Z.rectsEqual(n, r), `${name} preset leaves the frame`);
    }
  }
});

test("ticks conversion matches Premiere's 254016000000 ticks/s", () => {
  assert.equal(Z.secondsToTicks(1), "254016000000");
  assert.equal(Z.secondsToTicks(1 / 25), "10160640000");
});
