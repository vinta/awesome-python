"""Flask Blueprint — web interface for submitting and viewing feedback.

Register in your app:
    from web.feedback_api import feedback_bp
    app.register_blueprint(feedback_bp, url_prefix="/api")
"""
from __future__ import annotations

import sys
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

try:
    from flask import Blueprint, jsonify, request  # type: ignore
except ImportError:
    Blueprint = None  # type: ignore

from storage.vector_storage import vector_storage

_feedback_queue: List[Dict[str, Any]] = []

if Blueprint is not None:
    feedback_bp = Blueprint("feedback", __name__)

    @feedback_bp.route("/feedback", methods=["POST"])
    def submit_feedback():
        data = request.get_json(silent=True) or {}
        for field in ("insight_id", "rating"):
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        rating = int(data["rating"])
        if not 1 <= rating <= 5:
            return jsonify({"error": "rating must be 1–5"}), 400

        entry: Dict[str, Any] = {
            "feedback_id": str(uuid.uuid4()),
            "insight_id": data["insight_id"],
            "rating": rating,
            "comment": data.get("comment", ""),
            "helpful": bool(data.get("helpful", True)),
            "timestamp": datetime.utcnow().isoformat() + "Z",
        }
        _feedback_queue.append(entry)

        # Persist anonymised feedback to vector store
        vector_storage.add_insight(
            None,
            {
                "session_id": data.get("session_id", "web_anon"),
                "insight_id": entry["insight_id"],
                "rating": rating,
                "helpful": entry["helpful"],
                "timestamp": entry["timestamp"],
                "feedback_type": "user_rating",
                "insight_length": len(entry["comment"]),
            },
        )
        return jsonify({"status": "ok", "feedback_id": entry["feedback_id"]}), 201

    @feedback_bp.route("/feedback/stats", methods=["GET"])
    def feedback_stats():
        ratings = [e["rating"] for e in _feedback_queue]
        avg = sum(ratings) / len(ratings) if ratings else 0.0
        helpful_pct = (
            sum(1 for e in _feedback_queue if e["helpful"]) / len(_feedback_queue) * 100
            if _feedback_queue else 0.0
        )
        return jsonify(
            {
                "total_feedback": len(_feedback_queue),
                "avg_rating": round(avg, 2),
                "helpful_percent": round(helpful_pct, 1),
                "vector_stats": vector_storage.get_statistics(),
            }
        )

    @feedback_bp.route("/feedback/<insight_id>", methods=["GET"])
    def get_insight_feedback(insight_id: str):
        entries = [e for e in _feedback_queue if e["insight_id"] == insight_id]
        return jsonify({"insight_id": insight_id, "count": len(entries), "items": entries})


def create_app() -> "Flask":  # type: ignore[name-defined]
    """Application factory — used by flask CLI and Docker CMD."""
    from flask import Flask
    from flask_cors import CORS  # type: ignore

    app = Flask(__name__, template_folder="templates")
    CORS(app)
    app.register_blueprint(feedback_bp, url_prefix="/api")
    return app
