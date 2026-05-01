"""Tests for the build module."""

import json
import shutil
import textwrap
import xml.etree.ElementTree as ET
from datetime import UTC, date, datetime
from html.parser import HTMLParser
from pathlib import Path

from build import (
    build,
    detect_source_type,
    extract_entries,
    extract_github_repo,
    load_stars,
    sort_entries,
)
from readme_parser import parse_readme, slugify


class HeadMetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title_count = 0
        self.title = ""
        self.meta_by_name = {}
        self.meta_by_property = {}
        self.links_by_rel = {}
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.title_count += 1
            self._in_title = True
        elif tag == "meta":
            if "name" in attrs:
                self.meta_by_name[attrs["name"]] = attrs.get("content", "")
            if "property" in attrs:
                self.meta_by_property[attrs["property"]] = attrs.get("content", "")
        elif tag == "link" and attrs.get("rel"):
            for rel in attrs["rel"].split():
                self.links_by_rel[rel] = attrs.get("href", "")

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


# ---------------------------------------------------------------------------
# slugify
# ---------------------------------------------------------------------------


class TestSlugify:
    def test_simple(self):
        assert slugify("Admin Panels") == "admin-panels"

    def test_uppercase_acronym(self):
        assert slugify("RESTful API") == "restful-api"

    def test_all_caps(self):
        assert slugify("CMS") == "cms"

    def test_hyphenated_input(self):
        assert slugify("Command-line Tools") == "command-line-tools"

    def test_special_chars(self):
        assert slugify("Editor Plugins and IDEs") == "editor-plugins-and-ides"

    def test_single_word(self):
        assert slugify("Audio") == "audio"

    def test_extra_spaces(self):
        assert slugify("  Date  and  Time  ") == "date-and-time"


# ---------------------------------------------------------------------------
# build (integration)
# ---------------------------------------------------------------------------


class TestBuild:
    def _make_repo(self, tmp_path, readme):
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        tpl_dir = tmp_path / "website" / "templates"
        tpl_dir.mkdir(parents=True)
        (tpl_dir / "base.html").write_text(
            "<!DOCTYPE html><html lang='en'><head><title>{% block title %}{% endblock %}</title>"
            "<meta name='description' content='{% block description %}{% endblock %}'>"
            "</head><body>{% block content %}{% endblock %}</body></html>",
            encoding="utf-8",
        )
        (tpl_dir / "index.html").write_text(
            '{% extends "base.html" %}{% block content %}'
            "{% for entry in entries %}"
            '<div class="row">'
            "<span>{{ entry.name }}</span>"
            "<span>{{ entry.categories | join(', ') }}</span>"
            "<span>{{ entry.groups | join(', ') }}</span>"
            "</div>"
            "{% endfor %}"
            "{% endblock %}",
            encoding="utf-8",
        )

    def _copy_real_templates(self, tmp_path):
        real_tpl = Path(__file__).parent / ".." / "templates"
        tpl_dir = tmp_path / "website" / "templates"
        shutil.copytree(real_tpl, tpl_dir)

    def test_build_creates_single_page(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ---

            **Tools**

            ## Widgets

            _Widget libraries._

            - [w1](https://example.com) - A widget.

            ## Gadgets

            _Gadget tools._

            - [g1](https://example.com) - A gadget.

            # Resources

            Info.

            ## Newsletters

            - [NL](https://example.com)

            # Contributing

            Help!
        """)
        self._make_repo(tmp_path, readme)
        build(tmp_path)

        site = tmp_path / "website" / "output"
        assert (site / "index.html").exists()
        # No category sub-pages
        assert not (site / "categories").exists()

    def test_build_creates_root_discovery_files(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ---

            ## Widgets

            - [w1](https://example.com) - A widget.

            # Contributing

            Help!
        """)
        self._make_repo(tmp_path, readme)
        start_date = datetime.now(UTC).date()
        build(tmp_path)
        end_date = datetime.now(UTC).date()

        site = tmp_path / "website" / "output"
        robots = (site / "robots.txt").read_text(encoding="utf-8")
        assert robots == (
            "User-agent: *\n"
            "Content-Signal: search=yes, ai-input=yes, ai-train=yes\n"
            "Allow: /\n"
            "\n"
            "Sitemap: https://awesome-python.com/sitemap.xml\n"
        )

        sitemap = ET.parse(site / "sitemap.xml")
        root = sitemap.getroot()
        ns = {"sitemap": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [loc.text for loc in root.findall("sitemap:url/sitemap:loc", ns)]
        lastmods = [lastmod.text for lastmod in root.findall("sitemap:url/sitemap:lastmod", ns)]

        assert root.tag == "{http://www.sitemaps.org/schemas/sitemap/0.9}urlset"
        assert locs == ["https://awesome-python.com/"]
        assert len(lastmods) == 1
        assert start_date <= date.fromisoformat(lastmods[0]) <= end_date
        assert all(loc.startswith("https://awesome-python.com/") for loc in locs)
        assert all("?" not in loc for loc in locs)

    def test_build_creates_markdown_alternate_without_sponsors(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            # **Sponsors**

            - **[Sponsor](https://sponsor.example.com)**: Sponsored tool.

            > Become a sponsor: [Sponsor us](SPONSORSHIP.md).

            # Categories

            **Tools**

            - [Widgets](#widgets)

            ---

            ## Widgets

            - [w1](https://example.com) - A widget.

            # Contributing

            Help!
        """)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)

        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")
        index_md = (site / "index.md").read_text(encoding="utf-8")
        llms_txt = (site / "llms.txt").read_text(encoding="utf-8")

        assert '<link rel="alternate" type="text/markdown" href="/index.md" />' in index_html
        assert index_md == llms_txt
        assert index_md.startswith("# Awesome Python\n\nIntro.\n\n# Categories")
        assert "# **Sponsors**" not in index_md
        assert "Sponsor" not in index_md
        assert "SPONSORSHIP.md" not in index_md
        assert "## Widgets" in index_md
        assert "- [w1](https://example.com) - A widget." in index_md

    def test_build_cleans_stale_output(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Only

            - [x](https://x.com) - X.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)

        stale = tmp_path / "website" / "output" / "categories" / "stale"
        stale.mkdir(parents=True)
        (stale / "index.html").write_text("old", encoding="utf-8")

        build(tmp_path)

        assert not (tmp_path / "website" / "output" / "categories" / "stale").exists()

    def test_index_contains_category_names(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            **Group A**

            ## Alpha

            - [a](https://x.com) - A.

            **Group B**

            ## Beta

            - [b](https://x.com) - B.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)
        build(tmp_path)

        index_html = (tmp_path / "website" / "output" / "index.html").read_text()
        assert "Alpha" in index_html
        assert "Beta" in index_html
        assert "Group A" in index_html
        assert "Group B" in index_html

    def test_index_contains_preview_text(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Stuff

            - [django](https://x.com) - A framework.
            - [flask](https://x.com) - A micro.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)
        build(tmp_path)

        index_html = (tmp_path / "website" / "output" / "index.html").read_text()
        assert "django" in index_html
        assert "flask" in index_html

    def test_build_with_stars_sorts_by_stars(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Stuff

            - [low-stars](https://github.com/org/low) - Low.
            - [high-stars](https://github.com/org/high) - High.
            - [no-stars](https://example.com/none) - None.

            # Contributing

            Done.
        """)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")

        # Copy real templates
        real_tpl = Path(__file__).parent / ".." / "templates"
        tpl_dir = tmp_path / "website" / "templates"
        shutil.copytree(real_tpl, tpl_dir)

        # Create mock star data
        data_dir = tmp_path / "website" / "data"
        data_dir.mkdir(parents=True)
        stars = {
            "org/high": {"stars": 5000, "owner": "org", "fetched_at": "2026-01-01T00:00:00+00:00"},
            "org/low": {"stars": 100, "owner": "org", "fetched_at": "2026-01-01T00:00:00+00:00"},
        }
        (data_dir / "github_stars.json").write_text(json.dumps(stars), encoding="utf-8")

        build(tmp_path)

        html = (tmp_path / "website" / "output" / "index.html").read_text(encoding="utf-8")
        # Star-sorted: high-stars (5000) before low-stars (100) before no-stars (None)
        assert html.index("high-stars") < html.index("low-stars")
        assert html.index("low-stars") < html.index("no-stars")
        # Formatted star counts
        assert "5,000" in html
        assert "100" in html
        # Expand content present
        assert "expand-content" in html

    def test_index_contains_aligned_homepage_metadata(self, tmp_path):
        readme = (Path(__file__).parents[2] / "README.md").read_text(encoding="utf-8")
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)

        build(tmp_path)

        parsed_groups = parse_readme(readme)
        categories = [cat for group in parsed_groups for cat in group["categories"]]
        entries = extract_entries(categories, parsed_groups)
        html = (tmp_path / "website" / "output" / "index.html").read_text(encoding="utf-8")
        parser = HeadMetadataParser()
        parser.feed(html)

        expected_title = "Awesome Python"
        expected_description = f"An opinionated guide to the best Python frameworks, libraries, and tools. Explore {len(entries)} curated projects across {len(categories)} categories, from AI and agents to data science and web development."
        expected_url = "https://awesome-python.com/"
        expected_image = "https://awesome-python.com/static/og-image.png"

        assert parser.title_count == 1
        assert parser.title.strip() == expected_title
        assert parser.meta_by_name["description"] == expected_description
        assert parser.links_by_rel["canonical"] == expected_url
        assert parser.meta_by_property["og:type"] == "website"
        assert parser.meta_by_property["og:title"] == expected_title
        assert parser.meta_by_property["og:description"] == expected_description
        assert parser.meta_by_property["og:image"] == expected_image
        assert parser.meta_by_property["og:url"] == expected_url
        assert parser.meta_by_name["twitter:card"] == "summary_large_image"
        assert parser.meta_by_name["twitter:title"] == expected_title
        assert parser.meta_by_name["twitter:description"] == expected_description
        assert parser.meta_by_name["twitter:image"] == expected_image
        assert "<head>\n    <meta charset" in html


# ---------------------------------------------------------------------------
# extract_github_repo
# ---------------------------------------------------------------------------


class TestExtractGithubRepo:
    def test_github_url(self):
        assert extract_github_repo("https://github.com/psf/requests") == "psf/requests"

    def test_non_github_url(self):
        assert extract_github_repo("https://foss.heptapod.net/pypy/pypy") is None

    def test_github_io_url(self):
        assert extract_github_repo("https://user.github.io/proj") is None

    def test_trailing_slash(self):
        assert extract_github_repo("https://github.com/org/repo/") == "org/repo"

    def test_deep_path(self):
        assert extract_github_repo("https://github.com/org/repo/tree/main") is None

    def test_dot_git_suffix(self):
        assert extract_github_repo("https://github.com/org/repo.git") == "org/repo"

    def test_org_only(self):
        assert extract_github_repo("https://github.com/org") is None


# ---------------------------------------------------------------------------
# load_stars
# ---------------------------------------------------------------------------


class TestLoadStars:
    def test_returns_empty_when_missing(self, tmp_path):
        result = load_stars(tmp_path / "nonexistent.json")
        assert result == {}

    def test_loads_valid_json(self, tmp_path):
        data = {"psf/requests": {"stars": 52467, "owner": "psf", "fetched_at": "2026-01-01T00:00:00+00:00"}}
        f = tmp_path / "stars.json"
        f.write_text(json.dumps(data), encoding="utf-8")
        result = load_stars(f)
        assert result["psf/requests"]["stars"] == 52467

    def test_returns_empty_on_corrupt_json(self, tmp_path):
        f = tmp_path / "stars.json"
        f.write_text("not json", encoding="utf-8")
        result = load_stars(f)
        assert result == {}


# ---------------------------------------------------------------------------
# sort_entries
# ---------------------------------------------------------------------------


class TestSortEntries:
    def test_sorts_by_stars_descending(self):
        entries = [
            {"name": "a", "stars": 100, "url": ""},
            {"name": "b", "stars": 500, "url": ""},
            {"name": "c", "stars": 200, "url": ""},
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["b", "c", "a"]

    def test_equal_stars_sorted_alphabetically(self):
        entries = [
            {"name": "beta", "stars": 100, "url": ""},
            {"name": "alpha", "stars": 100, "url": ""},
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["alpha", "beta"]

    def test_no_stars_go_to_bottom(self):
        entries = [
            {"name": "no-stars", "stars": None, "url": ""},
            {"name": "has-stars", "stars": 50, "url": ""},
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["has-stars", "no-stars"]

    def test_no_stars_sorted_alphabetically(self):
        entries = [
            {"name": "zebra", "stars": None, "url": ""},
            {"name": "apple", "stars": None, "url": ""},
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["apple", "zebra"]

    def test_builtin_between_starred_and_unstarred(self):
        entries = [
            {"name": "builtin", "stars": None, "source_type": "Built-in"},
            {"name": "starred", "stars": 100, "source_type": None},
            {"name": "unstarred", "stars": None, "source_type": None},
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["starred", "builtin", "unstarred"]


# ---------------------------------------------------------------------------
# detect_source_type
# ---------------------------------------------------------------------------


class TestDetectSourceType:
    def test_github_repo_returns_none(self):
        assert detect_source_type("https://github.com/psf/requests") is None

    def test_stdlib_url(self):
        assert detect_source_type("https://docs.python.org/3/library/asyncio.html") == "Built-in"

    def test_gitlab_url(self):
        assert detect_source_type("https://gitlab.com/org/repo") == "GitLab"

    def test_bitbucket_url(self):
        assert detect_source_type("https://bitbucket.org/org/repo") == "Bitbucket"

    def test_non_github_external(self):
        assert detect_source_type("https://example.com/tool") == "External"

    def test_github_non_repo_returns_none(self):
        assert detect_source_type("https://github.com/org/repo/wiki") is None


# ---------------------------------------------------------------------------
# extract_entries
# ---------------------------------------------------------------------------


class TestExtractEntries:
    def test_basic_extraction(self):
        readme = textwrap.dedent("""\
            # T

            ---

            **Tools**

            ## Widgets

            - [widget](https://example.com) - A widget.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        categories = [c for g in groups for c in g["categories"]]
        entries = extract_entries(categories, groups)
        assert len(entries) == 1
        assert entries[0]["name"] == "widget"
        assert entries[0]["categories"] == ["Widgets"]
        assert entries[0]["groups"] == ["Tools"]

    def test_duplicate_entry_merged(self):
        readme = textwrap.dedent("""\
            # T

            ---

            **Tools**

            ## Alpha

            - [shared](https://example.com/shared) - Shared lib.

            ## Beta

            - [shared](https://example.com/shared) - Shared lib.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        categories = [c for g in groups for c in g["categories"]]
        entries = extract_entries(categories, groups)
        shared = [e for e in entries if e["name"] == "shared"]
        assert len(shared) == 1
        assert sorted(shared[0]["categories"]) == ["Alpha", "Beta"]

    def test_source_type_detected(self):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Stdlib

            - [asyncio](https://docs.python.org/3/library/asyncio.html) - Async I/O.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        categories = [c for g in groups for c in g["categories"]]
        entries = extract_entries(categories, groups)
        assert entries[0]["source_type"] == "Built-in"
