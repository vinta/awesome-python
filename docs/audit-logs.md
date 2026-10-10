# Audit Log

awesome-python is audited section by section. Every entry gets re-verified against live data, and every removal lands in a commit whose body carries the reason. Git history is the archive. This file is the at-a-glance register of maintainer decisions that a single commit can't show.

## Overrides

[CONTRIBUTING.md](../CONTRIBUTING.md) allows the maintainer to exceed any limit for a specific entry or use case. Each override is recorded here.

### Naming Exceptions

Display names follow the canonical PyPI package name. These entries keep a different name by maintainer decision:

- autobahn-python -- `autobahn`.
- django-rest-framework -- `djangorestframework`.
- django-rules -- `rules`.
- fasthtml -- `python-fasthtml`.
- graphify -- `graphifyy`.
- jinja -- `Jinja2`.
- mem0 -- `mem0ai`.
- pangu.py -- `pangu`.
- playwright-python -- `playwright`.
- pytorch -- `torch`.
- strawberry -- `strawberry-graphql`.
- strawberry-django -- `strawberry-graphql-django`.
- thealgorithms -- not on PyPI; its GitHub repo name is `Python`.

### Stability Exceptions

Entries admitted despite the Stable quality requirement, by maintainer decision:

- zensical -- admitted 2026-08-23 at version 0.0.57, PyPI classifier `Development Status :: 3 - Alpha`, with no 1.0 target announced. Admitted as a challenger displacing mkdocs because the Documentation section was carrying a dying upstream: the Material for MkDocs team's announcement of 2025-11-05 put Material into maintenance mode for twelve months and called MkDocs itself unmaintained since 2024-08 and a supply chain risk. Re-check when 1.0 lands.
- openviking -- admitted 2026-08-25 (PR #3302) at version 0.4.16, PyPI classifier `Development Status :: 3 - Alpha`, with a README that said "OpenViking is still in its early stages". Admitted as a Data Layer challenger because the adoption is real: 459,446 downloads/month on pypistats (mirror-excluded) on 2026-08-24, and releases every few days. Re-check when 1.0 lands.
- claude-agent-sdk -- kept 2026-10-01 in the AI and Agents audit at version 0.2.163, PyPI classifier `Development Status :: 3 - Alpha`. Kept as a Vendor Agent SDKs obvious choice because the adoption is real: 30,033,689 downloads/month on ClickPy on 2026-10-01, up from 1.2M in March 2026 on pypistats. Re-check when 1.0 lands.
- uv-audit -- kept 2026-08-16 as a Supply Chain Security entry, recorded 2026-10-02. uv itself prints "`uv audit` is experimental and may change without warning". Kept because it is part of uv, the obvious package manager. Re-check when uv drops the experimental notice.

### Challenger Exceptions

Entries admitted as challengers without adoption-trajectory evidence, by maintainer decision:

- seleniumbase -- admitted 2026-08-16 (PR #3284) as a Browser Automation challenger. It wraps selenium, the successor trajectory in the use case belongs to playwright, and its distinct value is its stealth/UC mode. Admitted because that stealth value counts toward Browser Automation.
- semantica -- kept 2026-10-01 in the AI and Agents audit as a Data Layer challenger at 16,582 downloads/month on ClickPy, with no adoption-trajectory evidence found. Kept by maintainer decision.
- jev-ultrafast -- kept 2026-09-24 as a Web Scraping Frameworks challenger, recorded 2026-10-02. Admitted while the repo was under a month old and not on PyPI, so it has no download signal and no adoption-trajectory evidence; its README calls it an MVP and it needs a hosted TypeSafe API key. Kept by maintainer decision.

### Cap Exceptions

Use cases holding more than 5 entries, by maintainer decision:

- Asynchronous Programming > Async I/O -- 6 entries since the 2026-08-16 split (19875cf), recorded 2026-10-02.
- Code Analysis > Linters and Formatters -- 6 entries since Security Linters merged in on 2026-08-16 (3290ce5), recorded 2026-10-02.
- Package Management > Package Managers -- 6 entries since the subcategory was minted on 2026-08-16 (1b51907), recorded 2026-10-02.

### Mature-stable Keeps

These entries sit past the 12-month activity requirement without an override. Each one is kept by editorial judgment: mature, stable, and no successor exists.

- annoy -- kept 2026-10-02 in the AI & ML audit, last push 2025-10-29. Unlike the others it has a successor, Spotify's own Voyager (2023), but kept by maintainer decision on 911,913 downloads/month on pypistats.
- blinker -- recorded 2026-10-02 ahead of its activity-line crossing on 2026-11-19 (last push 2025-11-19, last release 1.9.0 on 2024-11-08). Flask requires it.
- diskcache -- kept 2026-10-02, last push 2024-08-10, last release 5.6.3 (2023-08-31). Kept despite an unpatched pickle deserialization advisory, CVE-2025-69872 (GHSA-w8v5-vhqr-4h9v), on 25,526,045 downloads/month on ClickPy.
- django-rules -- recorded 2026-10-02 ahead of its activity-line crossing on 2026-10-11 (last push 2025-10-11, last release 3.5 on 2024-09-02).
- ftfy
- httpie -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-12-17, last release 3.2.4 on 2024-11-01.
- itsdangerous
- jieba
- jinja
- python-pptx -- kept 2026-10-02, last commit 2024-08-06, last release 1.0.2 on 2024-08-07. No successor for generating .pptx files.
- schedule -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-05-25.
- sortedcontainers
