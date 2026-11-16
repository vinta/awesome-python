In production, run Django and Flask apps on Gunicorn and FastAPI apps on Uvicorn. Gunicorn doesn't run on Windows, so serve WSGI apps there with Waitress.

How to choose:

- WSGI apps like Django and Flask: Gunicorn
- ASGI apps like FastAPI: Uvicorn
- A WSGI app on Windows, or pure Python with no dependencies: Waitress
- One server for both ASGI and WSGI apps: Granian
- An async app built on Trio: Hypercorn

### Gunicorn

Pick Gunicorn for a WSGI app on Linux or another Unix. Start it with [`gunicorn app:app`](https://gunicorn.org/quickstart/). It also ships a [native ASGI worker](https://gunicorn.org/asgi/) with the same process management, logging, and config you use for WSGI. So if you run Gunicorn already, it can serve your FastAPI apps too. On Windows, Gunicorn [runs only under WSL](https://flask.palletsprojects.com/en/stable/deploying/gunicorn/).

### Uvicorn

Pick Uvicorn for an ASGI app. It's the server [FastAPI uses by default](https://fastapi.tiangolo.com/deployment/manually/), and Django's ASGI app runs on it too. Start it with [`uvicorn main:app`](https://uvicorn.dev/). For production, run Uvicorn's own [worker manager](https://uvicorn.dev/deployment/), which restarts workers that die, or Uvicorn's worker class [under Gunicorn](https://docs.djangoproject.com/en/stable/howto/deployment/asgi/uvicorn/), as Uvicorn's and Django's docs show. FastAPI's docs use the first.

### Waitress

Pick Waitress for a WSGI app that has to run on Windows. It's pure Python with no dependencies outside the standard library. Start it from Python with [`serve(wsgiapp)`](https://docs.pylonsproject.org/projects/waitress/en/latest/usage.html). Pyramid's starter project serves through it.

### Granian

Pick Granian when you want one dependency that serves both ASGI and WSGI apps. It's written in Rust. Its README says to [pass on it](https://github.com/emmett-framework/granian) when you want a pure Python server, need advanced debugging, or rely on Trio or gevent. You tell it which interface to serve: `granian --interface asgi main:app`. If you switch for speed, measure your own app first: independent comparisons found little speed difference from Uvicorn once the database is the bottleneck.

### Hypercorn

Pick Hypercorn when your ASGI app runs on Trio: it can use asyncio, uvloop, or [Trio workers](https://hypercorn.readthedocs.io/en/latest/discussion/workers.html). It started as part of Quart, which installs it. Start it with [`hypercorn hello_world:app`](https://hypercorn.readthedocs.io/en/latest/tutorials/quickstart.html).

### Running in production

Put a reverse proxy in front of your server. Gunicorn's docs [strongly recommend one](https://gunicorn.org/deploy/), since its default sync workers need a proxy that buffers slow clients. Uvicorn's docs recommend one too, and Waitress has no TLS of its own. In containers, run one server process per container and [let your orchestrator scale the containers](https://uvicorn.dev/deployment/docker/), as Uvicorn's and Granian's docs advise.
