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
    - [Computer Vision](#computer-vision)
    - [Concurrency and Networking](#concurrency-and-networking)
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
    - [E-commerce](#e-commerce)
    - [Editor Plugins](#editor-plugins)
    - [Email](#email)
    - [Environment Management](#environment-management)
    - [Files](#files)
    - [Foreign Function Interface](#foreign-function-interface)
    - [Forms](#forms)
    - [Functional Programming](#functional-programming)
    - [Game Development](#game-development)
    - [Geolocation](#geolocation)
    - [GUI](#gui)
    - [Hardware](#hardware)
    - [High Performance](#high-performance)
    - [HTML Manipulation](#html-manipulation)
    - [HTTP](#http)
    - [Imagery](#imagery)
    - [Interactive Interpreter](#interactive-interpreter)
    - [Internationalization](#internationalization)
    - [Job Scheduler](#job-scheduler)
    - [Logging](#logging)
    - [Machine Learning](#machine-learning)
    - [MapReduce](#mapreduce)
    - [Miscellaneous](#miscellaneous)
    - [Natural Language Processing](#natural-language-processing)
    - [Network Virtualization and SDN](#network-virtualization-and-sdn)
    - [News Feed](#news-feed)
    - [ORM](#orm)
    - [Package Management](#package-management)
    - [Permissions](#permissions)
    - [Processes and Threads](#processes-and-threads)
    - [Queue](#queue)
    - [RESTful API](#restful-api)
    - [RPC Servers](#rpc-servers)
    - [Science and Data Analysis](#science-and-data-analysis)
    - [Search](#search)
    - [Specific Formats Processing](#specific-formats-processing)
    - [Static Site Generator](#static-site-generator)
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
    - [WSGI Servers](#wsgi-servers)
- [Resources](#resources)
    - [Twitter](#twitter)
    - [Websites](#websites)
    - [Weekly](#weekly)
- [Contributing](#contributing)
- [Other Awesome Lists](#other-awesome-lists)

---

## Environment Management

*Libraries for Python version and environment management.*

* [pew](https://pypi.python.org/pypi/pew/) - A set of tools to manage multiple virtual environments.
* [pyenv](https://github.com/yyuu/pyenv) - Simple Python version management.
* [PyRun](https://www.egenix.com/products/python/PyRun/) - A one-file, no-installation-needed version of Python.
* [Vex](https://github.com/sashahart/vex) - Run a command in the named virtualenv.
* [virtualenv](https://pypi.python.org/pypi/virtualenv) - A tool to create isolated Python environments.
* [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper) - A set of extensions to virtualenv

## Package Management

*Libraries for package and dependency management.*

* [pip](https://pip.pypa.io/) - The Python package and dependency manager.
    * [Python Package Index](https://pypi.python.org/pypi)
* [conda](https://github.com/conda/conda/) - Cross-platform, Python-agnostic binary package manager.
* [Curdling](http://clarete.li/curdling/) - Curdling is a command line tool for managing Python packages.
* [wheel](http://pythonwheels.com/) - The new standard of Python distribution and are intended to replace eggs.

## Distribution

*Libraries to create packaged executables for release distribution.*

* [cx-Freeze](http://cx-freeze.readthedocs.org/) - Freezes Python scripts (cross-platform)
* [dh-virtualenv](http://dh-virtualenv.readthedocs.org/) - Build and distribute a virtualenv as a Debian package.
* [py2app](http://pythonhosted.org/py2app/) - Freezes Python scripts (Mac OS X)
* [py2exe](http://www.py2exe.org/) - Freezes Python scripts (Windows)
* [PyInstaller](http://www.pyinstaller.org/) - A program that converts Python programs into stand-alone executables (Windows, Linux, Mac OS X, Solaris and AIX)

## Build Tools

*Compile software from source code.*

* [BitBake](http://www.yoctoproject.org/docs/1.6/bitbake-user-manual/bitbake-user-manual.html) - A make-like build tool with the special focus of distributions and packages for embedded Linux.
* [buildout](http://www.buildout.org/) - A build system for creating, assembling and deploying applications from multiple parts, some of which may be non-Python-based.
* [fabricate](https://code.google.com/p/fabricate/) - A build tool that finds dependencies automatically for any language.
* [PlatformIO](https://github.com/ivankravets/platformio) - A console tool to build code with different development platforms.
* [SCons](http://www.scons.org/) - A software construction tool.

## Interactive Interpreter

*Interactive Python interpreters.*

* [bpython](http://bpython-interpreter.org) – A fancy interface to the Python interpreter for Linux, BSD, OS X and Windows (with some work).
* [IPython](https://github.com/ipython/ipython) - IPython provides a rich toolkit to help you make the most out of using Python interactively.

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
* [pytz](https://launchpad.net/pytz) - World timezone definitions, modern and historical. Brings the [Olson tz database](http://en.wikipedia.org/wiki/Tz_database) into Python.
* [when.py](https://github.com/dirn/When.py) - Providing user-friendly functions to help perform common date and time actions.

## Text Processing

*Libraries for parsing and manipulating plain texts.*

* General
    * [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
    * [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
    * [esmre](https://code.google.com/p/esmre/) - Regular expression accelerator.
    * [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) - Fuzzy String Matching.
    * [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
    * [pangu.py](https://github.com/vinta/pangu.py) - Spacing texts for CJK and alphanumerics.
    * [pyfiglet](https://github.com/pwaller/pyfiglet) - An implementation of figlet written in Python.
    * [shortuuid](https://github.com/stochastic-technologies/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
    * [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
    * [xpinyin](https://github.com/lxneng/xpinyin) - A library to translate Chinese hanzi (漢字) to pinyin (拼音).
* Slugify
    * [awesome-slugify](https://github.com/dimka665/awesome-slugify) - A Python slugify library that can preserve unicode.
    * [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that translates unicode to ASCII.
    * [unicode-slugify](https://github.com/mozilla/unicode-slugify) - A slugifier that generates unicode slugs with Django as a dependency.
* Parser
    * [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Library for parsing, formatting, storing and validating international phone numbers.
    * [Pygments](http://pygments.org/) - A generic syntax highlighter.
    * [pyparsing](http://pyparsing.wikispaces.com/) - A general purpose framework for generating parsers.
    * [python-nameparser](https://github.com/derek73/python-nameparser) - A simple Python module for parsing human names into their individual components.
    * [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
    * [sqlparse](https://sqlparse.readthedocs.org/) - A non-validating SQL parser.

## Specific Formats Processing

*Libraries for parsing and manipulating specific text formats.*

* General
    * [tablib](https://github.com/kennethreitz/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
* Office
    * [Marmir](https://github.com/brianray/mm) - Takes Python data structures and turns them into spreadsheets.
    * [python-docx](https://github.com/mikemaccana/python-docx) - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
    * [XlsxWriter](https://xlsxwriter.readthedocs.org/) - A Python module for creating Excel .xlsx files.
    * [xlwt](https://github.com/python-excel/xlwt) / [xlrd](https://github.com/python-excel/xlrd) - Writing and reading data and formatting information from Excel files.
* PDF
    * [PDFMiner](https://github.com/euske/pdfminer) - A tool for extracting information from PDF documents.
    * [PyPDF2](https://github.com/mstamy2/PyPDF2) - A library capable of splitting, merging and transforming PDF pages.
* Markdown
    * [Mistune](https://github.com/lepture/mistune) - Fastest and full featured pure Python parsers of Markdown.
    * [Python-Markdown](https://github.com/waylan/Python-Markdown) - A Python implementation of John Gruber’s Markdown.
* YAML
    * [PyYAML](http://pyyaml.org/) - YAML implementations for Python.

## Natural Language Processing

*Libraries for working with human languages.*

* [genius](https://github.com/duanhongyi/genius) - A Chinese segment base on Conditional Random Field.
* [jieba](https://github.com/fxsjy/jieba#jieba-1) - Chinese Words Segementation Utilities.
* [loso](https://github.com/victorlin/loso) - Another Chinese segmentation library.
* [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
* [Pattern](http://www.clips.ua.ac.be/pattern) - A web mining module for the Python. It has tools for natural language processing, machine learning, among others.
* [SnowNLP](https://github.com/isnowfy/snownlp) - A library for processing Chinese text.
* [TextBlob](http://textblob.readthedocs.org/) - Providing a consistent API for diving into common natural language processing (NLP) tasks. Stands on the giant shoulders of NLTK and Pattern, and plays nicely with both.

## Documentation

*Libraries for generating project documentation.*

* [MkDocs](http://www.mkdocs.org/) - Markdown friendly documentation generator.
* [pdoc](https://github.com/BurntSushi/pdoc) - Epydoc replacement to auto generate API documentation for Python libraries.
* [Pycco](http://fitzgen.github.io/pycco/) - The original quick-and-dirty, hundred-line-long, literate-programming-style documentation generator.
* [reStructuredText](http://docutils.sourceforge.net/rst.html) - Markup Syntax and Parser Component of Docutils.
* [Sphinx](http://sphinx-doc.org/) - Python Documentation generator.

## Configuration

*Libraries for storing configuration options.*

* [config](http://www.red-dove.com/config-doc/) - Hierarchical config from the author of [logging](https://docs.python.org/2/library/logging.html).
* [ConfigObj](http://www.voidspace.org.uk/python/configobj.html) - INI file parser with validation.
* [ConfigParser](https://docs.python.org/2/library/configparser.html) - (Python standard library) INI file parser.
* [profig](http://profig.readthedocs.org/) - Config from multiple formats with value conversion.

## Command-line Tools

*Libraries for building command-line application.*

* Command-line Application Development
    * [cement](http://builtoncement.org/) - Cement provides a light-weight and fully featured foundation to build anything from single file scripts to complex and intricately designed applications.
    * [click](http://click.pocoo.org/) - A package for creating beautiful command line interfaces in a composable way.
    * [cliff](https://cliff.readthedocs.org/) - A framework for creating command-line programs with multi-level commands.
    * [Clime](http://clime.mosky.tw) – Clime lets you convert any module into a multi-command CLI program without any configuration.
    * [clint](https://github.com/kennethreitz/clint) - Python Command-line Application Tools.
    * [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.
    * [docopt](http://docopt.org/) - Pythonic command line arguments parser.
    * [pyCLI](https://pythonhosted.org/pyCLI/) - Command-line applications supporting standard command line parsing, logging, unit and functional testing.
* Productivity Tools
    * [cookiecutter](https://github.com/audreyr/cookiecutter) - A command-line utility that creates projects from cookiecutters (project templates). E.g. Python package projects, jQuery plugin projects.
    * [httpie](https://github.com/jakubroztocil/httpie) - A command line HTTP client, a user-friendly cURL replacement.
    * [percol](https://github.com/mooz/percol) - Adds flavor of interactive selection to the traditional pipe concept on UNIX.
    * [RainbowStream](http://www.rainbowstream.org/) - Smart and nice Twitter client on terminal.

## Downloader

*Libraries for downloading.*

* [coursera](https://github.com/coursera-dl/coursera) - Script for downloading Coursera.org videos and naming them.
* [s3cmd](https://github.com/s3tools/s3cmd) - A command line tool for managing Amazon S3 and CloudFront.
* [subliminal](https://github.com/Diaoul/subliminal) - Library and command line tool to search and download subtitles.
* [WikiTeam](https://github.com/WikiTeam/wikiteam) - Tools for downloading and preserving wikis.
* [you-get](http://www.soimort.org/you-get/) - A YouTube/Youku/Niconico video downloader written in Python 3.
* [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.

## Imagery

*Libraries for manipulating images.*

* [hmap](https://github.com/rossgoodwin/hmap) - Image histogram remapping.
* [imgSeek](http://www.imgseek.net/) - A project for searching a collection of images using visual similarity.
* [nude.py](https://github.com/hhatto/nude.py) - Nudity detection.
* [pillow](http://pillow.readthedocs.org/) - Pillow is the friendly [PIL](http://www.pythonware.com/products/pil/) fork.
* [pyBarcode](https://pythonhosted.org/pyBarcode/) - Create barcodes in Python without needing PIL.
* [pygram](https://github.com/ajkumar25/pygram) - Instagram-like image filters.
* [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
* [Quads](https://github.com/fogleman/Quads) - Computer art based on quadtrees.
* [scikit-image](http://scikit-image.org/) - A Python library for (scientific) image processing.
* [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, resizing and flipping of images.
* [wand](https://github.com/dahlia/wand) - Python bindings for [MagickWand](http://www.imagemagick.org/script/magick-wand.php), C API for ImageMagick.

## Audio

*Libraries for manipulating audio.*

* [audiolazy](https://github.com/danilobellini/audiolazy) - Expressive Digital Signal Processing (DSP) package for Python.
* [audioread](https://github.com/sampsyo/audioread) - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
* [beets](http://beets.radbox.org/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
* [dejavu](https://github.com/worldveil/dejavu) - Audio fingerprinting and recognition.
* [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) - Django + [Amazon Elastic Transcoder](http://aws.amazon.com/elastictranscoder/).
* [eyeD3](http://eyed3.nicfit.net/) - A tool for working with audio files, specifically MP3 files containing ID3 metadata.
* [id3reader](http://nedbatchelder.com/code/modules/id3reader.py) - A Python module for reading MP3 meta data.
* [m3u8](https://github.com/globocom/m3u8) - A module for parsing m3u8 file.
* [mutagen](https://code.google.com/p/mutagen/) - A Python module to handle audio metadata.
* [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
* [pyechonest](https://github.com/echonest/pyechonest) - Python client for the [Echo Nest](http://developer.echonest.com/docs/) API.
* [talkbox](http://scikits.appspot.com/talkbox) - A Python library for speech/signal processing.
* [TimeSide](https://github.com/yomguy/TimeSide) - Open web audio processing framework.
* [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.

## Video

*Libraries for manipulating video and GIFs.*

* [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
* [scikit-video](https://github.com/aizvorski/scikit-video) - Video processing routines for SciPy.
* [shorten.tv](http://www.shorten.tv/) - Video summarization.

## Geolocation

*Libraries for geocoding addresses and working with latitudes and longitudes.*

* [django-countries](https://github.com/SmileyChris/django-countries) - A Django app that provides country choices for use with forms, flag icons static files, and a country field for models.
* [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
* [GeoIP](https://github.com/maxmind/geoip-api-python) - Python API for MaxMind GeoIP Legacy Database.
* [geojson](https://github.com/frewsxcv/python-geojson) - Python bindings and utlities for GeoJSON.
* [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.
* [pygeoip](https://github.com/appliedsec/pygeoip) - Pure Python GeoIP API.

## HTTP

*Libraries for working with HTTP.*

* [grequests](https://github.com/kennethreitz/grequests) - requests + gevent for asynchronous HTTP requests.
* [httplib2](https://github.com/jcgregorio/httplib2) - Comprehensive HTTP client library.
* [requests](http://docs.python-requests.org/) - HTTP Requests for Humans™.
* [treq](https://github.com/dreid/treq) - Python requests like API built on top of Twisted's HTTP client.
* [urllib3](https://github.com/shazow/urllib3) - A HTTP library with thread-safe connection pooling, file post support, sanity friendly.

## Database

*Databases implemented in Python.*

* [ZODB](http://www.zodb.org/) - A native object database for Python. A key-value and object graph database.

## Database Drivers

*Libraries for connecting and operating databases.*

* Relational Databases
    * [mysql-connector-python](https://pypi.python.org/pypi/mysql-connector-python) - A pure Python MySQL driver from Oracle.
    * [mysql-python](http://sourceforge.net/projects/mysql-python/) - The MySQL database connector for Python.
    * [mysqlclient](https://github.com/PyMySQL/mysqlclient-python) - mysql-python fork supporting Python 3.
    * [oursql](https://pythonhosted.org/oursql/) - A better MySQL connector with support for native prepared statements and BLOBs.
    * [psycopg2](http://initd.org/psycopg/) - The most popular PostgreSQL adapter for Python.
    * [PyMySQL](https://github.com/PyMySQL/PyMySQL) - Pure Python MySQL driver compatible to mysql-python.
    * [queries](https://github.com/gmr/queries) - A wrapper of the psycopg2 library for interacting with PostgreSQL.
    * [txpostgres](http://txpostgres.readthedocs.org/) - Twisted based asynchronous driver for PostgreSQL.
* NoSQL Databases
    * [cassandra-python-driver](https://github.com/datastax/python-driver) - Python driver for Cassandra.
    * [HappyBase](http://happybase.readthedocs.org/) - A developer-friendly library for Apache HBase.
    * [Plyvel](https://plyvel.readthedocs.org/) - A fast and feature-rich Python interface to LevelDB.
    * [py2neo](http://book.py2neo.org/) - Python wrapper client for Neo4j's restful interface.
    * [pycassa](https://github.com/pycassa/pycassa) - Python Thrift driver for Cassandra.
    * [PyMongo](http://docs.mongodb.org/ecosystem/drivers/python/) - The official Python client for MongoDB.
    * [redis-py](https://github.com/andymccurdy/redis-py) - The Redis Python Client.
    * [telephus](https://github.com/driftx/Telephus) - Twisted based client for Cassandra.
    * [txRedis](https://github.com/deldotdr/txRedis) - Twisted based client for Redis.

## ORM

*Libraries that implement Object-Relational Mapping or datamapping techniques.*

* Relational Databases
    * [Django Models](https://docs.djangoproject.com/en/dev/topics/db/models/) - A part of Django.
    * [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
    * [PonyORM](http://ponyorm.com) - ORM that provides a generator-oriented interface to SQL.
    * [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
* NoSQL Databases
    * [django-mongodb-engine](https://github.com/django-nonrel/mongodb-engine) - Django MongoDB Backend.
    * [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    * [redisco](https://github.com/kiddouk/redisco) - A Python Library for Simple Models and Containers Persisted in Redis.
* Others
    * [butterdb](https://github.com/Widdershin/butterdb) - A Python ORM for Google Drive Spreadsheets.

## Web Frameworks

*Full stack web frameworks.*

* [Django](https://www.djangoproject.com/) - The most popular web framework in Python.
    * [awesome-django](https://github.com/rosarior/awesome-django)
* [Flask](http://flask.pocoo.org/) - A microframework for Python.
    * [awesome-flask](https://github.com/humiaozuzu/awesome-flask)
* [Bluebream](http://bluebream.zope.org/) - An open-source web application server, framework and library, formerly known as Zope 3.
* [Bottle](http://bottlepy.org/) - A fast, simple and lightweight WSGI micro web-framework.
* [CherryPy](http://www.cherrypy.org/) - A Minimalist Python Web Framework, HTTP/1.1-compliant and WSGI thread-pooled.
* [Grok](http://grok.zope.org/) - A framework built on the existing Zope 3 libraries.
* [guava](https://github.com/flatpeach/guava) - A lightweight and high performance web framework for Python written in C.
* [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.
* [TurboGears](http://www.turbogears.org/) - The Web Framework that starts as a microframework and scales up to a fullstack solution.
* [web.py](http://webpy.org/) - A web framework for Python that is as simple as it is powerful.
* [web2py](http://www.web2py.com) - A full stack web framework and platform focused in the ease of use.

## Permissions

*Libraries that allow or deny users access to data or functionality.*

* [Carteblanche](http://www.github.com/neuman/python-carteblanche/) - Module to align code with thoughts of users and designers. Also magically handles navigation and permissions.
* [django-guardian](https://github.com/lukaszb/django-guardian) - Implementation of per object permissions for Django 1.2+

## CMS

*Content Management Systems.*

* [django-cms](https://www.django-cms.org/en/) - An Open source enterprise CMS based on the Django.
* [djedi-cms](http://djedi-cms.org/) - A lightweight but yet powerful Django CMS with plugins, inline editing and performance in mind.
* [FeinCMS](http://www.feincms.org/) - One of the most advanced Content Management Systems built on Django.
* [Kotte](http://kotti.pylonsproject.org/) - A high-level, Pythonic web application framework built on Pyramid.
* [Mezzanine](http://mezzanine.jupo.org/) - A powerful, consistent, and flexible content management platform.
* [Opps](http://oppsproject.org/) - A Django-based CMS for magazines, newspapers websites and portals with high-traffic.
* [Plone](http://plone.org/) - A CMS built on top of the open source application server Zope.
* [Quokka](http://quokkaproject.org/) - Flexible, extensible, small CMS powered by Flask and MongoDB.
* [Wagtail](http://wagtail.io/) - A Django content management system.
* [Widgy](http://wid.gy/) - Last CMS framework, based on Django.

## E-commerce

*Frameworks and libraries for e-commerce and payments.*

* [django-oscar](http://oscarcommerce.com/) - An open-source e-commerce framework for Django.
* [django-shop](https://www.django-cms.org/) - A Django based shop system.
* [merchant](https://github.com/agiliq/merchant) - A Django app to accept payments from various payment processors.
* [money](https://github.com/carlospalol/money) - Money class with optional CLDR-backed locale-aware formatting and an extensible currency exchange solution.

## RESTful API

*Libraries for developing RESTful APIs.*

* [cornice](https://cornice.readthedocs.org/) - A REST framework for Pyramid.
* [django-formapi](https://github.com/5monkeys/django-formapi) - Create JSON APIs with HMAC authentication and Django form-validation.
* [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit that makes it easy to build Web APIs.
* [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
* [eve](https://github.com/nicolaiarocci/eve) - REST API framework powered by Flask, MongoDB and good intentions.
* [falcon](http://falconframework.org/) - A high-performance Python framework for building cloud APIs and web app backends.
* [flask-api-utils](https://github.com/marselester/flask-api-utils) - Flask extension that takes care of API representation and authentication.
* [flask-api](http://www.flaskapi.org/) - An implementation of the same web browsable APIs that django-rest-framework provides.
* [flask-restful](http://flask-restful.readthedocs.org/) - An extension for Flask that adds support for quickly building REST APIs.
* [restless](http://restless.readthedocs.org/en/latest/) - Framework agnostic REST framework based on lessons learned from TastyPie.
* [sandman](https://github.com/jeffknupp/sandman) - Automated REST APIs for existing database-driven systems.
* [savory-pie](https://github.com/RueLaLa/savory-pie/) - REST API building library (django, and others)

## Authentication and OAuth

*Libraries for implementing authentications schemes.*

* [Authomatic](http://peterhudec.github.io/authomatic/) - Simple but powerful framework agnostic authentication/authorization client package.
* [django-allauth](https://github.com/pennersr/django-allauth) - Authentication app for Django that "just works."
* [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) - OAuth2 goodies for the Djangonauts.
* [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) - Providing OAuth2 access to Django app.
* [Flask-OAuthlib](https://github.com/lepture/flask-oauthlib) - OAuth 1.0/a, 2.0 implementation of client and provider for Flask.
* [jose](https://github.com/demonware/jose) - JavaScript Object Signing and Encryption (JOSE) draft implementation, useful for stateful tokens.
* [OAuthLib](https://github.com/idan/oauthlib) - A generic, spec-compliant, thorough implementation of the OAuth request-signing logic.
* [python-oauth2](https://github.com/simplegeo/python-oauth2) - A fully tested, abstract interface to creating OAuth clients and servers.
* [python-social-auth](https://github.com/omab/python-social-auth) - An easy-to-setup social authentication mechanism.
* [rauth](https://github.com/litl/rauth) - A Python library for OAuth 1.0/a, 2.0, and Ofly.
* [sanction](https://github.com/demianbrecht/sanction) - A dead simple OAuth2 client implementation.

## Template Engine

*Libraries and tools for templating and lexing.*

* [Chameleon](https://chameleon.readthedocs.org/) - An HTML/XML template engine for Python. Modeled after ZPT, optimized for speed.
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
* [simpleq](https://github.com/rdegges/simpleq) - A simple, infinitely scalable, Amazon SQS based queue.

## Search

*Libraries and software for indexing and performing search queries on data.*

* [django-haystack](https://github.com/toastdriven/django-haystack) - Modular search for Django.
* [elasticsearch-py](http://www.elasticsearch.org/guide/en/elasticsearch/client/python-api/current/) - The official low-level Python client for [Elasticsearch](http://www.elasticsearch.org/).
* [solrpy](https://code.google.com/p/solrpy/) - A Python client for [solr](http://lucene.apache.org/solr/).
* [Whoosh](http://whoosh.readthedocs.org/) - A fast, pure Python search engine library.

## News Feed

*Libraries for building user's activities.*

* [django-activity-stream](https://github.com/justquick/django-activity-stream) - Generate generic activity streams from the actions on your site.
* [Feedly](https://github.com/tschellenbach/Feedly) - A library which allows you to build newsfeed and notification systems using Cassandra and Redis.

## Asset Management

*Tools for managing, compressing and minifying website assets.*

* [django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline javascript or CSS into a single cached file.
* [django-storages](http://code.larlet.fr/django-storages/) - A collection of custom storage backends for Django.
* [fanstatic](http://www.fanstatic.org/) - Packages, optimizes, and serves static file dependencies as Python packages.
* [fileconveyor](http://fileconveyor.org/) - Monitors changes, processes, and transports assets to CDNs and file storage systems.
* [Flask-Assets](http://flask-assets.readthedocs.org/) - Helps you integrate webassets into your Flask app.
* [glue](http://gluecss.com) - Glue is a simple command line tool to generate CSS sprites.
* [jinja-assets-compressor](https://github.com/jaysonsantos/jinja-assets-compressor) - A Jinja extension to compile and compress your assets.
* [libsass-python](http://hongminhee.org/libsass-python/) - A Python binding of [libsass](https://github.com/hcatlin/libsass), the reference implementation of SASS/SCSS.
* [webassets](http://webassets.readthedocs.org/) - Bundles, optimizes, and manages unique cache-busting URLs for static resources.

## Caching

*Libraries for caching data.*

* [Beaker](http://beaker.readthedocs.org/) - A library for caching and sessions for use with web applications and stand-alone Python scripts and applications.
* [django-cache-machine](https://github.com/jbalogh/django-cache-machine) - Automatic caching and invalidation for Django models through the ORM.
* [django-cacheops](https://github.com/Suor/django-cacheops) - A slick ORM cache with automatic granular event-driven invalidation.
* [django-viewlet](https://github.com/5monkeys/django-viewlet) - Render template parts with extended cache control.
* [dogpile.cache](http://dogpilecache.readthedocs.org/) - dogpile.cache is next generation replacement for Beaker made by same authors.
* [HermesCache](https://pypi.python.org/pypi/HermesCache) - Python caching library with tag-based invalidation and dogpile effect prevention.
* [johnny-cache](https://github.com/jmoiron/johnny-cache) - A caching framework for django applications.
* [pylibmc](https://github.com/lericson/pylibmc) - A Python wrapper around the [libmemcached](http://libmemcached.org/libMemcached.html) interface.

## Email

*Libraries for sending and parsing email.*

* [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) - Django email backend with AWS SES and Celery.
* [envelopes](http://tomekwojcik.github.io/envelopes/) - Mailing for human beings.
* [flanker](https://github.com/mailgun/flanker) - A email address and Mime parsing library.
* [imbox](https://github.com/martinrusev/imbox) - Python IMAP for Humans.
* [inbox.py](https://github.com/kennethreitz/inbox.py) - Python SMTP Server for Humans.
* [inbox](https://github.com/inboxapp/inbox) - The open source email toolkit.
* [lamson](https://github.com/zedshaw/lamson) - Pythonic SMTP Application Server.
* [mailjet](https://github.com/WoLpH/mailjet) - Mailjet API implementation for batch mailing, statistics and more.
* [marrow.mailer](https://github.com/marrow/marrow.mailer) - High-performance extensible mail delivery framework.
* [modoboa](https://github.com/tonioo/modoboa) - A mail hosting and management platform including a modern and simplified Web UI.
* [pyzmail](http://www.magiksys.net/pyzmail/) - Compose, send and parse emails.
* [Talon](https://github.com/mailgun/talon) - Mailgun library to extract message quotations and signatures.

## Internationalization

*Libraries for woking with i18n.*

* [Babel](http://babel.pocoo.org/) - An internationalization library for Python.

## URL Manipulation

*Libraries for parsing URLs.*

* [furl](https://github.com/gruns/furl) - A small Python library that makes manipulating URLs simple.
* [purl](https://github.com/codeinthehole/purl) - A simple, immutable URL class with a clean API for interrogation and manipulation.
* [pyshorteners](https://github.com/ellisonleao/pyshorteners) - A pure Python URL shortening lib.

## HTML Manipulation

*Libraries for working with HTML and XML.*

* [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
* [bleach](http://bleach.readthedocs.org/) - A whitelist-based HTML sanitization and text linkification library.
* [cssutils](https://pypi.python.org/pypi/cssutils/) - A CSS library for Python.
* [html5lib](https://github.com/html5lib/html5lib-python) - A standards-compliant library for parsing and serializing HTML documents and fragments.
* [lxml](http://lxml.de/) - A very fast, easy-to-use and versatile library for handling HTML and XML.
* [MarkupSafe](https://github.com/mitsuhiko/markupsafe) - Implements a XML/HTML/XHTML Markup safe string for Python.
* [pyquery](https://github.com/gawel/pyquery) - A jQuery-like library for parsing HTML.
* [untangle](https://github.com/stchris/untangle) - Converts XML documents to Python objects for easy access.
* [xhtml2pdf](https://github.com/chrisglass/xhtml2pdf) - HTML/CSS to PDF converter.
* [xmltodict](https://github.com/martinblech/xmltodict) - Working with XML feel like you are working with JSON.

## Web Crawling

*Libraries for scraping websites.*

* [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
* [MechanicalSoup](https://github.com/hickford/MechanicalSoup) - A Python library for automating interaction with websites.
* [mechanize](http://wwwsearch.sourceforge.net/mechanize/) - Stateful programmatic web browsing.
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
* [opengraph](https://github.com/erikriver/opengraph) - A Python module to parse the Open Graph Protocol
* [python-goose](https://github.com/grangier/python-goose) - HTML Content/Article Extractor.
* [python-readability](https://github.com/buriy/python-readability) - Fast Python port of arc90's readability tool.
* [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.
* [textract](https://github.com/deanmalmgren/textract) - Extract text from any document, Word, PowerPoint, PDFs, etc.

## Forms

*Libraries for working with forms.*

* [Deform](http://deform.readthedocs.org/) - Python HTML form generation library influenced by the formish form generation library.
* [django-bootstrap3](https://github.com/dyve/django-bootstrap3) - Bootstrap 3 integration with Django.
* [django-crispy-forms](http://django-crispy-forms.readthedocs.org/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
* [django-remote-forms](https://github.com/WiserTogether/django-remote-forms) - A platform independent Django form serializer.
* [WTForms-JSON](http://wtforms-json.readthedocs.org/) - A WTForms extension for JSON data handling.
* [WTForms](http://wtforms.readthedocs.org/) - A flexible forms validation and rendering library.

## Data Validation

*Libraries for validating data. Used for forms in many cases.*

* [colander](http://docs.pylonsproject.org/projects/colander/) - A system for validating and deserializing data obtained via XML, JSON, an HTML form post or any other equally simple data serialization.
* [kmatch](https://github.com/ambitioninc/kmatch) - A language for matching/validating/filtering Python dictionaries.
* [schema](https://github.com/halst/schema) - A library for validating Python data structures.
* [Schematics](https://github.com/schematics/schematics) - Data Structure Validation.
* [valideer](https://github.com/podio/valideer) - Lightweight extensible data validation and adaptation library.
* [voluptuous](https://github.com/alecthomas/voluptuous) - A Python data validation library. It is primarily intended for validating data coming into Python as JSON, YAML, etc.

## Anti-spam

*Libraries for fighting spam.*

* [django-simple-captcha](https://github.com/mbi/django-simple-captcha) - A simple and highly customizable Django app to add captcha images to any Django form.
* [django-simple-spam-blocker](https://github.com/moqada/django-simple-spam-blocker) - Simple spam blocker for Django.
* [Stopspam](https://github.com/phalt/stopspam) - Intelligent spam detection for Python.

## Tagging

*Libraries for tagging items.*

* [django-taggit](https://github.com/alex/django-taggit) - Simple tagging for Django.

## Admin Panels

*Libraries for administrative interfaces.*

* [Ajenti](https://github.com/Eugeny/ajenti) - The admin panel your servers deserve.
* [django-suit](http://djangosuit.com/) - Alternative Django Admin-Interface (free only for Non-commercial use).
* [django-xadmin](https://github.com/sshwsfc/django-xadmin) - Drop-in replacement of Django admin comes with lots of goodies.
* [flask-admin](https://github.com/mrjoes/flask-admin) - Simple and extensible administrative interface framework for Flask.
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.
* [Grappelli](http://grappelliproject.com) – A jazzy skin for the Django Admin-Interface.

## Static Site Generator

*Static site generator is a software that takes some text + templates as input and produces html files on the output.*

* [Cactus](http://github.com/koenbok/Cactus/) – Static site generator for designers.
* [Hyde](https://hyde.github.com/) - Jinja2-based static web site generator.
* [Nikola](http://www.getnikola.com/) - A static website and blog generator.
* [Pelican](http://blog.getpelican.com/) - Uses Markdown or ReST for content and Jinja 2 for themes. Supports DVCS, Disqus. AGPL.
* [Tags](http://tags.brace.io/) - The simplest static site generator.
* [Tinkerer](http://tinkerer.me/) - Tinkerer is a blogging engine/.static website generator powered by Sphinx.

## Processes and Threads

*Libraries for woking with processes or threads*

* [envoy](https://github.com/kennethreitz/envoy) - Python Subprocesses for Humans™.
* [multiprocessing](https://docs.python.org/2/library/multiprocessing.html) - (Python standard library) Process-based "threading" interface.
* [sarge](http://sarge.readthedocs.org/) - A wrapper for subprocess.
* [sh](https://github.com/amoffat/sh) - A full-fledged [subprocess](https://docs.python.org/2/library/subprocess.html) replacement for Python.
* [threading](https://docs.python.org/2/library/threading.html) - (Python standard library) Higher-level threading interface.

## Concurrency and Networking

*Libraries for concurrency and network programming.*

* [asyncio](https://docs.python.org/3/library/asyncio.html) - (Python standard library in Python 3.4+) Asynchronous I/O, event loop, coroutines and tasks.
* [Crossbar](http://crossbar.io) - Open-source Unified Application Router (Websocket & WAMP for Python on Autobahn).
* [diesel](https://github.com/jamwt/diesel) - Greenlet-based event I/O Framework for Python.
* [eventlet](http://eventlet.net/) - Asynchronous framework with WSGI support.
* [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
* [pulsar](https://github.com/quantmind/pulsar) - Event-driven concurrent framework for Python.
* [pyzmq](http://zeromq.github.io/pyzmq/) - A Python wrapper for the 0MQ message library.
* [Tornado](http://www.tornadoweb.org/) - A Web framework and asynchronous networking library.
* [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.
* [txZMQ](https://github.com/smira/txZMQ) - Twisted based wrapper for the 0MQ message library.

## WebSocket

*Libraries for woking with WebSocket.*

* [AutobahnPython](https://github.com/tavendo/AutobahnPython) - WebSocket & WAMP for Python on Twisted and [asyncio](https://docs.python.org/3/library/asyncio.html).
* [WebSocket-for-Python](https://github.com/Lawouach/WebSocket-for-Python) - WebSocket client and server library for Python 2 and 3 as well as PyPy.

## WSGI Servers

*WSGI-compatible web servers.*

* [bjoern](http://pypi.python.org/pypi/bjoern) - Asynchronous, very fast and written in C.
* [fapws3](http://www.fapws.org/) - Asynchronous (network side only), written in C.
* [gunicorn](http://pypi.python.org/pypi/gunicorn) - Pre-forked, partly written in C.
* [meinheld](http://pypi.python.org/pypi/meinheld) - Asynchronous, partly written in C.
* [netius](https://github.com/hivesolutions/netius) - Asynchronous, very fast.
* [paste](http://pythonpaste.org/) - Multi-threaded, stable, tried and tested.
* [rocket](http://pypi.python.org/pypi/rocket) - Multi-threaded.
* [waitress](https://waitress.readthedocs.org/) - Multi-threaded, poweres Pyramid.
* [Werkzeug](http://werkzeug.pocoo.org/) - A WSGI utility library for Python that powers Flask and can easily be embedded into your own projects.
* [wsgiref](http://docs.python.org/library/wsgiref.html) - (Python standard library) WSGI reference implementation, single-threaded.

## RPC Servers

*RPC-compatible servers.*

* [SimpleJSONRPCServer](https://github.com/joshmarshall/jsonrpclib/) - This library is an implementation of the JSON-RPC specification.
* [SimpleXMLRPCServer](https://docs.python.org/2/library/simplexmlrpcserver.html) - (Python standard library) Simple XML-RPC server implementation, single-threaded.
* [zeroRPC](https://github.com/dotcloud/zerorpc-python) - zerorpc is a flexible RPC implementation based on [ZeroMQ](http://zeromq.org/) and [MessagePack](http://msgpack.org/).

## Cryptography

* [cryptography](https://cryptography.io/) - A package designed to expose cryptographic primitives and recipes to Python developers.
* [hashids](https://github.com/davidaurelio/hashids-python) - Implementation of [hashids](http://hashids.org) in Python.
* [Paramiko](http://www.paramiko.org/) - A Python (2.6+, 3.3+) implementation of the SSHv2 protocol, providing both client and server functionality.
* [PyCrypto](https://www.dlitz.net/software/pycrypto/) - The Python Cryptography Toolkit.

## GUI

*Libraries for working with graphical user interface applications.*

* [curses](https://docs.python.org/2/library/curses.html#module-curses) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
* [enaml](https://github.com/nucleic/enaml) - Creating beautiful user-interfaces with Declaratic Syntax like QML.
* [kivy](http://kivy.org/) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
* [pyglet](http://www.pyglet.org/) - A cross-platform windowing and multimedia library for Python.
* [PyQt](http://www.riverbankcomputing.co.uk/software/pyqt/intro) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, with support for both Qt v4 and Qt v5 frameworks.
* [PySide](http://qt-project.org/wiki/pyside) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, supporting the Qt v4 framework.
* [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter is Python's de-facto standard GUI package.
* [Toga](https://github.com/pybee/toga) - A Python native, OS native GUI toolkit.
* [urwid](http://urwid.org/) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
* [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.

## Game Development

*Awesome game development libraries.*

* [Cocos2d](http://cocos2d.org/) - cocos2d is a framework for building 2D games, demos, and other graphical/interactive applications. It is based on pyglet.
* [Panda3D](https://www.panda3d.org/) - 3D game engine developed by Disney and maintained by Carnegie Mellon's Entertainment Technology Center. Written in C++, completely wrapped in Python.
* [Pygame](http://www.pygame.org/news.html) - Pygame is a set of Python modules designed for writing games.
* [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python bindings for the Ogre 3D render engine, can be used for games, simulations, anything 3D.
* [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes bindings for OpenGL and it's related APIs.
* [PySDL2](http://pysdl2.readthedocs.org/) - A ctypes based wrapper for the SDL2 library.
* [PySFML](http://www.python-sfml.org/) - Python bindings for [SFML](http://www.sfml-dev.org/)
* [RenPy](http://www.renpy.org/) - A Visual Novel engine.

## Logging

*Libraries for generating and working with log files.*

* [logbook](http://pythonhosted.org/Logbook/) -  Logging replacement for Python.
* [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python.
* [Raven](http://raven.readthedocs.org/) - The Python client for Sentry.
* [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.

## Testing

*Libraries for testing codebases and generating test data.*

* Testing Frameworks
    * [contexts](https://github.com/benjamin-hodgson/Contexts) - A modern and flexible BDD framework for Python 3.3 and above, inspired by C#'s `Machine.Specifications`.
    * [mamba](https://nestorsalceda.github.io/mamba) - The definitive testing tool for Python. Born under the banner of BDD.
    * [nose](https://nose.readthedocs.org/) - nose extends unittest.
    * [pyshould](https://github.com/drslump/pyshould) - Should style asserts based on [PyHamcrest](https://github.com/hamcrest/PyHamcrest).
    * [pytest](http://pytest.org/) - A mature full-featured Python testing tool.
    * [unittest](https://docs.python.org/2/library/unittest.html) - (Python standard library) Unit testing framework.
* Web Testing
    * [locust](https://github.com/locustio/locust) - Scalable user load testing tool written in Python.
    * [Selenium](https://pypi.python.org/pypi/selenium) - Python bindings for [Selenium](http://www.seleniumhq.org/) WebDriver.
    * [splinter](http://splinter.cobrateam.info/) - Open source tool for testing web applications.
* Mock
    * [doublex](https://pypi.python.org/pypi/doublex) - Powerful test doubles framework for Python.
    * [freezegun](https://github.com/spulec/freezegun) - Travel through time by mocking the datetime module.
    * [httmock](https://github.com/patrys/httmock) - A mocking library for requests for Python 2.6+ and 3.2+.
    * [httpretty](http://falcao.it/HTTPretty/) - HTTP request mock tool for Python.
    * [mock](https://pypi.python.org/pypi/mock) - A Python Mocking and Patching Library for Testing.
    * [responses](https://github.com/dropbox/responses) - A utility library for mocking out the requests Python library.
* Code Coverage
    * [coverage](https://pypi.python.org/pypi/coverage) - Code coverage measurement.
* Fake Data
    * [faker](http://www.joke2k.net/faker/) - A Python package that generates fake data.
    * [ForgeryPy](https://pypi.python.org/pypi/ForgeryPy/0.1) - An easy to use forged data generator for Python. It's a port of [forgery](http://rubygems.org/gems/forgery).
    * [mixer](https://mixer.readthedocs.org) - Generating fake data and creating random fixtures for testing in Django ORM, SQLAlchemy, Peewee, MongoEngine, Pony ORM and etc.
    * [model_mommy](https://model-mommy.readthedocs.org/) - Creating random fixtures for testing in Django.
* Error Handler
    * [FuckIt.py](https://github.com/ajalt/fuckitpy) - FuckIt.py uses state-of-the-art technology to make sure your Python code runs whether it has any right to or not.

## Code Analysis and Linter

*Libraries and tools for analysing, parsing and manipulation codebases.*

* Code Analysis
    * [code2flow](https://github.com/scottrogowski/code2flow) - Turn your Python and JavaScript code into DOT flowcharts.
    * [pycallgraph](https://github.com/gak/pycallgraph) - A library that visualises the flow (call graph) of your Python application.
    * [pysonar2](https://github.com/yinwang0/pysonar2) - A type inferencer and indexer for Python.
* Linter
    * [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
    * [pylama](https://pylama.readthedocs.org/) - Code audit tool for Python and JavaScript.
    * [Pylint](http://www.pylint.org/) - A source code analyzer.

## Debugging Tools

*Libraries for debugging code.*

* [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar) - Display various debug information about the current request/response.
* [django-devserver](https://github.com/dcramer/django-devserver) - A drop-in replacement for Django's runserver.
* [ipdb](https://pypi.python.org/pypi/ipdb) - IPython-enabled pdb.
* [memory_profiler](https://github.com/fabianp/memory_profiler) - Monitor Memory usage of Python code.
* [pdb](https://docs.python.org/2/library/pdb.html) - (Python standard library) The Python Debugger.
* [pudb](https://pypi.python.org/pypi/pudb) – A full-screen, console-based Python debugger.
* [pyringe](https://github.com/google/pyringe) - Debugger capable of attaching to and injecting code into Python processes.
* [python-statsd](https://github.com/WoLpH/python-statsd) - Python Client for the [statsd](https://github.com/etsy/statsd/) server.
* [winpdb](http://winpdb.org/) - A Platform Independent Python Debugger with GUI.

## Science and Data Analysis

*Libraries for scientific computing and data analyzing.*

* [astropy](http://www.astropy.org/) - A community Python library for Astronomy.
* [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
* [Numba](http://numba.pydata.org/) - Python JIT (just in time) complier to LLVM aimed at scientific Python by the developers of Cython and NumPy.
* [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
* [Open Mining](https://github.com/avelino/mining) - Business Intelligence (BI) in Python (Pandas web interface)
* [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
* [PyDy](https://pydy.org/) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion based around NumPy, SciPy, IPython, and matplotlib.
* [PyMC](https://github.com/pymc-devs/pymc) - Markov Chain Monte Carlo sampling toolkit.
* [Sage](http://www.sagemath.org) - A mathematics software with a mission to be an open-source alternative to Magma, Maple, Mathematica, and Matlab.
* [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
* [statsmodels](https://github.com/statsmodels/statsmodels) - Statistical modeling and econometrics in Python.
* [SymPy](https://github.com/sympy/sympy) - A Python library for symbolic mathematics.
* [zipline](https://github.com/quantopian/zipline) - A Pythonic algorithmic trading library.

## Data Visualization

*Libraries for visualizing data. See: [awesome-javascript's Data Visualization section](https://github.com/sorrycc/awesome-javascript#data-visualization).*

* [bokeh](https://github.com/ContinuumIO/bokeh) - Interactive Web Plotting for Python.
* [d3py](https://github.com/mikedewar/d3py) - A plottling library for Python, based on [D3.js](http://d3js.org/).
* [ggplot](https://github.com/yhat/ggplot) - Same API as ggplot2 for R.
* [Kartograph.py](https://github.com/kartograph/kartograph.py) - Rendering beautiful SVG maps in Python.
* [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
* [plotly](https://plot.ly/python) - Collaborative web plotting for Python and matplotlib.
* [pygal](http://pygal.org/) - A Python SVG Charts Creator.
* [pygraphviz](https://pypi.python.org/pypi/pygraphviz) - Python interface to [Graphviz](http://www.graphviz.org/).
* [vincent](https://github.com/wrobstory/vincent) - A Python to Vega translator.

## Computer Vision

*Libraries for computer vision.*

* [OpenCV](http://opencv.org/) - Open Source Computer Vision Library.
* [SimpleCV](http://simplecv.org/) - An open source framework for building computer vision applications.

## Machine Learning

*Libraries for Machine Learning. See: [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python).*

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

## Functional Programming

* [CyToolz](https://github.com/pytoolz/cytoolz/) - Cython implementation of Toolz: High performance functional utilities.
* [fn.py](https://github.com/kachayev/fn.py) - Functional programming in Python: implementation of missing features to enjoy FP.
* [funcy](https://github.com/Suor/funcy) - A fancy and practical functional tools.
* [Toolz](https://github.com/pytoolz/toolz) - A collection of functional utilities for iterators, functions, and dictionaries.

## Third-party APIs

*Libraries for accessing third party services APIs. See: [List of Python API Wrappers and Libraries](https://github.com/realpython/list-of-python-api-wrappers).*

* [apache-libcloud](https://libcloud.apache.org/) - One Python library for all clouds.
* [boto](https://github.com/boto/boto) - Python interface to Amazon Web Services.
* [facebook-sdk](https://github.com/pythonforfacebook/facebook-sdk) - Facebook Platform Python SDK.
* [facepy](https://github.com/jgorset/facepy) - Facepy makes it really easy to interact with Facebook's Graph API
* [gmail](https://github.com/charlierguo/gmail) - A Pythonic interface for Gmail.
* [google-api-python-client](https://github.com/google/google-api-python-client) - Google APIs Client Library for Python.
* [gspread](https://github.com/burnash/gspread) - Google Spreadsheets Python API.
* [linkedin](https://github.com/ozgur/python-linkedin) - A Python interface for LinkedIn.
* [praw](https://github.com/praw-dev/praw) - A Python wrapper for the Reddit API.
* [python-instagram](https://github.com/Instagram/python-instagram) - A Python Client for Instagram API.
* [soundcloud-python](https://github.com/soundcloud/soundcloud-python) - A Python wrapper around the Soundcloud API.
* [twython](https://github.com/ryanmcgrath/twython) - A Python wrapper for the Twitter API.
* [Wikipedia](https://wikipedia.readthedocs.org/) - A Pythonic wrapper for the Wikipedia API.

## DevOps Tools

*Software and libraries for DevOps.*

* [Ansible](http://www.ansible.com/) - An IT automation tool.
* [cuisine](https://github.com/sebastien/cuisine) - Chef-like functionality for Fabric.
* [Fabric](http://www.fabfile.org/) - Tool for streamlining the use of SSH for application deployment or systems administration tasks.
* [Fabtools](https://github.com/ronnix/fabtools) - Tools for writing awesome Fabric files.
* [honcho](https://github.com/nickstenning/honcho) - A Python port of [Foreman](https://github.com/ddollar/foreman), a tool for managing Procfile-based applications.
* [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
* [pexpect](https://github.com/pexpect/pexpect) - A Python module for controlling interactive programs in a pseudo-terminal like GNU expect.
* [provy](https://github.com/python-provy/provy) - An easy-to-use provisioning system in Python.
* [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.
* [SaltStack](http://www.saltstack.com/community/) - Infrastructure automation and management system.

## Job Scheduler

*Libraries for scheduling jobs.*

* [APScheduler](http://apscheduler.readthedocs.org/) - A light but powerful in-process task scheduler that lets you schedule functions.
* [django-schedule](https://github.com/thauber/django-schedule) - A calendaring app for Django.
* [doit](http://pydoit.org/) - A task runner/build tool.
* [Joblib](http://pythonhosted.org/joblib/index.html) - A set of tools to provide lightweight pipelining in Python.
* [Plan](https://github.com/fengsp/plan) - Writing crontab file in Python like a charm.
* [schedule](https://github.com/dbader/schedule) - Python job scheduling for humans.
* [Spiff](https://github.com/knipknap/SpiffWorkflow) - A powerful workflow engine implemented in pure Python.
* [TaskFlow](http://docs.openstack.org/developer/taskflow/) - A Python library that helps to make task execution easy, consistent and reliable.

## Foreign Function Interface

*Libraries for providing foreign function interface.*

* [cffi](https://pypi.python.org/pypi/cffi) - Foreign Function Interface for Python calling C code.
* [ctypes](https://docs.python.org/2/library/ctypes.html) - (Python standard library) Foreign Function Interface for Python calling C code.
* [PyCUDA](http://mathema.tician.de/software/pycuda/) - A Python wrapper for Nvidia's CUDA API.
* [SWIG](http://www.swig.org/Doc1.3/Python.html) - Simplified Wrapper and Interface Generator.

## High Performance

*Libraries for making Python faster.*

* [Cython](http://cython.org/) - Optimizing Static Complier for Python. Uses type mixins to compile Python into C or C++ modules resulting in large performance gains.
* [PyPy](http://pypy.org/) - An implementation of Python in Python. The interpreter uses black magic to make Python very fast without having to add in additional type information.
* [Pyston](https://github.com/dropbox/pyston) - A Python implementation built using LLVM and modern JIT techniques with the goal of achieving good performance.
* [Stackless Python](http://www.stackless.com/) - An enhanced version of the Python.

## Microsoft Windows

*Python programming on Microsoft Windows.*

* [Python(x,y)](https://code.google.com/p/pythonxy/) - Scientific-applications-oriented Python Distribution based on Qt and Spyder.
* [pythonlibs](http://www.lfd.uci.edu/~gohlke/pythonlibs/) - Unofficial Windows(32/64-bit) binaries for Python extension packages
* [spyder](https://code.google.com/p/spyderlib/) - IDE for the Python language with advanced editing, interactive testing, debugging and introspection features (also comes with Anaconda).

## Network Virtualization and SDN

*Tools and libraries for Virtual Networking and SDN (Software Defined Networking).*

* [Mininet](http://mininet.org/) - A popular network emulator and API written in Python.
* [POX](http://www.noxrepo.org/pox/about-pox/) - An open source development platform for Python-based Software Defined Networking (SDN) control applications, such as OpenFlow SDN controllers.
* [Pyretic](http://frenetic-lang.org/pyretic/) - A member of the Frenetic family of SDN programming languages that provides powerful abstractions over network switches or emulators.
* [SDX Platform](https://github.com/sdn-ixp/internet2award) - SDN based IXP implementation that leverages Mininet, POX and Pyretic.

## Hardware

*Libraries for programming with hardware.*

* [ino](http://inotool.org/) - Command line toolkit for working with [Arduino](http://www.arduino.cc/).
* [Pyro](http://pyrorobotics.com/) - Python Robotics.
* [scapy](http://www.secdev.org/projects/scapy/) - A brilliant packet manipulation library.
* [wifi](https://wifi.readthedocs.org/) - A Python library and command line tool for working with WiFi on Linux.

## Miscellaneous

*Useful libraries or tools that don't fit in the categories above.*

* [blinker](https://github.com/jek/blinker) - A fast Python in-process signal/event dispatching system.
* [itsdangerous](https://github.com/mitsuhiko/itsdangerous) - Various helpers to pass trusted data to untrusted environments.
* [pluginbase](https://github.com/mitsuhiko/pluginbase) - A simple but flexible plugin system for Python.

## Algorithms and Design Patterns

*Collections of algorithms and design patterns.*

* [algorithms](https://github.com/nryoung/algorithms) - module of algorithms for Python.
* [python-patterns](https://github.com/faif/python-patterns) - A collection of design patterns in Python.

## Editor Plugins

*Plugins for editors and IDEs.*

* Vim
    * [Jedi-vim](https://github.com/davidhalter/jedi-vim) - Vim bindings for the [Jedi](https://github.com/davidhalter/jedi) autocompletion library for Python.
    * [Python-mode](https://github.com/klen/python-mode) - An all in one plugin for turning Vim into a Python IDE.
* Emacs
    * [Elpy](https://github.com/jorgenschaefer/elpy) - Emacs Python Development Environment.
* Sublime Text
    * [Anaconda](https://github.com/DamnWidget/anaconda) - Anaconda turns your Sublime Text 3 in a full featured Python development IDE.
    * [Djaneiro](https://github.com/squ1b3r/Djaneiro) - Django support for Sublime Text.
    * [SublimeJEDI](https://github.com/srusskih/SublimeJEDI) - A Sublime Text plugin to the awesome autocomplete library [Jedi](https://github.com/davidhalter/jedi).

# Resources

Where to discover new Python libraries.

## Websites

* [CoolGithubProjects](http://coolgithubprojects.com/) - Sharing cool github projects just got easier!
* [Django Packages](https://www.djangopackages.com/) - A directory of reusable apps, sites, tools, and more for Django projects.
* [Full Stack Python](http://www.fullstackpython.com/) - Plain English explanations for every layer of the Python web application stack.
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
* [@pythontrending](https://twitter.com/pythontrending)
* [@PythonWeekly](https://twitter.com/PythonWeekly)

# Other Awesome Lists

List of lists.

* Python
    * [easy-python](http://easy-python.readthedocs.org/)
    * [pycrumbs](https://github.com/kirang89/pycrumbs/blob/master/pycrumbs.md)
    * [python-github-projects](https://github.com/checkcheckzz/python-github-projects)
    * [python_reference](https://github.com/rasbt/python_reference)
    * [pythonidae](https://github.com/svaksha/pythonidae)
* Monty
    * [awesome-awesomeness](https://github.com/bayandin/awesome-awesomeness)
    * [lists](https://github.com/jnv/lists)

# [Contributing](https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md)

Your contributions are always welcome!
