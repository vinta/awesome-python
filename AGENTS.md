# AGENTS.md

An opinionated guide to the best Python frameworks, libraries, and tools.

[README.md](README.md) is the source of truth for entries, and `website/data/category_intros/` holds the category page intros; `website/` renders both into [awesome-python.com](https://awesome-python.com/).

## Entry Rules

Apply [CONTRIBUTING.md](CONTRIBUTING.md) (admission, entry format, ordering) whenever adding, removing, or rewording an entry, direct commits included.

- Verify every keep/drop reason against current online data at decision time: download counts, repo activity and archived status, PyPI metadata, project docs. Tier calls (obvious choice vs challenger) also need WebSearch evidence of adoption trajectory and community sentiment. Training-data recollections are not evidence; label anything unverifiable as a judgment call.
- Checks stay read-only: judge whether a listed project installs or works from its PyPI metadata (`requires_python`, classifiers, wheel tags) and issue tracker, never by installing or running it, since that runs untrusted code.
- A download count is not automatically independent demand. When one listed entry depends on another, check `requires_dist` on PyPI before citing the depended-on entry's count: mkdocs-material hard-depends on mkdocs, so mkdocs' figure exceeded mkdocs-material's by only about one percent and nearly all of it was mkdocs-material pulling it in.
- One entry per commit when adding or deleting entries. Exceptions: a prune sweep is one commit per section, its body listing each removal with its reason; format, wording, or categorization changes may be bundled. Cross-section re-homes ride the originating audit's commit (both sides of the move in one diff).
- Resources sections are not project entries: out of audit scope, and the website never parses them.
- Sponsor placement never influences which projects get listed — see [SPONSORSHIP.md](SPONSORSHIP.md).

## Website

Read [DESIGN.md](DESIGN.md) before changing anything under `website/templates/` or `website/static/`.
