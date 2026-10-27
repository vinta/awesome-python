import json
import shutil
import subprocess
from pathlib import Path

import pytest

NODE = shutil.which("node")
SCRIPT = Path(__file__).resolve().parents[1] / "static/main.js"
RUNNER = r"""
const fs = require("node:fs");
const vm = require("node:vm");
const { script, query } = JSON.parse(fs.readFileSync(0, "utf8"));
const classes = new Set();
const attributes = {"aria-expanded": "false"};
const search = {value: "", addEventListener() {}};
const row = {
  hidden: false, textContent: "httpx HTTP client", cells: [{textContent: "1"}],
  nextElementSibling: null,
  classList: {
    contains: name => name === "row" || classes.has(name),
    toggle(name, on) { if (on) classes.add(name); else classes.delete(name); }
  },
  matches: selector => selector === "tr.row",
  setAttribute: (name, value) => attributes[name] = value,
  querySelector: () => ({textContent: "httpx"})
};
const tbody = {
  rows: [row], addEventListener() {}, appendChild() {},
  querySelectorAll: selector => selector === "tr.row.open" ? (classes.has("open") ? [row] : []) : [row]
};
const table = {dataset: {defaultSort: "editorial"}, classList: {toggle() {}}};
const document = {
  querySelector: selector => ({".search": search, ".table": table, ".table tbody": tbody})[selector] || null,
  querySelectorAll: selector => selector === ".table tbody tr.row" ? [row] : [],
  getElementById: id => id === "entry-httpx" ? row : null,
  createDocumentFragment: () => ({appendChild() {}}),
  addEventListener() {}
};
const location = new URL("https://awesome-python.com/categories/http-clients/" + query + "#entry-httpx");
vm.runInNewContext(script, {
  document, location,
  window: {location, matchMedia: () => ({matches: false})}, URLSearchParams
});
process.stdout.write(JSON.stringify({open: attributes["aria-expanded"], hidden: row.hidden, search: search.value}));
"""


@pytest.mark.parametrize(
    ("query", "search"),
    [("", ""), ("?sort=name&order=asc", ""), ("?q=httpx", "httpx"), ("?q=requests", "")],
)
def test_entry_anchor_opens_after_initial_search_and_sort(query, search):
    if NODE is None:
        pytest.skip("Entry link script tests require Node.js")
    result = subprocess.run(
        [NODE, "-e", RUNNER],
        input=json.dumps({"script": SCRIPT.read_text(encoding="utf-8"), "query": query}),
        capture_output=True,
        text=True,
        check=True,
    )
    assert json.loads(result.stdout) == {"open": "true", "hidden": False, "search": search}
