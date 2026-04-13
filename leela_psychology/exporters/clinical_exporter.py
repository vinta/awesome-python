"""Clinical exporter — generates structured reports for therapists.

Supported formats
-----------------
- ``json``     — structured data for downstream analytics
- ``markdown`` — human-readable therapeutic report (Pandoc → PDF ready)
- ``pdf``      — via reportlab (optional dep); falls back to markdown if absent

The exporter works exclusively with aggregated, anonymised statistics from
``VectorStorage``.  No personal text is ever read or written.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional

from core.logging_config import get_logger
from storage.vector_storage import vector_storage

log = get_logger(__name__)


class ClinicalExporter:
    """Generates de-identified clinical reports from anonymised vector data.

    Optionally accepts a ``JournalManager`` to enrich reports with the
    session's narrative arc (synthesis snippets per turn).
    """

    def __init__(
        self,
        output_dir: str = "exports/clinical",
        journal=None,           # Optional[JournalManager] — avoid circular import
    ) -> None:
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self._journal = journal

    # ── Public API ────────────────────────────────────────────────────────────

    def export_session_report(self, session_id: str, fmt: str = "markdown") -> str:
        """Export a report for *session_id* in the requested *fmt*."""
        log.info("exporting clinical report", extra={"session_id": session_id, "fmt": fmt})
        data = self._build_report_data(session_id)
        if fmt == "pdf":
            return self._pdf(data, session_id)
        if fmt == "json":
            return self._json(data, session_id)
        return self._markdown(data, session_id)

    # ── Private ───────────────────────────────────────────────────────────────

    def _build_report_data(self, session_id: str) -> Dict[str, Any]:
        stats = vector_storage.get_statistics()
        session_insights = [
            m for m in vector_storage.metadata_list
            if m.get("session_id") == session_id
        ]
        data: Dict[str, Any] = {
            "session_id": session_id,
            "created_at": datetime.utcnow().isoformat() + "Z",
            "insights_count": len(session_insights),
            "statistics": stats,
            "session_insights": session_insights,
        }
        # Enrich with journal narrative arc if a JournalManager is attached
        if self._journal is not None:
            entries = self._journal.load_session(session_id)
            if entries:
                data["journal_turns"] = len(entries)
                data["journal_narrative"] = self._journal.export_narrative(session_id)
                data["journal_entries"] = [e.to_dict() for e in entries]
        return data

    def _json(self, data: Dict[str, Any], session_id: str) -> str:
        ts = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        path = self.output_dir / f"report_{session_id}_{ts}.json"
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        return str(path)

    def _markdown(self, data: Dict[str, Any], session_id: str) -> str:
        ts = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        path = self.output_dir / f"report_{session_id}_{ts}.md"

        stats = data["statistics"]
        archetypes = stats.get("archetypes_distribution", {})
        phases = stats.get("phases_distribution", {})

        lines = [
            f"# Leela Clinical Report — Session `{session_id}`",
            f"",
            f"**Generated:** {data['created_at']}  ",
            f"**Total insights:** {data['insights_count']}  ",
            f"**Total stored vectors:** {stats.get('total_insights', 0)}",
            f"",
            f"---",
            f"",
            f"## Archetype Distribution",
            f"",
        ]
        for arch, count in sorted(archetypes.items(), key=lambda x: -x[1]):
            lines.append(f"- **{arch}**: {count}")

        lines += ["", "## Alchemical Phase Distribution", ""]
        for phase, count in sorted(phases.items(), key=lambda x: -x[1]):
            lines.append(f"- **{phase}**: {count}")

        if data["session_insights"]:
            lines += ["", "## Session Move Log", ""]
            for m in data["session_insights"]:
                lines.append(
                    f"- Cell {m.get('cell_id', '?')} | "
                    f"{m.get('archetype', '?')} | "
                    f"{m.get('phase', '?')} | "
                    f"{m.get('move_type', '?')}"
                )

        # Journal narrative arc (only when JournalManager is attached)
        if data.get("journal_narrative"):
            lines += ["", "---", "", "## Narrative Arc (Session Journal)", ""]
            lines.append(data["journal_narrative"])

        lines += [
            "",
            "---",
            "",
            "> *This report is generated from anonymised vector metadata.*  ",
            "> *Raw personal text is never retained in the shared store.*",
        ]

        path.write_text("\n".join(lines), encoding="utf-8")
        return str(path)

    def _pdf(self, data: Dict[str, Any], session_id: str) -> str:
        try:
            from reportlab.lib.pagesizes import A4  # type: ignore
            from reportlab.lib.styles import getSampleStyleSheet  # type: ignore
            from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer  # type: ignore

            ts = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            path = self.output_dir / f"report_{session_id}_{ts}.pdf"

            doc = SimpleDocTemplate(str(path), pagesize=A4)
            styles = getSampleStyleSheet()
            story = [
                Paragraph(f"Leela Clinical Report — {session_id}", styles["Title"]),
                Spacer(1, 12),
                Paragraph(f"Generated: {data['created_at']}", styles["Normal"]),
                Paragraph(
                    f"Insights: {data['insights_count']}", styles["Normal"]
                ),
            ]
            stats = data["statistics"]
            for arch, count in stats.get("archetypes_distribution", {}).items():
                story.append(Paragraph(f"  {arch}: {count}", styles["Normal"]))
            doc.build(story)
            return str(path)
        except ImportError:
            # reportlab not installed — fall back to markdown
            return self._markdown(data, session_id)


# Module-level singleton
clinical_exporter = ClinicalExporter()
