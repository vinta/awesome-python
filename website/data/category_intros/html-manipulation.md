Scraped HTML, however broken, parses in Beautiful Soup on lxml's parser. JustHTML packs a sanitizer into a Python HTML library and runs it by default.

How to choose:

- Pulling data out of scraped pages: Beautiful Soup, on lxml's parser
- Speed, XPath, or XML documents: lxml
- Sanitizing HTML your users submit: JustHTML
- XML you'd rather handle like JSON: xmltodict
- Escaping text you put into HTML: MarkupSafe

Beautiful Soup is for [pulling data out of HTML and XML files](https://www.crummy.com/software/BeautifulSoup/bs4/doc/). It sits on a parser you pick and gives you one way to navigate, search, and change the tree. Its docs [recommend lxml as that parser](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-a-parser) for speed. Name the parser in the constructor, as in `BeautifulSoup(markup, "lxml")`. [Different parsers build different trees](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#differences-between-parsers) from the same broken page, and your script should parse it the same way on every machine. The docs also say when to skip Beautiful Soup: [work directly atop lxml](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#improving-performance) when computer time costs more than programmer time, and [parse with lxml](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors-through-the-css-property) when CSS selectors are all you need.

lxml is [a Pythonic binding for libxml2 and libxslt](https://lxml.de/): the speed and XML features of those C libraries, with an API mostly compatible with ElementTree's. For HTML, use [lxml.html](https://lxml.de/lxmlhtml.html), which adds HTML-specific methods to lxml's elements, and every element takes `.xpath()`. On broken pages, lxml's docs say you often need only [Beautiful Soup's encoding detection](https://lxml.de/lxmlhtml.html#really-broken-pages). Leave the rest to lxml's own parser, which is several times faster. XPath has the same injection problem as SQL. When a value comes from outside, [pass it as an XPath variable](https://lxml.de/FAQ.html#how-do-i-use-lxml-safely-as-a-web-service-endpoint) instead of formatting it into the expression.

JustHTML [parses HTML like a browser](https://github.com/EmilStenstrom/justhtml), including broken markup. `JustHTML(html)` [sanitizes by default](https://emilstenstrom.github.io/justhtml/sanitization.html) against a strict allowlist. The output is safe in a page body, but [not automatically safe inside a `<script>` tag or an attribute](https://emilstenstrom.github.io/justhtml/sanitization.html#important-context-is-king); JustHTML has separate escaping helpers for those. It's pure Python, with no C extension to install. For terabytes of trusted HTML, its README says to use a C or Rust parser like lxml.

xmltodict [makes working with XML feel like working with JSON](https://github.com/martinblech/xmltodict): `parse()` turns a document into dicts, and `unparse()` turns dicts back into XML. It covers the common 90% of cases and doesn't keep every XML detail, like attribute order. For exact fidelity, its README says to use lxml.

MarkupSafe [escapes characters so text is safe to use in HTML and XML](https://markupsafe.palletsprojects.com/en/latest/). `escape()` returns a `Markup` string, and any text you join to it gets escaped too. To build HTML, [use `Markup` as the format string](https://markupsafe.palletsprojects.com/en/latest/formatting/): the values you format into it are escaped first. Passing text to `Markup()` itself [marks it safe without escaping](https://markupsafe.palletsprojects.com/en/latest/escaping/#markupsafe.Markup), so save that for markup you trust.

Escape user text with MarkupSafe, and sanitize user HTML you want to keep with JustHTML. For XML you didn't write, lxml's FAQ says to [keep network access and external DTDs off](https://lxml.de/FAQ.html#how-do-i-use-lxml-safely-as-a-web-service-endpoint) and parse with `resolve_entities=False`, then reject any document that still holds entity references. With xmltodict, pass `disable_entities=True`.
