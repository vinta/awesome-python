#!/usr/bin/env node
/*
 * Builds both packages into dist/:
 *   DynamicZoom.ccx       UXP plugin (needs the Creative Cloud app to install)
 *   DynamicZoom-CEP.zip   CEP extension (copy into the CEP extensions folder)
 *
 * The CEP build reuses the UXP panel markup, styles and shared modules, swapping
 * Spectrum <sp-button>s for plain <button>s. Requires the `zip` command.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const PLUGIN = path.join(ROOT, "plugin");
const CEP = path.join(ROOT, "cep");
const DIST = path.join(ROOT, "dist");
const BUILD = path.join(ROOT, "build");
const CEP_NAME = "DynamicZoom";

const SHARED = ["src/zoomMath.js", "src/rectEditor.js", "src/panel.js"];
const CEP_SCRIPTS = [...SHARED, "js/cepHost.js", "main.js"];

function copy(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

function zip(cwd, out, inputs) {
  fs.rmSync(out, { force: true });
  execFileSync("zip", ["-q", "-r", "-X", out, ...inputs, "-x", "*/.*", ".*"], { cwd, stdio: "inherit" });
}

/** UXP markup -> plain HTML for CEP. */
function cepHtml(uxpHtml) {
  let html = uxpHtml.replace(
    /<sp-button([^>]*)>([\s\S]*?)<\/sp-button>/g,
    (_, attrs, label) => {
      const id = /id="([^"]+)"/.exec(attrs);
      const cta = /variant="cta"/.test(attrs);
      return `<button${id ? ` id="${id[1]}"` : ""}${cta ? ' class="cta"' : ""}>${label}</button>`;
    }
  );
  html = html.replace(
    '<link rel="stylesheet" href="styles.css" />',
    '<link rel="stylesheet" href="styles.css" />\n    <link rel="stylesheet" href="cep.css" />'
  );
  const scripts = CEP_SCRIPTS.map((s) => `<script src="${s}"></script>`).join("\n    ");
  if (!html.includes('<script src="index.js"></script>')) throw new Error("index.html script tag not found");
  return html.replace('<script src="index.js"></script>', scripts);
}

function buildCep() {
  const out = path.join(BUILD, CEP_NAME);
  fs.rmSync(BUILD, { recursive: true, force: true });
  for (const f of ["CSXS", "host", "js", "main.js", "cep.css"]) copy(path.join(CEP, f), path.join(out, f));
  for (const f of [...SHARED, "styles.css"]) copy(path.join(PLUGIN, f), path.join(out, f));
  fs.writeFileSync(path.join(out, "index.html"), cepHtml(fs.readFileSync(path.join(PLUGIN, "index.html"), "utf8")));
  zip(BUILD, path.join(DIST, `${CEP_NAME}-CEP.zip`), [CEP_NAME]);
  return out;
}

function buildUxp() {
  zip(PLUGIN, path.join(DIST, "DynamicZoom.ccx"), ["."]);
}

if (require.main === module) {
  fs.mkdirSync(DIST, { recursive: true });
  buildUxp();
  const cepDir = buildCep();
  console.log(`Built dist/DynamicZoom.ccx and dist/${CEP_NAME}-CEP.zip (unpacked CEP build: ${path.relative(ROOT, cepDir)})`);
}

module.exports = { cepHtml, buildCep, CEP_SCRIPTS };
