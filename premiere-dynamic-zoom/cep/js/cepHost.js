/*
 * Dynamic Zoom - CEP host adapter. Implements the panel's host interface on top
 * of the ExtendScript functions in host/dynamicZoom.jsx.
 */
(function (root) {
  "use strict";

  const isCommonJS = typeof module === "object" && module.exports;
  const MAX_SCALE = 10000; // Premiere's Motion > Scale upper limit (%)

  /** Calls an ExtendScript function through CEP and parses its JSON reply. */
  function createCaller(evalScript) {
    return async function call(fn, ...args) {
      const code = `${fn}(${args.map((a) => JSON.stringify(a)).join(",")})`;
      const raw = await evalScript(code);
      let out;
      try {
        out = JSON.parse(raw);
      } catch (_) {
        throw new Error(`Unexpected reply from Premiere: ${raw}`);
      }
      if (out && out.error) throw new Error(out.error);
      return out;
    };
  }

  function cepEvalScript(code) {
    return new Promise((resolve, reject) => {
      const cep = root.__adobe_cep__;
      if (!cep) {
        reject(new Error("Not running inside Premiere Pro."));
        return;
      }
      cep.evalScript(code, (result) => {
        if (result === "EvalScript error.") reject(new Error("Premiere could not run the panel script."));
        else resolve(result);
      });
    });
  }

  function fileUrl(path) {
    const p = String(path).replace(/\\/g, "/");
    return `file://${p.startsWith("/") ? "" : "/"}${encodeURI(p).replace(/#/g, "%23").replace(/\?/g, "%3F")}`;
  }

  function createCepHost(call, store, Z) {
    const sec = (ticks) => Number(ticks) / Z.TICKS_PER_SECOND;
    const baseKey = (info, c) => `dz-base:${info.seqId}:${c.name}:${c.inTicks}`;
    const validBase = (b, c) =>
      b && b.position && b.position.length === 2 && isFinite(b.scale) && (c.uniform || isFinite(b.scaleWidth));

    function toBase(position, scale, scaleWidth) {
      const base = { position: { x: position[0], y: position[1] }, scale };
      if (scaleWidth != null) base.scaleWidth = scaleWidth;
      return base;
    }
    // Stored bases use plain arrays so they survive JSON round trips unchanged.
    const pack = (b) => ({ position: [b.position.x, b.position.y], scale: b.scale, scaleWidth: b.scaleWidth });
    const unpack = (b) => toBase(b.position, b.scale, b.scaleWidth);

    async function info() {
      const i = await call("dz_info");
      if (!i.clips || !i.clips.length) throw new Error("Select one or more clips in the Timeline.");
      return i;
    }

    async function apply(i, c, settings) {
      const warnings = [];
      const key = baseKey(i, c);
      let base;
      if (!c.animated) {
        base = toBase(c.position, c.scale, c.uniform ? null : c.scaleWidth);
        store.set(key, pack(base));
      } else {
        const stored = store.get(key);
        if (validBase(stored, c)) {
          base = unpack(stored);
        } else {
          base = toBase(c.firstPosition, c.firstScale, c.uniform ? null : c.firstScaleWidth);
          store.set(key, pack(base));
          warnings.push("clip was already keyframed; its first-frame framing is used as 100%");
        }
      }

      const clip = {
        durationSec: sec(c.endTicks) - sec(c.startTicks),
        frameSec: i.frameSec,
        inPointSec: sec(c.inTicks),
        outPointSec: sec(c.outTicks),
      };
      if (!(clip.durationSec > 0)) return { name: c.name, skipped: "clip has no duration" };

      const plan = Z.planKeyframes({
        start: settings.start,
        end: settings.end,
        easing: settings.easing,
        zoomPath: settings.zoomPath,
        base,
        clip,
        stepFrames: settings.stepFrames,
        timeBase: settings.timeBase,
        maxKeys: 600,
      });
      const peak = Math.max(...plan.map((k) => Math.max(k.scale, k.scaleWidth || 0)));
      if (peak > MAX_SCALE) {
        return { name: c.name, error: `zoom needs ${Math.round(peak)}% scale (Premiere's limit is ${MAX_SCALE}%).` };
      }

      const r = await call(
        "dz_apply",
        c.nodeId,
        plan.map((k) => Z.secondsToTicks(k.timeSec)),
        plan.map((k) => [k.position.x, k.position.y]),
        plan.map((k) => k.scale),
        c.uniform ? null : plan.map((k) => k.scaleWidth)
      );
      if (r.keys < plan.length) warnings.push(`only ${r.keys}/${plan.length} keyframes were created`);
      return { name: c.name, keys: plan.length, warnings };
    }

    async function remove(i, c) {
      if (!c.animated) return { name: c.name, skipped: "no keyframes to remove" };
      const key = baseKey(i, c);
      const stored = store.get(key);
      const base = validBase(stored, c)
        ? stored
        : { position: c.firstPosition, scale: c.firstScale, scaleWidth: c.uniform ? null : c.firstScaleWidth };
      await call("dz_remove", c.nodeId, base);
      store.remove(key);
      return { name: c.name, keys: 0, warnings: [] };
    }

    async function forEachClip(settings, fn) {
      const i = await info();
      const results = [];
      for (const c of i.clips) {
        if (c.skipped) {
          results.push({ name: c.name, skipped: c.skipped });
          continue;
        }
        if (c.reversed) {
          results.push({ name: c.name, skipped: "reversed clips are not supported" });
          continue;
        }
        try {
          results.push(await fn(i, c, settings));
        } catch (e) {
          results.push({ name: c.name, error: String((e && e.message) || e) });
        }
      }
      return results;
    }

    return {
      async getAspect() {
        const i = await call("dz_info");
        return i.width / i.height;
      },
      async grabFrame() {
        const i = await call("dz_info");
        const g = await call("dz_grab");
        return { src: `${fileUrl(g.path)}?t=${Date.now()}`, aspect: i.width / i.height };
      },
      applyToSelection: (settings) => forEachClip(settings, apply),
      removeFromSelection: (settings) => forEachClip(settings, remove),
    };
  }

  const api = { createCaller, cepEvalScript, createCepHost, fileUrl };
  if (isCommonJS) module.exports = api;
  else root.DZCepHost = api;
})(typeof window !== "undefined" ? window : this);
