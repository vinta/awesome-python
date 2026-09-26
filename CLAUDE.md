# CLAUDE.md

An opinionated guide to the best Python frameworks, libraries, and tools.

[README.md](README.md) is the single source of content truth; `website/` renders it into the static site: [awesome-python.com](https://awesome-python.com/).

## Entry Rules

[CONTRIBUTING.md](CONTRIBUTING.md) holds the admission rules, quality requirements, rejection rules, entry format, and ordering. Apply it whenever adding or removing an entry — direct commits included, not only PR reviews.

- Every keep/drop reason must be verified against current online data at decision time — download counts, repo activity and archived status, PyPI metadata, project docs. Judging tiers — obvious choice vs challenger — also requires WebSearch evidence (adoption trajectory, community sentiment), not download counts alone. Training-data recollections are not evidence; label anything unverifiable as a judgment call.
- Checks stay read-only: judge whether a listed project installs or works from its PyPI metadata (`requires_python`, classifiers, wheel tags) and issue tracker, never by installing or running it, since that runs untrusted code.
- A download count is not automatically independent demand. When one listed entry depends on another, check `requires_dist` on PyPI before citing the depended-on entry's count: mkdocs-material hard-depends on mkdocs, so mkdocs' figure exceeded mkdocs-material's by only about one percent and nearly all of it was mkdocs-material pulling it in.
- One entry per commit when adding or deleting entries. Exceptions: a prune sweep is one commit per section, its body listing each removal with its reason; format, wording, or categorization changes may be bundled. Cross-section re-homes ride the originating audit's commit (both sides of the move in one diff).
- Resources sections are not project entries: out of audit scope, and the website never parses them.
- Sponsor placement never influences which projects get listed — see [SPONSORSHIP.md](SPONSORSHIP.md).

## Website

- Model the layout on https://www.placestoread.xyz: the whole list on one page, dense rows, a row that expands inline with its content aligned to the Name column, sorting by column headers, full-text search, tags that filter, a divider under the header row instead of a strong top border, a solid dark footer, and minimal decoration. Keep that model (no card grid, modal details, or pagination) unless the maintainer asks, and keep green out of the palette.
- `.section-shell` (`--shell-max: 84rem`) is the only width cap: sections, tables, rows, CTAs, and paragraphs stay uncapped, since the maintainer reads on wide screens and prose-width advice like 65-75ch doesn't apply. Remove inner `max-width` rules you come across, and ask with a concrete reason before adding one.
- Pick font sizes one step larger than feels right (`--text-base` over `--text-sm`, 1.75rem over 1.5rem for a heading), and shrink an existing size only when the maintainer asks: they asked for bigger type 11 times across 8 sessions and never for smaller.
- When you style one link, tag, or label, give its peers the same style in the same change: hero, nav, footer, project, and sponsor links share hover styles, and tag variants build on `.tag`.
