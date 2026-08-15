---
name: audit-the-list
description: Audit README.md sections against the shortlist rules — re-verify every entry's verdict with live data, promote or demote challengers, restructure oversized use cases, prune, and evaluate proposed additions. Fire when the maintainer asks to audit, sweep, prune, re-check, or maintain sections, or asks whether an entry (or a proposed one) deserves its slot.
argument-hint: [all or specific groups or sections]
---

# Audit the list

An Audit re-runs the admission test over live sections of README.md: every entry re-verified against current data, tiers reassessed, structure reconsidered, then the maintainer adjudicates and the result is committed. The rules live in CONTRIBUTING.md (Admission, Evidence, Entry Ordering) and CONTEXT.md (vocabulary) — this skill is the process that applies them, not a second copy of them. Entry changes land only on the maintainer's explicit go.

## 1. Scope

Resolve the scope from the arguments. Named sections mean exactly those, whether or not they were audited before (a re-run is how a past verdict gets rechecked). `all` is ambiguous — `AskUserQuestion` whether it means every section or only never-audited ones; prior audits are recorded in git history (`git log --oneline --grep="sweep\|audit"`). With no arguments, AskUserQuestion listing the never-audited Thematic Groups. Batch the work one Thematic Group per sitting. Done when the section list is settled.

## 2. Evidence

Fetch live evidence for every entry in scope before judging anything (CLAUDE.md verification rule):

- **Downloads/month**: `cd website && UV_PYTHON=3.13 uv run python fetch_pypi_downloads_via_clickpy.py` — free keyless ClickPy sweep of the full README, sole writer of `data/pypi_downloads.tsv` (rewritten from scratch each run). Cross-checks print to stdout, take explicit names, and never touch the cache: `fetch_pypi_downloads_via_bigquery.py <name> ...` (canonical source, maintainer's own GCP account, `--dry-run` first — the docstring carries the cost constraints; full-README sweeps exceed the free tier, keep name lists small), `fetch_pypi_downloads_via_pepy.py <name> ...` (needs `PEPY_TECH_API_KEY` in repo-root `.env`, throttled to 5 requests/minute), or `https://pypistats.org/api/packages/{name}/recent` paced 8s or slower. pypistats excludes mirror/CI traffic; ClickPy, BigQuery, and pepy include it — never mix sources within one comparison.
- **Repo state**: archived flag, last push, created date, stars, description — `gh api repos/{owner}/{repo}`, GitLab API for GitLab-hosted projects.
- **PyPI metadata** (`https://pypi.org/pypi/{name}/json`) wherever a name might not be the canonical package — ownership collisions and wrong display names surface here.

Done when every entry in scope has downloads (or a stated no-signal reason), repo state, and a confirmed PyPI name.

## 3. Verdicts

Draft a verdict and reason for every entry, restructure before cap: decide Splits, mints, and re-homes first — cutting before restructuring destroys entries — then apply the cap tier by tier, including promotions and demotions between obvious choice and challenger. Ground every reason in the fetched evidence; label anything unverifiable as a judgment call. Where fresh evidence contradicts the standing verdict, say so in the reason instead of silently keeping the seed.

## 4. Review and go

Run the `preview-verdicts` skill: it generates the interactive review page and defines how the maintainer's feedback JSON comes back and gets processed. Their verdicts are final. Before touching README.md, surface what the feedback implies but does not decide — cap overflows, homeless entries after a Split, tier for a tierless flip — as named assumptions or questions, then get an explicit go.

## 5. Execute

One commit per section: body lists each removal with its reason and downloads figure; restructures, tier moves, and reorders ride the same commit. Format-only outcomes (no removals) are a single style commit. `UV_PYTHON=3.13 make test` before every commit, `UV_PYTHON=3.13 make build` after the last one. Generic commit helpers tend to split a section audit into structural and per-subcategory commits — if that happens, squash back to one commit per section. Done when the tree is clean, tests passed before each commit, and the build count reconciles with the adjudicated changes.

## 6. Record

A conclusion that outlives the sitting goes into the repo before the audit ends: admission or evidence rules into CONTRIBUTING.md, repo process and environment facts into CLAUDE.md and AGENTS.md (kept in sync), vocabulary into CONTEXT.md. Done when nothing the next audit needs is stranded in conversation.
