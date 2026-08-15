---
status: proposed
---

# awesome-python is a shortlist of obvious choices, not a catalog

By mid-2026 the list held 576 entries across 75 sections, with entry inflow up 24x year over year (96 additions in the trailing 12 months vs 4 the year before), concentrated in sections like AI and Agents (41 entries). The old acceptance model — three lanes (Industry Standard, Rising Star, Hidden Gem), only the first capped — admitted any project good enough in isolation, so categories grew without bound and stopped answering the reader's actual question: "what do I use for X?" We decided to reposition the list as a curated shortlist, per the Zen of Python: there should be one — and preferably only one — obvious way to do it.

## The decision

Each Use Case (a subcategory, or a flat section) lists at most its Obvious Choices — up to 3, plus up to 2 marked Challengers, hard maximum 5 (numbers provisional, to be reviewed after the prune). Admission is by maintainer editorial judgment, informed primarily by PyPI download counts rather than GitHub stars, and stated as final. Once a Use Case is at cap, the only way in is Displacement: the PR names the entry it replaces and argues the newcomer does that job better. Use Cases are defined by the list's existing structure; an entry PR can never create the subcategory it needs. Standard-library entries hold a slot only where the stdlib module is itself the obvious choice. The existing stock gets the same test retroactively: a staged, worst-first prune (per-section sweep commits), with removed entries deleted outright — git history is the archive. Resources sections (Newsletters, Podcasts, Websites) are out of scope for now.

## Considered options

- Keep the three-lane model with caps on every lane: rejected because the lanes answer the wrong question ("is this good enough to enter?") once admission is comparative; rising-star momentum becomes Displacement evidence rather than an admission ticket, and Hidden Gem is definitionally incompatible with "obvious".
- Rules-only, no retroactive prune: rejected because every rejection would face "but X is listed" precedent arguments, and readers would see no change.
- Archive removed entries in a separate file: rejected because it recreates the catalog one click away and dilutes the identity the change exists to restore.

## Consequences

- The steady-state list shrinks toward roughly 400 entries or fewer (Testing dry run: 23 → 14); most future PRs will be rejected for fullness, not badness.
- awesome-python.com loses long-tail search traffic for the hundreds of niche tool names it will no longer carry. Accepted deliberately: reader trust over search surface.
- Fast-moving domains (e.g. AI and Agents) list current leaders by usage and absorb churn through Displacement; an oversized Use Case is either trimmed or Split into finer Use Cases by the maintainer.
- Linked awesome-* lists (e.g. awesome-python-testing) remain as the escape valve for readers who want exhaustive catalogs.

See CONTEXT.md for the vocabulary (Use Case, Obvious Choice, Challenger, Displacement, Split).
