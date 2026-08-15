# CLAUDE.md

An opinionated shortlist of Python frameworks, libraries, tools, and resources, published at [awesome-python.com](https://awesome-python.com/). README.md is the single source of content truth; `website/` renders it into the static site.

## Entry Rules

[CONTRIBUTING.md](CONTRIBUTING.md) holds the admission rules, quality requirements, rejection rules, entry format, and ordering. Apply it whenever adding or removing an entry — direct commits included, not only PR reviews.

- Every keep/drop reason must be verified against current online data at decision time — download counts, repo activity and archived status, PyPI metadata, project docs. Training-data recollections are not evidence; label anything unverifiable as a judgment call.
- One entry per commit when adding or deleting entries. Exceptions: a prune sweep is one commit per section, its body listing each removal with its reason; format, wording, or categorization changes may be bundled.
- Sponsor placement never influences which projects get listed — see [SPONSORSHIP.md](SPONSORSHIP.md).

## Gotchas

- On machines with only Python 3.14, prefix uv-based make targets with `UV_PYTHON=3.13` — watchdog 6.0.0 ships no 3.14 wheel and the project sets `no-build`.
