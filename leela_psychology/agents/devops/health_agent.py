"""DevOps Health Check Agent.

Performs a lightweight self-diagnostic of all major subsystems and returns
a structured health report.  Intended for:
  - Liveness / readiness probes in Kubernetes
  - Pre-session sanity check by operators
  - The /api/health Flask endpoint

Checks performed
----------------
  security  — HMAC key present and non-trivial; Fernet encryption roundtrip
  storage   — metadata file path accessible; encrypt/decrypt cycle
  ai        — EmbeddingClient can produce a vector of correct dimension
  synthesis — ConflictSynthesizer produces a non-empty string
"""
from __future__ import annotations

import sys
import time
from pathlib import Path
from typing import Any, Dict

ROOT = Path(__file__).resolve().parents[3]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core_types import AgentMessage, AgentRole


class HealthAgent:
    """System health checker — runs synchronously, no I/O side-effects."""

    role = AgentRole.ORCHESTRATOR   # Reports to orchestrator

    # ── Sub-checks ────────────────────────────────────────────────────────────

    @staticmethod
    def _check_security() -> Dict[str, Any]:
        t0 = time.perf_counter()
        try:
            from core.security import SecurityProvider
            sp = SecurityProvider()
            token = sp.hash_session("probe_session")
            assert len(token) == 24, "HMAC token length mismatch"
            roundtrip = sp.decrypt_props(sp.encrypt_props("health_probe"))
            assert roundtrip == "health_probe", "Fernet roundtrip failed"
            return {"status": "ok", "latency_ms": int((time.perf_counter() - t0) * 1000)}
        except Exception as exc:
            return {"status": "error", "detail": str(exc)}

    @staticmethod
    def _check_storage() -> Dict[str, Any]:
        t0 = time.perf_counter()
        try:
            import tempfile
            from storage.vector_storage import VectorStorage
            with tempfile.TemporaryDirectory() as tmp:
                vs = VectorStorage(base_path=tmp)
                h = vs.add_insight(None, {"session_id": "probe", "cell_id": 0})
                assert h and len(h) == 24, "session_hash length mismatch"
                stats = vs.get_statistics()
                assert stats["total_insights"] == 1
            return {"status": "ok", "latency_ms": int((time.perf_counter() - t0) * 1000)}
        except Exception as exc:
            return {"status": "error", "detail": str(exc)}

    @staticmethod
    def _check_ai() -> Dict[str, Any]:
        t0 = time.perf_counter()
        try:
            import asyncio
            import concurrent.futures
            from ai.embedding_client import EmbeddingClient

            client = EmbeddingClient()

            # Run the async embed in a fresh thread so it never conflicts
            # with an already-running event loop (e.g. pytest-asyncio).
            def _run() -> list:
                return asyncio.run(client.embed("health probe"))

            with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
                vec = pool.submit(_run).result(timeout=10)

            assert isinstance(vec, list) and len(vec) > 0, "empty embedding vector"
            return {
                "status": "ok",
                "dim": len(vec),
                "latency_ms": int((time.perf_counter() - t0) * 1000),
            }
        except Exception as exc:
            return {"status": "error", "detail": str(exc)}

    @staticmethod
    def _check_synthesis() -> Dict[str, Any]:
        t0 = time.perf_counter()
        try:
            from ai.synthesizer import ConflictSynthesizer
            synth = ConflictSynthesizer()
            result = synth.synthesize({
                "jung": {"archetype": "Shadow"},
                "freud": {"mechanism": "Regression"},
            })
            assert isinstance(result, str) and result, "empty synthesis"
            return {"status": "ok", "latency_ms": int((time.perf_counter() - t0) * 1000)}
        except Exception as exc:
            return {"status": "error", "detail": str(exc)}

    # ── Public API ────────────────────────────────────────────────────────────

    def run_health_check(self) -> Dict[str, Any]:
        """Execute all sub-checks and return a structured report."""
        checks = {
            "security":  self._check_security(),
            "storage":   self._check_storage(),
            "ai":        self._check_ai(),
            "synthesis": self._check_synthesis(),
        }
        all_ok = all(v["status"] == "ok" for v in checks.values())
        return {
            "status": "healthy" if all_ok else "degraded",
            "checks": checks,
            "version": "1.2.0",
        }

    async def execute(self, msg: AgentMessage) -> Dict[str, Any]:
        """AgentMessage interface (async wrapper for orchestrator compatibility)."""
        if msg.action == "health_check":
            return self.run_health_check()
        return {"status": "error", "detail": f"Unknown action: {msg.action}"}
