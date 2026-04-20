# Design Context

awesome-python.com is a searchable, filterable index of ~650 curated Python projects. It is a reference tool, not a landing page and not a GitHub README mirror.

## Users

Working Python developers (mid to senior). They already write Python daily and arrive with a specific question in mind: "what's a good HTTP client these days", "is there still a maintained ORM for X", "what are people using for task queues now". Secondary readers: polyglot developers evaluating Python's ecosystem, and curious browsers.

Jobs to be done:

1. Find a library for a specific need fast (search + tag filter).
2. Compare candidates at a glance (stars, last commit, tags, one-line description).
3. Confirm a project is alive before clicking through.

These users skim. They reward density and terse copy. They penalize marketing fluff.

## Brand Personality

Three words: **opinionated, confident, dense**.

Voice:

- Editorial. Every word earns its place.
- Confident, not combative. "This is the list" energy, not "check out these cool projects".
- No hype. The content is what's interesting.
- Calm authority. Closer to a well-edited technical reference (O'Reilly index, The Economist briefing, a good man page) than a blog or product site.

Emotional goals: trust, efficiency, craft. The reader should feel the list was edited by someone with taste, find what they need in seconds, and notice the typographic care as a signal that the curation is careful too.

## Aesthetic Direction

Stay close to the current direction. It works.

- Warm editorial palette in OKLCH. Cream/ivory page, dark earthy hero, warm brown-red accent near `oklch(58% 0.16 45)`.
- Type pairing: `Cormorant Garamond` (serif display, 600) with `Manrope` (sans body, 400/600/700/800). Do not swap.
- Magazine-cover scale for the main headline (`clamp(4.5rem, 11vw, 8.5rem)`), then a tight modular scale for the rest.
- Textured hero: subtle grid, slow sheen, warm radial gradients. Respect `prefers-reduced-motion`.
- Light theme only (`color-scheme: light`). No dark mode toggle, no alternate palettes.
- Table-driven index (sticky header, sortable columns, expandable rows). Not a card grid.
- Dark warm charcoal footer, part of the same system.

References (what to stay close to):

- **https://www.placestoread.xyz** is the primary visual model for the table, expand row, sorting, and footer. "Like placestoread" means dense single-page list, inline click-to-expand rows that indent under the Name column, sortable headers, minimum decoration. When in doubt about a table or row treatment, check placestoread first.
- Magazine reference pages (The Economist, FT Weekend, Monocle).
- Field-guide books. Curated, functional, hand-made.
- Library card catalogs. Dense tabular information, excellent typography, no decoration for decoration's sake.

Color aversions:

- No green. The user rejected it when picking the palette. Warm brown-red, ivory, and dark earthy tones are the established system. Do not introduce green even for success states or ancillary accents.

Anti-references (avoid strictly):

- Generic dark developer-tool look. No cyan on near-black, neon gradients, VSCode-palette dashboards, terminal-green monospace branding.
- Other awesome-* sites. No plain README dumps, bare lists of links, no voice.
- SaaS marketing pages. No big metric counters, testimonial cards, feature grids, pricing tiers, or "join 10,000+ developers" social proof bands.

## Design Principles

1. **The list is the hero.** Hero, sponsor band, and CTA exist, but they must not compete with the table for attention.
2. **Density is a feature.** Prefer tables and tight rhythm over giant cards with one fact each. Mid-senior developers want to see more at once.
3. **Editorial typography over decoration.** Visual interest comes from the serif/sans pairing, type hierarchy, and whitespace. Not from gradients, shadows, badges, or icon boxes above headings.
4. **Warm, not cool.** Neutrals tint toward warm hues (roughly 55 to 80 in OKLCH). Pure grays and cool blues do not belong.
5. **One point of view.** No dark mode, no theme picker, no alternate palettes. Consistency signals curation.

## Implementation Rules

The project already follows these. Future work must keep them.

Layout and sizing:

- Keep existing `--shell-max: 84rem` (~1344px) applied via `.section-shell`. This is the ONLY width cap in the project. Widescreen monitors are the default viewing context.
- Do NOT add `max-width` to sections, cards, table cells, table rows, expanded rows, CTA backgrounds, sponsor descriptions, hero subcopy, paragraphs, or list items. The user has removed narrow inner caps repeatedly (`56ch`, `65-75ch`, etc.). Default is no inner cap.
- The impeccable skill reference rule "cap line length at ~65-75ch" does NOT apply here. Ignore it. Readability at wide widths is carried by vertical rhythm, leading, and the modular type scale instead.
- If you believe a width cap is actually necessary for some specific element, ask first with a concrete reason before adding it.
- Body type floor is 16px (`--text-base: 1rem`). Content-heavy passages may go to 1.125rem.
- When in doubt about any type size, pick one step larger than what the impeccable skill's scale references suggest. The user has repeatedly corrected sizes upward (11+ separate requests across 8 sessions). Never reduce an existing size unprompted. Footer, meta rows, expand content, labels, headings all trend too small by default.
- Row numbers in the table: left-align, no leading zeros. The user tried zero-padding and rejected it.
- Adjacent heading levels differ by at least 0.25rem of rendered size.

Color:

- Use OKLCH for any new color. Not HSL, not hex.
- Accent colors (`--accent`, `--accent-deep`, `--accent-soft`) are reserved for interactive elements. Clickable filter tags (`.tag`) correctly use `--accent-soft` background with `--accent-deep` text. Interactive link states (`.col-name > a:hover`, `.sponsor-link:hover`, `.hero-action-primary`, `.back-to-top`, CTAs) use accent tokens.
- Non-interactive elements (inline code, `.source-badge`, static labels, decorative pills) must use `--ink-muted`, `--ink-soft`, or `--bg-paper-strong`. Never the accent. Users should not mistake static decoration for something clickable.

CSS hygiene:

- CSS custom properties for all colors and repeated values.
- `rem` for spacing and type. `px` only for borders and shadows.
- `gap` over child margins in flex and grid.
- Logical properties (`margin-inline`, `padding-block`) over physical (`margin-left`, `padding-top`).
- Never `!important`. Fix specificity instead.
- Never `text-transform`. Write the casing in the markup.
- Sibling components (card lists, grid items) share identical spacing.

Visual consistency check:

Before shipping any visual change, check peer elements. The user catches inconsistencies repeatedly.

- Hover and focus states: if one link type gets a hover treatment, peer links (hero topbar, footer, project names, sponsor names, expand-meta) share it.
- Tag variants (group, subcat, source, built-in) inherit the base `.tag` style and differ only where a real difference is needed.
- Typography tiers: labels that play the same role share size, weight, and letter-spacing.
- Symmetric gutters: logo left-gap equals logo right-gap, column paddings match across header and body.
- Role-based color tokens: same role uses the same token everywhere. No one-off inline `color: oklch(...)` buried in a rule.

Narrow-screen behavior:

The user actively tests `< 960px` and `< 680px`. Narrow screens must stay functional.

- Do not drop features that the user might want (sort affordance, filter chips, sticky header where reasonable). Hiding is a last resort and requires justification.
- Always run the `playwright-cli` skill at a narrow viewport after any layout change.

Absolute bans (from the impeccable skill):

- No `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, list items, callouts, or alerts. Use a different structure.
- No gradient text (`background-clip: text` on gradients). Solid color only.
- No glassmorphism as default decoration.
- No bounce or elastic easing. Real objects decelerate smoothly.

## Verification

After any frontend change, use the `playwright-cli` skill to visually verify in a real browser. Check layout, responsiveness, and interactive behavior. Do not claim a UI change works based on code alone.
