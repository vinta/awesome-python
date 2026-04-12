"""Unified data model for psychological insights across all therapeutic schools.

This is the single canonical representation that flows through the system:
  Game event → multi-layer analysis → synthesis → storage → export
"""
from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Optional


@dataclass
class GameEvent:
    cell_id: int
    cell_name: str
    move_type: str  # "snake" | "arrow" | "neutral"
    position_before: Optional[int] = None
    position_after: Optional[int] = None


@dataclass
class PsychologicalLayer:
    school: str          # "jung" | "freud" | "cbt" | "gestalt" | "transactional"
    data: Dict[str, Any]
    prompt: str = ""
    response: str = ""
    confidence: float = 1.0


@dataclass
class UserFeedback:
    rating: Optional[int] = None      # 1–5
    comment: Optional[str] = None
    helpful: Optional[bool] = None
    timestamp: Optional[str] = None


@dataclass
class InsightMetadata:
    ai_model: str = "unknown"
    processing_time_ms: int = 0
    tokens_used: int = 0
    session_id: str = ""
    insight_id: str = field(default_factory=lambda: str(uuid.uuid4()))


@dataclass
class UnifiedInsight:
    session_id: str
    game_event: GameEvent
    psychological_layers: List[PsychologicalLayer] = field(default_factory=list)
    user_feedback: Optional[UserFeedback] = None
    metadata: InsightMetadata = field(default_factory=InsightMetadata)
    timestamp: str = field(
        default_factory=lambda: datetime.utcnow().isoformat() + "Z"
    )

    # ── Serialisation ─────────────────────────────────────────────────────────

    def to_dict(self) -> Dict[str, Any]:
        return {
            "session_id": self.session_id,
            "timestamp": self.timestamp,
            "game_event": {
                "cell_id": self.game_event.cell_id,
                "cell_name": self.game_event.cell_name,
                "move_type": self.game_event.move_type,
                "position_before": self.game_event.position_before,
                "position_after": self.game_event.position_after,
            },
            "psychological_layers": [
                {
                    "school": layer.school,
                    "data": layer.data,
                    "prompt": layer.prompt,
                    "response": layer.response,
                    "confidence": layer.confidence,
                }
                for layer in self.psychological_layers
            ],
            "user_feedback": (
                {
                    "rating": self.user_feedback.rating,
                    "comment": self.user_feedback.comment,
                    "helpful": self.user_feedback.helpful,
                    "timestamp": self.user_feedback.timestamp,
                }
                if self.user_feedback
                else None
            ),
            "metadata": {
                "ai_model": self.metadata.ai_model,
                "processing_time_ms": self.metadata.processing_time_ms,
                "tokens_used": self.metadata.tokens_used,
                "session_id": self.metadata.session_id,
                "insight_id": self.metadata.insight_id,
            },
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "UnifiedInsight":
        ge = data["game_event"]
        layers = [
            PsychologicalLayer(
                school=l["school"],
                data=l["data"],
                prompt=l.get("prompt", ""),
                response=l.get("response", ""),
                confidence=l.get("confidence", 1.0),
            )
            for l in data.get("psychological_layers", [])
        ]
        fb_raw = data.get("user_feedback")
        fb = UserFeedback(**fb_raw) if fb_raw else None
        meta_raw = data.get("metadata", {})
        meta = InsightMetadata(
            ai_model=meta_raw.get("ai_model", "unknown"),
            processing_time_ms=meta_raw.get("processing_time_ms", 0),
            tokens_used=meta_raw.get("tokens_used", 0),
            session_id=meta_raw.get("session_id", ""),
            insight_id=meta_raw.get("insight_id", str(uuid.uuid4())),
        )
        return cls(
            session_id=data["session_id"],
            timestamp=data.get("timestamp", datetime.utcnow().isoformat() + "Z"),
            game_event=GameEvent(
                cell_id=ge["cell_id"],
                cell_name=ge["cell_name"],
                move_type=ge["move_type"],
                position_before=ge.get("position_before"),
                position_after=ge.get("position_after"),
            ),
            psychological_layers=layers,
            user_feedback=fb,
            metadata=meta,
        )
