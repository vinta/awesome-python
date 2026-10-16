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
- hyperopt -- admitted 2026-10-16 as a Hyperparameter Optimization challenger at 1,793,872 downloads/month on ClickPy. Its 0.3.0 release came after a 4.5-year gap and it has no adoption-trajectory evidence. Admitted by maintainer decision.

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
- gensim -- recorded 2026-10-15 ahead of its activity-line crossing on 2026-11-01 (last push 2025-11-01, last release 4.4.0 on 2025-10-18), on 2,904,015 downloads/month on ClickPy (2026-10-12).
- httpie -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-12-17, last release 3.2.4 on 2024-11-01.
- itsdangerous
- jieba
- jinja
- python-pptx -- kept 2026-10-02, last commit 2024-08-06, last release 1.0.2 on 2024-08-07. No successor for generating .pptx files.
- schedule -- kept 2026-08-16, recorded 2026-10-02. Last commit 2024-05-25.
- sortedcontainers

## Rejected Additions

Projects the maintainer decided not to list, with the evidence at decision time, keyed by GitHub `owner/repo` (`owner/*` for a whole organization). PR reviews and star scans check here before proposing a project again. Rejudge one only on new evidence.

- BrianPugh/autoregistry -- 2026-08-23, 16,758 downloads/month: 77 stars.
- MarcBresson/schedium -- 2026-08-23, 381 downloads/month: repository created 2026-02-05.
- ets-labs/python-dependency-injector -- 2026-08-23, 9,086,069 downloads/month: the Dependency Injection use case was declined, since FastAPI's Depends and pytest fixtures absorb most of the need, leaving a leader with no challenger field.
- konradhalas/dacite -- 2026-08-23, 23,147,569 downloads/month: last push 2025-03-17, fails the activity rule.
- reagento/dishka -- 2026-08-23, 769,893 downloads/month: declined with the Dependency Injection use case.
- xberg-io/* -- 2026-08-16: coordinated multi-entry self-promotion; four planted entries were removed (xberg, liter-llm, tree-sitter-language-pack, html-to-markdown). Reject any project from this organization on sight.
- AbstractUmbra/audioop -- 2026-10-16, 7,714,737 downloads/month (ClickPy): gradio and discord.py require it on Python 3.13+, so the count is transitive. It is a backport of a removed stdlib module, not an audio tool readers choose.
- alteryx/featuretools -- 2026-10-16, 106,521 downloads/month (ClickPy): Fails Active: last commit 2024-11-13, last release 2024-05-14.
- AnswerDotAI/fastcore -- 2026-10-16, 24,139,424 downloads/month (ClickPy): ghapi requires it, and the jump from 11.5M to 50.9M is pull from that dependency. It is a fastai grab-bag, not a built-in class enhancement.
- anthropics/claude-code-security-review -- 2026-10-16, no PyPI download signal: A language-agnostic GitHub Action with no releases and no commits since 2026-02-11. Not Python work.
- apple-aiml-research/ml-stable-diffusion -- 2026-10-16, no PyPI download signal: Fails Active: the last human commit is 2025-07-03, and the 2026 commit is a bot. It is a Core ML/Swift path, not a Python generation library.
- arrobalytics/django-ledger -- 2026-10-16, 17,102 downloads/month (ClickPy): An accounting engine, not an ERP suite. Small demand, no Development Status classifier, and no production case studies found.
- asdf-vm/asdf -- 2026-10-16, no PyPI download signal: The tool users are leaving for mise, with the 0.16 Go rewrite cited as the trigger. PyPI "asdf" is an unrelated astronomy package.
- AUTOMATIC1111/stable-diffusion-webui -- 2026-10-16, no PyPI download signal: Fails Active: the last commit on the default branch is 2024-07-27, and its pushed_at date doesn't reflect code changes.
- binaryornot/binaryornot -- 2026-10-16, 13,794,027 downloads/month (ClickPy): cookiecutter requires it, which accounts for about half the count. It does a narrow job, and the use case is at cap.
- bisohns/search-engine-parser -- 2026-10-16, 22,138 downloads/month (ClickPy): Last release 2022-11, and it pins lxml<5. It scrapes search results pages, not page content.
- bookieio/breadability -- 2026-10-16, 106,712 downloads/month (ClickPy): sumy pulls in almost all of the count. Its first release since 2014 lists Python 3.6 classifiers.
- boson-ai/higgs-audio -- 2026-10-16, 416 downloads/month (ClickPy): Two releases, both on 2025-10-03, and the PyPI homepage is a placeholder. v3 moved to Hugging Face plus an API, so nothing pip-installable is maintained.
- caesar0301/treelib -- 2026-10-16, 1,532,895 downloads/month (ClickPy): anytree (6.0M) is the bigger tree library at 4x the downloads, so treelib is not the obvious choice.
- chibisov/drf-extensions -- 2026-10-16, 2,067,903 downloads/month (ClickPy): Last release declares Django<6.0, and it is a DRF add-on, not an API framework.
- cknd/stackprinter -- 2026-10-16, 334,597 downloads/month (ClickPy): Flat downloads, and one release after a two-year gap. No sign of a challenger trajectory.
- clips/pattern -- 2026-10-16, no PyPI download signal: The code ended in 2018, and the 2026 commit is a README edit. PyPI "pattern" is now an unrelated package. Previously removed 2026-03-21 (f52c85a) as unmaintained, and nothing has changed since.
- closeio/ciso8601 -- 2026-10-16, 6,373,074 downloads/month (ClickPy): The use case is full. Its own docs tell users on Python 3.11+ to use datetime.fromisoformat unless they need the speed, so it is a narrow speed-up, not a general datetime library.
- codelucas/newspaper -- 2026-10-16, 468,795 downloads/month (ClickPy): The 2026-03-21 removal (1d09426, unmaintained) still holds: last release was 2018-09, and the 2026 push came with no release.
- coleifer/unqlite-python -- 2026-10-16, 11,386 downloads/month (ClickPy): It binds an embedded database rather than being a server driver, and has negligible demand in either home.
- coleifer/walrus -- 2026-10-16, 182,584 downloads/month (ClickPy): A utility layer over redis-py, not a driver, at under 0.1% of redis's 204M downloads.
- crccheck/django-object-actions -- 2026-10-16, 2,366,676 downloads/month (ClickPy): An add-on for Django admin buttons, not an admin panel. The source of its download count is unknown.
- davidhalter/jedi -- 2026-10-16, 102,370,894 downloads/month (ClickPy): ipython requires it, and its count almost exactly matches ipython's 102.6M. Its job is editor and REPL autocompletion, which the list dropped along with the Editor Plugins section (c87fdac).
- DerwenAI/pytextrank -- 2026-10-16, 82,707 downloads/month (ClickPy): Fails Active: last commit 2024-05-21, last release 2024-02-21.
- django-haystack/celery-haystack -- 2026-10-16, 1,919 downloads/month (ClickPy): Last release 2015-12.
- django-parler/django-parler -- 2026-10-16, 160,493 downloads/month (ClickPy): django-modeltranslation (826,853) has 5x its downloads, so it is not the obvious choice for Django model translation.
- doableware/djongo -- 2026-10-16, 57,392 downloads/month (ClickPy): Its latest release (1.3.7, 2024-11) pins django<=3.1.12, so it can't be installed with any supported Django. django-mongodb-backend already does this job.
- Doist/bitmapist -- 2026-10-16, 7,385 downloads/month (ClickPy): A Redis bitmap analytics library, not a driver, with negligible demand. Its metadata caps Python below 3.14 and redis below 6.0.
- dpath-maintainers/dpath-python -- 2026-10-16, 8,884,938 downloads/month (ClickPy): checkov and airbyte-cdk pull it in, leaving about 3.5M independent, below the section's floor (python-box, 4.9M). Last release 2024-06.
- dpkp/kafka-python -- 2026-10-16, 17,148,353 downloads/month (ClickPy): It was removed as unmaintained on 2026-03-21 (e8d3d29), but it was still releasing then and has shipped 3.0.0 through 3.0.11 since (June to August 2026), so that reason no longer holds. It is held back by tier: confluent-kafka (41.5M) is the default for new projects, and kafka-python is the pure-Python fallback rather than a successor.
- dwolfhub/zxcvbn-python -- 2026-10-16, 4,673,093 downloads/month (ClickPy): Password-strength estimation is not cryptography, and there is no use case for passwords. It also fails Active: last commit on master was 2025-10-06.
- explorerhq/sql-explorer -- 2026-10-16, 213,897 downloads/month (ClickPy): A SQL reporting tool, not an admin panel, and below the smallest incumbent (django-grappelli, 281,247).
- frostming/marko -- 2026-10-16, 5,798,780 downloads/month (ClickPy): The obvious tier (markdown-it-py, markdown, mistune) is full. Its growth roughly tracks the general ClickPy inflation, and no source shows it replacing any of the three.
- ggml-org/whisper.cpp -- 2026-10-16, 734,136 downloads/month (ClickPy): Python uses it through the separate third-party absadiki/pywhispercpp (349 stars). It does faster-whisper's job (12.1M) with no sign of overtaking it. The download count is unexplained for 349 stars.
- gitleaks/gitleaks -- 2026-10-16, no PyPI download signal: Secret Scanning was minted with betterleaks alone. gitleaks is a language-agnostic Go binary with slowing activity (last release 2026-03-21).
- hhatto/autopep8 -- 2026-10-16, 7,132,827 downloads/month (ClickPy): The use case holds 6 entries under a cap exception, and none is weaker (flake8 39.6M, bandit 24.5M). Last release was 2025-01, and the 2026 commits are dependabot only.
- html5lib/html5lib-python -- 2026-10-16, 26,055,801 downloads/month (ClickPy): The 2026-03-21 removal (7f21136, no release since 2019) still holds: last release 1.1 in 2020-06. The count comes from 3,281 dependents rather than people picking it, and justhtml already covers pure-Python HTML5 parsing.
- huggingface/speech-to-speech -- 2026-10-16, 2,714 downloads/month (ClickPy): An end-to-end voice pipeline app, not an ASR/TTS library, and far below the smallest Speech entry (funasr, 297,003).
- jazzband/django-pipeline -- 2026-10-16, 222,640 downloads/month (ClickPy): The 2026-03-21 removal (6b59080) gave overlap with django-compressor as the reason, which still holds: django-compressor has 11x its downloads.
- jundot/omlx -- 2026-10-16, no PyPI download signal: A macOS menu-bar app (repo created 2026-02-13), not a library. mlx-lm already covers Apple Silicon.
- jupyter/docker-stacks -- 2026-10-16, no PyPI download signal: Container images that package notebook (already listed), not an interpreter.
- kaifcodec/user-scanner -- 2026-10-16, 16,772 downloads/month (ClickPy): The use case is at cap. sherlock-project does the same username OSINT job at 4x the downloads. Repo created 2025-10.
- keleshev/schema -- 2026-10-16, 19,658,077 downloads/month (ClickPy): Removed as unmaintained on 2026-03-21 (e8d3d29), and activity has not resumed: the last release was 0.7.8 in 2025-10, with only a push since. It is classified Alpha and is not a successor to pydantic or jsonschema.
- kellyjonbrazil/jc -- 2026-10-16, 626,452 downloads/month (ClickPy): Parser is at cap (floor: parsy, 3.96M). jc does a different job (CLI output to JSON) and has no entry to replace.
- lexiforest/curl_cffi -- 2026-10-16, 31,930,921 downloads/month (ClickPy): About 17.4M of this is pulled in by yfinance, leaving roughly 14M of its own demand. HTTP Clients General is at cap, and web sources frame it as a TLS-fingerprint impersonation tool for getting past anti-bot blocks, not as a successor to requests or httpx2. No use case covers impersonation.
- LPgenerator/django-db-mailer -- 2026-10-16, 1,143 downloads/month (ClickPy): Last release 2018-10.
- mahmoud/glom -- 2026-10-16, 23,112,427 downloads/month (ClickPy): semgrep requires it, leaving about 3.5M independent. It is a transformer for nested data rather than a built-in class enhancement.
- mailgun/flanker -- 2026-10-16, 36,887 downloads/month (ClickPy): The 2026-03-21 removal (7f21136, abandoned by Mailgun) still holds: last release 2019-12. It parses mail rather than sending it.
- matthewwithanm/django-imagekit -- 2026-10-16, 380,436 downloads/month (ClickPy): Django-specific and below General's floor. Django thumbnailing has no clear leader (sorl-thumbnail 485K, easy-thumbnails 469K).
- matthewwithanm/pilkit -- 2026-10-16, 380,588 downloads/month (ClickPy): Pulled in by django-imagekit (nearly identical counts). Last release 2023-09.
- maxfischer2781/asyncstdlib -- 2026-10-16, 4,288,321 downloads/month (ClickPy): Async I/O already holds 6 entries under a cap exception. This is a different job (async versions of builtins and itertools), and aiostream (3.8M) is an equal peer.
- MemPalace/mempalace -- 2026-10-16, 56,453 downloads/month (ClickPy): Data Layer is at cap. Agent memory is mem0's job (2.0M), so there is no one-in-one-out case. Its April 2026 launch coverage centred on disputed benchmarks (the 100% LongMemEval claim was pulled), it is classified Beta, and its popularity is driven by stars (59.6k stars vs 56k downloads).
- mewwts/addict -- 2026-10-16, 6,120,693 downloads/month (ClickPy): Fails Active: last commit 2021-01, last release 2020-11. python-box, already listed, does the same job.
- microsoft/bocpy -- 2026-10-16, 9,933 downloads/month (ClickPy): Created 2026-02, classified Beta, 201 stars. No adoption-trajectory evidence.
- mongodb/motor -- 2026-10-16, 9,226,799 downloads/month (ClickPy): Deprecated in favor of the PyMongo Async API (2025-05-14) and end-of-life since 2026-05-14. Its last release was 3.7.1 in 2025-05, and pymongo is listed. The earlier removal (d9bba73, 2026-01-16, "unmaintained") still holds.
- mpdavis/python-jose -- 2026-10-16, 32,386,854 downloads/month (ClickPy): The 2026-03-21 removal (f50bd8f, superseded) still holds: FastAPI's JWT tutorial now uses PyJWT, and several dependents migrated away after CVE-2024-33663. No release since 2025-05.
- myusuf3/delorean -- 2026-10-16, 107,732 downloads/month (ClickPy): Removed 2024-02-23 (8524f28). 2.0.0 (2026-08) is its first release since 2018, and that day's commits are docs and CI only. It is Beta, has little demand, and the use case is full.
- noripyt/django-cachalot -- 2026-10-16, 244,358 downloads/month (ClickPy): Does the same job as django-cacheops (listed), which has 8x its downloads.
- oobabooga/textgen -- 2026-10-16, no PyPI download signal: A desktop app, not a pip library. PyPI "textgen" is an unrelated package.
- opensanctions/countrynames -- 2026-10-16, 15,360 downloads/month (ClickPy): Narrow job. pycountry (32.2M, unlisted) is the obvious country-data library.
- osantana/prettyconf -- 2026-10-16, 29,957 downloads/month (ClickPy): The use case is full at 5 entries, and prettyconf has about 0.6% of the downloads of dynaconf, the smallest entry.
- pydata/numexpr -- 2026-10-16, 12,883,844 downloads/month (ClickPy): Healthy (2.14.2 released 2026-07), but Core already holds numpy, scipy, and numba with far more demand. numexpr is an older accelerator, not a successor to any of them.
- python-excel/xlrd -- 2026-10-16, 70,465,563 downloads/month (ClickPy): Removed 2026-01-16 (d9bba73) as archived, but the repo was never archived. Releases have not resumed since 2.0.2 (2025-06), its own tagline says to use openpyxl where possible, it reads only legacy .xls, and python-calamine (7.7M) is the recommended replacement. Most of the count is direct demand.
- rajatim/zhtw -- 2026-10-16, 719 downloads/month (ClickPy): 14 stars, created 2025-12. It covers a narrower part of OpenCC's job.
- rushter/MLAlgorithms -- 2026-10-16, no PyPI download signal: Educational code, not on PyPI. thealgorithms already covers this.
- s3tools/s3cmd -- 2026-10-16, 1,243,432 downloads/month (ClickPy): The 2026-03-21 removal (e8d3d29) still holds: last release 2023-12, and it crosses the 12-month activity line on 2026-10-22. awscli and boto3 cover the job.
- saresend/KSUID -- 2026-10-16, 74,743 downloads/month (ClickPy): Fails Active: last commit 2018-11, last release 2017. svix-ksuid (1.0M) is the bigger KSUID library.
- shibing624/text2vec -- 2026-10-16, 2,291 downloads/month (ClickPy): sentence-transformers (listed) covers this, and there is no independent demand.
- smartcrop/smartcrop.py -- 2026-10-16, 29,956 downloads/month (ClickPy): A niche content-aware cropping job at 30K, and General is at cap (floor: pyvips, 867,739).
- SmileyChris/easy-thumbnails -- 2026-10-16, 469,327 downloads/month (ClickPy): Django-specific and below General's floor, with no lead over sorl-thumbnail. Last release 2025-08.
- ssut/py-googletrans -- 2026-10-16, 1,941,718 downloads/month (ClickPy): Fails Active: last commit 2025-04. It is an unofficial Google Translate scraper (machine translation, not i18n).
- TeamHG-Memex/eli5 -- 2026-10-16, 84,428 downloads/month (ClickPy): Fails Active: the maintained fork eli5-org/eli5 last committed on 2025-04-20, and recent commits to the original repo only delete workflow files.
- TheTom/turboquant_plus -- 2026-10-16, no PyPI download signal: A research repo for KV-cache quantization. Every commit since 2026-06-12 is a README edit, and the latest says the work was merged upstream into mlx-swift-lm. Nothing pip-installable.
- thumbor/libthumbor -- 2026-10-16, 66,538 downloads/month (ClickPy): A companion to the listed thumbor. Last release 2022-03, with only dependabot commits since.
- THUwangcy/ReChorus -- 2026-10-16, no PyPI download signal: An academic research framework with 648 stars, not on PyPI.
- tyiannak/pyAudioAnalysis -- 2026-10-16, 13,577 downloads/month (ClickPy): Removed 2026-03-21 (e8d3d29) as unmaintained, and that still holds: last release 2022-02, with only README edits since.
- uploadcare/pillow-simd -- 2026-10-16, 66,174 downloads/month (ClickPy): A fork of the listed pillow with 0.01% of its downloads, and General is at cap.
- wroberts/pytimeparse -- 2026-10-16, 23,637,352 downloads/month (ClickPy): Its count matches agate's (20.8M), which dbt-core pulls in, so very little of it is people choosing pytimeparse. 1.1.9 is its first release since 2018 and is classified Beta. The use case is full.
- x-hw/amazing-qr -- 2026-10-16, 812 downloads/month (ClickPy): Its 10.8k stars don't show up as installs. It pins Pillow<12, while qrcode (28.7M) holds the use case.
- xhtml2pdf/xhtml2pdf -- 2026-10-16, 3,813,456 downloads/month (ClickPy): It was removed in 2016 (a936fd1) as "deprecated in favor of WeasyPrint", which is no longer true: it shipped 0.2.22–0.2.24 in 2026-10. It still fails the tier bar, since the web calls WeasyPrint the default (32.5M) and describes xhtml2pdf as having limited CSS. It is an older alternative, not a successor.
- Yelp/detect-secrets -- 2026-10-16, 9,698,855 downloads/month (ClickPy): Weak maintenance: last release 2024-05, last code commit 2025-01, and only a CI commit in 2026. Demand rose 6.6x with no explained cause.
- youssofal/MTPLX -- 2026-10-16, 7,276 downloads/month (ClickPy): Narrow: its own summary is "Native MTP speculative decoding for Qwen3-Next on Apple Silicon". Repo created 2026-05-02, and it hard-requires mlx-lm, which is already listed, so it is an add-on rather than a separate pick.
- ytdl-org/youtube-dl -- 2026-10-16, 164,180 downloads/month (ClickPy): The 2026-03-21 removal (f50bd8f, replaced by yt-dlp) still holds: no release since 2021.12.17, commits stopped 2025-11, and downloads are falling.

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
