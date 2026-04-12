"""Hardened vector storage with HMAC pseudonymisation and AES-GCM encryption.

Architecture
------------
- Each insight is stored as an *encrypted* JSON record in a JSONL file.
- Personal data is stripped; only the safe_fields whitelist is persisted.
- Raw text is NEVER written to disk — only numeric embeddings.
- session_id is replaced by an HMAC pseudonym before storage.
- The FAISS index is managed by FAISSAdapter (see storage/faiss_adapter.py).

Usage
-----
    from storage.vector_storage import vector_storage
    vector_storage.add_insight(embedding_vector, metadata_dict)
"""
from __future__ import annotations

import json
import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from cryptography.fernet import InvalidToken

from core.security import SecurityProvider

# Fields that may be written to the shared store (no PII).
# session_id is intentionally excluded — replaced by HMAC pseudonym.
_SAFE_FIELDS = {
    "cell_id", "archetype", "phase", "timestamp",
    "move_type", "psychological_school",
    "insight_length", "processing_time_ms",
}


class VectorStorage:
    """Encrypted metadata store with optional FAISS vector index."""

    def __init__(
        self,
        base_path: str = "data/vectors",
        security: Optional[SecurityProvider] = None,
    ) -> None:
        self.sp = security or SecurityProvider()
        self.storage_path = Path(base_path)
        self.storage_path.mkdir(parents=True, exist_ok=True)
        self._meta_file = self.storage_path / "metadata.jsonl.enc"

        # In-memory mirror — rebuilt from disk on first access
        self._metadata: List[Dict[str, Any]] = []
        self._vectors: List[List[float]] = []
        self._loaded = False

        # Optional FAISS adapter (lazy init to avoid hard dep)
        self._faiss: Any = None

    # ── Private helpers ───────────────────────────────────────────────────────

    def _ensure_loaded(self) -> None:
        if self._loaded:
            return
        self._loaded = True
        if not self._meta_file.exists():
            return
        with open(self._meta_file, "r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    raw = self.sp.decrypt_props(line)
                    self._metadata.append(json.loads(raw))
                except (InvalidToken, json.JSONDecodeError):
                    pass  # Skip corrupted rows

    def _persist_row(self, record: Dict[str, Any]) -> None:
        encrypted = self.sp.encrypt_props(json.dumps(record, ensure_ascii=False))
        with open(self._meta_file, "a", encoding="utf-8") as fh:
            fh.write(encrypted + "\n")

    def _rewrite_metadata(self) -> None:
        """Rewrite the entire metadata file (used after deletions)."""
        self._meta_file.unlink(missing_ok=True)
        for record in self._metadata:
            self._persist_row(record)

    @staticmethod
    def _anonymise(meta: Dict[str, Any]) -> Dict[str, Any]:
        """Strip PII; keep only safe statistical fields."""
        return {k: v for k, v in meta.items() if k in _SAFE_FIELDS}

    # ── Public API ────────────────────────────────────────────────────────────

    def add_insight(
        self,
        embedding: Optional[List[float]],
        meta: Dict[str, Any],
    ) -> str:
        """Store *embedding* + anonymised *meta*.  Returns session pseudonym."""
        self._ensure_loaded()
        session_id = str(meta.get("session_id", "anon"))
        session_hash = self.sp.hash_session(session_id)

        safe_meta = self._anonymise(meta)
        safe_meta["session_hash"] = session_hash
        safe_meta["id"] = str(uuid.uuid4())
        safe_meta.setdefault("timestamp", datetime.utcnow().isoformat())

        self._metadata.append(safe_meta)
        self._persist_row(safe_meta)

        if embedding is not None:
            self._vectors.append(embedding)
            if self._faiss is not None:
                self._faiss.add_vector(embedding, safe_meta["id"])

        return session_hash

    def search_similar(
        self,
        query_embedding: List[float],
        top_k: int = 5,
    ) -> List[Tuple[Dict[str, Any], float]]:
        """Return up to *top_k* (metadata, cosine_similarity) pairs."""
        import numpy as np

        self._ensure_loaded()
        if not self._vectors:
            return []

        q = np.array(query_embedding, dtype="float32")
        q_norm = np.linalg.norm(q)
        if q_norm == 0:
            return []

        mat = np.array(self._vectors, dtype="float32")
        norms = np.linalg.norm(mat, axis=1)
        norms = np.where(norms == 0, 1e-9, norms)
        sims = (mat @ q) / (norms * q_norm)

        indices = np.argsort(sims)[::-1][:top_k]
        results = []
        for idx in indices:
            score = float(sims[idx])
            if score >= 0.0 and idx < len(self._metadata):
                results.append((self._metadata[idx], score))
        return results

    def delete_by_session_hash(self, session_hash: str) -> int:
        """Delete all records matching *session_hash* (GDPR right-to-erasure)."""
        self._ensure_loaded()
        before = len(self._metadata)
        self._metadata = [r for r in self._metadata if r.get("session_hash") != session_hash]
        deleted = before - len(self._metadata)
        if deleted:
            self._rewrite_metadata()
        return deleted

    def get_statistics(self) -> Dict[str, Any]:
        """Aggregate non-personal statistics across all stored insights."""
        self._ensure_loaded()
        if not self._metadata:
            return {"total_insights": 0}

        archetype_counts: Dict[str, int] = {}
        phase_counts: Dict[str, int] = {}
        cell_counts: Dict[int, int] = {}
        total_length = 0

        for m in self._metadata:
            arch = m.get("archetype", "Unknown")
            archetype_counts[arch] = archetype_counts.get(arch, 0) + 1

            phase = m.get("phase", "Unknown")
            phase_counts[phase] = phase_counts.get(phase, 0) + 1

            cell_id = m.get("cell_id")
            if cell_id is not None:
                cell_counts[cell_id] = cell_counts.get(cell_id, 0) + 1

            total_length += m.get("insight_length", 0)

        most_common_cell = max(cell_counts, key=cell_counts.get) if cell_counts else None
        avg_length = total_length / len(self._metadata)

        return {
            "total_insights": len(self._metadata),
            "archetypes_distribution": archetype_counts,
            "phases_distribution": phase_counts,
            "avg_insight_length": round(avg_length, 1),
            "most_common_cell": most_common_cell,
        }

    # Expose internal list for tests / analytics (read-only intent)
    @property
    def metadata_list(self) -> List[Dict[str, Any]]:
        self._ensure_loaded()
        return self._metadata


# Module-level singleton
vector_storage = VectorStorage()
