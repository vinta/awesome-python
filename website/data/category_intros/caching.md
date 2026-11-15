Where the cache lives picks your Python caching library: cachetools keeps it in memory, DiskCache on local disk, and dogpile.cache in Redis or Memcached.

How to choose:

- Function results cached in memory, with a size limit or expiry: cachetools
- A cache on local disk, shared by processes and kept across restarts, with no server to run: DiskCache
- One caching API over Redis, Memcached, and other backends: dogpile.cache
- A Django cache backend on local disk: DiskCache
- HTTP responses, for httpx or Requests calls or an ASGI app like FastAPI: Hishel
- Redis locks, pattern deletes, or the raw client through Django's cache: django-redis
- Django ORM querysets, invalidated when your models change: django-cacheops

### cachetools

Pick cachetools to cache function results in memory, with a size limit or an expiry time. Its decorators are [variants of the standard library's `@lru_cache`](https://cachetools.readthedocs.io/en/latest/), and the cache behind them can evict by LRU, LFU, or a per-item time-to-live. Wrap a function in [`@cached(cache=TTLCache(maxsize=1024, ttl=600))`](https://github.com/tkem/cachetools) to keep up to 1024 of its results in memory, each for 600 seconds.

### DiskCache

Pick DiskCache when cached data should survive a restart and be shared by the processes on one machine, with no cache server to run. It's a [disk and file backed cache library, written in pure Python](https://grantjenks.com/docs/diskcache/), and each `Cache` keeps its keys and values in a SQLite database and a directory. Two `Cache` objects can [open the same directory from separate processes](https://grantjenks.com/docs/diskcache/tutorial.html#cache). To cache a function's results, decorate it with `@cache.memoize(expire=...)`. In Django, set `BACKEND` to [`diskcache.DjangoCache`](https://grantjenks.com/docs/diskcache/tutorial.html#djangocache) and `LOCATION` to a directory.

### dogpile.cache

Pick dogpile.cache when your app caches in Redis, Memcached, or another backend, and you want one API across them. It provides [a generic interface to caching backends of any variety](https://dogpilecache.sqlalchemy.org/en/latest/), built around the dogpile lock. When a value expires, one caller regenerates it, while the others read the old value or wait if there is none. [Create a region](https://dogpilecache.sqlalchemy.org/en/latest/usage.html#rudimentary-usage) with `make_region()`, pass its backend and expiration time to `configure()`, and decorate functions with `@region.cache_on_arguments()`.

### Hishel

Pick Hishel to cache HTTP responses, both for the calls your code makes with httpx or Requests and for your own ASGI app. It [adds caching to httpx, Requests, and ASGI apps with minimal code changes](https://github.com/karpetrosyan/hishel), in sync or async code, and keeps responses in [SQLite or Redis](https://hishel.com/storages). Start from the integration for your library: [its cache-enabled httpx client](https://hishel.com/httpx), [an adapter you mount on a Requests session](https://hishel.com/requests), or [middleware for your FastAPI app](https://hishel.com/fastapi).

### django-redis

Pick django-redis when your Django app caches in Redis and you want Redis features through Django's cache. It's [a full-featured Redis cache and session backend for Django](https://github.com/jazzband/django-redis). [Set `BACKEND` to `django_redis.cache.RedisCache`](https://github.com/jazzband/django-redis#configure-as-cache-backend) and `LOCATION` to a `redis://` URL. On top of Django's cache API, it adds [distributed locks](https://github.com/jazzband/django-redis#locks) with `cache.lock()`, [`delete_pattern()`](https://github.com/jazzband/django-redis#scan--delete-keys-in-bulk) to delete keys by glob pattern, and [raw access to the Redis client](https://github.com/jazzband/django-redis#raw-client-access) with `get_redis_connection()`.

### django-cacheops

Pick django-cacheops to cache Django ORM querysets and have them invalidated for you. It [listens on model signals](https://github.com/Suor/django-cacheops#invalidation) and invalidates the affected caches on `save()`, `delete()`, and many-to-many changes, and it tries to keep querysets cached when a change can't affect them. It keeps this cache in Redis. Add `cacheops` to `INSTALLED_APPS`, then turn caching on per model or app in `CACHEOPS`. Its README recommends [restricting by app with `'app_name.*'`](https://github.com/Suor/django-cacheops#setup) over `'*.*'`, which can cache tables you don't know about, like the migrations table.
