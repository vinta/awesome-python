"""Tests for the build module."""

import json
import shutil
import textwrap
from pathlib import Path

from build import (
    build,
    extract_github_repo,
    load_stars,
    sort_entries,
)
from readme_parser import slugify

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
        build(str(tmp_path))

        site = tmp_path / "website" / "output"
        assert (site / "index.html").exists()
        # No category sub-pages
        assert not (site / "categories").exists()

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
        build(str(tmp_path))

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
