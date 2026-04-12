"""LeelaPsychologicalEngine — the main orchestration facade.

Runs all active psychological layers in parallel, synthesises conflicts,
and stores anonymised vectors (only when the user has given consent).

Usage
-----
    from game.leela_psychological import engine

    result = await engine.analyze_turn(
        session_id="sess_123",
        cell_id=12,
        cell_name="Darkness",
        cell_type="snake",
        state_id="st_nigredo",
        user_question="Why do I keep repeating this pattern?",
        active_layers=["jung", "freud", "cbt"],
        user_consent=True,
    )
"""
from __future__ import annotations

import asyncio
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

# Make the package importable when run from the leela_psychology/ root
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from agents.qa.base_analyzer import BasePsychAnalyzer
from agents.qa.cbt_analyzer import CBTAnalyzer
from agents.qa.freudian_analyzer import FreudianAnalyzer
from agents.qa.gestalt_analyzer import GestaltAnalyzer
from agents.qa.jungian_analyzer import JungianAnalyzer
from agents.qa.transactional_analyzer import TransactionalAnalyzer
from ai.embedding_client import EmbeddingClient
from ai.synthesizer import ConflictSynthesizer
from models.unified_insight import (
    GameEvent,
    InsightMetadata,
    PsychologicalLayer,
    UnifiedInsight,
)
from storage.vector_storage import vector_storage


_ANALYZERS: Dict[str, BasePsychAnalyzer] = {
    "jung": JungianAnalyzer(),
    "freud": FreudianAnalyzer(),
    "cbt": CBTAnalyzer(),
    "gestalt": GestaltAnalyzer(),
    "transactional": TransactionalAnalyzer(),
}


class LeelaPsychologicalEngine:
    """Parallel multi-school analysis engine with privacy-preserving storage."""

    def __init__(self) -> None:
        self.synthesizer = ConflictSynthesizer()
        self.emb_client = EmbeddingClient()
        self.storage = vector_storage

    # ── Public API ────────────────────────────────────────────────────────────

    async def analyze_turn(
        self,
        session_id: str,
        cell_id: int,
        cell_name: str = "",
        cell_type: str = "neutral",
        state_id: str = "st_nigredo",
        user_question: str = "",
        active_layers: Optional[List[str]] = None,
        user_consent: bool = False,
    ) -> Dict[str, Any]:
        """Full analysis cycle: parallel layers → synthesis → optional storage.

        Returns a dict containing:
          - ``unified_insight``: serialised :class:`UnifiedInsight`
          - ``synthesis``: integrative narrative from :class:`ConflictSynthesizer`
          - ``active_layers``: list of schools that ran
          - ``session_hash``: HMAC pseudonym (``None`` if no consent)
          - ``status``: ``"ok"``
        """
        if not active_layers:
            active_layers = ["jung"]

        cell_name = cell_name or f"Cell {cell_id}"
        t0 = time.perf_counter()

        # 1. Parallel context build
        tasks = [
            asyncio.to_thread(
                _ANALYZERS[s].build_psychological_context,
                cell_id, cell_name, cell_type, state_id,
            )
            for s in active_layers
            if s in _ANALYZERS
        ]
        contexts = await asyncio.gather(*tasks)
        layers_dict = {active_layers[i]: contexts[i] for i in range(len(contexts))}

        # 2. Conflict synthesis
        synthesis = self.synthesizer.synthesize(layers_dict)

        # 3. Build UnifiedInsight
        layers_objs = [
            PsychologicalLayer(
                school=name,
                data=ctx,
                prompt=_ANALYZERS[name].build_llm_prompt(ctx, user_question),
            )
            for name, ctx in layers_dict.items()
        ]

        elapsed_ms = int((time.perf_counter() - t0) * 1000)
        insight = UnifiedInsight(
            session_id=session_id,
            game_event=GameEvent(
                cell_id=cell_id,
                cell_name=cell_name,
                move_type=cell_type,
            ),
            psychological_layers=layers_objs,
            metadata=InsightMetadata(
                session_id=session_id,
                processing_time_ms=elapsed_ms,
            ),
        )

        # 4. Anonymised vector storage (consent-gated)
        session_hash: Optional[str] = None
        if user_consent:
            combined_text = " ".join(
                ctx.get("archetype", "") + " " + ctx.get("phase", "")
                for ctx in layers_dict.values()
            ).strip() or f"cell_{cell_id}"

            dominant_layer = layers_dict.get("jung", next(iter(layers_dict.values())))
            session_hash = await self.emb_client.embed_and_store(
                combined_text,
                {
                    "session_id": session_id,
                    "cell_id": cell_id,
                    "archetype": dominant_layer.get("archetype", "Unknown"),
                    "phase": dominant_layer.get("phase", "Unknown"),
                    "move_type": cell_type,
                    "psychological_school": ",".join(active_layers),
                    "insight_length": len(combined_text),
                    "processing_time_ms": elapsed_ms,
                },
                self.storage,
            )

        return {
            "unified_insight": insight.to_dict(),
            "synthesis": synthesis,
            "active_layers": active_layers,
            "session_hash": session_hash,
            "status": "ok",
        }


# Module-level singleton
engine = LeelaPsychologicalEngine()
