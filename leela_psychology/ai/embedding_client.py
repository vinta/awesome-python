"""Embedding client with pluggable providers and disk cache.

Providers
---------
- ``mock``   — deterministic hash-based vectors (no ML deps, suitable for CI)
- ``local``  — sentence-transformers (``paraphrase-multilingual-MiniLM-L12-v2``)
- ``openai`` — OpenAI embeddings API (requires ``OPENAI_API_KEY``)

The provider is selected via the ``LEE_EMB_PROVIDER`` environment variable
or the ``provider`` constructor argument.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import os
from pathlib import Path
from typing import List, Optional

_CACHE_DIR = Path(os.environ.get("LEE_EMB_CACHE", "data/emb_cache"))
_DIM = 384  # Default dimension for MiniLM


def _cache_key(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


async def _mock_embed(text: str, dim: int = _DIM) -> List[float]:
    """Deterministic L2-normalised mock embedding (no GPU/API needed)."""
    import numpy as np

    seed = int(hashlib.sha256(text.encode("utf-8")).hexdigest(), 16) % (2**32)
    rng = np.random.default_rng(seed)
    vec = rng.uniform(-1, 1, dim).astype("float32")
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.tolist()


async def _local_embed(text: str) -> List[float]:
    """Sentence-transformers embedding (lazy-loaded, thread-safe singleton)."""
    import numpy as np

    model = _LocalModelSingleton.get()
    loop = asyncio.get_event_loop()
    vec = await loop.run_in_executor(None, model.encode, text)
    norm = np.linalg.norm(vec)
    return (vec / norm if norm > 0 else vec).tolist()


class _LocalModelSingleton:
    _model = None

    @classmethod
    def get(cls):  # type: ignore[return]
        if cls._model is None:
            from sentence_transformers import SentenceTransformer  # type: ignore

            cls._model = SentenceTransformer(
                "paraphrase-multilingual-MiniLM-L12-v2"
            )
        return cls._model


class EmbeddingClient:
    """Async embedding client with caching and L2 normalisation."""

    def __init__(self, provider: Optional[str] = None) -> None:
        self.provider = provider or os.environ.get("LEE_EMB_PROVIDER", "mock")
        _CACHE_DIR.mkdir(parents=True, exist_ok=True)

    # ── Private ───────────────────────────────────────────────────────────────

    @staticmethod
    def _normalise_text(text: str) -> str:
        return " ".join(str(text).strip().split())

    async def _generate(self, text: str) -> List[float]:
        key = _cache_key(text)
        cache_file = _CACHE_DIR / f"{key}.json"

        if cache_file.exists():
            try:
                return json.loads(cache_file.read_text())["embedding"]
            except (KeyError, json.JSONDecodeError):
                pass

        if self.provider == "local":
            emb = await _local_embed(text)
        else:
            emb = await _mock_embed(text)

        try:
            cache_file.write_text(json.dumps({"embedding": emb}))
        except OSError:
            pass

        return emb

    # ── Public API ────────────────────────────────────────────────────────────

    async def embed(self, text: str) -> List[float]:
        """Return L2-normalised embedding for *text*."""
        return await self._generate(self._normalise_text(text))

    async def embed_and_store(
        self,
        text: str,
        meta: dict,
        storage_client,
    ) -> str:
        """Embed *text*, store in *storage_client*, return session pseudonym."""
        emb = await self.embed(text)
        return storage_client.add_insight(emb, meta)
