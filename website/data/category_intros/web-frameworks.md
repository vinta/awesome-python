How much should a Python web framework build in? Django comes with an ORM, an admin, and auth; Flask gives you a small core to extend.

How to choose:

- ORM, admin, and auth built in: Django
- A small core you extend with your own picks: Flask
- One file with no dependencies: Bottle
- An app that starts small and may grow large: Pyramid
- HTML from the server with HTMX: FastHTML
- A minimal async toolkit to build on: Starlette
- Long polling, WebSockets, and other long-lived connections: Tornado
- Async with sessions, caching, and ORM integration built in: Litestar
- Frontend and backend in pure Python: Reflex

Django comes with [a full stack for convenience](https://docs.djangoproject.com/en/stable/misc/design-philosophies/), and its pieces stay independent where possible. You describe your database layout as models in Python, and Django [builds an admin interface from them](https://docs.djangoproject.com/en/stable/intro/overview/). [User authentication](https://docs.djangoproject.com/en/stable/topics/auth/) with accounts, groups, and permissions is built in too. A project holds your settings and [one or more apps](https://docs.djangoproject.com/en/stable/intro/tutorial01/#creating-the-polls-app), and an app can move between projects. Before you deploy, run [`manage.py check --deploy`](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/#run-manage-py-check-deploy) against your production settings. Async views work under WSGI, but for slow streaming and long polling, [deploy Django under ASGI](https://docs.djangoproject.com/en/stable/topics/async/#async-views).

Flask keeps [the core simple but extensible](https://flask.palletsprojects.com/en/stable/design/#what-does-micro-mean): it doesn't pick your database or form library, and extensions add them. Create the app in an [application factory](https://flask.palletsprojects.com/en/stable/patterns/appfactories/) and bind each extension with `init_app`, so tests can build instances with their own settings. Flask runs each async view on a separate thread, not an event loop, which [costs performance compared with ASGI frameworks](https://flask.palletsprojects.com/en/stable/design/#async-await-and-asgi-support). For a mainly async codebase, its docs point you to an async-first framework.

Bottle is [a single file module](https://bottlepy.org/docs/stable/) with no dependencies outside the standard library. Its FAQ pitches it for [prototyping, weekend projects, and small applications](https://bottlepy.org/docs/stable/faq.html#is-bottle-suitable-for-complex-applications), and suggests a full-stack framework like Django when you have tight deadlines. In production, have [Gunicorn or another WSGI server load your app](https://bottlepy.org/docs/stable/deployment.html) instead of calling `run()`.

Pyramid is built so you [don't have to rewrite a small app in another framework](https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/introduction.html#what-makes-pyramid-unique) when it gets too big. Its core maps URLs to code, handles security, and serves static assets, and it makes no assertions about which database or template system you use. Start from [its cookiecutter](https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/project.html), which asks for your template language, persistence, and URL mapping. Deploy with the `production.ini` it generates, which turns off the interactive debugger.

FastHTML is [designed to create hypermedia applications](https://www.fastht.ml/about/tech): it returns HTML from the server, the approach HTMX uses, and you often won't write any JavaScript at all. It's built on Starlette and Uvicorn. Its docs say [not to assume other frameworks' best practices apply](https://www.fastht.ml/docs/ref/best_practice.html): let the function name define each route, and use only GET and POST.

Starlette is [a lightweight ASGI framework/toolkit](https://starlette.dev/#framework-or-toolkit): use it as a complete framework, or take any of its components on their own. Install an ASGI server such as Uvicorn next to it, and pick [any async database library](https://starlette.dev/database/) you like. Keep configuration [in environment variables or a `.env` file](https://starlette.dev/config/) that you don't commit.

Tornado [isn't based on WSGI](https://www.tornadoweb.org/en/stable/#threads-and-wsgi) and typically runs one thread per process, with its own web framework and HTTP server used together. Its non-blocking I/O makes it a fit for [long polling, WebSockets, and other long-lived connections](https://www.tornadoweb.org/en/stable/). Hand blocking code to `run_in_executor`, and [run one process per CPU](https://www.tornadoweb.org/en/stable/guide/running.html#processes-and-ports).

Litestar is [not a microframework](https://docs.litestar.dev/latest/#philosophy): it comes with ORM integration, client- and server-side sessions, and caching, though it will never have its own ORM. Class-based controllers sit at its core. Set dependencies, guards, and middleware on [any layer](https://docs.litestar.dev/latest/onboarding/flask.html), from the app down to one handler, and the setting closest to the handler wins.

Reflex builds the [frontend, backend, and database in pure Python](https://reflex.dev/docs/getting-started/introduction/). It [compiles your UI to a React frontend](https://reflex.dev/docs/advanced-onboarding/how-reflex-works/), runs your state handlers on the server, and syncs the two over WebSockets. Change state only through event handlers on your `State` class. In production, the Reflex team runs Redis as the state manager. Keep auth data and other sensitive state in [backend-only vars](https://reflex.dev/docs/vars/base-vars/#backend-only-vars).

Don't deploy on the development server: [Flask](https://flask.palletsprojects.com/en/stable/deploying/) and [Django](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/#switch-away-from-manage-py-runserver) both tell you to switch to a production server, and to turn debug mode off.

For a site with forms and logins, turn on CSRF protection. Django's [CSRF middleware is on by default](https://docs.djangoproject.com/en/stable/howto/csrf/). Tornado, Pyramid, and Litestar have it as a setting you turn on. Flask [leaves it to a form library](https://flask.palletsprojects.com/en/stable/web-security/#cross-site-request-forgery-csrf), and Starlette to third-party middleware.
