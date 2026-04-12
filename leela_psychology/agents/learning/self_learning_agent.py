"""SelfLearningAgent — aggregates feedback signals for model improvement.

In v1.1.0 this agent collects feedback and produces performance analytics.
Fine-tuning / model update logic (marked as TODO) is the Phase 28 milestone.
"""
from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[3]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core_types import AgentMessage, AgentRole
from storage.vector_storage import vector_storage


class SelfLearningAgent:
    """Aggregates feedback and generates improvement recommendations."""

    role = AgentRole.SELF_LEARNING

    def __init__(self) -> None:
        self._buffer: List[Dict[str, Any]] = []
        self._metrics: Dict[str, Any] = {
            "total": 0,
            "positive": 0,
            "negative": 0,
            "sum_rating": 0.0,
        }

    async def execute(self, message: AgentMessage) -> Dict[str, Any]:
        action = message.action
        if action == "process_feedback":
            return await self._process_feedback(message)
        if action == "analyse_performance":
            return self._analyse_performance()
        if action == "generate_training_data":
            return self._generate_training_data()
        return {"status": "unknown_action", "action": action}

    # ── Private ───────────────────────────────────────────────────────────────

    async def _process_feedback(self, message: AgentMessage) -> Dict[str, Any]:
        p = message.payload
        self._buffer.append(
            {"ts": datetime.utcnow().isoformat(), "data": p}
        )
        rating = int(p.get("rating", 0))
        helpful = bool(p.get("helpful", True))

        self._metrics["total"] += 1
        self._metrics["sum_rating"] += rating
        if helpful and rating >= 4:
            self._metrics["positive"] += 1
        elif not helpful or rating <= 2:
            self._metrics["negative"] += 1

        return {"status": "feedback_processed", "buffer_size": len(self._buffer)}

    def _analyse_performance(self) -> Dict[str, Any]:
        total = self._metrics["total"]
        avg_rating = (
            self._metrics["sum_rating"] / total if total else 0.0
        )
        positive_ratio = (
            self._metrics["positive"] / total if total else 0.0
        )
        vs = vector_storage.get_statistics()

        recs = self._recommendations(avg_rating, positive_ratio, vs)
        return {
            "status": "ok",
            "metrics": {
                **self._metrics,
                "avg_rating": round(avg_rating, 2),
                "positive_ratio": round(positive_ratio, 2),
                "vector_insights": vs.get("total_insights", 0),
            },
            "recommendations": recs,
        }

    @staticmethod
    def _recommendations(
        avg_rating: float,
        positive_ratio: float,
        vs: Dict[str, Any],
    ) -> List[str]:
        recs = []
        if avg_rating < 3.5:
            recs.append(
                "Average rating below 3.5 — review LLM prompt templates for depth."
            )
        if positive_ratio < 0.7:
            recs.append(
                "Less than 70 % positive feedback — consider tuning synthesis"
                " narratives for clarity."
            )
        arch_count = len(vs.get("archetypes_distribution", {}))
        if arch_count < 4:
            recs.append(
                f"Only {arch_count} archetypes observed — verify all cell types are"
                " being analysed."
            )
        return recs or ["System performance within acceptable thresholds."]

    def _generate_training_data(self) -> Dict[str, Any]:
        positive_samples = [
            fb for fb in self._buffer
            if fb["data"].get("helpful") and int(fb["data"].get("rating", 0)) >= 4
        ]
        return {
            "status": "ok",
            "total_samples": len(positive_samples),
            "note": "Full fine-tuning pipeline is Phase 28 milestone.",
        }
