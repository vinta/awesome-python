# Contributing

## Automatic Rejection

PRs will be **closed** if:

- Adding multiple projects in one PR
- Duplicate of existing entry or recently-closed PR
- Empty or placeholder PR descriptions
- Placed under an inappropriate category
- Project is archived or abandoned (no commits in 12+ months)
- No documentation or unclear use case
- Less than 100 GitHub stars without Hidden Gem justification
- Repository less than 3 months old

## Quality Requirements

All submissions must satisfy **ALL** of these:

1. **Python-first**: Primarily written in Python (>50% of codebase)
2. **Active**: Commits within the last 12 months
3. **Stable**: Production-ready, not alpha/beta/experimental
4. **Documented**: Clear README with examples and use cases
5. **Unique**: Adds distinct value, not "yet another X"
6. **Established**: Repository at least 1 month old

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

- Exceptional quality despite fewer stars (100-500 stars preferred; < 100 requires strong justification)
- Solves niche problems elegantly
- Strong recommendation from experienced developers
- **Must demonstrate real-world usage** (not a project published last week)
- Repository must be at least 6 months old with consistent activity
- Must include compelling justification in PR description

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

1. Add section description in italics: `*Libraries for doing X.*`
2. Add the section title to the Table of Contents
3. Keep sections in alphabetical order

## Review Process

PRs are reviewed by automated tools and maintainers:

1. **Format Check**: Entry follows the correct format
2. **Category Check**: Placed in the appropriate category/subcategory
3. **Duplicate Check**: Not already listed or previously rejected
4. **Activity Check**: Project shows recent activity
5. **Quality Check**: Meets acceptance criteria

Search previous Pull Requests and Issues before submitting, as yours may be a duplicate.
