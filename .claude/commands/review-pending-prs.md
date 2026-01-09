---
description: Review pending PRs against CONTRIBUTING.md acceptance criteria.
allowed-tools: Bash(gh api:*), Bash(gh pr close:*), Bash(gh pr diff:*), Bash(gh pr edit:*), Bash(gh pr list:*)
---

## Usage

```
/review-pending-prs
```

## Instructions

1. Fetch 10 open PRs with details: `gh pr list --repo vinta/awesome-python --limit 10 --search "-label:\"claude reviewed\"" --json number,title,author,url,body,files,mergeable,mergeStateStatus`
2. Fetch all PR diffs in parallel: `gh pr diff <number> --repo vinta/awesome-python`
3. Run quick rejection checks (no API calls needed):
   - Has merge conflicts? (from `mergeable`/`mergeStateStatus`)
   - Adds more than one project? (from diff)
   - Duplicate entry? (from diff - URL already in README)
   - Not a project submission? (from diff - e.g., random files, contributor list)
4. For PRs passing quick checks, fetch repo stats: `gh api repos/<owner>/<repo> --jq '{stars: .stargazers_count, created: .created_at, updated: .pushed_at, language: .language, archived: .archived}'`
5. Review against all criteria in [CONTRIBUTING.md](../../CONTRIBUTING.md)
6. Present summary table with recommendations
7. Ask user:

```
Would you like me to:

1. Close the rejected PRs with comments?
2. Add "claude reviewed" label to the passed PRs?
3. Do all
```

## Quick Rejection Checks

Check these rules first - if any fail, recommend rejection:

- PR has merge conflicts
- Add more than one project per PR
- Duplicate of existing entry
- Placed under an inappropriate category
- Project is archived or abandoned (no commits in 12+ months)
- No documentation or unclear use case
- Less than 100 GitHub stars AND not justified as a hidden gem

## Output Format

Provide a simple review:

1. **Rejection Check** - table with the above rules and PASS/REJECT
2. **Recommendation** - PASS or REJECT

## Close PRs

If user asks to close/reject:

```bash
gh pr close <number> --repo vinta/awesome-python --comment "<brief reason>"
```

## Mark as Passed

```bash
gh pr edit <number> --repo vinta/awesome-python --add-label "claude reviewed"
```

## Extra Instructions (If Provided)

$ARGUMENTS
