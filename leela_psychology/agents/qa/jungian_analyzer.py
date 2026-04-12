"""Jungian analytical psychology layer.

Maps each of the 72 Leela cells to an alchemical phase and archetype.
Jung is the *foundation* school — other schools are compared against it
in the ConflictSynthesizer.
"""
from __future__ import annotations

from typing import Any, Dict

from agents.qa.base_analyzer import BasePsychAnalyzer

# Alchemical phase boundaries (cell ranges)
_PHASE_MAP = {
    range(1, 19): ("Nigredo", "🌑", "Dissolution of the old self — confronting the Shadow."),
    range(19, 37): ("Albedo", "🌕", "Purification — the emergence of the Anima/Animus."),
    range(37, 55): ("Citrinitas", "☀️", "Illumination — integration of the Wise Elder."),
    range(55, 73): ("Rubedo", "🔴", "Wholeness — the Self fully manifested."),
}

# Cell-type → dominant archetype
_ARCHETYPE_MAP: Dict[str, str] = {
    "snake": "Shadow",
    "arrow": "Hero",
    "neutral": "Self",
}


def _resolve_phase(cell_id: int) -> tuple[str, str, str]:
    for r, (phase, symbol, desc) in _PHASE_MAP.items():
        if cell_id in r:
            return phase, symbol, desc
    return "Nigredo", "🌑", "Unknown phase."


class JungianAnalyzer(BasePsychAnalyzer):
    """Jungian analytical psychology analyzer."""

    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        phase, symbol, phase_desc = _resolve_phase(cell_id)
        archetype = _ARCHETYPE_MAP.get(cell_type, "Self")
        return {
            "school": "Jung",
            "phase": phase,
            "phase_description": phase_desc,
            "archetype": archetype,
            "symbol": symbol,
            "cell_name": cell_name,
            "cell_id": cell_id,
            "cell_type": cell_type,
        }

    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        question = user_question or "What does this moment reveal about my inner journey?"
        return (
            f"You are a Jungian analyst guiding a client through the process of"
            f" individuation.\n\n"
            f"Context:\n"
            f"  Cell: {ctx['cell_name']} (#{ctx['cell_id']}, {ctx['cell_type']})\n"
            f"  Alchemical Phase: {ctx['phase']} {ctx['symbol']} — {ctx['phase_description']}\n"
            f"  Dominant Archetype: {ctx['archetype']}\n\n"
            f"Client question: {question}\n\n"
            f"Respond in 3–5 sentences. Name the archetype active in this moment,"
            f" describe its shadow and its gift, and offer one integrative question"
            f" the client can sit with."
        )
