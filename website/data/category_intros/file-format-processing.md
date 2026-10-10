PDFs you merge, split, or encrypt need only pypdf. Which Python file format library you need beyond that depends on whether you read a file or create it.

How to choose:

- Merging, splitting, cropping, or encrypting PDFs: pypdf
- ELF binaries and DWARF debug info: pyelftools
- A table you import or export as CSV, JSON, YAML, or Excel: Tablib
- Documents turned into Markdown for an LLM: MarkItDown, or Docling for complex layouts and scans
- Excel: openpyxl to edit a workbook, XlsxWriter to create one with charts and formatting
- Word documents: python-docx
- PowerPoint decks: python-pptx
- Text and images out of PDFs, or pages rendered as images: PyMuPDF, or pdfminer.six for each character's position and font
- PDFs drawn from Python code: ReportLab
- PDFs from HTML and CSS: WeasyPrint
- Markdown to HTML: markdown-it-py for CommonMark, Python-Markdown for its extensions, Mistune for speed
- Config files: tomllib for TOML, PyYAML for YAML

pypdf is a [pure-Python PDF library](https://pypdf.readthedocs.io/en/stable/) for splitting, merging, cropping, and transforming pages, and it adds passwords too. To merge files, [`append()` each one to a `PdfWriter`](https://pypdf.readthedocs.io/en/stable/user/merging-pdfs.html) and write it out. With [no C dependency](https://pypdf.readthedocs.io/en/stable/meta/comparisons.html), it's easy to install, but it doesn't generate new PDFs. It reads text with `page.extract_text()`, while a scanned page needs [OCR software](https://pypdf.readthedocs.io/en/stable/user/extract-text.html).

pyelftools [parses ELF files and DWARF debug info](https://github.com/eliben/pyelftools) in pure Python. Pass an open file to [`ELFFile`](https://github.com/eliben/pyelftools/blob/main/doc/user-guide.md), its main entry point, and stay on the high-level API: its guide says to use the low-level structs at your own peril.

Tablib is a [format-agnostic tabular dataset library](https://tablib.readthedocs.io/en/stable/). `Dataset().load(fh)` [detects the format of the file](https://tablib.readthedocs.io/en/stable/tutorial.html) you load, and `export()` writes the same data as CSV, JSON, or another format.

MarkItDown converts PDF, Word, Excel, PowerPoint, HTML, and more into Markdown [for LLMs and text analysis](https://github.com/microsoft/markitdown). Its README says it may not be the best option for high-fidelity conversions that people read. Don't pass untrusted input straight to it, and when you only read local files, [call `convert_local()` instead of `convert()`](https://github.com/microsoft/markitdown#security-considerations), which also fetches URLs.

Docling is for documents where layout matters: it [understands page layout, reading order, and tables, and runs OCR](https://docling-project.github.io/docling/) on scanned PDFs. It converts each file into a `DoclingDocument`, which you export to Markdown.

openpyxl reads and writes Excel workbooks, so it's the one to use when the file already exists. Install defusedxml when you open spreadsheets from other people, since openpyxl [doesn't guard against XML attacks](https://openpyxl.readthedocs.io/en/stable/#security) by default.

XlsxWriter [can't read or modify existing files](https://xlsxwriter.readthedocs.io/introduction.html). In return, it supports more Excel features than the alternatives, and its files are close to what Excel itself writes.

python-docx works on `.docx` files, not the older `.doc`. [Start from a document that holds your styles](https://python-docx.readthedocs.io/en/latest/user/documents.html), headers, and footers, and open it with `Document('template.docx')`: python-docx can only use a style that [the starting document defines](https://python-docx.readthedocs.io/en/latest/user/styles-understanding.html).

python-pptx [creates and updates PowerPoint files](https://python-pptx.readthedocs.io/en/latest/user/intro.html). A deck's look comes from its theme, slide master, and layouts, so [open a template deck](https://python-pptx.readthedocs.io/en/latest/user/presentations.html) with `Presentation('template.pptx')`. Add slides from its layouts and fill their [placeholders](https://python-pptx.readthedocs.io/en/latest/user/placeholders-understanding.html), which carry the template's formatting.

PyMuPDF is a [high-performance library](https://pymupdf.readthedocs.io/en/latest/) for extracting, converting, and editing PDFs and other documents, built on MuPDF, and it also renders pages to images. It's [available under the AGPL or a commercial license](https://pymupdf.readthedocs.io/en/latest/about.html#license-and-copyright). For reading text and editing pages without that condition, use pypdf or pdfminer.six.

ReportLab [creates PDFs directly from Python](https://docs.reportlab.com/reportlab/userguide/ch1_intro/), like reports generated on a web server, with charts and tables. Lay out documents with Platypus: [create a document from a `DocTemplate` class and pass a list of flowables](https://docs.reportlab.com/reportlab/userguide/ch5_platypus/), such as paragraphs and tables, to its `build()` method.

pdfminer.six [extracts text from a PDF's source](https://github.com/pdfminer/pdfminer.six), with the exact location, font, and color of each piece, but it can't write PDFs. The simplest start is [`extract_text()`](https://pdfminersix.readthedocs.io/en/latest/tutorial/highlevel.html).

WeasyPrint turns HTML and CSS into PDFs, like [reports, invoices, and tickets](https://doc.courtbouillon.org/weasyprint/stable/), with a layout engine built for pagination instead of a browser engine. It runs [no JavaScript](https://doc.courtbouillon.org/weasyprint/stable/going_further.html). Call `HTML(...).write_pdf()`. If users supply the HTML or CSS, its docs say you'll need [extra configuration](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#security) against high memory use, endless renderings, and local file leaks.

markdown-it-py [follows the CommonMark spec](https://markdown-it-py.readthedocs.io/en/latest/), and plugins add syntax or replace existing rules.

Python-Markdown implements John Gruber's original Markdown. It's [not a CommonMark implementation](https://python-markdown.github.io/), and its docs say to look elsewhere if you want one. Pick it for its extension API and bundled [extensions](https://python-markdown.github.io/extensions/), like tables, fenced code blocks, and a table of contents.

Mistune is a [fast parser with renderers and plugins](https://mistune.lepture.com/en/latest/), compatible with "sane CommonMark rules".

tomllib comes with Python and parses TOML, but doesn't write it. With untrusted input, [limit its size](https://docs.python.org/3/library/tomllib.html), since a malicious TOML string can use a lot of CPU and memory.

PyYAML parses and emits YAML. Load it with `yaml.safe_load()`, since [`yaml.load` can call any Python function](https://pyyaml.org/wiki/PyYAMLDocumentation) when the data comes from an untrusted source.

Markdown your users write can carry HTML, so give each parser its safe setting. With markdown-it-py, use the [`js-default` preset](https://markdown-it-py.readthedocs.io/en/latest/security.html), which its docs strongly recommend for user content in web apps. Python-Markdown [doesn't sanitize its output](https://python-markdown.github.io/sanitization/), so run a sanitizer over the HTML. With Mistune, build your parser with [`mistune.create_markdown()`](https://mistune.lepture.com/en/latest/guide.html), which escapes HTML, instead of `mistune.html()`, which doesn't.
