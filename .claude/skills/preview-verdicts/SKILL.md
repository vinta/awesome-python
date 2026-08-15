---
name: preview-verdicts
description: Generate the interactive keep/drop verdict preview (HTML page with per-row feedback controls) whenever a prune sweep, batch entry edit, or restructure needs maintainer review before touching README.md — and process the feedback JSON the maintainer pastes back.
---

# Verdict preview

Maintainer review happens through an interactive HTML page: one row per entry with your seeded verdict and reason, a Keep/Drop toggle and a reason field for the maintainer, and a **Copy feedback** button that exports only changed or commented rows as JSON. Generate the page, wait for the pasted JSON, then apply it. Entry changes land in README.md only after the review — and only on an explicit go.

## Generate the preview

1. Build the `DATA` array. A group is `[section, subcategory, rows]`; a row is `[entry, url, downloads, verdict, reason]`.
   - `subcategory` may carry a note after ` — ` (rendered muted): use it for proposed splits, re-homes, or anything the maintainer should weigh for the whole group.
   - `downloads` is PyPI last-month as a comma-formatted string; use `—` when no signal exists (e.g. agent skill packs), `stdlib` for standard-library modules, `fetch failed` when the lookup failed. State the fetch date in the sub-header.
   - `verdict` is `keep` or `drop`, seeded from the current adjudication or dry-run.
   - `reason` is plain language the maintainer reads cold — no invented shorthand. When fresh evidence contradicts the seeded verdict (a big download count on a drop, a dead repo on a keep), say so in that row's reason instead of silently changing the seed.
2. Copy `template.html` (sibling of this file) and replace the placeholders: `__TITLE__` (page title), `__SUB__` (sub-header: scope, seed provenance, fetch date, and the standing instruction to flip/comment then Copy feedback), `__KEY__` (localStorage key), `__DATA__` (the array). `__KEY__` must be unique per review — slug plus date, e.g. `awesome-python-science-2026-09-01` — because saved state under a reused key bleeds a previous review's flips into rows with the same section and entry name.
3. Write the page to `/tmp/awesome-python-<slug>-preview.html`, `open` it, and tell the maintainer the path and the return path: flip or comment rows (they highlight yellow), press **Copy feedback**, paste the JSON into the chat. Done when the page is open and the return path is stated.

## Process the pasted feedback

Each JSON row is `{section, subcategory, entry, my_verdict, your_verdict, reason}`. The maintainer's verdict is final — apply it, never re-argue it. An empty reason means the verdict stands unexplained; that is enough.

Before executing, surface anything the flips imply that the maintainer has not decided: a use case pushed past its cap, an entry left homeless by a proposed split, a request that is already satisfied (a no-op). Ask, then execute on their go. Done when every pasted row is either applied or surfaced back — none silently dropped.
