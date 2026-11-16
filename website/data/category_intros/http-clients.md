Make synchronous HTTP calls with Requests; switch to httpx2 for async, HTTP/2, or one API for sync and async callers. aiohttp handles heavy async fan-out.

How to choose:

- Scripts and API calls in synchronous code: Requests
- Async code, HTTP/2, or one API for sync and async callers: httpx2
- Thousands of concurrent requests, like a large scraper: aiohttp
- Direct control over connection pools and retries, or your own client library: urllib3
- Existing httpx code: httpx, or move to httpx2 with the same API
- Building and joining URLs: yarl

### Requests

Pick Requests for scripts and API calls in synchronous code. Python's own `urllib.request` docs [recommend it](https://docs.python.org/3/library/urllib.request.html) for a higher-level HTTP interface. When you make several requests to the same host, send them through a [`requests.Session`](https://requests.readthedocs.io/en/latest/user/advanced/#session-objects), which reuses the underlying TCP connection. Requests doesn't time out by default, so its docs say [nearly all production code should set a timeout](https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts) on nearly every request. Otherwise a stalled server can hang your program.

### httpx2

Pick httpx2 when code needs async, HTTP/2, or one client API shared by sync and async callers. It has sync and async clients with a [broadly Requests-compatible API](https://pydantic.dev/docs/httpx2/get-started/), and [HTTP/2 support](https://pydantic.dev/docs/httpx2/guides/http2/) you turn on when you want it. Its docs say to use a [client instance](https://pydantic.dev/docs/httpx2/advanced/clients/) for anything beyond experiments and one-off scripts. `httpx2.Client` takes the place of `requests.Session`. Unlike Requests, it [enforces timeouts by default](https://pydantic.dev/docs/httpx2/advanced/timeouts/).

### aiohttp

Pick aiohttp for async code with hundreds or thousands of requests in flight, like a crawler or a large scraper. It's an asyncio HTTP client and server with no sync API. Code with both sync and async callers ends up with two clients, so pick httpx2 there. aiohttp's docs say to [create one `ClientSession` per application](https://docs.aiohttp.org/en/stable/client_quickstart.html) and reuse it for every request, never a new session per request.

### urllib3

Use urllib3 on its own when you want direct control over connection pools and retries, or you're building your own client library. Most code gets it through Requests, which [runs on urllib3](https://requests.readthedocs.io/en/latest/user/advanced/#transport-adapters). urllib3's docs start with a [`urllib3.PoolManager`](https://urllib3.readthedocs.io/en/stable/user-guide.html#making-requests), which you need to make requests.

### httpx

Keep httpx in code already built on it, and start new code on httpx2. httpx2 has [the same public API](https://pydantic.dev/docs/httpx2/get-started/migration/), so moving over means replacing httpx with httpx2 in your dependencies and your imports.

### yarl

Pick yarl when your code builds or edits URLs. A yarl URL is an [immutable object](https://yarl.aio-libs.org/en/stable/api/#new-url-generation): every change returns a new URL, its parts are encoded for you, and `/` joins path segments. aiohttp depends on yarl, and its request methods take a `yarl.URL` as well as a string.
