"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { createFrameGrabber, base64FromBytes } = require("../plugin/src/frameGrab.js");

test("base64 encoder matches Node's for every padding case", () => {
  for (let n = 0; n < 40; n++) {
    const bytes = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) & 255);
    assert.equal(base64FromBytes(bytes), Buffer.from(bytes).toString("base64"));
  }
});

test("grab retries without the extension and waits for the file to appear", async () => {
  const calls = [];
  const files = new Map();
  const tmp = {
    nativePath: "/tmp/plugin",
    getEntry: async (name) => {
      if (!files.has(name)) throw new Error("not found");
      return { isFile: true, name, delete: async () => files.delete(name), read: async () => files.get(name) };
    },
  };
  const ppro = {
    Exporter: {
      exportSequenceFrame: async (seq, pos, name) => {
        calls.push(name);
        if (name.endsWith(".png")) throw new Error("File Format is not supported");
        setTimeout(() => files.set(`${name}.png`, new Uint8Array([1, 2, 3]).buffer), 300); // written late
        return true;
      },
    },
  };
  const uxp = { storage: { localFileSystem: { getTemporaryFolder: async () => tmp }, formats: { binary: "binary" } } };
  const grabber = createFrameGrabber(ppro, uxp);
  const sequence = { getPlayerPosition: async () => ({ seconds: 1 }) };
  const entry = await grabber.grab(sequence, { width: 1920, height: 1080 });
  assert.equal(calls.length, 2);
  assert.ok(entry.name.endsWith(".png"));
  assert.equal(await grabber.toDataUrl(entry), "data:image/png;base64,AQID");
});
