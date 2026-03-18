#!/usr/bin/env python3
"""Build a single-page HTML site from README.md for the awesome-python website."""

import json
import re
import shutil
from pathlib import Path
from typing import TypedDict

import markdown
from jinja2 import Environment, FileSystemLoader

# Thematic grouping of categories. Each category name must match exactly
# as it appears in README.md (the ## heading text).
SECTION_GROUPS: list[tuple[str, list[str]]] = [
    ("Web & API", [
        "Web Frameworks", "RESTful API", "GraphQL", "WebSocket",
        "ASGI Servers", "WSGI Servers", "HTTP Clients", "Template Engine",
        "Web Asset Management", "Web Content Extracting", "Web Crawling",
    ]),
    ("Data & ML", [
        "Data Analysis", "Data Validation", "Data Visualization",
        "Machine Learning", "Deep Learning", "Computer Vision",
        "Natural Language Processing", "Recommender Systems", "Science",
        "Quantum Computing",
    ]),
    ("DevOps & Infrastructure", [
        "DevOps Tools", "Distributed Computing", "Task Queues",
        "Job Scheduler", "Serverless Frameworks", "Logging", "Processes",
        "Shell", "Network Virtualization", "RPC Servers",
    ]),
    ("Database & Storage", [
        "Database", "Database Drivers", "ORM", "Caching", "Search",
        "Serialization",
    ]),
    ("Development Tools", [
        "Testing", "Debugging Tools", "Code Analysis", "Build Tools",
        "Refactoring", "Documentation", "Editor Plugins and IDEs",
        "Interactive Interpreter",
    ]),
    ("CLI & GUI", [
        "Command-line Interface Development", "Command-line Tools",
        "GUI Development",
    ]),
    ("Content & Media", [
        "Audio", "Video", "Image Processing", "HTML Manipulation",
        "Text Processing", "Specific Formats Processing",
        "File Manipulation", "Downloader",
    ]),
    ("System & Runtime", [
        "Asynchronous Programming", "Environment Management",
        "Package Management", "Package Repositories", "Distribution",
        "Implementations", "Built-in Classes Enhancement",
        "Functional Programming", "Configuration Files",
    ]),
    ("Security & Auth", [
        "Authentication", "Cryptography", "Penetration Testing",
        "Permissions",
    ]),
    ("Specialized", [
        "CMS", "Admin Panels", "Email", "Game Development", "Geolocation",
        "Hardware", "Internationalization", "Date and Time",
        "URL Manipulation", "Robotics", "Microsoft Windows", "Miscellaneous",
        "Algorithms and Design Patterns", "Static Site Generator",
    ]),
    ("Resources", []),  # Filled dynamically from parsed resources
]


def slugify(name: str) -> str:
    """Convert a category name to a URL-friendly slug."""
    slug = name.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s]+", "-", slug.strip())
    slug = re.sub(r"-+", "-", slug)
    return slug


def count_entries(content: str) -> int:
    """Count library entries (lines starting with * [ or - [) in a content block."""
    return sum(1 for line in content.split("\n") if re.match(r"\s*[-*]\s+\[", line))


def extract_preview(content: str, *, max_names: int = 4) -> str:
    """Extract first N main library names from markdown content for preview text.

    Only includes top-level or single-indent entries (indent <= 3 spaces),
    skipping subcategory labels (items without links) and deep sub-entries.
    """
    names = []
    for m in re.finditer(r"^(\s*)[-*]\s+\[([^\]]+)\]", content, re.MULTILINE):
        indent_len = len(m.group(1))
        if indent_len > 3:
            continue
        names.append(m.group(2))
        if len(names) >= max_names:
            break
    return ", ".join(names)


def render_content_html(content: str) -> str:
    """Render category markdown content to HTML with subcategory detection.

    Lines that are list items without links (e.g., "- Synchronous") are
    treated as subcategory headers and rendered as bold dividers.

    Indent levels in the README:
    - 0 spaces: top-level entry or subcategory label
    - 2 spaces: entry under a subcategory (still a main entry)
    - 4+ spaces: sub-entry (e.g., awesome-django under django)
    """
    lines = content.split("\n")
    out: list[str] = []

    for line in lines:
        stripped = line.strip()
        indent_len = len(line) - len(line.lstrip())

        # Detect subcategory labels: list items without links
        m = re.match(r"^[-*]\s+(.+)$", stripped)
        if m and "[" not in stripped:
            label = m.group(1)
            out.append(f'<div class="subcat">{label}</div>')
            continue

        # Entry with link and description: * [name](url) - Description.
        m = re.match(
            r"^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*[-\u2013\u2014]\s*(.+)$",
            line,
        )
        if m:
            name, url, desc = m.groups()
            if indent_len > 3:
                out.append(
                    f'<div class="entry-sub">'
                    f'<a href="{url}">{name}</a>'
                    f"</div>"
                )
            else:
                out.append(
                    f'<div class="entry">'
                    f'<a href="{url}">{name}</a>'
                    f'<span class="sep">&mdash;</span>{desc}'
                    f"</div>"
                )
            continue

        # Link-only entry (no description): * [name](url)
        m = re.match(r"^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$", line)
        if m:
            name, url = m.groups()
            if indent_len > 3:
                out.append(
                    f'<div class="entry-sub">'
                    f'<a href="{url}">{name}</a>'
                    f"</div>"
                )
            else:
                out.append(
                    f'<div class="entry">'
                    f'<a href="{url}">{name}</a>'
                    f"</div>"
                )
            continue

    return "\n".join(out)


def parse_readme(text: str) -> tuple[list[dict], list[dict]]:
    """Parse README.md text into categories and resources.

    Returns:
        (categories, resources) where each is a list of dicts with keys:
        name, slug, description, content
    """
    lines = text.split("\n")

    separator_idx = None
    for i, line in enumerate(lines):
        if line.strip() == "---" and i > 0:
            separator_idx = i
            break

    if separator_idx is None:
        return [], []

    resources_idx = None
    contributing_idx = None
    for i, line in enumerate(lines):
        if line.strip() == "# Resources":
            resources_idx = i
        elif line.strip() == "# Contributing":
            contributing_idx = i

    cat_end = resources_idx if resources_idx is not None else len(lines)
    category_lines = lines[separator_idx + 1 : cat_end]

    resource_lines = []
    if resources_idx is not None:
        res_end = contributing_idx if contributing_idx is not None else len(lines)
        resource_lines = lines[resources_idx:res_end]

    categories = _extract_sections(category_lines, level=2)
    resources = _extract_sections(resource_lines, level=2)

    return categories, resources


def _extract_sections(lines: list[str], *, level: int) -> list[dict]:
    """Extract ## sections from a block of lines."""
    prefix = "#" * level + " "
    sections = []
    current_name = None
    current_lines: list[str] = []

    for line in lines:
        if line.startswith(prefix) and not line.startswith(prefix + "#"):
            if current_name is not None:
                sections.append(_build_section(current_name, current_lines))
            current_name = line[len(prefix) :].strip()
            current_lines = []
        elif current_name is not None:
            current_lines.append(line)

    if current_name is not None:
        sections.append(_build_section(current_name, current_lines))

    return sections


def _build_section(name: str, lines: list[str]) -> dict:
    """Build a section dict from a name and its content lines."""
    while lines and not lines[0].strip():
        lines = lines[1:]
    while lines and not lines[-1].strip():
        lines = lines[:-1]

    description = ""
    content_lines = lines
    if lines:
        m = re.match(r"^_(.+)_$", lines[0].strip())
        if m:
            description = m.group(1)
            content_lines = lines[1:]
            while content_lines and not content_lines[0].strip():
                content_lines = content_lines[1:]

    content = "\n".join(content_lines).strip()

    return {
        "name": name,
        "slug": slugify(name),
        "description": description,
        "content": content,
    }


def render_markdown(text: str) -> str:
    """Render markdown text to HTML."""
    md = markdown.Markdown(extensions=["extra"])
    return md.convert(text)


def strip_markdown_links(text: str) -> str:
    """Replace [text](url) with just text for plain-text contexts."""
    return re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)


def render_inline_markdown(text: str) -> str:
    """Render inline markdown (links, bold, italic) to HTML."""
    from markupsafe import Markup

    html = markdown.markdown(text)
    # Strip wrapping <p>...</p> since this is inline content
    html = re.sub(r"^<p>(.*)</p>$", r"\1", html.strip())
    # Add target/rel to links for external navigation
    html = html.replace("<a ", '<a target="_blank" rel="noopener" ')
    return Markup(html)


def group_categories(
    categories: list[dict],
    resources: list[dict],
) -> list[dict]:
    """Organize categories and resources into thematic section groups."""
    cat_by_name = {c["name"]: c for c in categories}
    groups = []

    for group_name, cat_names in SECTION_GROUPS:
        if group_name == "Resources":
            # Resources group uses parsed resources directly
            group_cats = list(resources)
        else:
            group_cats = [cat_by_name[n] for n in cat_names if n in cat_by_name]

        if group_cats:
            groups.append({
                "name": group_name,
                "slug": slugify(group_name),
                "categories": group_cats,
            })

    # Any categories not in a group go into "Other"
    grouped_names = set()
    for _, cat_names in SECTION_GROUPS:
        grouped_names.update(cat_names)
    ungrouped = [c for c in categories if c["name"] not in grouped_names]
    if ungrouped:
        groups.append({
            "name": "Other",
            "slug": "other",
            "categories": ungrouped,
        })

    return groups


class Entry(TypedDict):
    name: str
    url: str
    description: str
    category: str
    group: str
    stars: int | None
    owner: str | None
    pushed_at: str | None


class StarData(TypedDict):
    stars: int
    owner: str
    pushed_at: str
    fetched_at: str


GITHUB_REPO_URL_RE = re.compile(
    r"^https?://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$"
)


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
    resources: list[dict],
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
        last_entry_indent = -1
        for line in cat["content"].split("\n"):
            indent_len = len(line) - len(line.lstrip())

            # Link-only sub-item deeper than parent → "also see"
            m_sub = re.match(r"\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$", line)
            if m_sub and indent_len > last_entry_indent >= 0 and entries:
                entries[-1]["also_see"].append({
                    "name": m_sub.group(1),
                    "url": m_sub.group(2),
                })
                continue

            if indent_len > 3:
                continue
            m = re.match(
                r"\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:[-\u2013\u2014]\s*(.+))?$",
                line,
            )
            if m:
                last_entry_indent = indent_len
                entries.append({
                    "name": m.group(1),
                    "url": m.group(2),
                    "description": render_inline_markdown(m.group(3)) if m.group(3) else "",
                    "category": cat["name"],
                    "group": group_name,
                    "stars": None,
                    "owner": None,
                    "pushed_at": None,
                    "also_see": [],
                })
    return entries


def build(repo_root: str) -> None:
    """Main build: parse README, render single-page HTML via Jinja2 templates."""
    repo = Path(repo_root)
    website = repo / "website"
    readme_text = (repo / "README.md").read_text(encoding="utf-8")

    # Extract subtitle from the first non-empty, non-heading line
    subtitle = ""
    for line in readme_text.split("\n"):
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            subtitle = stripped
            break

    categories, resources = parse_readme(readme_text)

    # Enrich with entry counts, rendered HTML, previews, and clean descriptions
    for cat in categories + resources:
        cat["entry_count"] = count_entries(cat["content"])
        cat["content_html"] = render_content_html(cat["content"])
        cat["preview"] = extract_preview(cat["content"])
        cat["description"] = strip_markdown_links(cat["description"])

    total_entries = sum(c["entry_count"] for c in categories)

    # Organize into groups
    groups = group_categories(categories, resources)

    # Flatten entries for table view
    entries = extract_entries(categories, resources, groups)

    # Load and merge GitHub star data
    stars_data = load_stars(website / "data" / "github_stars.json")
    for entry in entries:
        repo_key = extract_github_repo(entry["url"])
        if repo_key and repo_key in stars_data:
            entry["stars"] = stars_data[repo_key]["stars"]
            entry["owner"] = stars_data[repo_key]["owner"]
            entry["pushed_at"] = stars_data[repo_key].get("pushed_at", "")

    # Sort by stars descending
    entries = sort_entries(entries)

    # Set up Jinja2
    env = Environment(
        loader=FileSystemLoader(website / "templates"),
        autoescape=True,
    )

    # Output directory
    site_dir = website / "output"
    if site_dir.exists():
        shutil.rmtree(site_dir)
    site_dir.mkdir(parents=True)

    # Generate single index.html
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

    # Copy static assets
    static_src = website / "static"
    static_dst = site_dir / "static"
    if static_src.exists():
        shutil.copytree(static_src, static_dst)

    # Write CNAME
    (site_dir / "CNAME").write_text("awesome-python.com\n", encoding="utf-8")

    print(f"Built single page with {len(categories)} categories + {len(resources)} resources")
    print(f"Total entries: {total_entries}")
    print(f"Output: {site_dir}")


if __name__ == "__main__":
    build(str(Path(__file__).parent.parent))
