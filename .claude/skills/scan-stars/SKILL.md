---
name: scan-stars
description: Scan the maintainer's GitHub stars for README.md addition candidates; incremental by default, `full` rejudges stars judged before.
argument-hint: [full]
disable-model-invocation: true
---

# Scan stars

A star scan turns the maintainer's GitHub stars into proposed additions. Every star the scan sees ends in one place: listed in README.md, screened out in `local/starred-scan.tsv`, or rejected under `docs/audit-logs.md` "Rejected Additions". Judgment belongs to `audit-the-list` and the rules to CONTRIBUTING.md; this skill only sources candidates and records outcomes.

## 1. Scan

Run `uv run python .claude/skills/scan-stars/scripts/scan_stars.py`, adding `--full` when the argument is `full`. With no ledger yet, a plain run already covers every star. Print the drop counts from stderr. Done when the candidate TSV is in hand.

## 2. Screen

Judge each candidate from its name, description, topics, and language against CONTRIBUTING Quality Requirement 1 (Serves Python Developers), and name the current use case it would compete in. The screen is loose: drop only what plainly fails, and pass anything uncertain on, since `audit-the-list` is the real judge. In a full scan, read the `prior` column as context and overturn a rejection only on new evidence.

Append each screen-out to `local/starred-scan.tsv` as it is decided, one `repo<TAB>yyyy-mm-dd<TAB>reason` row (create the file with header `repo	date	reason`), so an interrupted run keeps its work. The file is append-only; the script reads the last row per repo. A survivor no current use case fits is a structure question: carry it to review with its evidence. Done when every candidate is a ledger row, holds a target use case, or is a structure question.

## 3. Judge

Group survivors by target use case. Per group, invoke `audit-the-list` with: "Judge proposed entries <names, each with its GitHub repo> for the <section — subcategory> use case. Evidence and Verdicts steps only; report the verdicts back. No preview page, no README changes, no commits." Done when every survivor holds an add or drop verdict with a reason, and each add at cap names the entry it displaces.

## 4. Review

Run `preview-verdicts` over all groups: survivors as `add` or `drop` rows, displaced entries as `drop`, structure questions noted on their group, and any `prior` verdict quoted in the row's reason. Done when the maintainer's feedback is processed and they gave the go.

## 5. Record

- **Added**: follow `audit-the-list` step 5 for the README change, one commit per entry.
- **Rejected**: a candidate that reached review and was not added gets one line under "Rejected Additions": `- owner/repo -- yyyy-mm-dd, <downloads>/month (<source>): <reason>.`, replacing its earlier line.
- **Parked**: a structure question the maintainer leaves open gets no record, so it resurfaces next run.

Done when every candidate from step 1 is listed in README.md, a ledger row, a Rejected Additions line, or parked by the maintainer.
