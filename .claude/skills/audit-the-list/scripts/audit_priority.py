"""Rank README.md sections for the next audit.

A section's last audit is the newest of: a commit whose subject starts with
`audit: sweep`, `prune: sweep`, or `style: audit` and names the section or its
Thematic Group, and its line under docs/audit-logs.md "Last Audited". A commit
on a merged branch dates from that merge. Sections whose entries changed since
then come first, most changes first; the rest
follow by oldest audit, never-audited first.
"""

import re
import subprocess
import sys
from functools import cache
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "website"))

from readme_parser import parse_readme

# The shortlist reform; audits start after it, and never-audited sections diff against it.
REFORM = "553bf88"
AUDIT_SUBJECT_RE = re.compile(r"^(?:(?:audit|prune): sweep|style: audit) (.+?)(?: —|,| to the shortlist cap|$)")
REGISTER_LINE_RE = re.compile(r"^- (.+?) -- (\d{4}-\d{2}-\d{2})")


def git(*args: str) -> str:
    return subprocess.run(["git", "-C", str(ROOT), *args], capture_output=True, text=True, check=True).stdout


@cache
def entries_at(rev: str) -> dict[str, dict[str, set[str]]]:
    """Section -> {display name: {normalized name, normalized URL}}.

    An entry matches across revisions on either key, so a rename that keeps its link, or a link fix that keeps its name, is no change.
    """
    sections = {}
    for group in parse_readme(git("show", f"{rev}:README.md")):
        for category in group["categories"]:
            links = [*category["entries"], *(sub for entry in category["entries"] for sub in entry["also_see"])]
            sections[category["name"]] = {link["name"]: {re.sub(r"[-_.]+", "-", link["name"]).lower(), link["url"].rstrip("/").lower()} for link in links}
    return sections


def missing(entries: dict[str, set[str]], other: dict[str, set[str]]) -> list[str]:
    """Display names in entries that match no entry in other."""
    keys = set().union(*other.values())
    return [name for name, own in entries.items() if not own & keys]


def resolve(text: str, groups: dict[str, list[str]]) -> list[str]:
    """Sections named in text, longest name first so "Database Drivers" never counts as "Database"."""
    found = []
    for name in sorted(groups, key=len, reverse=True):
        if re.search(rf"(?<!\w){re.escape(name)}(?!\w)", text):
            found.extend(groups[name])
            text = text.replace(name, "")
    return found


def main() -> None:
    current = parse_readme(git("show", "HEAD:README.md"))
    group_of = {c["name"]: g["name"] for g in current for c in g["categories"]}
    # Section names map to themselves, Thematic Group names to all their sections.
    names = {s: [s] for s in group_of} | {g["name"]: [c["name"] for c in g["categories"]] for g in current}

    last: dict[str, tuple[int, str, str]] = {}  # section -> (timestamp, date, rev)

    def stamp(section: str, timestamp: int, date: str, rev: str) -> None:
        if section not in last or timestamp > last[section][0]:
            last[section] = (timestamp, date, rev)

    # Branch commit -> the merge that landed it, so an audit's follow-up `feat: add` commits count as audited.
    landed = {commit: merge for merge in git("rev-list", "--first-parent", "--merges", f"{REFORM}..HEAD").split() for commit in git("rev-list", f"{merge}^1..{merge}").split()}

    unmatched = []
    for line in git("log", "--format=%H%x09%ct%x09%cs%x09%s", f"{REFORM}..HEAD").splitlines():
        rev, timestamp, date, subject = line.split("\t", 3)
        rev = landed.get(rev, rev)
        if match := AUDIT_SUBJECT_RE.match(subject):
            sections = resolve(match.group(1), names)
            for section in sections:
                stamp(section, int(timestamp), date, rev)
            if not sections:
                unmatched.append(subject)

    register = (ROOT / "docs" / "audit-logs.md").read_text().splitlines()
    start = register.index("## Last Audited")
    for lineno, line in enumerate(register[start:], start + 1):
        if match := REGISTER_LINE_RE.match(line):
            blame = git("blame", "--porcelain", "-L", f"{lineno},{lineno}", "--", "docs/audit-logs.md").splitlines()
            rev = blame[0].split()[0]
            if set(rev) == {"0"}:  # uncommitted line
                rev = "HEAD"
            timestamp = int(next(b.split()[1] for b in blame if b.startswith("committer-time ")))
            for section in resolve(match.group(1), names):
                stamp(section, timestamp, match.group(2), rev)

    head = entries_at("HEAD")
    changed, unchanged = [], []
    for section in group_of:
        _, date, rev = last.get(section, (0, "never", REFORM))
        before = entries_at(rev).get(section, {})
        added = missing(head[section], before)
        removed = missing(before, head[section])
        row = (section, date, rev[:7] if section in last else "", added, removed)
        (changed if added or removed else unchanged).append(row)

    # "never" sorts after digits, so map it to "" to put never-audited first.
    changed.sort(key=lambda r: (-(len(r[3]) + len(r[4])), "" if r[1] == "never" else r[1]))
    unchanged.sort(key=lambda r: "" if r[1] == "never" else r[1])

    print("Entries added or removed since last audit:")
    for section, date, rev, added, removed in changed:
        diff = " ".join([*(f"+{n}" for n in sorted(added)), *(f"-{n}" for n in sorted(removed))])
        print(f"  {section} [{group_of[section]}]  last {date} {rev}  {diff}")
    print("\nNo entry changes, oldest audit first:")
    for section, date, rev, _, _ in unchanged:
        print(f"  {section} [{group_of[section]}]  last {date} {rev}")
    if unmatched:
        print("\nAudit subjects naming no current section or group (renamed or dissolved since):")
        for subject in unmatched:
            print(f"  {subject}")


if __name__ == "__main__":
    main()
