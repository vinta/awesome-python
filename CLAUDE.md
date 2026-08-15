# CLAUDE.md

## Repository Overview

An opinionated list of Python frameworks, libraries, tools, and resources. Published at [awesome-python.com](https://awesome-python.com/).

## Entry Guidelines

**Refer to [CONTRIBUTING.md](CONTRIBUTING.md)** for admission rules, quality requirements, rejection rules, and entry format. Apply these rules whenever adding or removing an entry, whether reviewing a PR or committing directly.

## Structure

- **README.md**: Source of truth. Hierarchical categories; entries ordered per the Key Rules below.
- **CONTRIBUTING.md**: Submission guidelines and review criteria.
- **SPONSORSHIP.md**: Sponsor tiers, placement rules, and the editorial-independence policy. Sponsor content sits in the README header and must never influence which projects get listed.
- **website/**: Static site generator that builds awesome-python.com from README.md.
  - `build.py`: Parses README.md and renders HTML via Jinja2 templates.
  - `fetch_github_stars.py`: Fetches star counts into `website/data/`.
  - `readme_parser.py`: Markdown-to-structured-data parser.
  - `templates/`, `static/`: Jinja2 templates and CSS/JS assets.
  - `tests/`: Pytest tests for the build pipeline.
- **Makefile**: `make install`, `make build`, `make preview`, `make test`, `make fetch_github_stars`.
- **pyproject.toml**: Uses `uv` for dependency management. Python >=3.13.

## Key Rules

- Ordering within a use case: obvious choices first, then challengers, each tier by PyPI downloads/month descending; no-signal entries last in tier, alphabetically. See CONTRIBUTING.md.
- A shortlist, not a catalog: per use case, up to 3 obvious choices plus up to 2 challengers, hard maximum 5.
- One project per PR.
- One entry per commit when adding or deleting entries. Exception: a prune sweep is one commit per section, its body listing each removal with its reason. Format, wording, or categorization changes across multiple entries may be bundled in a single commit.
- Every keep/drop reason must be verified against current online data at decision time — download counts, repo activity and archived status, PyPI metadata, project docs. Training-data recollections alone are not evidence; verify before stating, and label anything unverifiable as a judgment call.
- README.md is the single source of content truth.
