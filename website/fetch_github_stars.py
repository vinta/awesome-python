#!/usr/bin/env python3
"""Fetch GitHub star counts and owner info for all GitHub repos in README.md."""

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import httpx

from build import extract_github_repo, load_stars

CACHE_MAX_AGE_HOURS = 12
DATA_DIR = Path(__file__).parent / "data"
CACHE_FILE = DATA_DIR / "github_stars.json"
README_PATH = Path(__file__).parent.parent / "README.md"
GRAPHQL_URL = "https://api.github.com/graphql"
BATCH_SIZE = 50

# Allowlist for valid GitHub owner/repo name characters.
# GitHub usernames and repo names only allow letters, digits, hyphens, underscores, and dots.
_GITHUB_NAME_RE = re.compile(r"^[a-zA-Z0-9._-]+$")


def extract_github_repos(text: str) -> set[str]:
    """Extract unique owner/repo pairs from GitHub URLs in markdown text."""
    repos = set()
    for url in re.findall(r"https?://github\.com/[^\s)\]]+", text):
        repo = extract_github_repo(url.split("#")[0].rstrip("/"))
        if repo:
            repos.add(repo)
    return repos


def save_cache(cache: dict) -> None:
    """Write the star cache to disk, creating data/ dir if needed."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_FILE.write_text(
        json.dumps(cache, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def build_graphql_query(repos: list[str]) -> str:
    """Build a GraphQL query with aliases for up to 100 repos."""
    if not repos:
        return ""
    parts = []
    for i, repo in enumerate(repos):
        owner, name = repo.split("/", 1)
        if not _GITHUB_NAME_RE.match(owner) or not _GITHUB_NAME_RE.match(name):
            continue
        parts.append(
            f'repo_{i}: repository(owner: "{owner}", name: "{name}") '
            f"{{ stargazerCount owner {{ login }} defaultBranchRef {{ target {{ ... on Commit {{ committedDate }} }} }} }}"
        )
    if not parts:
        return ""
    return "query { " + " ".join(parts) + " }"


def parse_graphql_response(
    data: dict,
    repos: list[str],
) -> dict[str, dict]:
    """Parse GraphQL response into {owner/repo: {stars, owner}} dict."""
    result = {}
    for i, repo in enumerate(repos):
        node = data.get(f"repo_{i}")
        if node is None:
            continue
        default_branch = node.get("defaultBranchRef") or {}
        target = default_branch.get("target") or {}
        result[repo] = {
            "stars": node.get("stargazerCount", 0),
            "owner": node.get("owner", {}).get("login", ""),
            "last_commit_at": target.get("committedDate", ""),
        }
    return result


def fetch_batch(
    repos: list[str], *, client: httpx.Client,
) -> dict[str, dict]:
    """Fetch star data for a batch of repos via GitHub GraphQL API."""
    query = build_graphql_query(repos)
    if not query:
        return {}
    resp = client.post(GRAPHQL_URL, json={"query": query})
    resp.raise_for_status()
    result = resp.json()
    if "errors" in result:
        for err in result["errors"]:
            print(f"  Warning: {err.get('message', err)}", file=sys.stderr)
    data = result.get("data", {})
    return parse_graphql_response(data, repos)


def main() -> None:
    """Fetch GitHub stars for all repos in README.md, updating the JSON cache."""
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        print("Error: GITHUB_TOKEN environment variable is required.", file=sys.stderr)
        sys.exit(1)

    readme_text = README_PATH.read_text(encoding="utf-8")
    current_repos = extract_github_repos(readme_text)
    current_repos.add("vinta/awesome-python")
    print(f"Found {len(current_repos)} GitHub repos in README.md")

    cache = load_stars(CACHE_FILE)
    now = datetime.now(timezone.utc)

    # Prune entries not in current README
    pruned = {k: v for k, v in cache.items() if k in current_repos}
    if len(pruned) < len(cache):
        print(f"Pruned {len(cache) - len(pruned)} stale cache entries")
    cache = pruned

    # Determine which repos need fetching (missing or stale)
    to_fetch = []
    for repo in sorted(current_repos):
        entry = cache.get(repo)
        if entry and "fetched_at" in entry:
            fetched = datetime.fromisoformat(entry["fetched_at"])
            age_hours = (now - fetched).total_seconds() / 3600
            if age_hours < CACHE_MAX_AGE_HOURS:
                continue
        to_fetch.append(repo)

    print(f"{len(to_fetch)} repos to fetch ({len(current_repos) - len(to_fetch)} cached)")

    if not to_fetch:
        save_cache(cache)
        print("Cache is up to date.")
        return

    # Fetch in batches
    fetched_count = 0
    skipped_repos: list[str] = []

    now_iso = now.isoformat()
    total_batches = (len(to_fetch) + BATCH_SIZE - 1) // BATCH_SIZE

    with httpx.Client(
        headers={"Authorization": f"bearer {token}", "Content-Type": "application/json"},
        transport=httpx.HTTPTransport(retries=2),
        timeout=30,
    ) as client:
        for i in range(0, len(to_fetch), BATCH_SIZE):
            batch = to_fetch[i : i + BATCH_SIZE]
            batch_num = i // BATCH_SIZE + 1
            print(f"Fetching batch {batch_num}/{total_batches} ({len(batch)} repos)...")

            try:
                results = fetch_batch(batch, client=client)
            except httpx.HTTPStatusError as e:
                print(f"HTTP error {e.response.status_code}", file=sys.stderr)
                if e.response.status_code == 401:
                    print("Error: Invalid GITHUB_TOKEN.", file=sys.stderr)
                    sys.exit(1)
                print("Saving partial cache and exiting.", file=sys.stderr)
                save_cache(cache)
                sys.exit(1)

            for repo in batch:
                if repo in results:
                    cache[repo] = {**results[repo], "fetched_at": now_iso}
                    fetched_count += 1
                else:
                    skipped_repos.append(repo)

            # Save after each batch in case of interruption
            save_cache(cache)

    if skipped_repos:
        print(f"Skipped {len(skipped_repos)} repos (deleted/private/renamed)")
    print(f"Done. Fetched {fetched_count} repos, {len(cache)} total cached.")


if __name__ == "__main__":
    main()
