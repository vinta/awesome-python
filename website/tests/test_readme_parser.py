"""Tests for the readme_parser module."""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from readme_parser import render_inline_html, render_inline_text

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
