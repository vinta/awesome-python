#!/usr/bin/env python3
"""Build a single-page HTML site from README.md for the awesome-python website."""

import json
import re
import shutil
import xml.etree.ElementTree as ET
from collections import Counter
from collections.abc import Sequence
from datetime import UTC, datetime
from pathlib import Path
from typing import TypedDict

from jinja2 import Environment, FileSystemLoader
from readme_parser import AlsoSee, ParsedGroup, ParsedSection, parse_readme, parse_sponsors, slugify

GITHUB_REPO_URL_RE = re.compile(r"^https?://github\.com/([^/]+/[^/]+?)(?:\.git)?/?$")
MARKDOWN_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)\s]+)\)")
BULLET_LINE_RE = re.compile(r"^\s*-\s")
SITE_URL = "https://awesome-python.com/"
SITEMAP_URL = f"{SITE_URL}sitemap.xml"
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"

BUILTIN_FILTER = "Built-in"
BUILTIN_SLUG = "built-in"
BUILTIN_PATH = f"/categories/{BUILTIN_SLUG}/"
BUILTIN_PUBLIC_URL = f"{SITE_URL}categories/{BUILTIN_SLUG}/"

SPONSORSHIP_PATH = "/sponsorship/"
SPONSORSHIP_PUBLIC_URL = f"{SITE_URL}sponsorship/"

SOURCE_TYPE_DOMAINS = {
    "docs.python.org": "Built-in",
    "gitlab.com": "GitLab",
    "bitbucket.org": "Bitbucket",
}


class TemplateSubcategory(TypedDict):
    name: str
    value: str
    slug: str
    url: str


class TemplateEntry(TypedDict):
    name: str
    url: str
    description: str
    categories: list[str]
    groups: list[str]
    subcategories: list[TemplateSubcategory]
    stars: int | None
    owner: str | None
    last_commit_at: str | None
    source_type: str | None
    also_see: list[AlsoSee]


class SyntheticCategory(TypedDict):
    name: str
    slug: str
    description: str
    description_html: str


TemplateCategory = ParsedSection | SyntheticCategory


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


def load_stars(path: Path) -> dict[str, dict]:
    """Load star data from JSON. Returns empty dict if file doesn't exist or is corrupt."""
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {}
    return {}


def sort_entries(entries: Sequence[TemplateEntry]) -> list[TemplateEntry]:
    """Sort entries by stars descending, then name ascending.

    Three tiers: starred entries first, stdlib second, other non-starred last.
    """

    def sort_key(entry: TemplateEntry) -> tuple[int, int, int, str]:
        stars = entry["stars"]
        name = entry["name"].lower()
        if stars is not None:
            builtin = 1 if entry.get("source_type") == "Built-in" else 0
            return (0, -stars, builtin, name)
        if entry.get("source_type") == "Built-in":
            return (1, 0, 0, name)
        return (2, 0, 0, name)

    return sorted(entries, key=sort_key)


def build_robots_txt() -> str:
    return f"User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\n\nSitemap: {SITEMAP_URL}\n"


WEBSITE_ID = f"{SITE_URL}#website"
ISPARTOF_WEBSITE = {"@type": "WebSite", "@id": WEBSITE_ID}


def _website_node() -> dict:
    return {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        "name": "Awesome Python",
        "url": SITE_URL,
    }


def _item_list_payload(entries: Sequence[TemplateEntry]) -> dict:
    return {
        "@type": "ItemList",
        "numberOfItems": len(entries),
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i,
                "name": entry["name"],
                "url": entry["url"],
            }
            for i, entry in enumerate(entries, start=1)
        ],
    }


def build_homepage_json_ld(entries: Sequence[TemplateEntry], total_categories: int) -> dict:
    description = (
        "An opinionated guide to the best Python frameworks, libraries, and tools. "
        f"Explore {len(entries)} curated projects across {total_categories} categories, "
        "from AI and agents to data science and web development."
    )
    return {
        "@context": "https://schema.org",
        "@graph": [
            _website_node(),
            {
                "@type": "CollectionPage",
                "@id": SITE_URL,
                "name": "Awesome Python",
                "url": SITE_URL,
                "description": description,
                "isPartOf": ISPARTOF_WEBSITE,
                "mainEntity": _item_list_payload(entries),
            },
        ],
    }


def category_meta_description(name: str, entry_count: int, description: str) -> str:
    count_sentence = f"Explore {entry_count} curated Python projects in {name}."
    if description:
        lead = description if description.endswith((".", "!", "?")) else f"{description}."
        return f"{lead} {count_sentence}"
    return f"{count_sentence} Part of the Awesome Python catalog."


def build_category_json_ld(name: str, url: str, description: str, entries: Sequence[TemplateEntry]) -> dict:
    return {
        "@context": "https://schema.org",
        "@graph": [
            _website_node(),
            {
                "@type": "CollectionPage",
                "@id": url,
                "name": f"{name} Python Libraries",
                "url": url,
                "description": description,
                "isPartOf": ISPARTOF_WEBSITE,
                "mainEntity": _item_list_payload(entries),
            },
        ],
    }


def category_path(category: ParsedSection) -> str:
    return f"/categories/{category['slug']}/"


def category_public_url(category: ParsedSection) -> str:
    return f"{SITE_URL}categories/{category['slug']}/"


def group_path(group_slug: str) -> str:
    return f"/categories/{group_slug}/"


def group_public_url(group_slug: str) -> str:
    return f"{SITE_URL}categories/{group_slug}/"


def subcategory_path(category_slug: str, subcategory_slug: str) -> str:
    return f"/categories/{category_slug}/{subcategory_slug}/"


def subcategory_public_url(category_slug: str, subcategory_slug: str) -> str:
    return f"{SITE_URL}categories/{category_slug}/{subcategory_slug}/"


def synthetic_category(name: str, slug: str) -> SyntheticCategory:
    return {"name": name, "slug": slug, "description": "", "description_html": ""}


def write_sitemap_xml(path: Path, urls: Sequence[tuple[str, str]]) -> None:
    ET.register_namespace("", SITEMAP_NS)
    urlset = ET.Element(f"{{{SITEMAP_NS}}}urlset")
    for url, lastmod in urls:
        url_el = ET.SubElement(urlset, f"{{{SITEMAP_NS}}}url")
        loc_el = ET.SubElement(url_el, f"{{{SITEMAP_NS}}}loc")
        loc_el.text = url
        lastmod_el = ET.SubElement(url_el, f"{{{SITEMAP_NS}}}lastmod")
        lastmod_el.text = lastmod

    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write(path, encoding="utf-8", xml_declaration=True)
    with path.open("ab") as f:
        f.write(b"\n")


def top_level_heading_text(line: str) -> str | None:
    stripped = line.strip()
    match = re.match(r"^(#{1,2})\s+(.+)$", stripped)
    if match is None:
        return None
    return match.group(2).strip().strip("#").strip().strip("*").strip()


def extract_categories_body(markdown: str) -> str:
    """Return content from `Categories` through `Projects`, excluding later sections."""
    lines = markdown.splitlines(keepends=True)
    start_idx = None
    end_idx = len(lines)
    for i, line in enumerate(lines):
        heading = top_level_heading_text(line)
        if heading is None:
            continue
        if start_idx is None and heading.lower() == "categories":
            start_idx = i + 1
            while start_idx < len(lines) and lines[start_idx].strip() == "":
                start_idx += 1
        elif start_idx is not None and heading.lower() in ("resources", "contributing"):
            end_idx = i
            break
    if start_idx is None:
        return ""
    return "".join(lines[start_idx:end_idx]).rstrip() + "\n"


def build_llms_txt(
    template_text: str,
    *,
    readme_text: str,
    stars_data: dict[str, dict],
    categories: Sequence[ParsedSection],
    total_entries: int,
) -> str:
    """Render the llms.txt entry point with the curated category catalog."""
    categories_md = annotate_entries_with_stars(
        extract_categories_body(readme_text).rstrip(),
        stars_data,
        format_stars=lambda n: f"GitHub stars: {n}",
    )
    text_env = Environment(autoescape=False, trim_blocks=True, lstrip_blocks=True)
    rendered = text_env.from_string(template_text).render(
        site_url=SITE_URL,
        github_repo_url="https://github.com/vinta/awesome-python",
        contributing_url="https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md",
        sponsorship_url=SPONSORSHIP_PUBLIC_URL,
        sitemap_url=SITEMAP_URL,
        categories_md=categories_md,
        total_entries=total_entries,
        total_categories=len(categories),
    )
    return rendered.rstrip() + "\n"


def annotate_entries_with_stars(
    markdown: str,
    stars_data: dict[str, dict],
    *,
    format_stars=None,
) -> str:
    """Append the star count to bullet entry lines whose first GitHub link has known star data.

    `format_stars` controls the parenthesized text. Defaults to "{N} GitHub stars".
    Pass `str` for a bare number.
    """
    if format_stars is None:
        format_stars = lambda n: f"{n} GitHub stars"  # noqa: E731 lambda-assignment
    lines = markdown.splitlines(keepends=True)
    out: list[str] = []
    for line in lines:
        if not BULLET_LINE_RE.match(line):
            out.append(line)
            continue
        annotated = line
        for match in MARKDOWN_LINK_RE.finditer(line):
            repo_key = extract_github_repo(match.group(1))
            if not repo_key:
                continue
            entry = stars_data.get(repo_key)
            if not entry or "stars" not in entry:
                continue
            stripped = line.rstrip("\n")
            ending = line[len(stripped) :]
            annotated = f"{stripped} ({format_stars(entry['stars'])}){ending}"
            break
        out.append(annotated)
    return "".join(out)


def remove_sponsors_section(markdown: str) -> str:
    lines = markdown.splitlines(keepends=True)
    start_idx = None
    for i, line in enumerate(lines):
        heading = top_level_heading_text(line)
        if heading and heading.lower() == "sponsors":
            start_idx = i
            break

    if start_idx is None:
        return markdown

    end_idx = len(lines)
    for i, line in enumerate(lines[start_idx + 1 :], start=start_idx + 1):
        if top_level_heading_text(line):
            end_idx = i
            break

    return "".join(lines[:start_idx] + lines[end_idx:])


def extract_entries(
    categories: list[ParsedSection],
    groups: list[ParsedGroup],
) -> list[TemplateEntry]:
    """Flatten categories into individual library entries for table display.

    Entries appearing in multiple categories are merged into a single entry
    with lists of categories and groups.
    """
    cat_to_group = {cat["name"]: group["name"] for group in groups for cat in group["categories"]}

    seen: dict[tuple[str, str], TemplateEntry] = {}  # (url, name) -> entry
    entries: list[TemplateEntry] = []
    for cat in categories:
        group_name = cat_to_group.get(cat["name"], "Other")
        for entry in cat["entries"]:
            key = (entry["url"], entry["name"])
            existing = seen.get(key)
            if existing is None:
                existing = TemplateEntry(
                    name=entry["name"],
                    url=entry["url"],
                    description=entry["description"],
                    categories=[],
                    groups=[],
                    subcategories=[],
                    stars=None,
                    owner=None,
                    last_commit_at=None,
                    source_type=detect_source_type(entry["url"]),
                    also_see=entry["also_see"],
                )
                seen[key] = existing
                entries.append(existing)
            if cat["name"] not in existing["categories"]:
                existing["categories"].append(cat["name"])
            if group_name not in existing["groups"]:
                existing["groups"].append(group_name)
            subcat = entry["subcategory"]
            if subcat:
                scoped = f"{cat['name']} > {subcat}"
                if not any(s["value"] == scoped for s in existing["subcategories"]):
                    sub_slug = slugify(subcat)
                    existing["subcategories"].append(
                        TemplateSubcategory(
                            name=subcat,
                            value=scoped,
                            slug=sub_slug,
                            url=f"/categories/{cat['slug']}/{sub_slug}/",
                        )
                    )
    return entries


def build(repo_root: Path) -> None:
    """Main build: parse README, render single-page HTML via Jinja2 templates."""
    website = repo_root / "website"
    readme_text = (repo_root / "README.md").read_text(encoding="utf-8")

    subtitle = ""
    for line in readme_text.split("\n"):
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            subtitle = stripped
            break

    parsed_groups = parse_readme(readme_text)
    sponsors = parse_sponsors(readme_text)

    categories = [cat for g in parsed_groups for cat in g["categories"]]
    cat_slugs = [cat["slug"] for cat in categories]
    group_slugs = [g["slug"] for g in parsed_groups]
    all_top_level_slugs = cat_slugs + group_slugs + [BUILTIN_SLUG]
    duplicates = {s for s, n in Counter(all_top_level_slugs).items() if n > 1}
    if duplicates:
        raise ValueError(f"slug collision in /categories/ namespace: {sorted(duplicates)}. Rename a category or group so their slugs differ.")
    total_entries = sum(c["entry_count"] for c in categories)
    entries = extract_entries(categories, parsed_groups)
    build_date = datetime.now(UTC)

    stars_data = load_stars(website / "data" / "github_stars.json")

    repo_self = stars_data.get("vinta/awesome-python", {})
    repo_stars = None
    if "stars" in repo_self:
        stars_val = repo_self["stars"]
        repo_stars = f"{stars_val // 1000}k" if stars_val >= 1000 else str(stars_val)

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
    category_urls = {cat["name"]: category_path(cat) for cat in categories}

    filter_urls: dict[str, str] = dict(category_urls)
    for group in parsed_groups:
        filter_urls[group["name"]] = group_path(group["slug"])
    for entry in entries:
        for sub in entry.get("subcategories", []):
            filter_urls[sub["value"]] = sub["url"]
    builtin_entries = [e for e in entries if e.get("source_type") == BUILTIN_FILTER]
    if builtin_entries:
        filter_urls[BUILTIN_FILTER] = BUILTIN_PATH

    env = Environment(
        loader=FileSystemLoader(website / "templates"),
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    site_dir = website / "output"
    if site_dir.exists():
        shutil.rmtree(site_dir)
    site_dir.mkdir(parents=True)

    filter_urls_json = json.dumps(filter_urls, sort_keys=True, ensure_ascii=False).replace("</", "<\\/")
    homepage_json_ld = json.dumps(
        build_homepage_json_ld(entries, len(categories)),
        ensure_ascii=False,
    ).replace("</", "<\\/")

    tpl_index = env.get_template("index.html")
    (site_dir / "index.html").write_text(
        tpl_index.render(
            categories=categories,
            subtitle=subtitle,
            entries=entries,
            total_entries=total_entries,
            total_categories=len(categories),
            repo_stars=repo_stars,
            build_date=build_date.strftime("%B %d, %Y"),
            sponsors=sponsors,
            category_urls=category_urls,
            filter_urls=filter_urls,
            filter_urls_json=filter_urls_json,
            homepage_json_ld=homepage_json_ld,
        ),
        encoding="utf-8",
    )

    tpl_category = env.get_template("category.html")
    categories_dir = site_dir / "categories"

    def render_category(
        category: TemplateCategory,
        *,
        category_url: str,
        entries: Sequence[TemplateEntry],
        current_path: str,
        page_dir: Path,
        parent_category: ParsedSection | None = None,
        group_categories: Sequence[ParsedSection] | None = None,
    ) -> None:
        page_dir.mkdir(parents=True, exist_ok=True)
        category_description = category_meta_description(category["name"], len(entries), category["description"])
        category_json_ld = json.dumps(
            build_category_json_ld(category["name"], category_url, category_description, entries),
            ensure_ascii=False,
        ).replace("</", "<\\/")
        (page_dir / "index.html").write_text(
            tpl_category.render(
                category=category,
                category_url=category_url,
                category_description=category_description,
                entries=entries,
                total_categories=len(categories),
                category_urls=category_urls,
                current_path=current_path,
                filter_urls=filter_urls,
                filter_urls_json=filter_urls_json,
                parent_category=parent_category,
                group_categories=group_categories,
                category_json_ld=category_json_ld,
            ),
            encoding="utf-8",
        )

    for category in categories:
        render_category(
            category,
            category_url=category_public_url(category),
            entries=[e for e in entries if category["name"] in e["categories"]],
            current_path=category_path(category),
            page_dir=categories_dir / category["slug"],
        )

    for group in parsed_groups:
        render_category(
            synthetic_category(group["name"], group["slug"]),
            category_url=group_public_url(group["slug"]),
            entries=[e for e in entries if group["name"] in e["groups"]],
            current_path=group_path(group["slug"]),
            page_dir=categories_dir / group["slug"],
            group_categories=group["categories"],
        )

    if builtin_entries:
        render_category(
            synthetic_category(BUILTIN_FILTER, BUILTIN_SLUG),
            category_url=BUILTIN_PUBLIC_URL,
            entries=builtin_entries,
            current_path=BUILTIN_PATH,
            page_dir=categories_dir / BUILTIN_SLUG,
        )

    sponsorship_dir = site_dir / "sponsorship"
    sponsorship_dir.mkdir(parents=True, exist_ok=True)
    tpl_sponsorship = env.get_template("sponsorship.html")
    hero_stats: list[str] = []
    if repo_stars:
        hero_stats.append(f"{repo_stars}+ stars on GitHub")
    hero_stats.append(f"Updated {build_date.strftime('%B %d, %Y')}")
    (sponsorship_dir / "index.html").write_text(
        tpl_sponsorship.render(hero_stats=hero_stats),
        encoding="utf-8",
    )

    subcat_to_entries: dict[str, list[TemplateEntry]] = {}
    subcat_meta: dict[str, tuple[str, str, str]] = {}  # value -> (cat_slug, sub_slug, sub_name)
    cat_slug_by_url_prefix = {f"/categories/{c['slug']}/": c["slug"] for c in categories}
    cat_by_slug = {c["slug"]: c for c in categories}
    for entry in entries:
        for sub in entry.get("subcategories", []):
            value = sub["value"]
            subcat_to_entries.setdefault(value, []).append(entry)
            if value not in subcat_meta:
                for prefix, cat_slug in cat_slug_by_url_prefix.items():
                    if sub["url"].startswith(prefix):
                        subcat_meta[value] = (cat_slug, sub["slug"], sub["name"])
                        break

    for value, (cat_slug, sub_slug, sub_name) in subcat_meta.items():
        render_category(
            synthetic_category(sub_name, sub_slug),
            category_url=subcategory_public_url(cat_slug, sub_slug),
            entries=subcat_to_entries[value],
            current_path=subcategory_path(cat_slug, sub_slug),
            page_dir=categories_dir / cat_slug / sub_slug,
            parent_category=cat_by_slug[cat_slug],
        )

    static_src = website / "static"
    static_dst = site_dir / "static"
    if static_src.exists():
        shutil.copytree(static_src, static_dst, dirs_exist_ok=True)

    sponsorship_md = repo_root / "SPONSORSHIP.md"
    sponsorship_md_mtime = datetime.fromtimestamp(sponsorship_md.stat().st_mtime, tz=UTC).date().isoformat()
    llms_template = (website / "templates" / "llms.txt").read_text(encoding="utf-8")
    llms_txt = build_llms_txt(
        llms_template,
        readme_text=readme_text,
        stars_data=stars_data,
        categories=categories,
        total_entries=total_entries,
    )
    (site_dir / "robots.txt").write_text(build_robots_txt(), encoding="utf-8")
    sitemap_date = build_date.date().isoformat()
    sitemap_urls = [(SITE_URL, sitemap_date)]
    sitemap_urls.extend((category_public_url(c), sitemap_date) for c in categories)
    sitemap_urls.extend((group_public_url(g["slug"]), sitemap_date) for g in parsed_groups)
    if builtin_entries:
        sitemap_urls.append((BUILTIN_PUBLIC_URL, sitemap_date))
    for cat_slug, sub_slug, _ in sorted(subcat_meta.values()):
        sitemap_urls.append((subcategory_public_url(cat_slug, sub_slug), sitemap_date))
    sitemap_urls.append((SPONSORSHIP_PUBLIC_URL, sponsorship_md_mtime))
    write_sitemap_xml(site_dir / "sitemap.xml", sitemap_urls)
    (site_dir / "llms.txt").write_text(llms_txt, encoding="utf-8")

    print(f"Built site with {len(parsed_groups)} groups, {len(categories)} categories")
    print(f"Total entries: {total_entries}")
    print(f"Output: {site_dir}")


if __name__ == "__main__":
    build(Path(__file__).parent.parent)
