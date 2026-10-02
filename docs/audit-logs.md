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
- jinja -- `Jinja2`.
- mem0 -- `mem0ai`.
- pangu.py -- `pangu`.
- playwright-python -- `playwright`.
- pytorch -- `torch`.
- strawberry -- `strawberry-graphql`.
- strawberry-django -- `strawberry-graphql-django`.

### Stability Exceptions

Entries admitted despite the Stable quality requirement, by maintainer decision:

- zensical -- admitted 2026-08-23 at version 0.0.57, PyPI classifier `Development Status :: 3 - Alpha`, with no 1.0 target announced. Admitted as a challenger displacing mkdocs because the Documentation section was carrying a dying upstream: the Material for MkDocs team's announcement of 2025-11-05 put Material into maintenance mode for twelve months and called MkDocs itself unmaintained since 2024-08 and a supply chain risk. Re-check when 1.0 lands.
- openviking -- admitted 2026-08-25 (PR #3302) at version 0.4.16, PyPI classifier `Development Status :: 3 - Alpha`, with a README that said "OpenViking is still in its early stages". Admitted as a Data Layer challenger because the adoption is real: 459,446 downloads/month on pypistats (mirror-excluded) on 2026-08-24, and releases every few days. Re-check when 1.0 lands.
- claude-agent-sdk -- kept 2026-10-01 in the AI and Agents audit at version 0.2.163, PyPI classifier `Development Status :: 3 - Alpha`. Kept as a Vendor Agent SDKs obvious choice because the adoption is real: 30,033,689 downloads/month on ClickPy on 2026-10-01, up from 1.2M in March 2026 on pypistats. Re-check when 1.0 lands.
- keras -- kept 2026-10-02 in the AI & ML audit as a Deep Learning Frameworks Second Tier challenger at version 3.15.1, PyPI classifier `Development Status :: 4 - Beta`. Kept because Keras 3 is a production multi-backend API; the classifier lags the project.
- stanza -- kept 2026-10-02 in the AI & ML audit as an NLP General challenger at version 1.15.0, PyPI classifier `Development Status :: 4 - Beta`. Kept because it is Stanford NLP's official library with releases through 2026-10-01; the classifier lags the project.
- kornia -- kept 2026-10-02 in the AI & ML audit as a Computer Vision General challenger at version 0.8.3, PyPI classifier `Development Status :: 4 - Beta`. Kept on 2,181,803 downloads/month on pypistats; the classifier lags the project.
- implicit -- kept 2026-10-02 in the AI & ML audit as a Recommender Systems obvious choice at version 0.7.3, PyPI classifier `Development Status :: 4 - Beta`. Kept on 234,833 downloads/month on pypistats and cp314 wheels; the classifier lags the project.
- statsforecast -- admitted 2026-10-02 in the AI & ML audit as a Time Series Forecasting obvious choice at version 2.1.1, PyPI classifier `Development Status :: 4 - Beta`. Admitted on 1,339,344 downloads/month on pypistats; the classifier lags the project.

### Challenger Exceptions

Entries admitted as challengers without adoption-trajectory evidence, by maintainer decision:

- seleniumbase -- admitted 2026-08-16 (PR #3284) as a Browser Automation challenger. It wraps selenium, the successor trajectory in the use case belongs to playwright, and its distinct value is its stealth/UC mode. Admitted because that stealth value counts toward Browser Automation.
- semantica -- kept 2026-10-01 in the AI and Agents audit as a Data Layer challenger at 16,582 downloads/month on ClickPy, with no adoption-trajectory evidence found. Kept by maintainer decision.

### Mature-stable Keeps

These entries sit past the 12-month activity requirement without an override. Each one is kept by editorial judgment: mature, stable, and no successor exists.

- annoy -- kept 2026-10-02 in the AI & ML audit, last push 2025-10-29. Unlike the others it has a successor, Spotify's own Voyager (2023), but kept by maintainer decision on 911,913 downloads/month on pypistats.
- ftfy
- itsdangerous
- jieba
- jinja
- sortedcontainers
