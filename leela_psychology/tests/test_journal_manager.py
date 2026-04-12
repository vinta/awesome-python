"""Tests for JournalManager — session journaling and narrative export."""
from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from journals.journal_manager import JournalEntry, JournalManager


# ── Helpers ───────────────────────────────────────────────────────────────────

def _fake_result(
    cell_id: int = 7,
    cell_name: str = "The Forest",
    move_type: str = "snake",
    schools: list | None = None,
    synthesis: str = "Shadow meets Regression — hold the tension.",
) -> dict:
    """Minimal turn_result dict that JournalManager.record() accepts."""
    schools = schools or ["jung", "freud"]
    return {
        "unified_insight": {
            "game_event": {
                "cell_id": cell_id,
                "cell_name": cell_name,
                "move_type": move_type,
            },
            "psychological_layers": [
                {"data": {"archetype": "Shadow"}, "school": "jung"},
                {"data": {"mechanism": "Regression"}, "school": "freud"},
            ],
        },
        "synthesis": synthesis,
        "active_layers": schools,
        "session_hash": None,
        "status": "ok",
    }


# ── Tests ─────────────────────────────────────────────────────────────────────

class TestJournalManager:
    def test_record_creates_jsonl_file(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("sess_001", _fake_result())
        files = list(tmp_path.glob("*.jsonl"))
        assert len(files) == 1

    def test_record_returns_entry(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        entry = jm.record("sess_x", _fake_result(cell_id=5))
        assert isinstance(entry, JournalEntry)
        assert entry.cell_id == 5
        assert entry.turn == 1

    def test_turn_counter_increments(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        e1 = jm.record("sess_t", _fake_result())
        e2 = jm.record("sess_t", _fake_result())
        e3 = jm.record("sess_t", _fake_result())
        assert e1.turn == 1
        assert e2.turn == 2
        assert e3.turn == 3

    def test_load_session_returns_all_entries(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        for i in range(4):
            jm.record("sess_load", _fake_result(cell_id=i))
        entries = jm.load_session("sess_load")
        assert len(entries) == 4
        assert [e.cell_id for e in entries] == [0, 1, 2, 3]

    def test_load_nonexistent_session_returns_empty(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        assert jm.load_session("does_not_exist") == []

    def test_synthesis_snippet_truncated_to_200(self, tmp_path: Path) -> None:
        long_synthesis = "X" * 500
        jm = JournalManager(output_dir=str(tmp_path))
        entry = jm.record("sess_snip", _fake_result(synthesis=long_synthesis))
        assert len(entry.synthesis_snippet) == 200

    def test_privacy_no_raw_text_in_journal(self, tmp_path: Path) -> None:
        """Journal must not contain raw user text — only synthesis snippet."""
        raw_reflection = "I feel deeply anxious about my childhood wound"
        result = _fake_result(synthesis="Shadow pattern detected.")
        # Inject raw text into a field that should NOT be persisted
        result["unified_insight"]["raw_user_text"] = raw_reflection

        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("sess_priv", result)

        journal_file = next(tmp_path.glob("*.jsonl"))
        content = journal_file.read_text(encoding="utf-8")
        assert raw_reflection not in content

    def test_multiple_sessions_are_isolated(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("sess_A", _fake_result(cell_id=1))
        jm.record("sess_B", _fake_result(cell_id=2))
        jm.record("sess_A", _fake_result(cell_id=3))

        a_entries = jm.load_session("sess_A")
        b_entries = jm.load_session("sess_B")
        assert len(a_entries) == 2
        assert len(b_entries) == 1
        assert all(e.cell_id != 2 for e in a_entries)

    def test_export_narrative_contains_session_id(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("my_session", _fake_result())
        narrative = jm.export_narrative("my_session")
        assert "my_session" in narrative

    def test_export_narrative_contains_synthesis_snippet(self, tmp_path: Path) -> None:
        synthesis = "Hero meets the Trickster at the threshold."
        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("sess_narr", _fake_result(synthesis=synthesis))
        narrative = jm.export_narrative("sess_narr")
        assert synthesis in narrative

    def test_export_narrative_empty_session(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        narrative = jm.export_narrative("empty_sess")
        assert "No entries" in narrative

    def test_delete_session_removes_file(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        jm.record("sess_del", _fake_result())
        assert jm.delete_session("sess_del") is True
        assert jm.load_session("sess_del") == []

    def test_delete_nonexistent_session_returns_false(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        assert jm.delete_session("ghost") is False

    def test_path_traversal_sanitised(self, tmp_path: Path) -> None:
        jm = JournalManager(output_dir=str(tmp_path))
        # session_id with path traversal chars must never escape output_dir
        jm.record("../../etc/passwd", _fake_result())
        files = list(tmp_path.glob("*.jsonl"))
        # Exactly one file created, residing inside tmp_path
        assert len(files) == 1
        # The file must be a direct child of output_dir — no subdirectory escape
        assert files[0].parent.resolve() == tmp_path.resolve()
        # No literal ".." in the filename
        assert ".." not in files[0].name
        # No "/" or "\" path separators remaining in the filename
        assert "/" not in files[0].name
        assert "\\" not in files[0].name
