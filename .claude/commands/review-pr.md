# Review PR Command

Review a PR against [CONTRIBUTING.md](../../CONTRIBUTING.md) acceptance criteria.

## Usage

```
/review-pr <pr-url>
```

## Instructions

1. Read [CONTRIBUTING.md](../../CONTRIBUTING.md) for current review criteria
2. Extract PR number from argument (supports full URL or just number)
3. Fetch PR details: `gh pr view <number> --repo vinta/awesome-python --json title,body,author,files,url`
4. Fetch PR diff: `gh pr diff <number> --repo vinta/awesome-python`
5. For each project added, fetch repo stats: `gh api repos/<owner>/<repo> --jq '{stars: .stargazers_count, created: .created_at, updated: .pushed_at, language: .language, archived: .archived}'`
6. Review against all criteria in CONTRIBUTING.md

## Quick Rejection Checks

Check these rules first - if any fail, recommend rejection:

- Add more than one project per PR
- Duplicate of existing entry
- Self-promotion (wait for someone else to find it useful and submit)
- Less than 100 GitHub stars AND not justified as a hidden gem
- Project is archived or abandoned (no commits in 12+ months)
- No documentation or unclear use case

## Output Format

Provide a simple review:

1. **Rejection Check** - table with the 3 rules and PASS/FAIL
2. **Recommendation** - APPROVE for further review, or REJECT with reason

## Closing PRs

If user asks to close/reject:

```bash
gh pr close <number> --repo vinta/awesome-python --comment "<brief reason>"
```

Keep rejection comments short and reference CONTRIBUTING.md.

$ARGUMENTS
