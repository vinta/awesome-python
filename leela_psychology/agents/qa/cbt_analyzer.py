"""Cognitive-Behavioural Therapy (CBT) analyzer — cognitive distortion layer."""
from __future__ import annotations

from typing import Any, Dict

from agents.qa.base_analyzer import BasePsychAnalyzer

_DISTORTION_MAP: Dict[str, str] = {
    "snake": "Catastrophizing",
    "arrow": "Overgeneralisation",
    "neutral": "All-or-Nothing Thinking",
}

_REFRAME_MAP: Dict[str, str] = {
    "Catastrophizing": "What is the realistic worst case, and how likely is it really?",
    "Overgeneralisation": "Is this truly always the case, or just sometimes?",
    "All-or-Nothing Thinking": "Where is the middle ground between the two extremes?",
}


class CBTAnalyzer(BasePsychAnalyzer):
    """CBT cognitive-distortion and reframing analyzer."""

    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        distortion = _DISTORTION_MAP.get(cell_type, "All-or-Nothing Thinking")
        return {
            "school": "CBT",
            "distortion": distortion,
            "reframe_question": _REFRAME_MAP.get(distortion, ""),
            "symbol": "⚙️",
            "cell_name": cell_name,
            "cell_id": cell_id,
        }

    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        question = user_question or "What thought pattern might be distorting my view?"
        return (
            f"You are a CBT-trained therapist.\n\n"
            f"Context:\n"
            f"  Cell: {ctx['cell_name']} (#{ctx['cell_id']})\n"
            f"  Cognitive Distortion: {ctx['distortion']}\n"
            f"  Reframing Question: {ctx['reframe_question']}\n\n"
            f"Client question: {question}\n\n"
            f"In 3–4 sentences: name the distortion, explain how it traps thinking,"
            f" and model the Socratic question the client can use to test the belief."
        )
