Add accounts and social login to a Django app with django-allauth, and OAuth login to Flask or FastAPI with Authlib. PyJWT signs and verifies JWTs.

How to choose:

- Accounts and social login in Django: django-allauth
- Logging in through an OAuth or OpenID Connect provider from Flask or FastAPI: Authlib
- Signing and verifying JWTs: PyJWT
- Adding OAuth support to a framework or HTTP library: oauthlib
- Issuing OAuth tokens to client apps from Django: django-oauth-toolkit
- Per-object permissions you grant and query: django-guardian
- Permissions that follow from your data, like authors editing their own posts: django-rules

### django-allauth

Pick django-allauth when a Django app needs its own accounts and social login: it handles both in [one integrated app](https://docs.allauth.org/en/latest/introduction/index.html). Its [quickstart](https://docs.allauth.org/en/latest/installation/quickstart.html) has you include `allauth.urls` in your URL patterns. It also covers multi-factor authentication, plus a [headless mode](https://docs.allauth.org/en/latest/headless/introduction.html) for single-page and mobile apps.

### Authlib

Pick Authlib to log users in through an OAuth or OpenID Connect provider from a Flask or FastAPI app. It ships [web client integrations for Flask, Django, Starlette, and FastAPI](https://docs.authlib.org/en/stable/oauth2/client/index.html). They [share one API](https://docs.authlib.org/en/stable/oauth2/client/web/index.html): create an `OAuth()` registry, then call `oauth.register()` once per provider. To run your own provider in Flask, build an [authorization server](https://docs.authlib.org/en/stable/oauth2/authorization-server/index.html) with Authlib.

### PyJWT

Pick PyJWT to sign and verify JSON Web Tokens: FastAPI's [security tutorial](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/) uses it. Verify with `jwt.decode()` and an explicit `algorithms` list, which its docs say to [hard-code](https://pyjwt.readthedocs.io/en/latest/algorithms.html) instead of reading it from the token. Also [require the claims](https://pyjwt.readthedocs.io/en/latest/usage.html) you rely on, like `exp` and `iss`.

### oauthlib

Pick oauthlib only when you're adding OAuth support to a framework or HTTP library. Its FAQ says [most people use it indirectly](https://oauthlib.readthedocs.io/en/latest/faq.html). django-allauth and Django OAuth Toolkit build on it, and to call an OAuth API from your own code, oauthlib points you to a higher-level library. To write a provider with it, most of the work is [a `RequestValidator`](https://oauthlib.readthedocs.io/en/latest/oauth2/server.html) that you map to your storage.

### Django OAuth Toolkit

Pick Django OAuth Toolkit to issue OAuth 2.0 tokens to client apps from a Django project you already run. It can also [protect a Django or Django REST framework API](https://django-oauth-toolkit.readthedocs.io/en/stable/) as a resource server. To start, its [tutorial](https://django-oauth-toolkit.readthedocs.io/en/stable/tutorial/tutorial_01.html) has you include `oauth2_provider.urls` in your URL patterns.

### django-guardian

Pick django-guardian when you grant permissions on single objects and need to list them later: it stores each grant in the database. Grant one with [`assign_perm()`](https://django-guardian.readthedocs.io/en/stable/userguide/assign/), and fetch the objects a user may access with [`get_objects_for_user()`](https://django-guardian.readthedocs.io/en/stable/api/shortcuts/).

### django-rules

Pick django-rules when permissions follow from your data, like authors editing their own posts. It computes them from predicate functions, [without a database](https://github.com/dfunckt/django-rules): write a check with `@rules.predicate`, then attach it to a permission with `rules.add_perm()`. Like django-guardian, it answers through Django's own `user.has_perm()`.
