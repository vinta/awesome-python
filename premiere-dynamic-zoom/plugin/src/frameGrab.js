/*
 * Dynamic Zoom - grabs the Program Monitor frame at the playhead so the zoom
 * rectangles can be drawn over the real picture (like Resolve's viewer).
 */
"use strict";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function base64FromBytes(bytes) {
  let out = "";
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + B64[n & 63];
  }
  const rest = bytes.length - i;
  if (rest === 1) {
    const n = bytes[i] << 16;
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + "==";
  } else if (rest === 2) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + "=";
  }
  return out;
}

function createFrameGrabber(ppro, uxp) {
  let previous = null;

  /** Exports the frame at the playhead; resolves to a UXP File entry. */
  async function grab(sequence, frameInfo, maxWidth = 640) {
    const fs = uxp.storage.localFileSystem;
    const tmp = await fs.getTemporaryFolder();
    const stem = `dz_frame_${Date.now()}`;
    const position = await sequence.getPlayerPosition();
    const width = Math.max(2, Math.min(maxWidth, Math.round(frameInfo.width)));
    const height = Math.max(2, Math.round((width * frameInfo.height) / frameInfo.width));

    // Builds differ on whether the file name carries the extension.
    let exported = false;
    let lastError = null;
    for (const name of [`${stem}.png`, stem]) {
      try {
        const ok = await ppro.Exporter.exportSequenceFrame(sequence, position, name, tmp.nativePath, width, height);
        if (ok !== false) {
          exported = true;
          break;
        }
      } catch (e) {
        lastError = e;
      }
    }
    if (!exported) {
      throw new Error(`Premiere could not export the frame${lastError ? `: ${lastError.message || lastError}` : ""}`);
    }

    // The export call can resolve before the PNG is on disk.
    const candidates = [`${stem}.png`, stem, `${stem}.png.png`];
    for (let waited = 0; waited <= 10000; waited += 250) {
      for (const name of candidates) {
        try {
          const entry = await tmp.getEntry(name);
          if (entry && entry.isFile) {
            if (previous) previous.delete().catch(() => {});
            previous = entry;
            return entry;
          }
        } catch (_) {
          // not there yet
        }
      }
      await sleep(250);
    }
    throw new Error("Timed out waiting for the exported frame.");
  }

  /** Data-URL fallback for hosts whose <img> does not accept File entries. */
  async function toDataUrl(entry) {
    const data = await entry.read({ format: uxp.storage.formats.binary });
    return `data:image/png;base64,${base64FromBytes(new Uint8Array(data))}`;
  }

  return { grab, toDataUrl };
}

module.exports = { createFrameGrabber, base64FromBytes };
