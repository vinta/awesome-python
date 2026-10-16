"""List the maintainer's GitHub stars that could be README.md candidates.

Drops stars that fail a check needing no judgment: already listed, own repo,
archived, no push in 12 months, or created under a month ago. These drops are
recomputed every run, so a repo that becomes active again resurfaces. An
incremental run also drops stars already judged: model screen-outs in
local/starred-scan.tsv and maintainer rejections under docs/audit-logs.md
"Rejected Additions". `--full` keeps them and shows the earlier verdict in the
`prior` column. Prints survivors as TSV on stdout, drop counts on stderr.
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


def prior_verdicts() -> dict[str, str]:
    """Repo -> earlier verdict. The ledger is append-only, so its last row per repo wins; a maintainer rejection outranks both."""
    prior = {}
    if LEDGER.exists():
        for line in LEDGER.read_text().splitlines()[1:]:
            repo, date, reason = line.split("\t", 2)
            prior[repo.lower()] = f"screened out {date}: {reason}"
    register = REGISTER.read_text().splitlines()
    start = register.index("## Rejected Additions")
    for line in register[start + 1 :]:
        if line.startswith("## "):
            break
        if match := REJECTED_LINE_RE.match(line):
            prior[match.group(1).lower()] = f"rejected {match.group(2)}"
    return prior


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--full", action="store_true", help="rejudge stars already screened out or rejected")
    args = parser.parse_args()

    now = datetime.now(UTC)
    login = gh("api", "user", "--jq", ".login").strip().lower()
    listed = listed_repos()
    prior = prior_verdicts()

    stars: list[Star] = [json.loads(line) for line in gh("api", "--paginate", "user/starred?per_page=100", "--jq", ".[]").splitlines()]
    dropped = Counter()
    print("repo\tlanguage\tstars\tpushed\ttopics\tdescription\tprior")
    for star in stars:
        repo = star["full_name"].lower()
        verdict = prior.get(repo) or prior.get(f"{star['owner']['login'].lower()}/*")
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


if __name__ == "__main__":
    main()
