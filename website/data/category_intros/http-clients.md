Offering one Requests-style API for sync and async code, HTTPX spares you a second Python HTTP client. Requests suits sync scripts, aiohttp busy asyncio apps.

How to choose:

- Sync and async code from one API, or HTTP/2: HTTPX
- Sync code with the simplest API: Requests
- An asyncio app with many concurrent requests, WebSockets, or its own HTTP server: aiohttp
- Connection pools and retries in your own hands, one layer below Requests: urllib3
- HTTPX's API, verifying TLS with your OS's certificates: HTTPX2
- Building and editing URLs: yarl

HTTPX has a [broadly Requests-compatible API](https://www.python-httpx.org/#features), sync by default with async when you need it, and runs on [asyncio or Trio](https://www.python-httpx.org/async/#supported-async-environments). Coming from Requests, [`httpx.Client` takes the place of `requests.Session`](https://www.python-httpx.org/compatibility/#client-instances). HTTP/2 is opt-in: install `httpx[http2]` and pass [`http2=True`](https://www.python-httpx.org/http2/#enabling-http2) to the client, which pays off most when you send lots of concurrent async requests.

Python's own docs [recommend Requests](https://docs.python.org/3/library/urllib.request.html) for a higher-level HTTP client. It's [sync only](https://requests.readthedocs.io/en/latest/user/advanced/#blocking-or-non-blocking), and its docs point to HTTPX, among others, for async.

aiohttp is an async client and server for asyncio, with [WebSockets on both sides](https://docs.aiohttp.org/en/stable/#key-features) and middleware for the client. Its API is wordier than Requests' by design, to [make the most of non-blocking operations](https://docs.aiohttp.org/en/stable/http_request_lifecycle.html#why-is-aiohttp-client-api-that-way). Each `async with` or `await` gives the event loop a chance to switch to other work. Install `aiohttp[speedups]` to get [aiodns for faster DNS resolving](https://docs.aiohttp.org/en/stable/#library-installation), which its docs highly recommend.

urllib3 is what gives Requests its [connection pooling](https://requests.readthedocs.io/en/latest/). Use it directly when you want the pool and the retry policy in your own code. It can [retry idempotent requests on its own](https://urllib3.readthedocs.io/en/stable/user-guide.html#retrying-requests): set the policy once on the `PoolManager` to cover every request.

HTTPX2 has [the same public API as HTTPX](https://pydantic.dev/docs/httpx2/get-started/migration/#in-a-hurry) under a new name, so switching means renaming the dependency and the import. It [verifies TLS with your operating system's trust store](https://pydantic.dev/docs/httpx2/get-started/migration/#behavior-differences) instead of a bundled certificate list. The two packages [install side by side](https://pydantic.dev/docs/httpx2/get-started/migration/#you-can-have-both-installed), but their objects don't mix: when a library takes a client, [build it from the package that library uses](https://pydantic.dev/docs/httpx2/get-started/migration/#but-objects-dont-cross-the-boundary).

yarl's `URL` is [immutable](https://yarl.aio-libs.org/en/latest/#introduction): every change returns a new URL, and strings you pass in get percent-encoded for you. Build paths with `/` and queries with `%`. Its docs pick immutability so you can [hand a URL to other code](https://yarl.aio-libs.org/en/latest/#comparison-with-other-url-libraries) without it being changed under you. aiohttp's request methods [take a yarl `URL`](https://docs.aiohttp.org/en/stable/client_quickstart.html#make-a-request) as well as a string.

Whichever client you pick, create one session object and reuse it, since it holds the connection pool: Requests' `Session`, HTTPX's `Client` or `AsyncClient`, aiohttp's `ClientSession`, urllib3's `PoolManager`. [Don't create one per request](https://docs.aiohttp.org/en/stable/client_quickstart.html#make-a-request); make one per application and pass it around. Keep the shortcut functions for [one-off scripts](https://www.python-httpx.org/advanced/clients/#why-use-a-client): HTTPX's top-level API opens a new connection for every request, and `urllib3.request()` shares one global pool with your dependencies.

Set timeouts, too. Requests [never times out unless you pass `timeout`](https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts), and its docs say nearly all production code should. urllib3 [takes one on the `PoolManager`](https://urllib3.readthedocs.io/en/stable/user-guide.html#using-timeouts) to cover every request, and HTTPX [enforces timeouts by default](https://www.python-httpx.org/advanced/timeouts/).
