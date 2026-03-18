"""Parse README.md into structured section data using markdown-it-py AST."""

from __future__ import annotations

import re
from typing import TypedDict

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
