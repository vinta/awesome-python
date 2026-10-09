"use strict";

/*
 * Runs the real ExtendScript host (cep/host/dynamicZoom.jsx) in a Node vm with
 * a fake Premiere DOM, driven through the CEP panel adapter.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const Z = require("../plugin/src/zoomMath.js");
const { createCaller, createCepHost, fileUrl } = require("../cep/js/cepHost.js");
const { makeExtendScriptEnv, TPS } = require("./fakeExtendScript.js");
const { cepHtml, CEP_SCRIPTS } = require("../scripts/build.js");

const JSX = fs.readFileSync(path.join(__dirname, "../cep/host/dynamicZoom.jsx"), "utf8");
const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

function setup() {
  const fake = makeExtendScriptEnv();
  const ctx = vm.createContext(fake.env);
  vm.runInContext(JSX, ctx);
  const mem = new Map();
  const store = {
    get: (k) => (mem.has(k) ? JSON.parse(mem.get(k)) : null),
    set: (k, v) => mem.set(k, JSON.stringify(v)),
    remove: (k) => mem.delete(k),
  };
  const host = createCepHost(createCaller(async (code) => vm.runInContext(code, ctx)), store, Z);
  return { fake, host };
}

const keyList = (p) => [...p.keys.entries()].map(([t, v]) => [Number(t) / TPS, v]).sort((a, b) => a[0] - b[0]);

const zoomIn = {
  start: Z.makeRect(0.5, 0.5, 1),
  end: Z.makeRect(0.6, 0.4, 0.5),
  easing: "easeInOut",
  zoomPath: "linear",
  stepFrames: 2,
  timeBase: "media",
};

test("CEP: applies keys in source-media time and drops the stopwatch key", async () => {
  const { fake, host } = setup();
  const item = fake.makeVideoItem("A");
  fake.select(item, fake.makeAudioItem("A audio"));
  const results = await host.applyToSelection(zoomIn);
  const done = results.find((r) => r.name === "A");
  assert.ok(done && !done.error, JSON.stringify(results));
  assert.deepEqual(done.warnings, []);
  assert.ok(results.some((r) => r.skipped), "audio is skipped");

  const [pos, scale, width] = item.params;
  const s = keyList(scale);
  const p = keyList(pos);
  assert.equal(s.length, done.keys);
  assert.equal(p.length, done.keys);
  assert.equal(width.keys.size, 0);
  close(s[0][0], 10);
  close(s[0][1], 100);
  close(s[s.length - 1][0], 14 - 1 / 25);
  close(s[s.length - 1][1], 200);
  close(p[p.length - 1][1][0], (0.5 - 0.6) * 2 + 0.5);
  close(p[p.length - 1][1][1], (0.5 - 0.4) * 2 + 0.5);
  assert.ok(!s.some(([t]) => Math.abs(t - 11.5) < 1e-6), "stray key removed");
});

test("CEP: re-apply replaces the zoom; remove restores the original framing", async () => {
  const { fake, host } = setup();
  const item = fake.makeVideoItem("A");
  item.params[0].value = [0.4, 0.55];
  item.params[1].value = 80;
  fake.select(item);
  await host.applyToSelection(zoomIn);
  const again = await host.applyToSelection({ ...zoomIn, end: Z.makeRect(0.5, 0.5, 0.8), stepFrames: 4 });
  assert.deepEqual(again[0].warnings, []);
  const s = keyList(item.params[1]);
  assert.equal(s.length, again[0].keys);
  close(s[0][1], 80);
  close(s[s.length - 1][1], 100);

  const removed = await host.removeFromSelection(zoomIn);
  assert.ok(!removed[0].error, JSON.stringify(removed));
  assert.equal(item.params[1].tv, false);
  assert.equal(item.params[1].value, 80);
  assert.deepEqual(item.params[0].value, [0.4, 0.55]);
});

test("CEP: non-uniform scale also animates Scale Width", async () => {
  const { fake, host } = setup();
  const item = fake.makeVideoItem("A", { uniform: false });
  item.params[2].value = 150;
  fake.select(item);
  await host.applyToSelection(zoomIn);
  const w = keyList(item.params[2]);
  close(w[0][1], 150);
  close(w[w.length - 1][1], 300);
});

test("CEP: reversed clips are skipped and empty selections explained", async () => {
  const { fake, host } = setup();
  await assert.rejects(host.applyToSelection(zoomIn), /Select one or more clips/);
  fake.select(fake.makeVideoItem("R", { reversed: 1 }));
  const r = await host.applyToSelection(zoomIn);
  assert.match(r[0].skipped, /reversed/);
});

test("CEP: frame grab returns a file URL to the exported PNG", async () => {
  const { host } = setup();
  const g = await host.grabFrame();
  assert.match(g.src, /^file:\/\/\/private\/tmp\/fake%20temp\/dz_frame_\d+\.png\?t=\d+$/);
  close(g.aspect, 16 / 9);
  assert.equal(fileUrl("C:\\Users\\me\\a#b.png"), "file:///C:/Users/me/a%23b.png");
});

test("CEP: index.html is derived from the UXP markup", () => {
  const html = cepHtml(fs.readFileSync(path.join(__dirname, "../plugin/index.html"), "utf8"));
  assert.ok(!/sp-button/.test(html));
  assert.match(html, /<button id="apply" class="cta">Apply to Selected Clips<\/button>/);
  for (const s of CEP_SCRIPTS) assert.ok(html.includes(`<script src="${s}"></script>`), s);
  assert.ok(html.includes('href="cep.css"'));
});
