#!/usr/bin/env python3
"""Cross-check last-30-day PyPI download counts for given names via BigQuery.

Queries the canonical source ClickPy mirrors —
`bigquery-public-data.pypi.file_downloads` via the `bq` CLI — and prints
name<TAB>count TSV to stdout. Names resolve through
data/pypi_name_overrides.json, matching the cache sweep. Maintainer-local (needs a personal GCP
account) and print-only: data/pypi_downloads.tsv is written solely by
fetch_pypi_downloads_via_clickpy.py.

Targeted cross-checks only — full-README sweeps belong to ClickPy. The
dry-run scan estimate scales with the IN list (measured 2026-08-16:
~38 GB for 2 names, ~275 GB for 53, ~1.2 TB for the full README — past
both MAX_BYTES_BILLED and the 1 TiB/month free tier), and BigQuery
enforces MAX_BYTES_BILLED against that pre-run estimate, so oversized
name lists fail before billing. Actual billed bytes come in far lower
via cluster pruning (33.7 GB for a single name). The table is
partitioned on timestamp and clustered on the top-level `project`
column — filter on `project`, never `file.project`: both hold identical
values (verified 2026-08-16, 408M rows on one day, zero mismatches), but
only a `project` filter gets cluster pruning, and the `file` record
costs ~4x more to scan. Always --dry-run first to check the estimate.

Usage: python fetch_pypi_downloads_via_bigquery.py [--dry-run] NAME [NAME ...]
"""

import subprocess
import sys
from json import loads

from fetch_pypi_downloads_via_clickpy import resolve

MAX_BYTES_BILLED = 400_000_000_000


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
    result = subprocess.run(cmd, capture_output=True, text=True, check=False)
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
    names = set()
    for arg in sys.argv[1:]:
        if arg == "--dry-run":
            continue
        pkg = resolve(arg)
        if pkg is None:
            print(f"{arg}: not pip-installable per pypi_name_overrides.json, skipping", file=sys.stderr)
        else:
            names.add(pkg)
    names = sorted(names)
    if not names:
        print("Usage: python fetch_pypi_downloads_via_bigquery.py [--dry-run] NAME [NAME ...]", file=sys.stderr)
        sys.exit(1)
    counts = fetch_bigquery(names, dry_run)
    for name in names:
        print(f"{name}\t{counts.get(name, 'NOT_FOUND')}")


if __name__ == "__main__":
    main()
