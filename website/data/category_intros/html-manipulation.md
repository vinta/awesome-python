For scraping, start with Beautiful Soup as your Python HTML library, on lxml's parser. Use plain lxml when speed matters or CSS selectors do the whole job.

How to choose:

- Pulling data out of scraped pages: Beautiful Soup, on lxml's parser
- Fast parsing, or CSS selectors alone: lxml
- XML with XPath, XSLT, or exact fidelity: lxml
- Simple XML you'd rather handle as dicts: xmltodict
- Escaping untrusted text into HTML or XML: MarkupSafe
- Cleaning HTML your users submit before showing it on a page: JustHTML

### Beautiful Soup

Pick Beautiful Soup for quick projects that pull data out of scraped pages. It's [a library for pulling data out of HTML and XML files](https://www.crummy.com/software/BeautifulSoup/bs4/doc/), and it runs on top of a parser of your choice. Install lxml next to it, as its docs advise: ["If you can, I recommend you install and use lxml for speed."](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-a-parser) Then name that parser in the constructor, `BeautifulSoup(html, "lxml")`. On a malformed page, [different parsers will give different results](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#differences-between-parsers), so naming one makes your script more likely to parse the same way on every machine. [The quick start](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start) walks through the common moves, like collecting every link on a page with `find_all("a")`.

### lxml

Pick lxml when speed matters, or when you work with XML. Beautiful Soup's own docs say to ["forget about Beautiful Soup and work directly atop lxml"](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#improving-performance) when computer time is worth more than programmer time. They also say to skip Beautiful Soup when CSS selectors are all you need. lxml is [a Pythonic binding for the C libraries libxml2 and libxslt](https://lxml.de/), and it parses both XML and broken HTML. For web pages, use `lxml.html`, which adds [an Element API for HTML elements and utilities for common HTML tasks](https://lxml.de/lxmlhtml.html). For XML, it [supports XPath and XSLT](https://lxml.de/xpathxslt.html) through those same C libraries.

### xmltodict

Pick xmltodict when you'd rather handle a simple XML document as plain dicts. It [makes working with XML feel like working with JSON](https://github.com/martinblech/xmltodict): `xmltodict.parse()` gives you nested dicts, and `unparse()` [turns them back into XML](https://github.com/martinblech/xmltodict#roundtripping). It aims to cover [the common 90% of cases](https://github.com/martinblech/xmltodict#api-reference) but drops some XML details, like attribute order. For exact fidelity, its README sends you to lxml.

### MarkupSafe

Pick MarkupSafe to put untrusted strings into HTML or XML you build in code. It [escapes characters so text is safe to use in HTML and XML](https://markupsafe.palletsprojects.com/en/stable/), so tags in a user's text show up as characters instead of becoming markup. Jinja installs it and [relies on it to escape untrusted input](https://jinja.palletsprojects.com/en/stable/intro/#dependencies) when rendering templates. Call `escape()` on the user's text: it returns a `Markup` object, and any text you combine with that object gets escaped too. Don't pass user text to `Markup()` itself, which [marks it safe without escaping](https://markupsafe.palletsprojects.com/en/stable/escaping/).

### JustHTML

Pick JustHTML to clean the HTML your users submit before it goes back on a page, like a comment or a bio. It's a pure-Python HTML5 parser, and `JustHTML(html)` [sanitizes input by default against a strict allowlist](https://emilstenstrom.github.io/justhtml/sanitization.html), so you don't need a separate sanitizing library. From there, `query()` finds elements with CSS selectors and `to_html()` writes the cleaned result. When your project is built around XPath or XML-style processing, its comparison page [points you to lxml](https://emilstenstrom.github.io/justhtml/comparison.html#when-to-choose-another-tool).

### Parsing untrusted XML

XML from outside your system can make a parser fetch remote resources or expand entities. Lock both XML picks down before you parse it. lxml's FAQ says to [make sure network access and external DTD loading aren't enabled](https://lxml.de/FAQ.html#how-do-i-use-lxml-safely-as-a-web-service-endpoint) for untrusted content, parse with `resolve_entities=False`, and reject any document that still has entity references. In xmltodict, don't turn off `disable_entities=True`, which [disables entity parsing for security](https://github.com/martinblech/xmltodict#xmltodictparse).
