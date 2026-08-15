#!/usr/bin/env python3
"""Fetch last-30-day PyPI download counts for README entries.

Default source is ClickPy, ClickHouse's public mirror of the PyPI download
dataset (sql-clickhouse.clickhouse.com, user `demo`, no key, no personal
account): one batched query covers the full README in under a second.
Playground limits — 60 queries/hour/IP, 1000 result rows — sit far above
a full-README sweep. The per-day table is a SummingMergeTree, so the
query must sum(count) GROUP BY, never count raw rows. Counts include
mirror/CI traffic, same as BigQuery's; never mix these figures with
pypistats.org, which excludes mirrors by default.

--bigquery switches to the canonical source ClickPy mirrors:
`bigquery-public-data.pypi.file_downloads` via the `bq` CLI (needs a
personal GCP account, so it is a maintainer-local cross-check, not the
default). The table is partitioned on timestamp and clustered on the
top-level `project` column — filter on `project`, never `file.project`:
both hold identical values (verified 2026-08-16, 408M rows on one day,
zero mismatches), but only a `project` filter gets cluster pruning, and
the `file` record costs ~4x more to scan. A 30-day query dry-runs at up
to ~275 GB (the pre-pruning upper bound for a full-README IN list; small
lists estimate lower); actual billed bytes shrink further with cluster
pruning (33.7 GB measured for a single name), so even a full-README sweep
fits the 1 TiB/month free tier. MAX_BYTES_BILLED is a safety net against
accidentally unpartitioned queries; BigQuery enforces it against the
pre-run upper bound, so it must stay above the dry-run estimate or every
query fails. --dry-run (BigQuery only) prints the scan estimate without
running.

Results are cached to data/pypi_downloads.tsv (merged with any existing
rows); names with no PyPI rows are written as NOT_FOUND.

Usage: python fetch_pypi_downloads.py [--bigquery] [--dry-run] [--names-file FILE]
"""

import re
import subprocess
import sys
from json import loads
from pathlib import Path

import httpx
from readme_parser import parse_readme

DATA_DIR = Path(__file__).parent / "data"
OUT_FILE = DATA_DIR / "pypi_downloads.tsv"
README_PATH = Path(__file__).parent.parent / "README.md"
MAX_BYTES_BILLED = 400_000_000_000
CLICKPY_URL = "https://sql-clickhouse.clickhouse.com/?user=demo"

# PyPI normalizes names to lowercase with runs of -, _, . collapsed to -.
PYPI_NAME_RE = re.compile(r"^[a-z0-9]([a-z0-9-]*[a-z0-9])?$")


def normalize(name: str) -> str:
    return re.sub(r"[-_.]+", "-", name.lower())


def collect_names(readme_text: str) -> list[str]:
    names = set()
    for group in parse_readme(readme_text):
        for section in group["categories"]:
            for entry in section["entries"]:
                normalized = normalize(entry["name"])
                if PYPI_NAME_RE.match(normalized):
                    names.add(normalized)
    return sorted(names)


def fetch_clickpy(names: list[str]) -> dict[str, int]:
    in_list = ", ".join(f"'{name}'" for name in names)
    query = (
        "SELECT project, sum(count) AS downloads "
        "FROM pypi.pypi_downloads_per_day "
        f"WHERE project IN ({in_list}) AND date >= today() - 30 "
        "GROUP BY project FORMAT JSON"
    )
    resp = httpx.post(CLICKPY_URL, content=query, timeout=60)
    resp.raise_for_status()
    return {row["project"]: int(row["downloads"]) for row in resp.json()["data"]}


def fetch_bigquery(names: list[str], dry_run: bool) -> dict[str, int]:
    in_list = ", ".join(f"'{name}'" for name in names)
    query = (
        "SELECT project, COUNT(*) AS downloads "
        "FROM `bigquery-public-data.pypi.file_downloads` "
        "WHERE DATE(timestamp) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) "
        "AND CURRENT_DATE() "
        f"AND project IN ({in_list}) "
        "GROUP BY project"
    )
    cmd = ["bq", "query", "--use_legacy_sql=false", "--format=json", f"--maximum_bytes_billed={MAX_BYTES_BILLED}"]
    if dry_run:
        cmd.append("--dry_run")
    cmd.append(query)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        sys.exit(1)
    if dry_run:
        print(result.stdout.strip() or result.stderr.strip())
        sys.exit(0)
    rows = loads(result.stdout)
    return {row["project"]: int(row["downloads"]) for row in rows}


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    use_bigquery = "--bigquery" in sys.argv
    if dry_run and not use_bigquery:
        print("Error: --dry-run only applies to --bigquery.", file=sys.stderr)
        sys.exit(1)
    if "--names-file" in sys.argv:
        names_path = Path(sys.argv[sys.argv.index("--names-file") + 1])
        names = sorted({normalize(line) for line in names_path.read_text().split() if line})
    else:
        names = collect_names(README_PATH.read_text())
    print(f"Querying {len(names)} package names...")
    counts = fetch_bigquery(names, dry_run) if use_bigquery else fetch_clickpy(names)
    merged: dict[str, str] = {}
    if OUT_FILE.exists():
        for line in OUT_FILE.read_text().splitlines():
            name, _, value = line.partition("\t")
            merged[name] = value
    for name in names:
        merged[name] = str(counts.get(name, "NOT_FOUND"))
    OUT_FILE.write_text("\n".join(f"{name}\t{value}" for name, value in sorted(merged.items())) + "\n")
    found = sum(1 for name in names if name in counts)
    print(f"Done. {found}/{len(names)} names found on PyPI. Cached to {OUT_FILE}")


if __name__ == "__main__":
    main()
