---
description: Review pending PRs against CONTRIBUTING.md acceptance criteria.
allowed-tools: Bash(gh api:*), Bash(gh pr close:*), Bash(gh pr diff:*), Bash(gh pr edit:*), Bash(gh pr list:*), Bash(gh pr view:*)
---

## Usage

```
/review-pending-prs
```

## Instructions

1. Fetch 10 open PRs (skip reviewed): `gh pr list --repo vinta/awesome-python --limit 10 --search "-label:\"claude reviewed\"" --json number,title,author,url`
2. For each PR:
   - Fetch PR details: `gh pr view <number> --repo vinta/awesome-python --json title,body,author,files,url,mergeable,mergeStateStatus`
   - Fetch PR diff: `gh pr diff <number> --repo vinta/awesome-python`
   - For each project added, fetch repo stats: `gh api repos/<owner>/<repo> --jq '{stars: .stargazers_count, created: .created_at, updated: .pushed_at, language: .language, archived: .archived}'`
3. Review against all criteria in [CONTRIBUTING.md](../../CONTRIBUTING.md)
4. Present summary table of 10 PRs with recommendations
5. Ask user:

```
Would you like me to:

1. Close the rejected PRs with comments?
2. Add "claude reviewed" label to the approved PRs?
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

1. **Rejection Check** - table with the above rules and PASS/FAIL
2. **Recommendation** - APPROVE or REJECT

## Closing PRs

If user asks to close/reject:

```bash
gh pr close <number> --repo vinta/awesome-python --comment "<brief reason>"
```

## Mark as Reviewed

```bash
gh pr edit <number> --repo vinta/awesome-python --add-label "claude reviewed"
```

## Extra Instructions (If Provided)

$ARGUMENTS
