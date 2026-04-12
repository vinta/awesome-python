# Clinical Usage Guide — Leela Quest+Psychology AI v1.1.0

## Overview

Leela Quest+Psychology is a privacy-first psychological self-exploration platform
combining the classical Leela board game with a five-school analytical engine.
It is designed as a **therapist co-pilot**, not a replacement for clinical care.

---

## Psychological Schools

### 1. Jungian Analytical Psychology (`jung`)
| Dimension | Detail |
|-----------|--------|
| Archetypes | Shadow, Hero, Self, Anima/Animus, Wise Elder, Trickster |
| Alchemical phases | Nigredo → Albedo → Citrinitas → Rubedo |
| Clinical use | Individuation work, shadow integration, symbolic interpretation |

### 2. Freudian Psychoanalysis (`freud`)
| Dimension | Detail |
|-----------|--------|
| Defence mechanisms | Regression, Sublimation, Repression, Projection |
| Clinical use | Unconscious dynamics, childhood wound patterns, libidinal economy |

### 3. Cognitive-Behavioural Therapy (`cbt`)
| Dimension | Detail |
|-----------|--------|
| Distortions | Catastrophizing, Overgeneralisation, All-or-Nothing Thinking |
| Clinical use | Belief restructuring, Socratic questioning, homework tasks |

### 4. Gestalt Therapy (`gestalt`)
| Dimension | Detail |
|-----------|--------|
| Principles | Figure-Ground Confusion, Closure, Here-and-Now Awareness |
| Clinical use | Contact boundary work, unfinished business, somatic awareness |

### 5. Transactional Analysis (`transactional`)
| Dimension | Detail |
|-----------|--------|
| Ego-states | Parent (Critical/Nurturing), Adult, Child (Free/Adapted) |
| Clinical use | Internal dialogue mapping, script analysis, transaction patterns |

---

## Conflict Synthesis

When two schools produce contradictory readings, the `ConflictSynthesizer`
applies *dialectical synthesis* — holding the polarity in tension and
generating an integrative narrative rather than declaring a winner.

Example polarity detected:
> **Shadow (Jung) vs Regression (Freud)**
> "Shadow impulses collide with a regressive pull toward past defences.
>  Integration requires confronting what was repressed rather than
>  re-enacting old patterns."

---

## Privacy Architecture

```
User reflection text
       ↓
[Local device only — never transmitted raw]
       ↓
EmbeddingClient  →  L2-normalised float vector
       ↓
HMAC-SHA256(session_id, master_key)  →  24-char pseudonym
       ↓
AES-GCM encryption (Fernet)
       ↓
Encrypted JSONL on disk  +  Optional FAISS index
```

**What is stored (server/shared store):**
- cell_id, archetype, phase, move_type
- Anonymised session pseudonym (irreversible without master key)
- Timestamp, processing time

**What is NEVER stored centrally:**
- Raw reflection text
- session_id in plain form
- Personal comments

---

## Clinical Integration

### For Therapists (Facilitators)

1. **Session review** — after each Leela session, request the clinical export:
   ```python
   from exporters.clinical_exporter import clinical_exporter
   report = clinical_exporter.export_session_report(session_id, fmt="markdown")
   ```

2. **Interpret the Archetype Distribution chart** — a high proportion of
   "Shadow" entries indicates the client is in active confrontation work
   (Nigredo phase); "Self" entries suggest integration progress.

3. **Polarity synthesis** — when the engine reports a polarity between two
   schools, use it as a conversational entry point: *"The system noticed
   tension between your heroic striving and a regressive pull — what does
   that resonate with for you?"*

4. **GDPR erasure** — to delete all anonymised data for a client:
   ```python
   from storage.vector_storage import vector_storage
   vector_storage.delete_by_session_hash(known_hash)
   ```

### For Clients (Players)

1. Before starting, set an intention question. The system uses it as context.
2. After landing on a cell, read the multi-school insight.
3. Rate the insight (1–5 stars) via the feedback form — this improves future interpretations.
4. At the end of a session, download the Markdown report to share with your therapist.

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/feedback` | POST | Submit a rating + comment |
| `/api/feedback/stats` | GET | Aggregate feedback statistics |
| `/api/feedback/<insight_id>` | GET | Feedback for a specific insight |

### Feedback payload example
```json
{
  "insight_id": "uuid-here",
  "rating": 4,
  "comment": "Touched on something important.",
  "helpful": true,
  "session_id": "your-session-id"
}
```

---

## Key Management

| Environment variable | Purpose | Production recommendation |
|----------------------|---------|--------------------------|
| `LEE_HMAC_KEY` | HMAC master key for pseudonymisation | 32-byte secret from KMS |
| `LEE_FERNET_KEY` | AES-GCM key for metadata encryption | Fernet key from KMS |
| `LEE_EMB_PROVIDER` | Embedding backend (`mock`/`local`) | `local` with sentence-transformers |

**Rotate keys** using `core/kms_lite.py` pattern — re-encrypt all metadata
before discarding the old key.

---

## Disclaimer

This system is a **decision-support tool** for trained mental health
professionals. It does not provide diagnoses, does not replace therapy, and
should not be used as a standalone intervention with vulnerable populations.

All AI-generated insights should be treated as hypotheses to be tested in
dialogue, not as clinical truths.
