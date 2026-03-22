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


def render_inline_html(children: list[SyntaxTreeNode]) -> str:
    """Render inline AST nodes to HTML with proper escaping."""
    parts: list[str] = []
    for child in children:
        match child.type:
            case "text":
                parts.append(str(escape(child.content)))
            case "softbreak":
                parts.append(" ")
            case "link":
                href = str(escape(child.attrGet("href") or ""))
                inner = render_inline_html(child.children)
                parts.append(
                    f'<a href="{href}" target="_blank" rel="noopener">{inner}</a>'
                )
            case "em":
                parts.append(f"<em>{render_inline_html(child.children)}</em>")
            case "strong":
                parts.append(f"<strong>{render_inline_html(child.children)}</strong>")
            case "code_inline":
                parts.append(f"<code>{escape(child.content)}</code>")
            case "html_inline":
                parts.append(str(escape(child.content)))
    return "".join(parts)


def render_inline_text(children: list[SyntaxTreeNode]) -> str:
    """Render inline AST nodes to plain text (links become their text)."""
    parts: list[str] = []
    for child in children:
        match child.type:
            case "text":
                parts.append(child.content)
            case "softbreak":
                parts.append(" ")
            case "code_inline":
                parts.append(child.content)
            case "em" | "strong" | "link":
                parts.append(render_inline_text(child.children))
    return "".join(parts)


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


def _find_inline(node: SyntaxTreeNode) -> SyntaxTreeNode | None:
    """Find the inline node in a list_item's paragraph."""
    para = _find_child(node, "paragraph")
    if para is None:
        return None
    return _find_child(para, "inline")


def _find_first_link(inline: SyntaxTreeNode) -> SyntaxTreeNode | None:
    """Find the first link node among inline children."""
    for child in inline.children:
        if child.type == "link":
            return child
    return None


def _is_leading_link(inline: SyntaxTreeNode, link: SyntaxTreeNode) -> bool:
    """Check if the link is the first child of inline (a real entry, not a subcategory label)."""
    return bool(inline.children) and inline.children[0] is link


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

        first_link = _find_first_link(inline)

        if first_link is None or not _is_leading_link(inline, first_link):
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
        url = first_link.attrGet("href") or ""
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
                    sub_link = _find_first_link(sub_inline)
                    if sub_link:
                        also_see.append(AlsoSee(
                            name=render_inline_text(sub_link.children),
                            url=sub_link.attrGet("href") or "",
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
        if not current_group_cats:
            current_group_name = None
            current_group_cats = []
            return
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
