Clean user-submitted HTML with nh3, and define HTTP security headers once with secure. For CORS, add Flask-CORS to Flask or django-cors-headers to Django.

How to choose:

- HTML your users write, like rich-text comments, or code moving off Bleach: nh3
- One set of security headers across ASGI or WSGI apps: secure
- CORS headers for a Flask app: flask-cors
- CORS headers for a Django app: django-cors-headers

### nh3

Pick nh3 to clean HTML your users write, like posts from a rich-text editor. It wraps ammonia, a Rust sanitizer. Bleach's original author calls the pair [fantastic, fast alternatives](https://github.com/mozilla/bleach/issues/698#issuecomment-1658600990) to Bleach. Start with [`nh3.clean()`](https://nh3.readthedocs.io/en/latest/#usage), which strips the tags and attributes it doesn't allow from an HTML fragment. Narrow its allowlist to the tags and attributes your editor actually produces.

### secure

Pick secure to [define HTTP security headers once](https://typeerror.com/secure/) and apply the same policy across Python web apps, through its ASGI or WSGI middleware or a framework's response hook. On Django, the framework's [built-in middleware](https://docs.djangoproject.com/en/stable/ref/middleware/) can already set headers like HSTS, X-Frame-Options, and Content Security Policy, so check what it covers first. Start from [`Secure.with_default_headers()`](https://github.com/TypeError/secure/blob/main/docs/usage.md), the preset its docs recommend. Then [adjust its Content Security Policy](https://github.com/TypeError/secure#why-use-secure) to the scripts, styles, and third-party services your app actually uses. Headers [don't replace output encoding](https://github.com/TypeError/secure/blob/main/docs/security_considerations.md), so sanitize user HTML with nh3 too.

### Flask-CORS

Pick Flask-CORS when JavaScript on another domain calls your Flask app. Initialize the extension with [`CORS(app)`](https://flask-cors.corydolphin.com/), which by default turns CORS on for every route, origin, and method.

### django-cors-headers

Pick django-cors-headers for CORS in a Django app: Django [doesn't include CORS support](https://docs.djangoproject.com/en/stable/topics/security/#cross-origin-resource-sharing-cors) and lists this package on its [ecosystem page](https://www.djangoproject.com/community/ecosystem/). Put its [`CorsMiddleware`](https://github.com/adamchainz/django-cors-headers#setup) as high as possible in your middleware list, before anything that can return a response, or those responses go out without CORS headers.

### Locking down CORS

Apps on FastAPI or Starlette need neither pick, since both ship [CORS middleware](https://fastapi.tiangolo.com/tutorial/cors/). Whichever you use, list the origins allowed to call you instead of allowing all of them. django-cors-headers warns that allowing every origin [can be dangerous](https://github.com/adamchainz/django-cors-headers#cors_allow_all_origins-bool), and Flask-CORS allows every origin until you pass your own list. Both picks leave cookies off by default, so keep them off unless your frontend needs them. When you turn them on, [add CSRF protection](https://flask-cors.corydolphin.com/#using-cors-with-cookies), as Flask-CORS's docs advise. [Django's CSRF checks don't read your CORS settings](https://github.com/adamchainz/django-cors-headers#csrf-integration), so add those sites to Django's CSRF trusted origins too.
