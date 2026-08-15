# AGENTS.md

An opinionated guide to the best Python frameworks, libraries, tools, and resources.

[README.md](README.md) is the single source of truth for catalog entries and README sponsor placements; `website/` renders it into the static site: [awesome-python.com](https://awesome-python.com/).

## Entry Rules

[CONTRIBUTING.md](CONTRIBUTING.md) holds the admission rules, quality requirements, rejection rules, entry format, and ordering. Apply it whenever adding or removing an entry — direct commits included, not only PR reviews.

- Every keep/drop reason must be verified against current online data at decision time — download counts, repo activity and archived status, PyPI metadata, project docs. Judging tiers — obvious choice vs challenger — also requires WebSearch evidence (adoption trajectory, community sentiment), not download counts alone. Training-data recollections are not evidence; label anything unverifiable as a judgment call.
- One entry per commit when adding or deleting entries. Exceptions: a prune sweep is one commit per section, its body listing each removal with its reason; format, wording, or categorization changes may be bundled.
- Sponsor placement never influences which projects get listed — see [SPONSORSHIP.md](SPONSORSHIP.md). `website/templates/sponsorship.html` separately defines the sponsorship content on the published website page.

## Gotchas

- On machines with only Python 3.14, prefix uv-based make targets with `UV_PYTHON=3.13` — watchdog 6.0.0 ships no 3.14 wheel and the project sets `no-build`.
