"""Freudian psychoanalytic layer — defence mechanisms and instinctual dynamics."""
from __future__ import annotations

from typing import Any, Dict

from agents.qa.base_analyzer import BasePsychAnalyzer

_MECHANISM_MAP: Dict[str, str] = {
    "snake": "Regression",
    "arrow": "Sublimation",
    "neutral": "Repression",
}

_MECHANISM_DESC: Dict[str, str] = {
    "Regression": "A retreat to earlier, more primitive modes of behaviour when faced with anxiety.",
    "Sublimation": "Redirecting instinctual energy toward socially accepted, constructive goals.",
    "Repression": "Unconsciously pushing threatening thoughts or feelings out of awareness.",
    "Projection": "Attributing one's own unacceptable impulses to others.",
}


class FreudianAnalyzer(BasePsychAnalyzer):
    """Freudian psychoanalytic defense-mechanism analyzer."""

    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        mechanism = _MECHANISM_MAP.get(cell_type, "Repression")
        return {
            "school": "Freud",
            "mechanism": mechanism,
            "mechanism_description": _MECHANISM_DESC.get(mechanism, ""),
            "symbol": "🧠",
            "cell_name": cell_name,
            "cell_id": cell_id,
        }

    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        question = user_question or "What unconscious dynamic is at play here?"
        return (
            f"You are a psychoanalytically trained therapist.\n\n"
            f"Context:\n"
            f"  Cell: {ctx['cell_name']} (#{ctx['cell_id']})\n"
            f"  Active Defence Mechanism: {ctx['mechanism']}\n"
            f"  Description: {ctx['mechanism_description']}\n\n"
            f"Client question: {question}\n\n"
            f"In 3–4 sentences: name the defence, explain its unconscious purpose,"
            f" and suggest one way the client might begin to work through it rather"
            f" than around it."
        )
