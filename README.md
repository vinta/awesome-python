# Awesome Python

A curated list of awesome Python frameworks, libraries and software. Inspired by [awesome-php](https://github.com/ziadoz/awesome-php).

- [Awesome Python](#awesome-python)
    - [Admin Panels](#admin-panels)
    - [Algorithms and Design Patterns](#algorithms-and-design-patterns)
    - [Anti-spam](#anti-spam)
    - [Asset Management](#asset-management)
    - [Audio](#audio)
    - [Authentication and OAuth](#authentication-and-oauth)
    - [Build Tools](#build-tools)
    - [Caching](#caching)
    - [CMS](#cms)
    - [Code Analysis and Linter](#code-analysis-and-linter)
    - [Command-line Tools](#command-line-tools)
    - [Configuration](#configuration)
    - [Cryptography](#cryptography)
    - [Data Validation](#data-validation)
    - [Data Visualization](#data-visualization)
    - [Database Drivers](#database-drivers)
    - [Database](#database)
    - [Date and Time](#date-and-time)
    - [Debugging Tools](#debugging-tools)
    - [DevOps Tools](#devops-tools)
    - [Distribution](#distribution)
    - [Documentation](#documentation)
    - [Downloader](#downloader)
    - [Editor Plugins](#editor-plugins)
    - [Email](#email)
    - [Environment Management](#environment-management)
    - [Files](#files)
    - [Foreign Function Interface](#foreign-function-interface)
    - [Forms](#forms)
    - [Game Development](#game-development)
    - [Geolocation](#geolocation)
    - [GUI](#gui)
    - [High Performance](#high-performance)
    - [HTML Manipulation](#html-manipulation)
    - [HTTP](#http)
    - [Imagery](#imagery)
    - [Internationalization](#internationalization)
    - [Logging](#logging)
    - [Machine Learning](#machine-learning)
    - [MapReduce](#mapreduce)
    - [Miscellaneous](#miscellaneous)
    - [Natural Language Processing](#natural-language-processing)
    - [Networking](#networking)
    - [ORM](#orm)
    - [Package Management](#package-management)
    - [Processes and Threads](#processes-and-threads)
    - [Queue](#queue)
    - [RESTful API](#restful-api)
    - [Science and Data Analysis](#science-and-data-analysis)
    - [Search](#search)
    - [Tagging](#tagging)
    - [Template Engine](#template-engine)
    - [Testing](#testing)
    - [Text Processing](#text-processing)
    - [Third-party APIs](#third-party-apis)
    - [URL Manipulation](#url-manipulation)
    - [Video](#video)
    - [Web Content Extracting](#web-content-extracting)
    - [Web Crawling](#web-crawling)
    - [Web Frameworks](#web-frameworks)
    - [WebSocket](#websocket)
- [Resources](#resources)
    - [Twitter](#twitter)
    - [Websites](#websites)
    - [Weekly](#weekly)

## Environment Management

*Libraries for Python version and environment management.*

* [pyenv](https://github.com/yyuu/pyenv) - Simple Python version management.
* [virtualenv](https://pypi.python.org/pypi/virtualenv) - A tool to create isolated Python environments.
* [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper) - A set of extensions to virtualenv

## Package Management

*Libraries for package and dependency management.*

* [pip](https://pip.pypa.io/en/latest/) / [Python Package Index](https://pypi.python.org/pypi) - The package and dependency manager.
* [wheel](http://pythonwheels.com/) - The new standard of python distribution and are intended to replace eggs.

## Distribution

*Libraries to create packaged executables for release distribution.*

* [cx-Freeze](http://cx-freeze.readthedocs.org/) - Freezes Python scripts (cross-platform)
* [py2app](http://svn.pythonmac.org/py2app/py2app/trunk/doc/index.html) - Freezes Python scripts (Mac OS X)
* [py2exe](http://www.py2exe.org/) - Freezes Python scripts (Windows)

## Files

*Libraries for file manipulation and MIME type detection.*

* [imghdr](https://docs.python.org/2/library/imghdr.html) - (Python standard library) Determine the type of an image.
* [mimetypes](https://docs.python.org/2/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
* [path.py](https://github.com/jaraco/path.py) - A module wrapper for [os.path](https://docs.python.org/2/library/os.path.html).
* [pathlib](https://pathlib.readthedocs.org/en/pep428/) - An cross-platform, object-oriented path library (included in Python 3.4)
* [python-magic](https://github.com/ahupp/python-magic) - A Python interface to the libmagic file type identification library.
* [Unipath](https://github.com/mikeorr/Unipath) - An object-oriented approach to file/directory operations.
* [watchdog](https://github.com/gorakhargosh/watchdog) - API and shell utilities to monitor file system events.

## Date and Time

*Libraries for working with dates and times.*

* [arrow](https://github.com/crsmithdev/arrow) - Better dates & times for Python.
* [dateutil](https://pypi.python.org/pypi/python-dateutil) - Extensions to the standard Python [datetime](https://docs.python.org/2/library/datetime.html) module.
* [delorean](https://github.com/myusuf3/delorean/) - A library for clearing up the inconvenient truths that arise dealing with datetimes in Python.
* [moment](https://github.com/zachwill/moment) - A Python library for dealing with dates/times. Inspired by [Moment.js](http://momentjs.com/).
* [when.py](https://github.com/dirn/When.py) - Providing user-friendly functions to help perform common date and time actions.

## Text Processing

*Libraries for parsing and manipulating texts.*

* General
    * [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
    * [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
    * [esmre](https://code.google.com/p/esmre/) - Regular expression accelerator.
    * [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) - Fuzzy String Matching.
    * [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
    * [pangu.py](https://github.com/vinta/pangu.py) - Spacing texts.
    * [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that handles unicode.
    * [shortuuid](https://github.com/stochastic-technologies/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
    * [unicode-slugify](https://github.com/mozilla/unicode-slugify) - A slugifier that generates unicode slugs. Developed by Mozilla.
    * [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
    * [xpinyin](https://github.com/lxneng/xpinyin) - A library to translate chinese hanzi (漢字) to pinyin (拼音).
* Specific Format
    * [PDFMiner](https://github.com/euske/pdfminer) - A tool for extracting information from PDF documents.
    * [python-docx](https://github.com/mikemaccana/python-docx) - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
    * [PyYAML](http://pyyaml.org/) - YAML implementations for Python.
    * [tablib](https://github.com/kennethreitz/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
    * [XlsxWriter](https://xlsxwriter.readthedocs.org/) - A Python module for creating Excel .xlsx files.
    * [xlwt](https://github.com/python-excel/xlwt) / [xlrd](https://github.com/python-excel/xlrd) - Packages is for writing and reading data and formatting information from Excel files.
* Parser
    * [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Library for parsing, formatting, storing and validating international phone numbers.
    * [Pygments](http://pygments.org/) - A generic syntax highlighter.
    * [python-nameparser](https://github.com/derek73/python-nameparser) - A simple Python module for parsing human names into their individual components.
    * [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
    * [schema](https://github.com/halst/schema) - A library for validating Python data structures.
    * [sqlparse](https://sqlparse.readthedocs.org/) - A non-validating SQL parser.

## Natural Language Processing

*Libraries for working with human languages.*

* [jieba](https://github.com/fxsjy/jieba#jieba-1) - Chinese Words Segementation Utilities.
* [loso](https://github.com/victorlin/loso) - Another Chinese segmentation library.
* [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
* [Pattern](http://www.clips.ua.ac.be/pattern) - A web mining module for the Python programming language. It has tools for natural language processing, machine learning, among others.
* [SnowNLP](https://github.com/isnowfy/snownlp) - A library for processing Chinese text.
* [TextBlob](http://textblob.readthedocs.org/) - Providing a consistent API for diving into common natural language processing (NLP) tasks. Stands on the giant shoulders of NLTK and Pattern, and plays nicely with both.

## Configuration

*Libraries for storing configuration options.*

* [config](http://www.red-dove.com/config-doc/) - Hierarchical config from the author of [logging](https://docs.python.org/2/library/logging.html).
* [ConfigObj](http://www.voidspace.org.uk/python/configobj.html) - INI file parser with validation.
* [ConfigParser](https://docs.python.org/2/library/configparser.html) - (Python standard library) INI file parser.
* [profig](http://profig.readthedocs.org/) - Config from multiple formats with value conversion.

## Command-line Tools

*Libraries for building command line utilities.*

* [click](http://click.pocoo.org/) - A package for creating beautiful command line interfaces in a composable way.
* [clint](https://github.com/kennethreitz/clint) - Python Command-line Application Tools.
* [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.
* [docopt](http://docopt.org/) - Pythonic command line arguments parser.

## Documentation

*Libraries for generating project documentation.*

* [Mistune](https://github.com/lepture/mistune) - Fastest and full featured pure Python parsers of Markdown.
* [MkDocs](http://www.mkdocs.org/) - Markdown friendly documentation generator.
* [Python-Markdown](https://github.com/waylan/Python-Markdown) - A Python implementation of John Gruber’s Markdown.
* [reStructuredText](http://docutils.sourceforge.net/rst.html) - Markup Syntax and Parser Component of Docutils.
* [Sphinx](http://sphinx-doc.org/) - Python Documentation generator.

## Imagery

*Libraries for manipulating images.*

* [imgSeek](http://www.imgseek.net/) - A project for searching a collection of images using visual similarity.
* [nude.py](https://github.com/hhatto/nude.py) - Nudity detection.
* [pillow](http://pillow.readthedocs.org/) - Pillow is the **friendly** PIL fork. PIL is the [Python Imaging Library](http://www.pythonware.com/products/pil/).
* [pyBarcode](https://pythonhosted.org/pyBarcode/) - Create barcodes in python without needing PIL.
* [pygram](https://github.com/ajkumar25/pygram) - Instagram-like image filters.
* [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
* [Quads](https://github.com/fogleman/Quads) - Computer art based on quadtrees.
* [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, resizing and flipping of images.
* [wand](https://github.com/dahlia/wand) - Python bindings for MagickWand, C API for ImageMagick.

## Audio

*Libraries for manipulating audio.*

* [audioread](https://github.com/sampsyo/audioread) - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
* [beets](http://beets.radbox.org/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
* [dejavu](https://github.com/worldveil/dejavu) - Audio fingerprinting and recognition.
* [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) - Django + AWS Elastic Transcoder.
* [mutagen](https://code.google.com/p/mutagen/) - A Python module to handle audio metadata.
* [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
* [pyechonest](https://github.com/echonest/pyechonest) - Python client for the [Echo Nest](http://developer.echonest.com/docs/) API.
* [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.

## Video

*Libraries for manipulating video and GIFs.*

* [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
* [shorten.tv](http://www.shorten.tv/) - Video summarization.

## Geolocation

*Libraries for geocoding addresses and working with latitudes and longitudes.*

* [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
* [GeoIP](https://github.com/maxmind/geoip-api-python) - Python API for MaxMind GeoIP Legacy Database.
* [geojson](https://github.com/frewsxcv/python-geojson) - Python bindings and utlities for GeoJSON.
* [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.
* [pygeoip](https://github.com/appliedsec/pygeoip) - Pure Python GeoIP API.

## HTTP

*Libraries for working with HTTP.*

* Clients
    * [httpie](https://github.com/jakubroztocil/httpie) - A command line HTTP client, a user-friendly cURL replacement.
    * [requests](http://docs.python-requests.org/) - HTTP Requests for Humans™.
* WSGI Servers
    * [bjoern](http://pypi.python.org/pypi/bjoern) - Asynchronous, very fast and written in C.
    * [cherrypy](http://www.cherrypy.org/) - Multi-threaded and very stable.
    * [diesel](http://dieselweb.org/) - Asynchronous (greenlets).
    * [eventlet](http://eventlet.net/) - Asynchronous framework with WSGI support.
    * [fapws3](http://www.fapws.org/) - Asynchronous (network side only), written in C.
    * [gevent](http://www.gevent.org/) - Asynchronous (greenlets).
    * [gunicorn](http://pypi.python.org/pypi/gunicorn) - Pre-forked, partly written in C.
    * [meinheld](http://pypi.python.org/pypi/meinheld) - Asynchronous, partly written in C.
    * [paste](http://pythonpaste.org/) - Multi-threaded, stable, tried and tested.
    * [rocket](http://pypi.python.org/pypi/rocket) - Multi-threaded.
    * [tornado](http://www.tornadoweb.org/) - Asynchronous, powers some parts of Facebook.
    * [twisted](http://twistedmatrix.com/) - Asynchronous, well tested but... twisted.
    * [waitress](http://readthedocs.org/docs/waitress/en/latest/) - Multi-threaded, poweres Pyramid.
    * [wsgiref](http://docs.python.org/library/wsgiref.html) - (Python standard library) WSGI reference implementation, single-threaded.

## Database

*Databases implemented in Python.*

* [ZODB](http://www.zodb.org/) - A native object database for Python. A key-value and object graph database.

## Database Drivers

*Libraties for connecting and operating databases.*

* Relational Databases
    * [mysql-python](http://sourceforge.net/projects/mysql-python/) - The MySQL database connector for Python.
    * [psycopg2](http://initd.org/psycopg/) - The most popular PostgreSQL adapter for the Python.
* NoSQL Databases
    * [PyMongo](http://docs.mongodb.org/ecosystem/drivers/python/) - The official Python client for MongoDB.
    * [redis-py](https://github.com/andymccurdy/redis-py) - The Redis Python Client.

## ORM

*Libraries that implement Object-Relational Mapping or datamapping techniques.*

* Relational Databases
    * [Django Models](https://docs.djangoproject.com/en/dev/topics/db/models/) - A part of Django.
    * [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
    * [PonyORM](http://ponyorm.com) - ORM that provides a generator-oriented interface to SQL.
    * [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
* NoSQL Databases
    * [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    * [redisco](https://github.com/kiddouk/redisco) - A Python Library for Simple Models and Containers Persisted in Redis.

## Web Frameworks

*Web development frameworks.*

* [Bluebream](http://bluebream.zope.org/) - An open-source web application server, framework and library, created by the Zope community and formerly known as Zope 3.
* [Bottle](http://bottlepy.org/) - A fast, simple and lightweight WSGI micro web-framework.
* [CherryPy](http://www.cherrypy.org/) - A Minimalist Python Web Framework, HTTP/1.1-compliant and WSGI thread-pooled.
* [Django](https://www.djangoproject.com/) - The most popular web framework in Python.
* [Flask](http://flask.pocoo.org/) - A microframework for Python.
* [Grok](http://grok.zope.org/) - A framework built on the existing Zope 3 libraries, offers a lot of building blocks for web development.
* [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.
* [TurboGears](http://www.turbogears.org/) - The Web Framework that scales with you. Starts as a microframework and scales up to a fullstack solution.
* [web.py](http://webpy.org/) - A web framework for Python that is as simple as it is powerful.
* [web2py](http://www.web2py.com) - A full stack web framework and platform focused in the ease of use.
* [Zope Toolkit](http://docs.zope.org/zopetoolkit/) - A set of libraries intended for reuse by projects to develop web applications or web frameworks.

## CMS

*Content management systems*

* [django-cms](https://www.django-cms.org/en/) - An Open source enterprise content management system based on the django framework.
* [django-oscar](http://oscarcommerce.com/) - An open-source ecommerce framework for Django.
* [Mezzanine](http://mezzanine.jupo.org/) - A powerful, consistent, and flexible content management platform.
* [Opps CMS](http://oppsproject.org/) - A Django-based CMS for magazines, newspapers websites and portals with high-traffic.
* [Plone](http://plone.org/) - Content Management System built on top of the open source application server Zope and the accompanying Content Management Framework.
* [Quokka CMS](http://quokkaproject.org) - Flexible, extensible, small CMS powered by Flask and MongoDB.
* [Wagtail](http://wagtail.io/) - A Django content management system.

## RESTful API

*Libraries for developing RESTful APIs.*

* [cornice](https://cornice.readthedocs.org/en/latest/) - A REST framework for Pyramid
* [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit that makes it easy to build Web APIs.
* [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
* [eve](https://github.com/nicolaiarocci/eve) - REST API framework powered by Flask, MongoDB and good intentions.
* [falcon](http://falconframework.org/) - A high-performance Python framework for building cloud APIs and web app backends.
* [flask-api](http://www.flaskapi.org/) - An implementation of the same web browsable APIs that django-rest-framework provides.
* [flask-restful](http://flask-restful.readthedocs.org/) - An extension for Flask that adds support for quickly building REST APIs.
* [sandman](https://github.com/jeffknupp/sandman) - Automated REST APIs for existing database-driven systems.

## Authentication and OAuth

*Libraries for implementing authentications schemes.*

* [django-allauth](https://github.com/pennersr/django-allauth) - Authentication app for Django that "just works."
* [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) - OAuth2 goodies for the Djangonauts.
* [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) - Providing OAuth2 access to Django app.
* [Flask-OAuthlib](https://github.com/lepture/flask-oauthlib) - OAuth 1.0/a, 2.0 implementation of client and provider for Flask.
* [OAuthLib](https://github.com/idan/oauthlib) - A generic, spec-compliant, thorough implementation of the OAuth request-signing logic.
* [python-oauth2](https://github.com/simplegeo/python-oauth2) - A fully tested, abstract interface to creating OAuth clients and servers.
* [python-social-auth](https://github.com/omab/python-social-auth) - An easy-to-setup social authentication mechanism.
* [rauth](https://github.com/litl/rauth) - A Python library for OAuth 1.0/a, 2.0, and Ofly.

## Template Engine

*Libraries and tools for templating and lexing.*

* [Chameleon](https://chameleon.readthedocs.org/) - Chameleon is an HTML/XML template engine for Python. Modeled after ZPT, optimized for speed.
* [Genshi](http://genshi.edgewall.org/) - Python templating toolkit for generation of web-aware output.
* [Jinja2](https://github.com/mitsuhiko/jinja2) - A modern and designer friendly templating language.
* [Mako](http://www.makotemplates.org/) - Hyperfast and lightweight templating for the Python platform.
* [Spitfire](https://code.google.com/p/spitfire/) - A very fast Python template compiler.

## Queue

*Libraries for working with event and task queues.*

* [celery](http://www.celeryproject.org/) - An asynchronous task queue/job queue based on distributed message passing.
* [huey](https://github.com/coleifer/huey) - Little multi-threaded task queue.
* [mrq](https://github.com/pricingassistant/mrq) - Mr. Queue - A distributed worker task queue in Python using Redis & gevent.
* [rq](http://python-rq.org/) - Simple job queues for Python.

## Search

*Libraries and software for indexing and performing search queries on data.*

* [django-haystack](https://github.com/toastdriven/django-haystack) - Modular search for Django.
* [elasticsearch-py](http://www.elasticsearch.org/guide/en/elasticsearch/client/python-api/current/) - The official low-level Python client for [Elasticsearch](http://www.elasticsearch.org/).
* [solrpy](https://code.google.com/p/solrpy/) - A Python client for [solr](http://lucene.apache.org/solr/).
* [Whoosh](http://whoosh.readthedocs.org/) - A fast, pure Python search engine library.

## Asset Management

*Tools for managing, compressing and minifying website assets.*

* [django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline javascript or CSS into a single cached file.
* [django-storages](http://code.larlet.fr/django-storages/) - A collection of custom storage backends for Django.
* [fanstatic](http://www.fanstatic.org/en/latest/) - Packages, optimizes, and serves static file dependencies as Python packages.
* [fileconveyor](http://fileconveyor.org/) - Monitors changes, processes, and transports assets to CDNs and file storage systems.
* [webassets](http://webassets.readthedocs.org/en/latest/) - Bundles, optimizes, and manages unique cache-busting URLs for static resources.

## Caching

*Libraries for caching data.*

* [Beaker Caching & Sessions](http://beaker.readthedocs.org/en/latest/) - Beaker is a library for caching and sessions for use with web applications and stand-alone Python scripts and applications.
* [Dogpile Cache](http://dogpilecache.readthedocs.org/en/latest/) - Dogpile Cache is next generation replacement for Beaker made by same authors.
* [HermesCache](https://pypi.python.org/pypi/HermesCache) - Python caching library with tag-based invalidation and dogpile effect prevention.

## Email

*Libraries for sending and parsing email.*

* [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) - Django email backend with AWS SES and Celery.
* [flanker](https://github.com/mailgun/flanker) - A email address and Mime parsing library.
* [imbox](https://github.com/martinrusev/imbox) - Python IMAP for Humans.
* [inbox.py](https://github.com/kennethreitz/inbox.py) - Python SMTP Server for Humans.
* [lamson](https://github.com/zedshaw/lamson) - Pythonic SMTP Application Server.
* [marrow.mailer](https://github.com/marrow/marrow.mailer) - High-performance extensible mail delivery framework.

## Internationalization

*Libraries for woking with i18n.*

* [Babel](http://babel.pocoo.org/) - An internationalization library for Python.

## URL Manipulation

*Libraries for parsing URLs.*

* [furl](https://github.com/gruns/furl) - A small Python library that makes manipulating URLs simple.
* [purl](https://github.com/codeinthehole/purl) - A simple, immutable URL class with a clean API for interrogation and manipulation.
* [pyshorteners](https://github.com/ellisonleao/pyshorteners) - A pure python URL shortening lib.

## HTML Manipulation

*Libraries for working with HTML and XML.*

* [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
* [bleach](http://bleach.readthedocs.org/) - A whitelist-based HTML sanitization and text linkification library.
* [cssutils](https://pypi.python.org/pypi/cssutils/) - A CSS library for Python.
* [html5lib](https://github.com/html5lib/html5lib-python) - A standards-compliant library for parsing and serializing HTML documents and fragments.
* [lxml](http://lxml.de/) - A very fast, easy-to-use and versatile library for handling HTML and XML.
* [MarkupSafe](https://github.com/mitsuhiko/markupsafe) - Implements a XML/HTML/XHTML Markup safe string for Python.
* [pyquery](https://github.com/gawel/pyquery) - A jQuery-like library for parsing HTML.
* [xhtml2pdf](https://github.com/chrisglass/xhtml2pdf) - HTML/CSS to PDF converter.
* [xmltodict](https://github.com/martinblech/xmltodict) - Working with XML feel like you are working with JSON.

## Web Crawling

*Libraries for scraping websites.*

* [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
* [portia](https://github.com/scrapinghub/portia) - Visual scraping for Scrapy.
* [RoboBrowser](https://github.com/jmcarp/robobrowser) - A simple, Pythonic library for browsing the web without a standalone web browser.
* [Scrapy](http://scrapy.org/) - A fast high-level screen scraping and web crawling framework.

## Web Content Extracting

*Libraries for extracting web contents.*

* [Haul](https://github.com/vinta/Haul) - An Extensible Image Crawler.
* [html2text](https://github.com/aaronsw/html2text) - Convert HTML to Markdown-formatted text.
* [lassie](https://github.com/michaelhelmick/lassie) - Web Content Retrieval for Humans.
* [micawber](https://github.com/coleifer/micawber) - A small library for extracting rich content from URLs.
* [newspaper](https://github.com/codelucas/newspaper) - News extraction, article extraction and content curation in Python.
* [python-goose](https://github.com/grangier/python-goose) - HTML Content/Article Extractor.
* [python-readability](https://github.com/buriy/python-readability) - Fast Python port of arc90's readability tool.
* [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.

## Downloader

*Libraries for downloading.*

* [coursera](https://github.com/coursera-dl/coursera) - Script for downloading Coursera.org videos and naming them.
* [s3cmd](https://github.com/s3tools/s3cmd) - A command line tool for managing Amazon S3 and CloudFront.
* [you-get](http://www.soimort.org/you-get/) - A YouTube/Youku/Niconico video downloader written in Python 3.
* [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.

## Forms

*Libraries for working with forms.*

* [Deform](http://deform.readthedocs.org/en/latest/) - Python HTML form generation library influenced by the formish form generation library.
* [django-crispy-forms](http://django-crispy-forms.readthedocs.org/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
* [WTForms](http://wtforms.readthedocs.org/) - A flexible forms validation and rendering library.

## Data Validation

*Libraries for validating data. Used for forms in many cases.*

* [colander](http://docs.pylonsproject.org/projects/colander/en/latest/index.html) - A system for validating and deserializing data obtained via XML, JSON, an HTML form post or any other equally simple data serialization.
* [dictshield](https://github.com/exfm/dictshield) - A fast way to validate and trim the values in a dictionary.
* [voluptuous](https://github.com/alecthomas/voluptuous) - A Python data validation library. It is primarily intended for validating data coming into Python as JSON, YAML, etc.

## Anti-spam

*Libraries for fighting spam.*

* [django-simple-captcha](https://github.com/mbi/django-simple-captcha) - A simple and highly customizable Django app to add captcha images to any Django form.
* [django-simple-spam-blocker](https://github.com/moqada/django-simple-spam-blocker) - Simple spam blocker for Django.
* [Stopspam](https://github.com/phalt/stopspam) - Intelligent spam detection for Python.

## Tagging

*Libraries for tagging items.*

* [django-taggit](https://github.com/alex/django-taggit) - Simple tagging for Django.

## Build Tools

*Compile software from source code.*

* [buildout](http://www.buildout.org/) - A build system for creating, assembling and deploying applications from multiple parts, some of which may be non-Python-based.
* [PlatformIO](https://github.com/ivankravets/platformio) - A console tool to build code with different development platforms.
* [SCons](http://www.scons.org/) - A software construction tool.

## Admin Panels

*Libraries for administrative interfaces.*

* [Ajenti](https://github.com/Eugeny/ajenti) - The admin panel your servers deserve.
* [django-xadmin](https://github.com/sshwsfc/django-xadmin) - Drop-in replacement of Django admin comes with lots of goodies.
* [flask-admin](https://github.com/mrjoes/flask-admin) - Simple and extensible administrative interface framework for Flask.
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.

## Processes and Threads

*Libraries for woking with processes or threads*

* [envoy](https://github.com/kennethreitz/envoy) - Python Subprocesses for Humans™.
* [sh](https://github.com/amoffat/sh) - A full-fledged [subprocess](https://docs.python.org/2/library/subprocess.html) replacement for Python.

## Networking

*Libraries for network programming.*

* [diesel](https://github.com/jamwt/diesel) - Greenlet-based event I/O Framework for Python.
* [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
* [pulsar](https://github.com/quantmind/pulsar) - Event-driven concurrent framework for Python.
* [pyzmq](http://zeromq.github.io/pyzmq/) - A Python wrapper for the 0MQ message library.
* [Tornado](http://www.tornadoweb.org/) - A Web framework and asynchronous networking library.
* [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.

## WebSocket

*Libraries for woking with WebSocket.*

* [AutobahnPython](https://github.com/tavendo/AutobahnPython) - WebSocket & WAMP for Python on Twisted and [asyncio](https://docs.python.org/3/library/asyncio.html).
* [WebSocket-for-Python](https://github.com/Lawouach/WebSocket-for-Python) - WebSocket client and server library for Python 2 and 3 as well as PyPy.

## Cryptography

* [PyCA's Cryptography](https://cryptography.io/en/latest/) - cryptography is a package designed to expose cryptographic primitives and recipes to Python developers.

## GUI

*Libraries for working with graphical user interface applications.*

* [curses](https://docs.python.org/2/library/curses.html#module-curses) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
* [kivy](http://kivy.org/) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
* [pyglet](http://www.pyglet.org/) - A cross-platform windowing and multimedia library for Python.
* [PyQt](http://www.riverbankcomputing.co.uk/software/pyqt/intro) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, with support for both Qt v4 and Qt v5 frameworks.
* [PySide](http://qt-project.org/wiki/pyside) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, supporting the Qt v4 framework.
* [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter is Python's de-facto standard GUI package.
* [urwid](http://urwid.org/) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
* [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.

## Game Development

*Awesome game development libraries.*

* [Cocos2d](http://cocos2d.org/) - cocos2d is a framework for building 2D games, demos, and other graphical/interactive applications. It is based on pyglet.
* [Panda3D](https://www.panda3d.org/) - 3D game engine developed by Disney and maintained by Carnegie Mellon's Entertainment Technology Center. Written in C++, completely wrapped in Python.
* [Pygame](http://www.pygame.org/news.html) - Pygame is a set of Python modules designed for writing games.
* [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python bindings for the Ogre 3D render engine, can be used for games, simulations, anything 3D.
* [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes bindings for OpenGL and it's related APIs.
* [PySDL2](http://pysdl2.readthedocs.org/en/latest/) - A ctypes based wrapper for the SDL2 library.

## Logging

*Libraries for generating and working with log files.*

* [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python.
* [Raven](http://raven.readthedocs.org/) - The Python client for Sentry.
* [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.

## Testing

*Libraries for testing codebases and generating test data.*

* Testing Frameworks
    * [contexts](https://github.com/benjamin-hodgson/Contexts) - A modern and flexible _Behaviour-Driven-Development_ framework for Python 3.3 and above, inspired by C#'s `Machine.Specifications`.
    * [mamba](https://nestorsalceda.github.io/mamba) - The definitive testing tool for Python. Born under the banner of Behavior Driven Development (BDD).
    * [nose](https://nose.readthedocs.org/) - nose extends unittest.
    * [pytest](http://pytest.org/) - A mature full-featured Python testing tool.
    * [unittest](https://docs.python.org/2/library/unittest.html) - (Python standard library) Unit testing framework.
* Mock
    * [doublex](https://pypi.python.org/pypi/doublex) - Powerful test doubles framework for Python.
    * [mock](https://pypi.python.org/pypi/mock) - A Python Mocking and Patching Library for Testing.
    * [responses](https://github.com/dropbox/responses) - A utility library for mocking out the requests Python library.
* Fake Data
    * [faker](http://www.joke2k.net/faker/) - A Python package that generates fake data.
    * [model_mommy](https://model-mommy.readthedocs.org/) - Creating random fixtures for testing in Django.
* Code Coverage
    * [coverage](https://pypi.python.org/pypi/coverage) - Code coverage measurement.
* Load Testing
    * [locust](https://github.com/locustio/locust) - Scalable user load testing tool written in Python.
* Error Handler
    * [FuckIt.py](https://github.com/ajalt/fuckitpy) - FuckIt.py uses state-of-the-art technology to make sure your Python code runs whether it has any right to or not.

## Code Analysis and Linter

*Libraries and tools for analysing, parsing and manipulation codebases.*

* [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
* [Pylint](http://www.pylint.org/) - A source code analyzer.
* [pysonar2](https://github.com/yinwang0/pysonar2) - A type inferencer and indexer for Python.

## Debugging Tools

*Libraries for dubugging and developing.*

* [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar) - Display various debug information about the current request/response.
* [django-devserver](https://github.com/dcramer/django-devserver) - A drop-in replacement for Django's runserver.
* [ipdb](https://pypi.python.org/pypi/ipdb) - IPython-enabled pdb.
* [memory_profiler](https://github.com/fabianp/memory_profiler) - Monitor Memory usage of Python code.
* [pdb](https://docs.python.org/2/library/pdb.html) - (Python standard library) The Python Debugger.
* [pyringe](https://github.com/google/pyringe) - Debugger capable of attaching to and injecting code into Python processes.
* [winpdb](http://winpdb.org/) - A Platform Independent Python Debugger with GUI.

## Science and Data Analysis

*Libraries for scientific computing and data analyzing.*

* [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
* [Numba](http://numba.pydata.org/) - Python JIT (just in time) complier to LLVM aimed at scientific Python by the developers of Cython and NumPy.
* [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
* [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
* [PyDy](https://pydy.org/) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion based around NumPy, SciPy, IPython, and matplotlib.
* [PyMC](https://github.com/pymc-devs/pymc) - Markov Chain Monte Carlo sampling toolkit.
* [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
* [statsmodels](https://github.com/statsmodels/statsmodels) - Statistical modeling and econometrics in Python.
* [SymPy](https://github.com/sympy/sympy) - A Python library for symbolic mathematics.
* [zipline](https://github.com/quantopian/zipline) - A Pythonic algorithmic trading library.

## Data Visualization

*Libraries for visualizing data.*

* [bokeh](https://github.com/ContinuumIO/bokeh) - Interactive Web Plotting for Python.
* [d3py](https://github.com/mikedewar/d3py) - A plottling library for Python, based on [D3.js](http://d3js.org/).
* [ggplot](https://github.com/yhat/ggplot) - Same API as ggplot2 for R.
* [Kartograph.py](https://github.com/kartograph/kartograph.py) - Rendering beautiful SVG maps in Python.
* [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
* [plotly](https://plot.ly/python) - Collaborative web plotting for Python and matplotlib.
* [vincent](https://github.com/wrobstory/vincent) - A Python to Vega translator.

## Machine Learning

*Libraries for Machine Learning.*

* [Crab](https://github.com/muricoca/crab) - A ﬂexible, fast recommender engine.
* [gensim](https://github.com/piskvorky/gensim) - Topic Modelling for Humans.
* [hebel](https://github.com/hannes-brt/hebel) - GPU-Accelerated Deep Learning Library in Python.
* [NuPIC](https://github.com/numenta/nupic) - Numenta Platform for Intelligent Computing.
* [pattern](https://github.com/clips/pattern) - Web mining module for Python.
* [PyBrain](https://github.com/pybrain/pybrain) - Another Python Machine Learning Library.
* [Pylearn2](https://github.com/lisa-lab/pylearn2) - A Machine Learning library based on [Theano](https://github.com/Theano/Theano).
* [python-recsys](https://github.com/ocelma/python-recsys) - A Python library for implementing a Recommender System.
* [scikit-learn](http://scikit-learn.org/) - A Python module for machine learning built on top of SciPy.

## MapReduce

*Framworks and libraries for MapReduce.*

* [dpark](https://github.com/douban/dpark) - Python clone of Spark, a MapReduce alike framework in Python.
* [dumbo](https://github.com/klbostee/dumbo) - Python module that allows one to easily write and run Hadoop programs.
* [luigi](https://github.com/spotify/luigi) - A module that helps you build complex pipelines of batch jobs.
* [mrjob](https://github.com/Yelp/mrjob) - Run MapReduce jobs on Hadoop or Amazon Web Services.
* [PySpark](http://spark.apache.org/docs/latest/programming-guide.html) - The Spark Python API.
* [streamparse](https://github.com/Parsely/streamparse) - Run Python code against real-time streams of data. Integrates with [Apache Storm](https://storm.incubator.apache.org/).

## Third-party APIs

*Libraries for accessing third party APIs.*

* [apache-libcloud](https://libcloud.apache.org/) - One Python library for all clouds.
* [boto](https://github.com/boto/boto) - Python interface to Amazon Web Services.
* [facebook-sdk](https://github.com/pythonforfacebook/facebook-sdk) - Facebook Platform Python SDK.
* [gmail](https://github.com/charlierguo/gmail) - A Pythonic interface for Gmail.
* [google-api-python-client](https://github.com/google/google-api-python-client) - Google APIs Client Library for Python.
* [python-instagram](https://github.com/Instagram/python-instagram) - A Python Client for Instagram API.
* [soundcloud-python](https://github.com/soundcloud/soundcloud-python) - A Python wrapper around the Soundcloud API.
* [twython](https://github.com/ryanmcgrath/twython) - A Python wrapper for the Twitter API.
* [Wikipedia](https://wikipedia.readthedocs.org/en/latest/) - A Pythonic wrapper for the Wikipedia API.

## DevOps Tools

*Software and libraries for DevOps.*

* [Ansible](http://www.ansible.com/) - An IT automation tool.
* [cuisine](https://github.com/sebastien/cuisine) - Chef-like functionality for Fabric.
* [Fabric](http://www.fabfile.org/) - Tool for streamlining the use of SSH for application deployment or systems administration tasks.
* [Fabtools](https://github.com/ronnix/fabtools) - Tools for writing awesome Fabric files.
* [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
* [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.
* [SaltStack](http://www.saltstack.com/community/) - Infrastructure automation and management system.
* [Supervisor](http://supervisord.org/) - A Process Control System.

## Foreign Function Interface

*Libraries for providing foreign function interface.*

* [cffi](https://pypi.python.org/pypi/cffi) - Foreign Function Interface for Python calling C code.
* [ctypes](https://docs.python.org/2/library/ctypes.html) - (Python standard library) Foreign Function Interface for Python calling C code.

## High Performance

*Libraries for making Python faster.*

* [Cython](http://cython.org/) - Optimizing Static Complier for Python. Uses type mixins to compile Python into C or C++ modules resulting in large performance gains.
* [PyPy](http://pypy.org/) - An implmentation of Python in Python. The interpreter uses black magic to make Python very fast without having to add in additional type information.
* [Pyston](https://github.com/dropbox/pyston) - A Python implementation built using LLVM and modern JIT techniques with the goal of achieving good performance.
* [Stackless Python](http://www.stackless.com/) - An enhanced version of the Python.

## Algorithms and Design Patterns

*Collections of algorithms and design patterns.*

* [algorithms](https://github.com/nryoung/algorithms) - module of algorithms for Python.
* [python-patterns](https://github.com/faif/python-patterns) - A collection of design patterns in Python.

## Miscellaneous

*Useful libraries or tools that don't fit in the categories above.*

* [IPython](https://github.com/ipython/ipython) - IPython provides a rich toolkit to help you make the most out of using Python interactively.

## Editor Plugins

*Plugins for various editors.*

* Vim
    * [Python-mode](https://github.com/klen/python-mode) - An all in one plugin for turning Vim into a Python IDE.
* Emacs
    * TODO
* Sublime Text
    * [Anaconda](https://github.com/DamnWidget/anaconda) - Anaconda turns your Sublime Text 3 in a full featured Python development IDE.
    * [Djaneiro](https://github.com/squ1b3r/Djaneiro) - Django support for Sublime Text.
    * [SublimeJEDI](https://github.com/srusskih/SublimeJEDI) - A Sublime Text plugin to the awesome autocomplete library [Jedi](https://github.com/davidhalter/jedi).

# Resources

Where to discover new Python libraries.

## Websites

* [Django Packages](https://www.djangopackages.com/) - A directory of reusable apps, sites, tools, and more for Django projects.
* [Python 3 Wall of Superpowers](http://python3wos.appspot.com/) - Too many popular Python packages don't support Python 3.
* [r/Python](http://www.reddit.com/r/python) - News about Python.
* [Trending Python repositories on GitHub today](https://github.com/trending?l=python) - Good place to find new Python libraries.

## Weekly

* [Pycoder's Weekly](http://pycoders.com/) - A free weekly newsletter, on Fridays, for those interested in Python development and various topics around Python.
* [Python Weekly](http://www.pythonweekly.com/) - A free weekly newsletter featuring curated news, articles, new releases, jobs etc related to Python.

## Twitter

* [@getpy](https://twitter.com/getpy)
* [@planetpython](https://twitter.com/planetpython)
* [@pycoders](https://twitter.com/pycoders)
* [@pypi](https://twitter.com/pypi)
* [@PythonWeekly](https://twitter.com/PythonWeekly)

# Contributing

Your contributions are always welcome!
