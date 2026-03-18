"""Tests for the readme_parser module."""

import os
import sys
import textwrap

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from readme_parser import parse_readme, render_inline_html, render_inline_text

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
