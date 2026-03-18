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


class ParsedSection(TypedDict):
    name: str
    slug: str
    description: str  # plain text, links resolved to text
    entries: list[ParsedEntry]
    entry_count: int
    preview: str
    content_html: str  # rendered HTML, properly escaped


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


def _parse_list_entries(bullet_list: SyntaxTreeNode) -> list[ParsedEntry]:
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
            # Subcategory label (plain text or text-before-link) — recurse into nested list
            nested = _find_child(list_item, "bullet_list")
            if nested:
                entries.extend(_parse_list_entries(nested))
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
        ))

    return entries


def _parse_section_entries(content_nodes: list[SyntaxTreeNode]) -> list[ParsedEntry]:
    """Extract all entries from a section's content nodes."""
    entries: list[ParsedEntry] = []
    for node in content_nodes:
        if node.type == "bullet_list":
            entries.extend(_parse_list_entries(node))
    return entries


# --- Content HTML rendering --------------------------------------------------


def _render_bullet_list_html(
    bullet_list: SyntaxTreeNode,
    *,
    is_sub: bool = False,
) -> str:
    """Render a bullet_list node to HTML with entry/entry-sub/subcat classes."""
    out: list[str] = []

    for list_item in bullet_list.children:
        if list_item.type != "list_item":
            continue

        inline = _find_inline(list_item)
        if inline is None:
            continue

        first_link = _find_first_link(inline)

        if first_link is None or not _is_leading_link(inline, first_link):
            # Subcategory label (plain text or text-before-link)
            label = str(escape(render_inline_text(inline.children)))
            out.append(f'<div class="subcat">{label}</div>')
            nested = _find_child(list_item, "bullet_list")
            if nested:
                out.append(_render_bullet_list_html(nested, is_sub=False))
            continue

        # Entry with a link
        name = str(escape(render_inline_text(first_link.children)))
        url = str(escape(first_link.attrGet("href") or ""))

        if is_sub:
            out.append(f'<div class="entry-sub"><a href="{url}">{name}</a></div>')
        else:
            desc = _extract_description_html(inline, first_link)
            if desc:
                out.append(
                    f'<div class="entry"><a href="{url}">{name}</a>'
                    f'<span class="sep">&mdash;</span>{desc}</div>'
                )
            else:
                out.append(f'<div class="entry"><a href="{url}">{name}</a></div>')

        # Nested items under an entry with a link are sub-entries
        nested = _find_child(list_item, "bullet_list")
        if nested:
            out.append(_render_bullet_list_html(nested, is_sub=True))

    return "\n".join(out)


def _render_section_html(content_nodes: list[SyntaxTreeNode]) -> str:
    """Render a section's content nodes to HTML."""
    parts: list[str] = []
    for node in content_nodes:
        if node.type == "bullet_list":
            parts.append(_render_bullet_list_html(node))
    return "\n".join(parts)


# --- Section splitting -------------------------------------------------------


def _group_by_h2(
    nodes: list[SyntaxTreeNode],
) -> list[ParsedSection]:
    """Group AST nodes into sections by h2 headings."""
    sections: list[ParsedSection] = []
    current_name: str | None = None
    current_body: list[SyntaxTreeNode] = []

    def flush() -> None:
        nonlocal current_name
        if current_name is None:
            return
        desc = _extract_description(current_body)
        content_nodes = current_body[1:] if desc else current_body
        entries = _parse_section_entries(content_nodes)
        entry_count = len(entries) + sum(len(e["also_see"]) for e in entries)
        preview = ", ".join(e["name"] for e in entries[:4])
        content_html = _render_section_html(content_nodes)

        sections.append(ParsedSection(
            name=current_name,
            slug=slugify(current_name),
            description=desc,
            entries=entries,
            entry_count=entry_count,
            preview=preview,
            content_html=content_html,
        ))
        current_name = None

    for node in nodes:
        if node.type == "heading" and node.tag == "h2":
            flush()
            current_name = _heading_text(node)
            current_body = []
        elif current_name is not None:
            current_body.append(node)

    flush()
    return sections


def parse_readme(text: str) -> tuple[list[ParsedSection], list[ParsedSection]]:
    """Parse README.md text into categories and resources.

    Returns (categories, resources) where each is a list of ParsedSection dicts.
    """
    md = MarkdownIt("commonmark")
    tokens = md.parse(text)
    root = SyntaxTreeNode(tokens)
    children = root.children

    # Find thematic break (---), # Resources, and # Contributing in one pass
    hr_idx = None
    resources_idx = None
    contributing_idx = None
    for i, node in enumerate(children):
        if hr_idx is None and node.type == "hr":
            hr_idx = i
        elif node.type == "heading" and node.tag == "h1":
            text_content = _heading_text(node)
            if text_content == "Resources":
                resources_idx = i
            elif text_content == "Contributing":
                contributing_idx = i
    if hr_idx is None:
        return [], []

    # Slice into category and resource ranges
    cat_end = resources_idx or contributing_idx or len(children)
    cat_nodes = children[hr_idx + 1 : cat_end]

    res_nodes: list[SyntaxTreeNode] = []
    if resources_idx is not None:
        res_end = contributing_idx or len(children)
        res_nodes = children[resources_idx + 1 : res_end]

    categories = _group_by_h2(cat_nodes)
    resources = _group_by_h2(res_nodes)

    return categories, resources
