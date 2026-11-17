import json
import re
import shutil
import subprocess
from pathlib import Path

import pytest

TEMPLATE = Path(__file__).resolve().parents[2] / ".claude/skills/preview-verdicts/template.html"
NODE = shutil.which("node")

RUNNER = r"""
const fs = require("node:fs");
const vm = require("node:vm");
const { script, actions } = JSON.parse(fs.readFileSync(0, "utf8"));
const storage = {};
let elements, context, copied;
function reload() {
  elements = {};
  context = vm.createContext({
    document: { getElementById: id => elements[id] ||= {}, title: "Review" },
    localStorage: { getItem: key => storage[key], setItem: (key, value) => storage[key] = value },
    navigator: { clipboard: { writeText: text => { copied = text; return Promise.resolve(); } } }
  });
  vm.runInContext(script, context);
}
function snapshot() {
  return {
    html: elements.app.innerHTML,
    counts: elements.counts.innerHTML,
    feedback: context.collect(),
    rowClass: elements["r-Section__entry"]?.className,
    copied
  };
}
reload();
const snapshots = [snapshot()];
for (const [action, ...args] of actions) {
  if (action === "reload") reload();
  else context[action](...args);
  snapshots.push(snapshot());
}
process.stdout.write(JSON.stringify(snapshots));
"""


def preview(kind, verdict, actions=(), source=None):
    if NODE is None:
        pytest.skip("Preview script tests require Node.js")
    row = ["entry", "https://github.com/owner/entry", "1,000", kind, verdict, "Review reason"]
    if source is not None:
        row.append(source)
    data = [["Section", "Use case — review note", [row]]]
    script = TEMPLATE.read_text().split("<script>", 1)[1].split("</script>", 1)[0].replace("__DATA__", json.dumps(data))
    result = subprocess.run([NODE, "-e", RUNNER], input=json.dumps({"script": script, "actions": actions}), capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


@pytest.mark.parametrize(
    ("kind", "accept", "reject", "buttons"),
    [
        ("listed", "keep", "remove", ["Keep", "Remove", "Park"]),
        ("candidate", "add", "reject", ["Add", "Reject", "Park"]),
        ("structure", "restructure", "reject", ["Restructure", "Park", "Reject"]),
    ],
)
def test_parked_rows_keep_their_choices_and_feedback_after_reload(kind, accept, reject, buttons):
    initial, accepted, reloaded, copied, rejected, parked = preview(
        kind,
        "park",
        [("setV", "Section::entry", accept), ("reload",), ("copyFeedback",), ("setV", "Section::entry", reject), ("setV", "Section::entry", "park")],
    )
    for snapshot in (initial, accepted, reloaded, copied, rejected, parked):
        assert re.findall(r"<button[^>]*>([^<]+)</button>", snapshot["html"]) == buttons
    assert initial["feedback"] == parked["feedback"] == []
    expected = [{"section": "Section", "subcategory": "Use case", "entry": "entry", "kind": kind, "my_verdict": "park", "your_verdict": accept, "reason": ""}]
    assert accepted["feedback"] == reloaded["feedback"] == expected
    assert json.loads(copied["copied"]) == expected
    assert rejected["feedback"][0]["your_verdict"] == reject
    assert f'<button class="{accept} on"' in reloaded["html"]
    assert "<b>1</b> verdicts flipped" in reloaded["counts"]
    assert "<b>0</b> verdicts flipped" in parked["counts"]


@pytest.mark.parametrize(("kind", "verdict"), [("listed", "keep"), ("listed", "remove"), ("candidate", "add"), ("candidate", "reject"), ("structure", "restructure"), ("structure", "reject")])
def test_existing_verdicts_can_be_parked_without_losing_kind(kind, verdict):
    initial, parked, reloaded = preview(kind, verdict, [("setV", "Section::entry", "park"), ("reload",)])
    assert initial["feedback"] == []
    assert f'<button class="{verdict} on"' in initial["html"]
    assert parked["feedback"] == reloaded["feedback"]
    assert reloaded["feedback"][0] == {"section": "Section", "subcategory": "Use case", "entry": "entry", "kind": kind, "my_verdict": verdict, "your_verdict": "park", "reason": ""}


def test_comment_only_feedback_preserves_parked_kind_and_clears_highlight():
    _, commented, cleared = preview("candidate", "park", [("setF", "Section::entry", "  Need evidence  "), ("setF", "Section::entry", "")])
    assert commented["feedback"][0] == {"section": "Section", "subcategory": "Use case", "entry": "entry", "kind": "candidate", "my_verdict": "park", "your_verdict": "park", "reason": "Need evidence"}
    assert commented["rowClass"] == "changed"
    assert cleared["rowClass"] == ""
    assert cleared["feedback"] == []


def test_source_column_uses_optional_seventh_field():
    without_source = preview("candidate", "add")[0]["html"]
    with_source = preview("candidate", "add", source="Starred engine")[0]["html"]
    assert "<th>Source</th>" not in without_source
    assert "Review reason" in without_source
    assert "<th>Source</th>" in with_source
    assert '<td class="source">Starred engine</td>' in with_source
