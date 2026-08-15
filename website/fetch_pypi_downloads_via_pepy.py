#!/usr/bin/env python3
"""Spot-check last-30-day PyPI download counts via the pepy.tech API.

Cross-check for a handful of packages during audits — not for full-README
sweeps: the free API key is throttled to 5 requests/minute (10 burst), so
this script sleeps 12s between requests and 530 names would take ~2 hours
(use fetch_pypi_downloads_via_clickpy.py for bulk). Reads PEPY_TECH_API_KEY from the
environment, falling back to the repo-root .env. The v2 endpoint returns
~90 days of per-day per-version counts; this script sums the most recent
30 days present in the response across all versions. pepy counts include
mirror/CI traffic (CI filtering is a paid pepy feature), matching the
ClickPy/BigQuery figures; pypistats.org excludes mirrors, so never mix
the two in one comparison. Results print to stdout as TSV and are not
cached — data/pypi_downloads.tsv stays single-source.

Usage: python fetch_pypi_downloads_via_pepy.py NAME [NAME ...]
"""

import os
import sys
import time
from pathlib import Path

import httpx
from fetch_pypi_downloads_via_clickpy import normalize

ENV_FILE = Path(__file__).parent.parent / ".env"
PEPY_URL = "https://api.pepy.tech/api/v2/projects/{name}"
SECONDS_BETWEEN_REQUESTS = 12


def load_api_key() -> str:
    key = os.environ.get("PEPY_TECH_API_KEY", "")
    if not key and ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            name, sep, value = line.partition("=")
            if sep and name.strip() == "PEPY_TECH_API_KEY":
                key = value.strip()
    if not key:
        print("Error: PEPY_TECH_API_KEY not set (environment or repo-root .env).", file=sys.stderr)
        sys.exit(1)
    return key


def last_30_day_total(downloads_per_day: dict[str, dict[str, int]]) -> int:
    recent_days = sorted(downloads_per_day)[-30:]
    return sum(sum(downloads_per_day[day].values()) for day in recent_days)


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python fetch_pypi_downloads_via_pepy.py NAME [NAME ...]", file=sys.stderr)
        sys.exit(1)
    names = [normalize(name) for name in sys.argv[1:]]
    with httpx.Client(headers={"X-API-Key": load_api_key()}, timeout=30) as client:
        for i, name in enumerate(names):
            if i:
                time.sleep(SECONDS_BETWEEN_REQUESTS)
            resp = client.get(PEPY_URL.format(name=name))
            if resp.status_code == 404:
                print(f"{name}\tNOT_FOUND")
                continue
            resp.raise_for_status()
            print(f"{name}\t{last_30_day_total(resp.json()['downloads'])}")


if __name__ == "__main__":
    main()
