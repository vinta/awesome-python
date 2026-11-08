"""List the maintainer's GitHub stars that could be README.md candidates.

Drops stars that fail a check needing no judgment: already listed, own repo,
archived, no push in 12 months, or created under a month ago. These drops are
recomputed every run, so a repo that becomes active again resurfaces. An
incremental run also drops stars already judged: model screen-outs in
local/starred-scan.tsv and maintainer rejections under docs/audit-logs.md
"Rejected Additions". `--full` keeps them and shows the earlier verdict in the
`prior` column. Ledger rows and Rejected Additions lines for repos no longer
starred are pruned each run.
Prints survivors as TSV on stdout, drop and prune counts on stderr.
"""

import argparse
import json
import re
import subprocess
import sys
from collections import Counter
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import TypedDict

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "website"))

from readme_parser import parse_readme

LEDGER = ROOT / "local" / "starred-scan.tsv"
REGISTER = ROOT / "docs" / "audit-logs.md"
GITHUB_REPO_RE = re.compile(r"^https://github\.com/([^/#?]+/[^/#?]+)")
REJECTED_LINE_RE = re.compile(r"^- (\S+) -- (.+)$")


class Owner(TypedDict):
    login: str


class Star(TypedDict):
    full_name: str
    owner: Owner
    archived: bool
    pushed_at: str
    created_at: str
    language: str | None
    stargazers_count: int
    topics: list[str]
    description: str | None


def gh(*args: str) -> str:
    return subprocess.run(["gh", *args], capture_output=True, text=True, check=True).stdout


def listed_repos() -> set[str]:
    repos = set()
    for group in parse_readme((ROOT / "README.md").read_text()):
        for category in group["categories"]:
            for link in [*category["entries"], *(sub for entry in category["entries"] for sub in entry["also_see"])]:
                if match := GITHUB_REPO_RE.match(link["url"]):
                    repos.add(match.group(1).removesuffix(".git").lower())
    return repos


def ledger_repo(row: str) -> str:
    """A ledger row starts with the repo's GitHub URL, or a bare owner/repo in older rows."""
    return row.split("\t", 1)[0].removeprefix("https://github.com/").lower()


def prior_verdicts() -> dict[str, str | None]:
    """The last ledger row wins; `parked` reopens a repo. An exact registered rejection still wins."""
    prior: dict[str, str | None] = {}
    if LEDGER.exists():
        for line in LEDGER.read_text().splitlines()[1:]:
            _, date, reason = line.split("\t", 2)
            prior[ledger_repo(line)] = None if reason == "parked" else f"screened out {date}: {reason}"
    register = REGISTER.read_text().splitlines()
    start = register.index("## Rejected Additions")
    for line in register[start + 1 :]:
        if line.startswith("## "):
            break
        if match := REJECTED_LINE_RE.match(line):
            prior[match.group(1).lower()] = f"rejected {match.group(2)}"
    return prior


def prune_ledger(starred: set[str]) -> int:
    if not LEDGER.exists():
        return 0
    header, *rows = LEDGER.read_text().splitlines()
    kept = [row for row in rows if ledger_repo(row) in starred]
    if len(kept) < len(rows):
        LEDGER.write_text("\n".join([header, *kept]) + "\n")
    return len(rows) - len(kept)


def prune_register(starred: set[str]) -> int:
    """Drop Rejected Additions lines for repos no longer starred; `owner/*` patterns stay."""
    lines = REGISTER.read_text().splitlines(keepends=True)
    start = lines.index("## Rejected Additions\n")
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
    kept = []
    for line in lines[start:end]:
        match = REJECTED_LINE_RE.match(line)
        if match and not match.group(1).endswith("/*") and match.group(1).lower() not in starred:
            continue
        kept.append(line)
    if len(kept) < end - start:
        REGISTER.write_text("".join(lines[:start] + kept + lines[end:]))
    return end - start - len(kept)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--full", action="store_true", help="rejudge stars already screened out or rejected")
    args = parser.parse_args()

    now = datetime.now(UTC)
    login = gh("api", "user", "--jq", ".login").strip().lower()
    listed = listed_repos()
    prior = prior_verdicts()

    stars: list[Star] = [json.loads(line) for line in gh("api", "--paginate", "user/starred?per_page=100", "--jq", ".[]").splitlines()]
    starred = {star["full_name"].lower() for star in stars}
    pruned = prune_ledger(starred)
    pruned_rejections = prune_register(starred)
    dropped = Counter()
    print("repo\tlanguage\tstars\tpushed\ttopics\tdescription\tprior")
    for star in stars:
        repo = star["full_name"].lower()
        verdict = prior[repo] if repo in prior else prior.get(f"{star['owner']['login'].lower()}/*")
        if repo in listed:
            dropped["already listed"] += 1
        elif star["owner"]["login"].lower() == login:
            dropped["own repo"] += 1
        elif star["archived"]:
            dropped["archived"] += 1
        elif datetime.fromisoformat(star["pushed_at"]) < now - timedelta(days=365):
            dropped["no push in 12 months"] += 1
        elif datetime.fromisoformat(star["created_at"]) > now - timedelta(days=30):
            dropped["created under a month ago"] += 1
        elif verdict and not args.full:
            dropped["judged before"] += 1
        else:
            description = " ".join((star["description"] or "").split())
            print("\t".join([star["full_name"], star["language"] or "-", str(star["stargazers_count"]), star["pushed_at"][:10], ",".join(star["topics"]), description, verdict or ""]))

    print(f"{len(stars)} stars; {len(stars) - dropped.total()} candidates", file=sys.stderr)
    for reason, count in dropped.most_common():
        print(f"  dropped {count}: {reason}", file=sys.stderr)
    if pruned:
        print(f"  pruned {pruned} ledger rows for repos no longer starred", file=sys.stderr)
    if pruned_rejections:
        print(f"  pruned {pruned_rejections} Rejected Additions lines for repos no longer starred", file=sys.stderr)


if __name__ == "__main__":
    main()
