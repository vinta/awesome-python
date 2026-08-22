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

### Mature-stable Keeps

These entries sit past the 12-month activity requirement without an override. Each one is kept by editorial judgment: mature, stable, and no successor exists.

- ftfy
- itsdangerous
- jieba
- jinja
- sortedcontainers
