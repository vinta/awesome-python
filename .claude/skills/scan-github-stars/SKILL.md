---
name: scan-github-stars
description: Scan the maintainer's GitHub stars for README.md addition candidates; incremental by default, `full` rejudges stars judged before.
argument-hint: [incremental | full]
---

# Scan GitHub stars

A star scan turns the maintainer's GitHub stars into proposed additions. Every star the scan sees ends in one place: listed in README.md, screened out in `local/starred-scan.tsv`, rejected under `docs/audit-logs.md` "Rejected Additions", or parked for another review. Judgment belongs to `audit-the-list` and the rules to CONTRIBUTING.md; this skill only sources candidates and records outcomes.

## 1. Scan

Run `uv run python .claude/skills/scan-github-stars/scripts/scan_github_stars.py`, adding `--full` when the argument is `full`. With no ledger yet, a plain run already covers every star. Print the drop counts from stderr. Done when the candidate TSV is in hand.

## 2. Screen

Judge each candidate from its name, description, topics, and language against CONTRIBUTING Quality Requirement 1 (Serves Python Developers), and name the current use case it would compete in. The screen is loose: drop only what plainly fails, and pass anything uncertain on, since `audit-the-list` is the real judge. In a full scan, read the `prior` column as context and overturn a rejection only on new evidence.

Append each screen-out to `local/starred-scan.tsv` as it is decided, one `repo<TAB>yyyy-mm-dd<TAB>reason` row (create the file with header `repo	date	reason`), so an interrupted run keeps its work. The file is append-only; the script reads the last row per repo. A survivor no current use case fits is a structure question: carry it to review with its evidence. Done when every candidate is a ledger row, holds a target use case, or is a structure question.

## 3. Judge

Group survivors by target use case. Per group, invoke `audit-the-list` with: "Judge proposed entries <names, each with its GitHub repo> for the <section — subcategory> use case. Evidence and Verdicts steps only; report the verdicts back. No preview page, no README changes, no commits." A reject whose reason names an unlisted project as the better pick turns that project into a candidate too: judge it in the same group and mark its source as found in the audit, not starred. Done when every survivor holds an add or reject verdict with a reason, and each add at cap names the entry it displaces.

## 4. Review

Run `preview-verdicts` over all groups: survivors with kind `candidate` and verdict `add` or `reject`, displaced entries with kind `listed` and verdict `remove`, and structure questions with kind `structure` and verdict `park` or `restructure`. Quote any `prior` verdict in the reason. Seed `park` on any row whose verdict rests on a judgment call, except an add where only the tier is in doubt; preserve its kind. Done when the maintainer's feedback is processed and they gave the go.

## 5. Record

- **Added**: follow `audit-the-list` step 5 for the README change, one commit per entry. When the entry links a different repo than the star (a Python binding or client of a starred engine), also append a ledger row `already listed as <entry> (<owner/repo>)` for the star, since the script only recognizes a star whose own repo is linked.
- **Rejected**: a candidate with verdict `reject` gets one line under "Rejected Additions": `- owner/repo -- yyyy-mm-dd, <downloads>/month (<source>): <reason>.`, replacing its earlier line. This exact rejection takes precedence over a parked ledger row.
- **Parked**: leave listed entries in README.md. An unlisted repo with no prior decision needs no record. To reopen one screened out or rejected before, remove its exact "Rejected Additions" line and append `owner/repo<TAB>yyyy-mm-dd<TAB>parked` to the ledger. Its earlier screen-out rows stay as history. The marker also exempts this repo from an `owner/*` rejection; leave that organization line in place for its other repos. A later screen-out or exact rejection excludes the repo again. A new organization-wide rejection must explicitly resolve any parked exceptions it is intended to cover.

Done when every candidate from step 1 is listed in README.md, a ledger row, a Rejected Additions line, or parked by the maintainer.
