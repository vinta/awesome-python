# Contributing

## Quick Checklist

Before submitting a PR, verify:

- [ ] One link per Pull Request
- [ ] PR title format: `Add project-name`
- [ ] Entry format: `* [project-name](url) - A short description ending with a period.`
- [ ] Description is concise (one sentence)
- [ ] Placed in the appropriate category/subcategory
- [ ] No trailing whitespace
- [ ] Spelling and grammar checked

## Acceptance Criteria

Your submission must meet **ONE** of the following criteria:

### 1. Industry Standard

- The go-to tool that almost everyone uses for a specific use case
- Examples: Requests, Flask, Pandas, NumPy
- Limit: 1-3 tools per category

### 2. Rising Star

- Rapid growth: 5,000+ GitHub stars in less than 2 years
- Significant community buzz and adoption
- Solving problems in new or better ways
- Examples: FastAPI, Ruff, uv

### 3. Hidden Gem

- Exceptional quality despite fewer stars (may have <500 stars)
- Solves niche problems elegantly
- Strong recommendation from experienced developers
- Must include compelling justification in PR description

## Quality Requirements

All submissions must satisfy **ALL** of these:

1. **Python-first**: Primarily written in Python (>50% of codebase)
2. **Active**: Commits within the last 12 months
3. **Stable**: Production-ready, not alpha/beta/experimental
4. **Documented**: Clear README with examples and use cases
5. **Unique**: Adds distinct value, not "yet another X"

## Entry Format Reference

### Standard Entry

```markdown
- [project-name](https://github.com/owner/repo) - Description ending with period.
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

## Adding a New Section

If adding a new category:

1. Add section description in italics: `*Libraries for doing X.*`
2. Add the section title to the Table of Contents
3. Keep sections in alphabetical order

## PR Description Template

Please include the following in your PR description:

```
## Why This Project Is Awesome

[Explain which criterion it meets: Industry Standard / Rising Star / Hidden Gem]

## How It Differs

[If similar entries exist, explain what makes this one unique]
```

## Review Process

PRs are reviewed by automated tools and maintainers:

1. **Format Check**: Entry follows the correct format
2. **Category Check**: Placed in the appropriate category/subcategory
3. **Duplicate Check**: Not already listed or previously rejected
4. **Activity Check**: Project shows recent activity
5. **Quality Check**: Meets acceptance criteria

Search previous Pull Requests and Issues before submitting, as yours may be a duplicate.

## Automatic Rejection

PRs will be **closed** if:

- Add more than one project per PR
- Duplicate of existing entry
- Placed under an inappropriate category
- Project is archived or abandoned (no commits in 12+ months)
- No documentation or unclear use case
- Less than 100 GitHub stars AND not justified as a hidden gem
