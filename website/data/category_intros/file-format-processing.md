Use pypdf to split, merge, and read PDFs, and openpyxl to edit Excel files. For Markdown to feed an LLM, use MarkItDown, or Docling for PDF tables and layouts.

How to choose:

- Splitting, merging, or pulling text from PDFs: pypdf
- Excel: openpyxl to read or edit a workbook, XlsxWriter to write a new one
- Office files and other documents to Markdown for an LLM: MarkItDown
- PDFs with tables, formulas, or complex page layouts, or structured output: Docling
- ELF binaries and DWARF debug info: pyelftools
- Converting between Markdown, Word, HTML, and other markup formats: pypandoc
- Word documents: python-docx
- PowerPoint decks: python-pptx
- Rendering PDF pages or extracting tables: PyMuPDF, or pdfminer.six for text positions and fonts
- Generating PDFs from Python code: ReportLab
- HTML and CSS templates to PDF: WeasyPrint
- Markdown to HTML: markdown-it-py for CommonMark, Mistune for text your users write, Python-Markdown for Gruber's original syntax
- Config and data files: tomllib for TOML, PyYAML for YAML, Tablib for one table in CSV, JSON, or Excel

### pypdf

Pick pypdf to split, merge, crop, or encrypt the PDFs you already have, and to pull out their text. It's [a pure-Python PDF library](https://pypdf.readthedocs.io/en/latest/meta/comparisons.html), with no C dependency to install. Read a file with `PdfReader` and call [`extract_text()`](https://pypdf.readthedocs.io/en/latest/user/extract-text.html) on each of its pages. To combine files, [`append()` each one to a `PdfWriter`](https://pypdf.readthedocs.io/en/latest/user/merging-pdfs.html) and write it out.

### openpyxl

Pick openpyxl to read or edit an existing Excel workbook. It [reads and writes xlsx files](https://openpyxl.readthedocs.io/en/latest/). Open the file with [`load_workbook()`](https://openpyxl.readthedocs.io/en/latest/tutorial.html#loading-from-a-file), pick a sheet by name, read or set cells like `ws["A1"]`, and call `save()`.

### XlsxWriter

Pick XlsxWriter to generate a new Excel file, like a report with formatting and charts. It [cannot read or modify existing files](https://xlsxwriter.readthedocs.io/introduction.html), and by its own account it supports more Excel features than any of the alternative modules. Create a `Workbook`, add a sheet with `add_worksheet()`, [`write()` to its cells](https://xlsxwriter.readthedocs.io/tutorial01.html), and `close()` the workbook to save the file.

### MarkItDown

Pick MarkItDown to turn Office files and other documents into Markdown for an LLM or a text analysis pipeline. Its README says the output [is meant for text analysis tools](https://github.com/microsoft/markitdown), and may not be the best option when people will read the converted document. Create a `MarkItDown()` instance, call `convert()` on a file, and read the result's `markdown` attribute.

### Docling

Pick Docling when your PDFs are full of tables, formulas, or complex page layouts, or when you want structured data instead of plain text. Its [advanced PDF understanding](https://github.com/docling-project/docling) covers page layout, reading order, and table structure, and every format it reads becomes one `DoclingDocument` you can export to Markdown, HTML, or JSON. Its models run locally, so your documents stay on your machine. Pass a file path or URL to [`DocumentConverter().convert()`](https://docling-project.github.io/docling/usage/), then call `export_to_markdown()` on the result's `document`.

### pyelftools

Pick pyelftools to read ELF binaries and their DWARF debug information from Python. It's [pure Python, with no external dependencies](https://github.com/eliben/pyelftools). Pass an open file to [`ELFFile`](https://github.com/eliben/pyelftools/blob/main/doc/user-guide.md), its main entry point, to list sections and segments, and call `get_dwarf_info()` on it for the debug data.

### pypandoc

Pick pypandoc to convert documents between authoring formats from Python, such as Markdown to Word. It's [a thin wrapper for pandoc](https://github.com/JessicaTegner/pypandoc), which [converts between numerous markup and word processing formats](https://pandoc.org/MANUAL.html), so pandoc has to be installed too. Call `pypandoc.convert_file()` with the source file and the target format.

### python-docx

Pick python-docx to create or update Word .docx files. Its docs say it only ever changes an existing document, and a new one is just a blank default. So [start from a document of your own](https://python-docx.readthedocs.io/en/latest/user/documents.html#really-opening-a-document) that already holds your styles, headers, and footers. Open it with `Document("template.docx")`, add content with `add_heading()`, `add_paragraph()`, and `add_table()`, and save it under a new name.

### python-pptx

Pick python-pptx to generate PowerPoint decks from data, like a database query or analytics output, [without PowerPoint installed](https://python-pptx.readthedocs.io/en/latest/). The theme, slide master, and layouts of the deck you open decide how your slides look, so [open your own template](https://python-pptx.readthedocs.io/en/latest/user/presentations.html#really-opening-a-presentation) with `Presentation("template.pptx")`. Add slides from its layouts with `slides.add_slide()` and fill in their placeholders.

### PyMuPDF

Pick PyMuPDF to render PDF pages to images, extract tables, or read other formats like EPUB and XPS. Check its license first: PyMuPDF is [AGPL or commercial](https://pymupdf.readthedocs.io/en/latest/about.html#license-and-copyright), while pypdf and pdfminer.six are permissive. `import pymupdf`, open a file with [`pymupdf.open()`](https://pymupdf.readthedocs.io/en/latest/tutorial.html), and call `get_text()` on each page.

### pdfminer.six

Pick pdfminer.six when you need more than the text of a PDF: it can [get the exact location, font, or color](https://github.com/pdfminer/pdfminer.six) of the text on a page. For the plain text, [`extract_text()`](https://pdfminersix.readthedocs.io/en/latest/tutorial/highlevel.html) from `pdfminer.high_level` reads a whole file in one call.

### ReportLab

Pick ReportLab to build PDFs in Python code, like reports with charts, a job [pypdf's docs leave to other tools](https://pypdf.readthedocs.io/en/latest/meta/comparisons.html#document-generation). Its Platypus layer [creates complex documents with a minimum of effort](https://docs.reportlab.com/reportlab/userguide/ch5_platypus/): build a document from a `DocTemplate`, then pass a list of flowables, like paragraphs and tables, to `build()`. When you need exact placement, draw on [the canvas](https://docs.reportlab.com/reportlab/userguide/ch2_graphics/), where you position everything by X and Y coordinates.

### WeasyPrint

Pick WeasyPrint when your documents, like invoices or reports, already exist as HTML and CSS, and ReportLab when you'd rather build them in Python code. It's [a visual rendering engine for HTML and CSS that can export to PDF](https://doc.courtbouillon.org/weasyprint/latest/), made for web developers. Render a page with [`HTML(...).write_pdf()`](https://doc.courtbouillon.org/weasyprint/latest/first_steps.html#quickstart), passing a URL, a file, or a string of HTML.

### markdown-it-py

Pick markdown-it-py to render Markdown that follows the CommonMark spec, or to add syntax of your own. It's [a Python port of markdown-it](https://markdown-it-py.readthedocs.io/en/latest/), with rules you can replace and plugins that extend the syntax. `MarkdownIt().render(text)` returns HTML. Its default preset passes raw HTML through, as CommonMark requires, so for text your users submit, its docs [strongly recommend the `js-default` preset](https://markdown-it-py.readthedocs.io/en/latest/security.html).

### Python-Markdown

Pick Python-Markdown for John Gruber's original Markdown syntax. Its docs say it's [not a CommonMark implementation](https://python-markdown.github.io/), and to look elsewhere if you want one. Turn on [its bundled extensions](https://python-markdown.github.io/extensions/), like `extra`, `toc`, and `footnotes`, by passing them to `markdown.markdown(text, extensions=[...])`.

### Mistune

Pick Mistune to turn Markdown your users write into HTML: `create_markdown()` [escapes raw HTML and rejects unsafe URL schemes by default](https://mistune.lepture.com/en/latest/security.html). Build your parser with it, and keep the global `mistune.html()` helper for trusted text, since it [doesn't escape HTML tags](https://mistune.lepture.com/en/latest/guide.html#legacy-convenience-parser).

### tomllib

Use tomllib, in the standard library, to read TOML files like `pyproject.toml`. It [parses TOML and doesn't write it](https://docs.python.org/3/library/tomllib.html). Open the file in binary mode and pass it to `tomllib.load()`, which returns a dict.

### PyYAML

Pick PyYAML to read and write YAML. Load with `yaml.safe_load()`: plain `yaml.load()` [isn't safe on data from an untrusted source](https://pyyaml.org/wiki/PyYAMLDocumentation#loading-yaml), since it can call any Python function. Write YAML back out with `yaml.dump()`.

### Tablib

Pick Tablib to move one table of data between formats, like a CSV file in and an Excel file out. It's [a format-agnostic tabular dataset library](https://tablib.readthedocs.io/en/latest/intro.html). Load a file into a `Dataset` with [`Dataset().load()`](https://tablib.readthedocs.io/en/latest/tutorial.html#importing-data), which detects the format, and call `export()` with the one you want, such as `"csv"`, `"json"`, or `"xlsx"`.

### Files from your users

When your service converts files that users upload, follow each pick's own security advice. MarkItDown's README says [not to pass untrusted input to it directly](https://github.com/microsoft/markitdown#security-considerations). Call its narrowest method that fits, like `convert_local()` or `convert_stream()`, instead of `convert()`, which also fetches remote URIs. Docling can [cap the file size and page count](https://docling-project.github.io/docling/usage/advanced_options/#impose-limits-on-the-document-size) of each document. For HTML from untrusted sources, WeasyPrint's docs say to run it as a user with limited access and to [use a custom URL fetcher that doesn't allow `file://` URLs](https://doc.courtbouillon.org/weasyprint/latest/first_steps.html#access-to-local-files). openpyxl [doesn't guard against XML attacks like billion laughs](https://openpyxl.readthedocs.io/en/latest/#security) on its own, so install defusedxml next to it.
