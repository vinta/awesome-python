"""Transactional Analysis (Eric Berne) — ego-state layer.

Identifies which ego-state (Parent / Adult / Child) is dominant in the
current game moment and generates therapeutic dialogue prompts.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List

from agents.qa.base_analyzer import BasePsychAnalyzer


@dataclass
class EgoState:
    name: str
    behavior: str
    quote_example: str
    emotional_tone: str
    typical_phrases: List[str] = field(default_factory=list)


_EGO_STATES: Dict[str, EgoState] = {
    "Parent": EgoState(
        name="Parent (Critical / Nurturing)",
        behavior="Directive, protective, judgemental, or caring.",
        quote_example='"You should have known better…" / "Let me take care of you."',
        emotional_tone="Authoritative, critical, or warm.",
        typical_phrases=["You must…", "You should…", "Don't…", "Let me help you."],
    ),
    "Adult": EgoState(
        name="Adult",
        behavior="Rational data-processing, problem-solving, reality-testing.",
        quote_example='"What are the actual facts here?"',
        emotional_tone="Calm, objective, analytical.",
        typical_phrases=["What are the options?", "The evidence suggests…", "Let us analyse…"],
    ),
    "Child": EgoState(
        name="Child (Free / Adapted)",
        behavior="Emotional, spontaneous, creative, or fearful and compliant.",
        quote_example='"I\'m scared..." / "I want to play!"',
        emotional_tone="Emotional, impulsive, or anxious.",
        typical_phrases=["I'm scared…", "I want…", "Why do I always…", "It's not fair!"],
    ),
}

_MOVE_TO_EGO: Dict[str, str] = {
    "snake": "Child",    # Regression / fear
    "arrow": "Adult",    # Forward movement / decision
    "neutral": "Parent", # Holding / containing
}


class TransactionalAnalyzer(BasePsychAnalyzer):
    """Eric Berne Transactional Analysis ego-state analyzer."""

    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        ego_key = _MOVE_TO_EGO.get(cell_type, "Adult")
        # Override for known phase markers
        if "nigredo" in state_id.lower():
            ego_key = "Child"
        elif "rubedo" in state_id.lower():
            ego_key = "Adult"

        ego = _EGO_STATES[ego_key]
        return {
            "school": "Transactional",
            "ego_state": ego.name,
            "behavior": ego.behavior,
            "quote_example": ego.quote_example,
            "emotional_tone": ego.emotional_tone,
            "typical_phrases": ego.typical_phrases,
            "symbol": "🎭",
            "cell_name": cell_name,
            "cell_id": cell_id,
        }

    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        question = user_question or "Which inner voice is speaking right now?"
        phrases = ", ".join(f'"{p}"' for p in ctx["typical_phrases"][:3])
        return (
            f"You are a Transactional Analysis therapist.\n\n"
            f"Context:\n"
            f"  Cell: {ctx['cell_name']} (#{ctx['cell_id']})\n"
            f"  Active Ego-State: {ctx['ego_state']}\n"
            f"  Behaviour pattern: {ctx['behavior']}\n"
            f"  Typical phrases: {phrases}\n\n"
            f"Client question: {question}\n\n"
            f"In 3–4 sentences: describe how this ego-state manifests right now,"
            f" give an example from the context ({ctx['quote_example']}),"
            f" and invite the client to notice which 'voice' they recognise."
        )
