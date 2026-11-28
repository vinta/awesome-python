Decode bytes of unknown encoding with Charset Normalizer, and fix mis-decoded text with ftfy. RapidFuzz fuzzy-matches at scale; small jobs need only difflib.

How to choose:

- Bytes in an unknown encoding: Charset Normalizer
- Text already decoded with the wrong encoding (mojibake): ftfy
- Fuzzy matching across many strings, or with words in a different order: RapidFuzz
- Diffs, or close matches from a short list with no dependency: difflib
- Bytes that may not be text, identified by MIME type: chardet
- Translating an app, or formatting numbers and dates for a locale: Babel
- Syntax highlighting for source code: Pygments
- A grammar of your own: pyparsing to pull data from well-formatted text, parsy for a small language
- SQL: sqlparse to split and format it, SQLGlot to translate it between dialects
- Phone numbers: phonenumbers
- URL slugs: python-slugify, or Unidecode for plain ASCII text
- Short, URL-safe IDs: shortuuid

### Charset Normalizer

Pick Charset Normalizer to read bytes whose encoding you don't know. Requests depends on it, so it's often installed already. It [doesn't try to uncover the originating encoding](https://charset-normalizer.readthedocs.io/en/latest/): it finds the one that best suits the content. Pass your bytes to [`from_bytes()`](https://charset-normalizer.readthedocs.io/en/latest/user/getstarted.html), or a file to `from_path()`, and call `.best()` on the result for the most likely decoding.

### chardet

Pick chardet when some of your bytes may not be text and you want to know what they are. Besides the encoding, [every result carries a MIME type](https://chardet.readthedocs.io/en/latest/faq.html), so it can tell you a file is an image or an archive. Start with [`chardet.detect()`](https://chardet.readthedocs.io/en/latest/usage.html), which returns the encoding with a confidence score.

### ftfy

Use ftfy on text that was already decoded with the wrong encoding, like `âœ”` where `✔` belongs. It's [a mojibake detector and fixer, not an encoding detector](https://ftfy.readthedocs.io/en/latest/detect.html), so it takes a `str`, never bytes. Call [`ftfy.fix_text()`](https://ftfy.readthedocs.io/en/latest/explain.html), which applies every fix it can and returns the repaired text.

### RapidFuzz

Pick RapidFuzz to fuzzy-match strings in bulk, or when the same words can come in a different order. Scorers like [`token_sort_ratio()`](https://rapidfuzz.github.io/RapidFuzz/Usage/fuzz.html#rapidfuzz.fuzz.token_sort_ratio) sort the words before comparing. To match a string against a list, use [the `process` module](https://github.com/rapidfuzz/RapidFuzz#process), whose `extractOne()` returns the best match.

### difflib

Use difflib, in the standard library, for diffs and for small fuzzy-matching jobs that shouldn't add a dependency. [`unified_diff()`](https://docs.python.org/3/library/difflib.html#difflib.unified_diff) shows just the lines that changed plus a few lines of context. [`get_close_matches()`](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) returns the best "good enough" matches for a word from a list.

### Babel

Pick Babel to translate a Python app, or to format numbers and dates for each user's locale. It works with [gettext message catalogs and the CLDR locale data](https://babel.pocoo.org/en/latest/intro.html). Formatting functions like [`format_decimal()`](https://babel.pocoo.org/en/latest/numbers.html) take a locale argument. Translations go through [the `pybabel` command](https://babel.pocoo.org/en/latest/cmdline.html), which extracts your messages, keeps a catalog per language, and compiles it for your app.

### Pygments

Pick Pygments to syntax-highlight source code, for [code hosting, forums, wikis](https://pygments.org/), or any app that shows code. Pass your code, a lexer for its language, and a formatter to [`highlight()`](https://pygments.org/docs/quickstart/) to get HTML, and generate the matching CSS with `get_style_defs()`. Pygments [makes no guarantees on execution time](https://pygments.org/docs/security/), so on user input, run it in a process you stop after a short timeout.

### pyparsing

Pick pyparsing to pull data out of text in a known format, such as reports or command strings: its docs say to [use it on strings assumed to be well-formatted](https://pyparsing-docs.readthedocs.io/en/latest/HowToUsePyparsing.html). You build the grammar in Python code, and it [handles whitespace, quoted strings, and comments](https://github.com/pyparsing/pyparsing) for you. Name the parts you want, and [read them back by name](https://github.com/pyparsing/pyparsing/blob/master/pyparsing/ai/best_practices.md) from the results.

### parsy

Pick parsy to write a parser for a small language as readable code. It [excels at easy-to-read parsers for relatively small languages](https://parsy.readthedocs.io/en/latest/overview.html), with a minimal core and no built-in helpers for specific grammars. Its docs also say projects with demanding speed or error-message needs may have to look elsewhere. Start [from primitives like `regex()`](https://parsy.readthedocs.io/en/latest/tutorial.html), combine them into larger parsers, and call `.parse()` on your input.

### sqlparse

Pick sqlparse to split, format, or parse SQL without validating it. It [makes no assumptions about a particular SQL dialect](https://sqlparse.readthedocs.io/en/latest/), so vendor extensions and templated SQL parse too. Its [three main functions](https://sqlparse.readthedocs.io/en/latest/intro.html) are `split()`, `format()`, and `parse()`.

### SQLGlot

Pick SQLGlot to translate SQL between dialects, or to read and rewrite a query as an [expression tree](https://github.com/tobymao/sqlglot/blob/main/posts/ast_primer.md). Start with [`sqlglot.transpile()`](https://github.com/tobymao/sqlglot#formatting-and-transpiling), which takes your SQL with its `read` and `write` dialects. If you parse with `parse_one()`, [always pass the dialect when you know it](https://github.com/tobymao/sqlglot#faq), or valid SQL may fail to parse.

### phonenumbers

Pick phonenumbers to parse, validate, and format phone numbers. It's [a Python port of Google's libphonenumber](https://github.com/daviddrysdale/python-phonenumbers). Call `parse()` with the number and the country it's dialed from, check the result with `is_valid_number()`, and format it with `format_number()`, such as E.164.

### python-slugify

Pick python-slugify to turn a title into a URL slug: [`slugify("C'est déjà l'été.")`](https://github.com/un33k/python-slugify) returns `c-est-deja-l-ete`.

### Unidecode

Pick Unidecode to turn Unicode text into plain ASCII, for legacy code that can't handle Unicode or for machine identifiers that stay readable. [`unidecode('kožušček')`](https://github.com/avian2/unidecode) returns `kozuscek`. Unidecode is GPL, and for URL slugs, python-slugify is the pick.

### shortuuid

Pick shortuuid for short, non-sequential IDs that users see, like in URLs. It makes a UUID with the standard library's `uuid` module and [translates it to base57](https://github.com/skorokithakis/shortuuid), leaving out look-alike characters such as l, 1, I, O, and 0. Call `shortuuid.uuid()` for a new ID.

### Declared encodings first

Before you hand bytes to Charset Normalizer or chardet, decode them with the encoding they declare. Charset Normalizer's FAQ says to [use the detector as a last resort](https://charset-normalizer.readthedocs.io/en/latest/community/faq.html), when you're left with no clue.
