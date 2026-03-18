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
    content: str  # raw markdown (backward compat)
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


def _has_description(nodes: list[SyntaxTreeNode]) -> bool:
    """Check if the first node is a description paragraph (_italic text_)."""
    if not nodes:
        return False
    first = nodes[0]
    if first.type != "paragraph":
        return False
    for child in first.children:
        if child.type == "inline" and len(child.children) == 1:
            if child.children[0].type == "em":
                return True
    return False


def _nodes_to_raw_markdown(nodes: list[SyntaxTreeNode], source_lines: list[str]) -> str:
    """Extract raw markdown text for AST nodes using source line mappings."""
    if not nodes:
        return ""
    start_line = None
    end_line = None
    for node in nodes:
        node_map = node.map
        if node_map is not None:
            if start_line is None or node_map[0] < start_line:
                start_line = node_map[0]
            if end_line is None or node_map[1] > end_line:
                end_line = node_map[1]
    if start_line is None:
        return ""
    return "\n".join(source_lines[start_line:end_line]).strip()


# --- Stubs for Tasks 3 & 4 (replace in later tasks) -------------------------


def _parse_section_entries(content_nodes: list[SyntaxTreeNode]) -> list[ParsedEntry]:
    return []


def _render_section_html(content_nodes: list[SyntaxTreeNode]) -> str:
    return ""


# --- Section splitting -------------------------------------------------------


def _group_by_h2(
    nodes: list[SyntaxTreeNode],
    source_lines: list[str],
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
        content_nodes = current_body[1:] if _has_description(current_body) else current_body
        content = _nodes_to_raw_markdown(content_nodes, source_lines)
        entries = _parse_section_entries(content_nodes)
        entry_count = len(entries) + sum(len(e["also_see"]) for e in entries)
        preview = ", ".join(e["name"] for e in entries[:4])
        content_html = _render_section_html(content_nodes)

        sections.append(ParsedSection(
            name=current_name,
            slug=slugify(current_name),
            description=desc,
            content=content,
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
    source_lines = text.split("\n")
    children = root.children

    # Find thematic break (---)
    hr_idx = None
    for i, node in enumerate(children):
        if node.type == "hr":
            hr_idx = i
            break
    if hr_idx is None:
        return [], []

    # Find # Resources and # Contributing boundaries
    resources_idx = None
    contributing_idx = None
    for i, node in enumerate(children):
        if node.type == "heading" and node.tag == "h1":
            text_content = _heading_text(node)
            if text_content == "Resources":
                resources_idx = i
            elif text_content == "Contributing":
                contributing_idx = i

    # Slice into category and resource ranges
    cat_end = resources_idx or contributing_idx or len(children)
    cat_nodes = children[hr_idx + 1 : cat_end]

    res_nodes: list[SyntaxTreeNode] = []
    if resources_idx is not None:
        res_end = contributing_idx or len(children)
        res_nodes = children[resources_idx + 1 : res_end]

    categories = _group_by_h2(cat_nodes, source_lines)
    resources = _group_by_h2(res_nodes, source_lines)

    return categories, resources
