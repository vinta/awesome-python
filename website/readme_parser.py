"""Parse README.md into structured section data using markdown-it-py AST."""

from __future__ import annotations

import re
from typing import TypedDict

from markdown_it import MarkdownIt
from markdown_it.tree import SyntaxTreeNode
from markupsafe import escape


class AlsoSee(TypedDict):
    name: str
    url: str


class ParsedEntry(TypedDict):
    name: str
    url: str
    description: str  # inline HTML, properly escaped
    also_see: list[AlsoSee]
    subcategory: str  # sub-category label, empty if none


class ParsedSection(TypedDict):
    name: str
    slug: str
    description: str  # plain text, links resolved to text
    entries: list[ParsedEntry]
    entry_count: int


class ParsedGroup(TypedDict):
    name: str
    slug: str
    categories: list[ParsedSection]


class ParsedSponsor(TypedDict):
    name: str
    url: str
    description: str  # inline HTML, properly escaped


# --- Slugify ----------------------------------------------------------------

_SLUG_NON_ALNUM_RE = re.compile(r"[^a-z0-9\s-]")
_SLUG_WHITESPACE_RE = re.compile(r"[\s]+")
_SLUG_MULTI_DASH_RE = re.compile(r"-+")


def slugify(name: str) -> str:
    """Convert a category name to a URL-friendly slug."""
    slug = name.lower()
    slug = _SLUG_NON_ALNUM_RE.sub("", slug)
    slug = _SLUG_WHITESPACE_RE.sub("-", slug.strip())
    slug = _SLUG_MULTI_DASH_RE.sub("-", slug)
    return slug


# --- Inline renderers -------------------------------------------------------


def _render_inline(children: list[SyntaxTreeNode], *, html: bool) -> str:
    """Render inline AST nodes to HTML or plain text."""
    parts: list[str] = []
    for child in children:
        match child.type:
            case "text":
                parts.append(str(escape(child.content)) if html else child.content)
            case "html_inline":
                if html:
                    parts.append(str(escape(child.content)))
            case "softbreak":
                parts.append(" ")
            case "code_inline":
                parts.append(f"<code>{escape(child.content)}</code>" if html else child.content)
            case "link":
                inner = _render_inline(child.children, html=html)
                if html:
                    href = str(escape(_href(child)))
                    parts.append(f'<a href="{href}" target="_blank" rel="noopener">{inner}</a>')
                else:
                    parts.append(inner)
            case "em":
                inner = _render_inline(child.children, html=html)
                parts.append(f"<em>{inner}</em>" if html else inner)
            case "strong":
                inner = _render_inline(child.children, html=html)
                parts.append(f"<strong>{inner}</strong>" if html else inner)
    return "".join(parts)


def render_inline_html(children: list[SyntaxTreeNode]) -> str:
    """Render inline AST nodes to HTML with proper escaping."""
    return _render_inline(children, html=True)


def render_inline_text(children: list[SyntaxTreeNode]) -> str:
    """Render inline AST nodes to plain text (links become their text)."""
    return _render_inline(children, html=False)


# --- AST helpers -------------------------------------------------------------


def _heading_text(node: SyntaxTreeNode) -> str:
    """Extract plain text from a heading node."""
    for child in node.children:
        if child.type == "inline":
            return render_inline_text(child.children)
    return ""


def _extract_description(nodes: list[SyntaxTreeNode]) -> str:
    """Extract description from the first paragraph if it's a single <em> block.

    Pattern: _Libraries for foo._ -> "Libraries for foo."
    """
    if not nodes:
        return ""
    first = nodes[0]
    if first.type != "paragraph":
        return ""
    for child in first.children:
        if child.type == "inline" and len(child.children) == 1:
            em = child.children[0]
            if em.type == "em":
                return render_inline_text(em.children)
    return ""


# --- Entry extraction --------------------------------------------------------

_DESC_SEP_RE = re.compile(r"^\s*[-\u2013\u2014]\s*")
_SUBCAT_TRAILING_RE = re.compile(r"[\s,\-\u2013\u2014]+(also\s+see\s*)?$", re.IGNORECASE)


def _find_child(node: SyntaxTreeNode, child_type: str) -> SyntaxTreeNode | None:
    """Find first direct child of a given type."""
    for child in node.children:
        if child.type == child_type:
            return child
    return None


def _href(link: SyntaxTreeNode) -> str:
    """Return the link's href attribute as a string, or '' if missing."""
    href = link.attrGet("href")
    return href if isinstance(href, str) else ""


def _find_inline(node: SyntaxTreeNode) -> SyntaxTreeNode | None:
    """Find the inline node in a list_item's paragraph."""
    para = _find_child(node, "paragraph")
    if para is None:
        return None
    return _find_child(para, "inline")


def _extract_description_html(inline: SyntaxTreeNode, first_link: SyntaxTreeNode) -> str:
    """Extract description HTML from inline content after the first link.

    AST: [link("name"), text(" - Description.")]  ->  "Description."
    The separator (- / en-dash / em-dash) is stripped.
    """
    link_idx = next((i for i, c in enumerate(inline.children) if c is first_link), None)
    if link_idx is None:
        return ""
    desc_children = inline.children[link_idx + 1 :]
    if not desc_children:
        return ""
    html = render_inline_html(desc_children)
    return _DESC_SEP_RE.sub("", html)


def _parse_list_entries(
    bullet_list: SyntaxTreeNode,
    *,
    subcategory: str = "",
) -> list[ParsedEntry]:
    """Extract entries from a bullet_list AST node.

    Handles three patterns:
    - Text-only list_item -> subcategory label -> recurse into nested list
    - Link list_item with nested link-only items -> entry with also_see
    - Link list_item without nesting -> simple entry
    """
    entries: list[ParsedEntry] = []

    for list_item in bullet_list.children:
        if list_item.type != "list_item":
            continue

        inline = _find_inline(list_item)
        if inline is None:
            continue

        first_link = _find_child(inline, "link")

        if first_link is None or inline.children[0] is not first_link:
            # Subcategory label: take text before the first link, strip trailing separators
            pre_link = []
            for child in inline.children:
                if child.type == "link":
                    break
                pre_link.append(child)
            label = _SUBCAT_TRAILING_RE.sub("", render_inline_text(pre_link)) if pre_link else render_inline_text(inline.children)
            nested = _find_child(list_item, "bullet_list")
            if nested:
                entries.extend(_parse_list_entries(nested, subcategory=label))
            continue

        # Entry with a link
        name = render_inline_text(first_link.children)
        url = _href(first_link)
        desc_html = _extract_description_html(inline, first_link)

        # Collect also_see from nested bullet_list
        also_see: list[AlsoSee] = []
        nested = _find_child(list_item, "bullet_list")
        if nested:
            for sub_item in nested.children:
                if sub_item.type != "list_item":
                    continue
                sub_inline = _find_inline(sub_item)
                if sub_inline:
                    sub_link = _find_child(sub_inline, "link")
                    if sub_link:
                        also_see.append(AlsoSee(
                            name=render_inline_text(sub_link.children),
                            url=_href(sub_link),
                        ))

        entries.append(ParsedEntry(
            name=name,
            url=url,
            description=desc_html,
            also_see=also_see,
            subcategory=subcategory,
        ))

    return entries


def _parse_section_entries(content_nodes: list[SyntaxTreeNode]) -> list[ParsedEntry]:
    """Extract all entries from a section's content nodes."""
    entries: list[ParsedEntry] = []
    for node in content_nodes:
        if node.type == "bullet_list":
            entries.extend(_parse_list_entries(node))
    return entries


# --- Section splitting -------------------------------------------------------


def _build_section(name: str, body: list[SyntaxTreeNode]) -> ParsedSection:
    """Build a ParsedSection from a heading name and its body nodes."""
    desc = _extract_description(body)
    content_nodes = body[1:] if desc else body
    entries = _parse_section_entries(content_nodes)
    entry_count = len(entries) + sum(len(e["also_see"]) for e in entries)
    return ParsedSection(
        name=name,
        slug=slugify(name),
        description=desc,
        entries=entries,
        entry_count=entry_count,
    )



def _is_bold_marker(node: SyntaxTreeNode) -> str | None:
    """Detect a bold-only paragraph used as a group marker.

    Pattern: a paragraph whose only content is **Group Name** (possibly
    surrounded by empty text nodes in the AST).
    Returns the group name text, or None if not a group marker.
    """
    if node.type != "paragraph":
        return None
    for child in node.children:
        if child.type != "inline":
            continue
        # Filter out empty text nodes that markdown-it inserts around strong
        meaningful = [c for c in child.children if not (c.type == "text" and c.content == "")]
        if len(meaningful) == 1 and meaningful[0].type == "strong":
            return render_inline_text(meaningful[0].children)
    return None


def _parse_grouped_sections(
    nodes: list[SyntaxTreeNode],
) -> list[ParsedGroup]:
    """Parse nodes into groups of categories using bold markers as group boundaries.

    Bold-only paragraphs (**Group Name**) delimit groups. H2 headings under each
    bold marker become categories within that group. Categories appearing before
    any bold marker go into an "Other" group.
    """
    groups: list[ParsedGroup] = []
    current_group_name: str | None = None
    current_group_cats: list[ParsedSection] = []
    current_cat_name: str | None = None
    current_cat_body: list[SyntaxTreeNode] = []

    def flush_cat() -> None:
        nonlocal current_cat_name
        if current_cat_name is None:
            return
        current_group_cats.append(_build_section(current_cat_name, current_cat_body))
        current_cat_name = None

    def flush_group() -> None:
        nonlocal current_group_name, current_group_cats
        if current_group_cats:
            name = current_group_name or "Other"
            groups.append(ParsedGroup(
                name=name,
                slug=slugify(name),
                categories=list(current_group_cats),
            ))
        current_group_name = None
        current_group_cats = []

    for node in nodes:
        bold_name = _is_bold_marker(node)
        if bold_name is not None:
            flush_cat()
            flush_group()
            current_group_name = bold_name
            current_cat_body = []
        elif node.type == "heading" and node.tag == "h2":
            flush_cat()
            current_cat_name = _heading_text(node)
            current_cat_body = []
        elif current_cat_name is not None:
            current_cat_body.append(node)

    flush_cat()
    flush_group()
    return groups


_SPONSOR_SEP_RE = re.compile(r"^\s*[:\-\u2013\u2014]\s*")


def _find_link_deep(node: SyntaxTreeNode) -> SyntaxTreeNode | None:
    """Find the first link anywhere in the subtree (including nested in strong/em)."""
    for child in node.children:
        if child.type == "link":
            return child
        found = _find_link_deep(child)
        if found:
            return found
    return None


def _parse_sponsor_item(inline: SyntaxTreeNode) -> ParsedSponsor | None:
    """Parse `**[name](url)**: description` (or `[name](url) - description`)."""
    for split_idx, child in enumerate(inline.children):
        link = child if child.type == "link" else _find_link_deep(child)
        if link is None:
            continue
        desc_html = render_inline_html(inline.children[split_idx + 1 :])
        return ParsedSponsor(
            name=render_inline_text(link.children),
            url=_href(link),
            description=_SPONSOR_SEP_RE.sub("", desc_html),
        )
    return None


def parse_sponsors(text: str) -> list[ParsedSponsor]:
    """Parse the `# Sponsors` section of README.md into a list of sponsors.

    Expects bullets in the form `**[name](url)**: description`.
    Returns [] if no Sponsors section exists.
    """
    md = MarkdownIt("commonmark")
    tokens = md.parse(text)
    root = SyntaxTreeNode(tokens)
    children = root.children

    start_idx = None
    end_idx = len(children)
    for i, node in enumerate(children):
        if node.type == "heading" and node.tag == "h1":
            title = _heading_text(node).strip().lower()
            if start_idx is None and title == "sponsors":
                start_idx = i + 1
            elif start_idx is not None:
                end_idx = i
                break
    if start_idx is None:
        return []

    sponsors: list[ParsedSponsor] = []
    for node in children[start_idx:end_idx]:
        if node.type != "bullet_list":
            continue
        for list_item in node.children:
            if list_item.type != "list_item":
                continue
            inline = _find_inline(list_item)
            if inline is None:
                continue
            sponsor = _parse_sponsor_item(inline)
            if sponsor:
                sponsors.append(sponsor)
    return sponsors


def parse_readme(text: str) -> list[ParsedGroup]:
    """Parse README.md text into grouped categories.

    Returns a list of ParsedGroup dicts containing nested categories.
    Content between the thematic break (---) and # Resources or # Contributing
    is parsed as categories grouped by bold markers (**Group Name**).
    """
    md = MarkdownIt("commonmark")
    tokens = md.parse(text)
    root = SyntaxTreeNode(tokens)
    children = root.children

    # Find thematic break (---) and section boundaries in one pass
    hr_idx = None
    cat_end_idx = None
    for i, node in enumerate(children):
        if hr_idx is None and node.type == "hr":
            hr_idx = i
        elif node.type == "heading" and node.tag == "h1":
            text_content = _heading_text(node)
            if cat_end_idx is None and text_content in ("Resources", "Contributing"):
                cat_end_idx = i
    if hr_idx is None:
        return []

    cat_nodes = children[hr_idx + 1 : cat_end_idx or len(children)]
    return _parse_grouped_sections(cat_nodes)
