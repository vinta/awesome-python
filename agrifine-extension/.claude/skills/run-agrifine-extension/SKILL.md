---
name: run-agrifine-extension
description: Run, build, launch, screenshot, or drive the Agrifine browser extension UI. Use when asked to start, test, verify, or take a screenshot of the extension sidebar or any of its tabs (reading list, data ingest, field profiles, dashboard, AgriAgent).
---

# run-agrifine-extension

Agrifine is a Manifest V3 Chrome extension with a persistent sidebar panel. The sidebar (`dist/sidebar.html`) is driven headlessly via Playwright using the pre-installed Chromium at `/opt/pw-browsers`. A `chrome.*` API stub lets the page render without a real extension context.

All paths below are relative to `agrifine-extension/` (the unit root).

## Prerequisites

Node.js 18+ and Playwright are already in `node_modules` (added as devDependency). Set this env var for every command:

```bash
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
```

## Build

```bash
npm run build
# → dist/ produced, webpack compiled successfully
```

## Run — agent path (driver)

Driver: `.claude/skills/run-agrifine-extension/driver.mjs`
Screenshots land in: `screenshots/`

**Single command:**
```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node .claude/skills/run-agrifine-extension/driver.mjs "ss sidebar_initial"
# → screenshots/sidebar_initial.png
```

**Interactive REPL:**
```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node .claude/skills/run-agrifine-extension/driver.mjs
# agrifine> ss reading-tab
# agrifine> tab agent
# agrifine> ss agent-tab
# agrifine> eval document.querySelector('#main-content').innerHTML.slice(0,200)
# agrifine> quit
```

**Available REPL commands:**

| Command | Effect |
|---|---|
| `ss [name]` | Screenshot → `screenshots/<name>.png` |
| `tab <name>` | Switch tab: `reading`, `ingest`, `fields`, `dashboard`, `carbon`, `agent` |
| `click <selector>` | Click a CSS selector |
| `type <selector> <text>` | Fill an input |
| `eval <js>` | Evaluate JS in page context, print result |
| `quit` | Exit |

## Verified flows (run in this container)

```bash
# Initial sidebar — Reading List tab
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node .claude/skills/run-agrifine-extension/driver.mjs "ss sidebar_initial"

# All 5 tabs
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node -e "..." # (see driver source)
```

Screenshots confirmed: green header, bottom tab bar with 6 tabs (Reading, Ingest, Fields, Dashboard, Carbon, Agent), AgriAgent chat UI with suggested prompts visible.

## Gotchas

- **`chrome.*` APIs are stubbed** — storage reads return null, `sendMessage` returns an error object. The sidebar renders and navigates correctly; AI calls fail gracefully with "No API key set."
- **Extension loaded from `dist/`** — always `npm run build` first. The driver checks for `dist/manifest.json` and exits with a clear error if missing.
- **`PLAYWRIGHT_BROWSERS_PATH` must be set** — without it, Playwright tries to download browsers and fails. Always export it before running the driver.
- **PersistentContext required** — Chrome extensions only load in `launchPersistentContext`, not `launch`. The profile dir is passed as `''` (temp, cleaned up on exit).
- **Tabs are data-attribute driven** — selectors are `[data-tab="reading-list"]` etc. The driver maps short names (`reading`, `agent`) to full attribute values.

## Troubleshooting

| Error | Fix |
|---|---|
| `Cannot find package 'playwright'` | `npm install` inside `agrifine-extension/` |
| `dist/ not found` | `npm run build` |
| `Error: dist/ not found` with correct path | Check `UNIT_ROOT` in driver — must resolve to `agrifine-extension/`, 3 levels up from skill dir |
| Page blank / `#main-content` timeout | Chrome stub missing — ensure `addInitScript` runs before `goto` |
| `ERR_FILE_NOT_FOUND` for sidebar.html | Build produced it at wrong path — check `webpack.config.js` CopyPlugin target |
