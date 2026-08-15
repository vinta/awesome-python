#!/usr/bin/env python3
"""Fetch last-30-day PyPI download counts for all README entries via ClickPy.

ClickPy is ClickHouse's public mirror of the PyPI download dataset
(sql-clickhouse.clickhouse.com, user `demo`, no key, no personal
account): one batched query covers the full README in under a second.
Playground limits — 60 queries/hour/IP, 1000 result rows — sit far above
a full-README sweep. The per-day table is a SummingMergeTree, so the
query must sum(count) GROUP BY, never count raw rows. Counts include
mirror/CI traffic; never mix these figures with pypistats.org, which
excludes mirrors by default.

This script is the sole writer of data/pypi_downloads.tsv and rewrites it
from scratch each run, so entries removed from README.md drop out
naturally; names with no PyPI rows are written as NOT_FOUND. Cross-checks
against other sources (fetch_pypi_downloads_via_bigquery.py,
fetch_pypi_downloads_via_pepy.py) print to stdout and never touch the
cache.

Usage: python fetch_pypi_downloads_via_clickpy.py
"""

import re
from pathlib import Path

import httpx
from readme_parser import parse_readme

DATA_DIR = Path(__file__).parent / "data"
OUT_FILE = DATA_DIR / "pypi_downloads.tsv"
README_PATH = Path(__file__).parent.parent / "README.md"
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


def main() -> None:
    names = collect_names(README_PATH.read_text())
    print(f"Querying {len(names)} package names...")
    counts = fetch_clickpy(names)
    OUT_FILE.write_text("\n".join(f"{name}\t{counts.get(name, 'NOT_FOUND')}" for name in names) + "\n")
    print(f"Done. {len(counts)}/{len(names)} names found on PyPI. Cached to {OUT_FILE}")


if __name__ == "__main__":
    main()
