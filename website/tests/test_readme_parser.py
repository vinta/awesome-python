"""Tests for the readme_parser module."""

import os
import textwrap

import pytest

from readme_parser import (
    _find_inline,
    _parse_section_entries,
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


GROUPED_README = textwrap.dedent("""\
    # Awesome Python

    Some intro text.

    ---

    **Group One**

    ## Alpha

    _Libraries for alpha stuff._

    - [lib-a](https://example.com/a) - Does A.
    - [lib-b](https://example.com/b) - Does B.

    **Group Two**

    ## Beta

    _Tools for beta._

    - [lib-c](https://example.com/c) - Does C.

    ## Gamma

    - [lib-d](https://example.com/d) - Does D.

    # Resources

    Where to discover resources.

    ## Newsletters

    - [News One](https://example.com/n1)

    # Contributing

    Please contribute!
""")


class TestParseReadmeSections:
    def test_ungrouped_categories_go_to_other(self):
        groups = parse_readme(MINIMAL_README)
        assert len(groups) == 1
        assert groups[0]["name"] == "Other"
        assert len(groups[0]["categories"]) == 2

    def test_ungrouped_category_names(self):
        groups = parse_readme(MINIMAL_README)
        cats = groups[0]["categories"]
        assert cats[0]["name"] == "Alpha"
        assert cats[1]["name"] == "Beta"

    def test_category_slugs(self):
        groups = parse_readme(MINIMAL_README)
        cats = groups[0]["categories"]
        assert cats[0]["slug"] == "alpha"
        assert cats[1]["slug"] == "beta"

    def test_category_description(self):
        groups = parse_readme(MINIMAL_README)
        cats = groups[0]["categories"]
        assert cats[0]["description"] == "Libraries for alpha stuff."
        assert cats[1]["description"] == "Tools for beta."

    def test_contributing_skipped(self):
        groups = parse_readme(MINIMAL_README)
        all_names = []
        for g in groups:
            all_names.extend(c["name"] for c in g["categories"])
        assert "Contributing" not in all_names

    def test_no_separator(self):
        groups = parse_readme("# Just a heading\n\nSome text.\n")
        assert groups == []

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
        groups = parse_readme(readme)
        cats = groups[0]["categories"]
        assert cats[0]["description"] == ""
        assert cats[0]["entries"][0]["name"] == "item"

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
        groups = parse_readme(readme)
        cats = groups[0]["categories"]
        assert cats[0]["description"] == "Algorithms. Also see awesome-algos."


class TestParseGroupedReadme:
    def test_group_count(self):
        groups = parse_readme(GROUPED_README)
        assert len(groups) == 2

    def test_group_names(self):
        groups = parse_readme(GROUPED_README)
        assert groups[0]["name"] == "Group One"
        assert groups[1]["name"] == "Group Two"

    def test_group_slugs(self):
        groups = parse_readme(GROUPED_README)
        assert groups[0]["slug"] == "group-one"
        assert groups[1]["slug"] == "group-two"

    def test_group_one_has_one_category(self):
        groups = parse_readme(GROUPED_README)
        assert len(groups[0]["categories"]) == 1
        assert groups[0]["categories"][0]["name"] == "Alpha"

    def test_group_two_has_two_categories(self):
        groups = parse_readme(GROUPED_README)
        assert len(groups[1]["categories"]) == 2
        assert groups[1]["categories"][0]["name"] == "Beta"
        assert groups[1]["categories"][1]["name"] == "Gamma"

    def test_empty_group_skipped(self):
        readme = textwrap.dedent("""\
            # T

            ---

            **Empty**

            **HasCats**

            ## Cat

            - [x](https://x.com) - X.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        assert len(groups) == 1
        assert groups[0]["name"] == "HasCats"

    def test_bold_with_extra_text_not_group_marker(self):
        readme = textwrap.dedent("""\
            # T

            ---

            **Note:** This is not a group marker.

            ## Cat

            - [x](https://x.com) - X.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        # "Note:" has text after the strong node, so it's not a group marker
        # Category goes into "Other"
        assert len(groups) == 1
        assert groups[0]["name"] == "Other"

    def test_categories_before_any_group_marker(self):
        readme = textwrap.dedent("""\
            # T

            ---

            ## Orphan

            - [x](https://x.com) - X.

            **A Group**

            ## Grouped

            - [y](https://x.com) - Y.

            # Contributing

            Done.
        """)
        groups = parse_readme(readme)
        assert len(groups) == 2
        assert groups[0]["name"] == "Other"
        assert groups[0]["categories"][0]["name"] == "Orphan"
        assert groups[1]["name"] == "A Group"
        assert groups[1]["categories"][0]["name"] == "Grouped"


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

    def test_text_before_link_is_subcategory(self):
        nodes = _content_nodes(
            "- MySQL - [awesome-mysql](http://example.com/awesome-mysql/)\n"
            "  - [mysqlclient](https://example.com/mysqlclient) - MySQL connector.\n"
            "  - [pymysql](https://example.com/pymysql) - Pure Python MySQL driver.\n"
        )
        entries = _parse_section_entries(nodes)
        # awesome-mysql is a subcategory label, not an entry
        assert len(entries) == 2
        names = [e["name"] for e in entries]
        assert "awesome-mysql" not in names
        assert "mysqlclient" in names
        assert "pymysql" in names

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
        groups = parse_readme(readme)
        cats = groups[0]["categories"]
        # 2 main entries + 1 also_see = 3
        assert cats[0]["entry_count"] == 3

    def test_description_html_escapes_xss(self):
        nodes = _content_nodes('- [lib](https://x.com) - A <script>alert(1)</script> lib.\n')
        entries = _parse_section_entries(nodes)
        assert "<script>" not in entries[0]["description"]
        assert "&lt;script&gt;" in entries[0]["description"]


class TestParseRealReadme:
    @pytest.fixture(autouse=True)
    def load_readme(self):
        readme_path = os.path.join(os.path.dirname(__file__), "..", "..", "README.md")
        with open(readme_path, encoding="utf-8") as f:
            self.readme_text = f.read()
        self.groups = parse_readme(self.readme_text)
        self.cats = [c for g in self.groups for c in g["categories"]]

    def test_at_least_11_groups(self):
        assert len(self.groups) >= 11

    def test_first_group_is_ai_ml(self):
        assert self.groups[0]["name"] == "AI & ML"

    def test_at_least_69_categories(self):
        assert len(self.cats) >= 69

    def test_contributing_not_in_results(self):
        all_names = [c["name"] for c in self.cats]
        assert "Contributing" not in all_names

    def test_first_category_is_ai_and_agents(self):
        assert self.cats[0]["name"] == "AI and Agents"
        assert self.cats[0]["slug"] == "ai-and-agents"

    def test_web_apis_slug(self):
        slugs = [c["slug"] for c in self.cats]
        assert "web-apis" in slugs

    def test_descriptions_extracted(self):
        ai = next(c for c in self.cats if c["name"] == "AI and Agents")
        assert "AI applications" in ai["description"]

    def test_entry_counts_nonzero(self):
        for cat in self.cats:
            assert cat["entry_count"] > 0, f"{cat['name']} has 0 entries"

    def test_async_has_also_see(self):
        async_cat = next(c for c in self.cats if c["name"] == "Asynchronous Programming")
        asyncio_entry = next(e for e in async_cat["entries"] if e["name"] == "asyncio")
        assert len(asyncio_entry["also_see"]) >= 1
        assert asyncio_entry["also_see"][0]["name"] == "awesome-asyncio"

    def test_description_links_stripped_to_text(self):
        algos = next(c for c in self.cats if c["name"] == "Algorithms and Design Patterns")
        assert "awesome-algorithms" in algos["description"]
        assert "https://" not in algos["description"]

    def test_miscellaneous_in_own_group(self):
        misc_group = next((g for g in self.groups if g["name"] == "Miscellaneous"), None)
        assert misc_group is not None
        assert any(c["name"] == "Miscellaneous" for c in misc_group["categories"])

    def test_all_entries_have_nonempty_names(self):
        bad = []
        for cat in self.cats:
            for entry in cat["entries"]:
                if not entry["name"].strip():
                    bad.append(f"{cat['name']}: empty entry name (url={entry['url']})")
        assert bad == [], "Entries with empty names:\n" + "\n".join(bad)

    def test_all_entries_have_valid_urls(self):
        bad = []
        for cat in self.cats:
            for entry in cat["entries"]:
                if not entry["url"].startswith(("https://", "http://")):
                    bad.append(f"{cat['name']}: [{entry['name']}] has invalid url: {entry['url']!r}")
                for see in entry["also_see"]:
                    if not see["url"].startswith(("https://", "http://")):
                        bad.append(f"{cat['name']}: [{see['name']}] (also_see) has invalid url: {see['url']!r}")
        assert bad == [], "Entries with invalid URLs:\n" + "\n".join(bad)

    def test_no_malformed_entry_lines(self):
        """Detect list items that look like entries but have broken link syntax.

        Walks the markdown-it AST for list items whose inline text starts
        with '[' but contain no link node. This catches broken markdown
        like '- [name(url)' where the closing '](' is missing.
        """
        md = MarkdownIt("commonmark")
        root = SyntaxTreeNode(md.parse(self.readme_text))

        # Find category section boundaries (between --- and # Resources/Contributing)
        hr_idx = None
        end_idx = None
        for i, node in enumerate(root.children):
            if hr_idx is None and node.type == "hr":
                hr_idx = i
            elif node.type == "heading" and node.tag == "h1":
                text = render_inline_text(node.children[0].children) if node.children else ""
                if end_idx is None and text in ("Resources", "Contributing"):
                    end_idx = i
        if hr_idx is None:
            return

        bad = []
        cat_nodes = root.children[hr_idx + 1 : end_idx or len(root.children)]
        for node in cat_nodes:
            if node.type != "bullet_list":
                continue
            self._check_list_for_broken_links(node, bad)

        assert bad == [], "List items with broken link syntax:\n" + "\n".join(bad)

    def _check_list_for_broken_links(self, bullet_list, bad):
        for list_item in bullet_list.children:
            if list_item.type != "list_item":
                continue
            inline = _find_inline(list_item)
            if inline is None:
                continue
            # Check if inline text starts with '[' but has no link node
            has_link = any(c.type == "link" for c in inline.children)
            text = render_inline_text(inline.children)
            if not has_link and text.startswith("["):
                line = list_item.map[0] + 1 if list_item.map else "?"
                bad.append(f"  line {line}: {text}")
            # Recurse into nested lists
            for child in list_item.children:
                if child.type == "bullet_list":
                    self._check_list_for_broken_links(child, bad)
