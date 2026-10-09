/*
 * A small fake of Premiere's ExtendScript DOM (app, Time, File, Folder, $, qe),
 * enough to run cep/host/dynamicZoom.jsx outside Premiere.
 */
(function (root) {
  "use strict";

  const TPS = 254016000000;
  const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));

  function makeExtendScriptEnv(opts = {}) {
    const ctiSec = opts.ctiSec == null ? 11.5 : opts.ctiSec;
    const files = new Set();

    class Time {
      constructor() {
        this._ticks = "0";
      }
      get ticks() {
        return this._ticks;
      }
      set ticks(v) {
        this._ticks = String(v);
      }
      get seconds() {
        return Number(this._ticks) / TPS;
      }
    }
    const at = (sec) => {
      const t = new Time();
      t.ticks = String(Math.round(sec * TPS));
      return t;
    };

    function makeProp(displayName, value) {
      const p = {
        displayName,
        value: clone(value),
        tv: false,
        keys: new Map(),
        sortedKeys: () => [...p.keys.keys()].sort((a, b) => Number(a) - Number(b)),
        valueAt(ticks) {
          const ks = p.sortedKeys();
          const hit = ks.filter((k) => Number(k) <= Number(ticks)).pop() || ks[0];
          return clone(p.keys.get(hit));
        },
        getValue: () => clone(p.tv ? p.valueAt(p.sortedKeys()[0]) : p.value),
        setValue(v) {
          if (p.tv) throw new Error(`${displayName}: setValue while animated`);
          p.value = clone(v);
        },
        isTimeVarying: () => p.tv,
        setTimeVarying(on) {
          if (!on) p.keys.clear();
          else if (!p.tv) p.keys.set(String(Math.round(ctiSec * TPS)), clone(p.value)); // stopwatch key at the CTI
          p.tv = !!on;
        },
        addKey(t) {
          if (!p.tv) throw new Error(`${displayName}: addKey while not animated`);
          if (!p.keys.has(String(t.ticks))) p.keys.set(String(t.ticks), clone(p.value));
        },
        setValueAtKey(t, v) {
          if (!p.keys.has(String(t.ticks))) throw new Error(`${displayName}: no key at ${t.ticks}`);
          p.keys.set(String(t.ticks), clone(v));
        },
        getKeys: () => (p.tv ? p.sortedKeys().map((k) => Object.assign(new Time(), { ticks: k })) : undefined),
        removeKey(t) {
          p.keys.delete(String(t.ticks));
        },
        getValueAtTime: (t) => clone(p.tv ? p.valueAt(t.ticks) : p.value),
      };
      return p;
    }

    function collection(items) {
      const c = { numItems: items.length };
      items.forEach((it, i) => (c[i] = it));
      return c;
    }

    let nextId = 1;
    function makeVideoItem(name, { inSec = 10, outSec = 14, startSec = 100, durSec = 4, uniform = true, reversed = 0 } = {}) {
      const params = [
        makeProp("Position", [0.5, 0.5]),
        makeProp("Scale", 100),
        makeProp("Scale Width", 100),
        makeProp("Uniform Scale", uniform),
        makeProp("Rotation", 0),
        makeProp("Anchor Point", [0.5, 0.5]),
      ];
      const motion = { matchName: "AE.ADBE Motion", displayName: "Motion", properties: collection(params) };
      const opacity = { matchName: "AE.ADBE Opacity", displayName: "Opacity", properties: collection([]) };
      return {
        params,
        nodeId: String(nextId++),
        name,
        mediaType: "Video",
        inPoint: at(inSec),
        outPoint: at(outSec),
        start: at(startSec),
        end: at(startSec + durSec),
        isSpeedReversed: () => reversed,
        components: collection([opacity, motion]),
      };
    }

    function makeAudioItem(name) {
      return {
        nodeId: String(nextId++),
        name,
        mediaType: "Audio",
        components: collection([{ matchName: "AE.ADBE Volume", displayName: "Volume", properties: collection([]) }]),
      };
    }

    const selection = [];
    const videoClips = [];
    const sequence = {
      sequenceID: "seq-1",
      timebase: String(TPS / 25),
      frameSizeHorizontal: 1920,
      frameSizeVertical: 1080,
      getSelection: () => selection.slice(),
      get videoTracks() {
        return { numTracks: 1, 0: { clips: collection(videoClips) } };
      },
    };

    const env = {
      app: { project: { activeSequence: sequence }, enableQE() {} },
      qe: {
        project: {
          getActiveSequence: () => ({
            CTI: { timecode: "00:00:01:00" },
            exportFramePNG: (timecode, stem) => files.add(`${stem}.png`),
          }),
        },
      },
      Time,
      File: class {
        constructor(p) {
          this.fsName = p;
        }
        get exists() {
          return files.has(this.fsName);
        }
        remove() {
          return files.delete(this.fsName);
        }
      },
      Folder: { temp: { fsName: "/private/tmp/fake temp" } },
      $: { sleep() {} },
    };

    return {
      env,
      files,
      selection,
      select(...items) {
        for (const it of items) {
          selection.push(it);
          if (it.mediaType === "Video") videoClips.push(it);
        }
      },
      makeVideoItem,
      makeAudioItem,
      at,
    };
  }

  const api = { makeExtendScriptEnv, TPS };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DZFakeExtendScript = api;
})(typeof window !== "undefined" ? window : this);
