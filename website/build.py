#!/usr/bin/env python3
"""Build a single-page HTML site from README.md for the awesome-python website."""

import json
import re
import shutil
from pathlib import Path
from typing import TypedDict

from jinja2 import Environment, FileSystemLoader
from readme_parser import parse_readme, slugify

# Thematic grouping of categories. Each category name must match exactly
# as it appears in README.md (the ## heading text).
SECTION_GROUPS: list[tuple[str, list[str]]] = [
    (
        "Web & API",
        [
            "Admin Panels",
            "CMS",
            "Email",
            "Static Site Generator",
            "URL Manipulation",
            "Web Frameworks",
            "RESTful API",
            "GraphQL",
            "WebSocket",
            "ASGI Servers",
            "WSGI Servers",
            "HTTP Clients",
            "Template Engine",
            "Web Asset Management",
            "Web Content Extracting",
            "Web Crawling",
        ],
    ),
    (
        "AI & Data",
        [
            "AI and Agents",
            "Data Analysis",
            "Data Validation",
            "Data Visualization",
            "Machine Learning",
            "Deep Learning",
            "Computer Vision",
            "Natural Language Processing",
            "Geolocation",
            "Recommender Systems",
            "Robotics",
            "Science",
            "Quantum Computing",
        ],
    ),
    (
        "DevOps & Infrastructure",
        [
            "DevOps Tools",
            "Distributed Computing",
            "Task Queues",
            "Job Scheduler",
            "Serverless Frameworks",
            "Logging",
            "Processes",
            "Shell",
            "Network Virtualization",
            "RPC Servers",
        ],
    ),
    (
        "Database & Storage",
        [
            "Database",
            "Database Drivers",
            "ORM",
            "Caching",
            "Search",
            "Serialization",
        ],
    ),
    (
        "Development Tools",
        [
            "Testing",
            "Debugging Tools",
            "Code Analysis",
            "Build Tools",
            "Algorithms and Design Patterns",
            "Refactoring",
            "Documentation",
            "Editor Plugins and IDEs",
            "Interactive Interpreter",
        ],
    ),
    (
        "CLI & GUI",
        [
            "Command-line Interface Development",
            "Command-line Tools",
            "GUI Development",
        ],
    ),
    (
        "Content & Media",
        [
            "Audio",
            "Video",
            "Game Development",
            "Image Processing",
            "Internationalization",
            "HTML Manipulation",
            "Text Processing",
            "Specific Formats Processing",
            "File Manipulation",
            "Downloader",
        ],
    ),
    (
        "System & Runtime",
        [
            "Asynchronous Programming",
            "Environment Management",
            "Package Management",
            "Package Repositories",
            "Date and Time",
            "Distribution",
            "Hardware",
            "Implementations",
            "Microsoft Windows",
            "Built-in Classes Enhancement",
            "Functional Programming",
            "Configuration Files",
        ],
    ),
    (
        "Security & Auth",
        [
            "Authentication",
            "Cryptography",
            "Penetration Testing",
            "Permissions",
        ],
    ),
    ("Resources", []),  # Filled dynamically from parsed resources
]


def group_categories(
    categories: list[dict],
    resources: list[dict],
) -> list[dict]:
    """Organize categories and resources into thematic section groups."""
    cat_by_name = {c["name"]: c for c in categories}
    groups = []
    grouped_names: set[str] = set()

    for group_name, cat_names in SECTION_GROUPS:
        grouped_names.update(cat_names)
        if group_name == "Resources":
            group_cats = list(resources)
        else:
            group_cats = [cat_by_name[n] for n in cat_names if n in cat_by_name]

        if group_cats:
            groups.append(
                {
                    "name": group_name,
                    "slug": slugify(group_name),
                    "categories": group_cats,
                }
            )

    # Any categories not in a group go into "Other"
    ungrouped = [c for c in categories if c["name"] not in grouped_names]
    if ungrouped:
        groups.append(
            {
                "name": "Other",
                "slug": "other",
                "categories": ungrouped,
            }
        )

    return groups


class Entry(TypedDict):
    name: str
    url: str
    description: str
    category: str
    group: str
    stars: int | None
    owner: str | None
    last_commit_at: str | None


class StarData(TypedDict):
    stars: int
    owner: str
    last_commit_at: str
    fetched_at: str


GITHUB_REPO_URL_RE = re.compile(r"^https?://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$")


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
    """Sort entries by stars descending, then name ascending. No-star entries go last."""

    def sort_key(entry: dict) -> tuple[int, int, str]:
        stars = entry["stars"]
        name = entry["name"].lower()
        if stars is None:
            return (1, 0, name)
        return (0, -stars, name)

    return sorted(entries, key=sort_key)


def extract_entries(
    categories: list[dict],
    groups: list[dict],
) -> list[dict]:
    """Flatten categories into individual library entries for table display."""
    cat_to_group: dict[str, str] = {}
    for group in groups:
        for cat in group["categories"]:
            cat_to_group[cat["name"]] = group["name"]

    entries: list[dict] = []
    for cat in categories:
        group_name = cat_to_group.get(cat["name"], "Other")
        for entry in cat["entries"]:
            entries.append(
                {
                    "name": entry["name"],
                    "url": entry["url"],
                    "description": entry["description"],
                    "category": cat["name"],
                    "group": group_name,
                    "stars": None,
                    "owner": None,
                    "last_commit_at": None,
                    "also_see": entry["also_see"],
                }
            )
    return entries


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

    categories, resources = parse_readme(readme_text)
    # All fields pre-computed: entry_count, content_html, preview, description

    total_entries = sum(c["entry_count"] for c in categories)
    groups = group_categories(categories, resources)
    entries = extract_entries(categories, groups)

    stars_data = load_stars(website / "data" / "github_stars.json")
    for entry in entries:
        repo_key = extract_github_repo(entry["url"])
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
            resources=resources,
            groups=groups,
            subtitle=subtitle,
            entries=entries,
            total_entries=total_entries,
            total_categories=len(categories),
        ),
        encoding="utf-8",
    )

    static_src = website / "static"
    static_dst = site_dir / "static"
    if static_src.exists():
        shutil.copytree(static_src, static_dst, dirs_exist_ok=True)

    shutil.copy(repo / "README.md", site_dir / "llms.txt")

    print(f"Built single page with {len(categories)} categories + {len(resources)} resources")
    print(f"Total entries: {total_entries}")
    print(f"Output: {site_dir}")


if __name__ == "__main__":
    build(str(Path(__file__).parent.parent))
