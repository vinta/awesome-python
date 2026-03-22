# CLAUDE.md

## Repository Overview

An opinionated list of Python frameworks, libraries, tools, and resources. Published at [awesome-python.com](https://awesome-python.com/).

## PR Review Guidelines

**Refer to [CONTRIBUTING.md](CONTRIBUTING.md)** for acceptance criteria, quality requirements, rejection rules, and entry format.

## Structure

- **README.md**: Source of truth. Hierarchical categories with alphabetically ordered entries.
- **CONTRIBUTING.md**: Submission guidelines and review criteria.
- **website/**: Static site generator that builds awesome-python.com from README.md.
  - `build.py`: Parses README.md and renders HTML via Jinja2 templates.
  - `fetch_github_stars.py`: Fetches star counts into `website/data/`.
  - `readme_parser.py`: Markdown-to-structured-data parser.
  - `templates/`, `static/`: Jinja2 templates and CSS/JS assets.
  - `tests/`: Pytest tests for the build pipeline.
- **Makefile**: `make install`, `make build`, `make preview`, `make test`, `make fetch_github_stars`.
- **pyproject.toml**: Uses `uv` for dependency management. Python >=3.13.

## Entry Format

```markdown
- [project-name](https://github.com/owner/repo) - Description ending with period.
```

Use PyPI package name as display name. If not on PyPI, use the GitHub repo name. Use GitHub URLs when available.

## Key Rules

- Alphabetical ordering within categories is mandatory.
- Quality over quantity. Only "awesome" projects.
- One project per PR.
- README.md is the single source of content truth.
