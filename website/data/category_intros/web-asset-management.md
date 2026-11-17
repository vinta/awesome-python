Static files can skip a separate server: with WhiteNoise, Django static files are served by your app itself. Uploads go to cloud storage via django-storages.

How to choose:

- Static files served by your Django or other WSGI app: WhiteNoise
- User uploads on Amazon S3, Azure Storage, Google Cloud Storage, or SFTP: django-storages
- CSS and JavaScript from your Django templates, combined into one file: Django Compressor

WhiteNoise lets your app [serve its own static files](https://whitenoise.readthedocs.io/en/latest/), with no separate web server. It works with any WSGI app, with extra auto-configuration for Django. On Django, switch to its [compressed manifest storage backend](https://whitenoise.readthedocs.io/en/latest/django.html#add-compression-and-caching-support), which compresses your files and gives them hashed names, so browsers can cache them forever. Its docs advise against [pushing static files to S3](https://whitenoise.readthedocs.io/en/latest/#shouldn-t-i-be-pushing-my-static-files-to-s3-using-something-like-django-storages) with django-storages: that adds libraries, configuration, keys, and deploy steps.

django-storages is a [collection of storage backends](https://django-storages.readthedocs.io/en/latest/) for Django, covering Amazon S3 and S3-compatible services, Azure Storage, Google Cloud Storage, Dropbox, FTP, and SFTP. Each backend has its own settings: to save uploads to S3, for example, set `storages.backends.s3.S3Storage` as the [`default` backend in `STORAGES`](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#configuration-settings) and pass its settings under `OPTIONS`.

Django Compressor [combines the CSS and JavaScript](https://django-compressor.readthedocs.io/en/latest/) that your templates link or inline into one cached file, and browsers can cache that file forever. Wrap the tags in a [`{% compress %}` block](https://django-compressor.readthedocs.io/en/latest/usage.html#examples). By default it compresses during requests, but when you run several servers or [WhiteNoise serves the files](https://whitenoise.readthedocs.io/en/latest/django.html#django-compressor), turn on [offline compression](https://django-compressor.readthedocs.io/en/latest/scenarios.html#offline-compression) and run its `compress` command on deploy.

Keep user uploads out of your static files. WhiteNoise [isn't suitable for serving them](https://whitenoise.readthedocs.io/en/latest/django.html#serving-media-files): uploads served from your app's own domain are a security risk, and local disk makes scaling across machines harder. Its docs point to django-storages instead. Django's own docs recommend serving uploads [from a separate domain](https://docs.djangoproject.com/en/stable/topics/security/#user-uploaded-content), like usercontent-example.com for example.com, not a subdomain.
