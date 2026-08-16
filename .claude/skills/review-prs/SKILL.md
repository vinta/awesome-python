---
name: review-prs
description: Triage open PRs — screen from the diff, delegate the admission judgment to audit-the-list, then merge or close on GitHub. Fire when the maintainer asks to review PRs, process the PR queue, or judge whether a specific PR should be merged.
argument-hint: [PR numbers]
---

# Review PRs

A PR review turns the open queue into terminal states: merged, closed, or explicitly parked. The rules live in CONTRIBUTING.md (Quality Requirements, Admission, Review Process, Automatic Rejection) — this skill is the workflow that applies them, not a second copy.

## 1. Fetch

Arguments name specific PRs; otherwise take the queue: `gh pr list --repo vinta/awesome-python --limit 10 --search '-label:"claude reviewed"' --json number,title,author,url,body,files,mergeable,mergeStateStatus`. Fetch all diffs in parallel: `gh pr diff <number> --repo vinta/awesome-python`.

Sort the batch: entry additions continue; anything else (typo fixes, website changes, docs) is out of scope — report it under "needs human" and touch nothing, so it resurfaces every run until a human acts. Done when every PR is sorted and has its diff.

## 2. Screen

Apply the Automatic Rejection rules that the diff and PR metadata answer without judgment, plus merge conflicts (`mergeable`/`mergeStateStatus`). The recently-closed-duplicate rule needs a lookup: `gh pr list --repo vinta/awesome-python --state closed --search "<project name>" --limit 10`. A screened-out PR goes straight to step 4 as a close, with the rule it broke as its reason. Done when every surviving PR names its target use case.

## 3. Judge

Group survivors by target use case — PRs proposing entries for the same use case compete for the same slots, so they ride one invocation. Per group, invoke the audit-the-list skill with arguments in this shape: "Judge proposed entries <names, each with its PR number> for the <section — subcategory> use case. Evidence and Verdicts steps only; report the verdicts back. No preview page, no README changes, no commits." The verdict for each PR is merge or close, grounded in the fetched evidence; when the use case is at cap, a merge verdict names the entry that leaves. Done when every survivor holds a verdict with a reason.

## 4. Act

- **Close**: per closing PR, AskUserQuestion presenting the draft closing comment — the comment states the reason and links CONTRIBUTING.md. Arms: close with this comment, close without a comment, keep open. Then `gh pr close <number> --repo vinta/awesome-python --comment "<comment>"`, or a plain close.
- **Merge**: `gh pr merge <number> --repo vinta/awesome-python --merge`, then reconcile the section locally: `git pull`, remove the entry the verdict displaced, put the new entry at its Entry Ordering position, `make test`, commit, push. An add-only diff that displaces is the normal case — the removal is this step's job, not the contributor's.
- **Park**: any reviewed PR left open gets `gh pr edit <number> --repo vinta/awesome-python --add-label "claude reviewed"` so the next fetch skips it.

## 5. Report

Summary table: PR, verdict, action taken, plus the needs-human list. Done when every fetched PR ends in exactly one state — merged with its section reconciled, closed, labeled and open, or flagged needs-human.
