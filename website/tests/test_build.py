"""Tests for the build module."""

import json
import os
import shutil
import sys
import textwrap
from pathlib import Path

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from build import (
    build,
    count_entries,
    extract_github_repo,
    extract_preview,
    group_categories,
    load_stars,
    parse_readme,
    render_content_html,
    slugify,
    sort_entries,
)

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
# count_entries
# ---------------------------------------------------------------------------


class TestCountEntries:
    def test_counts_dash_entries(self):
        assert count_entries("- [a](url) - Desc.\n- [b](url) - Desc.") == 2

    def test_counts_star_entries(self):
        assert count_entries("* [a](url) - Desc.") == 1

    def test_ignores_non_entries(self):
        assert count_entries("Some text\n- [a](url) - Desc.\nMore text") == 1

    def test_counts_indented_entries(self):
        assert count_entries("    - [a](url) - Desc.") == 1

    def test_empty_content(self):
        assert count_entries("") == 0


# ---------------------------------------------------------------------------
# extract_preview
# ---------------------------------------------------------------------------


class TestExtractPreview:
    def test_basic(self):
        content = "* [alpha](url) - A.\n* [beta](url) - B.\n* [gamma](url) - C."
        assert extract_preview(content) == "alpha, beta, gamma"

    def test_max_four(self):
        content = "\n".join(f"* [lib{i}](url) - Desc." for i in range(10))
        assert extract_preview(content) == "lib0, lib1, lib2, lib3"

    def test_empty(self):
        assert extract_preview("") == ""

    def test_skips_subcategory_labels(self):
        content = "* Synchronous\n* [django](url) - Framework.\n* [flask](url) - Micro."
        assert extract_preview(content) == "django, flask"


# ---------------------------------------------------------------------------
# render_content_html
# ---------------------------------------------------------------------------


class TestRenderContentHtml:
    def test_basic_entry(self):
        content = "* [django](https://example.com) - A web framework."
        html = render_content_html(content)
        assert 'href="https://example.com"' in html
        assert "django" in html
        assert "A web framework." in html
        assert 'class="entry"' in html

    def test_subcategory_label(self):
        content = "* Synchronous\n* [django](https://x.com) - Framework."
        html = render_content_html(content)
        assert 'class="subcat"' in html
        assert "Synchronous" in html

    def test_sub_entry(self):
        content = "* [django](https://x.com) - Framework.\n    * [awesome-django](https://y.com)"
        html = render_content_html(content)
        assert 'class="entry-sub"' in html
        assert "awesome-django" in html

    def test_link_only_entry(self):
        content = "* [tool](https://x.com)"
        html = render_content_html(content)
        assert 'href="https://x.com"' in html
        assert "tool" in html


# ---------------------------------------------------------------------------
# parse_readme
# ---------------------------------------------------------------------------

MINIMAL_README = textwrap.dedent("""\
    # Awesome Python

    Some intro text.

    ---

    ## Alpha

    _Libraries for alpha stuff._

    - [lib-a](https://example.com/a) - Does A.
    - [lib-b](https://example.com/b) - Does B.

    ## Beta

    _Tools for beta._

    - [lib-c](https://example.com/c) - Does C.

    # Resources

    Where to discover resources.

    ## Newsletters

    - [News One](https://example.com/n1)
    - [News Two](https://example.com/n2)

    ## Podcasts

    - [Pod One](https://example.com/p1)

    # Contributing

    Please contribute!
""")


class TestParseReadme:
    def test_category_count(self):
        cats, resources = parse_readme(MINIMAL_README)
        assert len(cats) == 2

    def test_resource_count(self):
        cats, resources = parse_readme(MINIMAL_README)
        assert len(resources) == 2

    def test_category_names(self):
        cats, _ = parse_readme(MINIMAL_README)
        assert cats[0]["name"] == "Alpha"
        assert cats[1]["name"] == "Beta"

    def test_category_slugs(self):
        cats, _ = parse_readme(MINIMAL_README)
        assert cats[0]["slug"] == "alpha"
        assert cats[1]["slug"] == "beta"

    def test_category_description(self):
        cats, _ = parse_readme(MINIMAL_README)
        assert cats[0]["description"] == "Libraries for alpha stuff."
        assert cats[1]["description"] == "Tools for beta."

    def test_category_content_has_entries(self):
        cats, _ = parse_readme(MINIMAL_README)
        assert "lib-a" in cats[0]["content"]
        assert "lib-b" in cats[0]["content"]

    def test_resources_names(self):
        _, resources = parse_readme(MINIMAL_README)
        assert resources[0]["name"] == "Newsletters"
        assert resources[1]["name"] == "Podcasts"

    def test_resources_content(self):
        _, resources = parse_readme(MINIMAL_README)
        assert "News One" in resources[0]["content"]
        assert "Pod One" in resources[1]["content"]

    def test_contributing_skipped(self):
        cats, resources = parse_readme(MINIMAL_README)
        all_names = [c["name"] for c in cats] + [r["name"] for r in resources]
        assert "Contributing" not in all_names

    def test_no_separator(self):
        cats, resources = parse_readme("# Just a heading\n\nSome text.\n")
        assert cats == []
        assert resources == []

    def test_no_description(self):
        readme = textwrap.dedent("""\
            # Title

            ---

            ## NullDesc

            - [item](https://x.com) - Thing.

            # Resources

            ## Tips

            - [tip](https://x.com)

            # Contributing

            Done.
        """)
        cats, resources = parse_readme(readme)
        assert cats[0]["description"] == ""
        assert "item" in cats[0]["content"]


# ---------------------------------------------------------------------------
# parse_readme on real README
# ---------------------------------------------------------------------------


class TestParseRealReadme:
    @pytest.fixture(autouse=True)
    def load_readme(self):
        readme_path = os.path.join(os.path.dirname(__file__), "..", "..", "README.md")
        with open(readme_path, encoding="utf-8") as f:
            self.readme_text = f.read()
        self.cats, self.resources = parse_readme(self.readme_text)

    def test_at_least_83_categories(self):
        assert len(self.cats) >= 83

    def test_resources_has_newsletters_and_podcasts(self):
        names = [r["name"] for r in self.resources]
        assert "Newsletters" in names
        assert "Podcasts" in names

    def test_contributing_not_in_results(self):
        all_names = [c["name"] for c in self.cats] + [
            r["name"] for r in self.resources
        ]
        assert "Contributing" not in all_names

    def test_first_category_is_admin_panels(self):
        assert self.cats[0]["name"] == "Admin Panels"
        assert self.cats[0]["slug"] == "admin-panels"

    def test_last_category_is_wsgi_servers(self):
        assert self.cats[-1]["name"] == "WSGI Servers"
        assert self.cats[-1]["slug"] == "wsgi-servers"

    def test_restful_api_slug(self):
        slugs = [c["slug"] for c in self.cats]
        assert "restful-api" in slugs

    def test_descriptions_extracted(self):
        admin = self.cats[0]
        assert admin["description"] == "Libraries for administrative interfaces."


# ---------------------------------------------------------------------------
# group_categories
# ---------------------------------------------------------------------------


class TestGroupCategories:
    def test_groups_known_categories(self):
        cats = [
            {"name": "Web Frameworks", "slug": "web-frameworks"},
            {"name": "Testing", "slug": "testing"},
        ]
        groups = group_categories(cats, [])
        group_names = [g["name"] for g in groups]
        assert "Web & API" in group_names
        assert "Development Tools" in group_names

    def test_ungrouped_go_to_other(self):
        cats = [{"name": "Unknown Category", "slug": "unknown-category"}]
        groups = group_categories(cats, [])
        group_names = [g["name"] for g in groups]
        assert "Other" in group_names

    def test_resources_grouped(self):
        resources = [{"name": "Newsletters", "slug": "newsletters"}]
        groups = group_categories([], resources)
        group_names = [g["name"] for g in groups]
        assert "Resources" in group_names


# ---------------------------------------------------------------------------
# render_markdown (kept for compatibility)
# ---------------------------------------------------------------------------


class TestRenderMarkdown:
    def test_renders_link_list(self):
        from build import render_markdown

        html = render_markdown("- [lib](https://example.com) - Does stuff.")
        assert "<li>" in html
        assert '<a href="https://example.com">lib</a>' in html

    def test_renders_plain_text(self):
        from build import render_markdown

        html = render_markdown("Hello world")
        assert "<p>Hello world</p>" in html


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
            "{% for group in groups %}"
            '<section class="group">'
            "<h2>{{ group.name }}</h2>"
            "{% for cat in group.categories %}"
            '<div class="row" id="{{ cat.slug }}">'
            "<span>{{ cat.name }}</span>"
            "<span>{{ cat.preview }}</span>"
            "<span>{{ cat.entry_count }}</span>"
            '<div class="row-content" hidden>{{ cat.content_html | safe }}</div>'
            "</div>"
            "{% endfor %}"
            "</section>"
            "{% endfor %}"
            "{% endblock %}",
            encoding="utf-8",
        )

    def test_build_creates_single_page(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ---

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
        build(str(tmp_path))

        site = tmp_path / "website" / "output"
        assert (site / "index.html").exists()
        # No category sub-pages
        assert not (site / "categories").exists()

    def test_build_creates_cname(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Only

            - [x](https://x.com) - X.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)
        build(str(tmp_path))

        cname = tmp_path / "website" / "output" / "CNAME"
        assert cname.exists()
        assert "awesome-python.com" in cname.read_text()

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

        build(str(tmp_path))

        assert not (tmp_path / "website" / "output" / "categories" / "stale").exists()

    def test_index_contains_category_names(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Alpha

            - [a](https://x.com) - A.

            ## Beta

            - [b](https://x.com) - B.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)
        build(str(tmp_path))

        index_html = (tmp_path / "website" / "output" / "index.html").read_text()
        assert "Alpha" in index_html
        assert "Beta" in index_html

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
        build(str(tmp_path))

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

        build(str(tmp_path))

        html = (tmp_path / "website" / "output" / "index.html").read_text(encoding="utf-8")
        # Star-sorted: high-stars (5000) before low-stars (100) before no-stars (None)
        assert html.index("high-stars") < html.index("low-stars")
        assert html.index("low-stars") < html.index("no-stars")
        # Formatted star counts
        assert "5,000" in html
        assert "100" in html
        # Expand content present
        assert "expand-content" in html


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
