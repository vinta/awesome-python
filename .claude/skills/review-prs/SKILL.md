---
name: review-prs
description: Triage open PRs — screen from the diff, delegate the admission judgment to audit-the-list, then merge or close on GitHub. Fire when the maintainer asks to review PRs, process the PR queue, or judge whether a specific PR should be merged.
argument-hint: [PR numbers]
---

# Review PRs

A PR review turns the open queue into terminal states: merged, closed, or explicitly parked. The rules live in CONTRIBUTING.md (Quality Requirements, Admission, Review Process, Automatic Rejection) — this skill is the workflow that applies them, not a second copy. Every PR named in chat is a PR link, `[#<number>](https://github.com/vinta/awesome-python/pull/<number>)`, so the maintainer can open it from the terminal.

## 1. Fetch

Arguments name specific PRs; otherwise take the queue: `gh pr list --repo vinta/awesome-python --limit 10 --json number,title,author,url,body,files,mergeable,mergeStateStatus`. Fetch all diffs in parallel: `gh pr diff <number> --repo vinta/awesome-python`.

Sort the batch: entry additions continue; anything else (typo fixes, website changes, docs) is out of scope — report it under "needs human" and touch nothing, so it resurfaces every run until a human acts. Done when every PR is sorted and has its diff.

## 2. Screen

Apply the Automatic Rejection rules that the diff and PR metadata answer without judgment. The recently-closed-duplicate rule needs a lookup: `gh pr list --repo vinta/awesome-python --state closed --search "<project name>" --limit 10`. A screened-out PR goes straight to step 4 as a close, with the rule it broke as its reason.

Resolve each survivor's target use case against the current README — a diff's context lines show the base the PR was written on, which may have changed since. A merge conflict rides to the Merge arm, which absorbs it. Done when every surviving PR names its target use case.

## 3. Judge

Group survivors by target use case — PRs proposing entries for the same use case compete for the same slots, so they ride one invocation. Per group, invoke the `audit-the-list` skill with arguments in this shape: "Judge proposed entries <names, each with its PR number> for the <section — subcategory> use case. Evidence and Verdicts steps only; report the verdicts back. No preview page, no README changes, no commits." The verdict for each PR is merge or close, grounded in the fetched evidence; when the use case is at cap, a merge verdict names the entry that leaves. An entry no current use case fits is a third outcome — a structure question: carry it to Act with evidence attached, and the maintainer decides there (mint the subcategory and merge, close, or leave open). Done when every survivor holds a verdict with a reason.

## 4. Act

- **Close**: draft each closing comment — it states the reason and links CONTRIBUTING.md. Per batch of up to 4 closing PRs: print each draft in chat, its PR link as a label above a fenced block holding only the comment bytes, then AskUserQuestion over that batch — arms: close with the draft as printed, close without a comment, keep open. The chat print is the review copy; an option description only points at it. Keep a checklist of which verdicts have been asked; answers often arrive as custom text, and that text is the decision — an edited comment replaces the draft. Then `gh pr close <number> --repo vinta/awesome-python --comment "<comment>"`, or a plain close.
- **Merge**: a clean PR merges with `gh pr merge <number> --repo vinta/awesome-python --merge`. A conflicted one merges locally: `git fetch origin pull/<number>/head`, `git merge FETCH_HEAD` with the standard `Merge pull request #<number> from <owner>/<headRef>` message, resolving the conflict by placing the entry correctly — GitHub still marks the PR merged and the contributor keeps credit. Either way, reconcile the section per CONTRIBUTING before pushing: remove the entry the verdict displaced, fix the new entry's display name and Entry Ordering position, `make test`, commit. An add-only diff that displaces is the normal case — the removal is this step's job, not the contributor's.
Done when every verdict has been adjudicated by the maintainer and its action executed, with every posted comment byte-identical to a printed draft or to the custom text the maintainer supplied. A kept-open PR resurfaces next run — that is its point.

## 5. Report

Summary table: PR link, verdict, action taken, plus the needs-human list. Done when every fetched PR ends in exactly one state — merged with its section reconciled, closed, or left open (kept open, needs-human, or structure question pending).
