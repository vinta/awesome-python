/*
 * Dynamic Zoom - interactive start/end rectangle editor (green = start,
 * red = end, as in DaVinci Resolve). Built from plain DOM elements because the
 * UXP canvas cannot draw images.
 *
 * Drag a box to move it, drag a corner to resize it (the opposite corner stays
 * put), use the mouse wheel over a box to zoom it about its centre.
 */
"use strict";

const Z = require("./zoomMath.js");

const CORNERS = {
  tl: [-1, -1],
  tr: [1, -1],
  bl: [-1, 1],
  br: [1, 1],
};

function createRectEditor(viewer, options) {
  const opts = Object.assign({ aspect: 16 / 9, keepInside: () => true, onChange: () => {} }, options);
  let aspect = opts.aspect;
  const rects = { start: Z.fullFrameRect(), end: Z.fullFrameRect() };
  const boxes = {};
  let drag = null;

  const img = viewer.querySelector(".viewer-img");
  const placeholder = viewer.querySelector(".viewer-placeholder");

  function el(tag, cls, parent, text) {
    const e = document.createElement(tag);
    e.className = cls;
    if (text) e.textContent = text;
    parent.appendChild(e);
    return e;
  }

  for (const which of ["start", "end"]) {
    const box = el("div", `zrect zrect-${which}`, viewer);
    box.dataset.which = which;
    el("div", "zlabel", box, which === "start" ? "START" : "END");
    for (const corner of Object.keys(CORNERS)) {
      const h = el("div", `handle handle-${corner}`, box);
      h.dataset.corner = corner;
    }
    boxes[which] = box;
  }
  const previewBox = el("div", "zrect zrect-preview", viewer);
  previewBox.style.display = "none";

  function size() {
    const w = viewer.clientWidth || viewer.getBoundingClientRect().width || 300;
    return { w, h: w / aspect };
  }

  function place(box, r) {
    const { w, h } = size();
    box.style.left = `${(r.cx - r.size / 2) * w}px`;
    box.style.top = `${(r.cy - r.size / 2) * h}px`;
    box.style.width = `${r.size * w}px`;
    box.style.height = `${r.size * h}px`;
  }

  function render() {
    const { h } = size();
    viewer.style.height = `${h}px`;
    place(boxes.start, rects.start);
    place(boxes.end, rects.end);
    // Smaller box on top so both stay grabbable when one contains the other.
    const startOnTop = rects.start.size < rects.end.size;
    boxes.start.style.zIndex = startOnTop ? "3" : "2";
    boxes.end.style.zIndex = startOnTop ? "2" : "3";
  }

  function set(which, rect, silent) {
    rects[which] = Z.normalizeRect(rect, opts.keepInside());
    render();
    if (!silent) opts.onChange(get());
  }

  function get() {
    return { start: Object.assign({}, rects.start), end: Object.assign({}, rects.end) };
  }

  // Element.closest is not available in every UXP version.
  function findBox(node) {
    for (let n = node; n && n !== viewer; n = n.parentNode) {
      if (n.dataset && n.dataset.which) return n;
    }
    return null;
  }

  function pointer(e) {
    const b = viewer.getBoundingClientRect();
    const { w, h } = size();
    // Boxes are positioned inside the border; the bounding rect includes it.
    const left = b.left + (b.width - w) / 2;
    const top = b.top + (b.height - h) / 2;
    return { x: (e.clientX - left) / w, y: (e.clientY - top) / h };
  }

  function onDown(e) {
    const box = findBox(e.target);
    if (!box) return;
    const which = box.dataset.which;
    const corner = e.target.dataset ? e.target.dataset.corner : null;
    const r = rects[which];
    const p = pointer(e);
    if (corner) {
      const [sx, sy] = CORNERS[corner];
      // The opposite corner is the fixed anchor while resizing.
      drag = { which, mode: "resize", sx, sy, ax: r.cx - (sx * r.size) / 2, ay: r.cy - (sy * r.size) / 2 };
    } else {
      drag = { which, mode: "move", dx: p.x - r.cx, dy: p.y - r.cy };
    }
    try {
      viewer.setPointerCapture(e.pointerId);
    } catch (_) {
      // older UXP: events still reach the viewer while the pointer is over it
    }
    e.preventDefault();
  }

  function onMove(e) {
    if (!drag) return;
    const p = pointer(e);
    const keep = opts.keepInside();
    if (drag.mode === "move") {
      const r = rects[drag.which];
      set(drag.which, Z.makeRect(p.x - drag.dx, p.y - drag.dy, r.size));
      return;
    }
    const { sx, sy, ax, ay } = drag;
    let s = Math.max(sx * (p.x - ax), sy * (p.y - ay), Z.MIN_SIZE);
    if (keep) {
      // Room between the anchor and the frame edge in the drag direction.
      s = Math.min(s, sx > 0 ? 1 - ax : ax, sy > 0 ? 1 - ay : ay);
    }
    s = Math.min(s, keep ? 1 : Z.MAX_SIZE);
    set(drag.which, Z.makeRect(ax + (sx * s) / 2, ay + (sy * s) / 2, s));
  }

  function onUp(e) {
    if (!drag) return;
    drag = null;
    try {
      viewer.releasePointerCapture(e.pointerId);
    } catch (_) {
      // ignore
    }
  }

  function onWheel(e) {
    const box = findBox(e.target);
    if (!box) return;
    const r = rects[box.dataset.which];
    const factor = Math.pow(1.0015, e.deltaY || 0);
    set(box.dataset.which, Z.makeRect(r.cx, r.cy, r.size * factor));
    e.preventDefault();
  }

  viewer.addEventListener("pointerdown", onDown);
  viewer.addEventListener("pointermove", onMove);
  viewer.addEventListener("pointerup", onUp);
  viewer.addEventListener("pointercancel", onUp);
  // Without pointer capture (older UXP) a release outside the viewer still ends the drag.
  document.addEventListener("pointerup", onUp);
  viewer.addEventListener("wheel", onWheel);

  // --- Preview playback -------------------------------------------------
  let previewTimer = null;

  function stopPreview() {
    if (previewTimer) clearTimeout(previewTimer);
    previewTimer = null;
    previewBox.style.display = "none";
  }

  function playPreview(easing, zoomPath, seconds = 2.5) {
    stopPreview();
    const t0 = Date.now();
    previewBox.style.display = "block";
    const step = () => {
      const u = Math.min(1, (Date.now() - t0) / (seconds * 1000));
      place(previewBox, Z.rectAt(rects.start, rects.end, u, easing, zoomPath));
      if (u < 1) previewTimer = setTimeout(step, 33);
      else previewTimer = setTimeout(stopPreview, 600);
    };
    step();
  }

  return {
    get,
    set: (which, rect) => set(which, rect, true),
    setBoth(start, end) {
      rects.start = Z.normalizeRect(start, opts.keepInside());
      rects.end = Z.normalizeRect(end, opts.keepInside());
      render();
    },
    setAspect(a) {
      if (a > 0 && isFinite(a)) aspect = a;
      render();
    },
    setImage(src) {
      if (src) {
        img.src = src;
        img.style.display = "block";
        if (placeholder) placeholder.style.display = "none";
      } else {
        img.removeAttribute("src");
        img.style.display = "none";
        if (placeholder) placeholder.style.display = "block";
      }
    },
    render,
    playPreview,
    stopPreview,
  };
}

module.exports = { createRectEditor };
