"use strict";

/*
 * Exercises the Premiere layer against a fake `premierepro` host that mimics
 * the UXP API shapes observed in Premiere 26.x (Keyframe wrappers, [x, y]
 * arrays for points, actions executed inside executeTransaction).
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const { createPremiere, asPoint } = require("../plugin/src/premiere.js");
const Z = require("../plugin/src/zoomMath.js");

const TPS = Z.TICKS_PER_SECOND;
const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

function makeHost({ ctiSec = 11.5 } = {}) {
  const TickTime = {
    createWithTicks: (t) => ({ ticks: String(t), seconds: Number(t) / TPS }),
    createWithSeconds: (s) => ({ ticks: String(Math.round(s * TPS)), seconds: s }),
  };
  class PointF {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  const toRaw = (v) => (v instanceof PointF ? [v.x, v.y] : v); // host reads points back as arrays

  function makeParam(displayName, value) {
    const p = {
      displayName,
      value,
      tv: false,
      keys: new Map(),
      isTimeVarying: () => p.tv,
      getStartValue: async () => ({ value: { value: toRaw(p.tv ? p.valueAt(p.firstKey()) : p.value) } }),
      getValueAtTime: async (t) => toRaw(p.tv ? p.valueAt(t.seconds) : p.value),
      getKeyframeListAsTickTimes: () =>
        [...p.keys.keys()].sort((a, b) => Number(a) - Number(b)).map((t) => TickTime.createWithTicks(t)),
      createKeyframe: (v) => ({ value: { value: v }, position: TickTime.createWithSeconds(0) }),
      createAddKeyframeAction: (kf) => () => {
        assert.ok(p.tv, `${displayName}: keyframe added while not time-varying`);
        p.keys.set(String(kf.position.ticks), kf.value.value);
      },
      createRemoveKeyframeAction: (t) => () => p.keys.delete(String(t.ticks)),
      createSetTimeVaryingAction: (on) => () => {
        p.tv = on;
        if (on) p.keys.set(String(Math.round(ctiSec * TPS)), p.value); // stopwatch drops a key at the CTI
        else p.keys.clear();
      },
      createSetValueAction: (kf) => () => {
        assert.ok(!p.tv, `${displayName}: static value set while time-varying`);
        p.value = kf.value.value;
      },
      firstKey: () => Math.min(...[...p.keys.keys()].map((t) => Number(t) / TPS)),
      valueAt(sec) {
        const ks = [...p.keys.entries()].map(([t, v]) => [Number(t) / TPS, v]).sort((a, b) => a[0] - b[0]);
        const v = (ks.find(([t]) => Math.abs(t - sec) < 1e-9) || ks[0])[1];
        return v;
      },
    };
    return p;
  }

  function makeVideoItem(name, { inSec = 10, outSec = 14, startSec = 100, durSec = 4, uniform = true } = {}) {
    const params = [
      makeParam("Position", new PointF(0.5, 0.5)),
      makeParam("Scale", 100),
      makeParam("Scale Width", 100),
      makeParam("Uniform Scale", uniform),
      makeParam("Rotation", 0),
      makeParam("Anchor Point", new PointF(0.5, 0.5)),
    ];
    const motion = {
      getMatchName: async () => "AE.ADBE Motion",
      getDisplayName: async () => "Motion",
      getParamCount: () => params.length,
      getParam: (i) => params[i],
    };
    const opacity = { getMatchName: async () => "AE.ADBE Opacity", getDisplayName: async () => "Opacity" };
    const comps = [opacity, motion];
    return {
      params,
      getName: async () => name,
      getInPoint: async () => TickTime.createWithSeconds(inSec),
      getOutPoint: async () => TickTime.createWithSeconds(outSec),
      getStartTime: async () => TickTime.createWithSeconds(startSec),
      getEndTime: async () => TickTime.createWithSeconds(startSec + durSec),
      isSpeedReversed: async () => 0,
      getComponentChain: async () => ({ getComponentCount: () => comps.length, getComponentAtIndex: (i) => comps[i] }),
    };
  }

  const audioItem = {
    getName: async () => "audio",
    getComponentChain: async () => ({
      getComponentCount: () => 1,
      getComponentAtIndex: () => ({ getMatchName: async () => "AE.ADBE Volume", getDisplayName: async () => "Volume" }),
    }),
  };

  const selection = [];
  const undo = [];
  const project = {
    lockedAccess: (cb) => cb(),
    executeTransaction(cb, label) {
      const actions = [];
      cb({ addAction: (a) => actions.push(a) });
      actions.forEach((a) => a());
      undo.push(label);
      return true;
    },
    getActiveSequence: async () => sequence,
  };
  const sequence = {
    guid: { toString: () => "seq-1" },
    getSelection: async () => ({ getTrackItems: async () => selection }),
    getFrameSize: async () => ({ width: 1920, height: 1080 }),
    getSettings: async () => ({ getVideoFrameRate: () => ({ ticksPerFrame: TPS / 25, value: 25 }) }),
  };
  const ppro = { TickTime, PointF, Project: { getActiveProject: async () => project } };

  const mem = new Map();
  const store = {
    get: (k) => (mem.has(k) ? JSON.parse(mem.get(k)) : null),
    set: (k, v) => mem.set(k, JSON.stringify(v)),
    remove: (k) => mem.delete(k),
  };

  return { ppro, store, selection, undo, makeVideoItem, audioItem };
}

const keyList = (param) => [...param.keys.entries()].map(([t, v]) => [Number(t) / TPS, v]).sort((a, b) => a[0] - b[0]);

const zoomIn = {
  start: Z.makeRect(0.5, 0.5, 1),
  end: Z.makeRect(0.6, 0.4, 0.5),
  easing: "easeInOut",
  zoomPath: "linear",
  stepFrames: 2,
  timeBase: "media",
};

test("applies keyframes from first to last frame and removes the stopwatch key", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A");
  h.selection.push(item, h.audioItem);
  const dz = createPremiere(h.ppro, h.store);

  const results = await dz.applyToSelection(zoomIn);
  const done = results.find((r) => r.name === "A");
  assert.ok(done && !done.error, JSON.stringify(results));
  assert.deepEqual(done.warnings, []);
  assert.ok(results.some((r) => r.skipped), "audio item should be skipped");

  const [pos, scale, scaleWidth] = item.params;
  const sKeys = keyList(scale);
  const pKeys = keyList(pos);
  assert.equal(sKeys.length, done.keys);
  assert.equal(pKeys.length, done.keys);
  assert.equal(scaleWidth.keys.size, 0, "uniform scale: Scale Width untouched");
  close(sKeys[0][0], 10); // in point, source-media time
  close(sKeys[0][1], 100);
  close(sKeys[sKeys.length - 1][0], 14 - 1 / 25);
  close(sKeys[sKeys.length - 1][1], 200);
  assert.ok(Array.isArray(pKeys[0][1]) === false, "points are written as PointF");
  close(pKeys[0][1].x, 0.5);
  const lastPos = pKeys[pKeys.length - 1][1];
  close(lastPos.x, (0.5 - 0.6) * 2 + 0.5);
  close(lastPos.y, (0.5 - 0.4) * 2 + 0.5);
  assert.ok(!sKeys.some(([t]) => Math.abs(t - 11.5) < 1e-6), "stray stopwatch key removed");
  assert.deepEqual(h.undo, ["Dynamic Zoom", "Dynamic Zoom"]); // main edit + stray-key cleanup
});

test("re-applying uses the remembered base framing instead of compounding", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A");
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  await dz.applyToSelection(zoomIn);
  const results = await dz.applyToSelection({ ...zoomIn, end: Z.makeRect(0.5, 0.5, 0.8), stepFrames: 4 });
  assert.deepEqual(results[0].warnings, []);
  const sKeys = keyList(item.params[1]);
  assert.equal(sKeys.length, results[0].keys, "old keys at other times are removed");
  close(sKeys[0][1], 100);
  close(sKeys[sKeys.length - 1][1], 125);
});

test("remove restores the original static Motion values", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A");
  item.params[0].value = new (h.ppro.PointF)(0.4, 0.55);
  item.params[1].value = 80;
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  await dz.applyToSelection(zoomIn);
  const results = await dz.removeFromSelection(zoomIn);
  assert.ok(!results[0].error, JSON.stringify(results));
  const [pos, scale] = item.params;
  assert.equal(pos.tv, false);
  assert.equal(scale.tv, false);
  assert.equal(scale.value, 80);
  const p = asPoint(pos.value);
  close(p.x, 0.4);
  close(p.y, 0.55);
});

test("non-uniform scale animates Scale Width too", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A", { uniform: false });
  item.params[2].value = 150;
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  await dz.applyToSelection(zoomIn);
  const w = keyList(item.params[2]);
  close(w[0][1], 150);
  close(w[w.length - 1][1], 300);
});

test("linear pan writes exactly two keys", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A");
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  const results = await dz.applyToSelection({ ...zoomIn, ...Z.presetRects("panRight"), easing: "linear" });
  assert.equal(results[0].keys, 2);
  assert.equal(item.params[0].keys.size, 2);
});

test("clips sped up to 200% get keys spread over the source range", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A", { inSec: 10, outSec: 18, durSec: 4 });
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  await dz.applyToSelection(zoomIn);
  const sKeys = keyList(item.params[1]);
  close(sKeys[sKeys.length - 1][0], 10 + (4 - 1 / 25) * 2);
});

test("rejects zooms beyond Premiere's 10000% scale limit", async () => {
  const h = makeHost();
  const item = h.makeVideoItem("A");
  item.params[1].value = 900;
  h.selection.push(item);
  const dz = createPremiere(h.ppro, h.store);
  const results = await dz.applyToSelection({ ...zoomIn, end: Z.makeRect(0.5, 0.5, 0.05) });
  assert.match(results[0].error, /10000%/);
  assert.equal(item.params[1].keys.size, 0, "nothing written");
});

test("empty selection gives a clear message", async () => {
  const h = makeHost();
  const dz = createPremiere(h.ppro, h.store);
  await assert.rejects(dz.applyToSelection(zoomIn), /Select one or more clips/);
});
