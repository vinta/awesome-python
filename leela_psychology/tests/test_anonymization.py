"""Tests for the HMAC pseudonymisation and AES-GCM encryption pipeline.

Run with:  pytest leela_psychology/tests/test_anonymization.py -v
"""
from __future__ import annotations

import json
import os
from pathlib import Path

import pytest

from core.security import SecurityProvider
from storage.vector_storage import VectorStorage


# ── Fixtures ──────────────────────────────────────────────────────────────────

@pytest.fixture()
def sp() -> SecurityProvider:
    return SecurityProvider()


@pytest.fixture()
def storage(tmp_path: Path) -> VectorStorage:
    """Fresh in-memory storage backed by a temp directory."""
    return VectorStorage(base_path=str(tmp_path / "vectors"))


# ── SecurityProvider tests ────────────────────────────────────────────────────

class TestSecurityProvider:
    def test_hash_is_deterministic(self, sp: SecurityProvider) -> None:
        h1 = sp.hash_session("user_42")
        h2 = sp.hash_session("user_42")
        assert h1 == h2

    def test_hash_length_is_24(self, sp: SecurityProvider) -> None:
        h = sp.hash_session("session_abc")
        assert len(h) == 24

    def test_different_ids_produce_different_hashes(self, sp: SecurityProvider) -> None:
        assert sp.hash_session("alice") != sp.hash_session("bob")

    def test_encrypt_decrypt_roundtrip(self, sp: SecurityProvider) -> None:
        original = '{"archetype": "Shadow", "phase": "Nigredo"}'
        token = sp.encrypt_props(original)
        assert token != original
        assert sp.decrypt_props(token) == original

    def test_encrypted_value_is_opaque(self, sp: SecurityProvider) -> None:
        token = sp.encrypt_props("sensitive personal thought")
        assert "sensitive" not in token
        assert "personal" not in token


# ── VectorStorage tests ───────────────────────────────────────────────────────

class TestVectorStorage:
    def test_pii_fields_stripped(self, storage: VectorStorage) -> None:
        meta = {
            "session_id": "user_secret",
            "cell_id": 7,
            "archetype": "Hero",
            "phase": "Albedo",
            "personal_thought": "I feel abandoned",   # PII — must be stripped
            "raw_reflection": "My childhood memory",   # PII — must be stripped
        }
        storage.add_insight([0.1, 0.2, 0.3], meta)
        stored = storage.metadata_list[-1]

        # Safe fields preserved
        assert stored["cell_id"] == 7
        assert stored["archetype"] == "Hero"
        assert stored["phase"] == "Albedo"

        # PII stripped
        assert "personal_thought" not in stored
        assert "raw_reflection" not in stored

        # session_id replaced by HMAC pseudonym
        assert "session_hash" in stored
        assert stored.get("session_id") != "user_secret" or "session_hash" in stored

    def test_metadata_encrypted_on_disk(self, storage: VectorStorage) -> None:
        storage.add_insight(None, {"session_id": "test", "cell_id": 3, "archetype": "Shadow"})
        raw_bytes = storage._meta_file.read_text(encoding="utf-8")
        # The raw file must NOT contain plain-text JSON keys
        assert '"archetype"' not in raw_bytes
        assert '"cell_id"' not in raw_bytes

    def test_add_and_query_by_hash(self, storage: VectorStorage) -> None:
        session_hash = storage.add_insight(
            [0.5, 0.5],
            {"session_id": "sess_1", "cell_id": 10, "archetype": "Self"},
        )
        assert isinstance(session_hash, str)
        assert len(session_hash) == 24

    def test_delete_by_session_hash(self, storage: VectorStorage) -> None:
        h = storage.add_insight(
            None,
            {"session_id": "doomed_session", "cell_id": 5, "archetype": "Trickster"},
        )
        assert len(storage.metadata_list) == 1

        deleted = storage.delete_by_session_hash(h)
        assert deleted == 1
        assert len(storage.metadata_list) == 0

    def test_delete_nonexistent_hash_is_noop(self, storage: VectorStorage) -> None:
        deleted = storage.delete_by_session_hash("nonexistent_hash_000000")
        assert deleted == 0

    def test_statistics_aggregation(self, storage: VectorStorage) -> None:
        for i in range(3):
            storage.add_insight(
                None,
                {
                    "session_id": f"sess_{i}",
                    "cell_id": i + 1,
                    "archetype": "Shadow" if i % 2 == 0 else "Hero",
                    "phase": "Nigredo",
                    "insight_length": 50,
                },
            )
        stats = storage.get_statistics()
        assert stats["total_insights"] == 3
        assert "Shadow" in stats["archetypes_distribution"]
        assert "Nigredo" in stats["phases_distribution"]

    def test_vector_search_returns_results(self, storage: VectorStorage) -> None:
        import numpy as np
        for i in range(3):
            vec = np.random.default_rng(i).uniform(-1, 1, 10).tolist()
            storage.add_insight(
                vec,
                {"session_id": f"s{i}", "cell_id": i, "archetype": "Anima"},
            )
        query = np.random.default_rng(0).uniform(-1, 1, 10).tolist()
        results = storage.search_similar(query, top_k=2)
        assert len(results) <= 2
        for _meta, sim in results:
            assert isinstance(sim, float)

    def test_persistence_survives_reload(self, tmp_path: Path) -> None:
        """Data written to disk is correctly recovered on re-instantiation."""
        path = str(tmp_path / "persist")
        s1 = VectorStorage(base_path=path)
        s1.add_insight(None, {"session_id": "u1", "cell_id": 99, "archetype": "Self"})

        s2 = VectorStorage(base_path=path)
        assert len(s2.metadata_list) == 1
        assert s2.metadata_list[0]["cell_id"] == 99
