Every response your app sends should carry security headers, and a Python web security library like secure defines them once for Django, Flask, or FastAPI.

How to choose:

- FastAPI or Starlette: secure's ASGI middleware
- Django, Flask, and other frameworks: secure in a response hook or middleware
- Most apps: the default BALANCED preset
- Tighter CSP and stronger isolation: the STRICT preset

secure lets you [keep one `Secure` policy object instead of scattered header strings](https://typeerror.com/secure/), and applies it through ASGI middleware, WSGI middleware, or your framework's response hooks. Start with `Secure.with_default_headers()`, which matches `Preset.BALANCED`, [the recommended default for most applications](https://github.com/TypeError/secure/blob/main/docs/usage.md#start-with-a-preset). [Review the headers it generates, and move stricter only when needed](https://typeerror.com/secure/#presets): `Preset.STRICT` tightens the CSP and isolation.

The framework guide says to [prefer middleware when your framework makes it easy](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#how-to-choose-an-integration-style) and you want app-wide coverage. On FastAPI, [add `SecureASGIMiddleware` with `app.add_middleware()`](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#fastapi). On Flask, [call `set_headers(response)` in an `after_request` hook](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#flask). On Django, write [a small Django middleware class](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#django) that calls `set_headers()` and register it in `MIDDLEWARE`. For a framework the guide doesn't cover, [configure one `Secure` instance and apply it to the response as late as possible](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#custom-frameworks) before it's sent.

The defaults are [a starting point, not a substitute for a review against your own app](https://typeerror.com/secure/). Adjust the Content Security Policy in particular for the scripts, styles, assets, and third-party services your app actually uses. Build it with the `ContentSecurityPolicy` builder instead of a header string, and [test a stricter policy against the real app before rollout](https://github.com/TypeError/secure/blob/main/docs/usage.md#build-an-explicit-configuration).

Security headers help the browser enforce transport, embedding, and content-loading rules, but they [don't replace output encoding, CSRF protection, authentication, or input validation](https://github.com/TypeError/secure/blob/main/docs/security_considerations.md). For web security materials beyond Python libraries, see [awesome-web-security](https://github.com/qazbnm456/awesome-web-security).
