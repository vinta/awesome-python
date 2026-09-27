Need a Python text processing library? charset-normalizer reads text in unknown encodings, RapidFuzz does fuzzy matching, and pyparsing builds parsers.

How to choose:

- Bytes in an unknown encoding: charset-normalizer
- Fuzzy matching against many strings: RapidFuzz
- Parsers for your own grammar: pyparsing, or parsy for small languages
- Text garbled by a wrong decode (mojibake): ftfy
- Diffs, or close matches without a dependency: difflib
- ASCII-art banners: pyfiglet
- Translations, plus localized dates and numbers: Babel
- Syntax highlighting: Pygments
- Splitting and formatting SQL: sqlparse
- Phone numbers: phonenumbers
- URL slugs: python-slugify, or Unidecode for ASCII transliteration alone
- Short public IDs: shortuuid, or Sqids to encode integer IDs

Decode with the encoding you know before you guess one. ftfy's docs say to [assume UTF-8](https://ftfy.readthedocs.io/en/latest/avoid.html#assume-utf-8) until proven otherwise, and charset-normalizer's FAQ calls detection [the last resort](https://charset-normalizer.readthedocs.io/en/latest/community/faq.html#should-i-bother-using-detection). For bytes you have no clue about, charset-normalizer is the detector [requests installs](https://github.com/psf/requests/blob/main/pyproject.toml). Call `from_bytes()` or `from_path()`, then `.best()` to [get the most probable result](https://charset-normalizer.readthedocs.io/en/latest/user/advanced_search.html). Its `detect()` is [backward compatible with chardet's](https://charset-normalizer.readthedocs.io/en/latest/user/getstarted.html), so switching is one import. If you stay on chardet, read large files and streams with [`UniversalDetector`](https://chardet.readthedocs.io/en/latest/usage.html).

ftfy fixes text that was already decoded wrong, and it [doesn't take bytes](https://ftfy.readthedocs.io/en/latest/detect.html), so it's no replacement for a detector. Call `ftfy.fix_text()`, [the function you'll use most](https://ftfy.readthedocs.io/en/latest/explain.html#ftfy.fix_text). Every fix is on by default, so [check which ones fit your text](https://ftfy.readthedocs.io/en/latest/config.html).

RapidFuzz is a fast string matching library with a C++ core. To compare one string with a list, use the process module's `process.extractOne()` or `process.cdist()`, which is [faster than calling the scorers yourself](https://github.com/rapidfuzz/RapidFuzz). It doesn't lowercase or strip punctuation for you: pass `processor=utils.default_process` when case and punctuation shouldn't count.

difflib ships with Python, so it works where you can't add a dependency. `get_close_matches()` returns the [good enough matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) for a word, and its diffs come out in unified, context, or HTML format.

pyparsing lets you [build the grammar in Python code](https://github.com/pyparsing/pyparsing) instead of regular expressions. Since a grammar can accept invalid input, its docs say to use it on [input you assume is well-formatted](https://pyparsing-docs.readthedocs.io/en/latest/HowToUsePyparsing.html#usage-notes). Its [best practices](https://github.com/pyparsing/pyparsing/blob/master/pyparsing/ai/best_practices.md) say to write the grammar out in BNF first. When the grammar is recursive, call `enable_packrat()` right after the import, and give results names to the fields you read back.

parsy combines small parsers into bigger ones. Its docs say it [excels at small languages](https://parsy.readthedocs.io/en/latest/overview.html) and is easy to read, but to look elsewhere when you need speed or good error messages. For more complex parsers, the [`@generate` decorator](https://parsy.readthedocs.io/en/latest/ref/generating.html) is both more readable and more powerful.

Babel does two jobs: gettext message catalogs, and [CLDR locale data](https://babel.pocoo.org/en/latest/intro.html) for localized dates, numbers, and names. Run the catalog steps with the `pybabel` command: [extract, init, update, and compile](https://babel.pocoo.org/en/latest/cmdline.html). Keep times in UTC, and [convert to the user's time zone](https://babel.pocoo.org/en/latest/dates.html#time-zone-support) only for input and display.

Pygments turns code into HTML, LaTeX, ANSI, and more, as a command-line tool or a library. For HTML, it writes CSS classes instead of inline styles, so [generate the stylesheet](https://pygments.org/docs/quickstart/#example) with `HtmlFormatter().get_style_defs()`. Pick the lexer by name or file name, and [guess it](https://pygments.org/docs/quickstart/#guessing-lexers) only when you don't know the language. Pygments [doesn't guarantee how long it runs](https://pygments.org/docs/security/), so on user input, run it with a short timeout and cap how many run at once.

sqlparse is a [non-validating SQL parser](https://sqlparse.readthedocs.io/en/latest/): it splits scripts into statements, formats them, and walks their tokens, without assuming a SQL dialect. Use `split()`, `format()`, and `parse()`. On SQL from untrusted sources, [keep its grouping limits](https://sqlparse.readthedocs.io/en/latest/api.html#security-and-performance-considerations) as they are.

phonenumbers is a Python port of Google's libphonenumber. Pass `parse()` the region the number was dialed from, unless it's in E.164 format. Then [check it's possible and valid](https://github.com/daviddrysdale/python-phonenumbers) with `is_possible_number()` and `is_valid_number()`.

python-slugify makes URL slugs, and Unidecode turns Unicode text into ASCII. Their licenses differ. [Unidecode is GPL](https://github.com/avian2/unidecode). python-slugify's own code is MIT, and by default it runs on text-unidecode, which offers the Artistic license or GPL. But python-slugify [switches to Unidecode](https://github.com/un33k/python-slugify) whenever it's installed.

shortuuid turns UUIDs into [short IDs for users to see](https://github.com/skorokithakis/shortuuid), and leaves out look-alike characters like l, 1, I, O, and 0. Sqids turns database keys and other integers into short IDs. Anyone can [decode them back into numbers](https://sqids.org/faq#not-recommended), so keep them away from sensitive data and user IDs. To check an ID is the canonical one, [re-encode the decoded numbers](https://sqids.org/faq#valid-ids) and compare.

Store what these libraries generate, or pin their versions, since slugs and IDs can change between releases. python-slugify says to [pin the package and its backend](https://github.com/un33k/python-slugify), and Unidecode says to [store each slug once or lock the version](https://github.com/avian2/unidecode). Sqids says to [pass your own blocklist](https://sqids.org/faq#future-blocklist), even one identical to the default.
