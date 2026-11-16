Render HTML pages, emails, and config files with Jinja. Pick Mako instead if you want to write full Python inside your templates.

How to choose:

- HTML pages, emails, or config files: Jinja
- Templates your users write: Jinja's sandbox
- Full Python inside templates: Mako

### Jinja

Pick Jinja for most projects: it's a [general-purpose template engine](https://jinja.palletsprojects.com/en/stable/faq/) for HTML, plain text, emails, or configuration files. Flask already sets Jinja up for you. Django has a built-in backend for Jinja, but its docs say to [keep Django's own template language](https://docs.djangoproject.com/en/stable/topics/templates/) unless you have a pressing reason. Outside a framework, [create one `Environment`](https://jinja.palletsprojects.com/en/stable/api/#basics) when your app starts and load your templates through it. When your users write templates, render them in Jinja's [sandboxed environment](https://jinja.palletsprojects.com/en/stable/sandbox/), and still limit CPU and memory, since its docs say the sandbox alone isn't perfect security.

### Mako

Pick Mako if you'd rather write Python in your templates than learn Jinja's own syntax, since Jinja [leaves arbitrary Python out](https://jinja.palletsprojects.com/en/stable/faq/) on purpose. Mako calls itself [an embedded Python language](https://www.makotemplates.org/). Beyond that, the two engines overlap a lot in features, so your syntax preference often decides. A real app loads its templates through a [`TemplateLookup`](https://docs.makotemplates.org/en/latest/usage.html#using-templatelookup). Pass on Mako when users write templates, since every template can [run any Python code](https://docs.makotemplates.org/en/latest/syntax.html#python-blocks).

### HTML escaping

Flask and Django turn on escaping for their HTML templates, which keeps user input from injecting HTML. When you use Jinja on its own, [configure autoescaping](https://jinja.palletsprojects.com/en/stable/api/#autoescaping) yourself: its docs recommend `select_autoescape()`. Mako escapes HTML through its [`h` filter](https://docs.makotemplates.org/en/latest/filtering.html#expression-filtering), which you can apply to every expression in an app or on one page.
