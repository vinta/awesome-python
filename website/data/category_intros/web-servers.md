In production, Gunicorn serves WSGI apps like Django, and Uvicorn ASGI apps like FastAPI. Need a Python web server on Windows? Waitress runs WSGI there.

How to choose:

- A WSGI app (Flask, Django) on Linux or macOS: Gunicorn
- An ASGI app (FastAPI, Starlette): Uvicorn
- A WSGI app on Windows, or a server in pure Python: Waitress
- One server for both ASGI and WSGI apps, or throughput above all: Granian
- An app on Trio, or HTTP/3 from the Python server: Hypercorn

Gunicorn is a [pre-fork server](https://gunicorn.org/design/#server-model): one process manages a pool of worker processes. It's [built for Unix](https://gunicorn.org/). With its default sync workers, your proxy must [buffer slow clients](https://gunicorn.org/deploy/#nginx-configuration), or Gunicorn is open to denial-of-service attacks. Start with (2 × CPU cores) + 1 workers and [adjust under load](https://gunicorn.org/design/#how-many-workers). For long blocking calls, streaming, or WebSockets, switch to [async workers](https://gunicorn.org/design/#when-to-use-async-workers) like gevent.

Uvicorn is an [ASGI web server](https://uvicorn.dev/). In production, run it under a [process manager](https://uvicorn.dev/deployment/#using-a-process-manager). Its [built-in one](https://uvicorn.dev/deployment/#built-in) starts workers with `--workers` and restarts any that die, and its docs also cover [running Uvicorn workers under Gunicorn](https://uvicorn.dev/deployment/#gunicorn). In a container, run a single Uvicorn process and [let your orchestrator scale](https://uvicorn.dev/deployment/docker/) the number of containers.

Granian is a [Rust HTTP server](https://github.com/emmett-framework/granian) that serves ASGI, WSGI, and RSGI apps from one package. Its README [suggests it](https://github.com/emmett-framework/granian#rationale) when you care about throughput above all, and not when you want pure Python or your app relies on Trio or gevent. Pass [`--interface asgi` or `--interface wsgi`](https://github.com/emmett-framework/granian#options), since the default is RSGI. Start with [one worker per CPU core](https://github.com/emmett-framework/granian#workers-and-threads), or one per container on Docker or Kubernetes, rather than numbers suggested for other servers.

Hypercorn is an ASGI server [inspired by Gunicorn](https://hypercorn.readthedocs.io/en/latest/). It speaks HTTP/1 and HTTP/2, with WebSockets over both, and runs on [Trio](https://hypercorn.readthedocs.io/en/latest/discussion/workers.html#trio) as well as asyncio. For HTTP/3, install its [`h3` extra](https://github.com/pgjones/hypercorn). Its docs recommend setting [`server_names`](https://hypercorn.readthedocs.io/en/latest/how_to_guides/server_names.html#dns-rebinding-attacks) to the hosts you serve, to block DNS rebinding attacks.

Waitress is a [pure-Python WSGI server](https://docs.pylonsproject.org/projects/waitress/en/latest/index.html) with no dependencies outside the standard library, and it runs on both Unix and Windows. Waitress [doesn't support TLS](https://docs.pylonsproject.org/projects/waitress/en/latest/reverse-proxy.html) itself, so put a reverse proxy in front of it for HTTPS.

Put a proxy like Nginx in front: Gunicorn's docs [strongly recommend it](https://gunicorn.org/deploy/), and Uvicorn's recommend it [for resilience](https://uvicorn.dev/deployment/#running-behind-nginx). Behind a proxy, tell your server which proxies to trust for `X-Forwarded-*` headers, since any client can set them. [Uvicorn](https://uvicorn.dev/deployment/#proxies-and-forwarded-headers) and Gunicorn take `--forwarded-allow-ips`, Granian [`trusted_hosts`](https://github.com/emmett-framework/granian#proxies-and-forwarded-headers), Hypercorn [`ProxyFixMiddleware`](https://hypercorn.readthedocs.io/en/latest/how_to_guides/proxy_fix.html), and Waitress [`trusted_proxy`](https://docs.pylonsproject.org/projects/waitress/en/latest/reverse-proxy.html#passing-the-proxy-headers-to-setup-the-wsgi-environment). In Uvicorn, Gunicorn, Granian, and Waitress, trust every address with `*` only when [no client can reach the server directly](https://gunicorn.org/deploy/#nginx-configuration).
