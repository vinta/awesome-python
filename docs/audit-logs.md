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

- zensical -- admitted 2026-08-23 at version 0.0.57, PyPI classifier `Development Status :: 3 - Alpha`, with no 1.0 target announced. Admitted as a challenger displacing mkdocs because the Documentation section was carrying a dying upstream: the Material for MkDocs team's announcement of 2025-11-05 put Material into maintenance mode for twelve months and called MkDocs itself unmaintained since 2024-08 and a supply chain risk. Re-checked 2026-11-08 in the Documentation audit at 0.1.0, PyPI classifier `Development Status :: 4 - Beta`, 2,234,473 downloads/month on ClickPy: kept. Material for MkDocs moved its end of life to 2027-05-05 and names zensical its maintained successor, so re-check both slots then, or when 1.0 lands.
- openviking -- admitted 2026-08-25 (PR #3302) at version 0.4.16, PyPI classifier `Development Status :: 3 - Alpha`, with a README that said "OpenViking is still in its early stages". Admitted as a Data Layer challenger because the adoption is real: 459,446 downloads/month on pypistats (mirror-excluded) on 2026-08-24, and releases every few days. Re-check when 1.0 lands.
- claude-agent-sdk -- kept 2026-10-01 in the AI and Agents audit at version 0.2.163, PyPI classifier `Development Status :: 3 - Alpha`. Kept as a Vendor Agent SDKs obvious choice because the adoption is real: 30,033,689 downloads/month on ClickPy on 2026-10-01, up from 1.2M in March 2026 on pypistats. Re-check when 1.0 lands.
- uv-audit -- kept 2026-08-16 as a Supply Chain Security entry, recorded 2026-10-02. uv itself prints "`uv audit` is experimental and may change without warning". Kept because it is part of uv, the obvious package manager. Re-check when uv drops the experimental notice.

### Challenger Exceptions

Entries admitted as challengers without adoption-trajectory evidence, by maintainer decision:

- seleniumbase -- admitted 2026-08-16 (PR #3284) as a Browser Automation challenger. It wraps selenium, the successor trajectory in the use case belongs to playwright, and its distinct value is its stealth/UC mode. Admitted because that stealth value counts toward Browser Automation.
- semantica -- kept 2026-10-01 in the AI and Agents audit as a Data Layer challenger at 16,582 downloads/month on ClickPy, with no adoption-trajectory evidence found. Kept by maintainer decision.
- hyperopt -- admitted 2026-10-16 as a Hyperparameter Optimization challenger at 1,793,872 downloads/month on ClickPy. Its 0.3.0 release came after a 4.5-year gap and it has no adoption-trajectory evidence. Admitted by maintainer decision.
- magika -- admitted 2026-10-16 as a File Type Detection challenger at 16,388,380 downloads/month on ClickPy. markitdown requires it, so most of that count is transitive, and no adoption-trajectory evidence was found. Admitted by maintainer decision.

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
- ftfy -- kept 2026-08-16, recorded 2026-11-08. Last commit 2024-10-30, last release 6.3.1 on 2024-10-26, 16,751,554 downloads/month on ClickPy. The listed encoding detectors only guess an encoding, while ftfy repairs text already decoded wrong. The one alternative found, plsfix, a Rust port, has 7,914 downloads/month and no release since 2025-01-31.
- gensim -- recorded 2026-10-15 ahead of its activity-line crossing on 2026-11-01 (last push 2025-11-01, last release 4.4.0 on 2025-10-18), on 2,904,015 downloads/month on ClickPy (2026-10-12).
- httpie -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-12-17, last release 3.2.4 on 2024-11-01.
- itsdangerous -- kept 2026-08-16, recorded 2026-11-08. Last commit 2025-06-14, last release 2.2.0 on 2024-04-16. Flask requires it, so most of its 240,311,557 downloads/month on ClickPy are Flask's 207,244,698.
- jieba -- re-added 2026-04-19 (ba96331) after its 2026-03-26 removal, by maintainer decision: still useful and works on Python 3.13. Recorded 2026-11-08. Last commit 2020-02-15, last release 0.42.1 on 2020-01-20, 6,036,440 downloads/month on ClickPy. Of the segmenters claimed more accurate, pkuseg (last release 2020) and THULAC (2022) are inactive, and HanLP, a full NLP toolkit, has 15,140 downloads/month.
- jinja -- kept 2026-08-16, recorded 2026-11-08. Last commit 2025-06-14, last release 3.1.6 on 2025-03-05, 687,554,650 downloads/month on ClickPy. Flask requires it.
- python-pptx -- kept 2026-10-02, last commit 2024-08-06, last release 1.0.2 on 2024-08-07. No successor for generating .pptx files.
- schedule -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-05-25.
- sortedcontainers -- kept 2026-08-16, recorded 2026-11-08. Last commit 2024-03-01, last release 2.4.0 on 2021-05-16, 244,848,345 downloads/month on ClickPy. hypothesis requires it, but hypothesis's 66,969,835 downloads/month cover only about a quarter of that. No successor found.

## Rejected Additions

Projects the maintainer decided not to list, with the evidence at decision time, keyed by GitHub `owner/repo` (`owner/*` for a whole organization). PR reviews and star scans check here before proposing a project again. Rejudge one only on new evidence.

- xberg-io/* -- 2026-08-16: coordinated multi-entry self-promotion; four planted entries were removed (xberg, liter-llm, tree-sitter-language-pack, html-to-markdown). Reject any project from this organization on sight.
- coleifer/walrus -- 2026-10-16, 182,584 downloads/month (ClickPy): A utility layer over redis-py, not a driver, at under 0.1% of redis's 204M downloads.
- Doist/bitmapist -- 2026-10-16, 7,385 downloads/month (ClickPy): A Redis bitmap analytics library, not a driver, with negligible demand. Its metadata caps Python below 3.14 and redis below 6.0.
- ggml-org/whisper.cpp -- 2026-10-16, 734,136 downloads/month (ClickPy): Python uses it through the separate third-party absadiki/pywhispercpp (349 stars). It does faster-whisper's job (12.1M) with no sign of overtaking it. The download count is unexplained for 349 stars.
- lexiforest/curl_cffi -- 2026-10-16, 31,930,921 downloads/month (ClickPy): About 17.4M of this is pulled in by yfinance, leaving roughly 14M of its own demand. HTTP Clients General is at cap, and web sources frame it as a TLS-fingerprint impersonation tool for getting past anti-bot blocks, not as a successor to requests or httpx2. No use case covers impersonation.
- oobabooga/textgen -- 2026-10-16, no PyPI download signal: A desktop app, not a pip library. PyPI "textgen" is an unrelated package.
- youssofal/MTPLX -- 2026-10-16, 7,276 downloads/month (ClickPy): Narrow: its own summary is "Native MTP speculative decoding for Qwen3-Next on Apple Silicon". Repo created 2026-05-02, and it hard-requires mlx-lm, which is already listed, so it is an add-on rather than a separate pick.
- cactus-compute/cactus -- 2026-11-08, 1,012 downloads/month (pypistats, package cactus-compute): Far below the smallest Local LLM Inference entry (llama-cpp-python, 519,085), and its 4.x line centres on Cactus's own small models rather than running open-weight LLMs.
- carltongibson/django-filter -- 2026-11-08, 13,792,807 downloads/month (pypistats): A queryset-filtering add-on for DRF or Django views, not an API framework, as with drf-extensions.
- charles-001/dolphie -- 2026-11-08, 2,341 downloads/month (pypistats): A top-style MySQL monitor, not a query shell like the Database CLIs entries, at a fifth of the smallest one's demand (iredis, 11,965).
- DietrichGebert/ponytail -- 2026-11-08, no PyPI download signal: A language-agnostic anti-over-engineering prompt pack. Not Python work.
- django-hijack/django-hijack -- 2026-11-08, 2,698,297 downloads/month (pypistats): User impersonation, not an admin panel, and no Authentication use case covers it.
- django-import-export/django-import-export -- 2026-11-08, 2,316,201 downloads/month (pypistats): An import/export add-on with admin integration, not an admin panel; tablib, which it wraps, is already listed.
- firecrawl/anydoc -- 2026-11-08, 6,181,793 downloads/month (pypistats, package firecrawl-anydoc): Its downloads look automated: 80.7% come from Python 3.14, against about 7% for markitdown and docling. Version 0.2.x with no release since 2026-08-27. Re-check at 1.0.
- ghostsecurity/skills -- 2026-11-08, no PyPI download signal: Language-agnostic AppSec skills with 439 stars. Not Python work.
- goauthentik/authentik -- 2026-11-08, no PyPI download signal: A self-hosted identity provider deployed with Docker or Helm, not a library; Python apps integrate through OIDC libraries like the listed authlib.
- hankcs/HanLP -- 2026-11-08, 9,596 downloads/month (pypistats, package hanlp): 0.2% of jieba's demand (4,787,084); its 36.5k stars don't show up as installs.
- JohnSnowLabs/spark-nlp -- 2026-11-08, 691,866 downloads/month (pypistats): Below the smallest NLP General entry (stanza, 765,627), and a Spark-only niche.
- mattpocock/skills -- 2026-11-08, no PyPI download signal: General engineering skills whose only language-specific ones are for TypeScript. Not Python work.
- microsoft/SynapseML -- 2026-11-08, 1,161,151 downloads/month (pypistats, package synapseml): Spark-only and Beta, with a count of unexplained origin; Distributed Computing, its natural home, is at cap with pyspark.
- MikeChongCan/scylla -- 2026-11-08, 121 downloads/month (pypistats): Last PyPI release 2019-08, pinning requests 2.22.0 and Python 3.6. A proxy pool, not a scraping framework.
- obra/superpowers -- 2026-11-08, no PyPI download signal: A language-agnostic engineering methodology pack with no Python content. Not Python work.
- ollaya-dev/ollaya -- 2026-11-08, no PyPI download signal: A Rust server for decision models that never generates text, so not LLM inference, and it has no Python surface.
- openclaw/openclaw -- 2026-11-08, no PyPI download signal: A TypeScript/Node assistant with TypeScript plugins. Not Python work.
- revsys/django-friendship -- 2026-11-08, 2,797 downloads/month (pypistats): Negligible demand, and no use case.
- django-extensions/django-extensions -- 2026-11-08, 12,769,974 downloads/month (pypistats): A grab-bag of Django management commands, not a debugging tool. Its latest release (4.1, 2025-04) declares Django only through 5.2.
- google-gemini/gemini-cli -- 2026-11-08, no PyPI download signal: A language-agnostic terminal coding agent written in TypeScript. Not Python work.
- jazzband/django-model-utils -- 2026-11-08, 4,634,168 downloads/month (pypistats): Declined: no Django model add-ons use case, since these single-purpose tools don't compete. Last release 2024-09.
- jazzband/django-push-notifications -- 2026-11-08, 237,516 downloads/month (pypistats): Push notifications have no use case (see xtrinch/fcm-django). Its classifiers stop at Django 4.0.
- m-bain/whisperX -- 2026-11-08, 342,919 downloads/month (pypistats, package whisperx): A wrapper over faster-whisper for word timestamps and diarization, not a successor to any Speech entry. Its monthly downloads dipped instead of rising, and its release line pins torch~=2.8.0 with requires_python <3.14.
- openai/codex -- 2026-11-08, no PyPI download signal: A language-agnostic terminal coding agent written in Rust. Not Python work.
- openai/openai-python -- 2026-11-08, 295,856,631 downloads/month (pypistats, package openai): A vendor API client, declined with Third-party APIs (2d98426); OpenAI is already listed through openai-agents. Much of its count is pulled in by other libraries.

## Last Audited

An audit that changes nothing in a section leaves no commit, so its date is recorded here, one line per section, replaced on each re-audit.

- Asynchronous Programming -- 2026-10-15, no changes.
- Build Tools -- 2026-10-15, no changes.
- CLI Tools -- 2026-10-15, no changes.
- Computer Vision -- 2026-10-15, no changes.
- Configuration Files -- 2026-10-15, no changes.
- Cryptography -- 2026-10-15, no changes.
- Data Analysis -- 2026-10-15, no changes.
- Data Validation -- 2026-10-15, no changes.
- Date and Time -- 2026-10-15, no changes.
- Documentation -- 2026-11-08, restructured into use cases in f415b20.
- Email -- 2026-10-15, no changes.
- Environment Management -- 2026-10-15, no changes.
- File Manipulation -- 2026-10-15, no changes.
- Functional Programming -- 2026-10-15, no changes.
- Geolocation -- 2026-10-15, no changes.
- HTML Manipulation -- 2026-10-15, no changes.
- Image Processing -- 2026-10-15, no changes.
- Implementations -- 2026-10-15, no changes.
- Interactive Interpreter -- 2026-10-15, no changes.
- Machine Learning -- 2026-10-15, no changes.
- Microsoft Windows -- 2026-10-15, no changes.
- Miscellaneous -- 2026-10-15, no changes.
- Natural Language Processing -- 2026-10-15, no changes.
- Package Management -- 2026-10-15, no changes.
- Quantum Computing -- 2026-10-15, no changes.
- Recommender Systems -- 2026-10-15, no changes.
- Science -- 2026-10-15, no changes.
- Supply Chain Security -- 2026-10-15, no changes.
- Web Security -- 2026-10-15, no changes.
