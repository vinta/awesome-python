WhiteNoise lets your app serve its own Django static files, while user uploads go to cloud storage through django-storages.

How to choose:

- Static files served by your Django or other WSGI app: WhiteNoise
- User uploads kept in S3, Azure, or Google Cloud Storage: django-storages
- Combined, minified CSS and JavaScript without a JavaScript toolchain: django-compressor

### WhiteNoise

Pick WhiteNoise to have your Django app serve its own static files in production, with no separate web server or cloud bucket to set up. Django serves static files itself only in development, and its docs call that [unsuitable for production](https://docs.djangoproject.com/en/stable/howto/static-files/). Django's [Community Ecosystem page](https://www.djangoproject.com/community/ecosystem/#storage-static-files) lists WhiteNoise for serving them from your app instead. WhiteNoise [works with any WSGI app](https://whitenoise.readthedocs.io/en/latest/) and has extra auto-configuration for Django. It can also compress your files and set far-future cache headers on the ones that won't change. To start, add its middleware [directly after Django's `SecurityMiddleware`](https://whitenoise.readthedocs.io/en/latest/django.html#django-middleware).

### django-storages

Pick django-storages for the files your users upload. WhiteNoise doesn't serve them, and [its docs point you to django-storages](https://whitenoise.readthedocs.io/en/latest/django.html#serving-media-files) instead. django-storages is a collection of storage backends for Django, covering Amazon S3, Azure Storage, Google Cloud Storage, and S3-compatible services. Set [the backend for your provider](https://django-storages.readthedocs.io/en/latest/) under `STORAGES`. The same backend can also [hold your collected static files](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html), so `collectstatic` uploads them to your bucket.

### Django Compressor

Pick Django Compressor if you want CSS and JavaScript combined and minified, without keeping up with JavaScript build tools. [One of its maintainers](https://github.com/django-compressor/django-compressor/discussions/1095) says that's who it's for. If your frontend is built on a JavaScript stack or ES modules, use a JavaScript bundler instead. Wrap your template's CSS or JavaScript tags in [`{% compress css %}` or `{% compress js %}`](https://django-compressor.readthedocs.io/en/latest/usage.html), and it writes them out as one cached file. WhiteNoise [doesn't pick up new files after startup](https://whitenoise.readthedocs.io/en/latest/django.html#django-compressor), so generate them in advance with Django Compressor's offline compression.

### Putting a CDN in front

Whichever way you serve static files, put a CDN in front of them. [Django's deployment guide](https://docs.djangoproject.com/en/stable/howto/static-files/deployment/) says a CDN can often make your pages load faster.
