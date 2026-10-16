import importlib.util
import json
from datetime import UTC, datetime, timedelta
from pathlib import Path

import pytest


@pytest.fixture
def scan(tmp_path, monkeypatch, capsys):
    script = Path(__file__).resolve().parents[2] / ".claude/skills/scan-github-stars/scripts/scan_github_stars.py"
    spec = importlib.util.spec_from_file_location("scan_github_stars", script)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    monkeypatch.setattr(module, "LEDGER", tmp_path / "starred-scan.tsv")
    monkeypatch.setattr(module, "REGISTER", tmp_path / "audit-logs.md")
    monkeypatch.setattr(module, "listed_repos", lambda: {"example/listed"})
    module.LEDGER.write_text("repo\tdate\treason\n")
    module.REGISTER.write_text("## Rejected Additions\n\n## Last Audited\n")
    now = datetime.now(UTC)
    star = {
        "full_name": "Example/Project",
        "owner": {"login": "Example"},
        "archived": False,
        "pushed_at": now.isoformat(),
        "created_at": (now - timedelta(days=100)).isoformat(),
        "language": "Python",
        "stargazers_count": 100,
        "topics": [],
        "description": "A candidate",
    }

    def run(*args, stars=None):
        monkeypatch.setattr(module.sys, "argv", [str(script), *args])
        monkeypatch.setattr(module, "gh", lambda *args: "maintainer" if args[1] == "user" else "\n".join(json.dumps(s) for s in (stars or [star])))
        module.main()
        return capsys.readouterr()

    return module, star, run


@pytest.mark.parametrize("rejected", [False, True])
def test_full_review_can_park_a_previous_verdict(scan, rejected):
    module, _, run = scan
    history = "repo\tdate\treason\nExample/Project\t2026-10-16\tno matching use case\n"
    module.LEDGER.write_text(history)
    if rejected:
        module.REGISTER.write_text("## Rejected Additions\n- example/project -- 2026-10-16: no matching use case\n")

    assert "Example/Project" not in run().out
    review = run("--full").out
    assert "Example/Project" in review
    assert ("rejected" if rejected else "screened out") in review

    module.LEDGER.write_text(history + "example/project\t2026-10-16\tparked\n")
    if rejected:
        module.REGISTER.write_text("## Rejected Additions\n")

    assert "Example/Project" in run().out
    assert module.LEDGER.read_text().startswith(history)


@pytest.mark.parametrize("decision", ["screen", "reject"])
def test_later_decision_on_same_day_excludes_parked_repo(scan, decision):
    module, _, run = scan
    history = "repo\tdate\treason\nexample/project\t2026-10-16\tparked\n"
    module.LEDGER.write_text(history)
    assert "Example/Project" in run().out

    if decision == "screen":
        module.LEDGER.write_text(history + "EXAMPLE/PROJECT\t2026-10-16\tstill no use case\n")
    else:
        module.REGISTER.write_text("## Rejected Additions\n- EXAMPLE/PROJECT -- 2026-10-16: still no use case\n")

    assert "Example/Project" not in run().out
    assert "still no use case" in run("--full").out


def test_parking_does_not_override_exact_registered_rejection(scan):
    module, _, run = scan
    module.LEDGER.write_text("repo\tdate\treason\nexample/project\t2026-10-16\tparked\n")
    module.REGISTER.write_text("## Rejected Additions\n- Example/Project -- 2026-10-16: maintainer rejection\n")

    assert "Example/Project" not in run().out
    assert "maintainer rejection" in run("--full").out


def test_parking_reopens_one_repo_from_rejected_organization(scan):
    module, star, run = scan
    module.REGISTER.write_text("## Rejected Additions\n- EXAMPLE/* -- 2026-10-16: maintainer rejection\n")
    peer = star | {"full_name": "Example/Other"}
    assert "Example/Project" not in run().out

    module.LEDGER.write_text("repo\tdate\treason\nexample/project\t2026-10-16\tparked\n")
    result = run(stars=[star, peer]).out
    assert "Example/Project" in result
    assert "Example/Other" not in result

    module.REGISTER.write_text(module.REGISTER.read_text() + "- example/project -- 2026-10-16: rejected again\n")
    assert "Example/Project" not in run().out
    assert "rejected again" in run("--full").out


def test_parking_keeps_other_exclusions(scan):
    module, star, run = scan
    now = datetime.now(UTC)
    changes = [
        {"full_name": "example/listed"},
        {"owner": {"login": "maintainer"}},
        {"archived": True},
        {"pushed_at": (now - timedelta(days=400)).isoformat()},
        {"created_at": now.isoformat()},
    ]
    for change in changes:
        candidate = star | change
        module.LEDGER.write_text(f"repo\tdate\treason\n{candidate['full_name']}\t2026-10-16\tparked\n")
        assert candidate["full_name"] not in run(stars=[candidate]).out
