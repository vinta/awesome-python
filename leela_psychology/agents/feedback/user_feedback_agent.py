"""UserFeedbackAgent — collects, validates, and stores user ratings.

The agent stores feedback as anonymised vectors so the self-learning loop
can improve interpretation quality without retaining personal comments.
"""
from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

ROOT = Path(__file__).resolve().parents[3]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core_types import AgentMessage, AgentRole
from storage.vector_storage import vector_storage


class UserFeedbackAgent:
    """Processes user feedback and updates the anonymised vector store."""

    role = AgentRole.USER_FEEDBACK

    async def execute(self, message: AgentMessage) -> Dict[str, Any]:
        action = message.action
        if action == "submit_feedback":
            return await self._handle_submission(message)
        if action == "get_stats":
            return self._get_stats()
        if action == "search_similar":
            return self._search_similar(message)
        return {"status": "unknown_action", "action": action}

    # ── Private ───────────────────────────────────────────────────────────────

    async def _handle_submission(self, message: AgentMessage) -> Dict[str, Any]:
        p = message.payload
        insight_id = p.get("insight_id", "")
        rating = int(p.get("rating", 0))
        comment = str(p.get("comment", ""))
        helpful = bool(p.get("helpful", True))

        if not 1 <= rating <= 5:
            return {"status": "error", "detail": "rating must be 1–5"}

        feedback_text = f"rating:{rating} helpful:{helpful} comment:{comment}"
        vector_storage.add_insight(
            None,  # No embedding — only metadata
            {
                "insight_id": insight_id,
                "rating": rating,
                "helpful": helpful,
                "timestamp": datetime.utcnow().isoformat(),
                "feedback_type": "user_rating",
                "session_id": p.get("session_id", "anon"),
                "insight_length": len(feedback_text),
            },
        )
        return {
            "status": "feedback_received",
            "message": "Thank you for your feedback.",
            "insight_id": insight_id,
        }

    def _get_stats(self) -> Dict[str, Any]:
        stats = vector_storage.get_statistics()
        ratings = [
            m.get("rating")
            for m in vector_storage.metadata_list
            if m.get("feedback_type") == "user_rating" and m.get("rating")
        ]
        helpful = [
            m.get("helpful")
            for m in vector_storage.metadata_list
            if m.get("feedback_type") == "user_rating"
        ]
        avg = sum(ratings) / len(ratings) if ratings else 0.0
        helpful_pct = (sum(1 for h in helpful if h) / len(helpful) * 100) if helpful else 0.0
        return {
            **stats,
            "feedback_count": len(ratings),
            "avg_rating": round(avg, 2),
            "helpful_percent": round(helpful_pct, 1),
        }

    def _search_similar(self, message: AgentMessage) -> Dict[str, Any]:
        query_emb = message.payload.get("embedding", [])
        top_k = int(message.payload.get("top_k", 5))
        results = vector_storage.search_similar(query_emb, top_k)
        return {
            "status": "ok",
            "results": [
                {"metadata": meta, "similarity": sim}
                for meta, sim in results
            ],
        }
