"""EmbeddingSynthesizer — v2.0 dynamic polarity detection.

Replaces the static POLARITY_MAP dict with cosine-similarity–based concept
distance.  Two concepts are in *tension* (polarity) when their embeddings are
semantically distant (low cosine similarity).  A template narrative is
generated from the polarity rather than looked up from a hand-coded table.

This makes the synthesizer:
  - Scalable   — works for any school added in the future
  - Maintainable — no manual POLARITY_MAP entries needed
  - Explainable  — the narrative describes *why* the tension exists

Architecture
------------
                  concept names (strings)
                          │
                    EmbeddingClient
                          │
                   float32 vectors
                          │
                  cosine_similarity()
                          │
              sim < TENSION_THRESHOLD?  →  generate polarity narrative
                          │
                  integrative_narrative()
"""
from __future__ import annotations

import math
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from ai.embedding_client import EmbeddingClient

# Concepts with cosine similarity below this threshold are considered in tension.
# Empirically: < 0.35 = strongly opposed; 0.35–0.6 = moderate tension.
TENSION_THRESHOLD = 0.55

# Polarity intensity labels for narrative framing
_INTENSITY = [
    (0.20, "profound"),
    (0.35, "strong"),
    (0.50, "noticeable"),
    (0.55, "subtle"),
]


def _cosine(a: List[float], b: List[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _intensity_label(sim: float) -> str:
    for threshold, label in _INTENSITY:
        if sim <= threshold:
            return label
    return "subtle"


def _polarity_narrative(
    concept_a: str,
    school_a: str,
    concept_b: str,
    school_b: str,
    similarity: float,
) -> str:
    intensity = _intensity_label(similarity)
    return (
        f"A {intensity} polarity is active between "
        f"**{concept_a}** ({school_a}) and **{concept_b}** ({school_b}). "
        f"These forces pull in different directions "
        f"(semantic distance: {1 - similarity:.2f}). "
        f"Synthesis: hold both in awareness — the tension between "
        f"{concept_a.lower()} and {concept_b.lower()} is itself the threshold "
        f"of growth. Neither alone carries the full truth."
    )


class EmbeddingSynthesizer:
    """Dynamic polarity detector using concept-embedding cosine similarity."""

    def __init__(self, client: Optional[EmbeddingClient] = None) -> None:
        self._client = client or EmbeddingClient()
        # Cache to avoid re-embedding the same concept twice per session
        self._concept_cache: Dict[str, List[float]] = {}

    # ── Private helpers ───────────────────────────────────────────────────────

    async def _embed_concept(self, concept: str) -> List[float]:
        if concept not in self._concept_cache:
            self._concept_cache[concept] = await self._client.embed(concept)
        return self._concept_cache[concept]

    def _extract_concepts(self, layers: Dict[str, Any]) -> List[Tuple[str, str]]:
        """Extract (concept_name, school_label) pairs from layers dict."""
        mapping = {
            "jung":          ("archetype",   "Jungian"),
            "freud":         ("mechanism",   "Freudian"),
            "cbt":           ("distortion",  "CBT"),
            "gestalt":       ("principle",   "Gestalt"),
            "transactional": ("ego_state",   "Transactional"),
        }
        result = []
        for school, (key, label) in mapping.items():
            val = layers.get(school, {}).get(key)
            if val:
                result.append((str(val), label))
        return result

    # ── Public API ────────────────────────────────────────────────────────────

    async def synthesize(self, layers: Dict[str, Any]) -> str:
        """Detect polarities and produce an integrative narrative.

        Parameters
        ----------
        layers:
            Dict mapping school name → context dict (output of each analyzer's
            ``build_psychological_context()``).

        Returns
        -------
        str
            Integrative narrative.  Empty layers → "aligned" message.
        """
        concepts = self._extract_concepts(layers)
        if len(concepts) < 2:
            return (
                "Insufficient layers for polarity analysis. "
                "All active forces are moving in alignment."
            )

        polarities: List[str] = []

        for i in range(len(concepts)):
            for j in range(i + 1, len(concepts)):
                name_a, school_a = concepts[i]
                name_b, school_b = concepts[j]

                vec_a = await self._embed_concept(name_a)
                vec_b = await self._embed_concept(name_b)
                sim = _cosine(vec_a, vec_b)

                if sim < TENSION_THRESHOLD:
                    polarities.append(
                        _polarity_narrative(name_a, school_a, name_b, school_b, sim)
                    )

        if not polarities:
            active = ", ".join(f"{n} ({s})" for n, s in concepts)
            return (
                f"All active concepts are in semantic alignment: {active}. "
                "Continue on the current path — the psyche is moving coherently."
            )

        header = f"Embedding-based polarity synthesis ({len(polarities)} tension(s) detected):"
        return header + "\n\n" + "\n\n".join(f"• {p}" for p in polarities)
