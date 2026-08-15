# Contributing

awesome-python is a shortlist, not a catalog. Each use case lists only its obvious choices, and most rejections mean "the use case is full", not "your project is bad". Read this whole page before opening a PR.

## Quality Requirements

All submissions must satisfy **ALL** of these:

1. **Serves Python Developers**: Python developers use it in their Python work. Implementation language and packaging are irrelevant — uv and ty are written in Rust, and agent skill packs are markdown, yet all belong; a pure-Python project nobody uses in Python work does not.
2. **Active**: Commits within the last 12 months
3. **Stable**: Production-ready, not alpha/beta/experimental
4. **Documented**: Clear README with examples and use cases
5. **Established**: Repository at least 1 month old

## Admission

A **use case** is one distinct job a reader needs done. Use cases are defined by the list's structure: each subcategory is a use case, and a section without subcategories is a single use case. Structure changes — new sections, new subcategories, splitting an oversized use case into finer ones — are made only by the maintainer; an entry PR can never create the subcategory it needs.

Each use case lists at most:

- **Up to 3 obvious choices** — tools an experienced Python developer would name unprompted when asked "what do I use for this?"
- **Up to 2 challengers** — tools that are not yet the obvious choice but are credible successors to one. Admission as a challenger requires adoption-trajectory evidence, not popularity alone.

Hard maximum: 5 entries per use case. This is a qualitative bar first and a numeric backstop second — most use cases should carry fewer.

**Displacement**: once a use case is at its cap, the only way in is to name the entry your project replaces and argue that yours does that entry's job better. One in, one out.

**Standard library**: a standard-library module is listed only where the stdlib is itself the obvious choice for the use case (tomllib yes, unittest no).

**Evidence**: admission is decided by maintainer editorial judgment, informed primarily by PyPI download counts rather than GitHub stars. Judgment overrides the signal's known failure modes (CI-inflated counts, model releases consumed as weights rather than pip installs, large-but-specific audiences misread as "niche"). The maintainer's decision is final.

Looking for an exhaustive catalog instead? Follow the awesome-* lists linked under individual entries (for example awesome-python-testing) — they exist precisely so this list doesn't have to be one.

## Entry Format Reference

**Use GitHub repository URLs** whenever possible. Projects linked to a GitHub repo are ranked higher on [awesome-python.com](https://awesome-python.com/).

### Naming Convention

Use the **PyPI package name** as the display name so developers can copy it directly to `pip install`. Check the canonical name at `https://pypi.org/pypi/{package}/json`. If the project is not on PyPI, use the GitHub repository name instead.

### Standard Entry

```markdown
- [pypi-name](https://github.com/owner/repo) - Description ending with period.
```

### Standard Library Module

```markdown
- [module](https://docs.python.org/3/library/module.html) - (Python standard library) Description.
```

### Fork of Another Project

```markdown
- [new-name](https://github.com/owner/new-name) - Description ([original-name](original-url) fork).
```

### Entry with Related Awesome List

```markdown
- [project](https://github.com/owner/project) - Description.
  - [awesome-project](https://github.com/someone/awesome-project)
```

### Subcategory Format

```markdown
- Subcategory Name
  - [project](url) - Description.
```

### Entry Ordering

Within a use case, the obvious choices are listed first, ordered by PyPI downloads per month from high to low; challengers follow, in the same order. Entries without a download signal (standard-library modules, agent skill packs) sort last within their tier, alphabetically. There is no marker in the entry text — position is the marker, so the last entries of a use case may be its challengers.

## Changing the Structure

Adding sections or subcategories is maintainer-only (see Admission). For maintainer reference:

1. Add the section description in italics: `*Libraries for doing X.*`
2. Add the section under the appropriate thematic group (e.g., **AI & ML**, **Web**, **Data & Science**)
3. Add the section title to the Table of Contents under its group
4. Order entries per Entry Ordering above

## Review Process

PRs are reviewed by automated tools and maintainers:

1. **Format Check**: Entry follows the correct format
2. **Category Check**: Placed in the appropriate use case
3. **Duplicate Check**: Not already listed or previously rejected
4. **Activity Check**: Project shows recent activity
5. **Admission Check**: Meets the Admission rules above, including Displacement when the use case is at its cap

Search previous Pull Requests and Issues before submitting, as yours may be a duplicate.

## Automatic Rejection

PRs will be **closed** if:

- Adding multiple projects in one PR
- The use case is at its cap and the PR makes no Displacement argument
- The PR creates a new section or subcategory and fills it (structure changes are maintainer-only)
- Coordinated multi-entry self-promotion: multiple related projects from the same organization or author, across one or several PRs
- Duplicate of existing entry or recently-closed PR
- Empty or placeholder PR descriptions
- Placed under an inappropriate category
- Project is archived or abandoned (no commits in 12+ months)
- No documentation or unclear use case
- Repository less than 1 month old
