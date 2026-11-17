Whether templates may hold Python code splits the Python template engines: Jinja keeps code out and sandboxes untrusted templates, Mako embeds plain Python.

How to choose:

- Templates without embedded Python: Jinja
- Templates your users write: Jinja, in its sandbox
- Plain Python inside your templates: Mako

Jinja [doesn't allow arbitrary Python code in templates](https://jinja.palletsprojects.com/en/stable/faq/): you get blocks, filters, and function calls, and the rest of your logic stays in Python. Outside a framework, [create one `Environment`](https://jinja.palletsprojects.com/en/stable/api/) when your app starts and load templates through a `PackageLoader`. Put the layout your pages share in a base template, and let each page [extend it and override its blocks](https://jinja.palletsprojects.com/en/stable/templates/#template-inheritance). Flask [sets up Jinja for you](https://flask.palletsprojects.com/en/stable/templating/#jinja-setup), Django has a [built-in Jinja2 backend](https://docs.djangoproject.com/en/stable/topics/templates/#django.template.backends.jinja2.Jinja2), and FastAPI [supports it with `Jinja2Templates`](https://fastapi.tiangolo.com/advanced/templates/).

When your users write templates, like a report layout, render them in Jinja's [sandbox](https://jinja.palletsprojects.com/en/stable/sandbox/#sandbox), which can block attribute access, method calls, and other operations. Its docs say the sandbox alone [is not a solution for perfect security](https://jinja.palletsprojects.com/en/stable/sandbox/#security-considerations): catch errors when a template renders, limit CPU and memory, and pass the template only the data it needs.

Mako is [an embedded Python language](https://www.makotemplates.org/): inside `<% %>` tags you [write regular Python](https://docs.makotemplates.org/en/latest/syntax.html#python-blocks). A real application [loads its templates from a `TemplateLookup`](https://docs.makotemplates.org/en/latest/usage.html#using-templatelookup) with a `module_directory`, which caches each compiled template on disk as a Python module.

Jinja leaves HTML escaping [off by default](https://jinja.palletsprojects.com/en/stable/faq/#why-is-html-escaping-not-the-default), since it also renders plain text, emails, and config files. When you create the `Environment` yourself, turn it on with [`select_autoescape()`](https://jinja.palletsprojects.com/en/stable/api/#jinja2.select_autoescape); Flask turns it on for HTML templates, and Django's Jinja2 backend turns it on for all. Mako escapes HTML only through [the `h` filter](https://docs.makotemplates.org/en/latest/filtering.html#expression-filtering): add it to `default_filters` on your `TemplateLookup` to escape every expression.
