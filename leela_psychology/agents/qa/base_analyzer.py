"""Abstract base class for all psychological analyzers."""
from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Dict


class BasePsychAnalyzer(ABC):
    """Contract every school-specific analyzer must implement."""

    @abstractmethod
    def build_psychological_context(
        self,
        cell_id: int,
        cell_name: str,
        cell_type: str,
        state_id: str,
    ) -> Dict[str, Any]:
        """Return school-specific context dict for *cell_id*."""

    @abstractmethod
    def build_llm_prompt(
        self,
        ctx: Dict[str, Any],
        user_question: str = "",
    ) -> str:
        """Build a clinical-grade LLM prompt from *ctx*."""
