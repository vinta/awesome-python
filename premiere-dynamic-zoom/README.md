# Dynamic Zoom for Premiere Pro

A panel for **Adobe Premiere Pro 2026 (v26.x)** that does what **Dynamic Zoom**
does in DaVinci Resolve. You set a green **START** box and a red **END** box over
the frame, pick an ease, and the selected clips smoothly push in, pull out, or pan
from one box to the other over their full length.

It writes ordinary **Motion › Position / Scale keyframes**, so the result renders
natively, exports anywhere, and can still be edited in Effect Controls.

| Resolve                        | This panel                                    |
| ------------------------------ | --------------------------------------------- |
| Green / red boxes in viewer    | Green START / red END boxes in the panel viewer (drag, resize, wheel-zoom) |
| Dynamic Zoom Ease              | Linear · Ease In · Ease Out · Ease In and Out |
| Swap                           | Swap                                          |
| Reset                          | Reset                                         |
| Applies to the clip's duration | First frame → last frame of each selected clip |

Extras: presets (Zoom In/Out, Punch In, pans, Ken Burns), numeric Zoom/X/Y
fields, live preview of the move, "Grab Frame" to show the real picture behind
the boxes, and a *constant-speed* zoom mode.

---

## Requirements

* **CEP build:** Premiere Pro 2020 (14.0) or later, while Premiere still loads CEP extensions. 2026.0 does. No Creative Cloud app needed.
* **UXP build:** Premiere Pro 25.6 or later and the Creative Cloud app (UXP plugins became official in 25.6).

## Install

There are two builds of the same panel:

| Build | Needs Creative Cloud app? | Where it appears in Premiere |
| ----- | ------------------------- | ---------------------------- |
| **CEP** (`dist/DynamicZoom-CEP.zip`) | No | Window › Extensions › Dynamic Zoom |
| **UXP** (`dist/DynamicZoom.ccx`) | Yes, to install | Window › UXP Plugins › Dynamic Zoom |

### Offline installer for Mac and Windows (no internet, no Creative Cloud app)

Download **[DynamicZoom-Installer.zip](https://github.com/ArtyzAudio/awesome-python/raw/claude/amazing-faraday-d3odj2/premiere-dynamic-zoom/dist/DynamicZoom-Installer.zip)**
and keep it anywhere, for example on a USB stick or a cloud drive. It contains the extension plus:

* `Install on Mac.command` / `Uninstall on Mac.command`
* `Install on Windows.bat` / `Uninstall on Windows.bat`
* `READ ME FIRST.txt` with step-by-step instructions, supported versions and troubleshooting

Unzip it and double-click the installer for your system. The scripts copy the bundled `DynamicZoom` folder into the
per-user CEP extensions folder (`~/Library/Application Support/Adobe/CEP/extensions` on Mac,
`%APPDATA%\Adobe\CEP\extensions` on Windows) and turn on `PlayerDebugMode`. On Windows that is a `REG_SZ` value
under `HKCU\Software\Adobe\CSXS.<9-14>`. The scripts live in [`installer/`](installer/), and
`npm run package` builds the zip.

### Mac without the Creative Cloud app (CEP build)

1. Quit Premiere Pro.
2. Open **Terminal** (press Cmd+Space, type `Terminal`, press Return).
3. Paste this line and press Return:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/ArtyzAudio/awesome-python/claude/amazing-faraday-d3odj2/premiere-dynamic-zoom/install-mac.sh | bash
   ```

4. Open Premiere Pro, then **Window › Extensions › Dynamic Zoom**. On some versions the menu is called **Extensions (Legacy)**.

The script ([install-mac.sh](install-mac.sh)) does three things:

1. Downloads `DynamicZoom-CEP.zip`.
2. Unzips it into `~/Library/Application Support/Adobe/CEP/extensions/DynamicZoom`.
3. Runs `defaults write com.adobe.CSXS.<9-14> PlayerDebugMode 1`, which lets Premiere load extensions that Adobe has not signed.

To do the same by hand, unzip the file into that folder and run the `defaults` commands. To uninstall, delete the `DynamicZoom` folder.

CEP note: Premiere records every keyframe as its own undo step. Use the panel's **Remove** button instead of Cmd+Z. Adobe is phasing CEP out, so a future Premiere release may stop loading this build. The UXP build is the long-term one.

### With the Creative Cloud app (UXP build)

1. Download **[DynamicZoom.ccx](https://github.com/ArtyzAudio/awesome-python/raw/claude/amazing-faraday-d3odj2/premiere-dynamic-zoom/dist/DynamicZoom.ccx)**.
2. Quit Premiere Pro.
3. Double-click `DynamicZoom.ccx`. The Creative Cloud app asks for confirmation; click **Install**.
4. Open **Window › UXP Plugins › Dynamic Zoom**.

If double-clicking does nothing, install it from Terminal:

```bash
"/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/macOS/UnifiedPluginInstallerAgent" --install ~/Downloads/DynamicZoom.ccx
```

For development, load `plugin/manifest.json` in **UXP Developer Tool** (Add Plugin › ••• › Load).

## Use

1. Select one or more clips in the Timeline. Linked audio is ignored.
2. *(Optional)* Put the playhead on the clip and click **Grab Frame** to show that frame behind the boxes.
3. Set the boxes:
   * **Drag** a box to move it, **drag a corner** to resize it (the opposite corner stays put), or **scroll** over a box to zoom it about its centre.
   * Or type **Zoom %**, **X %**, **Y %** (the box centre, as a percentage of the frame).
   * Or pick a **Preset**.
4. Pick **Dynamic Zoom Ease** and click **Preview** to see the move.
5. Click **Apply to Selected Clips**. Undo with Cmd/Ctrl+Z (UXP build) or **Remove**.
6. **Remove** deletes the zoom keyframes and puts back the clip's original Position/Scale.

You can re-apply as often as you like. The panel remembers each clip's original
framing, so applying again replaces the previous zoom instead of stacking on top of it.

### Box semantics

The boxes are drawn on the clip **as it currently looks** (its un-animated Motion
settings = 100 %). The START box fills the screen on the first frame and the END
box fills it on the last frame, exactly like Resolve. A box smaller than the frame
zooms in. A box larger than the frame zooms out and needs
*Advanced › Keep boxes inside the frame* turned off. Expect black edges in that case.

### Advanced

| Option | What it does |
| ------ | ------------ |
| **Zoom speed** | *Linear* interpolates the boxes linearly, like Resolve. Zoom-ins appear to accelerate. *Constant* interpolates the zoom geometrically so the speed looks even. The point being zoomed into stays perfectly still. |
| **Keyframe every** | Eased moves (and any zoom) are baked as linear keyframes every N frames, so the ease is reproduced exactly. 1 = frame-accurate; 2 (default) is visually identical and lighter. A linear pan with no size change uses just 2 keyframes. |
| **Keyframe time base** | Premiere stores effect keyframes in source-media time (in point + offset). Leave this on *Source media*. Switch to *Clip start* only if the keys land in the wrong place on your build. |
| **Keep boxes inside the frame** | Stops the boxes from leaving the frame, so no black edges appear (assuming the clip fills the frame). |

## How it works

All maths runs in normalized frame space, the same space Premiere's UXP API uses
for Motion › Position (the frame centre is `[0.5, 0.5]`). A box is `{cx, cy, size}`.
To show box *r* full-screen, the panel applies the map `q → (q − c) / size + 0.5`
to the whole picture, which in Motion terms is:

```
position = (basePosition − c) / size + 0.5
scale    = baseScale / size            (and Scale Width, if Uniform Scale is off)
```

Rotation and Anchor Point are untouched, so rotated or re-anchored clips work too.
Position is not linear in time while the size changes. That is why zooms are
sampled into keyframes and not left to Premiere's two-keyframe interpolation,
which would make the image drift sideways during the zoom.

Code layout:

```
plugin/                UXP build (also the source of the shared UI)
  manifest.json        UXP manifest (panel "Dynamic Zoom", Premiere ≥ 25.6)
  index.html/.js       panel markup + UXP bootstrap
  styles.css
  src/zoomMath.js      easing, box interpolation, Motion mapping, keyframe timing (shared)
  src/rectEditor.js    draggable START/END boxes (shared)
  src/panel.js         panel UI wiring (shared)
  src/premiere.js      Premiere UXP calls: selection, Motion params, undoable transactions
  src/frameGrab.js     Program-frame export for the viewer background (UXP)
cep/                   CEP build
  CSXS/manifest.xml    CEP manifest (Premiere 14.0+)
  host/dynamicZoom.jsx ExtendScript: reads clips, writes keyframes, exports the frame
  js/cepHost.js        panel-side adapter that calls the .jsx
  main.js, cep.css
scripts/build.js       builds dist/DynamicZoom.ccx, DynamicZoom-CEP.zip and DynamicZoom-Installer.zip (`npm run package`)
installer/             offline install/uninstall scripts for Mac and Windows + READ ME FIRST.txt
install-mac.sh         one-line online installer for the CEP build
test/                  Node tests: maths, a fake UXP host, and the real .jsx on a fake ExtendScript DOM
```

Run the tests with `npm test` (Node 21+).

## Limitations

* **Keyframes, not a live effect.** Like Resolve, the zoom spans the clip as it is when you apply it. After you trim or slip a clip, apply again.
* Applying **replaces any existing Position/Scale keyframes** on the selected clips.
* **Reversed** clips are skipped. **Time-remapped** clips are not handled specially.
* Premiere's API cannot set *spatial* interpolation, so Position keys keep Premiere's default (auto-Bézier). With keys every 1 to 2 frames this has no visible effect.
* **Grab Frame** shows the rendered frame at the playhead, including any zoom already applied. Grab before applying, or after **Remove**, to see the base framing.
* The panel remembers original framing per sequence, clip name, and in point. After you move a clip's in point, **Remove** falls back to the clip's first-frame values.
