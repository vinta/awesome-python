"""Gestalt therapy analyzer — awareness, contact, and unfinished business."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict

from agents.qa.base_analyzer import BasePsychAnalyzer


@dataclass
class GestaltPrinciple:
    name: str
    description: str
    focus_question: str
    therapeutic_goal: str


_PRINCIPLES: Dict[str, GestaltPrinciple] = {
    "snake": GestaltPrinciple(
        name="Figure-Ground Confusion",
        description=(
            "Difficulty distinguishing self from environment; feeling absorbed"
            " or overwhelmed by the situation."
        ),
        focus_question="What feels like 'you' here, and what is simply the situation?",
        therapeutic_goal="Develop clearer contact boundaries.",
    ),
    "arrow": GestaltPrinciple(
        name="Closure",
        description=(
            "A drive toward completing unfinished experiences or relationships"
            " that still claim attention."
        ),
        focus_question="What incomplete matter is asking to be resolved right now?",
        therapeutic_goal="Achieve resolution and integration of past experiences.",
    ),
    "neutral": GestaltPrinciple(
        name="Here-and-Now Awareness",
        description="Full presence in the immediate moment — sensations, feelings, needs.",
        focus_question="What are you noticing in your body and mind right now?",
        therapeutic_goal="Enhance present-moment contact and authenticity.",
    ),
}


class GestaltAnalyzer(BasePsychAnalyzer):
    """Gestalt therapy awareness and contact analyzer."""

    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        principle = _PRINCIPLES.get(cell_type, _PRINCIPLES["neutral"])
        return {
            "school": "Gestalt",
            "principle": principle.name,
            "description": principle.description,
            "focus_question": principle.focus_question,
            "therapeutic_goal": principle.therapeutic_goal,
            "symbol": "⭕",
            "cell_name": cell_name,
            "cell_id": cell_id,
        }

    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        question = user_question or "What am I experiencing right now?"
        return (
            f"You are a Gestalt therapist.\n\n"
            f"Context:\n"
            f"  Cell: {ctx['cell_name']} (#{ctx['cell_id']})\n"
            f"  Gestalt Principle: {ctx['principle']}\n"
            f"  Description: {ctx['description']}\n"
            f"  Therapeutic Goal: {ctx['therapeutic_goal']}\n\n"
            f"Client question: {question}\n\n"
            f"In 3–4 sentences: orient the client to their present experience,"
            f" name the contact boundary issue, and pose the focus question:"
            f" '{ctx['focus_question']}'"
        )
