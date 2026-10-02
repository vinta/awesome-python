Mojibake like "cafÃ©" is ftfy's to fix, and charset-normalizer detects encodings. For fuzzy matching, add RapidFuzz to your Python text processing libraries.

How to choose:

- Text decoded with the wrong encoding: ftfy
- Bytes in an unknown encoding: charset-normalizer
- Fuzzy matching against a long list of strings: RapidFuzz
- Diffs, or close matches with nothing to install: difflib
- ASCII-art banners: pyfiglet
- Translations, plus dates and numbers in each user's locale: Babel
- Syntax highlighting: Pygments
- A grammar written in Python code: pyparsing, or parsy for small languages
- Splitting and formatting SQL: sqlparse
- Phone numbers: phonenumbers
- URL slugs: python-slugify, or Unidecode for plain ASCII
- Short IDs that users will read: shortuuid

ftfy [fixes Unicode that's broken in various ways](https://ftfy.readthedocs.io/en/latest/): bad Unicode goes in, good Unicode comes out. It's [a mojibake detector and fixer, not an encoding detector](https://ftfy.readthedocs.io/en/latest/detect.html#is-ftfy-an-encoding-detector), so give it text you've already tried to decode, never bytes. The function you'll call most is [`ftfy.fix_text()`](https://ftfy.readthedocs.io/en/latest/explain.html), which applies every fix it can. ftfy aims never to change text that was decoded correctly.

charset-normalizer [reads text from an unknown charset encoding](https://github.com/jawah/charset_normalizer). Call `from_bytes(data).best()`, or `from_path(path).best()` for a file, and [`str()` of the result is your decoded text](https://charset-normalizer.readthedocs.io/en/latest/user/getstarted.html). chardet does the job differently: charset-normalizer decodes candidate encodings and scores the text, while chardet [scores raw bytes against per-language models](https://chardet.readthedocs.io/en/latest/faq.html#how-is-chardet-different-from-charset-normalizer).

RapidFuzz [does fuzzy string matching with various string metrics](https://rapidfuzz.github.io/RapidFuzz/), mostly in C++, with a pure Python fallback for every algorithm. To compare one string against a list, [use the `process` module](https://github.com/rapidfuzz/RapidFuzz#process), like `process.extractOne()`.

difflib comes with Python and [compares sequences](https://docs.python.org/3/library/difflib.html), mostly lines of text, producing unified, context, and HTML diffs like the ones `diff` and `git diff` print. For a "did you mean" suggestion, [`get_close_matches()`](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) returns the best "good enough" matches for a word.

pyfiglet is [a full port of FIGlet into pure Python](https://github.com/pwaller/pyfiglet): it renders text in ASCII-art fonts, as in `pyfiglet.figlet_format("text", font="slant")`.

Babel [does two jobs](https://babel.pocoo.org/en/latest/intro.html): it builds gettext message catalogs without the GNU gettext tools for common tasks, and it formats dates, numbers, and locale names from CLDR data. Run catalogs through the `pybabel` command: [`extract` messages, `init` a catalog per language, `update` it, and `compile` it](https://babel.pocoo.org/en/latest/cmdline.html).

Pygments is [a generic syntax highlighter](https://github.com/pygments/pygments) for code hosting, forums, wikis, and other apps that show source code. If you highlight code your users submit, its docs recommend you [stop the Pygments process after a short timeout](https://pygments.org/docs/security/#security-considerations).

pyparsing [builds a grammar directly in Python code](https://github.com/pyparsing/pyparsing) from a library of classes, instead of lex/yacc or regular expressions. It handles whitespace, quoted strings, and embedded comments for you. Its best practices start with [writing a BNF](https://github.com/pyparsing/pyparsing/wiki/Best-Practices) before any code. [Use results names](https://pyparsing-docs.readthedocs.io/en/latest/HowToUsePyparsing.html#usage-notes) to get tokens by field name rather than by position. parsy [combines small parsers into larger ones](https://github.com/python-parsy/parsy) and gives you building blocks only. Its docs say it [excels at easy-to-read parsers for relatively small languages](https://parsy.readthedocs.io/en/latest/overview.html#other-python-projects).

sqlparse is [a non-validating SQL parser](https://github.com/andialbrecht/sqlparse): it splits scripts into statements, formats them, and walks their token tree, whatever the dialect. Its [three module-level functions](https://github.com/andialbrecht/sqlparse#usage), `split()`, `format()`, and `parse()`, cover most needs.

phonenumbers is [a Python port of Google's libphonenumber](https://github.com/daviddrysdale/python-phonenumbers). Parse a number together with [the country it's dialed from](https://github.com/daviddrysdale/python-phonenumbers#example-usage), unless it's in E.164 format. Then check it with `is_possible_number()` or `is_valid_number()`, and print it with `format_number()`.

python-slugify [makes Unicode-aware slugs](https://github.com/un33k/python-slugify) with your choice of transliteration backend: by default, Unidecode if it's installed, otherwise text-unidecode. Its own code is MIT, while [Unidecode is GPL](https://github.com/un33k/python-slugify#licensing), so check that license before you install Unidecode next to it.

Unidecode makes [lossy ASCII transliterations of Unicode text](https://github.com/avian2/unidecode), close to what someone on a US keyboard would type. Use it for ASCII machine identifiers. Its README says it's best kept off strings your users see.

shortuuid [generates concise, unambiguous, URL-safe UUIDs](https://github.com/skorokithakis/shortuuid) for IDs users will see: it takes UUIDs from Python's `uuid` module, writes them in base57, and drops look-alike characters such as l, 1, I, O, and 0. Call `shortuuid.uuid()` for a new ID.

Decode with the encoding you were told whenever there is one. charset-normalizer's FAQ calls detection [a last resort](https://charset-normalizer.readthedocs.io/en/latest/community/faq.html#should-i-bother-using-detection), and ftfy's docs say to [assume UTF-8](https://ftfy.readthedocs.io/en/latest/avoid.html#assume-utf-8) unless you have a specific reason to believe otherwise.
