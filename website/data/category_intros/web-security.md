Sanitize HTML your users write with nh3, then add a Python web security library for response headers. secure sets CSP and HSTS once for the whole app.

How to choose:

- User-written HTML, like comments and posts, or code moving off bleach: nh3
- HTML rendered from user Markdown: nh3, run on the rendered output
- Security headers like CSP and HSTS, one policy across ASGI and WSGI apps: secure

nh3 is a Python binding to ammonia, an allowlist-based HTML sanitizer built to stop cross-site scripting from untrusted user HTML. It parses fragments the same way browsers do. Call [`nh3.clean()` on each fragment](https://nh3.readthedocs.io/en/latest/#usage), and pass `tags` and `attributes` to set what it allows, like `tags={"b"}`. When you use the same options everywhere, create an [`nh3.Cleaner`](https://nh3.readthedocs.io/en/latest/#nh3.Cleaner) once and reuse it. ammonia won't linkify bare URLs or add line breaks, so its docs say to [run a markup processor before the sanitizer](https://github.com/rust-ammonia/ammonia#html-sanitization): render Markdown first, then clean the HTML it outputs.

secure keeps all your security headers in one policy object, instead of header strings copied across handlers and hooks. Start from `Secure.with_default_headers()`, which its docs call [the recommended starting point](https://github.com/TypeError/secure/blob/main/docs/usage.md#start-with-a-preset), configure it once, and reuse it everywhere. [Prefer its ASGI or WSGI middleware](https://github.com/TypeError/secure/blob/main/docs/frameworks.md#how-to-choose-an-integration-style) to cover the whole app, and set headers per response when you're inside an existing hook or view. The defaults are only a starting point: [adjust the Content Security Policy](https://github.com/TypeError/secure#why-use-secure) for the scripts, styles, and third-party services your app really uses. Then [test a stricter policy against the real app](https://github.com/TypeError/secure/blob/main/docs/usage.md#build-an-explicit-configuration) before rollout.

Use both, with sanitizing as the main defense. OWASP says to [sanitize HTML when users author it](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#html-sanitization), and to treat CSP as [an additional layer of defense](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#other-controls), never the primary one.
