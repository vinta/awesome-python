Pick Django when an app needs an ORM, admin, and logins, or Flask to choose each piece. For async apps, use Litestar, or Starlette for a minimal toolkit.

How to choose:

- An app that needs an ORM, admin, and logins built in: Django
- A small app where you pick each library: Flask
- An async app with dependency injection and OpenAPI built in: Litestar
- A small async service on a minimal toolkit: Starlette
- A prototype in one file with no dependencies: Bottle
- A small app that may grow large without a rewrite: Pyramid
- HTML pages driven by HTMX, if you know HTML and HTTP: FastHTML
- Long-lived connections on Tornado's own server: Tornado
- An interactive UI in pure Python, no web experience needed: Reflex

### Django

Pick Django when your app needs logins, an admin, and relational models, since it ships all three. Describe your tables as Python models, and Django [builds a production-ready admin](https://docs.djangoproject.com/en/stable/intro/overview/) from them, where your staff can add, change, and delete records. Start with [`django-admin startproject`](https://docs.djangoproject.com/en/stable/intro/tutorial01/).

### Flask

Pick Flask for a small app where you'd rather choose each library yourself. Flask [won't make many decisions for you](https://flask.palletsprojects.com/en/stable/design/), and leaves the database layer and form validation to extensions you add. Start with an [application factory](https://flask.palletsprojects.com/en/stable/patterns/appfactories/): a function that creates the app, so your tests can build it with different settings.

### Litestar

Pick Litestar for an async app that wants its structure built in rather than assembled. It ships with [dependency injection and OpenAPI schema generation](https://docs.litestar.dev/latest/), and puts class-based controllers at its core. Start by passing your route handlers to the `Litestar` app.

### Starlette

Pick Starlette for a small async service, or as the base of a framework layer of your own. It works [as a complete framework or as an ASGI toolkit](https://starlette.dev/), and you can use any of its components on their own. Start from the `Starlette` class with a list of routes.

### Bottle

Bottle's docs aim it at [prototyping, weekend projects, and small applications](https://bottlepy.org/docs/stable/faq.html). It is [a single file with no dependencies](https://bottlepy.org/docs/stable/) outside the standard library. Start with the `@route` decorator, which maps a URL to a function.

### Pyramid

Pick Pyramid for an app that starts small but may grow large. Its docs say you [shouldn't have to rewrite a small application](https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/introduction.html) in another framework once it gets too big. Start with a `Configurator`, which registers your routes and views.

### FastHTML

Pick FastHTML for [hypermedia apps](https://fastht.ml/about/tech), where your handlers return HTML and HTMX puts it on the page. Its docs say you [need to understand HTML and HTTP](https://fastht.ml/docs/) to use it fully. Start with `fast_app()`, which creates the app and its route decorator.

### Tornado

Pick Tornado for connections held open to each user, served by [its own HTTP server](https://www.tornadoweb.org/en/stable/guide/running.html) instead of a WSGI container. Its docs call it [ideal for long polling and WebSockets](https://www.tornadoweb.org/en/stable/). Start with a `RequestHandler` subclass for each URL.

### Reflex

Pick Reflex to write a dashboard or an internal tool [entirely in Python](https://reflex.dev/docs/getting-started/introduction/), with no JavaScript. Its docs say you need no web development experience. Reflex [compiles the interface to React](https://reflex.dev/docs/advanced-onboarding/how-reflex-works/) and runs your state handlers on the server. Start with a subclass of `rx.State`, which holds your app's data.

### APIs and add-on packages

For an API that serves no HTML pages, see the [Web APIs](/categories/web-apis/) page. For packages that extend Django or Flask, see [awesome-django](https://github.com/wsvincent/awesome-django) and [awesome-flask](https://github.com/humiaozuzu/awesome-flask).
