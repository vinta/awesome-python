"""Tests for the build module."""

import json
import os
import shutil
import textwrap
import xml.etree.ElementTree as ET
from datetime import UTC, date, datetime
from html.parser import HTMLParser
from pathlib import Path

import pytest
from build import (
    TemplateEntry,
    annotate_entries_with_stars,
    build,
    detect_source_type,
    extract_entries,
    extract_github_repo,
    load_stars,
    sort_entries,
    subcategory_path,
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

    def test_hyphenated_input(self):
        assert slugify("Command-line Tools") == "command-line-tools"

    def test_extra_spaces(self):
        assert slugify("  Date  and  Time  ") == "date-and-time"


class TestSubcategoryPath:
    def test_builds_path(self):
        assert subcategory_path("web-frameworks", "synchronous") == "/categories/web-frameworks/synchronous/"


# ---------------------------------------------------------------------------
# build (integration)
# ---------------------------------------------------------------------------


class TestBuild:
    @pytest.fixture(autouse=True)
    def _make_sponsorship_md(self, tmp_path):
        (tmp_path / "SPONSORSHIP.md").write_text("# Sponsorship\n", encoding="utf-8")

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
        (tpl_dir / "category.html").write_text(
            '{% extends "base.html" %}{% block content %}<h1>{{ category.name }}</h1>{% for entry in entries %}<a href="{{ entry.url }}">{{ entry.name }}</a>{% endfor %}{% endblock %}',
            encoding="utf-8",
        )
        (tpl_dir / "sponsorship.html").write_text(
            '{% extends "base.html" %}{% block content %}<h1>Sponsor</h1>{% endblock %}',
            encoding="utf-8",
        )
        (tpl_dir / "llms.txt").write_text(
            "# Awesome Python\n\nHomepage: {{ site_url }}\n\n## Categories\n\n{{ categories_md }}\n",
            encoding="utf-8",
        )

    def _copy_real_templates(self, tmp_path):
        real_tpl = Path(__file__).parent / ".." / "templates"
        tpl_dir = tmp_path / "website" / "templates"
        shutil.copytree(real_tpl, tpl_dir)

    def test_build_creates_homepage_and_category_pages(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ## Projects

            **Tools**

            ### Widgets

            _Widget libraries. Also see [awesome-widgets](https://example.com/widgets)._

            - [w1](https://example.com) - A widget.

            ### Gadgets

            _Gadget tools._

            - [g1](https://example.com) - A gadget.

            ## Resources

            Info.

            ### Newsletters

            - [NL](https://example.com)

            ## Contributing

            Help!
        """)
        self._make_repo(tmp_path, readme)
        build(tmp_path)

        site = tmp_path / "website" / "output"
        assert (site / "index.html").exists()
        assert (site / "categories" / "widgets" / "index.html").exists()
        assert (site / "categories" / "gadgets" / "index.html").exists()

    def test_build_creates_root_discovery_files(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ## Projects

            **Tools**

            ### Widgets

            - Sync

                - [w1](https://example.com) - A widget.

            ## Contributing

            Help!
        """)
        self._make_repo(tmp_path, readme)
        sponsorship_mtime = datetime(2024, 1, 2, tzinfo=UTC).timestamp()
        os.utime(tmp_path / "SPONSORSHIP.md", (sponsorship_mtime, sponsorship_mtime))
        expected_sponsorship_lastmod = "2024-01-02"
        start_date = datetime.now(UTC).date()
        build(tmp_path)
        end_date = datetime.now(UTC).date()

        site = tmp_path / "website" / "output"
        robots = (site / "robots.txt").read_text(encoding="utf-8")
        assert robots == ("User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\n\nSitemap: https://awesome-python.com/sitemap.xml\n")

        sitemap = ET.parse(site / "sitemap.xml")
        root = sitemap.getroot()
        ns = {"sitemap": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [loc.text or "" for loc in root.findall("sitemap:url/sitemap:loc", ns)]
        lastmods = [lastmod.text or "" for lastmod in root.findall("sitemap:url/sitemap:lastmod", ns)]
        lastmod_by_loc = dict(zip(locs, lastmods, strict=True))

        assert root.tag == "{http://www.sitemaps.org/schemas/sitemap/0.9}urlset"
        assert locs == [
            "https://awesome-python.com/",
            "https://awesome-python.com/categories/widgets/",
            "https://awesome-python.com/categories/tools/",
            "https://awesome-python.com/categories/widgets/sync/",
            "https://awesome-python.com/sponsorship/",
        ]
        assert len(lastmods) == len(locs)
        assert lastmod_by_loc["https://awesome-python.com/sponsorship/"] == expected_sponsorship_lastmod
        assert all(start_date <= date.fromisoformat(lastmod) <= end_date for loc, lastmod in lastmod_by_loc.items() if loc != "https://awesome-python.com/sponsorship/")
        assert all(loc.startswith("https://awesome-python.com/") for loc in locs)
        assert all("?" not in loc for loc in locs)

    def test_build_creates_category_pages_with_metadata_and_links(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ## Projects

            **Tools**

            ## Widgets

            _Widget libraries. Also see [awesome-widgets](https://example.com/widgets)._

            - [w1](https://example.com/w1) - A widget.
            - [w2](https://github.com/owner/w2) - A starred widget.

            ## Gadgets

            _Gadget tools._

            - [g1](https://example.com/g1) - A gadget.

            # Contributing

            Help!
        """)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)

        data_dir = tmp_path / "website" / "data"
        data_dir.mkdir(parents=True)
        stars = {
            "owner/w2": {
                "stars": 42,
                "owner": "owner",
                "last_commit_at": "2026-01-01T00:00:00+00:00",
                "fetched_at": "2026-01-01T00:00:00+00:00",
            },
        }
        (data_dir / "github_stars.json").write_text(json.dumps(stars), encoding="utf-8")

        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")
        category_html = (site / "categories" / "widgets" / "index.html").read_text(encoding="utf-8")
        parser = HeadMetadataParser()
        parser.feed(category_html)

        assert 'href="/categories/widgets/"' in index_html
        assert 'data-value="Widgets"' in index_html
        assert parser.title.strip() == "Widgets Python Libraries - Awesome Python"
        assert parser.meta_by_name["description"] == "Widget libraries. Also see awesome-widgets. Explore 2 curated Python projects in Widgets."
        assert parser.links_by_rel["canonical"] == "https://awesome-python.com/categories/widgets/"
        assert parser.meta_by_property["og:url"] == "https://awesome-python.com/categories/widgets/"
        assert '<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs text entry point" />' not in category_html
        assert "<h1>Widgets</h1>" in category_html
        assert 'Widget libraries. Also see <a href="https://example.com/widgets" target="_blank" rel="noopener">awesome-widgets</a>.' in category_html
        assert 'href="https://example.com/w1"' in category_html
        assert "A widget." in category_html
        assert 'href="https://github.com/owner/w2"' in category_html
        assert '<table class="table">' in category_html
        assert "42" in category_html
        assert "2026-01-01T00:00:00+00:00" in category_html

    def test_build_creates_llms_text_alternate_without_sponsors(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ## **Sponsors**

            - **[Sponsor](https://sponsor.example.com)**: Sponsored tool.

            > Become a sponsor: [Sponsor us](SPONSORSHIP.md).

            ## Categories

            **Tools**

            - [Widgets](#widgets)

            ## Projects

            **Tools**

            ### Widgets

            - [w1](https://example.com) - A widget.
            - [w2](https://github.com/owner/w2) - A starred widget.

            ## Contributing

            Help!
        """)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)

        data_dir = tmp_path / "website" / "data"
        data_dir.mkdir(parents=True)
        stars = {
            "owner/w2": {"stars": 42, "owner": "owner", "fetched_at": "2026-01-01T00:00:00+00:00"},
        }
        (data_dir / "github_stars.json").write_text(json.dumps(stars), encoding="utf-8")

        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")
        llms_txt = (site / "llms.txt").read_text(encoding="utf-8")

        assert '<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs text entry point" />' in index_html

        assert llms_txt.startswith("# Awesome Python\n")
        assert "Scan the category index" in llms_txt
        assert "Homepage: https://awesome-python.com/" in llms_txt
        assert "Markdown homepage" not in llms_txt
        assert "https://awesome-python.com/index.md" not in llms_txt
        assert "GitHub repository: https://github.com/vinta/awesome-python" in llms_txt
        assert "Contributing guide: https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md" in llms_txt
        assert "Sponsorship: https://awesome-python.com/sponsorship/" in llms_txt
        assert "Sitemap: https://awesome-python.com/sitemap.xml" in llms_txt
        assert "## Categories" in llms_txt
        assert "**Tools**" in llms_txt
        assert "- [Widgets](#widgets)" in llms_txt
        assert "### Widgets" in llms_txt
        assert "- [w1](https://example.com) - A widget." in llms_txt
        assert "- [w2](https://github.com/owner/w2) - A starred widget. (GitHub stars: 42)" in llms_txt
        assert llms_txt != readme
        assert "# Contributing" not in llms_txt

    def test_build_cleans_stale_output(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

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

    def test_build_with_stars_sorts_by_stars(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

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

    def test_build_fails_when_group_and_category_slug_collide(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **Widgets**

            ## Widgets

            - [w1](https://example.com) - W.

            # Contributing

            Done.
        """)
        self._make_repo(tmp_path, readme)
        with pytest.raises(ValueError, match="slug collision"):
            build(tmp_path)

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
        assert 'id="hero-category-heading">Browse by category</h2>' in html
        assert 'class="hero-category-link" href="/categories/ai-and-agents/"' in html

    def test_index_contains_homepage_json_ld(self, tmp_path):
        readme = (Path(__file__).parents[2] / "README.md").read_text(encoding="utf-8")
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)

        build(tmp_path)

        parsed_groups = parse_readme(readme)
        categories = [cat for group in parsed_groups for cat in group["categories"]]
        entries = extract_entries(categories, parsed_groups)
        html = (tmp_path / "website" / "output" / "index.html").read_text(encoding="utf-8")

        marker = '<script type="application/ld+json">'
        assert marker in html
        start = html.index(marker) + len(marker)
        end = html.index("</script>", start)
        block = html[start:end]
        assert "</script>" not in block
        data = json.loads(block)

        assert data["@context"] == "https://schema.org"
        graph = {node["@type"]: node for node in data["@graph"]}
        assert set(graph) == {"WebSite", "CollectionPage"}
        assert graph["WebSite"]["url"] == "https://awesome-python.com/"
        assert graph["WebSite"]["name"] == "Awesome Python"
        assert graph["WebSite"]["@id"] == "https://awesome-python.com/#website"

        collection = graph["CollectionPage"]
        assert collection["@id"] == "https://awesome-python.com/"
        assert collection["url"] == "https://awesome-python.com/"
        assert collection["isPartOf"] == {"@type": "WebSite", "@id": graph["WebSite"]["@id"]}
        expected_description = f"An opinionated guide to the best Python frameworks, libraries, and tools. Explore {len(entries)} curated projects across {len(categories)} categories, from AI and agents to data science and web development."
        assert collection["description"] == expected_description

        item_list = collection["mainEntity"]
        assert item_list["@type"] == "ItemList"
        assert item_list["numberOfItems"] == len(entries)
        assert len(item_list["itemListElement"]) == len(entries)

        positions = [item["position"] for item in item_list["itemListElement"]]
        assert positions == list(range(1, len(entries) + 1))
        assert all(item["@type"] == "ListItem" for item in item_list["itemListElement"])
        assert all(item["url"].startswith(("http://", "https://")) for item in item_list["itemListElement"])

        rendered_names = {item["name"] for item in item_list["itemListElement"]}
        rendered_urls = {item["url"] for item in item_list["itemListElement"]}
        assert rendered_names == {e["name"] for e in entries}
        assert rendered_urls == {e["url"] for e in entries}

    def test_category_page_contains_json_ld(self, tmp_path):
        readme = textwrap.dedent("""\
            # Awesome Python

            Intro.

            ## Projects

            **Tools**

            ## Widgets

            _Widget libraries._

            - [w1](https://example.com/w1) - A widget.
            - [w2](https://github.com/owner/w2) - A starred widget.

            # Contributing

            Help!
        """)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        self._copy_real_templates(tmp_path)
        build(tmp_path)

        category_html = (tmp_path / "website" / "output" / "categories" / "widgets" / "index.html").read_text(encoding="utf-8")
        marker = '<script type="application/ld+json">'
        assert marker in category_html
        start = category_html.index(marker) + len(marker)
        end = category_html.index("</script>", start)
        block = category_html[start:end]
        assert "</script>" not in block
        data = json.loads(block)

        assert data["@context"] == "https://schema.org"
        graph = {node["@type"]: node for node in data["@graph"]}
        assert set(graph) == {"WebSite", "CollectionPage"}
        assert graph["WebSite"]["@id"] == "https://awesome-python.com/#website"
        collection = graph["CollectionPage"]
        assert collection["name"] == "Widgets Python Libraries"
        assert collection["@id"] == "https://awesome-python.com/categories/widgets/"
        assert collection["url"] == "https://awesome-python.com/categories/widgets/"
        assert collection["description"] == "Widget libraries. Explore 2 curated Python projects in Widgets."
        assert collection["isPartOf"] == {"@type": "WebSite", "@id": "https://awesome-python.com/#website"}

        item_list = collection["mainEntity"]
        assert item_list["@type"] == "ItemList"
        assert item_list["numberOfItems"] == 2
        names = {item["name"] for item in item_list["itemListElement"]}
        urls = {item["url"] for item in item_list["itemListElement"]}
        assert names == {"w1", "w2"}
        assert urls == {"https://example.com/w1", "https://github.com/owner/w2"}
        positions = sorted(item["position"] for item in item_list["itemListElement"])
        assert positions == [1, 2]

    def test_group_page_falls_back_to_default_description_in_json_ld(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **AI & ML**

            ## Deep Learning

            - [dl1](https://example.com/dl1) - DL.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        group_html = (tmp_path / "website" / "output" / "categories" / "ai-ml" / "index.html").read_text(encoding="utf-8")
        marker = '<script type="application/ld+json">'
        start = group_html.index(marker) + len(marker)
        end = group_html.index("</script>", start)
        data = json.loads(group_html[start:end])

        graph = {node["@type"]: node for node in data["@graph"]}
        collection = graph["CollectionPage"]
        assert collection["name"] == "AI & ML Python Libraries"
        assert collection["@id"] == "https://awesome-python.com/categories/ai-ml/"
        assert collection["url"] == "https://awesome-python.com/categories/ai-ml/"
        assert collection["description"] == "Explore 1 curated Python projects in AI & ML. Part of the Awesome Python catalog."

    def test_build_creates_subcategory_pages(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **Web**

            ## Web Frameworks

            - Synchronous

                - [django](https://example.com/django) - Sync framework.

            - Asynchronous

                - [fastapi](https://example.com/fastapi) - Async framework.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        sync = (site / "categories" / "web-frameworks" / "synchronous" / "index.html").read_text(encoding="utf-8")
        async_ = (site / "categories" / "web-frameworks" / "asynchronous" / "index.html").read_text(encoding="utf-8")

        assert "django" in sync
        assert "fastapi" not in sync
        assert "fastapi" in async_
        assert "django" not in async_

    def test_subcategory_page_shows_breadcrumb(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **Web**

            ## Web Frameworks

            - Synchronous

                - [django](https://example.com/django) - Sync.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        sync = (site / "categories" / "web-frameworks" / "synchronous" / "index.html").read_text(encoding="utf-8")
        assert 'href="/categories/web-frameworks/"' in sync
        assert "Web Frameworks" in sync
        assert "<h1>Synchronous</h1>" in sync
        assert "category-breadcrumb" in sync

        parent = (site / "categories" / "web-frameworks" / "index.html").read_text(encoding="utf-8")
        assert "category-breadcrumb" not in parent

    def test_index_embeds_filter_urls_json(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **AI & ML**

            ## Deep Learning

            - [dl1](https://example.com/dl1) - DL.

            ## Machine Learning

            - Classical

                - [ml1](https://example.com/ml1) - ML.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")

        marker = '<script type="application/json" id="filter-urls">'
        assert marker in index_html
        start = index_html.index(marker) + len(marker)
        end = index_html.index("</script>", start)
        data = json.loads(index_html[start:end])

        assert data["Deep Learning"] == "/categories/deep-learning/"
        assert data["Machine Learning"] == "/categories/machine-learning/"
        assert data["AI & ML"] == "/categories/ai-ml/"
        assert data["Machine Learning > Classical"] == "/categories/machine-learning/classical/"

    def test_filter_urls_json_escapes_closing_script_tag(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            ## Sneaky </script><script>x=1</script>

            - [a](https://example.com) - A.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")

        marker = '<script type="application/json" id="filter-urls">'
        start = index_html.index(marker) + len(marker)
        end = index_html.index("</script>", start)
        block = index_html[start:end]
        assert "</script>" not in block
        data = json.loads(block)
        assert any("Sneaky" in key for key in data)

    def test_build_creates_group_pages(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **AI & ML**

            ## Deep Learning

            - [dl1](https://example.com/dl1) - DL.

            ## Machine Learning

            - [ml1](https://example.com/ml1) - ML.

            **Web Development**

            ## Web Frameworks

            - [wf1](https://example.com/wf1) - WF.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        ai_ml = (site / "categories" / "ai-ml" / "index.html").read_text(encoding="utf-8")
        web_dev = (site / "categories" / "web-development" / "index.html").read_text(encoding="utf-8")

        assert "dl1" in ai_ml
        assert "ml1" in ai_ml
        assert "wf1" not in ai_ml
        assert "wf1" in web_dev
        assert "dl1" not in web_dev

    def test_tag_buttons_have_data_url(self, tmp_path):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **AI & ML**

            ## Deep Learning

            - Vision

                - [v1](https://example.com/v1) - Vision lib.

            # Contributing

            Done.
        """)
        self._copy_real_templates(tmp_path)
        (tmp_path / "README.md").write_text(readme, encoding="utf-8")
        build(tmp_path)

        site = tmp_path / "website" / "output"
        index_html = (site / "index.html").read_text(encoding="utf-8")

        assert 'data-value="Deep Learning"' in index_html
        assert 'data-url="/categories/deep-learning/"' in index_html
        assert 'data-value="AI &amp; ML"' in index_html or 'data-value="AI & ML"' in index_html
        assert 'data-url="/categories/ai-ml/"' in index_html
        assert 'data-url="/categories/deep-learning/vision/"' in index_html


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


def _template_entry(name: str, stars: int | None, source_type: str | None = None) -> TemplateEntry:
    return TemplateEntry(
        name=name,
        url="",
        description="",
        categories=[],
        groups=[],
        subcategories=[],
        stars=stars,
        owner=None,
        last_commit_at=None,
        source_type=source_type,
        also_see=[],
    )


class TestSortEntries:
    def test_sorts_by_stars_descending(self):
        entries = [
            _template_entry("a", 100),
            _template_entry("b", 500),
            _template_entry("c", 200),
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["b", "c", "a"]

    def test_equal_stars_sorted_alphabetically(self):
        entries = [
            _template_entry("beta", 100),
            _template_entry("alpha", 100),
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["alpha", "beta"]

    def test_no_stars_go_to_bottom(self):
        entries = [
            _template_entry("no-stars", None),
            _template_entry("has-stars", 50),
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["has-stars", "no-stars"]

    def test_no_stars_sorted_alphabetically(self):
        entries = [
            _template_entry("zebra", None),
            _template_entry("apple", None),
        ]
        result = sort_entries(entries)
        assert [e["name"] for e in result] == ["apple", "zebra"]

    def test_builtin_between_starred_and_unstarred(self):
        entries = [
            _template_entry("builtin", None, "Built-in"),
            _template_entry("starred", 100),
            _template_entry("unstarred", None),
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

            ## Projects

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

            ## Projects

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

            ## Projects

            ## Stdlib

            - [asyncio](https://docs.python.org/3/library/asyncio.html) - Async I/O.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        categories = [c for g in groups for c in g["categories"]]
        entries = extract_entries(categories, groups)
        assert entries[0]["source_type"] == "Built-in"

    def test_subcategory_includes_slug_and_url(self):
        readme = textwrap.dedent("""\
            # T

            ## Projects

            **Tools**

            ## Web Frameworks

            - Synchronous

                - [django](https://example.com/django) - A framework.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        categories = [c for g in groups for c in g["categories"]]
        entries = extract_entries(categories, groups)
        assert entries[0]["subcategories"] == [
            {
                "name": "Synchronous",
                "value": "Web Frameworks > Synchronous",
                "slug": "synchronous",
                "url": "/categories/web-frameworks/synchronous/",
            },
        ]


# ---------------------------------------------------------------------------
# annotate_entries_with_stars
# ---------------------------------------------------------------------------


class TestAnnotateEntriesWithStars:
    def test_appends_star_count_to_bullet(self):
        markdown = "- [foo](https://github.com/owner/foo) - A foo.\n"
        stars = {"owner/foo": {"stars": 123, "owner": "owner"}}
        assert annotate_entries_with_stars(markdown, stars) == ("- [foo](https://github.com/owner/foo) - A foo. (123 GitHub stars)\n")

    def test_uses_first_github_link(self):
        markdown = "- [foo](https://github.com/owner/foo) - A foo. Also [bar](https://github.com/owner/bar).\n"
        stars = {
            "owner/foo": {"stars": 10, "owner": "owner"},
            "owner/bar": {"stars": 99, "owner": "owner"},
        }
        assert annotate_entries_with_stars(markdown, stars) == ("- [foo](https://github.com/owner/foo) - A foo. Also [bar](https://github.com/owner/bar). (10 GitHub stars)\n")

    def test_skips_entries_without_star_data(self):
        markdown = "- [foo](https://github.com/owner/foo) - A foo.\n"
        assert annotate_entries_with_stars(markdown, {}) == markdown

    def test_skips_non_github_links(self):
        markdown = "- [foo](https://example.com) - A foo.\n"
        stars = {"owner/foo": {"stars": 1, "owner": "owner"}}
        assert annotate_entries_with_stars(markdown, stars) == markdown

    def test_skips_non_bullet_lines(self):
        markdown = "See [foo](https://github.com/owner/foo) for details.\n"
        stars = {"owner/foo": {"stars": 1, "owner": "owner"}}
        assert annotate_entries_with_stars(markdown, stars) == markdown

    def test_handles_indented_bullets(self):
        markdown = "    - [foo](https://github.com/owner/foo)\n"
        stars = {"owner/foo": {"stars": 7, "owner": "owner"}}
        assert annotate_entries_with_stars(markdown, stars) == ("    - [foo](https://github.com/owner/foo) (7 GitHub stars)\n")

    def test_preserves_lines_without_trailing_newline(self):
        markdown = "- [foo](https://github.com/owner/foo) - A foo."
        stars = {"owner/foo": {"stars": 5, "owner": "owner"}}
        assert annotate_entries_with_stars(markdown, stars) == ("- [foo](https://github.com/owner/foo) - A foo. (5 GitHub stars)")
