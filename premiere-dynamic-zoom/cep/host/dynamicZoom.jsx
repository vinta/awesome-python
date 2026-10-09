/*
 * Dynamic Zoom - ExtendScript host for the CEP panel.
 *
 * ExtendScript is ES3: no let/const, arrow functions, JSON or Array extras.
 * The panel computes the keyframe plan; this file only reads clips and writes
 * keys. Every function returns a JSON string.
 */

var DZ_TPS = 254016000000;
var dz_lastFrame = null;

function dz_json(v) {
  var t = typeof v;
  if (v === null || v === undefined || (t === "number" && !isFinite(v))) return "null";
  if (t === "number" || t === "boolean") return String(v);
  if (t === "string") {
    return '"' + v.replace(/[\\"]/g, "\\$&").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") + '"';
  }
  var parts = [];
  var i;
  if (v instanceof Array) {
    for (i = 0; i < v.length; i++) parts.push(dz_json(v[i]));
    return "[" + parts.join(",") + "]";
  }
  for (i in v) {
    if (v.hasOwnProperty(i)) parts.push(dz_json(String(i)) + ":" + dz_json(v[i]));
  }
  return "{" + parts.join(",") + "}";
}

function dz_error(message) {
  return dz_json({ error: String(message) });
}

function dz_time(ticks) {
  var t = new Time();
  t.ticks = String(ticks);
  return t;
}

function dz_point(v) {
  if (v && v.length >= 2) return [Number(v[0]), Number(v[1])];
  return null;
}

function dz_bool(v) {
  return v === true || v === 1 || v === "true";
}

function dz_sequence() {
  return app.project ? app.project.activeSequence : null;
}

function dz_findMotion(item) {
  var comps;
  try {
    comps = item.components;
  } catch (e) {
    return null;
  }
  if (!comps) return null;
  var i;
  for (i = 0; i < comps.numItems; i++) {
    if (comps[i].matchName === "AE.ADBE Motion") return comps[i];
  }
  for (i = 0; i < comps.numItems; i++) {
    if (comps[i].displayName === "Motion") return comps[i];
  }
  return null;
}

// English display names, with Motion's documented order as the fallback for
// localized Premiere builds.
function dz_params(motion) {
  var props = motion.properties;
  var n = props.numItems;
  function pick(names, index) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < names.length; j++) {
        if (props[i].displayName === names[j]) return props[i];
      }
    }
    return index < n ? props[index] : null;
  }
  return {
    position: pick(["Position"], 0),
    scale: pick(["Scale", "Scale Height"], 1),
    scaleWidth: pick(["Scale Width"], 2),
    uniform: pick(["Uniform Scale"], 3)
  };
}

function dz_isUniform(P) {
  if (!P.uniform || !P.scaleWidth) return true;
  try {
    return dz_bool(P.uniform.getValue());
  } catch (e) {
    return true;
  }
}

function dz_findItem(nodeId) {
  var seq = dz_sequence();
  if (!seq) return null;
  var sel = seq.getSelection();
  var i;
  for (i = 0; i < sel.length; i++) {
    if (String(sel[i].nodeId) === nodeId) return sel[i];
  }
  for (var t = 0; t < seq.videoTracks.numTracks; t++) {
    var clips = seq.videoTracks[t].clips;
    for (i = 0; i < clips.numItems; i++) {
      if (String(clips[i].nodeId) === nodeId) return clips[i];
    }
  }
  return null;
}

/** Active sequence + selected clips with their timing and Motion values. */
function dz_info() {
  try {
    var seq = dz_sequence();
    if (!seq) return dz_error("Open a sequence in the Timeline first.");
    var tb = Number(seq.timebase);
    var out = {
      seqId: String(seq.sequenceID),
      width: Number(seq.frameSizeHorizontal) || 1920,
      height: Number(seq.frameSizeVertical) || 1080,
      frameSec: tb > 0 ? tb / DZ_TPS : 1 / 30,
      clips: []
    };
    var sel = seq.getSelection();
    for (var i = 0; i < sel.length; i++) {
      var it = sel[i];
      var c = { nodeId: String(it.nodeId), name: String(it.name) };
      var motion = dz_findMotion(it);
      if (!motion) {
        c.skipped = "no Motion effect (audio item?)";
        out.clips.push(c);
        continue;
      }
      try {
        c.reversed = dz_bool(it.isSpeedReversed());
      } catch (eRev) {
        c.reversed = false;
      }
      c.inTicks = String(it.inPoint.ticks);
      c.outTicks = String(it.outPoint.ticks);
      c.startTicks = String(it.start.ticks);
      c.endTicks = String(it.end.ticks);

      var P = dz_params(motion);
      c.uniform = dz_isUniform(P);
      c.animated = !!(P.position.isTimeVarying() || P.scale.isTimeVarying() ||
        (!c.uniform && P.scaleWidth.isTimeVarying()));
      c.position = dz_point(P.position.getValue());
      c.scale = Number(P.scale.getValue());
      if (!c.uniform) c.scaleWidth = Number(P.scaleWidth.getValue());
      if (c.animated) {
        // Values on the clip's first frame (effect keys live in source-media time).
        var t0 = dz_time(it.inPoint.ticks);
        c.firstPosition = dz_point(P.position.getValueAtTime(t0));
        c.firstScale = Number(P.scale.getValueAtTime(t0));
        if (!c.uniform) c.firstScaleWidth = Number(P.scaleWidth.getValueAtTime(t0));
      }
      out.clips.push(c);
    }
    return dz_json(out);
  } catch (e) {
    return dz_error(e);
  }
}

function dz_isPlanned(ticks, times, tolerance) {
  var v = Number(ticks);
  for (var i = 0; i < times.length; i++) {
    if (Math.abs(Number(times[i]) - v) <= tolerance) return true;
  }
  return false;
}

/**
 * Replaces the clip's Position/Scale(/Scale Width) animation with the given
 * keys. times: tick strings; positions: [[x, y]...]; scales/widths: numbers.
 */
function dz_apply(nodeId, times, positions, scales, widths) {
  try {
    var it = dz_findItem(nodeId);
    if (!it) return dz_error("the clip is no longer in the sequence");
    var motion = dz_findMotion(it);
    if (!motion) return dz_error("no Motion effect");
    var P = dz_params(motion);
    var params = [P.position, P.scale];
    var values = [positions, scales];
    if (widths) {
      params.push(P.scaleWidth);
      values.push(widths);
    }

    var tolerance = DZ_TPS;
    for (var g = 1; g < times.length; g++) {
      tolerance = Math.min(tolerance, Math.abs(Number(times[g]) - Number(times[g - 1])) / 4);
    }
    if (times.length < 2) tolerance = 1;

    var last = times.length - 1;
    for (var p = 0; p < params.length; p++) {
      var prop = params[p];
      if (prop.isTimeVarying()) prop.setTimeVarying(false); // clears the old keys
      prop.setTimeVarying(true);
      for (var k = 0; k <= last; k++) {
        var t = dz_time(times[k]);
        prop.addKey(t);
        prop.setValueAtKey(t, values[p][k], k === last);
      }
      // Drop anything that is not ours (e.g. a key added when animation was enabled).
      var keys = prop.getKeys();
      if (keys) {
        for (var s = keys.length - 1; s >= 0; s--) {
          if (!dz_isPlanned(keys[s].ticks, times, tolerance)) prop.removeKey(keys[s]);
        }
      }
    }
    var written = P.scale.getKeys();
    return dz_json({ ok: true, keys: written ? written.length : 0 });
  } catch (e) {
    return dz_error(e);
  }
}

/** Removes the animation and restores the given static framing. */
function dz_remove(nodeId, base) {
  try {
    var it = dz_findItem(nodeId);
    if (!it) return dz_error("the clip is no longer in the sequence");
    var motion = dz_findMotion(it);
    if (!motion) return dz_error("no Motion effect");
    var P = dz_params(motion);
    var params = [P.position, P.scale];
    var values = [base.position, base.scale];
    if (!dz_isUniform(P) && base.scaleWidth !== undefined && base.scaleWidth !== null) {
      params.push(P.scaleWidth);
      values.push(base.scaleWidth);
    }
    var changed = 0;
    for (var p = 0; p < params.length; p++) {
      var prop = params[p];
      if (!prop.isTimeVarying()) continue;
      var keys = prop.getKeys();
      if (keys) {
        for (var k = keys.length - 1; k >= 0; k--) prop.removeKey(keys[k]);
      }
      prop.setTimeVarying(false);
      prop.setValue(values[p], true);
      changed++;
    }
    return dz_json({ ok: true, changed: changed });
  } catch (e) {
    return dz_error(e);
  }
}

/** Exports the frame at the playhead as a PNG; returns its path. */
function dz_grab() {
  try {
    if (!dz_sequence()) return dz_error("Open a sequence in the Timeline first.");
    app.enableQE();
    var q = qe.project.getActiveSequence();
    if (!q) return dz_error("Open a sequence in the Timeline first.");
    var stem = Folder.temp.fsName + "/dz_frame_" + new Date().getTime();
    q.exportFramePNG(q.CTI.timecode, stem); // QE appends ".png" itself
    var candidates = [stem + ".png", stem, stem + ".png.png"];
    for (var w = 0; w < 100; w++) {
      for (var i = 0; i < candidates.length; i++) {
        var f = new File(candidates[i]);
        if (f.exists) {
          if (dz_lastFrame && dz_lastFrame !== f.fsName) {
            try {
              new File(dz_lastFrame).remove();
            } catch (eRm) {}
          }
          dz_lastFrame = f.fsName;
          return dz_json({ path: f.fsName });
        }
      }
      $.sleep(100);
    }
    return dz_error("Timed out waiting for the exported frame.");
  } catch (e) {
    return dz_error(e);
  }
}
