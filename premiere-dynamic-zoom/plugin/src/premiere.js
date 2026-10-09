/*
 * Dynamic Zoom - Premiere Pro UXP layer.
 *
 * Everything that touches the `premierepro` module lives here. The module is
 * injected (createPremiere(ppro, store)) so the logic can be unit-tested in
 * Node with a fake host.
 */
"use strict";

const Z = require("./zoomMath.js");

const MOTION_MATCH_NAME = "AE.ADBE Motion";
const MAX_SCALE = 10000; // Premiere's Motion > Scale upper limit (%)
const UNDO_NAME = "Dynamic Zoom";

// English display names, with the documented Motion parameter order as the
// fallback for localized Premiere builds.
const PARAMS = {
  position: { names: ["Position"], index: 0 },
  scale: { names: ["Scale", "Scale Height"], index: 1 },
  scaleWidth: { names: ["Scale Width"], index: 2 },
  uniform: { names: ["Uniform Scale"], index: 3 },
};

class UserError extends Error {}

// --- Value helpers --------------------------------------------------------

// Premiere returns Keyframe objects ({ value: { value: X } }), raw values, and
// (for points) either PointF objects or plain [x, y] arrays depending on build.
function unwrapValue(v) {
  let cur = v;
  for (let i = 0; i < 4; i++) {
    if (cur == null || typeof cur !== "object" || Array.isArray(cur)) return cur;
    if (typeof cur.x === "number" && typeof cur.y === "number") return cur;
    if (!("value" in cur)) return cur;
    cur = cur.value;
  }
  return cur;
}

function asPoint(v) {
  const u = unwrapValue(v);
  if (Array.isArray(u) && u.length >= 2 && isFinite(u[0]) && isFinite(u[1])) {
    return { x: Number(u[0]), y: Number(u[1]) };
  }
  if (u && typeof u.x === "number" && typeof u.y === "number") return { x: u.x, y: u.y };
  return null;
}

function asNumber(v) {
  const u = unwrapValue(v);
  return typeof u === "number" && isFinite(u) ? u : null;
}

function asBool(v) {
  const u = unwrapValue(v);
  if (typeof u === "boolean") return u;
  if (typeof u === "number") return u !== 0;
  return null;
}

function tickSeconds(t) {
  if (!t) return NaN;
  if (typeof t.seconds === "number") return t.seconds;
  if (t.ticks != null) return Number(t.ticks) / Z.TICKS_PER_SECOND;
  return NaN;
}

async function safe(fn, fallback) {
  try {
    return await fn();
  } catch (_) {
    return fallback;
  }
}

// --- Factory ------------------------------------------------------------

function createPremiere(ppro, store) {
  function tick(sec) {
    const T = ppro.TickTime;
    if (typeof T.createWithTicks === "function") return T.createWithTicks(Z.secondsToTicks(sec));
    return T.createWithSeconds(sec);
  }

  function makePoint(x, y) {
    try {
      return new ppro.PointF(x, y);
    } catch (_) {
      return ppro.PointF(x, y);
    }
  }

  async function getActive() {
    const project = await ppro.Project.getActiveProject();
    if (!project) throw new UserError("Open a project first.");
    const sequence = await project.getActiveSequence();
    if (!sequence) throw new UserError("Open a sequence in the Timeline first.");
    return { project, sequence };
  }

  async function getFrameInfo(sequence) {
    let width = 1920;
    let height = 1080;
    let frameSec = 0;
    const size = await safe(() => sequence.getFrameSize(), null);
    if (size && size.width > 0 && size.height > 0) {
      width = size.width;
      height = size.height;
    }
    const settings = await safe(() => sequence.getSettings(), null);
    const rate = settings && (await safe(() => settings.getVideoFrameRate(), null));
    if (rate) {
      if (rate.ticksPerFrame > 0) frameSec = rate.ticksPerFrame / Z.TICKS_PER_SECOND;
      else if (rate.value > 0) frameSec = 1 / rate.value;
    }
    if (!(frameSec > 0)) {
      const tb = Number(await safe(() => sequence.getTimebase(), NaN));
      frameSec = tb > 0 ? tb / Z.TICKS_PER_SECOND : 1 / 30;
    }
    return { width, height, frameSec };
  }

  async function getSelectedTrackItems(sequence) {
    const selection = await sequence.getSelection();
    const items = selection ? await selection.getTrackItems() : [];
    return Array.from(items || []);
  }

  async function findMotion(item) {
    if (typeof item.getComponentChain !== "function") return null;
    const chain = await item.getComponentChain();
    if (!chain) return null;
    const count = chain.getComponentCount();
    const comps = [];
    for (let i = 0; i < count; i++) comps.push(chain.getComponentAtIndex(i));
    for (const c of comps) {
      if ((await safe(() => c.getMatchName(), "")) === MOTION_MATCH_NAME) return c;
    }
    for (const c of comps) {
      if (/^motion$/i.test(String(await safe(() => c.getDisplayName(), "")).trim())) return c;
    }
    return null;
  }

  async function resolveParams(motion) {
    const count = motion.getParamCount();
    const all = [];
    for (let i = 0; i < count; i++) all.push(motion.getParam(i));
    const pick = (spec) =>
      all.find((p) => spec.names.includes(String(p.displayName || "").trim())) || all[spec.index];

    const params = {
      position: pick(PARAMS.position),
      scale: pick(PARAMS.scale),
      scaleWidth: pick(PARAMS.scaleWidth),
      uniform: pick(PARAMS.uniform),
    };
    if (!params.position || !params.scale) {
      throw new UserError("Could not find Motion > Position/Scale on this clip.");
    }
    // Sanity-check the value types (guards against an unexpected param order).
    const pos = asPoint(await params.position.getStartValue());
    const scale = asNumber(await params.scale.getStartValue());
    if (!pos || scale == null) {
      throw new UserError("Motion parameters have an unexpected layout in this Premiere build.");
    }
    let uniform = true;
    if (params.uniform) {
      const u = asBool(await safe(() => params.uniform.getStartValue(), null));
      if (u != null) uniform = u;
    }
    if (uniform || !params.scaleWidth) params.scaleWidth = null;
    return params;
  }

  function animatedParams(P) {
    return [P.position, P.scale, P.scaleWidth].filter(Boolean);
  }

  async function readBase(P, timeSec) {
    const read = (p) => (timeSec == null ? p.getStartValue() : p.getValueAtTime(tick(timeSec)));
    const base = {
      position: asPoint(await read(P.position)),
      scale: asNumber(await read(P.scale)),
    };
    if (P.scaleWidth) base.scaleWidth = asNumber(await read(P.scaleWidth));
    if (!base.position || base.scale == null || (P.scaleWidth && base.scaleWidth == null)) {
      throw new UserError("Could not read the clip's Motion values.");
    }
    return base;
  }

  async function clipInfo(item, frameSec) {
    const [inPt, outPt, startT, endT, name] = await Promise.all([
      item.getInPoint(),
      item.getOutPoint(),
      item.getStartTime(),
      item.getEndTime(),
      safe(() => item.getName(), "clip"),
    ]);
    return {
      name: name || "clip",
      inPointSec: tickSeconds(inPt),
      outPointSec: tickSeconds(outPt),
      startSec: tickSeconds(startT),
      durationSec: tickSeconds(endT) - tickSeconds(startT),
      inTicks: inPt && inPt.ticks != null ? String(inPt.ticks) : String(tickSeconds(inPt)),
      frameSec,
    };
  }

  function baseKey(sequence, clip) {
    const seq = sequence.guid && typeof sequence.guid.toString === "function" ? sequence.guid.toString() : "seq";
    return `dz-base:${seq}:${clip.name}:${clip.inTicks}`;
  }

  function firstFrameKeyTime(clip, timeBase) {
    return timeBase === "clip" ? 0 : clip.inPointSec;
  }

  function commit(project, label, build) {
    let ok = false;
    let error = null;
    project.lockedAccess(() => {
      try {
        ok = project.executeTransaction(build, label);
      } catch (e) {
        error = e;
      }
    });
    if (error) throw error;
    if (ok === false) throw new Error("Premiere rejected the edit.");
  }

  function keyTimes(param) {
    return Array.from(param.getKeyframeListAsTickTimes() || []);
  }

  /**
   * Applies a dynamic zoom to one track item.
   * settings = { start, end, easing, zoomPath, stepFrames, timeBase }
   */
  async function applyToItem(ctx, item, settings) {
    const motion = await findMotion(item);
    if (!motion) return { skipped: "no Motion effect (audio item?)" };
    if (await safe(() => item.isSpeedReversed(), 0)) {
      return { skipped: "reversed clips are not supported" };
    }
    const clip = await clipInfo(item, ctx.frame.frameSec);
    if (!(clip.durationSec > 0)) return { skipped: "clip has no duration" };

    const P = await resolveParams(motion);
    const params = animatedParams(P);
    const warnings = [];

    // Base framing = the clip's un-animated Motion values. When the clip is
    // already animated (e.g. Dynamic Zoom applied before), use the framing we
    // remembered the first time, so re-applying does not compound the zoom.
    const key = baseKey(ctx.sequence, clip);
    const animated = params.some((p) => p.isTimeVarying());
    let base = null;
    if (!animated) {
      base = await readBase(P, null);
      store.set(key, base);
    } else {
      base = store.get(key);
      if (!base || base.position == null || (P.scaleWidth && base.scaleWidth == null)) {
        base = await readBase(P, firstFrameKeyTime(clip, settings.timeBase));
        store.set(key, base);
        warnings.push("clip was already keyframed; its first-frame framing is used as 100%");
      }
    }

    const plan = Z.planKeyframes({
      start: settings.start,
      end: settings.end,
      easing: settings.easing,
      zoomPath: settings.zoomPath,
      base,
      clip,
      stepFrames: settings.stepFrames,
      timeBase: settings.timeBase,
      maxKeys: settings.maxKeys || 600,
    });
    const peak = Math.max(...plan.map((k) => Math.max(k.scale, k.scaleWidth || 0)));
    if (peak > MAX_SCALE) {
      throw new UserError(`zoom needs ${Math.round(peak)}% scale (Premiere's limit is ${MAX_SCALE}%).`);
    }

    const planTimes = plan.map((k) => k.timeSec);
    const gaps = planTimes.slice(1).map((t, i) => Math.abs(t - planTimes[i]));
    const tolerance = Math.max(1e-6, (gaps.length ? Math.min(...gaps) : clip.frameSec) / 4);
    const isPlanned = (sec) => planTimes.some((t) => Math.abs(t - sec) <= tolerance);
    const oldTimes = new Map(params.map((p) => [p, p.isTimeVarying() ? keyTimes(p) : []]));

    // One undoable step: enable animation, add the new keys, then drop old keys
    // the new plan does not overwrite (adding before removing means a param is
    // never left time-varying with zero keys).
    commit(ctx.project, UNDO_NAME, (ca) => {
      for (const p of params) {
        if (!p.isTimeVarying()) ca.addAction(p.createSetTimeVaryingAction(true));
      }
      for (const k of plan) {
        const t = tick(k.timeSec);
        const add = (param, value) => {
          const kf = param.createKeyframe(value);
          kf.position = t;
          ca.addAction(param.createAddKeyframeAction(kf));
        };
        add(P.position, makePoint(k.position.x, k.position.y));
        add(P.scale, k.scale);
        if (P.scaleWidth) add(P.scaleWidth, k.scaleWidth);
      }
      for (const p of params) {
        for (const t of oldTimes.get(p)) {
          if (!isPlanned(tickSeconds(t))) ca.addAction(p.createRemoveKeyframeAction(t, false));
        }
      }
    });

    // Turning animation on can drop an extra key at the playhead; remove strays.
    const strays = params
      .map((p) => [p, keyTimes(p).filter((t) => !isPlanned(tickSeconds(t)))])
      .filter(([, ts]) => ts.length);
    if (strays.length) {
      commit(ctx.project, UNDO_NAME, (ca) => {
        for (const [p, ts] of strays) for (const t of ts) ca.addAction(p.createRemoveKeyframeAction(t, false));
      });
    }

    const written = keyTimes(P.scale).length;
    if (written < plan.length) {
      warnings.push(`only ${written}/${plan.length} keyframes were created`);
    }
    return { name: clip.name, keys: plan.length, warnings };
  }

  /** Removes the zoom keys and restores the remembered base framing. */
  async function removeFromItem(ctx, item, settings) {
    const motion = await findMotion(item);
    if (!motion) return { skipped: "no Motion effect (audio item?)" };
    const clip = await clipInfo(item, ctx.frame.frameSec);
    const P = await resolveParams(motion);
    const params = animatedParams(P);
    if (!params.some((p) => p.isTimeVarying())) return { skipped: "no keyframes to remove" };

    const key = baseKey(ctx.sequence, clip);
    let base = store.get(key);
    if (!base || base.position == null || (P.scaleWidth && base.scaleWidth == null)) {
      base = await readBase(P, firstFrameKeyTime(clip, settings.timeBase));
    }
    const valueFor = (p) =>
      p === P.position ? makePoint(base.position.x, base.position.y) : p === P.scale ? base.scale : base.scaleWidth;

    commit(ctx.project, `Remove ${UNDO_NAME}`, (ca) => {
      for (const p of params) {
        if (!p.isTimeVarying()) continue;
        for (const t of keyTimes(p)) ca.addAction(p.createRemoveKeyframeAction(t, false));
        ca.addAction(p.createSetTimeVaryingAction(false));
        ca.addAction(p.createSetValueAction(p.createKeyframe(valueFor(p)), true));
      }
    });

    // Some builds apply the static value before animation is switched off;
    // verify and set it again if needed.
    const after = await readBase(P, null);
    const off =
      Math.abs(after.scale - base.scale) > 1e-3 ||
      Math.abs(after.position.x - base.position.x) > 1e-4 ||
      Math.abs(after.position.y - base.position.y) > 1e-4;
    if (off) {
      commit(ctx.project, `Remove ${UNDO_NAME}`, (ca) => {
        for (const p of params) ca.addAction(p.createSetValueAction(p.createKeyframe(valueFor(p)), true));
      });
    }
    store.remove(key);
    return { name: clip.name, keys: 0, warnings: [] };
  }

  async function forEachSelected(settings, fn) {
    const { project, sequence } = await getActive();
    const frame = await getFrameInfo(sequence);
    const items = await getSelectedTrackItems(sequence);
    if (!items.length) throw new UserError("Select one or more clips in the Timeline.");
    const ctx = { project, sequence, frame };
    const results = [];
    for (const item of items) {
      try {
        const r = await fn(ctx, item, settings);
        if (r) results.push(r);
      } catch (e) {
        const name = await safe(() => item.getName(), "clip");
        results.push({ name, error: e instanceof UserError ? e.message : String((e && e.message) || e) });
      }
    }
    return results;
  }

  return {
    UserError,
    getActive,
    getFrameInfo,
    findMotion,
    resolveParams,
    applyToSelection: (settings) => forEachSelected(settings, applyToItem),
    removeFromSelection: (settings) => forEachSelected(settings, removeFromItem),
  };
}

module.exports = { createPremiere, UserError, unwrapValue, asPoint, asNumber, asBool, tickSeconds };
