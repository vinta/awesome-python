/*
 * Dynamic Zoom - pure math (no Premiere APIs, runs in UXP and Node).
 *
 * Coordinate system
 * -----------------
 * Everything is expressed in *normalized frame space*: (0,0) is the top-left of
 * the sequence frame, (1,1) the bottom-right. This is the same space Premiere's
 * UXP API uses for Motion > Position (the frame centre reads back as [0.5, 0.5]).
 *
 * A zoom rectangle always has the aspect ratio of the sequence frame (like the
 * green/red boxes of DaVinci Resolve's Dynamic Zoom), so in normalized space it
 * is a square: { cx, cy, size }, where `size` is the fraction of the frame the
 * rectangle covers (1 = whole frame, 0.5 = 2x zoom).
 *
 * Rectangles are relative to the clip's *base framing*: how the clip looks with
 * its current (un-animated) Motion settings. Showing rectangle r full-frame is
 * the affine map  q -> (q - c) / size + 0.5  applied to the whole output, which
 * for Motion means:
 *
 *     position = (basePosition - c) / size + 0.5
 *     scale    = baseScale / size
 *
 * Rotation and Anchor Point are unaffected, so this also works for rotated or
 * re-anchored clips.
 */
(function (root) {
  "use strict";

  // --- Easing --------------------------------------------------------------

  /**
   * CSS-style cubic-bezier timing function: returns f(u) for u in [0,1].
   */
  function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;

    function solveX(x) {
      // Newton-Raphson, then bisection fallback.
      let t = x;
      for (let i = 0; i < 8; i++) {
        const err = sampleX(t) - x;
        if (Math.abs(err) < 1e-7) return t;
        const d = sampleDX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      let lo = 0;
      let hi = 1;
      t = x;
      for (let i = 0; i < 60; i++) {
        const v = sampleX(t);
        if (Math.abs(v - x) < 1e-7) return t;
        if (v < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
      return t;
    }

    return function (u) {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      return sampleY(solveX(u));
    };
  }

  // Same names and curves as Resolve's "Dynamic Zoom Ease" menu.
  const EASINGS = {
    linear: (u) => Math.min(1, Math.max(0, u)),
    easeIn: cubicBezier(0.42, 0, 1, 1),
    easeOut: cubicBezier(0, 0, 0.58, 1),
    easeInOut: cubicBezier(0.42, 0, 0.58, 1),
  };

  const EASING_LABELS = {
    linear: "Linear",
    easeIn: "Ease In",
    easeOut: "Ease Out",
    easeInOut: "Ease In and Out",
  };

  function getEasing(name) {
    const fn = EASINGS[name];
    if (!fn) throw new Error(`Unknown easing "${name}"`);
    return fn;
  }

  // --- Rectangles ----------------------------------------------------------

  const MIN_SIZE = 0.02; // 50x zoom
  const MAX_SIZE = 4; // 0.25x (zoom out past the frame)

  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  function makeRect(cx, cy, size) {
    return { cx, cy, size };
  }

  function fullFrameRect() {
    return makeRect(0.5, 0.5, 1);
  }

  /**
   * Sanitizes a rectangle. With `keepInside`, the rectangle is kept within the
   * frame so no empty (black) area can ever be revealed - assuming the clip's
   * base framing fills the frame.
   */
  function normalizeRect(rect, keepInside) {
    let size = clamp(Number(rect.size) || 1, MIN_SIZE, keepInside ? 1 : MAX_SIZE);
    let cx = Number.isFinite(rect.cx) ? rect.cx : 0.5;
    let cy = Number.isFinite(rect.cy) ? rect.cy : 0.5;
    if (keepInside) {
      const half = size / 2;
      cx = clamp(cx, half, 1 - half);
      cy = clamp(cy, half, 1 - half);
    }
    return makeRect(cx, cy, size);
  }

  function rectsEqual(a, b, eps = 1e-9) {
    return (
      Math.abs(a.cx - b.cx) < eps &&
      Math.abs(a.cy - b.cy) < eps &&
      Math.abs(a.size - b.size) < eps
    );
  }

  /**
   * Rectangle at normalized clip time u (0 = first frame, 1 = last frame).
   *
   * zoomPath:
   *   "linear"   - size and centre are interpolated linearly (what Resolve does).
   *                Zoom-ins visibly accelerate towards the end.
   *   "constant" - size is interpolated geometrically, so the zoom *speed* looks
   *                constant. The centre follows the same weight as the size, which
   *                keeps the zoom's fixed point perfectly still on screen.
   */
  function rectAt(start, end, u, easingName = "linear", zoomPath = "linear") {
    const e = getEasing(easingName)(clamp(u, 0, 1));
    let w = e;
    let size;
    if (zoomPath === "constant" && Math.abs(start.size - end.size) > 1e-9) {
      size = start.size * Math.pow(end.size / start.size, e);
      w = (start.size - size) / (start.size - end.size);
    } else {
      size = start.size + (end.size - start.size) * e;
    }
    return makeRect(
      start.cx + (end.cx - start.cx) * w,
      start.cy + (end.cy - start.cy) * w,
      size
    );
  }

  // --- Motion mapping ------------------------------------------------------

  /**
   * Converts a zoom rectangle into Motion values.
   * base = { position: {x, y}, scale, scaleWidth? }   (normalized position, scale in %)
   */
  function motionForRect(rect, base) {
    const z = 1 / rect.size;
    const out = {
      position: {
        x: (base.position.x - rect.cx) * z + 0.5,
        y: (base.position.y - rect.cy) * z + 0.5,
      },
      scale: base.scale * z,
    };
    if (base.scaleWidth != null) out.scaleWidth = base.scaleWidth * z;
    return out;
  }

  /** Inverse of motionForRect: what rectangle do these Motion values show? */
  function rectForMotion(motion, base) {
    const size = base.scale / motion.scale;
    return makeRect(
      base.position.x - (motion.position.x - 0.5) * size,
      base.position.y - (motion.position.y - 0.5) * size,
      size
    );
  }

  // --- Keyframe timing -----------------------------------------------------

  const TICKS_PER_SECOND = 254016000000;

  /**
   * Plans when keyframes go.
   *
   * clip = {
   *   durationSec,      // timeline duration of the clip
   *   frameSec,         // sequence frame duration
   *   inPointSec,       // clip in point in source-media time
   *   outPointSec,      // clip out point in source-media time
   * }
   * opts = {
   *   stepFrames,       // one keyframe every N frames (eased moves)
   *   twoKeysOnly,      // the move is linear in Premiere's own interpolation
   *   timeBase,         // "media": key time = in point + offset * speed (Premiere's
   *                     //          native effect-keyframe time); "clip": offset only
   *   maxKeys,          // safety cap per parameter
   * }
   * Returns [{ u, timeSec }] with u in [0,1] (0 = first frame, 1 = last frame).
   */
  function planKeyTimes(clip, opts) {
    const frame = clip.frameSec > 0 ? clip.frameSec : 1 / 30;
    const span = Math.max(0, clip.durationSec - frame); // first frame -> last frame
    if (!(clip.durationSec > 0)) throw new Error("Clip has no duration");

    const mediaSpan = clip.outPointSec - clip.inPointSec;
    const rate = clip.durationSec > 0 ? mediaSpan / clip.durationSec : 1;
    const toKeyTime = (offset) =>
      opts.timeBase === "clip" ? offset : clip.inPointSec + offset * rate;

    if (span <= 0) return [{ u: 0, timeSec: toKeyTime(0) }];

    const offsets = [];
    if (opts.twoKeysOnly) {
      offsets.push(0, span);
    } else {
      let step = Math.max(1, Math.round(opts.stepFrames || 1)) * frame;
      const maxKeys = Math.max(2, opts.maxKeys || 600);
      if (span / step + 1 > maxKeys) step = span / (maxKeys - 1);
      const count = Math.floor(span / step + 1e-6);
      for (let i = 0; i <= count; i++) offsets.push(i * step);
      if (span - offsets[offsets.length - 1] > frame * 0.5) offsets.push(span);
      else offsets[offsets.length - 1] = span;
    }
    return offsets.map((off) => ({ u: off / span, timeSec: toKeyTime(off) }));
  }

  /** True when Premiere's linear keyframe interpolation reproduces the move exactly. */
  function isExactWithTwoKeys(start, end, easingName) {
    // Position = (base - c) / size + 0.5 is only linear in time when size is constant.
    return easingName === "linear" && Math.abs(start.size - end.size) < 1e-9;
  }

  /**
   * Full plan: [{ timeSec, u, rect, position:{x,y}, scale, scaleWidth? }]
   */
  function planKeyframes({ start, end, easing, zoomPath, base, clip, stepFrames, timeBase, maxKeys }) {
    const twoKeysOnly = isExactWithTwoKeys(start, end, easing);
    const times = planKeyTimes(clip, { stepFrames, twoKeysOnly, timeBase, maxKeys });
    return times.map(({ u, timeSec }) => {
      const rect = rectAt(start, end, u, easing, zoomPath);
      return Object.assign({ timeSec, u, rect }, motionForRect(rect, base));
    });
  }

  function secondsToTicks(sec) {
    return String(Math.round(sec * TICKS_PER_SECOND));
  }

  // --- Presets ---------------------------------------------------------------

  const PRESETS = {
    zoomIn: { label: "Zoom In", start: [0.5, 0.5, 1], end: [0.5, 0.5, 0.8] },
    zoomOut: { label: "Zoom Out", start: [0.5, 0.5, 0.8], end: [0.5, 0.5, 1] },
    punchIn: { label: "Punch In (fast)", start: [0.5, 0.5, 1], end: [0.5, 0.45, 0.6] },
    panRight: { label: "Pan Left → Right", start: [0.425, 0.5, 0.85], end: [0.575, 0.5, 0.85] },
    panLeft: { label: "Pan Right → Left", start: [0.575, 0.5, 0.85], end: [0.425, 0.5, 0.85] },
    tiltDown: { label: "Tilt Top → Bottom", start: [0.5, 0.425, 0.85], end: [0.5, 0.575, 0.85] },
    kenBurns: { label: "Ken Burns", start: [0.45, 0.45, 0.9], end: [0.56, 0.54, 0.72] },
  };

  function presetRects(name) {
    const p = PRESETS[name];
    if (!p) throw new Error(`Unknown preset "${name}"`);
    return { start: makeRect(...p.start), end: makeRect(...p.end) };
  }

  const api = {
    cubicBezier,
    EASINGS,
    EASING_LABELS,
    getEasing,
    MIN_SIZE,
    MAX_SIZE,
    makeRect,
    fullFrameRect,
    normalizeRect,
    rectsEqual,
    rectAt,
    motionForRect,
    rectForMotion,
    planKeyTimes,
    isExactWithTwoKeys,
    planKeyframes,
    secondsToTicks,
    TICKS_PER_SECOND,
    PRESETS,
    presetRects,
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DZMath = api;
})(typeof window !== "undefined" ? window : this);
