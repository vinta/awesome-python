# Awesome Python

A curated list of awesome Python frameworks, libraries and resources. Inspired by [awesome-php](https://github.com/ziadoz/awesome-php).

- [Awesome Python](#awesome-python)
    - [Environment Management](#environment-management)
    - [Package Management](#package-management)
    - [Files](#files)
    - [Date and Time](#date-and-time)
    - [Text Processing](#text-processing)
    - [Natural Language Processing](#natural-language-processing)
    - [Command-line Tools](#command-line-tools)
    - [Documentation](#documentation)
    - [Imagery](#imagery)
    - [Audio](#audio)
    - [Video](#video)
    - [Geolocation](#geolocation)
    - [HTTP](#http)
    - [Database Drivers](#database-drivers)
    - [ORM](#orm)
    - [Web Frameworks](#web-frameworks)
    - [CMS](#cms)
    - [RESTful API](#restful-api)
    - [Authentication and OAuth](#authentication-and-oauth)
    - [Template Engine](#template-engine)
    - [Queue](#queue)
    - [Search](#search)
    - [Asset Management](#asset-management)
    - [Caching](#caching)
    - [Email](#email)
    - [URL Manipulation](#url-manipulation)
    - [HTML Manipulation](#html-manipulation)
    - [Web Crawling](#web-crawling)
    - [Web Content Extracting](#web-content-extracting)
    - [Networking](#networking)
    - [GUI](#gui)
    - [Logging](#logging)
    - [Testing](#testing)
    - [Code Analysis and Linter](#code-analysis-and-linter)
    - [Science and Data Aanalysis](#science-and-data-aanalysis)
    - [Machine Learning](#machine-learning)
    - [Third-party APIs](#third-party-apis)
    - [Miscellaneous](#miscellaneous)
- [Resources](#resources)
    - [Books](#books)
    - [Websites](#websites)
    - [Articles](#articles)

## Environment Management

*Libraries for Python version and environment management.*

* [pyenv](https://github.com/yyuu/pyenv) - Simple Python version management.
* [virtualenv](https://pypi.python.org/pypi/virtualenv) - A tool to create isolated Python environments.
* [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper) - A set of extensions to virtualenv

## Package Management

*Libraries for package and dependency management.*

* [pip](https://pip.pypa.io/en/latest/) / [Python Package Index](https://pypi.python.org/pypi) - The package and dependency manager.
* [wheel](http://pythonwheels.com/) - The new standard of python distribution and are intended to replace eggs.

## Files

* [mimetypes](https://docs.python.org/2/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
* [imghdr](https://docs.python.org/2/library/imghdr.html) - (Python standard library) Determine the type of an image.
* [python-magic](https://github.com/ahupp/python-magic) - A Python interface to the libmagic file type identification library.
* [path.py](https://github.com/jaraco/path.py) - A module wrapper for [os.path](https://docs.python.org/2/library/os.path.html).
* [watchdog](https://github.com/gorakhargosh/watchdog) - API and shell utilities to monitor file system events.

## Date and Time

* [arrow](https://github.com/crsmithdev/arrow) - Better dates & times for Python.
* [dateutil](https://pypi.python.org/pypi/python-dateutil) - Extensions to the standard Python [datetime](https://docs.python.org/2/library/datetime.html) module.
* [delorean](http://delorean.readthedocs.org/) - A library for clearing up the inconvenient truths that arise dealing with datetimes in Python.
* [when.py](http://whenpy.readthedocs.org/) - Providing user-friendly functions to help perform common date and time actions.
* [moment](https://github.com/zachwill/moment) - A Python library for dealing with dates/times. Inspired by [Moment.js](http://momentjs.com/).

## Text Processing

* [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
* [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
* [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) - Fuzzy String Matching.
* [esmre](https://code.google.com/p/esmre/) - Regular expression accelerator.
* [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Library for parsing, formatting, storing and validating international phone numbers.
* [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
* [shortuuid](https://github.com/stochastic-technologies/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
* [tablib](https://github.com/kennethreitz/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
* [sqlparse](https://sqlparse.readthedocs.org/) - A non-validating SQL parser. It provides support for parsing, splitting and formatting SQL statements.
* [Pygments](http://pygments.org/) - A generic syntax highlighter.
* [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that handles unicode.
* [unicode-slugify](https://github.com/mozilla/unicode-slugify) - A slugifier that generates unicode slugs. Developed by Mozilla.
* [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
* [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
* [xpinyin](https://github.com/lxneng/xpinyin) - A library to translate chinese hanzi (漢字) to pinyin (拼音).
* [pangu.py](https://github.com/vinta/pangu.py) - Spacing texts.
* [xlwt / xlrd](http://www.python-excel.org/) - A package is for writing and reading data and formatting information from Excel files.
* [XlsxWriter](https://xlsxwriter.readthedocs.org/) - A Python module for creating Excel .xlsx files.

## Natural Language Processing

* [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
* [TextBlob](http://textblob.readthedocs.org/) - Providing a consistent API for diving into common natural language processing (NLP) tasks.
* [jieba](https://github.com/fxsjy/jieba#jieba-1) - Chinese Words Segementation Utilities.
* [snownlp](https://github.com/isnowfy/snownlp) - A library for processing Chinese text.
* [loso](https://github.com/victorlin/loso) - Another Chinese segmentation library.

## Command-line Tools

* [click](http://click.pocoo.org/) - A package for creating beautiful command line interfaces in a composable way.
* [clint](https://github.com/kennethreitz/clint) - Python Command-line Application Tools.
* [docopt](http://docopt.org/) - Pythonic command line arguments parser.
* [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.

## Documentation

* [Sphinx](http://sphinx-doc.org/) - Python Documentation generator. 

## Imagery

* [pillow](http://pillow.readthedocs.org/) - Pillow is the **friendly** PIL fork. PIL is the [Python Imaging Library](http://www.pythonware.com/products/pil/).
* [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, resizing and flipping of images.
* [imgSeek](http://www.imgseek.net/) - A project for searching a collection of images using visual similarity.
* [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
* [pygram](https://github.com/ajkumar25/pygram) - Instagram-like image filters.
* [Quads](https://github.com/fogleman/Quads) - Computer art based on quadtrees.

## Audio

* [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) - Django + AWS Elastic Transcoder.
* [beets](http://beets.radbox.org/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
* [pyechonest](https://github.com/echonest/pyechonest) - Python client for the Echo Nest API.
* [dejavu](https://github.com/worldveil/dejavu) - Audio fingerprinting and recognition.
* [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
* [audioread](https://github.com/sampsyo/audioread) - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
* [mutagen](https://code.google.com/p/mutagen/) - A Python module to handle audio metadata.
* [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.

## Video

* [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
* [shorten.tv](http://www.shorten.tv/) - Video summarization.
* [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.

## Geolocation

* [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
* [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.

## HTTP

* [requests](http://docs.python-requests.org/) - HTTP Requests for Humans™.
* [httpie](https://github.com/jakubroztocil/httpie) - A command line HTTP client, a user-friendly cURL replacement.

## Database Drivers

* [mysql-python](http://sourceforge.net/projects/mysql-python/) - MySQL database connector for Python.
* [psycopg2](http://initd.org/psycopg/) - The most popular PostgreSQL adapter for the Python.
* [PyMongo](http://docs.mongodb.org/ecosystem/drivers/python/) - The official Python client for MongoDB.
* [redis-py](https://github.com/andymccurdy/redis-py) - Redis Python Client.

## ORM

* Relational Databases
    * [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
    * [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
* NoSQL Databases
    * [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    * [redisco](https://github.com/kiddouk/redisco) - A Python Library for Simple Models and Containers Persisted in Redis.

## Web Frameworks

* [Django](https://www.djangoproject.com/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* [Flask](http://flask.pocoo.org/) - A microframework for Python.
* [Bottle](http://bottlepy.org/) - A fast, simple and lightweight WSGI micro web-framework.
* [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.

## CMS

* [Mezzanine](http://mezzanine.jupo.org/) - A powerful, consistent, and flexible content management platform. Built using the Django framework.
* [Wagtail](http://wagtail.io/) - A Django content management system
* [django-oscar](http://oscarcommerce.com/) - An open-source ecommerce framework for Django.

## RESTful API

* [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit that makes it easy to build Web APIs.
* [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
* [flask-api](http://www.flaskapi.org/) - An implementation of the same web browsable APIs that django-rest-framework provides.
* [flask-restful](http://flask-restful.readthedocs.org/) - An extension for Flask that adds support for quickly building REST APIs.
* [falcon](http://falconframework.org/) - A high-performance Python framework for building cloud APIs and web app backends.

## Authentication and OAuth

* [python-social-auth](https://github.com/omab/python-social-auth) - An easy-to-setup social authentication mechanism with support for several frameworks and auth providers.
* [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) - OAuth2 goodies for the Djangonauts.
* [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) - Providing OAuth2 access to Django app.
* [python-oauth2](https://github.com/simplegeo/python-oauth2) - A fully tested, abstract interface to creating OAuth clients and servers.

## Template Engine

* [Jinja2](http://jinja.pocoo.org/docs/) - A modern and designer friendly templating language.

## Queue

* [celery](http://www.celeryproject.org/) - An asynchronous task queue / job queue based on distributed message passing.
* [rq](http://python-rq.org/) - Simple job queues for Python.

## Search

* [django-haystack](https://github.com/toastdriven/django-haystack) - Modular search for Django.
* [elasticsearch-py](http://www.elasticsearch.org/guide/en/elasticsearch/client/python-api/current/) - The official low-level Python client for [Elasticsearch](http://www.elasticsearch.org/).
* [solrpy](https://code.google.com/p/solrpy/) - A Python client for [solr](http://lucene.apache.org/solr/).
* [Whoosh](http://whoosh.readthedocs.org/) - A fast, pure Python search engine library.

## Asset Management

* TODO

## Caching

* TODO

## Email

* [imbox](https://github.com/martinrusev/imbox) - Python IMAP for Humans.
* [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) - Django email backend with AWS SES and Celery.

## Internationalization

* TODO

## URL Manipulation

* [furl](https://github.com/gruns/furl) - A small Python library that makes manipulating URLs simple.
* [purl](https://github.com/codeinthehole/purl) - A simple, immutable URL class with a clean API for interrogation and manipulation.

## HTML Manipulation

* [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
* [lxml](http://lxml.de/) - A very fast, easy-to-use and versatile library for handling HTML and XML.
* [html5lib](https://github.com/html5lib/html5lib-python) - A standards-compliant library for parsing and serializing HTML documents and fragments.
* [pyquery](https://github.com/gawel/pyquery) - A jQuery-like library for parsing HTML.
* [cssutils](https://pypi.python.org/pypi/cssutils/) - A CSS library for Python.
* [MarkupSafe](https://github.com/mitsuhiko/markupsafe) - Implements a XML/HTML/XHTML Markup safe string for Python.
* [bleach](http://bleach.readthedocs.org/) - A whitelist-based HTML sanitization and text linkification library.

## Web Crawling

* [Scrapy](http://scrapy.org/) - A fast high-level screen scraping and web crawling framework.
* [portia](https://github.com/scrapinghub/portia) - Visual scraping for Scrapy.
* [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
* [RoboBrowser](https://github.com/jmcarp/robobrowser) - A simple, Pythonic library for browsing the web without a standalone web browser. 

## Web Content Extracting

* [newspaper](https://github.com/codelucas/newspaper) - News extraction, article extraction and content curation in Pythom.
* [html2text](https://github.com/aaronsw/html2text) - Convert HTML to Markdown-formatted text.
* [python-goose](https://github.com/grangier/python-goose) - HTML Content / Article Extractor.
* [lassie](https://github.com/michaelhelmick/lassie) - Web Content Retrieval for Humans.
* [micawber](https://github.com/coleifer/micawber) - A small library for extracting rich content from URLs.
* [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.
* [Haul](https://github.com/vinta/Haul) - An Extensible Image Crawler.
* [python-readability](https://github.com/buriy/python-readability) - Fast Python port of arc90's readability tool.

## Forms

* [django-crispy-forms](http://django-crispy-forms.readthedocs.org/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
* [WTForms](http://wtforms.readthedocs.org/) - A flexible forms validation and rendering library.

## Networking

* [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
* [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.
* [Tornado](http://www.tornadoweb.org/) - A Web framework and asynchronous networking library.

## DevOps Tools

* [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
* [Ansible](http://www.ansible.com/) - An IT automation tool.
* [SaltStack](http://www.saltstack.com/community/) - Infrastructure automation and management system.
* [Fabric](http://www.fabfile.org/) - Tool for streamlining the use of SSH for application deployment or systems administration tasks.
* [Fabtools](http://fabtools.readthedocs.org/) - Tools for writing awesome Fabric files.
* [Supervisor](http://supervisord.org/) - A Process Control System.
* [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.

## GUI

* [PySide](http://qt-project.org/wiki/pyside) - Python bindings for the Qt cross-platform application and UI framework
* [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.

## Logging

* [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python
* [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.
* [Raven](http://raven.readthedocs.org/) - A Python client for Sentry.

## Testing

* Testing Frameworks
    * [unittest](https://docs.python.org/2/library/unittest.html) - (Python standard library) Unit testing framework.
    * [nose](https://nose.readthedocs.org/) - nose extends unittest.
    * [pytest](http://pytest.org/) - A mature full-featured Python testing tool.
* Mock
    * [mock](https://pypi.python.org/pypi/mock) - A Python Mocking and Patching Library for Testing.
    * [responses](https://github.com/dropbox/responses) - A utility library for mocking out the requests Python library.
* Fake Data
    * [faker](http://www.joke2k.net/faker/) - A Python package that generates fake data.
    * [model_mommy](https://model-mommy.readthedocs.org/) - Creating random fixtures for testing in Django.
* Code Coverage
    * [coverage](https://pypi.python.org/pypi/coverage) - Code coverage measurement.

## Code Analysis and Linter

* [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
* [Pylint](http://www.pylint.org/) - A source code analyzer.

## Science and Data Aanalysis

* [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
* [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
* [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
* [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
* [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
* [PyMC](https://github.com/pymc-devs/pymc) - A module for Bayesian statistical modeling and model fitting which focuses on advanced Markov chain Monte Carlo fitting algorithms.

## Machine Learning

* [scikit-learn](http://scikit-learn.org/) - A Python module for machine learning built on top of SciPy.
* [pattern](https://github.com/clips/pattern) - Web mining module for Python.
* [NuPIC](http://numenta.org/) - Numenta Platform for Intelligent Computing.
* [Pylearn2](http://deeplearning.net/software/pylearn2/) - A Machine Learning library based on [Theano](https://github.com/Theano/Theano).
* [PyBrain](https://github.com/pybrain/pybrain) - Another Python Machine Learning Library.
* [Crab](https://github.com/muricoca/crab) - A ﬂexible, fast recommender engine.
* [python-recsys](https://github.com/ocelma/python-recsys) - A Python library for implementing a Recommender System.

## MapReduce

* [PySpark](http://spark.apache.org/docs/latest/programming-guide.html) - The Spark Python API.
* [dpark](https://github.com/douban/dpark) - Python clone of Spark, a MapReduce alike framework in Python.

## Third-party APIs

* [boto](http://docs.pythonboto.org/) - Python interface to Amazon Web Services.
* [s3cmd](https://github.com/s3tools/s3cmd) - A command line tool for managing Amazon S3 and CloudFront.
* [twython](https://github.com/ryanmcgrath/twython) - A Python wrapper for the Twitter API.

## Development Tools

* TODO

## Miscellaneous

* [IPython](http://ipython.org/) - IPython provides a rich toolkit to help you make the most out of using Python interactively.

# Resources

## Books

* TODO

## Websites

* [r/Python](http://www.reddit.com/r/python) - News about Python.
* [pyvideo.org](http://pyvideo.org/) - Python related video indexed so you can find it.
* [The Hitchhiker's Guide to Python!](http://docs.python-guide.org/) - The answer to life, the universe, and everything.
* [Python 3 Wall of Superpowers](http://python3wos.appspot.com/) - Too many popular Python packages don't support Python 3.
* [Trending Python repositories on GitHub today](https://github.com/trending?l=python) - Good place to find new Python libraries.
* [Django Packages](https://www.djangopackages.com/) - A directory of reusable apps, sites, tools, and more for Django projects.

## Articles

* TODO

# Contributing

Your contributions are always welcome!