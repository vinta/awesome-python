"""Tests for the readme_parser module."""

import os
import sys
import textwrap

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from readme_parser import (
    _parse_section_entries,
    _render_section_html,
    parse_readme,
    render_inline_html,
    render_inline_text,
)

from markdown_it import MarkdownIt
from markdown_it.tree import SyntaxTreeNode


def _parse_inline(md_text: str) -> list[SyntaxTreeNode]:
    """Helper: parse a single paragraph and return its inline children."""
    md = MarkdownIt("commonmark")
    root = SyntaxTreeNode(md.parse(md_text))
    # root > paragraph > inline > children
    return root.children[0].children[0].children


class TestRenderInlineHtml:
    def test_plain_text_escapes_html(self):
        children = _parse_inline("Hello <world> & friends")
        assert render_inline_html(children) == "Hello &lt;world&gt; &amp; friends"

    def test_link_with_target(self):
        children = _parse_inline("[name](https://example.com)")
        html = render_inline_html(children)
        assert 'href="https://example.com"' in html
        assert 'target="_blank"' in html
        assert 'rel="noopener"' in html
        assert ">name</a>" in html

    def test_emphasis(self):
        children = _parse_inline("*italic* text")
        assert "<em>italic</em>" in render_inline_html(children)

    def test_strong(self):
        children = _parse_inline("**bold** text")
        assert "<strong>bold</strong>" in render_inline_html(children)

    def test_code_inline(self):
        children = _parse_inline("`some code`")
        assert "<code>some code</code>" in render_inline_html(children)

    def test_mixed_link_and_text(self):
        children = _parse_inline("See [foo](https://x.com) for details.")
        html = render_inline_html(children)
        assert "See " in html
        assert ">foo</a>" in html
        assert " for details." in html


class TestRenderInlineText:
    def test_plain_text(self):
        children = _parse_inline("Hello world")
        assert render_inline_text(children) == "Hello world"

    def test_link_becomes_text(self):
        children = _parse_inline("See [awesome-algos](https://github.com/x/y).")
        assert render_inline_text(children) == "See awesome-algos."

    def test_emphasis_stripped(self):
        children = _parse_inline("*italic* text")
        assert render_inline_text(children) == "italic text"

    def test_code_inline_kept(self):
        children = _parse_inline("`code` here")
        assert render_inline_text(children) == "code here"


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


class TestParseReadmeSections:
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

    def test_resource_names(self):
        _, resources = parse_readme(MINIMAL_README)
        assert resources[0]["name"] == "Newsletters"
        assert resources[1]["name"] == "Podcasts"

    def test_resource_content(self):
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

    def test_description_with_link_stripped(self):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Algos

            _Algorithms. Also see [awesome-algos](https://example.com)._

            - [lib](https://x.com) - Lib.

            # Contributing

            Done.
        """)
        cats, _ = parse_readme(readme)
        assert cats[0]["description"] == "Algorithms. Also see awesome-algos."


def _content_nodes(md_text: str) -> list[SyntaxTreeNode]:
    """Helper: parse markdown and return all block nodes."""
    md = MarkdownIt("commonmark")
    root = SyntaxTreeNode(md.parse(md_text))
    return root.children


class TestParseSectionEntries:
    def test_flat_entries(self):
        nodes = _content_nodes(
            "- [django](https://example.com/d) - A web framework.\n"
            "- [flask](https://example.com/f) - A micro framework.\n"
        )
        entries = _parse_section_entries(nodes)
        assert len(entries) == 2
        assert entries[0]["name"] == "django"
        assert entries[0]["url"] == "https://example.com/d"
        assert "web framework" in entries[0]["description"]
        assert entries[0]["also_see"] == []
        assert entries[1]["name"] == "flask"

    def test_link_only_entry(self):
        nodes = _content_nodes("- [tool](https://x.com)\n")
        entries = _parse_section_entries(nodes)
        assert len(entries) == 1
        assert entries[0]["name"] == "tool"
        assert entries[0]["description"] == ""

    def test_subcategorized_entries(self):
        nodes = _content_nodes(
            "- Algorithms\n"
            "  - [algos](https://x.com/a) - Algo lib.\n"
            "  - [sorts](https://x.com/s) - Sort lib.\n"
            "- Design Patterns\n"
            "  - [patterns](https://x.com/p) - Pattern lib.\n"
        )
        entries = _parse_section_entries(nodes)
        assert len(entries) == 3
        assert entries[0]["name"] == "algos"
        assert entries[2]["name"] == "patterns"

    def test_also_see_sub_entries(self):
        nodes = _content_nodes(
            "- [asyncio](https://docs.python.org/3/library/asyncio.html) - Async I/O.\n"
            "  - [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio)\n"
            "- [trio](https://github.com/python-trio/trio) - Friendly async.\n"
        )
        entries = _parse_section_entries(nodes)
        assert len(entries) == 2
        assert entries[0]["name"] == "asyncio"
        assert len(entries[0]["also_see"]) == 1
        assert entries[0]["also_see"][0]["name"] == "awesome-asyncio"
        assert entries[1]["name"] == "trio"
        assert entries[1]["also_see"] == []

    def test_entry_count_includes_also_see(self):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Async

            - [asyncio](https://x.com) - Async I/O.
              - [awesome-asyncio](https://y.com)
            - [trio](https://z.com) - Friendly async.

            # Contributing

            Done.
        """)
        cats, _ = parse_readme(readme)
        # 2 main entries + 1 also_see = 3
        assert cats[0]["entry_count"] == 3

    def test_preview_first_four_names(self):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Libs

            - [alpha](https://x.com) - A.
            - [beta](https://x.com) - B.
            - [gamma](https://x.com) - C.
            - [delta](https://x.com) - D.
            - [epsilon](https://x.com) - E.

            # Contributing

            Done.
        """)
        cats, _ = parse_readme(readme)
        assert cats[0]["preview"] == "alpha, beta, gamma, delta"

    def test_description_html_escapes_xss(self):
        nodes = _content_nodes('- [lib](https://x.com) - A <script>alert(1)</script> lib.\n')
        entries = _parse_section_entries(nodes)
        assert "<script>" not in entries[0]["description"]
        assert "&lt;script&gt;" in entries[0]["description"]


class TestRenderSectionHtml:
    def test_basic_entry(self):
        nodes = _content_nodes("- [django](https://example.com) - A web framework.\n")
        html = _render_section_html(nodes)
        assert 'class="entry"' in html
        assert 'href="https://example.com"' in html
        assert "django" in html
        assert "A web framework." in html

    def test_subcategory_label(self):
        nodes = _content_nodes(
            "- Synchronous\n  - [django](https://x.com) - Framework.\n"
        )
        html = _render_section_html(nodes)
        assert 'class="subcat"' in html
        assert "Synchronous" in html
        assert 'class="entry"' in html

    def test_sub_entry(self):
        nodes = _content_nodes(
            "- [django](https://x.com) - Framework.\n"
            "  - [awesome-django](https://y.com)\n"
        )
        html = _render_section_html(nodes)
        assert 'class="entry-sub"' in html
        assert "awesome-django" in html

    def test_link_only_entry(self):
        nodes = _content_nodes("- [tool](https://x.com)\n")
        html = _render_section_html(nodes)
        assert 'class="entry"' in html
        assert 'href="https://x.com"' in html
        assert "tool" in html

    def test_xss_escaped_in_name(self):
        nodes = _content_nodes('- [<img onerror=alert(1)>](https://x.com) - Bad.\n')
        html = _render_section_html(nodes)
        assert "onerror" not in html or "&" in html

    def test_xss_escaped_in_subcat(self):
        nodes = _content_nodes("- <script>alert(1)</script>\n")
        html = _render_section_html(nodes)
        assert "<script>" not in html
