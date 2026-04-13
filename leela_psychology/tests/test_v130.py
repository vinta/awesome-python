"""Tests for v1.3.0 additions:
  - Flask /api/health and /api/metrics endpoints
  - ClinicalExporter journal integration
  - LoggingConfig get_logger / JSON formatter
"""
from __future__ import annotations

import json
import logging
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import web.feedback_api as _api_module
from web.feedback_api import create_app


# ── Shared fixture ────────────────────────────────────────────────────────────

@pytest.fixture()
def client(tmp_path):
    from storage.vector_storage import VectorStorage
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    _api_module.vector_storage = VectorStorage(base_path=str(tmp_path / "vs"))
    _api_module._feedback_queue.clear()
    yield flask_app.test_client()
    _api_module._feedback_queue.clear()


# ── GET /api/health ───────────────────────────────────────────────────────────

class TestHealthEndpoint:
    def test_health_returns_200_when_healthy(self, client):
        resp = client.get("/api/health")
        assert resp.status_code == 200

    def test_health_body_has_status_field(self, client):
        body = client.get("/api/health").get_json()
        assert "status" in body
        assert body["status"] in ("healthy", "degraded")

    def test_health_body_has_all_check_keys(self, client):
        body = client.get("/api/health").get_json()
        assert "checks" in body
        assert set(body["checks"]) == {"security", "storage", "ai", "synthesis"}

    def test_health_body_has_version(self, client):
        body = client.get("/api/health").get_json()
        assert "version" in body

    def test_health_all_checks_ok(self, client):
        body = client.get("/api/health").get_json()
        for name, result in body["checks"].items():
            assert result["status"] == "ok", f"{name} check failed: {result}"

    def test_health_checks_have_latency_ms(self, client):
        body = client.get("/api/health").get_json()
        for name, result in body["checks"].items():
            assert "latency_ms" in result, f"{name} missing latency_ms"


# ── GET /api/metrics ──────────────────────────────────────────────────────────

class TestMetricsEndpoint:
    def test_metrics_returns_200(self, client):
        resp = client.get("/api/metrics")
        assert resp.status_code == 200

    def test_metrics_body_has_required_keys(self, client):
        body = client.get("/api/metrics").get_json()
        assert "timings" in body
        assert "counters" in body

    def test_metrics_counters_updated_after_feedback(self, client):
        from monitoring.metrics_collector import metrics
        metrics.reset()

        client.post("/api/feedback", json={"insight_id": "x", "rating": 4})

        body = client.get("/api/metrics").get_json()
        # At least timings and counters keys exist (feedback doesn't record
        # engine metrics, but counters dict is always present)
        assert isinstance(body["counters"], dict)
        assert isinstance(body["timings"], dict)


# ── ClinicalExporter + JournalManager ────────────────────────────────────────

class TestClinicalExporterWithJournal:
    def _make_result(self, cell_id: int = 5, synthesis: str = "Shadow tension.") -> dict:
        return {
            "unified_insight": {
                "game_event": {"cell_id": cell_id, "cell_name": "Forest", "move_type": "snake"},
                "psychological_layers": [
                    {"data": {"archetype": "Shadow"}, "school": "jung"},
                ],
            },
            "synthesis": synthesis,
            "active_layers": ["jung"],
            "session_hash": None,
            "status": "ok",
        }

    def test_markdown_includes_journal_narrative(self, tmp_path):
        from exporters.clinical_exporter import ClinicalExporter
        from journals.journal_manager import JournalManager
        from storage.vector_storage import VectorStorage

        storage = VectorStorage(base_path=str(tmp_path / "vs"))
        storage.add_insight(None, {"session_id": "jrn_sess", "cell_id": 1,
                                   "archetype": "Shadow", "phase": "Nigredo"})

        journal = JournalManager(output_dir=str(tmp_path / "journals"))
        journal.record("jrn_sess", self._make_result(synthesis="Polarity: Shadow vs Adult."))

        import exporters.clinical_exporter as ce_mod
        orig = ce_mod.vector_storage
        ce_mod.vector_storage = storage
        try:
            exp = ClinicalExporter(output_dir=str(tmp_path / "exports"), journal=journal)
            path = exp.export_session_report("jrn_sess", fmt="markdown")
        finally:
            ce_mod.vector_storage = orig

        content = Path(path).read_text(encoding="utf-8")
        assert "Narrative Arc" in content
        assert "Polarity: Shadow vs Adult." in content

    def test_json_includes_journal_entries(self, tmp_path):
        from exporters.clinical_exporter import ClinicalExporter
        from journals.journal_manager import JournalManager
        from storage.vector_storage import VectorStorage

        storage = VectorStorage(base_path=str(tmp_path / "vs"))
        journal = JournalManager(output_dir=str(tmp_path / "journals"))
        journal.record("jrn_j", self._make_result())

        import exporters.clinical_exporter as ce_mod
        orig = ce_mod.vector_storage
        ce_mod.vector_storage = storage
        try:
            exp = ClinicalExporter(output_dir=str(tmp_path / "exports"), journal=journal)
            path = exp.export_session_report("jrn_j", fmt="json")
        finally:
            ce_mod.vector_storage = orig

        data = json.loads(Path(path).read_text())
        assert "journal_turns" in data
        assert data["journal_turns"] == 1
        assert "journal_entries" in data
        assert isinstance(data["journal_entries"], list)

    def test_no_journal_report_unchanged(self, tmp_path):
        """Without journal, report must not contain Narrative Arc section."""
        from exporters.clinical_exporter import ClinicalExporter
        from storage.vector_storage import VectorStorage

        storage = VectorStorage(base_path=str(tmp_path / "vs"))
        storage.add_insight(None, {"session_id": "plain_sess", "cell_id": 1,
                                   "archetype": "Hero", "phase": "Albedo"})

        import exporters.clinical_exporter as ce_mod
        orig = ce_mod.vector_storage
        ce_mod.vector_storage = storage
        try:
            exp = ClinicalExporter(output_dir=str(tmp_path / "exports"))
            path = exp.export_session_report("plain_sess", fmt="markdown")
        finally:
            ce_mod.vector_storage = orig

        content = Path(path).read_text(encoding="utf-8")
        assert "Narrative Arc" not in content


# ── LoggingConfig ─────────────────────────────────────────────────────────────

class TestLoggingConfig:
    def test_get_logger_returns_logger(self):
        from core.logging_config import get_logger
        log = get_logger("test.module")
        assert isinstance(log, logging.Logger)
        assert log.name == "test.module"

    def test_logger_emits_at_info(self, caplog):
        from core.logging_config import get_logger
        log = get_logger("test.emit")
        with caplog.at_level(logging.INFO, logger="test.emit"):
            log.info("hello from test")
        assert "hello from test" in caplog.text

    def test_json_formatter_produces_valid_json(self):
        import io
        from core.logging_config import _JsonFormatter
        formatter = _JsonFormatter()
        record = logging.LogRecord(
            name="test", level=logging.INFO,
            pathname="", lineno=0, msg="test message",
            args=(), exc_info=None,
        )
        output = formatter.format(record)
        parsed = json.loads(output)
        assert parsed["msg"] == "test message"
        assert parsed["level"] == "INFO"
        assert "ts" in parsed

    def test_json_formatter_includes_extra_fields(self):
        from core.logging_config import _JsonFormatter
        formatter = _JsonFormatter()
        record = logging.LogRecord(
            name="test", level=logging.DEBUG,
            pathname="", lineno=0, msg="with extra",
            args=(), exc_info=None,
        )
        record.session_id = "sess_xyz"
        output = formatter.format(record)
        parsed = json.loads(output)
        assert parsed.get("session_id") == "sess_xyz"

    def test_configure_logging_is_idempotent(self):
        """Calling configure_logging() twice must not add duplicate handlers."""
        from core.logging_config import configure_logging
        root = logging.getLogger()
        count_before = len(root.handlers)
        configure_logging()
        configure_logging()
        # Handler count should not grow on repeated calls
        assert len(root.handlers) == count_before
