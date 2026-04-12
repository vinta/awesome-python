"""Conflict Resolution Synthesizer — dialectical meta-analysis.

Rather than choosing a "winning" school, the synthesizer identifies
*polarities* between schools and generates an integrative narrative.
This mirrors the Jungian concept of the *transcendent function*: holding
opposites in tension until a third, higher possibility emerges.
"""
from __future__ import annotations

from typing import Any, Dict, List


class ConflictSynthesizer:
    """Detects and resolves contradictions between psychological schools."""

    # (school_A_concept, school_B_concept) → synthesis narrative
    POLARITY_MAP: Dict[tuple, str] = {
        ("Hero", "Regression"): (
            "The Heroic Ego strives for growth, but the unconscious regresses toward"
            " the safety of the familiar. Synthesis: acknowledge the fear beneath the"
            " drive — progress becomes sustainable when the wound is honoured."
        ),
        ("Shadow", "Regression"): (
            "Shadow impulses collide with a regressive pull toward past defences."
            " Integration requires confronting what was repressed rather than"
            " re-enacting old patterns."
        ),
        ("Self", "Id"): (
            "The Jungian drive toward wholeness conflicts with the raw instinctual"
            " pressure of the Id. Synthesis: channel libidinal energy toward"
            " individuation rather than suppression."
        ),
        ("Adult", "Here and Now"): (
            "The Transactional Adult analyses data while Gestalt insists on felt"
            " present-moment experience. Neither alone is complete — integrate"
            " rational understanding with somatic awareness."
        ),
        ("Shadow", "Parent"): (
            "Shadow impulses clash with the internalised Critical Parent voice."
            " Synthesis: replace the punitive script with a Nurturing Parent that"
            " allows shadow material to be acknowledged without shame."
        ),
        ("Catastrophizing", "Adult"): (
            "CBT catastrophising distorts risk; the Transactional Adult needs facts."
            " Ground the catastrophic belief in evidence to restore adaptive thinking."
        ),
        ("Hero", "Child"): (
            "The heroic striving masks an anxious Inner Child seeking approval."
            " True courage emerges when the Child's needs are met, not bypassed."
        ),
        ("Catastrophizing", "Sublimation"): (
            "Cognitive anxiety (CBT) can become the raw material for creative"
            " sublimation (Freud) — transforming dread into meaningful action."
        ),
    }

    def synthesize(self, layers: Dict[str, Any]) -> str:
        """Produce an integrative narrative from multi-school *layers* data."""
        jung_arch = layers.get("jung", {}).get("archetype")
        freud_mech = layers.get("freud", {}).get("mechanism")
        ta_state = layers.get("ta", {}).get("ego_state") or layers.get(
            "transactional", {}
        ).get("ego_state")
        gestalt_princ = layers.get("gestalt", {}).get("principle")
        cbt_distortion = layers.get("cbt", {}).get("distortion")

        candidates: List[tuple] = [
            (jung_arch, freud_mech),
            (jung_arch, ta_state),
            (ta_state, gestalt_princ),
            (cbt_distortion, ta_state),
            (jung_arch, cbt_distortion),
        ]

        found: List[str] = []
        for pair in candidates:
            if pair[0] and pair[1]:
                narrative = self.POLARITY_MAP.get(pair)
                if narrative:
                    found.append(narrative)

        if not found:
            return (
                "Internal vectors are aligned. All schools point in the same"
                " direction — continue on the chosen path with confidence."
            )

        header = "Polarity Synthesis detected:"
        return header + "\n\n" + "\n\n".join(f"• {n}" for n in found)
