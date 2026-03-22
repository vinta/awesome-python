#!/usr/bin/env python3
"""Build a single-page HTML site from README.md for the awesome-python website."""

import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import TypedDict

from jinja2 import Environment, FileSystemLoader
from readme_parser import parse_readme


class StarData(TypedDict):
    stars: int
    owner: str
    last_commit_at: str
    fetched_at: str


GITHUB_REPO_URL_RE = re.compile(r"^https?://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$")

SOURCE_TYPE_DOMAINS = {
    "docs.python.org": "Built-in",
    "gitlab.com": "GitLab",
    "bitbucket.org": "Bitbucket",
}


def detect_source_type(url: str) -> str | None:
    """Detect source type from URL domain. Returns None for GitHub URLs."""
    if GITHUB_REPO_URL_RE.match(url):
        return None
    for domain, source_type in SOURCE_TYPE_DOMAINS.items():
        if domain in url:
            return source_type
    if "github.com" not in url:
        return "External"
    return None


def extract_github_repo(url: str) -> str | None:
    """Extract owner/repo from a GitHub repo URL. Returns None for non-GitHub URLs."""
    m = GITHUB_REPO_URL_RE.match(url)
    return m.group(1) if m else None


def load_stars(path: Path) -> dict[str, StarData]:
    """Load star data from JSON. Returns empty dict if file doesn't exist or is corrupt."""
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {}
    return {}


def sort_entries(entries: list[dict]) -> list[dict]:
    """Sort entries by stars descending, then name ascending.

    Three tiers: starred entries first, stdlib second, other non-starred last.
    """

    def sort_key(entry: dict) -> tuple[int, int, int, str]:
        stars = entry["stars"]
        name = entry["name"].lower()
        if stars is not None:
            builtin = 1 if entry.get("source_type") == "Built-in" else 0
            return (0, -stars, builtin, name)
        if entry.get("source_type") == "Built-in":
            return (1, 0, 0, name)
        return (2, 0, 0, name)

    return sorted(entries, key=sort_key)


def extract_entries(
    categories: list[dict],
    groups: list[dict],
) -> list[dict]:
    """Flatten categories into individual library entries for table display.

    Entries appearing in multiple categories are merged into a single entry
    with lists of categories and groups.
    """
    cat_to_group: dict[str, str] = {}
    for group in groups:
        for cat in group["categories"]:
            cat_to_group[cat["name"]] = group["name"]

    seen: dict[tuple[str, str], dict] = {}  # (url, name) -> entry
    entries: list[dict] = []
    for cat in categories:
        group_name = cat_to_group.get(cat["name"], "Other")
        for entry in cat["entries"]:
            url = entry["url"]
            key = (url, entry["name"])
            if key in seen:
                existing = seen[key]
                if cat["name"] not in existing["categories"]:
                    existing["categories"].append(cat["name"])
                if group_name not in existing["groups"]:
                    existing["groups"].append(group_name)
                subcat = entry["subcategory"]
                if subcat:
                    scoped = f"{cat['name']} > {subcat}"
                    if not any(s["value"] == scoped for s in existing["subcategories"]):
                        existing["subcategories"].append({"name": subcat, "value": scoped})
            else:
                merged = {
                    "name": entry["name"],
                    "url": url,
                    "description": entry["description"],
                    "categories": [cat["name"]],
                    "groups": [group_name],
                    "subcategories": [{"name": entry["subcategory"], "value": f"{cat['name']} > {entry['subcategory']}"}] if entry["subcategory"] else [],
                    "stars": None,
                    "owner": None,
                    "last_commit_at": None,
                    "source_type": detect_source_type(url),
                    "also_see": entry["also_see"],
                }
                seen[key] = merged
                entries.append(merged)
    return entries


def format_stars_short(stars: int) -> str:
    """Format star count as compact string like '230k'."""
    if stars >= 1000:
        return f"{stars // 1000}k"
    return str(stars)


def build(repo_root: str) -> None:
    """Main build: parse README, render single-page HTML via Jinja2 templates."""
    repo = Path(repo_root)
    website = repo / "website"
    readme_text = (repo / "README.md").read_text(encoding="utf-8")

    subtitle = ""
    for line in readme_text.split("\n"):
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            subtitle = stripped
            break

    parsed_groups = parse_readme(readme_text)

    categories = [cat for g in parsed_groups for cat in g["categories"]]
    total_entries = sum(c["entry_count"] for c in categories)
    entries = extract_entries(categories, parsed_groups)

    stars_data = load_stars(website / "data" / "github_stars.json")

    repo_self = stars_data.get("vinta/awesome-python", {})
    repo_stars = format_stars_short(repo_self["stars"]) if "stars" in repo_self else None

    for entry in entries:
        repo_key = extract_github_repo(entry["url"])
        if not repo_key and entry.get("source_type") == "Built-in":
            repo_key = "python/cpython"
        if repo_key and repo_key in stars_data:
            sd = stars_data[repo_key]
            entry["stars"] = sd["stars"]
            entry["owner"] = sd["owner"]
            entry["last_commit_at"] = sd.get("last_commit_at", "")

    entries = sort_entries(entries)

    env = Environment(
        loader=FileSystemLoader(website / "templates"),
        autoescape=True,
    )

    site_dir = website / "output"
    if site_dir.exists():
        shutil.rmtree(site_dir)
    site_dir.mkdir(parents=True)

    tpl_index = env.get_template("index.html")
    (site_dir / "index.html").write_text(
        tpl_index.render(
            categories=categories,
            subtitle=subtitle,
            entries=entries,
            total_entries=total_entries,
            total_categories=len(categories),
            repo_stars=repo_stars,
            build_date=datetime.now(timezone.utc).strftime("%B %d, %Y"),
        ),
        encoding="utf-8",
    )

    static_src = website / "static"
    static_dst = site_dir / "static"
    if static_src.exists():
        shutil.copytree(static_src, static_dst, dirs_exist_ok=True)

    (site_dir / "llms.txt").write_text(readme_text, encoding="utf-8")

    print(f"Built single page with {len(parsed_groups)} groups, {len(categories)} categories")
    print(f"Total entries: {total_entries}")
    print(f"Output: {site_dir}")


if __name__ == "__main__":
    build(str(Path(__file__).parent.parent))
