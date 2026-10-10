# Awesome Python Curation

The editorial domain of awesome-python: which projects the list carries, how they are admitted, and how they are displaced. The list is a curated shortlist of obvious choices, not a catalog of everything good.

## Language

### List structure

**Entry**:
A single listed project: `- [name](url) - Description.` The unit that is admitted, displaced, or pruned. Named by PyPI package name when one exists, else by repository name.

**Sub-item**:
An indented awesome-* also-see link under an Entry (awesome-django under django, awesome-pytest under pytest). Not an Entry: it holds no slot, does not count against the Cap, and rides its parent — re-homed or removed with it. Maintainer-only placement, and only for awesome-* lists: a companion project either earns a full Entry in its proper Use Case or is not listed.

**Bundled Entry**:
An Entry for a feature that ships inside a larger library, framework, or tool rather than as its own PyPI package (django.db.models, geodjango, httpx.URL, uv audit). Marked in README.md by a `(part of X)` description prefix, which the website reads to render a "Bundled" badge where a download count would go. It holds a normal slot and is audited like any other Entry; only its download signal is absent.
_Avoid_: Pointer entry (reform-era name)

**Thematic Group**:
A bold group line (e.g. "AI & ML", "Web Development") that clusters Sections in the TOC and the Projects body.

**Section**:
A `###` heading in README.md (e.g. "Testing", "AI and Agents"). Sections group entries and live under a Thematic Group.
_Avoid_: Category (overloaded — the TOC calls them categories, but rules bind to Use Cases, not Sections)

**Subcategory**:
A named bullet inside a Section with indented entries under it (e.g. "Mock" inside "Testing"). Where present, each Subcategory is one Use Case.

**Use Case**:
The unit of "it" in "one obvious way to do it": one distinct job a reader needs done. Defined by the list's structure — each Subcategory is a Use Case; a flat Section is a single Use Case. Submitters cannot define Use Cases; only the maintainer changes the structure (see Split).
_Avoid_: Niche, micro-category

### Admission

**Serves Python Developers**:
The scope test for what belongs on the list at all: Python developers use it in their Python work. Implementation language and packaging are irrelevant — uv and ty are Rust and belong; a pure-Python library nobody uses in Python work does not.
_Avoid_: Python-first, written-in-Python (old requirement — removed)

**Obvious Choice**:
An entry an experienced Python developer would name unprompted when asked "what do I use for [Use Case]?". Certified by maintainer editorial judgment, informed primarily by PyPI download counts rather than GitHub stars; judgment overrides the signal's known failure modes (CI-inflated counts, model releases consumed as weights rather than pip installs — extended to any project consumed outside pip: SDK downloads like renpy, deployed services like thumbor — and large-but-specific audiences misread as "niche"). A standard-library module holds a slot only when it is itself the Obvious Choice for the Use Case, not merely relevant to it.
_Avoid_: Industry Standard (old lane name), awesome (unfalsifiable)

**Cap**:
The per-Use-Case entry limit: up to 3 Obvious Choices plus up to 2 Challengers, hard maximum 5. A qualitative bar first, a numeric backstop second — and a ceiling, not a floor: a minted Use Case may hold a single entry.

**Displacement**:
The only admission path into a full Use Case: the PR names the entry it replaces and argues the newcomer does that entry's job better. One in, one out.
_Avoid_: One-in-one-out (informal alias)

**Challenger**:
An entry (at most two per Use Case) that is not yet the Obvious Choice but is a credible successor to one. Marked by ordering, not description: within a Use Case, Obvious Choices are listed first, then Challengers, each tier by PyPI downloads/month descending (standard-library modules first in the Use Case outright — always Obvious Choices by the stdlib rule — other no-signal entries last in tier, alphabetically). Admission requires adoption-trajectory evidence, not popularity alone.
_Avoid_: Rising Star (old lane name), Hidden Gem (old lane name — concept removed entirely)

**Second Tier**:
A Challenger slot holding a demoted incumbent instead of a rising successor — a former Obvious Choice or fading community standard an Audit kept below the current Obvious Choices (clickhouse-driver behind the official client, dogpile.cache and django-cacheops behind cachetools and diskcache, django-haystack in Search). It counts against the two Challenger slots and is marked by position like any Challenger; the adoption-trajectory bar gates only new admissions, not demotions.

**Override**:
A maintainer decision, made in an Audit and explicitly recorded, that keeps an entry or use-case shape past a written limit — the activity line, the stability bar, a cap, or a structure rule. Case-by-case: an Override never loosens the written rule for any other entry, and submitters cannot cite one.

**Split**:
Maintainer-only restructuring of an oversized Use Case into finer Use Cases (new Subcategories), considered before any trimming when the size reflects genuinely distinct jobs. A submitter's entry PR can never perform a Split.

### Maintenance

**Audit**:
The recurring maintenance pass over one or more Sections: every Entry's verdict re-verified against current evidence, Challengers promoted or demoted, oversized Use Cases Split, drops and admissions re-decided. The maintainer adjudicates through an interactive preview, and entry changes land only on their explicit go. The 2026-08 shortlist-reform sweeps were the first Audits.
_Avoid_: Sweep (reform-era name for a Section's first Audit)
