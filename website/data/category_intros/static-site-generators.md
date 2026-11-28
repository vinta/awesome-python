Pelican builds a blog or content site from Markdown or reST files. When your posts are Jupyter notebooks, use Nikola, which supports them out of the box.

How to choose:

- A blog or content site written in Markdown or reST: Pelican
- Posts written as Jupyter notebooks: Nikola

### Pelican

Pick Pelican for a blog or content site you write in [Markdown or reStructuredText](https://docs.getpelican.com/en/latest/), and pass on it for Nikola when your posts are Jupyter notebooks. It isn't [only for blogs](https://docs.getpelican.com/en/latest/faq.html#is-pelican-only-suitable-for-blogs): a product launch site takes some theme and config changes. Start with [`pelican-quickstart`](https://docs.getpelican.com/en/latest/quickstart.html), which asks a few questions about your site and creates a skeleton project. You write themes in [Jinja](https://docs.getpelican.com/en/latest/themes.html).

### Nikola

Pick Nikola when your posts start as Jupyter notebooks: it supports them [out of the box](https://getnikola.com/features/#input), along with reST, Markdown, and HTML. Start with [`nikola init`](https://getnikola.com/getting-started.html#init), which launches a wizard to configure your site. Builds are incremental, since it [rebuilds only the pages](https://getnikola.com/) that need it, and you write themes in [Mako or Jinja](https://getnikola.com/features/#extending).

### Documentation sites

For a project's documentation, pick a documentation generator from the [Documentation](/categories/documentation/) page.
