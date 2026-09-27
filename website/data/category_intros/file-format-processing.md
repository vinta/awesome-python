pypdf reads PDFs, python-docx Word files, and openpyxl Excel sheets: one Python file format library per format. MarkItDown turns any of them into Markdown.

How to choose:

- Splitting, merging, and reading PDFs: pypdf
- Word documents: python-docx
- Excel: openpyxl to read or edit, XlsxWriter for new reports
- Documents to Markdown for an LLM: MarkItDown
- ELF binaries and DWARF debug info: pyelftools
- One table exported to CSV, JSON, Excel, and more: Tablib
- Scanned PDFs, tables, and complex layouts: Docling
- PowerPoint decks: python-pptx
- New PDFs drawn from Python code: ReportLab
- PDF text with its position and font: pdfminer.six
- PDFs from HTML and CSS: WeasyPrint
- Markdown to HTML: markdown-it-py for CommonMark, Python-Markdown for its extensions, Mistune for speed
- Config files: tomllib for TOML, PyYAML for YAML

pypdf works on PDFs that already exist: it [splits, merges, crops, and transforms pages](https://pypdf.readthedocs.io/en/stable/), adds passwords, and pulls out text and metadata. It's [pure Python with no C dependency](https://pypdf.readthedocs.io/en/stable/meta/comparisons.html), and it doesn't create PDFs. pypdf [isn't OCR software](https://pypdf.readthedocs.io/en/stable/user/extract-text.html), so run scanned pages through OCR instead.

python-docx [only edits existing documents](https://python-docx.readthedocs.io/en/latest/user/documents.html): `Document()` opens a built-in template with no content. Start from your own .docx instead, so its styles, headers, and footers carry over.

openpyxl reads and writes Excel files. For big workbooks, open them with `read_only=True` or create them with `write_only=True`, which [keep memory near constant](https://openpyxl.readthedocs.io/en/stable/optimized.html). A cell with a formula loads the formula; pass [`data_only=True`](https://openpyxl.readthedocs.io/en/stable/tutorial.html) to get the value Excel last calculated.

XlsxWriter [only writes new files](https://xlsxwriter.readthedocs.io/introduction.html) and can't read or modify existing ones, but it supports more Excel features than the alternatives. Open the workbook [in a `with` block](https://xlsxwriter.readthedocs.io/workbook.html) so it gets closed and saved. For large files, turn on [`constant_memory`](https://xlsxwriter.readthedocs.io/working_with_memory.html) and write the rows in order. From pandas, pass [`engine='xlsxwriter'`](https://xlsxwriter.readthedocs.io/working_with_pandas.html) to `pd.ExcelWriter`.

MarkItDown converts files to Markdown [for LLMs and text analysis](https://github.com/microsoft/markitdown), not for high-fidelity conversions that people read. Install `markitdown[all]`, or only the extras for your formats, like `markitdown[pdf, docx, pptx]`.

Docling [understands PDF layout](https://docling-project.github.io/docling/): reading order, tables, and formulas. It also runs OCR on scanned pages. Its models [run locally and send no data out](https://docling-project.github.io/docling/usage/advanced_options/#using-remote-services) unless you turn remote services on. Each file becomes a DoclingDocument, which you export to Markdown or [split into chunks](https://docling-project.github.io/docling/concepts/chunking/) for an embedding model.

python-pptx builds decks from data, like a database query or analytics output, and [doesn't need PowerPoint installed](https://python-pptx.readthedocs.io/en/latest/). It [only edits existing presentations](https://python-pptx.readthedocs.io/en/latest/user/presentations.html), so start from your own deck: its theme, slide master, and slide layouts set how the slides look. Add each slide from one of those layouts, picked by [its index in your deck](https://python-pptx.readthedocs.io/en/latest/user/slides.html).

ReportLab draws new PDFs from Python code. Learn it on [`pdfgen`, its lowest-level interface](https://docs.reportlab.com/developerfaqs/), then build multi-page documents with [Platypus](https://docs.reportlab.com/reportlab/userguide/ch5_platypus/). Platypus lets you keep paragraph styles and page layouts in one shared file, so restyling takes a few lines.

pdfminer.six [focuses on text](https://github.com/pdfminer/pdfminer.six): it gets each piece of text with its exact location, font, and color. Start with `extract_text()` from its [high-level API](https://pdfminersix.readthedocs.io/en/latest/tutorial/highlevel.html). A PDF [stores only characters and their positions](https://pdfminersix.readthedocs.io/en/latest/topic/converting_pdf_to_text.html), so pdfminer.six guesses words, lines, and paragraphs from the layout. Tune those guesses with `LAParams`.

WeasyPrint turns HTML and CSS into PDFs, like [reports, invoices, and tickets](https://doc.courtbouillon.org/weasyprint/stable/). It runs [no JavaScript](https://doc.courtbouillon.org/weasyprint/stable/going_further.html). Set page size and margins [with the CSS `@page` rule](https://doc.courtbouillon.org/weasyprint/stable/common_use_cases.html).

markdown-it-py [follows the CommonMark spec](https://markdown-it-py.readthedocs.io/en/latest/) and takes plugins for more syntax. For content your users submit, use the [`js-default` preset](https://markdown-it-py.readthedocs.io/en/latest/security.html), since the default settings aren't safe for it.

Python-Markdown [isn't a CommonMark implementation](https://python-markdown.github.io/): it follows the original Markdown syntax and has an extension API. It [doesn't sanitize its HTML output](https://python-markdown.github.io/sanitization/), so sanitize it yourself when the input is untrusted.

Mistune is [fast and has no dependencies](https://mistune.lepture.com/en/latest/). For untrusted input, build the parser with [`mistune.create_markdown()`](https://mistune.lepture.com/en/latest/guide.html), which escapes HTML tags, since `mistune.html()` doesn't.

tomllib [only reads TOML](https://docs.python.org/3/library/tomllib.html), from a file opened in binary mode.

Tablib holds one dataset and exports it to many formats; Excel, YAML, and pandas [are optional extras](https://tablib.readthedocs.io/en/stable/formats.html), like `tablib[xlsx]`.

pyelftools is [pure Python with no dependencies](https://github.com/eliben/pyelftools); start from its [`ELFFile` class](https://github.com/eliben/pyelftools/blob/main/doc/user-guide.md) and stay on the high-level API.

Treat every file you didn't create as untrusted. With PyYAML, call [`yaml.safe_load()`](https://pyyaml.org/wiki/PyYAMLDocumentation#loading-yaml), never `yaml.load()`, which can run any Python function. Install [defusedxml](https://openpyxl.readthedocs.io/en/stable/#security) next to openpyxl to guard against XML attacks like billion laughs. [Catch pypdf's exceptions](https://pypdf.readthedocs.io/en/stable/user/security.html) yourself, so a broken PDF can't crash your service. For MarkItDown, call [`convert_local()` or `convert_stream()`](https://github.com/microsoft/markitdown#security-considerations) instead of `convert()`, which also fetches remote URIs. Cap Docling's input with [`max_num_pages` and `max_file_size`](https://docling-project.github.io/docling/usage/advanced_options/#impose-limits-on-the-document-size). Run WeasyPrint on untrusted HTML [as a user with limited access](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#security), with a URL fetcher that blocks local files. With tomllib, [limit the size](https://docs.python.org/3/library/tomllib.html) of the data you parse.
