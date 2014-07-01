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
    - [Internationalization](#internationalization)
    - [URL Manipulation](#url-manipulation)
    - [HTML Manipulation](#html-manipulation)
    - [Web Crawling](#web-crawling)
    - [Web Content Extracting](#web-content-extracting)
    - [Forms](#forms)
    - [Anti-spam](#anti-spam)
    - [Networking](#networking)
    - [Admin Panels](#admin-panels)
    - [DevOps Tools](#devops-tools)
    - [GUI](#gui)
    - [Game Development](#game-development)
    - [Logging](#logging)
    - [Testing](#testing)
    - [Code Analysis and Linter](#code-analysis-and-linter)
    - [Debugging Tools](#debugging-tools)
    - [Science and Data Aanalysis](#science-and-data-aanalysis)
    - [Machine Learning](#machine-learning)
    - [MapReduce](#mapreduce)
    - [Third-party APIs](#third-party-apis)
    - [Algorithms and Design Patterns](#algorithms-and-design-patterns)
    - [Miscellaneous](#miscellaneous)
    - [Foreign Function Interface](#foreign-function-interface)
    - [High Performance](#high-performance)
- [Resources](#resources)
    - [Editor Plugins](#editor-plugins)
    - [Books](#books)
    - [Websites](#websites)
    - [Weekly](#weekly)
    - [Twitter](#twitter)
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

*Libraries for file manipulation and MIME type detection.*

* [mimetypes](https://docs.python.org/2/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
* [imghdr](https://docs.python.org/2/library/imghdr.html) - (Python standard library) Determine the type of an image.
* [python-magic](https://github.com/ahupp/python-magic) - A Python interface to the libmagic file type identification library.
* [path.py](https://github.com/jaraco/path.py) - A module wrapper for [os.path](https://docs.python.org/2/library/os.path.html).
* [watchdog](https://github.com/gorakhargosh/watchdog) - API and shell utilities to monitor file system events.
* [django-storages](http://code.larlet.fr/django-storages/) - A collection of custom storage backends for Django.
* [Unipath](https://github.com/mikeorr/Unipath) - An object-oriented approach to file/directory operations.

## Date and Time

*Libraries for working with dates and times.*

* [arrow](https://github.com/crsmithdev/arrow) - Better dates & times for Python.
* [dateutil](https://pypi.python.org/pypi/python-dateutil) - Extensions to the standard Python [datetime](https://docs.python.org/2/library/datetime.html) module.
* [delorean](https://github.com/myusuf3/delorean/) - A library for clearing up the inconvenient truths that arise dealing with datetimes in Python.
* [when.py](https://github.com/dirn/When.py) - Providing user-friendly functions to help perform common date and time actions.
* [moment](https://github.com/zachwill/moment) - A Python library for dealing with dates/times. Inspired by [Moment.js](http://momentjs.com/).

## Text Processing

*Libraries for parsing and manipulating texts.*

* [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
* [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
* [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) - Fuzzy String Matching.
* [esmre](https://code.google.com/p/esmre/) - Regular expression accelerator.
* [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Library for parsing, formatting, storing and validating international phone numbers.
* [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
* [shortuuid](https://github.com/stochastic-technologies/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
* [tablib](https://github.com/kennethreitz/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
* [sqlparse](https://sqlparse.readthedocs.org/) - A non-validating SQL parser.
* [Pygments](http://pygments.org/) - A generic syntax highlighter.
* [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that handles unicode.
* [unicode-slugify](https://github.com/mozilla/unicode-slugify) - A slugifier that generates unicode slugs. Developed by Mozilla.
* [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
* [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
* [xpinyin](https://github.com/lxneng/xpinyin) - A library to translate chinese hanzi (漢字) to pinyin (拼音).
* [pangu.py](https://github.com/vinta/pangu.py) - Spacing texts.
* [python-docx](https://github.com/mikemaccana/python-docx) - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
* [xlwt / xlrd](http://www.python-excel.org/) - A package is for writing and reading data and formatting information from Excel files.
* [XlsxWriter](https://xlsxwriter.readthedocs.org/) - A Python module for creating Excel .xlsx files.
* [PyYAML](http://pyyaml.org/) - YAML implementations for Python.
* [Name Parser](https://github.com/derek73/python-nameparser) - A simple Python module for parsing human names into their individual components.

## Natural Language Processing

*Libraries for working with human languages.*

* [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
* [Pattern](http://www.clips.ua.ac.be/pattern) - A web mining module for the Python programming language. It has tools for natural language processing, machine learning, among others.
* [TextBlob](http://textblob.readthedocs.org/) - Providing a consistent API for diving into common natural language processing (NLP) tasks. Stands on the giant shoulders of NLTK and Pattern, and plays nicely with both.
* [jieba](https://github.com/fxsjy/jieba#jieba-1) - Chinese Words Segementation Utilities.
* [snownlp](https://github.com/isnowfy/snownlp) - A library for processing Chinese text.
* [loso](https://github.com/victorlin/loso) - Another Chinese segmentation library.

## Command-line Tools

*Libraries for building command line utilities.*

* [click](http://click.pocoo.org/) - A package for creating beautiful command line interfaces in a composable way.
* [clint](https://github.com/kennethreitz/clint) - Python Command-line Application Tools.
* [docopt](http://docopt.org/) - Pythonic command line arguments parser.
* [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.

## Documentation

*Libraries for generating project documentation.*

* [Sphinx](http://sphinx-doc.org/) - Python Documentation generator.
* [reStructuredText](http://docutils.sourceforge.net/rst.html) - Markup Syntax and Parser Component of Docutils.
* [Python-Markdown](https://github.com/waylan/Python-Markdown) - A Python implementation of John Gruber’s Markdown.
* [MkDocs](http://www.mkdocs.org/) - Markdown friendly documentation generator.

## Imagery

*Libraries for manipulating images.*

* [pillow](http://pillow.readthedocs.org/) - Pillow is the **friendly** PIL fork. PIL is the [Python Imaging Library](http://www.pythonware.com/products/pil/).
* [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, resizing and flipping of images.
* [imgSeek](http://www.imgseek.net/) - A project for searching a collection of images using visual similarity.
* [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
* [pygram](https://github.com/ajkumar25/pygram) - Instagram-like image filters.
* [Quads](https://github.com/fogleman/Quads) - Computer art based on quadtrees.
* [nude.py](https://github.com/hhatto/nude.py) - Nudity detection.
* [wand](https://github.com/dahlia/wand) - Python bindings for MagickWand, C API for ImageMagick.

## Audio

*Libraries for manipulating audio.*

* [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) - Django + AWS Elastic Transcoder.
* [beets](http://beets.radbox.org/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
* [pyechonest](https://github.com/echonest/pyechonest) - Python client for the [Echo Nest](http://developer.echonest.com/docs/) API.
* [dejavu](https://github.com/worldveil/dejavu) - Audio fingerprinting and recognition.
* [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
* [audioread](https://github.com/sampsyo/audioread) - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
* [mutagen](https://code.google.com/p/mutagen/) - A Python module to handle audio metadata.
* [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.

## Video

*Libraries for manipulating video and GIFs.*

* [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
* [shorten.tv](http://www.shorten.tv/) - Video summarization.
* [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.
* [you-get](http://www.soimort.org/you-get/) - A YouTube/Youku/Niconico video downloader written in Python 3.
* [coursera](https://github.com/coursera-dl/coursera) - Script for downloading Coursera.org videos and naming them.


## Geolocation

*Libraries for geocoding addresses and working with latitudes and longitudes.*

* [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
* [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.
* [pygeoip](https://github.com/appliedsec/pygeoip) - Pure Python GeoIP API.
* [GeoIP](https://github.com/maxmind/geoip-api-python) - Python API for MaxMind GeoIP Legacy Database.
* [geojson](https://github.com/frewsxcv/python-geojson) - Python bindings and utlities for GeoJSON.

## HTTP

*Libraries for working with HTTP.*

* [requests](http://docs.python-requests.org/) - HTTP Requests for Humans™.
* [httpie](https://github.com/jakubroztocil/httpie) - A command line HTTP client, a user-friendly cURL replacement.

## Database Drivers

*Libraties for connecting and operating databases*

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
    * [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
    * [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
    * [PonyORM](http://ponyorm.com) - ORM that provides a generator-oriented interface to SQL.
* NoSQL Databases
    * [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    * [redisco](https://github.com/kiddouk/redisco) - A Python Library for Simple Models and Containers Persisted in Redis.

## Web Frameworks

*Web development frameworks.*

* [Django](https://www.djangoproject.com/) - The most popular web framework in Python.
* [Flask](http://flask.pocoo.org/) - A microframework for Python.
* [Bottle](http://bottlepy.org/) - A fast, simple and lightweight WSGI micro web-framework.
* [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.
* [web2py](http://www.web2py.com) - A full stack web framework and platform focused in the ease of use.
* [TurboGears](http://www.turbogears.org/) - The Web Framework that scales with you. Starts as a microframework and scales up to a fullstack solution.
* [Grok](http://grok.zope.org/) - A framework built on the existing Zope 3 libraries, offers a lot of building blocks for web development.
* [CherryPy](http://www.cherrypy.org/) - A Minimalist Python Web Framework, HTTP/1.1-compliant and WSGI thread-pooled.
* [webpy](http://webpy.org/) - A web framework for Python that is as simple as it is powerful.

## CMS

*Content Management Systems*

* [Mezzanine](http://mezzanine.jupo.org/) - A powerful, consistent, and flexible content management platform.
* [Wagtail](http://wagtail.io/) - A Django content management system.
* [django-oscar](http://oscarcommerce.com/) - An open-source ecommerce framework for Django.
* [Quokka CMS](http://quokkaproject.org) - Flexible, extensible, small CMS powered by Flask and MongoDB.
* [Opps CMS](http://oppsproject.org/) - A Django-based CMS for magazines, newspapers websites and portals with high-traffic.

## RESTful API

*Libraries for developing RESTful APIs.*

* [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit that makes it easy to build Web APIs.
* [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
* [flask-api](http://www.flaskapi.org/) - An implementation of the same web browsable APIs that django-rest-framework provides.
* [flask-restful](http://flask-restful.readthedocs.org/) - An extension for Flask that adds support for quickly building REST APIs.
* [falcon](http://falconframework.org/) - A high-performance Python framework for building cloud APIs and web app backends.
* [eve](https://github.com/nicolaiarocci/eve) - REST API framework powered by Flask, MongoDB and good intentions.
* [sandman](https://github.com/jeffknupp/sandman) - Automated REST APIs for existing database-driven systems.

## Authentication and OAuth

*Libraries for implementing authentications schemes.*

* [python-social-auth](https://github.com/omab/python-social-auth) - An easy-to-setup social authentication mechanism.
* [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) - OAuth2 goodies for the Djangonauts.
* [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) - Providing OAuth2 access to Django app.
* [python-oauth2](https://github.com/simplegeo/python-oauth2) - A fully tested, abstract interface to creating OAuth clients and servers.
* [rauth](https://github.com/litl/rauth) - A Python library for OAuth 1.0/a, 2.0, and Ofly.

## Template Engine

*Libraries and tools for templating and lexing.*

* [Jinja2](https://github.com/mitsuhiko/jinja2) - A modern and designer friendly templating language.

## Queue

*Libraries for working with event and task queues.*

* [celery](http://www.celeryproject.org/) - An asynchronous task queue/job queue based on distributed message passing.
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

## Caching

*Libraries for caching data.*

* [Beaker Caching & Sessions](http://beaker.readthedocs.org/en/latest/) - Beaker is a library for caching and sessions for use with web applications and stand-alone Python scripts and applications.
* [HermesCache](https://pypi.python.org/pypi/HermesCache) - Python caching library with tag-based invalidation and dogpile effect prevention.

## Email

*Libraries for sending and parsing email.*

* [inbox.py](https://github.com/kennethreitz/inbox.py) - Python SMTP Server for Humans.
* [imbox](https://github.com/martinrusev/imbox) - Python IMAP for Humans.
* [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) - Django email backend with AWS SES and Celery.

## Internationalization

*Libraries for woking with i18n.*

* [Babel](http://babel.pocoo.org/) - An internationalization library for Python.

## URL Manipulation

*Libraries for parsing URLs.*

* [furl](https://github.com/gruns/furl) - A small Python library that makes manipulating URLs simple.
* [purl](https://github.com/codeinthehole/purl) - A simple, immutable URL class with a clean API for interrogation and manipulation.

## HTML Manipulation

*Libraries for working with HTML and XML.*

* [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
* [lxml](http://lxml.de/) - A very fast, easy-to-use and versatile library for handling HTML and XML.
* [html5lib](https://github.com/html5lib/html5lib-python) - A standards-compliant library for parsing and serializing HTML documents and fragments.
* [pyquery](https://github.com/gawel/pyquery) - A jQuery-like library for parsing HTML.
* [cssutils](https://pypi.python.org/pypi/cssutils/) - A CSS library for Python.
* [MarkupSafe](https://github.com/mitsuhiko/markupsafe) - Implements a XML/HTML/XHTML Markup safe string for Python.
* [bleach](http://bleach.readthedocs.org/) - A whitelist-based HTML sanitization and text linkification library.
* [xmltodict](https://github.com/martinblech/xmltodict) - Working with XML feel like you are working with JSON.

## Web Crawling

*Libraries for scraping websites.*

* [Scrapy](http://scrapy.org/) - A fast high-level screen scraping and web crawling framework.
* [portia](https://github.com/scrapinghub/portia) - Visual scraping for Scrapy.
* [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
* [RoboBrowser](https://github.com/jmcarp/robobrowser) - A simple, Pythonic library for browsing the web without a standalone web browser.

## Web Content Extracting

*Libraries for extracting web contents.*

* [newspaper](https://github.com/codelucas/newspaper) - News extraction, article extraction and content curation in Pythom.
* [html2text](https://github.com/aaronsw/html2text) - Convert HTML to Markdown-formatted text.
* [python-goose](https://github.com/grangier/python-goose) - HTML Content/Article Extractor.
* [lassie](https://github.com/michaelhelmick/lassie) - Web Content Retrieval for Humans.
* [micawber](https://github.com/coleifer/micawber) - A small library for extracting rich content from URLs.
* [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.
* [Haul](https://github.com/vinta/Haul) - An Extensible Image Crawler.
* [python-readability](https://github.com/buriy/python-readability) - Fast Python port of arc90's readability tool.

## Forms

*Libraries for working with forms.*

* [django-crispy-forms](http://django-crispy-forms.readthedocs.org/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
* [WTForms](http://wtforms.readthedocs.org/) - A flexible forms validation and rendering library.

## Anti-spam

*Libraries for fighting spam.*

* [Stopspam](https://github.com/phalt/stopspam) - Intelligent spam detection for Python.
* [django-simple-spam-blocker](https://github.com/moqada/django-simple-spam-blocker) - Simple spam blocker for Django.
* [django-simple-captcha](https://github.com/mbi/django-simple-captcha) - A simple and highly customizable Django app to add captcha images to any Django form.

## Networking

*Libraries for network programming.*

* [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
* [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.
* [Tornado](http://www.tornadoweb.org/) - A Web framework and asynchronous networking library.
* [pyzmq](http://zeromq.github.io/pyzmq/) - A python wrapper for the 0MQ message library.

## Admin Panels

*Libraries for administrative interfaces.*

* [Ajenti](https://github.com/Eugeny/ajenti) - The admin panel your servers deserve.
* [django-xadmin](https://github.com/sshwsfc/django-xadmin) - Drop-in replacement of Django admin comes with lots of goodies.
* [flask-admin](https://github.com/mrjoes/flask-admin) - Simple and extensible administrative interface framework for Flask.
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.

## DevOps Tools

*Software and libraries for DevOps*

* [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
* [Ansible](http://www.ansible.com/) - An IT automation tool.
* [SaltStack](http://www.saltstack.com/community/) - Infrastructure automation and management system.
* [Fabric](http://www.fabfile.org/) - Tool for streamlining the use of SSH for application deployment or systems administration tasks.
* [Fabtools](https://github.com/ronnix/fabtools) - Tools for writing awesome Fabric files.
* [cuisine](https://github.com/sebastien/cuisine) - Chef-like functionality for Fabric.
* [gunicorn](http://gunicorn.org/) - A WSGI HTTP Server for UNIX, fast clients and sleepy applications.
* [Supervisor](http://supervisord.org/) - A Process Control System.
* [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.

## GUI

*Libraries for working with GUI applications.*

* [PySide](http://qt-project.org/wiki/pyside) - Python bindings for the Qt cross-platform application and UI framework.
* [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.
* [kivy](http://kivy.org/) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
* [curses](https://docs.python.org/2/library/curses.html#module-curses) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
* [urwid](http://urwid.org/) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
* [pyglet](http://www.pyglet.org/) - A cross-platform windowing and multimedia library for Python.
* [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter is Python's de-facto standard GUI (Graphical User Interface) package


## Game Development

*Awesome game development libraries.*

* [Pygame](http://www.pygame.org/news.html) - Pygame is a set of Python modules designed for writing games.
* [Cocos2d](http://cocos2d.org/) - cocos2d is a framework for building 2D games, demos, and other graphical/interactive applications. It is based on pyglet.
* [PySDL2](http://pysdl2.readthedocs.org/en/latest/) - A ctypes based wrapper for the SDL2 library.
* [Panda3D](https://www.panda3d.org/) - 3D game engine developed by Disney and maintained by Carnegie Mellon's Entertainment Technology Center. Written in C++, completely wrapped in Python.
* [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python bindings for the Ogre 3D render engine, can be used for games, simulations, anything 3D.
* [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes bindings for OpenGL and it's related APIs.

## Logging

*Libraries for generating and working with log files.*

* [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python.
* [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.
* [Raven](http://raven.readthedocs.org/) - The Python client for Sentry.

## Testing

*Libraries for testing codebases and generating test data.*

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
* Error Handler
	* [FuckIt.py](https://github.com/ajalt/fuckitpy) - FuckIt.py uses state-of-the-art technology to make sure your Python code runs whether it has any right to or not 

## Code Analysis and Linter

*Libraries and tools for analysing, parsing and manipulation codebases.*

* [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
* [Pylint](http://www.pylint.org/) - A source code analyzer.

## Debugging Tools

*Libraries for dubugging and developing*

* [pdb](https://docs.python.org/2/library/pdb.html) - (Python standard library) The Python Debugger.
* [ipdb](https://pypi.python.org/pypi/ipdb) - IPython-enabled pdb.
* [pyringe](https://github.com/google/pyringe) - Debugger capable of attaching to and injecting code into Python processes.
* [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar) - Display various debug information about the current request/response.
* [django-devserver](https://github.com/dcramer/django-devserver) - A drop-in replacement for Django's runserver.

## Science and Data Aanalysis

*Libraries for scientific computing and data analyzing.*

* [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
* [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
* [Numba](http://numba.pydata.org/) - Python JIT (just in time) complier to LLVM aimed at scientific Python by the developers of Cython and NumPy.
* [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
* [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
* [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
* [PyMC](https://github.com/pymc-devs/pymc) - Markov Chain Monte Carlo sampling toolkit.
* [zipline](https://github.com/quantopian/zipline) - A Pythonic algorithmic trading library.
* [ggplot](https://github.com/yhat/ggplot) - Same API as ggplot2 for R.
* [PyDy](https://pydy.org/) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion based around NumPy, SciPy, IPython, and matplotlib.

## Machine Learning

*Libraries for Machine Learning*

* [scikit-learn](http://scikit-learn.org/) - A Python module for machine learning built on top of SciPy.
* [pattern](https://github.com/clips/pattern) - Web mining module for Python.
* [NuPIC](https://github.com/numenta/nupic) - Numenta Platform for Intelligent Computing.
* [Pylearn2](https://github.com/lisa-lab/pylearn2) - A Machine Learning library based on [Theano](https://github.com/Theano/Theano).
* [hebel](https://github.com/hannes-brt/hebel) - GPU-Accelerated Deep Learning Library in Python.
* [gensim](https://github.com/piskvorky/gensim) - Topic Modelling for Humans.
* [PyBrain](https://github.com/pybrain/pybrain) - Another Python Machine Learning Library.
* [Crab](https://github.com/muricoca/crab) - A ﬂexible, fast recommender engine.
* [python-recsys](https://github.com/ocelma/python-recsys) - A Python library for implementing a Recommender System.

## MapReduce

*Framworks and libraries for MapReduce.*

* [PySpark](http://spark.apache.org/docs/latest/programming-guide.html) - The Spark Python API.
* [dpark](https://github.com/douban/dpark) - Python clone of Spark, a MapReduce alike framework in Python.
* [luigi](https://github.com/spotify/luigi) - A module that helps you build complex pipelines of batch jobs.
* [mrjob](https://github.com/Yelp/mrjob) - Run MapReduce jobs on Hadoop or Amazon Web Services.
* [dumbo](https://github.com/klbostee/dumbo) - Python module that allows one to easily write and run Hadoop programs.

## Third-party APIs

*Libraries for accessing third party APIs.*

* [apache-libcloud](https://libcloud.apache.org/) - One Python library for all clouds.
* [boto](https://github.com/boto/boto) - Python interface to Amazon Web Services.
* [s3cmd](https://github.com/s3tools/s3cmd) - A command line tool for managing Amazon S3 and CloudFront.
* [twython](https://github.com/ryanmcgrath/twython) - A Python wrapper for the Twitter API.
* [soundcloud-python](https://github.com/soundcloud/soundcloud-python) - A Python wrapper around the Soundcloud API.
* [google-api-python-client](https://github.com/google/google-api-python-client) - Google APIs Client Library for Python.
* [facebook-sdk](https://github.com/pythonforfacebook/facebook-sdk) - Facebook Platform Python SDK.

## Algorithms and Design Patterns

*Collections of algorithms and design patterns.*

* [python-patterns](https://github.com/faif/python-patterns) - A collection of design patterns in Python.
* [algorithms](https://github.com/nryoung/algorithms) - module of algorithms for Python.

## Miscellaneous

*Useful libraries or tools that don't fit in the categories above.*

* [IPython](https://github.com/ipython/ipython) - IPython provides a rich toolkit to help you make the most out of using Python interactively.

## Foreign Function Interface

*Libraries for providing foreign function interface.*

* [cffi](https://pypi.python.org/pypi/cffi) - Foreign Function Interface for Python calling C code.

## High Performance

*Libraries for making Python faster.*

* [Cython](http://cython.org/) - Optimizing Static Complier for Python. Uses type mixins to compile Python into C or C++ modules resulting in large performance gains.
* [PyPy](http://pypy.org/) - An implmentation of Python in Python. The interpreter uses black magic to make Python very fast without having to add in additional type information.
* [Stackless Python](http://www.stackless.com/) - An enhanced version of the Python.

# Resources

## Editor Plugins

* Vim
    * TODO
* Emacs
    * TODO
* Sublime Text
    * [SublimeJEDI](https://github.com/srusskih/SublimeJEDI) - A Sublime Text plugin to the awesome autocomplete library [Jedi](https://github.com/davidhalter/jedi).
    * [Anaconda](https://github.com/DamnWidget/anaconda) - Anaconda turns your Sublime Text 3 in a full featured Python development IDE.
    * [Djaneiro](https://github.com/squ1b3r/Djaneiro) - Django support for Sublime Text.

## Books

* [Python Cookbook](http://www.amazon.com/Python-Cookbook-David-Beazley/dp/1449340377/)
* [Expert Python Programming](http://www.amazon.com/Expert-Python-Programming-practices-distributing/dp/184719494X/)

## Websites

* [r/Python](http://www.reddit.com/r/python) - News about Python.
* [pyvideo.org](http://pyvideo.org/) - Python related video indexed so you can find it.
* [The Hitchhiker's Guide to Python!](http://docs.python-guide.org/) - The answer to life, the universe, and everything.
* [Python 3 Wall of Superpowers](http://python3wos.appspot.com/) - Too many popular Python packages don't support Python 3.
* [Trending Python repositories on GitHub today](https://github.com/trending?l=python) - Good place to find new Python libraries.
* [Django Packages](https://www.djangopackages.com/) - A directory of reusable apps, sites, tools, and more for Django projects.

## Weekly

* [Pycoder's Weekly](http://pycoders.com/) - A free weekly newsletter, on Fridays, for those interested in Python development and various topics around Python.
* [Python Weekly](http://www.pythonweekly.com/) - A free weekly newsletter featuring curated news, articles, new releases, jobs etc related to Python.

## Twitter

* [@gvanrossum](https://twitter.com/gvanrossum) - Python BDFL.
* [@pypi](https://twitter.com/pypi)
* [@getpy](https://twitter.com/getpy)
* [@planetpython](https://twitter.com/planetpython)
* [@pycoders](https://twitter.com/pycoders)
* [@PythonWeekly](https://twitter.com/PythonWeekly)

## Articles

* [More About Unicode in Python 2 and 3](http://lucumr.pocoo.org/2014/1/5/unicode-in-2-and-3/)

# Contributing

Your contributions are always welcome!
