# Awesome Python

A curated list of awesome Python frameworks, libraries and software. Inspired by [awesome-php](https://github.com/ziadoz/awesome-php).

- [Awesome Python](#awesome-python)
    - [Environment Management](#environment-management)
    - [Package Management](#package-management)
    - [Package Repositories](#package-repositories)
    - [Distribution](#distribution)
    - [Build Tools](#build-tools)
    - [Interactive Interpreter](#interactive-interpreter)
    - [Files](#files)
    - [Date and Time](#date-and-time)
    - [Text Processing](#text-processing)
    - [Specific Formats Processing](#specific-formats-processing)
    - [Natural Language Processing](#natural-language-processing)
    - [Documentation](#documentation)
    - [Configuration](#configuration)
    - [Command-line Tools](#command-line-tools)
    - [Downloader](#downloader)
    - [Imagery](#imagery)
    - [OCR](#ocr)
    - [Audio](#audio)
    - [Video](#video)
    - [Geolocation](#geolocation)
    - [HTTP](#http)
    - [Database](#database)
    - [Database Drivers](#database-drivers)
    - [ORM](#orm)
    - [Web Frameworks](#web-frameworks)
    - [Permissions](#permissions)
    - [CMS](#cms)
    - [E-commerce](#e-commerce)
    - [RESTful API](#restful-api)
    - [Authentication](#authentication)
    - [Template Engine](#template-engine)
    - [Queue](#queue)
    - [Search](#search)
    - [News Feed](#news-feed)
    - [Asset Management](#asset-management)
    - [Caching](#caching)
    - [Email](#email)
    - [Internationalization](#internationalization)
    - [URL Manipulation](#url-manipulation)
    - [HTML Manipulation](#html-manipulation)
    - [Web Crawling](#web-crawling)
    - [Web Content Extracting](#web-content-extracting)
    - [Forms](#forms)
    - [Data Validation](#data-validation)
    - [Anti-spam](#anti-spam)
    - [Tagging](#tagging)
    - [Admin Panels](#admin-panels)
    - [Static Site Generator](#static-site-generator)
    - [Processes and Threads](#processes-and-threads)
    - [Concurrency and Networking](#concurrency-and-networking)
    - [WebSocket](#websocket)
    - [WSGI Servers](#wsgi-servers)
    - [RPC Servers](#rpc-servers)
    - [Cryptography](#cryptography)
    - [GUI](#gui)
    - [Game Development](#game-development)
    - [Logging](#logging)
    - [Testing](#testing)
    - [Code Analysis and Linter](#code-analysis-and-linter)
    - [Debugging Tools](#debugging-tools)
    - [Science and Data Analysis](#science-and-data-analysis)
    - [Data Visualization](#data-visualization)
    - [Computer Vision](#computer-vision)
    - [Machine Learning](#machine-learning)
    - [Functional Programming](#functional-programming)
    - [MapReduce](#mapreduce)
    - [Third-party APIs](#third-party-apis)
    - [DevOps Tools](#devops-tools)
    - [Job Scheduler](#job-scheduler)
    - [Foreign Function Interface](#foreign-function-interface)
    - [High Performance](#high-performance)
    - [Network Virtualization and SDN](#network-virtualization-and-sdn)
    - [Hardware](#hardware)
    - [Compatibility](#compatibility)
    - [Miscellaneous](#miscellaneous)
    - [Algorithms and Design Patterns](#algorithms-and-design-patterns)
    - [Editor Plugins](#editor-plugins)
- [Resources](#resources)
    - [Websites](#websites)
    - [Weekly](#weekly)
    - [Twitter](#twitter)
- [Other Awesome Lists](#other-awesome-lists)
- [Contributing](#contributing)

---

## Environment Management

*Libraries for Python version and environment management.*

* [pyenv](https://github.com/yyuu/pyenv) - Simple Python version management.
* [virtualenv](https://pypi.python.org/pypi/virtualenv) - A tool to create isolated Python environments.
* [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper) - A set of extensions to virtualenv.
* [virtualenv-api](https://github.com/sjkingo/virtualenv-api) - An API for virtualenv and pip.
* [pew](https://pypi.python.org/pypi/pew/) - A set of tools to manage multiple virtual environments.
* [Vex](https://github.com/sashahart/vex) - Run a command in the named virtualenv.
* [PyRun](https://www.egenix.com/products/python/PyRun/) - A one-file, no-installation-needed version of Python.

## Package Management

*Libraries for package and dependency management.*

* [pip](https://pip.pypa.io/) - The Python package and dependency manager.
    * [Python Package Index](https://pypi.python.org/pypi)
* [conda](https://github.com/conda/conda/) - Cross-platform, Python-agnostic binary package manager.
* [Curdling](http://clarete.li/curdling/) - Curdling is a command line tool for managing Python packages.
* [wheel](http://pythonwheels.com/) - The new standard of Python distribution and are intended to replace eggs.

## Package Repositories

*Local PyPI repository server and proxies.*

* [warehouse](https://github.com/pypa/warehouse) - Next generation Python Package Repository (PyPI).
    * [Warehouse](https://warehouse.python.org/)
* [devpi](http://doc.devpi.net/) - PyPI server and packaging/testing/release tool.
* [localshop](https://github.com/mvantellingen/localshop) - PyPI server which mirrors official packages on-demand, and also supports local (private) package uploads.

## Distribution

*Libraries to create packaged executables for release distribution.*

* [cx-Freeze](http://cx-freeze.readthedocs.org/) - Freezes Python scripts (cross-platform).
* [py2exe](http://www.py2exe.org/) - Freezes Python scripts (Windows).
* [pynsist](http://pynsist.readthedocs.org/) - A tool to build Windows installers, installers bundle Python itself.
* [py2app](http://pythonhosted.org/py2app/) - Freezes Python scripts (Mac OS X).
* [PyInstaller](http://www.pyinstaller.org/) - Converts Python programs into stand-alone executables (cross-platform).
* [dh-virtualenv](http://dh-virtualenv.readthedocs.org/) - Build and distribute a virtualenv as a Debian package.
* [Nuitka](http://nuitka.net/) - Compile scripts, modules, packages to an executable or extension module.

## Build Tools

*Compile software from source code.*

* [buildout](http://www.buildout.org/) - A build system for creating, assembling and deploying applications from multiple parts, some of which may be non-Python-based.
* [SCons](http://www.scons.org/) - A software construction tool.
* [PlatformIO](https://github.com/ivankravets/platformio) - A console tool to build code with different development platforms.
* [BitBake](http://www.yoctoproject.org/docs/1.6/bitbake-user-manual/bitbake-user-manual.html) - A make-like build tool with the special focus of distributions and packages for embedded Linux.
* [fabricate](https://code.google.com/p/fabricate/) - A build tool that finds dependencies automatically for any language.

## Interactive Interpreter

*Interactive Python interpreters.*

* [IPython](https://github.com/ipython/ipython) - A rich toolkit to help you make the most out of using Python interactively.
* [bpython](http://bpython-interpreter.org) – A fancy interface to the Python interpreter.
* [python-prompt-toolkit](https://github.com/jonathanslenders/python-prompt-toolkit) - A Library for building powerful interactive command lines.

## Files

*Libraries for file manipulation and MIME type detection.*

* [mimetypes](https://docs.python.org/2/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
* [imghdr](https://docs.python.org/2/library/imghdr.html) - (Python standard library) Determine the type of an image.
* [python-magic](https://github.com/ahupp/python-magic) - A Python interface to the libmagic file type identification library.
* [path.py](https://github.com/jaraco/path.py) - A module wrapper for [os.path](https://docs.python.org/2/library/os.path.html).
* [watchdog](https://github.com/gorakhargosh/watchdog) - API and shell utilities to monitor file system events.
* [Unipath](https://github.com/mikeorr/Unipath) - An object-oriented approach to file/directory operations.
* [pathlib](https://pathlib.readthedocs.org/en/pep428/) - (Python standard library in Python 3.4+) An cross-platform, object-oriented path library.

## Date and Time

*Libraries for working with dates and times.*

* [arrow](https://github.com/crsmithdev/arrow) - Better dates & times for Python.
* [Chronyk](https://github.com/KoffeinFlummi/Chronyk) - A Python 3 library for parsing human-written times and dates.
* [dateutil](https://pypi.python.org/pypi/python-dateutil) - Extensions to the standard Python [datetime](https://docs.python.org/2/library/datetime.html) module.
* [delorean](https://github.com/myusuf3/delorean/) - A library for clearing up the inconvenient truths that arise dealing with datetimes.
* [when.py](https://github.com/dirn/When.py) - Providing user-friendly functions to help perform common date and time actions.
* [moment](https://github.com/zachwill/moment) - A Python library for dealing with dates/times. Inspired by [Moment.js](http://momentjs.com/).
* [pytz](https://launchpad.net/pytz) - World timezone definitions, modern and historical. Brings the [tz database](http://en.wikipedia.org/wiki/Tz_database) into Python.

## Text Processing

*Libraries for parsing and manipulating plain texts.*

* General
    * [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
    * [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
    * [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) - Fuzzy String Matching.
    * [esmre](https://code.google.com/p/esmre/) - Regular expression accelerator.
    * [shortuuid](https://github.com/stochastic-technologies/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
    * [ftfy](https://github.com/LuminosoInsight/python-ftfy) - Makes Unicode text less broken and more consistent automagically.
    * [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
    * [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
    * [xpinyin](https://github.com/lxneng/xpinyin) - A library to translate Chinese hanzi (漢字) to pinyin (拼音).
    * [pangu.py](https://github.com/vinta/pangu.py) - Spacing texts for CJK and alphanumerics.
    * [pyfiglet](https://github.com/pwaller/pyfiglet) - An implementation of figlet written in Python.
    * [uniout](https://github.com/moskytw/uniout) - Print readable chars instead of the escaped string.
* Slugify
    * [awesome-slugify](https://github.com/dimka665/awesome-slugify) - A Python slugify library that can preserve unicode.
    * [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that translates unicode to ASCII.
    * [unicode-slugify](https://github.com/mozilla/unicode-slugify) - A slugifier that generates unicode slugs with Django as a dependency.
* Parser
    * [PLY](http://www.dabeaz.com/ply/) - Implementation of lex and yacc parsing tools for Python
    * [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Parsing, formatting, storing and validating international phone numbers.
    * [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
    * [sqlparse](https://sqlparse.readthedocs.org/) - A non-validating SQL parser.
    * [Pygments](http://pygments.org/) - A generic syntax highlighter.
    * [python-nameparser](https://github.com/derek73/python-nameparser) - Parsing human names into their individual components.
    * [pyparsing](http://pyparsing.wikispaces.com/) - A general purpose framework for generating parsers.

## Specific Formats Processing

*Libraries for parsing and manipulating specific text formats.*

* General
    * [tablib](https://github.com/kennethreitz/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
* Office
    * [python-docx](https://github.com/python-openxml/python-docx) - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
    * [xlwt](https://github.com/python-excel/xlwt) / [xlrd](https://github.com/python-excel/xlrd) - Writing and reading data and formatting information from Excel files.
    * [XlsxWriter](https://xlsxwriter.readthedocs.org/) - A Python module for creating Excel .xlsx files.
    * [xlwings](http://xlwings.org/) - A BSD-licensed library that makes it easy to call Python from Excel and vice versa.
    * [Marmir](https://github.com/brianray/mm) - Takes Python data structures and turns them into spreadsheets.
* PDF
    * [PDFMiner](https://github.com/euske/pdfminer) - A tool for extracting information from PDF documents.
    * [PyPDF2](https://github.com/mstamy2/PyPDF2) - A library capable of splitting, merging and transforming PDF pages.
* Markdown
    * [Python-Markdown](https://github.com/waylan/Python-Markdown) - A Python implementation of John Gruber’s Markdown.
    * [Mistune](https://github.com/lepture/mistune) - Fastest and full featured pure Python parsers of Markdown.
* YAML
    * [PyYAML](http://pyyaml.org/) - YAML implementations for Python.
* CSV
    * [csvkit](https://github.com/onyxfish/csvkit) - Utilities for converting to and working with CSV.
* Archive
    * [unp](https://github.com/mitsuhiko/unp) - A command line tool that can unpack archives easily.

## Natural Language Processing

*Libraries for working with human languages.*

* [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
* [Pattern](http://www.clips.ua.ac.be/pattern) - A web mining module for the Python. It has tools for natural language processing, machine learning, among others.
* [TextBlob](http://textblob.readthedocs.org/) - Providing a consistent API for diving into common NLP tasks. Stands on the giant shoulders of NLTK and Pattern.
* [jieba](https://github.com/fxsjy/jieba) - Chinese Words Segmentation Utilities.
* [SnowNLP](https://github.com/isnowfy/snownlp) - A library for processing Chinese text.
* [loso](https://github.com/victorlin/loso) - Another Chinese segmentation library.
* [genius](https://github.com/duanhongyi/genius) - A Chinese segment base on Conditional Random Field.

## Documentation

*Libraries for generating project documentation.*

* [Sphinx](http://sphinx-doc.org/) - Python Documentation generator.
    * [awesome-sphinxdoc](https://github.com/yoloseem/awesome-sphinxdoc)
* [reStructuredText](http://docutils.sourceforge.net/rst.html) - Markup Syntax and Parser Component of Docutils.
* [MkDocs](http://www.mkdocs.org/) - Markdown friendly documentation generator.
* [Pycco](http://fitzgen.github.io/pycco/) - The original quick-and-dirty, hundred-line-long, literate-programming-style documentation generator.
* [pdoc](https://github.com/BurntSushi/pdoc) - Epydoc replacement to auto generate API documentation for Python libraries.

## Configuration

*Libraries for storing configuration options.*

* [ConfigParser](https://docs.python.org/2/library/configparser.html) - (Python standard library) INI file parser.
* [ConfigObj](http://www.voidspace.org.uk/python/configobj.html) - INI file parser with validation.
* [config](http://www.red-dove.com/config-doc/) - Hierarchical config from the author of [logging](https://docs.python.org/2/library/logging.html).
* [profig](http://profig.readthedocs.org/) - Config from multiple formats with value conversion.

## Command-line Tools

*Libraries for building command-line application.*

* Command-line Application Development
    * [cement](http://builtoncement.com/) - Cement provides a light-weight and fully featured foundation to build anything from single file scripts to complex and intricately designed applications.
    * [click](http://click.pocoo.org/) - A package for creating beautiful command line interfaces in a composable way.
    * [clint](https://github.com/kennethreitz/clint) - Python Command-line Application Tools.
    * [cliff](https://cliff.readthedocs.org/) - A framework for creating command-line programs with multi-level commands.
    * [Clime](http://clime.mosky.tw) – Clime lets you convert any module into a multi-command CLI program without any configuration.
    * [docopt](http://docopt.org/) - Pythonic command line arguments parser.
    * [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.
    * [pyCLI](https://pythonhosted.org/pyCLI/) - Command-line applications supporting standard command line parsing, logging, unit and functional testing.
    * [Gooey](https://github.com/chriskiehl/Gooey) - Turn command line programs into a full GUI application with one line
* Productivity Tools
    * [cookiecutter](https://github.com/audreyr/cookiecutter) - A command-line utility that creates projects from cookiecutters (project templates). E.g. Python package projects, jQuery plugin projects.
    * [httpie](https://github.com/jakubroztocil/httpie) - A command line HTTP client, a user-friendly cURL replacement.
    * [percol](https://github.com/mooz/percol) - Adds flavor of interactive selection to the traditional pipe concept on UNIX.
    * [RainbowStream](http://www.rainbowstream.org/) - Smart and nice Twitter client on terminal.
    * [caniusepython3](https://github.com/brettcannon/caniusepython3) - Determine what projects are blocking you from porting to Python 3.

## Downloader

*Libraries for downloading.*

* [s3cmd](https://github.com/s3tools/s3cmd) - A command line tool for managing Amazon S3 and CloudFront.
* [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.
* [you-get](http://www.soimort.org/you-get/) - A YouTube/Youku/Niconico video downloader written in Python 3.
* [coursera](https://github.com/coursera-dl/coursera) - Script for downloading Coursera.org videos and naming them.
* [WikiTeam](https://github.com/WikiTeam/wikiteam) - Tools for downloading and preserving wikis.
* [subliminal](https://github.com/Diaoul/subliminal) - Library and command line tool to search and download subtitles.

## Imagery

*Libraries for manipulating images.*

* [pillow](http://pillow.readthedocs.org/) - Pillow is the friendly [PIL](http://www.pythonware.com/products/pil/) fork.
* [wand](https://github.com/dahlia/wand) - Python bindings for [MagickWand](http://www.imagemagick.org/script/magick-wand.php), C API for ImageMagick.
* [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, resizing and flipping of images.
* [imgSeek](http://www.imgseek.net/) - A project for searching a collection of images using visual similarity.
* [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
* [pyBarcode](https://pythonhosted.org/pyBarcode/) - Create barcodes in Python without needing PIL.
* [pygram](https://github.com/ajkumar25/pygram) - Instagram-like image filters.
* [Quads](https://github.com/fogleman/Quads) - Computer art based on quadtrees.
* [nude.py](https://github.com/hhatto/nude.py) - Nudity detection.
* [scikit-image](http://scikit-image.org/) - A Python library for (scientific) image processing.
* [hmap](https://github.com/rossgoodwin/hmap) - Image histogram remapping.

## OCR

*Libraries for Optical Character Recognition.*

* [python-tesseract] (https://code.google.com/p/python-tesseract) - A wrapper class for [Google Tesseract OCR](https://code.google.com/p/tesseract-ocr/).
* [pytesseract](https://github.com/madmaze/pytesseract) - Another wrapper for Google Tesseract OCR. 
* [pyocr](https://github.com/jflesch/pyocr) - A wrapper for Tesseract and Cuneiform.

## Audio

*Libraries for manipulating audio.*

* [audiolazy](https://github.com/danilobellini/audiolazy) - Expressive Digital Signal Processing (DSP) package for Python.
* [audioread](https://github.com/sampsyo/audioread) - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
* [beets](http://beets.radbox.org/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
* [dejavu](https://github.com/worldveil/dejavu) - Audio fingerprinting and recognition.
* [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) - Django + [Amazon Elastic Transcoder](http://aws.amazon.com/elastictranscoder/).
* [eyeD3](http://eyed3.nicfit.net/) - A tool for working with audio files, specifically MP3 files containing ID3 metadata.
* [id3reader](http://nedbatchelder.com/code/modules/id3reader.py) - A Python module for reading MP3 meta data.
* [mutagen](https://code.google.com/p/mutagen/) - A Python module to handle audio metadata.
* [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
* [pyechonest](https://github.com/echonest/pyechonest) - Python client for the [Echo Nest](http://developer.echonest.com/docs/) API.
* [talkbox](http://scikits.appspot.com/talkbox) - A Python library for speech/signal processing.
* [TimeSide](https://github.com/yomguy/TimeSide) - Open web audio processing framework.
* [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.
* [m3u8](https://github.com/globocom/m3u8) - A module for parsing m3u8 file.

## Video

*Libraries for manipulating video and GIFs.*

* [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
* [shorten.tv](http://www.shorten.tv/) - Video summarization.
* [scikit-video](https://github.com/aizvorski/scikit-video) - Video processing routines for SciPy.

## Geolocation

*Libraries for geocoding addresses and working with latitudes and longitudes.*

* [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
* [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.
* [pygeoip](https://github.com/appliedsec/pygeoip) - Pure Python GeoIP API.
* [GeoIP](https://github.com/maxmind/geoip-api-python) - Python API for MaxMind GeoIP Legacy Database.
* [geojson](https://github.com/frewsxcv/python-geojson) - Python bindings and utlities for GeoJSON.
* [django-countries](https://github.com/SmileyChris/django-countries) - A Django app that provides country choices for use with forms, flag icons static files, and a country field for models.

## HTTP

*Libraries for working with HTTP.*

* [requests](http://docs.python-requests.org/) - HTTP Requests for Humans™.
* [grequests](https://github.com/kennethreitz/grequests) - requests + gevent for asynchronous HTTP requests.
* [urllib3](https://github.com/shazow/urllib3) - A HTTP library with thread-safe connection pooling, file post support, sanity friendly.
* [httplib2](https://github.com/jcgregorio/httplib2) - Comprehensive HTTP client library.
* [treq](https://github.com/dreid/treq) - Python requests like API built on top of Twisted's HTTP client.

## Database

*Databases implemented in Python.*

* [ZODB](http://www.zodb.org/) - A native object database for Python. A key-value and object graph database.
* [pickleDB](https://pythonhosted.org/pickleDB/) - A simple and lightweight key-value store for Python.
* [TinyDB](https://github.com/msiemens/tinydb) - A tiny, document-oriented database.

## Database Drivers

*Libraries for connecting and operating databases.*

* Relational Databases
    * [mysql-python](http://sourceforge.net/projects/mysql-python/) - The MySQL database connector for Python.
    * [mysqlclient](https://github.com/PyMySQL/mysqlclient-python) - mysql-python fork supporting Python 3.
    * [PyMySQL](https://github.com/PyMySQL/PyMySQL) - Pure Python MySQL driver compatible to mysql-python.
    * [mysql-connector-python](https://pypi.python.org/pypi/mysql-connector-python) - A pure Python MySQL driver from Oracle.
    * [oursql](https://pythonhosted.org/oursql/) - A better MySQL connector with support for native prepared statements and BLOBs.
    * [psycopg2](http://initd.org/psycopg/) - The most popular PostgreSQL adapter for Python.
    * [txpostgres](http://txpostgres.readthedocs.org/) - Twisted based asynchronous driver for PostgreSQL.
    * [queries](https://github.com/gmr/queries) - A wrapper of the psycopg2 library for interacting with PostgreSQL.
    * [dataset](https://github.com/pudo/dataset) - Store Python dicts in a database - works with SQLite, MySQL, and PostgreSQL.
* NoSQL Databases
    * [cassandra-python-driver](https://github.com/datastax/python-driver) - Python driver for Cassandra.
    * [pycassa](https://github.com/pycassa/pycassa) - Python Thrift driver for Cassandra.
    * [HappyBase](http://happybase.readthedocs.org/) - A developer-friendly library for Apache HBase.
    * [PyMongo](http://docs.mongodb.org/ecosystem/drivers/python/) - The official Python client for MongoDB.
    * [Plyvel](https://plyvel.readthedocs.org/) - A fast and feature-rich Python interface to LevelDB.
    * [redis-py](https://github.com/andymccurdy/redis-py) - The Redis Python Client.
    * [py2neo](http://book.py2neo.org/) - Python wrapper client for Neo4j's restful interface.
    * [telephus](https://github.com/driftx/Telephus) - Twisted based client for Cassandra.
    * [txRedis](https://github.com/deldotdr/txRedis) - Twisted based client for Redis.

## ORM

*Libraries that implement Object-Relational Mapping or datamapping techniques.*

* Relational Databases
    * [Django Models](https://docs.djangoproject.com/en/dev/topics/db/models/) - A part of Django.
    * [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
        * [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy)
    * [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
    * [PonyORM](http://ponyorm.com) - ORM that provides a generator-oriented interface to SQL.
* NoSQL Databases
    * [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    * [django-mongodb-engine](https://github.com/django-nonrel/mongodb-engine) - Django MongoDB Backend.
    * [redisco](https://github.com/kiddouk/redisco) - A Python Library for Simple Models and Containers Persisted in Redis.
    * [flywheel](https://github.com/mathcamp/flywheel) - Object mapper for Amazon DynamoDB.
* Others
    * [butterdb](https://github.com/Widdershin/butterdb) - A Python ORM for Google Drive Spreadsheets.

## Web Frameworks

*Full stack web frameworks.*

* [Django](https://www.djangoproject.com/) - The most popular web framework in Python.
    * [awesome-django](https://github.com/rosarior/awesome-django)
* [Flask](http://flask.pocoo.org/) - A microframework for Python.
    * [awesome-flask](https://github.com/humiaozuzu/awesome-flask)
* [Bottle](http://bottlepy.org/) - A fast, simple and lightweight WSGI micro web-framework.
* [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.
* [web2py](http://www.web2py.com) - A full stack web framework and platform focused in the ease of use.
* [web.py](http://webpy.org/) - A web framework for Python that is as simple as it is powerful.
* [TurboGears](http://www.turbogears.org/) - The Web Framework that starts as a microframework and scales up to a fullstack solution.
* [CherryPy](http://www.cherrypy.org/) - A Minimalist Python Web Framework, HTTP/1.1-compliant and WSGI thread-pooled.
* [Grok](http://grok.zope.org/) - A framework built on the existing Zope 3 libraries.
* [Bluebream](http://bluebream.zope.org/) - An open-source web application server, framework and library, formerly known as Zope 3.
* [guava](https://github.com/flatpeach/guava) - A lightweight and high performance web framework for Python written in C.

## Permissions

*Libraries that allow or deny users access to data or functionality.*

* [django-guardian](https://github.com/lukaszb/django-guardian) - Implementation of per object permissions for Django 1.2+
* [Carteblanche](http://www.github.com/neuman/python-carteblanche/) - Module to align code with thoughts of users and designers. Also magically handles navigation and permissions.

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
* [python-currencies](https://github.com/Alir3z4/python-currencies) - Display money format and its filthy currencies.

## RESTful API

*Libraries for developing RESTful APIs.*

* [cornice](https://cornice.readthedocs.org/) - A REST framework for Pyramid.
* [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit that makes it easy to build Web APIs.
* [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
* [django-formapi](https://github.com/5monkeys/django-formapi) - Create JSON APIs with HMAC authentication and Django form-validation.
* [flask-api](http://www.flaskapi.org/) - An implementation of the same web browsable APIs that django-rest-framework provides.
* [flask-restful](http://flask-restful.readthedocs.org/) - An extension for Flask that adds support for quickly building REST APIs.
* [flask-restless](https://flask-restless.readthedocs.org/en/latest/) - A Flask extension for generating ReSTful APIs for database models defined with SQLAlchemy (or Flask-SQLAlchemy).
* [flask-api-utils](https://github.com/marselester/flask-api-utils) - Flask extension that takes care of API representation and authentication.
* [falcon](http://falconframework.org/) - A high-performance Python framework for building cloud APIs and web app backends.
* [eve](https://github.com/nicolaiarocci/eve) - REST API framework powered by Flask, MongoDB and good intentions.
* [sandman](https://github.com/jeffknupp/sandman) - Automated REST APIs for existing database-driven systems.
* [restless](http://restless.readthedocs.org/en/latest/) - Framework agnostic REST framework based on lessons learned from TastyPie.
* [savory-pie](https://github.com/RueLaLa/savory-pie/) - REST API building library (django, and others)

## Authentication

*Libraries for implementing authentications schemes.*

* OAuth
    * [Authomatic](http://peterhudec.github.io/authomatic/) - Simple but powerful framework agnostic authentication/authorization client package.
    * [OAuthLib](https://github.com/idan/oauthlib) - A generic, spec-compliant, thorough implementation of the OAuth request-signing logic.
    * [rauth](https://github.com/litl/rauth) - A Python library for OAuth 1.0/a, 2.0, and Ofly.
    * [python-oauth2](https://github.com/simplegeo/python-oauth2) - A fully tested, abstract interface to creating OAuth clients and servers.
    * [python-social-auth](https://github.com/omab/python-social-auth) - An easy-to-setup social authentication mechanism.
    * [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) - OAuth2 goodies for the Djangonauts.
    * [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) - Providing OAuth2 access to Django app.
    * [django-allauth](https://github.com/pennersr/django-allauth) - Authentication app for Django that "just works."
    * [Flask-OAuthlib](https://github.com/lepture/flask-oauthlib) - OAuth 1.0/a, 2.0 implementation of client and provider for Flask.
    * [sanction](https://github.com/demianbrecht/sanction) - A dead simple OAuth2 client implementation.
* Others
    * [PyJWT](https://github.com/progrium/pyjwt) - Implementation of the JSON Web Token draft 01.
    * [python-jwt](https://github.com/davedoesdev/python-jwt) - Module for generating and verifying JSON Web Tokens.
    * [python-jws](https://github.com/brianloveswords/python-jws) - Implementation of JSON Web Signatures draft 02.
    * [jose](https://github.com/demonware/jose) - JavaScript Object Signing and Encryption draft implementation.

## Template Engine

*Libraries and tools for templating and lexing.*

* [Jinja2](https://github.com/mitsuhiko/jinja2) - A modern and designer friendly templating language.
* [Genshi](http://genshi.edgewall.org/) - Python templating toolkit for generation of web-aware output.
* [Mako](http://www.makotemplates.org/) - Hyperfast and lightweight templating for the Python platform.
* [Chameleon](https://chameleon.readthedocs.org/) - An HTML/XML template engine. Modeled after ZPT, optimized for speed.
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

* [Feedly](https://github.com/tschellenbach/Feedly) - A library to build newsfeed and notification systems using Cassandra and Redis.
* [django-activity-stream](https://github.com/justquick/django-activity-stream) - Generate generic activity streams from the actions on your site.

## Asset Management

*Tools for managing, compressing and minifying website assets.*

* [django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline javascript or CSS into a single cached file.
* [jinja-assets-compressor](https://github.com/jaysonsantos/jinja-assets-compressor) - A Jinja extension to compile and compress your assets.
* [webassets](http://webassets.readthedocs.org/) - Bundles, optimizes, and manages unique cache-busting URLs for static resources.
* [fanstatic](http://www.fanstatic.org/) - Packages, optimizes, and serves static file dependencies as Python packages.
* [fileconveyor](http://fileconveyor.org/) - Monitors changes, processes, and transports assets to CDNs and file storage systems.
* [django-storages](http://code.larlet.fr/django-storages/) - A collection of custom storage backends for Django.
* [glue](http://gluecss.com) - Glue is a simple command line tool to generate CSS sprites.
* [libsass-python](http://hongminhee.org/libsass-python/) - A Python binding of [libsass](https://github.com/hcatlin/libsass), the reference implementation of SASS/SCSS.
* [Flask-Assets](http://flask-assets.readthedocs.org/) - Helps you integrate webassets into your Flask app.

## Caching

*Libraries for caching data.*

* [Beaker](http://beaker.readthedocs.org/) - A library for caching and sessions for use with web applications and stand-alone Python scripts and applications.
* [dogpile.cache](http://dogpilecache.readthedocs.org/) - dogpile.cache is next generation replacement for Beaker made by same authors.
* [HermesCache](https://pypi.python.org/pypi/HermesCache) - Python caching library with tag-based invalidation and dogpile effect prevention.
* [django-cache-machine](https://github.com/jbalogh/django-cache-machine) - Automatic caching and invalidation for Django models through the ORM.
* [django-cacheops](https://github.com/Suor/django-cacheops) - A slick ORM cache with automatic granular event-driven invalidation.
* [johnny-cache](https://github.com/jmoiron/johnny-cache) - A caching framework for django applications.
* [django-viewlet](https://github.com/5monkeys/django-viewlet) - Render template parts with extended cache control.
* [pylibmc](https://github.com/lericson/pylibmc) - A Python wrapper around the [libmemcached](http://libmemcached.org/libMemcached.html) interface.

## Email

*Libraries for sending and parsing email.*

* [inbox.py](https://github.com/kennethreitz/inbox.py) - Python SMTP Server for Humans.
* [imbox](https://github.com/martinrusev/imbox) - Python IMAP for Humans.
* [inbox](https://github.com/inboxapp/inbox) - The open source email toolkit.
* [lamson](https://github.com/zedshaw/lamson) - Pythonic SMTP Application Server.
* [flanker](https://github.com/mailgun/flanker) - A email address and Mime parsing library.
* [marrow.mailer](https://github.com/marrow/marrow.mailer) - High-performance extensible mail delivery framework.
* [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) - Django email backend with AWS SES and Celery.
* [modoboa](https://github.com/tonioo/modoboa) - A mail hosting and management platform including a modern and simplified Web UI.
* [envelopes](http://tomekwojcik.github.io/envelopes/) - Mailing for human beings.
* [mailjet](https://github.com/WoLpH/mailjet) - Mailjet API implementation for batch mailing, statistics and more.
* [Talon](https://github.com/mailgun/talon) - Mailgun library to extract message quotations and signatures.
* [pyzmail](http://www.magiksys.net/pyzmail/) - Compose, send and parse emails.

## Internationalization

*Libraries for woking with i18n.*

* [Babel](http://babel.pocoo.org/) - An internationalization library for Python.
* [Korean](https://korean.readthedocs.org/) - A library for [Korean](http://en.wikipedia.org/wiki/Korean_language) morphology.

## URL Manipulation

*Libraries for parsing URLs.*

* [furl](https://github.com/gruns/furl) - A small Python library that makes manipulating URLs simple.
* [purl](https://github.com/codeinthehole/purl) - A simple, immutable URL class with a clean API for interrogation and manipulation.
* [pyshorteners](https://github.com/ellisonleao/pyshorteners) - A pure Python URL shortening lib.
* [short_url](https://github.com/Alir3z4/python-short_url) - Python implementation for generating Tiny URL and bit.ly-like URLs.
* [webargs](https://github.com/sloria/webargs) - A friendly library for parsing HTTP request arguments, with built-in support for popular web frameworks, including Flask, Django, Bottle, Tornado, and Pyramid.

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
* [xhtml2pdf](https://github.com/chrisglass/xhtml2pdf) - HTML/CSS to PDF converter.
* [untangle](https://github.com/stchris/untangle) - Converts XML documents to Python objects for easy access.

## Web Crawling

*Libraries for scraping websites.*

* [Scrapy](http://scrapy.org/) - A fast high-level screen scraping and web crawling framework.
* [portia](https://github.com/scrapinghub/portia) - Visual scraping for Scrapy.
* [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
* [RoboBrowser](https://github.com/jmcarp/robobrowser) - A simple, Pythonic library for browsing the web without a standalone web browser.
* [MechanicalSoup](https://github.com/hickford/MechanicalSoup) - A Python library for automating interaction with websites.
* [mechanize](http://wwwsearch.sourceforge.net/mechanize/) - Stateful programmatic web browsing.
* [Demiurge](https://github.com/matiasb/demiurge) - PyQuery-based scraping micro-framework.
* [cola](https://github.com/chineking/cola) - A distributed crawling framework.
* [pyspider](https://github.com/binux/pyspider) - A powerful spider system.

## Web Content Extracting

*Libraries for extracting web contents.*

* [newspaper](https://github.com/codelucas/newspaper) - News extraction, article extraction and content curation in Python.
* [html2text](https://github.com/Alir3z4/html2text) - Convert HTML to Markdown-formatted text.
* [python-goose](https://github.com/grangier/python-goose) - HTML Content/Article Extractor.
* [lassie](https://github.com/michaelhelmick/lassie) - Web Content Retrieval for Humans.
* [micawber](https://github.com/coleifer/micawber) - A small library for extracting rich content from URLs.
* [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.
* [Haul](https://github.com/vinta/Haul) - An Extensible Image Crawler.
* [python-readability](https://github.com/buriy/python-readability) - Fast Python port of arc90's readability tool.
* [opengraph](https://github.com/erikriver/opengraph) - A Python module to parse the Open Graph Protocol
* [textract](https://github.com/deanmalmgren/textract) - Extract text from any document, Word, PowerPoint, PDFs, etc.
* [sanitize](https://github.com/Alir3z4/sanitize) - Bringing sanity to world of messed-up data.

## Forms

*Libraries for working with forms.*

* [WTForms](http://wtforms.readthedocs.org/) - A flexible forms validation and rendering library.
* [WTForms-JSON](http://wtforms-json.readthedocs.org/) - A WTForms extension for JSON data handling.
* [Deform](http://deform.readthedocs.org/) - Python HTML form generation library influenced by the formish form generation library.
* [django-bootstrap3](https://github.com/dyve/django-bootstrap3) - Bootstrap 3 integration with Django.
* [django-crispy-forms](http://django-crispy-forms.readthedocs.org/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
* [django-remote-forms](https://github.com/WiserTogether/django-remote-forms) - A platform independent Django form serializer.

## Data Validation

*Libraries for validating data. Used for forms in many cases.*

* [voluptuous](https://github.com/alecthomas/voluptuous) - A Python data validation library. It is primarily intended for validating data coming into Python as JSON, YAML, etc.
* [colander](http://docs.pylonsproject.org/projects/colander/) - A system for validating and deserializing data obtained via XML, JSON, an HTML form post or any other equally simple data serialization.
* [schema](https://github.com/halst/schema) - A library for validating Python data structures.
* [Schematics](https://github.com/schematics/schematics) - Data Structure Validation.
* [kmatch](https://github.com/ambitioninc/kmatch) - A language for matching/validating/filtering Python dictionaries.
* [valideer](https://github.com/podio/valideer) - Lightweight extensible data validation and adaptation library.

## Anti-spam

*Libraries for fighting spam.*

* [Stopspam](https://github.com/phalt/stopspam) - Intelligent spam detection for Python.
* [django-simple-spam-blocker](https://github.com/moqada/django-simple-spam-blocker) - Simple spam blocker for Django.
* [django-simple-captcha](https://github.com/mbi/django-simple-captcha) - A simple and highly customizable Django app to add captcha images to any Django form.

## Tagging

*Libraries for tagging items.*

* [django-taggit](https://github.com/alex/django-taggit) - Simple tagging for Django.

## Admin Panels

*Libraries for administrative interfaces.*

* [Ajenti](https://github.com/Eugeny/ajenti) - The admin panel your servers deserve.
* [Grappelli](http://grappelliproject.com) – A jazzy skin for the Django Admin-Interface.
* [django-suit](http://djangosuit.com/) - Alternative Django Admin-Interface (free only for Non-commercial use).
* [django-xadmin](https://github.com/sshwsfc/django-xadmin) - Drop-in replacement of Django admin comes with lots of goodies.
* [flask-admin](https://github.com/mrjoes/flask-admin) - Simple and extensible administrative interface framework for Flask.
* [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.

## Static Site Generator

*Static site generator is a software that takes some text + templates as input and produces html files on the output.*

* [Pelican](http://blog.getpelican.com/) - Uses Markdown or ReST for content and Jinja 2 for themes. Supports DVCS, Disqus. AGPL.
* [Cactus](http://github.com/koenbok/Cactus/) – Static site generator for designers.
* [Hyde](https://hyde.github.com/) - Jinja2-based static web site generator.
* [Nikola](http://www.getnikola.com/) - A static website and blog generator.
* [Tags](http://tags.brace.io/) - The simplest static site generator.
* [Tinkerer](http://tinkerer.me/) - Tinkerer is a blogging engine/.static website generator powered by Sphinx.

## Processes and Threads

*Libraries for woking with processes or threads*

* [multiprocessing](https://docs.python.org/2/library/multiprocessing.html) - (Python standard library) Process-based "threading" interface.
* [threading](https://docs.python.org/2/library/threading.html) - (Python standard library) Higher-level threading interface.
* [envoy](https://github.com/kennethreitz/envoy) - Python Subprocesses for Humans™.
* [sh](https://github.com/amoffat/sh) - A full-fledged [subprocess](https://docs.python.org/2/library/subprocess.html) replacement for Python.
* [sarge](http://sarge.readthedocs.org/) - A wrapper for subprocess.

## Concurrency and Networking

*Libraries for concurrency and network programming.*

* [asyncio](https://docs.python.org/3/library/asyncio.html) - (Python standard library in Python 3.4+) Asynchronous I/O, event loop, coroutines and tasks.
* [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
* [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.
* [Tornado](http://www.tornadoweb.org/) - A Web framework and asynchronous networking library.
* [pulsar](https://github.com/quantmind/pulsar) - Event-driven concurrent framework for Python.
* [diesel](https://github.com/jamwt/diesel) - Greenlet-based event I/O Framework for Python.
* [eventlet](http://eventlet.net/) - Asynchronous framework with WSGI support.
* [pyzmq](http://zeromq.github.io/pyzmq/) - A Python wrapper for the 0MQ message library.
* [txZMQ](https://github.com/smira/txZMQ) - Twisted based wrapper for the 0MQ message library.
* [Crossbar](http://crossbar.io) - Open-source Unified Application Router (Websocket & WAMP for Python on Autobahn).

## WebSocket

*Libraries for woking with WebSocket.*

* [AutobahnPython](https://github.com/tavendo/AutobahnPython) - WebSocket & WAMP for Python on Twisted and [asyncio](https://docs.python.org/3/library/asyncio.html).
* [WebSocket-for-Python](https://github.com/Lawouach/WebSocket-for-Python) - WebSocket client and server library for Python 2 and 3 as well as PyPy.

## WSGI Servers

*WSGI-compatible web servers.*

* [wsgiref](http://docs.python.org/library/wsgiref.html) - (Python standard library) WSGI reference implementation, single-threaded.
* [Werkzeug](http://werkzeug.pocoo.org/) - A WSGI utility library for Python that powers Flask and can easily be embedded into your own projects.
* [paste](http://pythonpaste.org/) - Multi-threaded, stable, tried and tested.
* [rocket](http://pypi.python.org/pypi/rocket) - Multi-threaded.
* [waitress](https://waitress.readthedocs.org/) - Multi-threaded, poweres Pyramid.
* [netius](https://github.com/hivesolutions/netius) - Asynchronous, very fast.
* [gunicorn](http://pypi.python.org/pypi/gunicorn) - Pre-forked, partly written in C.
* [fapws3](http://www.fapws.org/) - Asynchronous (network side only), written in C.
* [meinheld](http://pypi.python.org/pypi/meinheld) - Asynchronous, partly written in C.
* [bjoern](http://pypi.python.org/pypi/bjoern) - Asynchronous, very fast and written in C.

## RPC Servers

*RPC-compatible servers.*

* [SimpleXMLRPCServer](https://docs.python.org/2/library/simplexmlrpcserver.html) - (Python standard library) Simple XML-RPC server implementation, single-threaded.
* [SimpleJSONRPCServer](https://github.com/joshmarshall/jsonrpclib/) - This library is an implementation of the JSON-RPC specification.
* [zeroRPC](https://github.com/dotcloud/zerorpc-python) - zerorpc is a flexible RPC implementation based on [ZeroMQ](http://zeromq.org/) and [MessagePack](http://msgpack.org/).

## Cryptography

* [PyCrypto](https://www.dlitz.net/software/pycrypto/) - The Python Cryptography Toolkit.
* [Paramiko](http://www.paramiko.org/) - A Python (2.6+, 3.3+) implementation of the SSHv2 protocol, providing both client and server functionality.
* [cryptography](https://cryptography.io/) - A package designed to expose cryptographic primitives and recipes to Python developers.
* [PyNacl](https://github.com/pyca/pynacl) - Python binding to the Networking and Cryptography (NaCl) library.
* [hashids](https://github.com/davidaurelio/hashids-python) - Implementation of [hashids](http://hashids.org) in Python.
* [Passlib](https://pythonhosted.org/passlib/) - Secure password storage/hashing library, very high level.

## GUI

*Libraries for working with graphical user interface applications.*

* [PyQt](http://www.riverbankcomputing.co.uk/software/pyqt/intro) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, with support for both Qt v4 and Qt v5 frameworks.
* [PySide](http://qt-project.org/wiki/pyside) - Python bindings for the [Qt](http://qt-project.org/) cross-platform application and UI framework, supporting the Qt v4 framework.
* [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.
* [kivy](http://kivy.org/) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
* [curses](https://docs.python.org/2/library/curses.html#module-curses) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
* [urwid](http://urwid.org/) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
* [pyglet](http://www.pyglet.org/) - A cross-platform windowing and multimedia library for Python.
* [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter is Python's de-facto standard GUI package.
* [enaml](https://github.com/nucleic/enaml) - Creating beautiful user-interfaces with Declaratic Syntax like QML.
* [Toga](https://github.com/pybee/toga) - A Python native, OS native GUI toolkit.

## Game Development

*Awesome game development libraries.*

* [Pygame](http://www.pygame.org/news.html) - Pygame is a set of Python modules designed for writing games.
* [Cocos2d](http://cocos2d.org/) - cocos2d is a framework for building 2D games, demos, and other graphical/interactive applications. It is based on pyglet.
* [PySDL2](http://pysdl2.readthedocs.org/) - A ctypes based wrapper for the SDL2 library.
* [Panda3D](https://www.panda3d.org/) - 3D game engine developed by Disney and maintained by Carnegie Mellon's Entertainment Technology Center. Written in C++, completely wrapped in Python.
* [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python bindings for the Ogre 3D render engine, can be used for games, simulations, anything 3D.
* [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes bindings for OpenGL and it's related APIs.
* [PySFML](http://www.python-sfml.org/) - Python bindings for [SFML](http://www.sfml-dev.org/)
* [RenPy](http://www.renpy.org/) - A Visual Novel engine.

## Logging

*Libraries for generating and working with log files.*

* [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python.
* [logbook](http://pythonhosted.org/Logbook/) - Logging replacement for Python.
* [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.
* [Raven](http://raven.readthedocs.org/) - The Python client for Sentry.

## Testing

*Libraries for testing codebases and generating test data.*

* Testing Frameworks
    * [unittest](https://docs.python.org/2/library/unittest.html) - (Python standard library) Unit testing framework.
    * [nose](https://nose.readthedocs.org/) - nose extends unittest.
    * [pytest](http://pytest.org/) - A mature full-featured Python testing tool.
    * [mamba](https://nestorsalceda.github.io/mamba) - The definitive testing tool for Python. Born under the banner of BDD.
    * [contexts](https://github.com/benjamin-hodgson/Contexts) - A BDD framework for Python 3.3+. Inspired by C#'s `Machine.Specifications`.
    * [pyshould](https://github.com/drslump/pyshould) - Should style asserts based on [PyHamcrest](https://github.com/hamcrest/PyHamcrest).
    * [pyvows](http://heynemann.github.io/pyvows/) - BDD style testing for Python. Inspired by [Vows.js](http://vowsjs.org/).
* Web Testing
    * [Selenium](https://pypi.python.org/pypi/selenium) - Python bindings for [Selenium](http://www.seleniumhq.org/) WebDriver.
    * [splinter](http://splinter.cobrateam.info/) - Open source tool for testing web applications.
    * [locust](https://github.com/locustio/locust) - Scalable user load testing tool written in Python.
    * [sixpack](https://github.com/seatgeek/sixpack) - A language-agnostic A/B Testing framework.
* Mock
    * [mock](https://pypi.python.org/pypi/mock) - A Python Mocking and Patching Library for Testing.
    * [responses](https://github.com/dropbox/responses) - A utility library for mocking out the requests Python library.
    * [doublex](https://pypi.python.org/pypi/doublex) - Powerful test doubles framework for Python.
    * [freezegun](https://github.com/spulec/freezegun) - Travel through time by mocking the datetime module.
    * [httpretty](http://falcao.it/HTTPretty/) - HTTP request mock tool for Python.
    * [httmock](https://github.com/patrys/httmock) - A mocking library for requests for Python 2.6+ and 3.2+.
* Code Coverage
    * [coverage](https://pypi.python.org/pypi/coverage) - Code coverage measurement.
* Fake Data
    * [faker](http://www.joke2k.net/faker/) - A Python package that generates fake data.
    * [fake2db](https://github.com/emirozer/fake2db) - Fake database generator.
    * [mixer](https://mixer.readthedocs.org) - Generating fake data and creating random fixtures for testing in Django ORM, SQLAlchemy, Peewee, MongoEngine, Pony ORM and etc.
    * [model_mommy](https://model-mommy.readthedocs.org/) - Creating random fixtures for testing in Django.
    * [ForgeryPy](https://pypi.python.org/pypi/ForgeryPy) - An easy to use forged data generator for Python. It's a port of [forgery](http://rubygems.org/gems/forgery).
    * [radar](https://pypi.python.org/pypi/radar) - Generate random datetime / time.
* Error Handler
    * [FuckIt.py](https://github.com/ajalt/fuckitpy) - FuckIt.py uses state-of-the-art technology to make sure your Python code runs whether it has any right to or not.

## Code Analysis and Linter

*Libraries and tools for analysing, parsing and manipulation codebases.*

* Code Analysis
    * [pysonar2](https://github.com/yinwang0/pysonar2) - A type inferencer and indexer for Python.
    * [pycallgraph](https://github.com/gak/pycallgraph) - A library that visualises the flow (call graph) of your Python application.
    * [code2flow](https://github.com/scottrogowski/code2flow) - Turn your Python and JavaScript code into DOT flowcharts.
* Linter
    * [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
    * [pylama](https://pylama.readthedocs.org/) - Code audit tool for Python and JavaScript.
    * [Pylint](http://www.pylint.org/) - A source code analyzer.

## Debugging Tools

*Libraries for debugging code.*

* [pdb](https://docs.python.org/2/library/pdb.html) - (Python standard library) The Python Debugger.
* [ipdb](https://pypi.python.org/pypi/ipdb) - IPython-enabled pdb.
* [winpdb](http://winpdb.org/) - A Platform Independent Python Debugger with GUI.
* [pudb](https://pypi.python.org/pypi/pudb) – A full-screen, console-based Python debugger.
* [pyringe](https://github.com/google/pyringe) - Debugger capable of attaching to and injecting code into Python processes.
* [python-statsd](https://github.com/WoLpH/python-statsd) - Python Client for the [statsd](https://github.com/etsy/statsd/) server.
* [memory_profiler](https://github.com/fabianp/memory_profiler) - Monitor Memory usage of Python code.
* [profiling](https://github.com/what-studio/profiling) - An interactive Python profiler.
* [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar) - Display various debug information about the current request/response.
* [django-devserver](https://github.com/dcramer/django-devserver) - A drop-in replacement for Django's runserver.
* [flask-debugtoolbar](https://github.com/mgood/flask-debugtoolbar) - A port of the django-debug-toolbar to flask.
* [pyelftools](https://github.com/eliben/pyelftools) - A pure-Python library for parsing and analyzing ELF files and DWARF debugging information.

## Science and Data Analysis

*Libraries for scientific computing and data analyzing.*

* [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
* [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
* [Numba](http://numba.pydata.org/) - Python JIT (just in time) complier to LLVM aimed at scientific Python by the developers of Cython and NumPy.
* [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
* [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
* [Open Mining](https://github.com/avelino/mining) - Business Intelligence (BI) in Python (Pandas web interface)
* [PyMC](https://github.com/pymc-devs/pymc) - Markov Chain Monte Carlo sampling toolkit.
* [zipline](https://github.com/quantopian/zipline) - A Pythonic algorithmic trading library.
* [PyDy](https://pydy.org/) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion based around NumPy, SciPy, IPython, and matplotlib.
* [SymPy](https://github.com/sympy/sympy) - A Python library for symbolic mathematics.
* [statsmodels](https://github.com/statsmodels/statsmodels) - Statistical modeling and econometrics in Python.
* [astropy](http://www.astropy.org/) - A community Python library for Astronomy.
* [orange](http://orange.biolab.si/) - Data mining, data visualization, analysis and machine learning through visual programming or Python scripting.
* [RDKit](http://www.rdkit.org/) - Cheminformatics and Machine Learning Software.
* [Open Babel](http://openbabel.org/wiki/Main_Page) - A chemical toolbox designed to speak the many languages of chemical data.
* [cclib](http://cclib.github.io/) - A library for parsing and interpreting the results of computational chemistry packages.
* [Biopython](http://biopython.org/wiki/Main_Page) - Biopython is a set of freely available tools for biological computation.
* [bccb](https://github.com/chapmanb/bcbb) - Collection of useful code related to biological analysis.
* [bcbio-nextgen](https://github.com/chapmanb/bcbio-nextgen) - A toolkit providing best-practice pipelines for fully automated high throughput sequencing analysis.
* [blaze](http://blaze.pydata.org/docs/latest/index.html) - NumPy and Pandas interface to Big Data.

## Data Visualization

*Libraries for visualizing data. See: [awesome-javascript](https://github.com/sorrycc/awesome-javascript#data-visualization).*

* [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
* [bokeh](https://github.com/ContinuumIO/bokeh) - Interactive Web Plotting for Python.
* [plotly](https://plot.ly/python) - Collaborative web plotting for Python and matplotlib.
* [vincent](https://github.com/wrobstory/vincent) - A Python to Vega translator.
* [d3py](https://github.com/mikedewar/d3py) - A plottling library for Python, based on [D3.js](http://d3js.org/).
* [ggplot](https://github.com/yhat/ggplot) - Same API as ggplot2 for R.
* [Kartograph.py](https://github.com/kartograph/kartograph.py) - Rendering beautiful SVG maps in Python.
* [pygal](http://pygal.org/) - A Python SVG Charts Creator.
* [pygraphviz](https://pypi.python.org/pypi/pygraphviz) - Python interface to [Graphviz](http://www.graphviz.org/).
* [PyQtGraph](http://www.pyqtgraph.org/) - Interactive and realtime 2D/3D/Image plotting and science/engineering widgets.

## Computer Vision

*Libraries for computer vision.*

* [OpenCV](http://opencv.org/) - Open Source Computer Vision Library.
* [SimpleCV](http://simplecv.org/) - An open source framework for building computer vision applications.

## Machine Learning

*Libraries for Machine Learning. See: [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python).*

* [scikit-learn](http://scikit-learn.org/) - A Python module for machine learning built on top of SciPy.
* [pattern](https://github.com/clips/pattern) - Web mining module for Python.
* [NuPIC](https://github.com/numenta/nupic) - Numenta Platform for Intelligent Computing.
* [Pylearn2](https://github.com/lisa-lab/pylearn2) - A Machine Learning library based on [Theano](https://github.com/Theano/Theano).
* [hebel](https://github.com/hannes-brt/hebel) - GPU-Accelerated Deep Learning Library in Python.
* [gensim](https://github.com/piskvorky/gensim) - Topic Modelling for Humans.
* [PyBrain](https://github.com/pybrain/pybrain) - Another Python Machine Learning Library.
* [Crab](https://github.com/muricoca/crab) - A ﬂexible, fast recommender engine.
* [python-recsys](https://github.com/ocelma/python-recsys) - A Python library for implementing a Recommender System.
* [vowpal_porpoise](https://github.com/josephreisinger/vowpal_porpoise) - A lightweight Python wrapper for [Vowpal Wabbit](https://github.com/JohnLangford/vowpal_wabbit/).

## MapReduce

*Framworks and libraries for MapReduce.*

* [PySpark](http://spark.apache.org/docs/latest/programming-guide.html) - The Spark Python API.
* [dpark](https://github.com/douban/dpark) - Python clone of Spark, a MapReduce alike framework in Python.
* [luigi](https://github.com/spotify/luigi) - A module that helps you build complex pipelines of batch jobs.
* [mrjob](https://github.com/Yelp/mrjob) - Run MapReduce jobs on Hadoop or Amazon Web Services.
* [dumbo](https://github.com/klbostee/dumbo) - Python module that allows one to easily write and run Hadoop programs.
* [streamparse](https://github.com/Parsely/streamparse) - Run Python code against real-time streams of data. Integrates with [Apache Storm](https://storm.incubator.apache.org/).

## Functional Programming

*Functional Programming with Python.*

* [fn.py](https://github.com/kachayev/fn.py) - Functional programming in Python: implementation of missing features to enjoy FP.
* [funcy](https://github.com/Suor/funcy) - A fancy and practical functional tools.
* [Toolz](https://github.com/pytoolz/toolz) - A collection of functional utilities for iterators, functions, and dictionaries.
* [CyToolz](https://github.com/pytoolz/cytoolz/) - Cython implementation of Toolz: High performance functional utilities.

## Third-party APIs

*Libraries for accessing third party services APIs. See: [List of Python API Wrappers and Libraries](https://github.com/realpython/list-of-python-api-wrappers).*

* [apache-libcloud](https://libcloud.apache.org/) - One Python library for all clouds.
* [boto](https://github.com/boto/boto) - Python interface to Amazon Web Services.
* [twython](https://github.com/ryanmcgrath/twython) - A Python wrapper for the Twitter API.
* [google-api-python-client](https://github.com/google/google-api-python-client) - Google APIs Client Library for Python.
* [gspread](https://github.com/burnash/gspread) - Google Spreadsheets Python API.
* [facebook-sdk](https://github.com/pythonforfacebook/facebook-sdk) - Facebook Platform Python SDK.
* [facepy](https://github.com/jgorset/facepy) - Facepy makes it really easy to interact with Facebook's Graph API
* [gmail](https://github.com/charlierguo/gmail) - A Pythonic interface for Gmail.
* [django-wordpress](https://github.com/sunlightlabs/django-wordpress/) - WordPress models and views for Django.

## DevOps Tools

*Software and libraries for DevOps.*

* [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
* [Ansible](https://github.com/ansible/ansible) - A radically simple IT automation platform.
* [SaltStack](https://github.com/saltstack/salt) - Infrastructure automation and management system.
* [Fabric](http://www.fabfile.org/) - A simple, Pythonic tool for remote execution and deployment.
* [Fabtools](https://github.com/ronnix/fabtools) - Tools for writing awesome Fabric files.
* [cuisine](https://github.com/sebastien/cuisine) - Chef-like functionality for Fabric.
* [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.
* [pexpect](https://github.com/pexpect/pexpect) - Controlling interactive programs in a pseudo-terminal like GNU expect.
* [provy](https://github.com/python-provy/provy) - An easy-to-use provisioning system in Python.
* [honcho](https://github.com/nickstenning/honcho) - A Python port of [Foreman](https://github.com/ddollar/foreman), a tool for managing Procfile-based applications.
* [gunnery](https://github.com/gunnery/gunnery) - Multipurpose task execution tool for distributed systems with web-based interface.
* [fig](http://www.fig.sh/) - Fast, isolated development environments using [Docker](https://www.docker.com/).
* [hgapi](http://bitbucket.org/haard/hgapi) - Pure-Python API for Mercurial.
* [gitapi](http://bitbucket.org/haard/gitapi) - Pure-Python API for git.
 
## Job Scheduler

*Libraries for scheduling jobs.*

* [APScheduler](http://apscheduler.readthedocs.org/) - A light but powerful in-process task scheduler that lets you schedule functions.
* [django-schedule](https://github.com/thauber/django-schedule) - A calendaring app for Django.
* [doit](http://pydoit.org/) - A task runner/build tool.
* [Joblib](http://pythonhosted.org/joblib/index.html) - A set of tools to provide lightweight pipelining in Python.
* [Plan](https://github.com/fengsp/plan) - Writing crontab file in Python like a charm.
* [Spiff](https://github.com/knipknap/SpiffWorkflow) - A powerful workflow engine implemented in pure Python.
* [schedule](https://github.com/dbader/schedule) - Python job scheduling for humans.
* [TaskFlow](http://docs.openstack.org/developer/taskflow/) - A Python library that helps to make task execution easy, consistent and reliable.

## Foreign Function Interface

*Libraries for providing foreign function interface.*

* [ctypes](https://docs.python.org/2/library/ctypes.html) - (Python standard library) Foreign Function Interface for Python calling C code.
* [cffi](https://pypi.python.org/pypi/cffi) - Foreign Function Interface for Python calling C code.
* [SWIG](http://www.swig.org/Doc1.3/Python.html) - Simplified Wrapper and Interface Generator.
* [PyCUDA](http://mathema.tician.de/software/pycuda/) - A Python wrapper for Nvidia's CUDA API.

## High Performance

*Libraries for making Python faster.*

* [Cython](http://cython.org/) - Optimizing Static Complier for Python. Uses type mixins to compile Python into C or C++ modules resulting in large performance gains.
* [PyPy](http://pypy.org/) - An implementation of Python in Python. The interpreter uses black magic to make Python very fast without having to add in additional type information.
* [Stackless Python](http://www.stackless.com/) - An enhanced version of the Python.
* [Pyston](https://github.com/dropbox/pyston) - A Python implementation built using LLVM and modern JIT techniques with the goal of achieving good performance.

## Microsoft Windows

*Python programming on Microsoft Windows.*

* [pythonlibs](http://www.lfd.uci.edu/~gohlke/pythonlibs/) - Unofficial Windows(32/64-bit) binaries for Python extension packages
* [Python(x,y)](https://code.google.com/p/pythonxy/) - Scientific-applications-oriented Python Distribution based on Qt and Spyder.
* [spyder](https://code.google.com/p/spyderlib/) - IDE for the Python language with advanced editing, interactive testing, debugging and introspection features (also comes with Anaconda).

## Network Virtualization and SDN

*Tools and libraries for Virtual Networking and SDN (Software Defined Networking).*

* [Mininet](http://mininet.org/) - A popular network emulator and API written in Python.
* [POX](http://www.noxrepo.org/pox/about-pox/) - An open source development platform for Python-based Software Defined Networking (SDN) control applications, such as OpenFlow SDN controllers.
* [Pyretic](http://frenetic-lang.org/pyretic/) - A member of the Frenetic family of SDN programming languages that provides powerful abstractions over network switches or emulators.
* [SDX Platform](https://github.com/sdn-ixp/internet2award) - SDN based IXP implementation that leverages Mininet, POX and Pyretic.

## Hardware

*Libraries for programming with hardware.*

* [PyUserInput](https://github.com/SavinaRoja/PyUserInput) - A module for cross-platform control of the mouse and keyboard.
* [wifi](https://wifi.readthedocs.org/) - A Python library and command line tool for working with WiFi on Linux.
* [scapy](http://www.secdev.org/projects/scapy/) - A brilliant packet manipulation library.
* [ino](http://inotool.org/) - Command line toolkit for working with [Arduino](http://www.arduino.cc/).
* [Pyro](http://pyrorobotics.com/) - Python Robotics.

## Compatibility

*Libraries for migrating from Python 2 to 3.*

* [Six](https://pypi.python.org/pypi/six) - Python 2 and 3 compatibility utilities.
* [Python-Future](http://python-future.org/index.html) - The missing compatibility layer between Python 2 and Python 3.
* [Python-Modernize](https://github.com/mitsuhiko/python-modernize) - Modernizes Python code for eventual Python 3 migration.

## Miscellaneous

*Useful libraries or tools that don't fit in the categories above.*

* [pluginbase](https://github.com/mitsuhiko/pluginbase) - A simple but flexible plugin system for Python.
* [itsdangerous](https://github.com/mitsuhiko/itsdangerous) - Various helpers to pass trusted data to untrusted environments.
* [blinker](https://github.com/jek/blinker) - A fast Python in-process signal/event dispatching system.
* [Pychievements](https://github.com/PacketPerception/pychievements) - A framework for creating and tracking achievements.

## Algorithms and Design Patterns

*Python implementation of algorithms and design patterns.*

* [python-patterns](https://github.com/faif/python-patterns) - A collection of design patterns in Python.
* [algorithms](https://github.com/nryoung/algorithms) - module of algorithms for Python.

## Editor Plugins

*Plugins for editors and IDEs.*

* Vim
    * [Python-mode](https://github.com/klen/python-mode) - An all in one plugin for turning Vim into a Python IDE.
    * [Jedi-vim](https://github.com/davidhalter/jedi-vim) - Vim bindings for the [Jedi](https://github.com/davidhalter/jedi) autocompletion library for Python.
    * [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) - Includes [Jedi](https://github.com/davidhalter/jedi)-based completion engine for Python
* Emacs
    * [Elpy](https://github.com/jorgenschaefer/elpy) - Emacs Python Development Environment.
* Sublime Text
    * [SublimeJEDI](https://github.com/srusskih/SublimeJEDI) - A Sublime Text plugin to the awesome autocomplete library [Jedi](https://github.com/davidhalter/jedi).
    * [Anaconda](https://github.com/DamnWidget/anaconda) - Anaconda turns your Sublime Text 3 in a full featured Python development IDE.
* Atom
    * [Linter](https://github.com/AtomLinter/Linter) - A static code analysis tool for Atom.
    * [Linter-flake8](https://github.com/AtomLinter/linter-flake8) - An addon to `linter`, that acts as an interface for `flake8`.
    * [virtualenv](https://github.com/jhutchins/virtualenv) - Atom package for virtualenv management.

# Resources

Where to discover new Python libraries.

## Websites

* [r/Python](http://www.reddit.com/r/python) - News about Python.
* [Python 3 Wall of Superpowers](http://python3wos.appspot.com/) - Too many popular Python packages don't support Python 3.
* [Trending Python repositories on GitHub today](https://github.com/trending?l=python) - Good place to find new Python libraries.
* [Python Hackers](http://pythonhackers.com/open-source/) - List of top 400 projects in GitHub.
* [CoolGithubProjects](http://coolgithubprojects.com/) - Sharing cool github projects just got easier!
* [Full Stack Python](http://www.fullstackpython.com/) - Plain English explanations for every layer of the Python web application stack.
* [Django Packages](https://www.djangopackages.com/) - A directory of reusable apps, sites, tools, and more for Django projects.

## Weekly

* [Pycoder's Weekly](http://pycoders.com/)
* [Python Weekly](http://www.pythonweekly.com/)
* [Import Python Newsletter](http://importpython.com/newsletter/)

## Twitter

* [@pypi](https://twitter.com/pypi)
* [@planetpython](https://twitter.com/planetpython)
* [@getpy](https://twitter.com/getpy)
* [@pycoders](https://twitter.com/pycoders)
* [@PythonWeekly](https://twitter.com/PythonWeekly)
* [@pythontrending](https://twitter.com/pythontrending)

# Other Awesome Lists

List of lists.

* Python
    * [pycrumbs](https://github.com/kirang89/pycrumbs/blob/master/pycrumbs.md)
    * [pythonidae](https://github.com/svaksha/pythonidae)
    * [python-github-projects](https://github.com/checkcheckzz/python-github-projects)
    * [python_reference](https://github.com/rasbt/python_reference)
    * [easy-python](http://easy-python.readthedocs.org/)
* Monty
    * [awesome-awesomeness](https://github.com/bayandin/awesome-awesomeness)
    * [lists](https://github.com/jnv/lists)

# [Contributing](https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md)

Your contributions are always welcome!

# Upcoming Event

## PyCon APAC 2015

[![PyCon APAC 2015](https://tw.pycon.org/2015apac/images/Logo_red_1280.svg)](https://tw.pycon.org/2015apac/)

#### Tutorials May 30-31, Conference June 5-7, Sprints June 8, Taipei, Taiwan

Mark your calendar now and stay up to date on the must-attend event in 2015. Join the biggest Python conference in Asia. To find more on [https://tw.pycon.org/2015apac/](https://tw.pycon.org/2015apac/).
