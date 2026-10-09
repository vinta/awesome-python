# Dynamic Zoom for Premiere Pro: notes for AI agents

This file is the handoff for any AI (or person) continuing this project. It covers what was built and why,
the facts that took real effort to discover, and how to build, test and ship it again.

## What it is

A panel for Adobe Premiere Pro that copies DaVinci Resolve's **Dynamic Zoom**. The user sets a green START box and a
red END box over the frame and picks an ease (Linear / Ease In / Ease Out / Ease In and Out). The panel then writes
**Motion › Position + Scale keyframes** (and Scale Width when Uniform Scale is off) on each selected clip, so the
image moves from the START framing to the END framing over the clip.

The panel ships in two builds that share the same UI and math:

| Build | Folder | Tech | Installs via | Status |
|---|---|---|---|---|
| **CEP** (the one the user actually uses) | `cep/` + shared files | HTML/JS panel + ExtendScript `.jsx` | Copy a folder + `PlayerDebugMode` (no Creative Cloud app needed) | **Confirmed working by the user** on Premiere Pro 2026 (26.0), macOS |
| **UXP** | `plugin/` | Premiere UXP API (`require("premierepro")`) | `.ccx` through the Creative Cloud desktop app, or UXP Developer Tool | Built and unit-tested against a fake host; **never run in real Premiere** |

The user has **no Creative Cloud desktop app**. Their Premiere runs without it, so `.ccx` files cannot be installed
on their machine. That is why the CEP build exists. Don't steer them back to `.ccx`.

## File map

```
plugin/                 UXP build + the SHARED UI (single source of truth)
  manifest.json         UXP manifest (premierepro >= 25.6)
  index.html            panel markup (sp-button = Spectrum; the CEP build rewrites them to <button>)
  index.js              UXP bootstrap: wires premiere.js + frameGrab.js into panel.js
  styles.css            shared styles
  src/zoomMath.js       SHARED pure math: easing, box interpolation, Motion mapping, keyframe timing, presets
  src/rectEditor.js     SHARED draggable START/END box editor (DOM only; UXP canvas can't draw images)
  src/panel.js          SHARED panel wiring (inputs, presets, buttons, status); takes a "host" adapter
  src/premiere.js       UXP host: selection, Motion params, undoable transactions, keyframe writing
  src/frameGrab.js      UXP: export playhead frame (ppro.Exporter.exportSequenceFrame) for the viewer
cep/                    CEP build (combined with the shared files at build time)
  CSXS/manifest.xml     CEP manifest: PPRO [14.0,99.9], CSXS 9.0
  host/dynamicZoom.jsx  ExtendScript (ES3!): dz_info / dz_apply / dz_remove / dz_grab, all return JSON strings
  js/cepHost.js         panel-side adapter: calls the .jsx via __adobe_cep__.evalScript, computes the keyframe plan
  main.js, cep.css      CEP bootstrap + plain-HTML control styles
installer/              offline installer scripts + "READ ME FIRST.txt" (copied into the installer zip)
scripts/build.js        `npm run package`: builds everything in dist/
install-mac.sh          online one-liner installer (downloads dist/DynamicZoom-CEP.zip from GitHub)
dist/                   COMMITTED build outputs. Download links and install-mac.sh point at these.
  DynamicZoom-Installer.zip   offline installer (Mac .command + Windows .bat + the extension)   <- what the user keeps
  DynamicZoom-CEP.zip         bare CEP extension folder
  DynamicZoom.ccx             UXP package
test/                   node --test suites (math, fake UXP host, real .jsx on a fake ExtendScript DOM, frame grab)
build/                  unpacked build output (gitignored)
```

Shared modules use a dual export, because UXP and Node use `require` while CEP loads plain `<script>` tags:
`(function (root) { ... if (module) module.exports = api; else root.DZMath = api; })(window || this)`.
Globals in CEP: `DZMath`, `DZRectEditor`, `DZPanel`, `DZCepHost`. Keep that pattern for any new shared file and add
it to `SHARED` / `CEP_SCRIPTS` in `scripts/build.js`.

## Build, test, ship

```bash
cd premiere-dynamic-zoom
npm test            # 28 node tests (Node >= 21, no dependencies)
npm run package     # rebuilds dist/*.zip, dist/*.ccx and build/ (needs the `zip` CLI)
```

**Always commit `dist/` after `npm run package`.** The download links in README.md and in `install-mac.sh` serve
the committed files from the `claude/amazing-faraday-d3odj2` branch on GitHub (ArtyzAudio/awesome-python).
The project lives inside an unrelated "awesome-python" repo only because that was the repo attached to the session.

Release checklist: bump the version in `package.json`, `plugin/manifest.json`, `cep/CSXS/manifest.xml` (two places)
and `installer/READ ME FIRST.txt`, then run `npm test` and `npm run package`, commit and push.

## Hard-won facts (verify before "fixing" any of these)

### Platform
- Premiere's ExtendScript/CEP support was announced as maintained "through September 2026". UXP has been official
  since Premiere 25.6. CEP still loads in Premiere 2026 (26.x): the user runs it on 26.0, and community projects report
  CEP/ExtendScript working on 26.5.2. A future Premiere may drop CEP; then the UXP build is the way forward.
- Unsigned CEP extensions need `PlayerDebugMode = "1"`. On Mac: `defaults write com.adobe.CSXS.<N> PlayerDebugMode 1`.
  On Windows: a `REG_SZ` (not DWORD) value under `HKCU\Software\Adobe\CSXS.<N>`. The installers set N = 9..14.
- Per-user CEP folder: Mac `~/Library/Application Support/Adobe/CEP/extensions/`,
  Windows `%APPDATA%\Adobe\CEP\extensions\`. The panel appears under **Window › Extensions** (in newer versions the
  menu may read "Extensions (Legacy)").
- `.ccx` = zip of the plugin folder with `manifest.json` at the root. It only installs through Creative Cloud
  (double-click, or the UPIA tool at `/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/...`).

### THE drag bug: CEP on macOS does not deliver Pointer Events
- In Premiere's CEP browser on **macOS**, `pointerdown/pointermove/pointerup` never reach page listeners, even though
  `window.PointerEvent` exists. Mouse events and `click` do arrive. This is a known Adobe bug since 2020:
  github.com/adobe/react-spectrum/issues/854, github.com/Adobe-CEP/CEP-Resources/issues/401 and #486.
  Bolt CEP works around it with `delete window.PointerEvent`.
- Symptom the user saw: boxes would not drag, and the "END" label text became **highlighted**. The uncancelled
  mousedown started a text selection. A highlighted label is the tell-tale sign that the pointer handlers never ran.
- Fix in `rectEditor.js`: listen to BOTH families. Whichever press arrives first starts the drag. Do NOT cancel
  pointerdown, because that suppresses the mouse fallback; cancel mousedown instead. Read move/up from `document`.
  De-dupe twin moves within 1px. End a drag when a move reports `buttons==0` after that event family has reported
  the button held, tracked per family and remembered across drags in `reportsButtons`. Ignore a mouseup of another
  button while the left is held. `window` blur ends the drag. Also: `user-select:none`, `pointer-events:none` on the
  image, labels, thirds lines, placeholder and preview box, `draggable=false` on the img, and cancel
  `selectstart`/`dragstart`.
- Never go back to pointer-only input for anything in the CEP panel.

### Premiere data model (UXP and ExtendScript agree)
- Motion > Position is **normalized** to the sequence frame: centre = `[0.5, 0.5]`. UXP reads it back as a plain
  `[x, y]` array (sometimes wrapped as `Keyframe.value.value`). Write it as `new ppro.PointF(x, y)` in UXP, or as
  an `[x, y]` array in ExtendScript. Scale is in percent (max 10000).
- **Effect keyframe times are in source-media time**: key time = `clip.inPoint + offset × (out−in)/duration`. The
  in/out-based rate also handles speed changes. Reversed clips are skipped. A "Clip start" time-base fallback
  exists under Advanced, in case a build behaves differently.
- ExtendScript: `prop.setTimeVarying(false)` clears all keys, then `setTimeVarying(true)` → `addKey(Time)` →
  `setValueAtKey(Time, value, updateUI)`. Build `Time` objects with `t.ticks = "<string>"`; there are 254016000000
  ticks/s. Remove stray keys afterwards (enabling animation can add one at the playhead).
- UXP: everything goes inside `project.lockedAccess(() => project.executeTransaction(ca => ca.addAction(...)))`,
  in one undo step. Action creators: `createSetTimeVaryingAction`, `createKeyframe(value)` + `kf.position = TickTime`
  + `createAddKeyframeAction`, `createRemoveKeyframeAction`, `createSetValueAction`. Motion component matchName:
  `AE.ADBE Motion`. Find params by English displayName, falling back to indices 0 = Position, 1 = Scale,
  2 = Scale Width, 3 = Uniform Scale (localized builds).
- Frame grab, CEP: `app.enableQE(); qe.project.getActiveSequence().exportFramePNG(qeSeq.CTI.timecode, pathWithoutExt)`.
  QE appends `.png` and may write late, so poll `File.exists`. Frame grab, UXP: `ppro.Exporter.exportSequenceFrame`
  returns before the file exists and the extension handling varies by build; poll for `name`, `name.png` and `name.png.png`.
- The `.jsx` must stay **ES3**: no let/const/arrow functions/JSON/Array.map. It has its own `dz_json`
  serializer. The panel passes arguments by `JSON.stringify`-ing them into the evalScript call. Check with:
  `acorn.parse(src, {ecmaVersion: 3})`. The panel JS needs ES2017 (async/await), which is fine for CEP 9+.

### Zoom math (`zoomMath.js`)
- A box is `{cx, cy, size}` in normalized frame space. Its aspect ratio always equals the frame's, so it is a square
  in normalized units. To show box `r` full-frame: `position = (basePos − c)/size + 0.5`, `scale = baseScale/size`.
  This holds for rotated or re-anchored clips too.
- Position is not linear in time while the size changes. So zooms are **baked**: a linear keyframe every N frames
  (default 2). A pure pan with Linear ease uses 2 keys.
- "Constant" zoom path: the size is interpolated geometrically and the centre follows the same weight, which keeps the
  zoom's fixed point still on screen.
- The base framing (100%) is remembered per clip in localStorage (key `dz-base:<seq>:<clip name>:<inTicks>`), so
  re-applying replaces the zoom instead of compounding it. **Remove** restores the base framing.

## How things were verified (reuse these)
- `test/premiere.test.js`: fake UXP host. `test/cep.test.js`: runs the REAL `cep/host/dynamicZoom.jsx` in a Node `vm`
  on `test/fakeExtendScript.js`, a fake app/Time/File/QE DOM, driven end-to-end through `cepHost.js`.
- Browser testing of the panel: Playwright from `npm root -g`/playwright, Chromium at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (never `playwright install`). Serve a harness page that
  defines a fake `window.__adobe_cep__` (evalScript → runs the jsx with the fake DOM) before loading the built panel.
- **To simulate the CEP macOS bug in Chromium:** inject a script before the panel scripts that makes
  `addEventListener` ignore `pointer*` registrations. Drive the mouse through CDP (`page.mouse`). The old
  pointer-only code fails 9/10 drag scenarios under that variant; the current code passes 10/10. The full drag
  matrix (9 event-model variants × 10 scenarios) scored original 57/90 and current 89/90. The 1 remaining case,
  a host that never reports button state plus a lost mouseup, cannot be detected; the next click ends the drag.
- Mac installer: tested in a fake `$HOME` with stub `defaults`/`xattr` on `PATH`, from a path with spaces, after a
  real `unzip` (the zip keeps the `.command` executable bit). The Windows `.bat` has **never been executed** (no
  Windows/Wine available). It was written to stand up to spaces in paths and being run from inside a zip.

## Open items / next steps
1. Windows installer and the Windows CEP panel are untested on a real PC. Test before promising Windows support.
2. Premiere versions older than 2026 are untested. The manifest allows 14.0+, the read-me claims 2020–2026, and the
   APIs used are old, but this is unconfirmed.
3. UXP build: run it once in real Premiere 25.6+ via UXP Developer Tool. Check the keyframe time base, PointF writes
   and the frame grab.
4. Ideas: show a moving preview over the real frame for the clip's duration; bezier ease controls; per-clip settings;
   handle trimmed or slipped clips automatically. Today, re-apply after trimming.

## Conversation notes (user context)
- The user is non-technical, on macOS, with Premiere Pro 2026.0 and no Creative Cloud app. Give click-by-click steps.
- Mac Gatekeeper may block the `.command`. The fixes are System Settings › Privacy & Security › "Open Anyway", or in
  Terminal `bash ` + drag the file in + Return.
- The user keeps `DynamicZoom-Installer.zip` on a cloud drive to install on other machines. Tell them to keep the zip,
  not the unzipped folder, because cloud drives can drop the executable bit.
