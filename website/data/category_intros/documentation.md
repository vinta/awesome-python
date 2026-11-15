Sphinx is the Python documentation generator for docs built around an API reference. Docs that are mostly guides start on Zensical, or stay on Material for MkDocs.

How to choose:

- Docs built around an API reference: Sphinx
- A new docs site, mostly guides: Zensical
- An existing MkDocs site: Material for MkDocs
- An API reference alone, with no config: pdoc
- Architecture diagrams kept as code: Diagrams

### Sphinx

Pick Sphinx when the API reference is the heart of your docs. It generates [API documentation from docstrings](https://www.sphinx-doc.org/en/stable/), cross-references other projects' docs, and builds HTML, LaTeX for PDF, and ePub. Pages are reStructuredText by default, and [MyST-Parser](https://www.sphinx-doc.org/en/stable/usage/markdown.html) lets you write them in Markdown. Start with [`sphinx-quickstart`](https://www.sphinx-doc.org/en/stable/usage/quickstart.html#setting-up-the-documentation-sources), which sets up the source directory from a few questions. Then turn on [autodoc](https://www.sphinx-doc.org/en/stable/usage/extensions/autodoc.html) to pull docstrings into your handwritten pages.

### Zensical

Pick Zensical to start a new docs site that's mostly guides, written in Markdown. It's a static site generator [built by the creators of Material for MkDocs](https://zensical.org/docs/get-started/), with the same batteries-included approach. Run [`zensical new .`](https://zensical.org/docs/create-your-site/) to create the project, then `zensical serve` to preview the site as you write. An existing MkDocs site can move over too, since Zensical [can build MkDocs projects without changes](https://zensical.org/docs/compatibility/mkdocs/).

### Material for MkDocs

Use Material for MkDocs on an existing MkDocs site. It's [a documentation framework built on MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/): you write Markdown, and it needs no HTML, CSS, or JavaScript from you. A plain MkDocs site switches over once you [set `theme: name: material`](https://squidfunk.github.io/mkdocs-material/creating-your-site/#minimal-configuration) in `mkdocs.yml`. Its own docs name [Zensical as its successor from the same team](https://squidfunk.github.io/mkdocs-material/alternatives/#zensical), and send both new projects and existing Material sites there. Before you move, Zensical's migration guide says to [check that every MkDocs plugin you depend on is supported](https://zensical.org/docs/compatibility/mkdocs/migration/#adopt-zensical-gradually).

### pdoc

Pick pdoc when your docs are the API reference alone. For substantially more complex needs, its own docs [recommend Sphinx](https://pdoc.dev/docs/pdoc.html#limitations). pdoc [requires no configuration](https://pdoc.dev/), follows your module hierarchy, links between identifiers, and understands numpydoc or Google-style docstrings. [Run `pdoc my_module`](https://pdoc.dev/docs/pdoc.html#quickstart) to preview the docs in your browser, and they reload as you edit.

### Diagrams

Use Diagrams to draw your cloud architecture in Python code instead of a design tool, so [version control tracks the diagram's changes](https://diagrams.mingrammer.com/) like any other code. Connect nodes with `>>` inside a `with Diagram("Web Service"):` block and [run the script](https://diagrams.mingrammer.com/docs/getting-started/installation#quick-start): Graphviz renders the diagram to an image file.

### More Sphinx resources

For Sphinx extensions, themes, and tutorials, see [awesome-sphinxdoc](https://github.com/ygzgxyz/awesome-sphinxdoc).
