---
version: alpha
name: awesome-python.com
description: Warm editorial Python index. Light cream canvas, brown-red interactive accent, Cormorant Garamond plus Manrope, table-driven reference.
---

# awesome-python.com DESIGN.md

awesome-python.com is a searchable, filterable index of curated Python projects. It is a reference tool, not a landing page and not a GitHub README mirror.

This file follows the [Google Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/overview). Token values live in `website/static/style.css`; this file names each token's role. Colors are OKLCH, a deliberate divergence from the spec's hex-only token requirement.

## Overview

Three words: **opinionated, confident, dense**.

Working Python developers (mid to senior) are the target reader. They write Python daily and arrive with a specific question in mind: "what's a good HTTP client these days", "is there still a maintained ORM for X", "what are people using for task queues now". Secondary readers: polyglot developers evaluating Python's ecosystem, and curious browsers.

Jobs to be done:

1. Find a library for a specific need fast (search + tag filter).
2. Compare candidates at a glance (downloads, stars, last commit, tags, one-line description).
3. Confirm a project is alive before clicking through.

These users skim. They reward density and terse copy. They penalize marketing fluff.

Voice:

- Editorial. Every word earns its place.
- Confident, not combative. "This is the list" energy, not "check out these cool projects".
- No hype. The content is what's interesting.
- Calm authority. Closer to a well-edited technical reference (O'Reilly index, The Economist briefing, a good man page) than a blog or product site.

Emotional goals: trust, efficiency, craft. The reader should feel the list was edited by someone with taste, find what they need in seconds, and notice the typographic care as a signal that the curation is careful too.

Reference points (stay close to these):

- **https://www.placestoread.xyz** is the primary visual model for the table, expand row, sorting, and footer. "Like placestoread" means a dense list (the home page holds every project in one table), inline click-to-expand rows that indent under the Name column, sortable headers, a divider under the header row instead of a strong top border, minimum decoration. When in doubt about a table or row treatment, check placestoread first.
- Magazine reference pages (The Economist, FT Weekend, Monocle).
- Field-guide books. Curated, functional, hand-made.
- Library card catalogs. Dense tabular information, excellent typography, no decoration for decoration's sake.

Anti-references (avoid strictly):

- Generic dark developer-tool look. No cyan on near-black, neon gradients, VSCode-palette dashboards, terminal-green monospace branding.
- Other awesome-\* sites. No plain README dumps, bare lists of links, no voice.
- SaaS marketing pages. No big metric counters, testimonial cards, feature grids, pricing tiers, or "join 10,000+ developers" social proof bands.

Design principles:

1. **The list is the hero.** Hero, sponsor band, and CTA exist, but they must not compete with the table for attention.
2. **Density is a feature.** Prefer tables and tight rhythm over giant cards with one fact each. Mid-senior developers want to see more at once.
3. **Editorial typography over decoration.** Visual interest comes from the serif/sans pairing, type hierarchy, and whitespace. Not from gradients, shadows, badges, or icon boxes above headings.
4. **Warm, not cool.** Neutrals tint toward warm hues (roughly 55 to 80 in OKLCH). Pure grays and cool blues do not belong.
5. **One point of view.** No dark mode, no theme picker, no alternate palettes. Consistency signals curation.

## Colors

Warm editorial palette. Light theme only (`color-scheme: light`). OKLCH only.

Surfaces:

- `--bg-page`. Cream/ivory canvas, the body floor. The body uses a vertical gradient from `--bg-page-top` through `--bg-page` (at 24rem) to `--bg-page-end`, with a soft radial highlight in the top-left corner.
- `--bg-paper`. Warm white for the content shell.
- `--bg-paper-strong`. Tinted paper for sponsor band, CTA backgrounds, static decoration.
- `--hero-bg-start` → `--hero-bg-mid` → `--hero-bg-end`. Dark earthy hero gradient.
- `--footer-bg`. Dark warm charcoal footer, part of the same system.

Ink:

- `--ink`. Body text.
- `--ink-soft`. Secondary copy.
- `--ink-muted`. Meta rows, captions, static labels.
- `--line` / `--line-strong`. Hairlines and dividers.

Accent (warm brown-red, reserved for interactive):

- `--accent`. Primary accent.
- `--accent-deep`. Link text, hover.
- `--accent-soft`. Tinted background for filter tags.
- `--accent-underline`. Subtle text-decoration-color.

Rules:

- Use OKLCH for any new color. Not HSL, not hex.
- Accent tokens (`--accent`, `--accent-deep`, `--accent-soft`) are reserved for interactive elements. Clickable filter tags (`.tag`) correctly use `--accent-soft` background with `--accent-deep` text. Interactive link states (`.col-name > a:hover`, `.sponsor-link:hover`, `.hero-action-primary`, `.back-to-top`, CTAs) use accent tokens.
- Non-interactive elements (inline code, `.source-badge`, static labels, decorative pills) must use ink tokens (`--ink`, `--ink-soft`, `--ink-muted`) on `--bg-paper-strong` or `--bg-paper`, never the accent. `.source-badge` uses `--ink-soft`; `.sponsorship-body code` uses `--ink`. Users should not mistake static decoration for something clickable.
- Same role uses the same token everywhere. No one-off inline `color: oklch(...)` buried in a rule.

Aversions:

- **No green.** The maintainer rejected it when picking the palette. Warm brown-red, ivory, and dark earthy tones are the established system. Do not introduce green even for success states or ancillary accents.
- No cyan, no neon gradients, no pure grays, no cool blues.

## Typography

Pairing (do not swap):

- **Display**: `Cormorant Garamond` (serif, 600 only).
- **Body**: `Manrope` (sans, 400 / 600 / 700 / 800).

Cormorant Garamond sets headings and standalone names only, never running sentences, and never on the same line as Manrope. Its short x-height and thin strokes tire the eye across a paragraph, and next to Manrope on one baseline the two x-heights clash. Ledes and other multi-line copy use Manrope (`--text-2xl`); a display name with a description stacks the name above it, as in the sponsor band.

Scale:

| Role             | Token             | Size                             | Family             | Weight    | Notes                                             |
| ---------------- | ----------------- | -------------------------------- | ------------------ | --------- | ------------------------------------------------- |
| Hero headline    | (literal `clamp`) | `clamp(4.5rem, 11vw, 8.5rem)`    | Cormorant Garamond | 600       | Magazine-cover scale, single use on the hero      |
| Page title       | `--display-lg`    | `clamp(3.6rem, 9vw, 7rem)`       | Cormorant Garamond | 600       | Category and sponsorship `h1`                     |
| Section heading  | `--display-md`    | `clamp(2.25rem, 4.2vw, 3.3rem)`  | Cormorant Garamond | 600       | Guide, results, CTA `h2`, sponsor name            |
| Display small    | `--display-sm`    | `clamp(1.75rem, 2.8vw, 2.25rem)` | Cormorant Garamond | 600       | Group-row `h2`, past sponsor names                |
| Lede             | `--text-2xl`      | `1.5rem`                         | Manrope            | 400       | Category intro first paragraph, sponsorship ledes |
| Subtitle         | `--text-xl`       | `1.25rem`                        | Manrope            | 400       | Hero and category subtitles, category intro       |
| Body large       | `--text-lg`       | `1.125rem`                       | Manrope            | 400       | Content-heavy passages, project names, search     |
| Body             | `--text-base`     | `1rem` (16px)                    | Manrope            | 400       | Body floor                                        |
| Meta / secondary | `--text-sm`       | `0.95rem`                        | Manrope            | 400 / 600 | Meta rows, secondary copy                         |
| Caption / pill   | `--text-xs`       | `0.8rem` (12.8px)                | Manrope            | 600 / 700 | Smallest token, pills, badges, tags, footnotes    |

Hard-won sizing rules (do not relax):

- **Every `font-size` uses a scale token.** The literal exceptions are the hero headline, `.tier-amount`, the sort `.arrow` glyph, and `em` sizes on inline code and `kbd`. Body tokens are fixed `rem`; only display tokens are fluid, because `vw` in body text does not grow with browser zoom. Round a new size up to the next token instead of adding an in-between step: sizes 1 to 2px apart read as noise, not hierarchy.
- **Body type floor is 16px.** Do not go smaller.
- **Absolute minimum font size is 12px (`0.75rem`) for ANY text**, including pills, badges, tags, captions, footnotes. Anything smaller hits Chrome's default minimum-font-size floor and renders inconsistently across browsers and user accessibility settings.
- **When in doubt, pick one step larger** than what generic scale references suggest (`--text-base` over `--text-sm`, 1.75rem over 1.5rem for a heading). The maintainer has corrected sizes upward 11+ times across 8 sessions. Footer, meta rows, expand content, labels, and headings all trend too small by default. **Never reduce an existing size unprompted.**
- Adjacent heading levels differ by at least 0.25rem of rendered size.
- Row numbers in the table: left-align, no leading zeros. Zero-padding was tried and rejected.
- **Cormorant Garamond numerals use lining figures** (`font-variant-numeric: lining-nums`). Its default old-style figures shrink zeros to x-height and drop 3/4/5/7/9 below the baseline, so a price like `$500` reads as `$5oo`.
- **Never `text-transform`.** Write the casing in the markup.

## Layout

- **Single width cap: `--shell-max: 84rem` (~1344px) applied via `.section-shell`.** This is the ONLY width cap in the project. Widescreen monitors are the default viewing context.
- **Do NOT add `max-width`** to sections, cards, table cells, table rows, expanded rows, CTA backgrounds, sponsor descriptions, hero subcopy, paragraphs, or list items. The maintainer has removed narrow inner caps repeatedly (`56ch`, `65-75ch`, etc.). Default is no inner cap; remove any inner cap you come across. The "cap line length at ~65-75ch" rule does NOT apply here: readability at wide widths is carried by vertical rhythm, leading, and the modular type scale instead.
- If a width cap is genuinely necessary for a specific element, ask first with a concrete reason before adding it.
- Shell padding: `--shell-pad: clamp(1.25rem, 3vw, 2.5rem)`. Symmetric gutters: logo left-gap equals logo right-gap, column paddings match across header and body.
- `gap` over child margins in flex and grid.
- Logical properties (`margin-inline`, `padding-block`) over physical (`margin-left`, `padding-top`).
- `rem` for spacing and type. `px` only for borders and shadows.
- CSS custom properties for all colors and repeated values.
- Sibling components (card lists, grid items) share identical spacing.
- Use flexbox or grid for layout. Avoid floats and absolute positioning except for genuine overlay cases (focus rings, sticky headers).
- Never `!important`, except in the `prefers-reduced-motion` reset. Fix specificity instead.

## Elevation & Depth

Depth comes from **tonal layers**, not heavy shadows.

- The page is a quiet warm canvas (`--bg-page`). The content shell is slightly brighter paper (`--bg-paper`). The sponsor band, CTA backgrounds, and inline decorative blocks step up to `--bg-paper-strong`.
- The hero and the category guide band are the only places with real atmosphere: warm gradients on a dark earthy ground (`--hero-bg-start` → `--hero-bg-mid` → `--hero-bg-end`). Only the hero adds the subtle grid and slow sheen. The sheen and any other motion respect `prefers-reduced-motion`.
- The footer is a single tonal block in `--footer-bg`, no internal gradients.
- Two depth treatments are allowed and only these two. The search input combines a 1px inset highlight (`--search-inset`) with a soft warm drop shadow (`--search-shadow`, intensified by `--search-focus-shadow` on focus). The primary CTA button (`.hero-action-primary`) carries a warm drop shadow for press affordance. Both shadows are soft, warm-tinted, and tied to interactive elements. No new drop shadows on cards, panels, rows, or static decoration.
- No glassmorphism as default decoration.
- No bounce or elastic easing. Real objects decelerate smoothly.

## Shapes

The shape language is overwhelmingly **pill on small, zero radius on large**.

- **Pills** (`border-radius: 999px`) for tags, search, sponsor logo chip, source badges, back-to-top, and primary CTA buttons.
- **`0.4rem`** is used only on inline `<code>` in category intros, the guide band, and `.sponsorship-body`. Do not introduce a tokenized radius scale. The project does not need one.
- Containers use the page surface itself, not rounded panels. When a panel is needed, prefer pill on small chips and zero radius on large surfaces.
- **No `border-left` or `border-right` greater than 1px as a colored accent stripe** on cards, list items, callouts, or alerts. Use a different structure.

## Components

The component vocabulary is small and table-led. Source of truth: `website/static/style.css`.

- **Table-driven index** (the hero of the page). Sticky header, sortable columns, click-to-expand rows that indent under the Name column. Modeled on placestoread.xyz. Not a card grid.
- **Group rows**. Section, subcategory, and group pages list rows in README order. Section pages add one H2 row per use case; group pages add one per section, linking to that section's page. A note replaces the sort arrow until someone sorts a column, which flattens the list and hides the group rows.
- **Filter tags** (`.tag`). `--accent-soft` background with `--accent-deep` text. Pill shape. Hover swaps to `--highlight` background with `--tag-hover-border` border and ink text. Active state uses the warm `--tag-active-start` → `--tag-active-end` gradient with hero-ink text. Tag variants (`tag-group`, `tag-source`) inherit the base `.tag` style today and differ only at narrow widths (`tag-group` hides under 960px). Add a new variant only when a real visual difference is needed.
- **Hero**. Magazine-cover headline, dark earthy ground, kicker and proof microcopy, primary CTA button using `--hero-btn-start` / `--hero-btn-end`. Subtle grid plus slow sheen. Respects `prefers-reduced-motion`.
- **Jump links**. One per use case in a category hero, plus one for the guide. Underlined like the intro's links, with a trailing ↓. Never tag-styled: tags filter the table or open another page, jump links only scroll.
- **Guide band**. Everything in a category intro after its "How to choose" list. It sits below the table on the hero's dark gradient, with its H2 above the text.
- **Sponsor band**. Sits below the hero on the home page and category pages, on `--bg-paper-strong`. Editorial layout, not a logo wall. Sponsor links share the global accent treatment.
- **CTA**. Warm `--cta-bg`, full-bleed within shell. The button itself uses accent tokens.
- **Footer**. Dark warm charcoal, part of the same system. Footer links share the global hover and focus treatment.
- **Search**. Pill input with `--search-inset` interior and `--search-focus-ring` focus ring. Focus shadow uses `--search-focus-shadow`.
- **Source badge / inline code**. Static decoration on `--bg-paper-strong`. `.source-badge` uses `--ink-soft` text in pill shape; `.sponsorship-body code` uses `--ink` text with the `0.4rem` radius. Never the accent.

## Do's and Don'ts

- **Don't** replace the table with a card grid, modal details, or pagination.
- **Don't** use gradient text (`background-clip: text` on gradients). Solid color only.

## Narrow-Screen Behavior

The maintainer actively tests `< 960px` and `< 680px`. Narrow screens must stay functional.

- Do not drop features readers might want (sort affordance, filter chips, sticky header where reasonable). Hiding is a last resort and requires justification.

## Iteration Guide

Run this audit after generating or modifying a screen. Failure on any item means revise before moving on.

1. **Width caps.** Inspect every section, card, paragraph, table cell, expanded row, CTA, sponsor description, hero subcopy. Only `.section-shell` (`--shell-max: 84rem`) may cap width. Anything else with a `max-width` is wrong.
2. **Accent reservation.** Grep the changed CSS for `--accent`, `--accent-deep`, `--accent-soft`. Each match must back an interactive element (link, button, focus ring, filter tag). Static decoration must use ink tokens (`--ink`, `--ink-soft`, `--ink-muted`) on `--bg-paper-strong` or `--bg-paper`.
3. **Shape language.** Containers are square or pill. Anything in the 4px-to-16px radius range is suspect. The `0.4rem` on inline code is the only allowed exception.
4. **Type sizes.** Confirm no rendered text falls below 12px. If a size feels small to a mid-senior reader on a 27-inch display, bump one step up. Never reduce an existing size.
5. **Peer consistency.** Compare against the closest peer element. Peer links (hero topbar, footer, project names, sponsor names, expand-meta) share hover and focus treatment; tag variants inherit the base `.tag` style; labels that play the same role share size, weight, and letter-spacing. Color token and gutter must match unless there is a stated reason to differ.
6. **Browser check.** Run the `playwright-cli` skill at full width, `< 960px`, and `< 680px`. Check layout and interactive behavior; sort affordance, filter chips, and sticky header must remain functional. Do not claim a UI change works based on code alone.

## Known Gaps

- **No formal spacing or radius scale.** The codebase uses `clamp()` and ad-hoc rem values rather than a tokenized scale. Adding one would be invention, not documentation.
