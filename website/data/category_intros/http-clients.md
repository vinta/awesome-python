Requests makes synchronous HTTP calls simple. A Python HTTP client for async code or HTTP/2 means httpx2, whose API stays requests-compatible.

How to choose:

- Scripts and other synchronous code: Requests
- One API for sync and async code, or HTTP/2: httpx2
- Code already on HTTPX: httpx2, the same API under a new name
- An asyncio app making many requests at once: aiohttp
- Direct control over connection pools and retries: urllib3
- Building and editing URLs: yarl

Requests is an [HTTP library built for human beings](https://requests.readthedocs.io/en/latest/), with urllib3 pooling connections underneath. Nearly every call in production code should [pass a timeout](https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts), since requests never time out unless you set one. For several calls to the same host, make them through a [Session used as a context manager](https://requests.readthedocs.io/en/latest/user/advanced/#session-objects): it reuses the TCP connection and closes when the block exits.

httpx2 has a [broadly requests-compatible API](https://pydantic.dev/docs/httpx2/get-started/) in both sync and async code, over HTTP/1.1 or HTTP/2. It's a fork of HTTPX with the [same public API](https://pydantic.dev/docs/httpx2/get-started/migration/#in-a-hurry) under a new name. Beyond one-off scripts, send requests through a [Client used as a context manager](https://pydantic.dev/docs/httpx2/advanced/clients/#why-use-a-client), which pools connections where the top-level functions open a new one per request. In async code, share [one AsyncClient](https://pydantic.dev/docs/httpx2/guides/async/#opening-and-closing-clients) instead of opening one inside a loop.

aiohttp is async only, and its docs call that choice a trade of [more verbosity for better performance](https://docs.aiohttp.org/en/latest/http_request_lifecycle.html#using-a-session-as-a-best-practice). Create [one ClientSession per application](https://docs.aiohttp.org/en/latest/client_quickstart.html#make-a-request) and reuse it for every request, since each session holds its own connection pool.

urllib3 is the layer Requests runs on, with [thread safety, connection pooling, and retries](https://urllib3.readthedocs.io/en/latest/) built in. Make requests through a [PoolManager you create](https://urllib3.readthedocs.io/en/latest/user-guide.html#making-requests): the top-level `urllib3.request()` uses a module-global one, so its side effects can reach other libraries that call it too.

yarl's [URL objects are immutable](https://yarl.aio-libs.org/en/latest/#introduction): every change returns a new URL, and strings you pass in get encoded for you. aiohttp's requests [take a yarl URL](https://docs.aiohttp.org/en/latest/client_quickstart.html#make-a-request) as well as a plain string.
