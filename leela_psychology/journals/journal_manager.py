"""JournalManager — append-only session journal for the Leela engine.

Records a privacy-safe summary of each game turn so therapists can review
the session arc without accessing raw user reflections.

Privacy contract
----------------
- Only the synthesis *snippet* (≤ 200 chars) is persisted — no raw text.
- session_id is stored only in the per-session file name (never in the body).
- JSONL format: one entry per line, human-readable without decryption.
  (Unlike vector storage, journals contain no PII — they are aggregate
   psychological summaries, not personal data under GDPR Art. 4.)

Usage
-----
    from journals.journal_manager import JournalManager

    journal = JournalManager(output_dir="data/journals")
    journal.record("sess_abc", engine_result)
    narrative = journal.export_narrative("sess_abc")
"""
from __future__ import annotations

import json
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

_SNIPPET_MAX = 200  # chars stored from synthesis text


@dataclass
class JournalEntry:
    turn: int
    cell_id: int
    cell_name: str
    move_type: str
    schools: List[str]
    synthesis_snippet: str          # truncated — never raw user text
    archetypes: List[str]
    timestamp: str = field(
        default_factory=lambda: datetime.utcnow().isoformat() + "Z"
    )

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "JournalEntry":
        return cls(**d)


class JournalManager:
    """Per-session append-only journal stored as JSONL files."""

    def __init__(self, output_dir: str = "data/journals") -> None:
        self._dir = Path(output_dir)
        self._dir.mkdir(parents=True, exist_ok=True)

    # ── Private helpers ───────────────────────────────────────────────────────

    def _session_path(self, session_id: str) -> Path:
        # Sanitise to prevent path traversal
        safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in session_id)
        return self._dir / f"{safe}.jsonl"

    def _count_turns(self, session_id: str) -> int:
        path = self._session_path(session_id)
        if not path.exists():
            return 0
        with open(path, encoding="utf-8") as fh:
            return sum(1 for line in fh if line.strip())

    # ── Public API ────────────────────────────────────────────────────────────

    def record(self, session_id: str, turn_result: Dict[str, Any]) -> JournalEntry:
        """Append a privacy-safe entry derived from *turn_result*.

        Parameters
        ----------
        session_id:
            Session identifier (not stored inside the journal body).
        turn_result:
            Dict returned by ``LeelaPsychologicalEngine.analyze_turn()``.
        """
        ui = turn_result.get("unified_insight", {})
        ge = ui.get("game_event", {})
        layers = ui.get("psychological_layers", [])
        synthesis_raw = turn_result.get("synthesis", "")

        archetypes = [
            layer.get("data", {}).get("archetype", "")
            for layer in layers
            if layer.get("data", {}).get("archetype")
        ]

        entry = JournalEntry(
            turn=self._count_turns(session_id) + 1,
            cell_id=ge.get("cell_id", 0),
            cell_name=ge.get("cell_name", ""),
            move_type=ge.get("move_type", "neutral"),
            schools=turn_result.get("active_layers", []),
            synthesis_snippet=synthesis_raw[:_SNIPPET_MAX],
            archetypes=archetypes,
        )

        path = self._session_path(session_id)
        with open(path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(entry.to_dict(), ensure_ascii=False) + "\n")

        return entry

    def load_session(self, session_id: str) -> List[JournalEntry]:
        """Return all journal entries for *session_id* in turn order."""
        path = self._session_path(session_id)
        if not path.exists():
            return []
        entries: List[JournalEntry] = []
        with open(path, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if line:
                    try:
                        entries.append(JournalEntry.from_dict(json.loads(line)))
                    except (json.JSONDecodeError, TypeError):
                        pass
        return entries

    def export_narrative(self, session_id: str) -> str:
        """Generate a Markdown narrative arc for the session.

        Suitable for inclusion in a clinical report or therapist briefing.
        """
        entries = self.load_session(session_id)
        if not entries:
            return f"# Session Journal: {session_id}\n\n*No entries recorded.*\n"

        lines = [
            f"# Session Journal: {session_id}",
            f"\n**Turns recorded:** {len(entries)}",
            f"**Session opened:** {entries[0].timestamp}",
            f"**Session closed:** {entries[-1].timestamp}",
            "\n---\n",
        ]

        for e in entries:
            schools_str = ", ".join(e.schools) if e.schools else "—"
            arch_str = ", ".join(e.archetypes) if e.archetypes else "—"
            snippet = e.synthesis_snippet.strip()
            lines += [
                f"## Turn {e.turn} — {e.cell_name} (Cell #{e.cell_id})",
                f"- **Move type:** {e.move_type}",
                f"- **Schools active:** {schools_str}",
                f"- **Archetypes:** {arch_str}",
                f"- **Synthesis:** {snippet}",
                "",
            ]

        return "\n".join(lines)

    def delete_session(self, session_id: str) -> bool:
        """Delete journal file for *session_id* (GDPR erasure support)."""
        path = self._session_path(session_id)
        if path.exists():
            path.unlink()
            return True
        return False
