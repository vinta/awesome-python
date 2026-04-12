"""Tests for EmbeddingSynthesizer (v2.0 dynamic polarity detection)
and MetricsCollector.
"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


# ── EmbeddingSynthesizer ──────────────────────────────────────────────────────

class TestEmbeddingSynthesizer:
    @pytest.mark.asyncio
    async def test_single_layer_returns_insufficient_message(self):
        from ai.embedding_synthesizer import EmbeddingSynthesizer
        synth = EmbeddingSynthesizer()
        result = await synth.synthesize({"jung": {"archetype": "Shadow"}})
        assert "Insufficient" in result

    @pytest.mark.asyncio
    async def test_two_layers_returns_string(self):
        from ai.embedding_synthesizer import EmbeddingSynthesizer
        synth = EmbeddingSynthesizer()
        result = await synth.synthesize({
            "jung":  {"archetype": "Shadow"},
            "freud": {"mechanism": "Regression"},
        })
        assert isinstance(result, str) and len(result) > 10

    @pytest.mark.asyncio
    async def test_five_layers_no_exception(self):
        from ai.embedding_synthesizer import EmbeddingSynthesizer
        synth = EmbeddingSynthesizer()
        result = await synth.synthesize({
            "jung":          {"archetype": "Hero"},
            "freud":         {"mechanism": "Sublimation"},
            "cbt":           {"distortion": "Catastrophizing"},
            "gestalt":       {"principle": "Here and Now"},
            "transactional": {"ego_state": "Adult"},
        })
        assert isinstance(result, str) and len(result) > 0

    @pytest.mark.asyncio
    async def test_empty_layers_returns_alignment_message(self):
        from ai.embedding_synthesizer import EmbeddingSynthesizer
        synth = EmbeddingSynthesizer()
        result = await synth.synthesize({})
        assert "Insufficient" in result

    @pytest.mark.asyncio
    async def test_concept_cache_populated(self):
        from ai.embedding_synthesizer import EmbeddingSynthesizer
        synth = EmbeddingSynthesizer()
        await synth.synthesize({
            "jung":  {"archetype": "Self"},
            "freud": {"mechanism": "Repression"},
        })
        # Both concepts should be cached after the call
        assert len(synth._concept_cache) == 2

    @pytest.mark.asyncio
    async def test_identical_concepts_considered_aligned(self):
        """Same concept repeated across two schools → high similarity → no polarity."""
        from ai.embedding_synthesizer import EmbeddingSynthesizer, TENSION_THRESHOLD
        synth = EmbeddingSynthesizer()
        # Force same concept string for both schools
        result = await synth.synthesize({
            "jung":  {"archetype": "Shadow"},
            "freud": {"mechanism": "Shadow"},   # identical string
        })
        # cosine(v, v) == 1.0 → above threshold → no polarity detected
        assert "alignment" in result.lower() or "coherent" in result.lower()


# ── MetricsCollector ──────────────────────────────────────────────────────────

class TestMetricsCollector:
    def test_counter_increments(self):
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector()
        m.increment("hits")
        m.increment("hits")
        m.increment("hits", 3)
        snap = m.snapshot()
        assert snap["counters"]["hits"] == 5

    def test_timer_context_manager_records(self):
        import time
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector()
        with m.timer("op"):
            time.sleep(0.01)
        snap = m.snapshot()
        assert "op" in snap["timings"]
        assert snap["timings"]["op"]["avg_ms"] >= 10

    def test_record_ms_manual(self):
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector()
        for v in (10.0, 20.0, 30.0):
            m.record_ms("latency", v)
        snap = m.snapshot()
        stats = snap["timings"]["latency"]
        assert stats["count"] == 3
        assert stats["avg_ms"] == pytest.approx(20.0)
        assert stats["min_ms"] == pytest.approx(10.0)
        assert stats["max_ms"] == pytest.approx(30.0)

    def test_rolling_window_evicts_oldest(self):
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector(window=3)
        for i in range(5):
            m.record_ms("w", float(i))
        snap = m.snapshot()
        # window=3, so only last 3 values (2, 3, 4) remain
        assert snap["timings"]["w"]["count"] == 3
        assert snap["timings"]["w"]["min_ms"] == pytest.approx(2.0)

    def test_reset_clears_all(self):
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector()
        m.increment("x")
        m.record_ms("y", 99.0)
        m.reset()
        snap = m.snapshot()
        assert snap["counters"] == {}
        assert snap["timings"] == {}

    def test_snapshot_p95(self):
        from monitoring.metrics_collector import MetricsCollector
        m = MetricsCollector(window=100)
        for i in range(1, 101):
            m.record_ms("resp", float(i))
        snap = m.snapshot()
        # p95 of [1..100] = value at index 95 of sorted list = 96.0
        assert snap["timings"]["resp"]["p95_ms"] == pytest.approx(96.0)


# ── HealthAgent ───────────────────────────────────────────────────────────────

class TestHealthAgent:
    def test_health_check_returns_healthy(self):
        from agents.devops.health_agent import HealthAgent
        report = HealthAgent().run_health_check()
        assert report["status"] == "healthy"
        assert set(report["checks"]) == {"security", "storage", "ai", "synthesis"}

    def test_all_sub_checks_ok(self):
        from agents.devops.health_agent import HealthAgent
        report = HealthAgent().run_health_check()
        for name, result in report["checks"].items():
            assert result["status"] == "ok", f"{name} check failed: {result}"

    def test_health_check_includes_latency(self):
        from agents.devops.health_agent import HealthAgent
        report = HealthAgent().run_health_check()
        for name, result in report["checks"].items():
            assert "latency_ms" in result, f"{name} missing latency_ms"

    @pytest.mark.asyncio
    async def test_execute_action_health_check(self):
        from agents.devops.health_agent import HealthAgent
        from core_types import AgentMessage, AgentRole
        agent = HealthAgent()
        msg = AgentMessage(
            sender=AgentRole.ORCHESTRATOR,
            receiver=AgentRole.ORCHESTRATOR,
            action="health_check",
            payload={},
        )
        result = await agent.execute(msg)
        assert result["status"] == "healthy"

    @pytest.mark.asyncio
    async def test_execute_unknown_action_returns_error(self):
        from agents.devops.health_agent import HealthAgent
        from core_types import AgentMessage, AgentRole
        agent = HealthAgent()
        msg = AgentMessage(
            sender=AgentRole.ORCHESTRATOR,
            receiver=AgentRole.ORCHESTRATOR,
            action="unknown_action",
            payload={},
        )
        result = await agent.execute(msg)
        assert result["status"] == "error"
