"""End-to-end integration tests for the Leela Psychology system.

Covers the full pipeline:
  analyze_turn → synthesis → consent-gated vector storage
  → feedback submission → self-learning performance analysis
  → clinical export
"""
from __future__ import annotations

import asyncio
from pathlib import Path

import pytest

from agents.feedback.user_feedback_agent import UserFeedbackAgent
from agents.learning.self_learning_agent import SelfLearningAgent
from core_types import AgentMessage, AgentRole
from exporters.clinical_exporter import ClinicalExporter
from game.leela_psychological import LeelaPsychologicalEngine
from storage.vector_storage import VectorStorage


# ── Helpers ───────────────────────────────────────────────────────────────────

def _fresh_storage(tmp_path: Path) -> VectorStorage:
    return VectorStorage(base_path=str(tmp_path / "vs"))


# ── Engine tests ──────────────────────────────────────────────────────────────

class TestLeelaPsychologicalEngine:
    @pytest.mark.asyncio
    async def test_single_layer_analysis(self, tmp_path: Path) -> None:
        eng = LeelaPsychologicalEngine()
        eng.storage = _fresh_storage(tmp_path)

        result = await eng.analyze_turn(
            session_id="test_session",
            cell_id=7,
            cell_name="The Dark Forest",
            cell_type="snake",
            state_id="st_nigredo",
            active_layers=["jung"],
            user_consent=False,
        )

        assert result["status"] == "ok"
        assert "unified_insight" in result
        assert "synthesis" in result
        assert result["session_hash"] is None  # no consent

    @pytest.mark.asyncio
    async def test_all_five_layers(self, tmp_path: Path) -> None:
        eng = LeelaPsychologicalEngine()
        eng.storage = _fresh_storage(tmp_path)

        result = await eng.analyze_turn(
            session_id="full_session",
            cell_id=22,
            cell_name="Crossroads",
            cell_type="neutral",
            state_id="st_albedo",
            active_layers=["jung", "freud", "cbt", "gestalt", "transactional"],
        )

        layers = result["unified_insight"]["psychological_layers"]
        schools = {l["school"] for l in layers}
        assert schools == {"jung", "freud", "cbt", "gestalt", "transactional"}

    @pytest.mark.asyncio
    async def test_multi_layer_uses_embedding_synthesizer(self, tmp_path: Path) -> None:
        """2+ layers must route through EmbeddingSynthesizer (v2.0 output markers)."""
        eng = LeelaPsychologicalEngine()
        eng.storage = _fresh_storage(tmp_path)

        result = await eng.analyze_turn(
            session_id="synth_test",
            cell_id=15,
            cell_name="Bridge",
            cell_type="arrow",
            state_id="st_albedo",
            active_layers=["jung", "freud"],
        )

        synthesis = result["synthesis"]
        # EmbeddingSynthesizer always produces one of these markers
        v2_markers = ("polarity", "alignment", "tension", "Insufficient", "coherent")
        assert any(m in synthesis for m in v2_markers), (
            f"Expected v2.0 synthesis output, got: {synthesis[:120]}"
        )

    @pytest.mark.asyncio
    async def test_journal_records_turns(self, tmp_path: Path) -> None:
        """When a JournalManager is attached, each turn is recorded."""
        from journals.journal_manager import JournalManager

        journal = JournalManager(output_dir=str(tmp_path / "journal"))
        eng = LeelaPsychologicalEngine(journal=journal)
        eng.storage = _fresh_storage(tmp_path)

        for _ in range(3):
            await eng.analyze_turn(
                session_id="journal_sess",
                cell_id=5,
                active_layers=["jung"],
            )

        entries = journal.load_session("journal_sess")
        assert len(entries) == 3
        assert [e.turn for e in entries] == [1, 2, 3]

    @pytest.mark.asyncio
    async def test_consent_gates_vector_storage(self, tmp_path: Path) -> None:
        storage = _fresh_storage(tmp_path)
        eng = LeelaPsychologicalEngine()
        eng.storage = storage

        # Without consent: nothing stored
        await eng.analyze_turn(
            session_id="no_consent",
            cell_id=5,
            cell_type="arrow",
            active_layers=["jung"],
            user_consent=False,
        )
        assert len(storage.metadata_list) == 0

        # With consent: record stored
        result = await eng.analyze_turn(
            session_id="with_consent",
            cell_id=5,
            cell_type="arrow",
            active_layers=["jung"],
            user_consent=True,
        )
        assert result["session_hash"] is not None
        assert len(storage.metadata_list) == 1

    @pytest.mark.asyncio
    async def test_session_hash_does_not_leak_session_id(self, tmp_path: Path) -> None:
        storage = _fresh_storage(tmp_path)
        eng = LeelaPsychologicalEngine()
        eng.storage = storage

        await eng.analyze_turn(
            session_id="private_user_id_42",
            cell_id=10,
            active_layers=["jung"],
            user_consent=True,
        )
        stored_meta = storage.metadata_list[-1]
        meta_str = str(stored_meta)
        assert "private_user_id_42" not in meta_str


# ── Feedback agent tests ──────────────────────────────────────────────────────

class TestUserFeedbackAgent:
    @pytest.mark.asyncio
    async def test_valid_feedback_submission(self, tmp_path: Path) -> None:
        agent = UserFeedbackAgent()
        msg = AgentMessage(
            sender=AgentRole.USER,
            receiver=AgentRole.USER_FEEDBACK,
            action="submit_feedback",
            payload={
                "insight_id": "ins_001",
                "rating": 5,
                "comment": "Very insightful!",
                "helpful": True,
                "session_id": "sess_test",
            },
        )
        result = await agent.execute(msg)
        assert result["status"] == "feedback_received"
        assert result["insight_id"] == "ins_001"

    @pytest.mark.asyncio
    async def test_invalid_rating_rejected(self) -> None:
        agent = UserFeedbackAgent()
        msg = AgentMessage(
            sender=AgentRole.USER,
            receiver=AgentRole.USER_FEEDBACK,
            action="submit_feedback",
            payload={"insight_id": "x", "rating": 9},
        )
        result = await agent.execute(msg)
        assert result["status"] == "error"


# ── SelfLearningAgent tests ───────────────────────────────────────────────────

class TestSelfLearningAgent:
    @pytest.mark.asyncio
    async def test_performance_analysis_shape(self) -> None:
        agent = SelfLearningAgent()
        # Feed some feedback first
        fb_msg = AgentMessage(
            sender=AgentRole.USER_FEEDBACK,
            receiver=AgentRole.SELF_LEARNING,
            action="process_feedback",
            payload={"rating": 4, "helpful": True, "insight_id": "i1"},
        )
        await agent.execute(fb_msg)

        perf_msg = AgentMessage(
            sender=AgentRole.SYSTEM,
            receiver=AgentRole.SELF_LEARNING,
            action="analyse_performance",
            payload={},
        )
        result = await agent.execute(perf_msg)
        assert result["status"] == "ok"
        assert "metrics" in result
        assert "recommendations" in result
        assert isinstance(result["recommendations"], list)


# ── Clinical exporter tests ───────────────────────────────────────────────────

class TestClinicalExporter:
    def test_markdown_export_created(self, tmp_path: Path) -> None:
        storage = _fresh_storage(tmp_path)
        for i in range(3):
            storage.add_insight(
                None,
                {
                    "session_id": "export_test",
                    "cell_id": i + 1,
                    "archetype": "Shadow",
                    "phase": "Nigredo",
                    "move_type": "snake",
                    "insight_length": 80,
                },
            )
        exp = ClinicalExporter(output_dir=str(tmp_path / "exports"))
        # Override the module-level singleton's storage for this test
        import exporters.clinical_exporter as ce_module
        orig = ce_module.vector_storage
        ce_module.vector_storage = storage
        try:
            path = exp.export_session_report("export_test", fmt="markdown")
        finally:
            ce_module.vector_storage = orig

        assert Path(path).exists()
        content = Path(path).read_text(encoding="utf-8")
        assert "export_test" in content
        assert "Shadow" in content

    def test_json_export_valid_structure(self, tmp_path: Path) -> None:
        import json

        storage = _fresh_storage(tmp_path)
        storage.add_insight(
            None,
            {"session_id": "json_sess", "cell_id": 5, "archetype": "Anima"},
        )
        exp = ClinicalExporter(output_dir=str(tmp_path / "exports"))
        import exporters.clinical_exporter as ce_module
        orig = ce_module.vector_storage
        ce_module.vector_storage = storage
        try:
            path = exp.export_session_report("json_sess", fmt="json")
        finally:
            ce_module.vector_storage = orig

        data = json.loads(Path(path).read_text())
        assert "session_id" in data
        assert "statistics" in data
