"""Core types and enumerations for the Leela Psychology AI system."""
from __future__ import annotations
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict


class AgentRole(Enum):
    ORCHESTRATOR = "orchestrator"
    FEEDBACK = "feedback"
    USER_FEEDBACK = "user_feedback"
    SELF_LEARNING = "self_learning"
    OBSERVABILITY = "observability"
    QA = "qa"
    USER = "user"
    SYSTEM = "system"


@dataclass
class AgentMessage:
    sender: AgentRole
    receiver: AgentRole
    action: str
    payload: Dict[str, Any] = field(default_factory=dict)
