"""Flask web API tests — feedback Blueprint.

Covers all three endpoints using Flask's built-in test client:
  POST /api/feedback        — submit a rating
  GET  /api/feedback/stats  — aggregate statistics
  GET  /api/feedback/<id>   — per-insight lookup
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import web.feedback_api as _api_module
from web.feedback_api import create_app


# ── Fixtures ──────────────────────────────────────────────────────────────────

@pytest.fixture()
def app(tmp_path):
    """Fresh Flask app + isolated vector storage for every test."""
    from storage.vector_storage import VectorStorage

    flask_app = create_app()
    flask_app.config["TESTING"] = True

    # Inject a throw-away storage so tests never touch the module singleton
    isolated_storage = VectorStorage(base_path=str(tmp_path / "vs"))
    _api_module.vector_storage = isolated_storage

    # Clear the in-memory feedback queue between tests
    _api_module._feedback_queue.clear()

    yield flask_app

    # Teardown — restore queue hygiene
    _api_module._feedback_queue.clear()


@pytest.fixture()
def client(app):
    return app.test_client()


# ── POST /api/feedback ────────────────────────────────────────────────────────

class TestSubmitFeedback:
    def test_valid_submission_returns_201(self, client):
        resp = client.post(
            "/api/feedback",
            json={
                "insight_id": "ins_abc",
                "rating": 4,
                "comment": "Helpful insight.",
                "helpful": True,
                "session_id": "sess_001",
            },
        )
        assert resp.status_code == 201
        body = resp.get_json()
        assert body["status"] == "ok"
        assert "feedback_id" in body

    def test_missing_insight_id_returns_400(self, client):
        resp = client.post("/api/feedback", json={"rating": 3})
        assert resp.status_code == 400
        assert "insight_id" in resp.get_json()["error"]

    def test_missing_rating_returns_400(self, client):
        resp = client.post("/api/feedback", json={"insight_id": "x"})
        assert resp.status_code == 400
        assert "rating" in resp.get_json()["error"]

    def test_rating_zero_rejected(self, client):
        resp = client.post("/api/feedback", json={"insight_id": "x", "rating": 0})
        assert resp.status_code == 400

    def test_rating_six_rejected(self, client):
        resp = client.post("/api/feedback", json={"insight_id": "x", "rating": 6})
        assert resp.status_code == 400

    def test_rating_boundary_1_accepted(self, client):
        resp = client.post("/api/feedback", json={"insight_id": "x", "rating": 1})
        assert resp.status_code == 201

    def test_rating_boundary_5_accepted(self, client):
        resp = client.post("/api/feedback", json={"insight_id": "x", "rating": 5})
        assert resp.status_code == 201

    def test_comment_exceeding_max_length_rejected(self, client):
        resp = client.post(
            "/api/feedback",
            json={"insight_id": "x", "rating": 3, "comment": "A" * 2001},
        )
        assert resp.status_code == 400
        assert "comment" in resp.get_json()["error"].lower()

    def test_malformed_json_returns_400(self, client):
        resp = client.post(
            "/api/feedback",
            data="not-json",
            content_type="application/json",
        )
        assert resp.status_code == 400

    def test_empty_body_returns_400(self, client):
        resp = client.post("/api/feedback", json={})
        assert resp.status_code == 400


# ── GET /api/feedback/stats ───────────────────────────────────────────────────

class TestFeedbackStats:
    def test_stats_empty_queue(self, client):
        resp = client.get("/api/feedback/stats")
        assert resp.status_code == 200
        body = resp.get_json()
        assert body["total_feedback"] == 0
        assert body["avg_rating"] == 0.0
        assert "vector_stats" in body

    def test_stats_after_submissions(self, client):
        for rating in (3, 4, 5):
            client.post(
                "/api/feedback",
                json={"insight_id": "ins_x", "rating": rating, "helpful": True},
            )
        resp = client.get("/api/feedback/stats")
        body = resp.get_json()
        assert body["total_feedback"] == 3
        assert body["avg_rating"] == pytest.approx(4.0)
        assert body["helpful_percent"] == pytest.approx(100.0)


# ── GET /api/feedback/<insight_id> ────────────────────────────────────────────

class TestInsightFeedback:
    def test_no_feedback_for_unknown_id(self, client):
        resp = client.get("/api/feedback/nonexistent")
        assert resp.status_code == 200
        body = resp.get_json()
        assert body["count"] == 0
        assert body["items"] == []

    def test_returns_matching_entries_only(self, client):
        client.post("/api/feedback", json={"insight_id": "ins_A", "rating": 5})
        client.post("/api/feedback", json={"insight_id": "ins_B", "rating": 2})
        client.post("/api/feedback", json={"insight_id": "ins_A", "rating": 4})

        resp = client.get("/api/feedback/ins_A")
        body = resp.get_json()
        assert body["count"] == 2
        assert all(e["insight_id"] == "ins_A" for e in body["items"])
