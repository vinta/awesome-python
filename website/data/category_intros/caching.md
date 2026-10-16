Expensive function calls get cached in memory by one cachetools decorator. On disk, with no server, no Python caching library asks less of you than DiskCache.

How to choose:

- Memoizing a function in one process, with a size limit or an expiry time: cachetools
- A persistent cache on local disk that several processes share: DiskCache
- A Django cache backend on local disk: DiskCache
- A Django cache and session store on Redis: django-redis
- Caching HTTP responses in HTTPX or Requests, or setting cache headers in FastAPI: Hishel
- Django ORM queries cached in Redis and invalidated when the data changes: Cacheops

cachetools offers [variants of the standard library's `@lru_cache` decorator](https://cachetools.readthedocs.io/en/latest/). Its cache classes have a maximum size and drop items by different rules, like least recently used or a per-item time-to-live. Wrap a function in `@cached` with one of them: the README's `@cached(cache=TTLCache(maxsize=1024, ttl=600))` [keeps results for ten minutes](https://github.com/tkem/cachetools). To keep the `lru_cache` API instead, use the [`cachetools.func` decorators](https://cachetools.readthedocs.io/en/latest/#module-cachetools.func).

DiskCache keeps keys and values in [a SQLite database and a directory of files](https://grantjenks.com/docs/diskcache/), with no server process to run. Point a `Cache` at a directory, and [other threads and processes that open the same directory](https://grantjenks.com/docs/diskcache/tutorial.html#tutorial-cache) share its entries. Its `memoize()` decorator takes [arguments like `lru_cache`'s](https://grantjenks.com/docs/diskcache/tutorial.html#tutorial-fanoutcache), plus an expiry time. In Django, [set `diskcache.DjangoCache` as the `BACKEND`](https://grantjenks.com/docs/diskcache/tutorial.html#tutorial-djangocache) and a directory as the `LOCATION`.

django-redis is a [full-featured Redis cache and session backend](https://github.com/jazzband/django-redis#introduction) for Django. [Set `django_redis.cache.RedisCache` as the `BACKEND`](https://github.com/jazzband/django-redis#configure-as-cache-backend) and a redis-py URL like `redis://127.0.0.1:6379/1` as the `LOCATION`. Sessions then need no extra backend: [point `SESSION_ENGINE` at Django's cache sessions](https://github.com/jazzband/django-redis#configure-as-session-backend), and they live in Redis too. Its clients, parsers, and serializers [are pluggable](https://github.com/jazzband/django-redis#why-use-django-redis).

Hishel caches HTTP responses [by RFC 9111](https://hishel.com/overview.html), the rules browsers follow. It works in sync and async code, and comes with a backend that stores responses in SQLite. In HTTPX, [use `SyncCacheClient` or `AsyncCacheClient`](https://hishel.com/httpx.html#cache-clients), drop-in replacements for `Client` and `AsyncClient`. In Requests, [mount its `CacheAdapter`](https://hishel.com/requests.html#quick-start) on a `Session`. In FastAPI, [the `cache()` dependency](https://hishel.com/fastapi.html) sends Cache-Control headers to browsers and CDNs, and Hishel's ASGI middleware adds a cache on your server.

Cacheops caches Django ORM queries in Redis and [invalidates them on `save()`, `delete()`, and m2m changes](https://github.com/Suor/django-cacheops#invalidation), only where a change could affect the result. Add `cacheops` to `INSTALLED_APPS`, then set `CACHEOPS_REDIS` and [a `CACHEOPS` profile per app](https://github.com/Suor/django-cacheops#setup) like `'app_name.*'`. Profiles with `ops` cache those queries automatically. To cache by hand, [call `.cache()` on a queryset, or decorate a function with `@cached_as`](https://github.com/Suor/django-cacheops#usage), and it still invalidates with the model.
