/*
 * Dynamic Zoom - interactive start/end rectangle editor (green = start,
 * red = end, as in DaVinci Resolve). Built from plain DOM elements because the
 * UXP canvas cannot draw images.
 *
 * Drag a box to move it, drag a corner to resize it (the opposite corner stays
 * put), use the mouse wheel over a box to zoom it about its centre.
 */
(function (root) {
  "use strict";

  const isCommonJS = typeof module === "object" && module.exports;
  const Z = isCommonJS ? require("./zoomMath.js") : root.DZMath;

  const CORNERS = {
    tl: [-1, -1],
    tr: [1, -1],
    bl: [-1, 1],
    br: [1, 1],
  };

  function createRectEditor(viewer, options) {
    const opts = Object.assign({ aspect: 16 / 9, keepInside: () => true, onChange: () => {}, onHint: () => {} }, options);
    let aspect = opts.aspect;
    const rects = { start: Z.fullFrameRect(), end: Z.fullFrameRect() };
    const boxes = {};
    let drag = null;
    let hintShown = false;

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
      // Small boxes: handles move out to the corners (tiny ones: fully outside)
      // so the middle can still be grabbed to move the box.
      if (box.classList) {
        box.classList.toggle("zrect-small", r.size * w < 40);
        box.classList.toggle("zrect-tiny", Math.min(r.size * w, r.size * h) < 24);
      }
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

    // --- Dragging -----------------------------------------------------------
    // Premiere's CEP browser on macOS does not deliver pointer events to the
    // page (a long-standing Adobe bug), while mouse events still arrive. UXP and
    // current browsers send both. So both families are handled and whichever
    // press arrives first starts the drag. Positions are absolute, so seeing one
    // movement through both families is harmless; repeats within a pixel are
    // skipped. Move/up are read from the whole document, so a drag keeps
    // following the mouse outside the viewer and ends wherever it is released.

    function beginDrag(e, kind) {
      const box = findBox(e.target);
      if (!box) return false;
      // The press is cancelled, so focus would stay in a number field: blur it
      // first so a typed-but-uncommitted value is committed (change event).
      const active = document.activeElement;
      if (active && active !== document.body && !viewer.contains(active) && typeof active.blur === "function") {
        active.blur();
      }
      if (hintShown) {
        hintShown = false;
        opts.onHint(null); // put back whatever the status line said before
      }
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
      drag.kind = kind;
      drag.pointerId = kind === "pointer" ? e.pointerId : null;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.held = {}; // per event family: seen a move that reported the button held
      if (kind === "pointer") {
        try {
          viewer.setPointerCapture(e.pointerId);
        } catch (_) {
          // not needed: move/up are read from the document
        }
      }
      return true;
    }

    function endDrag() {
      if (!drag) return;
      const id = drag.pointerId;
      drag = null;
      if (id === null || id === undefined) return;
      try {
        viewer.releasePointerCapture(id);
      } catch (_) {
        // ignore
      }
    }

    function onPointerDown(e) {
      if (e.button > 0) return; // right / middle button
      // Not cancelled on purpose: cancelling pointerdown makes Chromium drop the
      // mouse events of this press, which are the fallback if pointer events
      // stop arriving. The mousedown is cancelled instead.
      beginDrag(e, "pointer");
    }

    function onMouseDown(e) {
      if (e.button > 0) return;
      if (drag && drag.kind === "pointer") {
        // The compatibility mousedown of a press already handled as a pointer.
        e.preventDefault();
        return;
      }
      // Cancelling mousedown stops text selection and native image drags.
      if (beginDrag(e, "mouse")) e.preventDefault();
    }

    function onMove(e) {
      if (!drag) return;
      if (typeof e.buttons === "number") {
        // Each family (pointer/mouse) is judged by its own reports, in case a
        // host fills in `buttons` for one family only.
        const family = e.type.charAt(0);
        if (e.buttons & 1) drag.held[family] = true;
        // Moves reported the button held and now one says it is up: the release
        // happened where we could not see it (outside the panel). Stop instead
        // of leaving the box stuck to the mouse.
        else if (drag.held[family]) return endDrag();
      }
      // Skip the twin of a move already handled (pointer coordinates can be
      // fractional, mouse ones are whole pixels).
      if (Math.abs(e.clientX - drag.lastX) < 1 && Math.abs(e.clientY - drag.lastY) < 1) return;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      const p = pointer(e);
      const keep = opts.keepInside();
      if (drag.mode === "move") {
        const r = rects[drag.which];
        if (!hintShown && keep && r.size >= 1 - 1e-9) {
          hintShown = true;
          opts.onHint("This box covers the whole frame. Drag a corner to make it smaller first, " +
            "or turn off Advanced › Keep boxes inside the frame.");
        }
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

    function onWheel(e) {
      const box = findBox(e.target);
      if (!box) return;
      const r = rects[box.dataset.which];
      const factor = Math.pow(1.0015, e.deltaY || 0);
      set(box.dataset.which, Z.makeRect(r.cx, r.cy, r.size * factor));
      e.preventDefault();
    }

    function cancel(e) {
      e.preventDefault();
    }

    viewer.addEventListener("pointerdown", onPointerDown);
    viewer.addEventListener("mousedown", onMouseDown);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);
    document.addEventListener("mouseup", (e) => {
      // Releasing another button while the left one is still held is not the end.
      if (e.button > 0 && e.buttons & 1) return;
      endDrag();
    });
    if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("blur", endDrag);
    viewer.addEventListener("wheel", onWheel);
    // Never start a text selection or a native image drag from the viewer.
    viewer.addEventListener("selectstart", cancel);
    viewer.addEventListener("dragstart", cancel);
    if (img) img.setAttribute("draggable", "false");

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

  if (isCommonJS) module.exports = { createRectEditor };
  else root.DZRectEditor = { createRectEditor };
})(typeof window !== "undefined" ? window : this);
