# Leela Quest+Psychology AI — Architecture Reference v1.2.0

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LeelaPsychologicalEngine                        │
│                   game/leela_psychological.py                       │
│                                                                     │
│  analyze_turn(session_id, cell_id, cell_type, active_layers, ...)  │
│         │                                                           │
│         ├── asyncio.gather() ──────────────────────────────────┐   │
│         │                                                       │   │
│         │   ┌─────────────┐  ┌──────────┐  ┌────────────────┐ │   │
│         │   │  Jungian    │  │ Freudian │  │      CBT       │ │   │
│         │   │  Analyzer   │  │ Analyzer │  │    Analyzer    │ │   │
│         │   └─────────────┘  └──────────┘  └────────────────┘ │   │
│         │   ┌─────────────┐  ┌──────────────────────────────┐ │   │
│         │   │   Gestalt   │  │   Transactional Analyzer     │ │   │
│         │   │  Analyzer   │  │   (Eric Berne ego-states)    │ │   │
│         │   └─────────────┘  └──────────────────────────────┘ │   │
│         │                                                       │   │
│         └───────────────── layers_dict ◄──────────────────────┘   │
│                    │                                               │
│           ┌────────▼─────────┐                                     │
│           │  EmbeddingSynth  │  ← v2.0 (2+ layers)                 │
│           │  cosine polarity │  ← ConflictSynthesizer fallback     │
│           └────────┬─────────┘                                     │
│                    │ synthesis narrative                            │
│                    ▼                                               │
│           ┌─────────────────┐    ┌──────────────────┐             │
│           │  UnifiedInsight │    │  JournalManager  │ (optional)  │
│           │   (dataclass)   │───►│  snippet record  │             │
│           └─────────────────┘    └──────────────────┘             │
│                    │ user_consent=True                              │
│                    ▼                                               │
│           ┌─────────────────┐                                      │
│           │ EmbeddingClient │  mock | local | openai               │
│           │   embed(text)   │                                      │
│           └────────┬────────┘                                      │
│                    │ float32 vector                                 │
│                    ▼                                               │
│           ┌─────────────────┐                                      │
│           │  VectorStorage  │  AES-GCM encrypted JSONL             │
│           │  (HMAC pseudon) │  FAISS index (optional)              │
│           └─────────────────┘                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Package Structure

```
leela_psychology/
│
├── core/
│   ├── security.py          HMAC-SHA256 pseudonymisation + Fernet AES-GCM
│   └── kms_lite.py          KMS abstraction (AWS KMS / Vault ready)
│
├── storage/
│   ├── vector_storage.py    Encrypted JSONL store; _SAFE_FIELDS PII whitelist
│   └── faiss_adapter.py     FAISS IndexFlatL2 (graceful degradation)
│
├── ai/
│   ├── embedding_client.py  Async embed; mock/local/openai providers; disk cache
│   ├── synthesizer.py       ConflictSynthesizer — static POLARITY_MAP (v1.x)
│   └── embedding_synthesizer.py  EmbeddingSynthesizer — cosine-sim polarity (v2.0)
│
├── agents/
│   ├── qa/
│   │   ├── base_analyzer.py         Abstract BasePsychAnalyzer
│   │   ├── jungian_analyzer.py      Archetypes + alchemical phases
│   │   ├── freudian_analyzer.py     Defence mechanisms
│   │   ├── cbt_analyzer.py          Cognitive distortions
│   │   ├── gestalt_analyzer.py      Gestalt principles
│   │   └── transactional_analyzer.py  Ego-states (Berne TA)
│   ├── feedback/
│   │   └── user_feedback_agent.py   Rating 1-5 validation + anonymised store
│   ├── learning/
│   │   └── self_learning_agent.py   Feedback aggregation + performance metrics
│   └── devops/
│       └── health_agent.py          Liveness/readiness probe (security/storage/ai/synthesis)
│
├── models/
│   └── unified_insight.py   UnifiedInsight, GameEvent, PsychologicalLayer, InsightMetadata
│
├── game/
│   └── leela_psychological.py  Main facade — asyncio.gather + synthesis + journal + metrics
│
├── exporters/
│   └── clinical_exporter.py  Markdown / JSON / PDF clinical reports
│
├── journals/
│   └── journal_manager.py   Session arc journaling (privacy-safe snippet store)
│
├── monitoring/
│   └── metrics_collector.py  Thread-safe rolling-window metrics (avg/min/max/p95)
│
├── web/
│   ├── feedback_api.py      Flask Blueprint + /health + /metrics endpoints
│   └── templates/
│       └── feedback.html    Ukrainian feedback form
│
├── tests/
│   ├── test_anonymization.py       13 privacy & cryptography tests
│   ├── test_integration.py         11 end-to-end pipeline tests
│   ├── test_web_api.py             14 Flask API tests
│   ├── test_embedding_synthesizer.py  17 synthesizer + metrics + health tests
│   └── test_journal_manager.py     13 journaling tests
│
├── docs/
│   ├── clinical_guide.md    Clinical usage guide (therapists + clients)
│   └── architecture.md      This file
│
└── scripts/
    ├── init_secrets.sh      Generate HMAC + Fernet keys
    └── build_release.py     Pre-release validation gate
```

---

## Data Flow — Privacy Architecture

```
User reflection text
        │  (never leaves device in raw form)
        ▼
EmbeddingClient.embed(text)
        │
        ▼  float32 vector (384-dim MiniLM, L2-normalised)
        │
        ├── FAISS IndexFlatL2 (in-memory + optional disk)
        │   No text recoverable from float vectors
        │
        └── VectorStorage.add_insight(embedding, meta)
                │
                ├── _SAFE_FIELDS filter  ← strips session_id, raw text, PII
                │   kept: cell_id, archetype, phase, move_type,
                │          psychological_school, insight_length, processing_time_ms
                │
                ├── HMAC-SHA256(session_id, master_key) → 24-char pseudonym
                │   stored as: session_hash
                │
                └── Fernet.encrypt(json.dumps(safe_meta))
                            │
                            ▼
                    data/vectors/metadata.jsonl.enc
```

**GDPR right-to-erasure:**
```python
vector_storage.delete_by_session_hash(known_hash)   # encrypted rows
journal.delete_session(session_id)                   # journal arc
```

---

## Synthesis Pipeline — v1.x vs v2.0

| | v1.x `ConflictSynthesizer` | v2.0 `EmbeddingSynthesizer` |
|---|---|---|
| Method | Static `POLARITY_MAP` dict lookup | Cosine similarity between concept embeddings |
| Scalability | 8 hardcoded pairs | Any concept from any school |
| Activation | Always | When 2+ layers active |
| Fallback | — | ConflictSynthesizer for single-layer |
| Polarity threshold | Exact key match | `cosine_sim < 0.55` |
| Output | Narrative from dict | Generated from intensity + concept names |

---

## HTTP API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/feedback` | POST | Submit rating (1-5) + comment (≤2000 chars) |
| `/api/feedback/stats` | GET | Aggregate feedback statistics |
| `/api/feedback/<insight_id>` | GET | Per-insight feedback entries |
| `/api/health` | GET | Liveness probe — 200 healthy / 503 degraded |
| `/api/metrics` | GET | Performance metrics snapshot (avg/min/max/p95) |

---

## Key Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `LEE_HMAC_KEY` | HMAC master key (32 hex bytes) | auto-generated (ephemeral) |
| `LEE_FERNET_KEY` | AES-GCM Fernet key | auto-generated (ephemeral) |
| `LEE_EMB_PROVIDER` | Embedding backend: `mock`\|`local` | `mock` |

> **Production:** Generate with `scripts/init_secrets.sh`, store in AWS Secrets Manager or HashiCorp Vault. Rotate via `core/kms_lite.py` pattern.

---

## Test Suite

```
python -m pytest              # from leela_psychology/
python -m pytest tests/ -v    # verbose with traceback

Suite breakdown (69 tests total):
  test_anonymization.py          13  HMAC, Fernet, PII whitelist, GDPR erasure
  test_integration.py            11  Full engine pipeline, consent, journaling
  test_web_api.py                14  Flask endpoints, validation, edge cases
  test_embedding_synthesizer.py  17  EmbeddingSynthesizer, MetricsCollector, HealthAgent
  test_journal_manager.py        13  JournalManager, privacy, path traversal
```
