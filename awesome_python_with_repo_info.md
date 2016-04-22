Awesome Python [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
==========================================================================================================================================================================

A curated list of awesome Python frameworks, libraries, software and resources.

Inspired by [awesome-php](https://github.com/ziadoz/awesome-php) .

-   [Awesome Python](#awesome-python)
    -   [Environment Management](#environment-management)
    -   [Package Management](#package-management)
    -   [Package Repositories](#package-repositories)
    -   [Distribution](#distribution)
    -   [Build Tools](#build-tools)
    -   [Interactive Interpreter](#interactive-interpreter)
    -   [Files](#files)
    -   [Date and Time](#date-and-time)
    -   [Text Processing](#text-processing)
    -   [Specific Formats Processing](#specific-formats-processing)
    -   [Natural Language Processing](#natural-language-processing)
    -   [Documentation](#documentation)
    -   [Configuration](#configuration)
    -   [Command-line Tools](#command-line-tools)
    -   [Downloader](#downloader)
    -   [Imagery](#imagery)
    -   [OCR](#ocr)
    -   [Audio](#audio)
    -   [Video](#video)
    -   [Geolocation](#geolocation)
    -   [HTTP](#http)
    -   [Database](#database)
    -   [Database Drivers](#database-drivers)
    -   [ORM](#orm)
    -   [Web Frameworks](#web-frameworks)
    -   [Permissions](#permissions)
    -   [CMS](#cms)
    -   [E-commerce](#e-commerce)
    -   [RESTful API](#restful-api)
    -   [Serialization](#serialization)
    -   [Authentication](#authentication)
    -   [Template Engine](#template-engine)
    -   [Queue](#queue)
    -   [Search](#search)
    -   [News Feed](#news-feed)
    -   [Asset Management](#asset-management)
    -   [Caching](#caching)
    -   [Email](#email)
    -   [Internationalization](#internationalization)
    -   [URL Manipulation](#url-manipulation)
    -   [HTML Manipulation](#html-manipulation)
    -   [Web Crawling](#web-crawling)
    -   [Web Content Extracting](#web-content-extracting)
    -   [Forms](#forms)
    -   [Data Validation](#data-validation)
    -   [Anti-spam](#anti-spam)
    -   [Tagging](#tagging)
    -   [Admin Panels](#admin-panels)
    -   [Static Site Generator](#static-site-generator)
    -   [Processes](#processes)
    -   [Concurrency and Parallelism](#concurrency-and-parallelism)
    -   [Networking](#networking)
    -   [WebSocket](#websocket)
    -   [WSGI Servers](#wsgi-servers)
    -   [RPC Servers](#rpc-servers)
    -   [Cryptography](#cryptography)
    -   [GUI](#gui)
    -   [Game Development](#game-development)
    -   [Logging](#logging)
    -   [Testing](#testing)
    -   [Code Analysis and Linter](#code-analysis-and-linter)
    -   [Debugging Tools](#debugging-tools)
    -   [Science and Data Analysis](#science-and-data-analysis)
    -   [Data Visualization](#data-visualization)
    -   [Computer Vision](#computer-vision)
    -   [Machine Learning](#machine-learning)
    -   [Functional Programming](#functional-programming)
    -   [MapReduce](#mapreduce)
    -   [Third-party APIs](#third-party-apis)
    -   [DevOps Tools](#devops-tools)
    -   [Job Scheduler](#job-scheduler)
    -   [Foreign Function Interface](#foreign-function-interface)
    -   [High Performance](#high-performance)
    -   [Network Virtualization and SDN](#network-virtualization-and-sdn)
    -   [Hardware](#hardware)
    -   [Compatibility](#compatibility)
    -   [Miscellaneous](#miscellaneous)
    -   [Algorithms and Design Patterns](#algorithms-and-design-patterns)
    -   [Editor Plugins](#editor-plugins)
    -   [IDEs](#ides)
-   [Services](#services)
    -   [Continuous Integration](#continuous-integration)
    -   [Code Quality](#code-quality)
-   [Resources](#resources)
    -   [Websites](#websites)
    -   [Weekly](#weekly)
    -   [Twitter](#twitter)
-   [Other Awesome Lists](#other-awesome-lists)
-   [Contributing](#contributing)

------------------------------------------------------------------------

Environment Management
----------------------

*Libraries for Python version and environment management.*

-   [p](https://github.com/qw3rtman/p) <span> | ★ 544, pushed 24 days ago | </span> - Dead simple interactive Python version management.
-   [pyenv](https://github.com/yyuu/pyenv) <span> | ★ 4337, pushed 0 days ago | </span> - Simple Python version management.
-   [venv](https://docs.python.org/3/library/venv.html) - (Python standard library in Python 3.3+) Creating lightweight virtual environments.
-   [virtualenv](https://pypi.python.org/pypi/virtualenv) - A tool to create isolated Python environments.
-   [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper) - A set of extensions to virtualenv.

Package Management
------------------

*Libraries for package and dependency management.*

-   [pip](https://pip.pypa.io/en/stable/) - The Python package and dependency manager.
    -   [Python Package Index](https://pypi.python.org/pypi)
-   [pip-tools](https://github.com/nvie/pip-tools) <span> | ★ 1552, pushed 0 days ago | </span> - A set of tools to keep your pinned Python dependencies fresh.
-   [conda](https://github.com/conda/conda/) - Cross-platform, Python-agnostic binary package manager.
-   [Curdling](http://clarete.li/curdling/) - Curdling is a command line tool for managing Python packages.
-   [wheel](http://pythonwheels.com/) - The new standard of Python distribution and are intended to replace eggs.

Package Repositories
--------------------

*Local PyPI repository server and proxies.*

-   [warehouse](https://github.com/pypa/warehouse) <span> | ★ 509, pushed 0 days ago | </span> - Next generation Python Package Repository (PyPI).
    -   [Warehouse](https://warehouse.python.org/)
-   [bandersnatch](https://bitbucket.org/pypa/bandersnatch) - PyPI mirroring tool provided by Python Packaging Authority (PyPA).
-   [devpi](http://doc.devpi.net/latest/) - PyPI server and packaging/testing/release tool.
-   [localshop](https://github.com/mvantellingen/localshop) <span> | ★ 269, pushed 225 days ago | </span> - Local PyPI server (custom packages and auto-mirroring of pypi).

Distribution
------------

*Libraries to create packaged executables for release distribution.*

-   [PyInstaller](https://github.com/pyinstaller/pyinstaller) <span> | ★ 1677, pushed 2 days ago | </span> - Converts Python programs into stand-alone executables (cross-platform).
-   [dh-virtualenv](http://dh-virtualenv.readthedocs.org/en/latest/) - Build and distribute a virtualenv as a Debian package.
-   [Nuitka](http://nuitka.net/) - Compile scripts, modules, packages to an executable or extension module.
-   [py2app](http://pythonhosted.org/py2app/) - Freezes Python scripts (Mac OS X).
-   [py2exe](http://www.py2exe.org/) - Freezes Python scripts (Windows).
-   [pynsist](http://pynsist.readthedocs.org/en/latest/) - A tool to build Windows installers, installers bundle Python itself.

Build Tools
-----------

*Compile software from source code.*

-   [buildout](http://www.buildout.org/en/latest/) - A build system for creating, assembling and deploying applications from multiple parts.
-   [BitBake](http://www.yoctoproject.org/docs/1.6/bitbake-user-manual/bitbake-user-manual.html) - A make-like build tool for embedded Linux.
-   [PlatformIO](https://github.com/platformio/platformio) <span> | ★ 966, pushed 0 days ago | </span> - A console tool to build code with different development platforms.
-   [PyBuilder](https://github.com/pybuilder/pybuilder) <span> | ★ 605, pushed 6 days ago | </span> - A continuous build tool written in pure Python.
-   [SCons](http://www.scons.org/) - A software construction tool.

Interactive Interpreter
-----------------------

*Interactive Python interpreters (REPL).*

-   [Jupyter Notebook (IPython)](https://jupyter.org) - A rich toolkit to help you make the most out of using Python interactively.
-   [bpython](https://github.com/bpython/bpython) <span> | ★ 507, pushed 2 days ago | </span> – A fancy interface to the Python interpreter.
-   [ptpython](https://github.com/jonathanslenders/ptpython) <span> | ★ 1239, pushed 4 days ago | </span> - Advanced Python REPL built on top of the [python-prompt-toolkit](https://github.com/jonathanslenders/python-prompt-toolkit) .

Files
-----

*Libraries for file manipulation and MIME type detection.*

-   [imghdr](https://docs.python.org/2/library/imghdr.html) - (Python standard library) Determine the type of an image.
-   [mimetypes](https://docs.python.org/2/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
-   [path.py](https://github.com/jaraco/path.py) <span> | ★ 600, pushed 5 days ago | </span> - A module wrapper for [os.path](https://docs.python.org/2/library/os.path.html) .
-   [pathlib](https://pathlib.readthedocs.org/en/pep428/) - (Python standard library in Python 3.4+) An cross-platform, object-oriented path library.
-   [python-magic](https://github.com/ahupp/python-magic) <span> | ★ 622, pushed 30 days ago | </span> - A Python interface to the libmagic file type identification library.
-   [Unipath](https://github.com/mikeorr/Unipath) <span> | ★ 351, pushed 432 days ago | </span> - An object-oriented approach to file/directory operations.
-   [watchdog](https://github.com/gorakhargosh/watchdog) <span> | ★ 2022, pushed 9 days ago | </span> - API and shell utilities to monitor file system events.

Date and Time
-------------

*Libraries for working with dates and times.*

-   [arrow](https://github.com/crsmithdev/arrow) <span> | ★ 2978, pushed 7 days ago | </span> - Better dates & times for Python.
-   [Chronyk](https://github.com/KoffeinFlummi/Chronyk) <span> | ★ 214, pushed 105 days ago | </span> - A Python 3 library for parsing human-written times and dates.
-   [dateutil](https://github.com/dateutil/dateutil) <span> | ★ 188, pushed 0 days ago | </span> - Extensions to the standard Python [datetime](https://docs.python.org/2/library/datetime.html) module.
-   [delorean](https://github.com/myusuf3/delorean/) - A library for clearing up the inconvenient truths that arise dealing with datetimes.
-   [moment](https://github.com/zachwill/moment) <span> | ★ 279, pushed 569 days ago | </span> - A Python library for dealing with dates/times. Inspired by [Moment.js](http://momentjs.com/) .
-   [PyTime](https://github.com/shinux/PyTime) <span> | ★ 93, pushed 229 days ago | </span> - A easy-use Python module which aims to operate date/time/datetime by string.
-   [pytz](https://launchpad.net/pytz) - World timezone definitions, modern and historical. Brings the [tz database](https://en.wikipedia.org/wiki/Tz_database) into Python.
-   [when.py](https://github.com/dirn/When.py) <span> | ★ 144, pushed 54 days ago | </span> - Providing user-friendly functions to help perform common date and time actions.

Text Processing
---------------

*Libraries for parsing and manipulating plain texts.*

-   General
    -   [chardet](https://github.com/chardet/chardet) <span> | ★ 493, pushed 35 days ago | </span> - Python 2/3 compatible character encoding detector.
    -   [difflib](https://docs.python.org/2/library/difflib.html) - (Python standard library) Helpers for computing deltas.
    -   [ftfy](https://github.com/LuminosoInsight/python-ftfy) <span> | ★ 1158, pushed 8 days ago | </span> - Makes Unicode text less broken and more consistent automagically.
    -   [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy) <span> | ★ 2333, pushed 21 days ago | </span> - Fuzzy String Matching.
    -   [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Fast computation of Levenshtein distance and string similarity.
    -   [pangu.py](https://github.com/vinta/pangu.py) <span> | ★ 37, pushed 88 days ago | </span> - Spacing texts for CJK and alphanumerics.
    -   [pyfiglet](https://github.com/pwaller/pyfiglet) <span> | ★ 144, pushed 9 days ago | </span> - An implementation of figlet written in Python.
    -   [shortuuid](https://github.com/stochastic-technologies/shortuuid) <span> | ★ 569, pushed 99 days ago | </span> - A generator library for concise, unambiguous and URL-safe UUIDs.
    -   [unidecode](https://pypi.python.org/pypi/Unidecode) - ASCII transliterations of Unicode text.
    -   [uniout](https://github.com/moskytw/uniout) <span> | ★ 90, pushed 596 days ago | </span> - Print readable chars instead of the escaped string.
    -   [xpinyin](https://github.com/lxneng/xpinyin) <span> | ★ 314, pushed 38 days ago | </span> - A library to translate Chinese hanzi (漢字) to pinyin (拼音).
-   Slugify
    -   [awesome-slugify](https://github.com/dimka665/awesome-slugify) <span> | ★ 267, pushed 206 days ago | </span> - A Python slugify library that can preserve unicode.
    -   [python-slugify](https://github.com/un33k/python-slugify) <span> | ★ 239, pushed 96 days ago | </span> - A Python slugify library that translates unicode to ASCII.
    -   [unicode-slugify](https://github.com/mozilla/unicode-slugify) <span> | ★ 195, pushed 15 days ago | </span> - A slugifier that generates unicode slugs with Django as a dependency.
-   Parser
    -   [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) <span> | ★ 1190, pushed 13 days ago | </span> - Parsing, formatting, storing and validating international phone numbers.
    -   [PLY](http://www.dabeaz.com/ply/) - Implementation of lex and yacc parsing tools for Python
    -   [Pygments](http://pygments.org/) - A generic syntax highlighter.
    -   [pyparsing](http://pyparsing.wikispaces.com/) - A general purpose framework for generating parsers.
    -   [python-nameparser](https://github.com/derek73/python-nameparser) <span> | ★ 141, pushed 28 days ago | </span> - Parsing human names into their individual components.
    -   [python-user-agents](https://github.com/selwin/python-user-agents) <span> | ★ 329, pushed 13 days ago | </span> - Browser user agent parser.
    -   [sqlparse](https://sqlparse.readthedocs.org/en/latest/) - A non-validating SQL parser.

Specific Formats Processing
---------------------------

*Libraries for parsing and manipulating specific text formats.*

-   General
    -   [tablib](https://github.com/kennethreitz/tablib) <span> | ★ 1898, pushed 11 days ago | </span> - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
-   Office
    -   [Marmir](https://github.com/brianray/mm) <span> | ★ 118, pushed 58 days ago | </span> - Takes Python data structures and turns them into spreadsheets.
    -   [openpyxl](https://openpyxl.readthedocs.org/en/latest/) - A library for reading and writing Excel 2010 xlsx/xlsm/xltx/xltm files.
    -   [pyexcel](http://pyexcel.readthedocs.org/en/latest/) - Providing one API for reading, manipulating and writing csv, ods, xls, xlsx and xlsm files.
    -   [python-docx](https://github.com/python-openxml/python-docx) <span> | ★ 517, pushed 0 days ago | </span> - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
    -   [relatorio](http://relatorio.tryton.org/) - Templating OpenDocument files.
    -   [unoconv](https://github.com/dagwieers/unoconv) <span> | ★ 694, pushed 30 days ago | </span> - Convert between any document format supported by LibreOffice/OpenOffice.
    -   [XlsxWriter](https://xlsxwriter.readthedocs.org/en/latest/) - A Python module for creating Excel .xlsx files.
    -   [xlwings](http://xlwings.org/) - A BSD-licensed library that makes it easy to call Python from Excel and vice versa.
    -   [xlwt](https://github.com/python-excel/xlwt) <span> | ★ 508, pushed 12 days ago | </span> / [xlrd](https://github.com/python-excel/xlrd) - Writing and reading data and formatting information from Excel files.
-   PDF
    -   [PDFMiner](https://github.com/euske/pdfminer) <span> | ★ 1459, pushed 13 days ago | </span> - A tool for extracting information from PDF documents.
    -   [PyPDF2](https://github.com/mstamy2/PyPDF2) <span> | ★ 941, pushed 3 days ago | </span> - A library capable of splitting, merging and transforming PDF pages.
    -   [ReportLab](http://www.reportlab.com/opensource/) - Allowing Rapid creation of rich PDF documents.
-   Markdown
    -   [Mistune](https://github.com/lepture/mistune) <span> | ★ 631, pushed 9 days ago | </span> - Fastest and full featured pure Python parsers of Markdown.
    -   [Python-Markdown](https://github.com/waylan/Python-Markdown) <span> | ★ 869, pushed 10 days ago | </span> - A Python implementation of John Gruber’s Markdown.
-   YAML
    -   [PyYAML](http://pyyaml.org/) - YAML implementations for Python.
-   CSV
    -   [csvkit](https://github.com/wireservice/csvkit) <span> | ★ 2037, pushed 10 days ago | </span> - Utilities for converting to and working with CSV.
-   Archive
    -   [unp](https://github.com/mitsuhiko/unp) <span> | ★ 218, pushed 225 days ago | </span> - A command line tool that can unpack archives easily.

Natural Language Processing
---------------------------

*Libraries for working with human languages.*

-   [NLTK](http://www.nltk.org/) - A leading platform for building Python programs to work with human language data.
-   [Pattern](http://www.clips.ua.ac.be/pattern) - A web mining module for the Python.
-   [Jieba](https://github.com/fxsjy/jieba) <span> | ★ 4971, pushed 36 days ago | </span> - Chinese text segmentation.
-   [SnowNLP](https://github.com/isnowfy/snownlp) <span> | ★ 1280, pushed 204 days ago | </span> - A library for processing Chinese text.
-   [spaCy](https://spacy.io/) - A library for industrial-strength natural language processing in Python and Cython.
-   [TextBlob](http://textblob.readthedocs.org/en/latest/) - Providing a consistent API for diving into common NLP tasks.
-   [TextGrocery](https://github.com/2shou/TextGrocery) <span> | ★ 227, pushed 309 days ago | </span> - A simple, efficient short-text classification tool based on LibLinear and Jieba.
-   [langid.py](https://github.com/saffsd/langid.py) <span> | ★ 554, pushed 16 days ago | </span> - Stand-alone language identification system.

Documentation
-------------

*Libraries for generating project documentation.*

-   [Sphinx](http://www.sphinx-doc.org/en/latest/) - Python Documentation generator.
    -   [awesome-sphinxdoc](https://github.com/yoloseem/awesome-sphinxdoc) <span> | ★ 157, pushed 1 days ago | </span>
-   [MkDocs](http://www.mkdocs.org/) - Markdown friendly documentation generator.
-   [pdoc](https://github.com/BurntSushi/pdoc) <span> | ★ 167, pushed 12 days ago | </span> - Epydoc replacement to auto generate API documentation for Python libraries.
-   [Pycco](https://github.com/pycco-docs/pycco) <span> | ★ 489, pushed 16 days ago | </span> - The literate-programming-style documentation generator.

Configuration
-------------

*Libraries for storing and parsing configuration options.*

-   [config](https://www.red-dove.com/config-doc/) - Hierarchical config from the author of [logging](https://docs.python.org/2/library/logging.html) .
-   [ConfigObj](http://www.voidspace.org.uk/python/configobj.html) - INI file parser with validation.
-   [ConfigParser](https://docs.python.org/2/library/configparser.html) - (Python standard library) INI file parser.
-   [profig](http://profig.readthedocs.org/en/default/) - Config from multiple formats with value conversion.
-   [python-decouple](https://github.com/henriquebastos/python-decouple) <span> | ★ 233, pushed 28 days ago | </span> - Strict separation of settings from code.

Command-line Tools
------------------

*Libraries for building command-line application.*

-   Command-line Application Development
    -   [asciimatics](https://github.com/peterbrittain/asciimatics) <span> | ★ 260, pushed 32 days ago | </span> - Cross-platform, full-screen terminal package (i.e. mouse/keyboard input and coloured, positioned text output) complete with high-level API for complex animations and special effects.
    -   [cement](http://builtoncement.com/) - CLI Application Framework for Python.
    -   [click](http://click.pocoo.org/dev/) - A package for creating beautiful command line interfaces in a composable way.
    -   [cliff](http://docs.openstack.org/developer/cliff/) - A framework for creating command-line programs with multi-level commands.
    -   [clint](https://github.com/kennethreitz/clint) <span> | ★ 1976, pushed 35 days ago | </span> - Python Command-line Application Tools.
    -   [colorama](https://pypi.python.org/pypi/colorama) - Cross-platform colored terminal text.
    -   [docopt](http://docopt.org/) - Pythonic command line arguments parser.
    -   [Gooey](https://github.com/chriskiehl/Gooey) <span> | ★ 3971, pushed 1 days ago | </span> - Turn command line programs into a full GUI application with one line
    -   [python-prompt-toolkit](https://github.com/jonathanslenders/python-prompt-toolkit) <span> | ★ 2269, pushed 3 days ago | </span> - A Library for building powerful interactive command lines.
-   Productivity Tools
    -   [aws-cli](https://github.com/aws/aws-cli) <span> | ★ 3775, pushed 0 days ago | </span> - A universal command-line interface for Amazon Web Services.
    -   [bashplotlib](https://github.com/glamp/bashplotlib) <span> | ★ 389, pushed 75 days ago | </span> - Making basic plots in the terminal.
    -   [caniusepython3](https://github.com/brettcannon/caniusepython3) <span> | ★ 238, pushed 32 days ago | </span> - Determine what projects are blocking you from porting to Python 3.
    -   [cookiecutter](https://github.com/audreyr/cookiecutter) <span> | ★ 3215, pushed 0 days ago | </span> - A command-line utility that creates projects from cookiecutters (project templates).
    -   [doitlive](https://github.com/sloria/doitlive) <span> | ★ 689, pushed 186 days ago | </span> - A tool for live presentations in the terminal.
    -   [howdoi](https://github.com/gleitz/howdoi) <span> | ★ 4331, pushed 0 days ago | </span> - Instant coding answers via the command line.
    -   [httpie](https://github.com/jkbrzt/httpie) <span> | ★ 22160, pushed 1 days ago | </span> - A command line HTTP client, a user-friendly cURL replacement.
    -   [PathPicker](https://github.com/facebook/PathPicker) <span> | ★ 2845, pushed 5 days ago | </span> - Select files out of bash output.
    -   [percol](https://github.com/mooz/percol) <span> | ★ 2020, pushed 88 days ago | </span> - Adds flavor of interactive selection to the traditional pipe concept on UNIX.
    -   [SAWS](https://github.com/donnemartin/saws) <span> | ★ 2781, pushed 7 days ago | </span> - A Supercharged AWS CLI.
    -   [thefuck](https://github.com/nvbn/thefuck) <span> | ★ 19907, pushed 0 days ago | </span> - Correcting your previous console command.
    -   [try](https://github.com/timofurrer/try) <span> | ★ 271, pushed 18 days ago | </span> - A dead simple CLI to try out python packages - It's never been easier.
    -   [mycli](https://github.com/dbcli/mycli) <span> | ★ 2613, pushed 9 days ago | </span> - A Terminal Client for MySQL with AutoCompletion and Syntax Highlighting.
    -   [pgcli](https://github.com/dbcli/pgcli) <span> | ★ 4382, pushed 10 days ago | </span> - Postgres CLI with autocompletion and syntax highlighting.

Downloader
----------

*Libraries for downloading.*

-   [s3cmd](https://github.com/s3tools/s3cmd) <span> | ★ 1825, pushed 2 days ago | </span> - A command line tool for managing Amazon S3 and CloudFront.
-   [s4cmd](https://github.com/bloomreach/s4cmd) <span> | ★ 385, pushed 13 days ago | </span> - Super S3 command line tool, good for higher performance.
-   [you-get](https://www.soimort.org/you-get/) - A YouTube/Youku/Niconico video downloader written in Python 3.
-   [youtube-dl](http://rg3.github.io/youtube-dl/) - A small command-line program to download videos from YouTube.

Imagery
-------

*Libraries for manipulating images.*

-   [pillow](http://pillow.readthedocs.org/en/latest/) - Pillow is the friendly [PIL](http://www.pythonware.com/products/pil/) fork.
-   [hmap](https://github.com/rossgoodwin/hmap) <span> | ★ 106, pushed 678 days ago | </span> - Image histogram remapping.
-   [imgSeek](https://sourceforge.net/projects/imgseek/) - A project for searching a collection of images using visual similarity.
-   [nude.py](https://github.com/hhatto/nude.py) <span> | ★ 345, pushed 204 days ago | </span> - Nudity detection.
-   [pyBarcode](https://pythonhosted.org/pyBarcode/) - Create barcodes in Python without needing PIL.
-   [pygram](https://github.com/ajkumar25/pygram) <span> | ★ 38, pushed 789 days ago | </span> - Instagram-like image filters.
-   [python-qrcode](https://github.com/lincolnloop/python-qrcode) <span> | ★ 841, pushed 37 days ago | </span> - A pure Python QR Code generator.
-   [Quads](https://github.com/fogleman/Quads) <span> | ★ 546, pushed 702 days ago | </span> - Computer art based on quadtrees.
-   [scikit-image](http://scikit-image.org/) - A Python library for (scientific) image processing.
-   [thumbor](https://github.com/thumbor/thumbor) <span> | ★ 3826, pushed 0 days ago | </span> - A smart imaging service. It enables on-demand crop, re-sizing and flipping of images.
-   [wand](https://github.com/dahlia/wand) <span> | ★ 551, pushed 2 days ago | </span> - Python bindings for [MagickWand](http://www.imagemagick.org/script/magick-wand.php) , C API for ImageMagick.

OCR
---

*Libraries for Optical Character Recognition.*

-   [pyocr](https://github.com/jflesch/pyocr) <span> | ★ 276, pushed 15 days ago | </span> - A wrapper for Tesseract and Cuneiform.
-   [pytesseract](https://github.com/madmaze/pytesseract) <span> | ★ 418, pushed 9 days ago | </span> - Another wrapper for [Google Tesseract OCR](https://github.com/tesseract-ocr) .

Audio
-----

*Libraries for manipulating audio.*

-   [audiolazy](https://github.com/danilobellini/audiolazy) <span> | ★ 216, pushed 413 days ago | </span> - Expressive Digital Signal Processing (DSP) package for Python.
-   [audioread](https://github.com/beetbox/audioread) <span> | ★ 91, pushed 81 days ago | </span> - Cross-library (GStreamer + Core Audio + MAD + FFmpeg) audio decoding.
-   [beets](http://beets.io/) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
-   [dejavu](https://github.com/worldveil/dejavu) <span> | ★ 2035, pushed 3 days ago | </span> - Audio fingerprinting and recognition.
-   [django-elastic-transcoder](https://github.com/StreetVoice/django-elastic-transcoder) <span> | ★ 26, pushed 32 days ago | </span> - Django + [Amazon Elastic Transcoder](http://aws.amazon.com/elastictranscoder/) .
-   [eyeD3](http://eyed3.nicfit.net/) - A tool for working with audio files, specifically MP3 files containing ID3 metadata.
-   [id3reader](http://nedbatchelder.com/code/modules/id3reader.py) - A Python module for reading MP3 meta data.
-   [m3u8](https://github.com/globocom/m3u8) <span> | ★ 162, pushed 53 days ago | </span> - A module for parsing m3u8 file.
-   [mutagen](https://bitbucket.org/lazka/mutagen) - A Python module to handle audio metadata.
-   [pydub](https://github.com/jiaaro/pydub) <span> | ★ 1364, pushed 1 days ago | </span> - Manipulate audio with a simple and easy high level interface.
-   [pyechonest](https://github.com/echonest/pyechonest) <span> | ★ 558, pushed 195 days ago | </span> - Python client for the [Echo Nest](http://developer.echonest.com/) API.
-   [talkbox](http://scikits.appspot.com/talkbox) - A Python library for speech/signal processing.
-   [TimeSide](https://github.com/Parisson/TimeSide) <span> | ★ 159, pushed 8 days ago | </span> - Open web audio processing framework.
-   [tinytag](https://github.com/devsnd/tinytag) <span> | ★ 141, pushed 13 days ago | </span> - A library for reading music meta data of MP3, OGG, FLAC and Wave files.
-   [mingus](http://bspaans.github.io/python-mingus/) - An advanced music theory and notation package with MIDI file and playback support.

Video
-----

*Libraries for manipulating video and GIFs.*

-   [moviepy](http://zulko.github.io/moviepy/) - A module for script-based movie editing with many formats, including animated GIFs.
-   [scikit-video](https://github.com/aizvorski/scikit-video) <span> | ★ 33, pushed 318 days ago | </span> - Video processing routines for SciPy.

Geolocation
-----------

*Libraries for geocoding addresses and working with latitudes and longitudes.*

-   [GeoDjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - A world-class geographic web framework.
-   [GeoIP](https://github.com/maxmind/geoip-api-python) <span> | ★ 127, pushed 6 days ago | </span> - Python API for MaxMind GeoIP Legacy Database.
-   [geojson](https://github.com/frewsxcv/python-geojson) <span> | ★ 197, pushed 72 days ago | </span> - Python bindings and utilities for GeoJSON.
-   [geopy](https://github.com/geopy/geopy) <span> | ★ 1065, pushed 8 days ago | </span> - Python Geocoding Toolbox.
-   [pygeoip](https://github.com/appliedsec/pygeoip) <span> | ★ 414, pushed 182 days ago | </span> - Pure Python GeoIP API.
-   [django-countries](https://github.com/SmileyChris/django-countries) <span> | ★ 241, pushed 7 days ago | </span> - A Django app that provides country choices for use with forms, flag icons static files, and a country field for models.

HTTP
----

*Libraries for working with HTTP.*

-   [requests](http://docs.python-requests.org/en/latest/) - HTTP Requests for Humans™.
-   [grequests](https://github.com/kennethreitz/grequests) <span> | ★ 1365, pushed 29 days ago | </span> - requests + gevent for asynchronous HTTP requests.
-   [httplib2](https://github.com/jcgregorio/httplib2) <span> | ★ 354, pushed 10 days ago | </span> - Comprehensive HTTP client library.
-   [treq](https://github.com/twisted/treq) <span> | ★ 258, pushed 28 days ago | </span> - Python requests like API built on top of Twisted's HTTP client.
-   [urllib3](https://github.com/shazow/urllib3) <span> | ★ 1021, pushed 0 days ago | </span> - A HTTP library with thread-safe connection pooling, file post support, sanity friendly.

Database
--------

*Databases implemented in Python.*

-   [pickleDB](https://pythonhosted.org/pickleDB/) - A simple and lightweight key-value store for Python.
-   [PipelineDB](https://www.pipelinedb.com/) - The Streaming SQL Database.
-   [TinyDB](https://github.com/msiemens/tinydb) <span> | ★ 936, pushed 1 days ago | </span> - A tiny, document-oriented database.
-   [ZODB](http://www.zodb.org/en/latest/) - A native object database for Python. A key-value and object graph database.

Database Drivers
----------------

*Libraries for connecting and operating databases.*

-   MySQL - [awesome-mysql](http://shlomi-noach.github.io/awesome-mysql/)
    -   [mysql-python](https://sourceforge.net/projects/mysql-python/) - The MySQL database connector for Python.
    -   [mysqlclient](https://github.com/PyMySQL/mysqlclient-python) <span> | ★ 300, pushed 56 days ago | </span> - mysql-python fork supporting Python 3.
    -   [oursql](https://pythonhosted.org/oursql/) - A better MySQL connector with support for native prepared statements and BLOBs.
    -   [PyMySQL](https://github.com/PyMySQL/PyMySQL) <span> | ★ 1628, pushed 3 days ago | </span> - Pure Python MySQL driver compatible to mysql-python.
-   PostgreSQL
    -   [psycopg2](http://initd.org/psycopg/) - The most popular PostgreSQL adapter for Python.
    -   [queries](https://github.com/gmr/queries) <span> | ★ 139, pushed 21 days ago | </span> - A wrapper of the psycopg2 library for interacting with PostgreSQL.
    -   [txpostgres](http://txpostgres.readthedocs.org/en/latest/) - Twisted based asynchronous driver for PostgreSQL.
-   Other Relational Databases
    -   [apsw](http://rogerbinns.github.io/apsw/) - Another Python SQLite wrapper.
    -   [dataset](https://github.com/pudo/dataset) <span> | ★ 2212, pushed 11 days ago | </span> - Store Python dicts in a database - works with SQLite, MySQL, and PostgreSQL.
    -   [pymssql](http://www.pymssql.org/en/latest/) - A simple database interface to Microsoft SQL Server.
-   NoSQL Databases
    -   [cassandra-python-driver](https://github.com/datastax/python-driver) <span> | ★ 487, pushed 0 days ago | </span> - Python driver for Cassandra.
    -   [HappyBase](http://happybase.readthedocs.org/en/latest/) - A developer-friendly library for Apache HBase.
    -   [Plyvel](https://plyvel.readthedocs.org/en/latest/) - A fast and feature-rich Python interface to LevelDB.
    -   [py2neo](http://py2neo.org/2.0/) - Python wrapper client for Neo4j's restful interface.
    -   [pycassa](https://github.com/pycassa/pycassa) <span> | ★ 494, pushed 470 days ago | </span> - Python Thrift driver for Cassandra.
    -   [PyMongo](https://docs.mongodb.org/ecosystem/drivers/python/) - The official Python client for MongoDB.
    -   [redis-py](https://github.com/andymccurdy/redis-py) <span> | ★ 4055, pushed 23 days ago | </span> - The Redis Python Client.
    -   [telephus](https://github.com/driftx/Telephus) <span> | ★ 93, pushed 617 days ago | </span> - Twisted based client for Cassandra.
    -   [txRedis](https://github.com/deldotdr/txRedis) <span> | ★ 110, pushed 77 days ago | </span> - Twisted based client for Redis.

ORM
---

*Libraries that implement Object-Relational Mapping or data mapping techniques.*

-   Relational Databases
    -   [Django Models](https://docs.djangoproject.com/en/dev/topics/db/models/) - A part of Django.
    -   [SQLAlchemy](http://www.sqlalchemy.org/) - The Python SQL Toolkit and Object Relational Mapper.
        -   [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy) <span> | ★ 1098, pushed 18 days ago | </span>
    -   [Peewee](https://github.com/coleifer/peewee) <span> | ★ 2734, pushed 1 days ago | </span> - A small, expressive ORM.
    -   [PonyORM](https://ponyorm.com/) - ORM that provides a generator-oriented interface to SQL.
    -   [python-sql](https://pypi.python.org/pypi/python-sql) - Write SQL queries pythonically.
-   NoSQL Databases
    -   [django-mongodb-engine](https://github.com/django-nonrel/mongodb-engine) <span> | ★ 630, pushed 9 days ago | </span> - Django MongoDB Backend.
    -   [PynamoDB](https://github.com/jlafon/PynamoDB) <span> | ★ 174, pushed 1 days ago | </span> - A Pythonic interface for [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) .
    -   [flywheel](https://github.com/mathcamp/flywheel) <span> | ★ 57, pushed 6 days ago | </span> - Object mapper for Amazon DynamoDB.
    -   [MongoEngine](http://mongoengine.org/) - A Python Object-Document-Mapper for working with MongoDB.
    -   [hot-redis](https://github.com/stephenmcd/hot-redis) <span> | ★ 177, pushed 8 days ago | </span> - Rich Python data types for Redis.
    -   [redisco](https://github.com/kiddouk/redisco) <span> | ★ 295, pushed 74 days ago | </span> - A Python Library for Simple Models and Containers Persisted in Redis.
-   Others
    -   [butterdb](https://github.com/Widdershin/butterdb) <span> | ★ 304, pushed 314 days ago | </span> - A Python ORM for Google Drive Spreadsheets.

Web Frameworks
--------------

*Full stack web frameworks.*

-   [Django](https://www.djangoproject.com/) - The most popular web framework in Python.
    -   [awesome-django](https://github.com/rosarior/awesome-django) <span> | ★ 3613, pushed 13 days ago | </span>
-   [Flask](http://flask.pocoo.org/) - A microframework for Python.
    -   [awesome-flask](https://github.com/humiaozuzu/awesome-flask) <span> | ★ 2305, pushed 1 days ago | </span>
-   [Pyramid](http://www.pylonsproject.org/) - A small, fast, down-to-earth, open source Python web framework.
    -   [awesome-pyramid](https://github.com/uralbash/awesome-pyramid) <span> | ★ 242, pushed 36 days ago | </span>
-   [Bottle](http://bottlepy.org/docs/dev/index.html) - A fast, simple and lightweight WSGI micro web-framework.
-   [CherryPy](http://www.cherrypy.org/) - A minimalist Python web framework, HTTP/1.1-compliant and WSGI thread-pooled.
-   [TurboGears](http://www.turbogears.org/) - A microframework that can scale up to a full stack solution.
-   [web.py](http://webpy.org/) - A web framework for Python that is as simple as it is powerful.
-   [web2py](http://www.web2py.com) - A full stack web framework and platform focused in the ease of use.
-   [Tornado](http://www.tornadoweb.org/en/latest/) - A Web framework and asynchronous networking library.

Permissions
-----------

*Libraries that allow or deny users access to data or functionality.*

-   [Carteblanche](https://github.com/neuman/python-carteblanche/) - Module to align code with thoughts of users and designers. Also magically handles navigation and permissions.
-   [django-guardian](https://github.com/django-guardian/django-guardian) <span> | ★ 1096, pushed 1 days ago | </span> - Implementation of per object permissions for Django 1.2+
-   [django-rules](https://github.com/dfunckt/django-rules) <span> | ★ 289, pushed 69 days ago | </span> - A tiny but powerful app providing object-level permissions to Django, without requiring a database.

CMS
---

*Content Management Systems.*

-   [django-cms](http://www.django-cms.org/en/) - An Open source enterprise CMS based on the Django.
-   [djedi-cms](http://djedi-cms.org/) - A lightweight but yet powerful Django CMS with plugins, inline editing and performance in mind.
-   [FeinCMS](http://www.feincms.org/) - One of the most advanced Content Management Systems built on Django.
-   [Kotti](http://kotti.pylonsproject.org/) - A high-level, Pythonic web application framework built on Pyramid.
-   [Mezzanine](http://mezzanine.jupo.org/) - A powerful, consistent, and flexible content management platform.
-   [Opps](http://opps.github.io/opps/) - A Django-based CMS for magazines, newspapers websites and portals with high-traffic.
-   [Plone](https://plone.org/) - A CMS built on top of the open source application server Zope.
-   [Quokka](http://quokkaproject.org/) - Flexible, extensible, small CMS powered by Flask and MongoDB.
-   [Wagtail](https://wagtail.io/) - A Django content management system.
-   [Widgy](https://wid.gy/) - Last CMS framework, based on Django.

E-commerce
----------

*Frameworks and libraries for e-commerce and payments.*

-   [django-oscar](http://oscarcommerce.com/) - An open-source e-commerce framework for Django.
-   [django-shop](https://github.com/awesto/django-shop) <span> | ★ 1027, pushed 0 days ago | </span> - A Django based shop system.
-   [Cartridge](https://github.com/stephenmcd/cartridge) <span> | ★ 455, pushed 17 days ago | </span> - A shopping cart app built using the Mezzanine.
-   [shoop](https://www.shoop.io/en/) - An open source E-Commerce platform based on Django.
-   [alipay](https://github.com/lxneng/alipay) <span> | ★ 122, pushed 109 days ago | </span> - Unofficial Alipay API for Python.
-   [merchant](https://github.com/agiliq/merchant) <span> | ★ 826, pushed 3 days ago | </span> - A Django app to accept payments from various payment processors.
-   [money](https://github.com/carlospalol/money) <span> | ★ 60, pushed 4 days ago | </span> - Money class with optional CLDR-backed locale-aware formatting and an extensible currency exchange solution.
-   [python-currencies](https://github.com/Alir3z4/python-currencies) <span> | ★ 20, pushed 53 days ago | </span> - Display money format and its filthy currencies.

RESTful API
-----------

*Libraries for developing RESTful APIs.*

-   Django
    -   [django-rest-framework](http://www.django-rest-framework.org/) - A powerful and flexible toolkit to build web APIs.
    -   [django-tastypie](http://tastypieapi.org/) - Creating delicious APIs for Django apps.
    -   [django-formapi](https://github.com/5monkeys/django-formapi) <span> | ★ 21, pushed 387 days ago | </span> - Create JSON APIs with Django's form validation.
-   Flask
    -   [flask-api](http://www.flaskapi.org/) - Browsable Web APIs for Flask.
    -   [flask-restful](http://flask-restful.readthedocs.org/en/latest/) - Quickly building REST APIs for Flask.
    -   [flask-restless](https://flask-restless.readthedocs.org/en/latest/) - Generating RESTful APIs for database models defined with SQLAlchemy.
    -   [flask-api-utils](https://github.com/marselester/flask-api-utils) <span> | ★ 28, pushed 189 days ago | </span> - Taking care of API representation and authentication for Flask.
    -   [eve](https://github.com/nicolaiarocci/eve) <span> | ★ 3161, pushed 10 days ago | </span> - REST API framework powered by Flask, MongoDB and good intentions.
-   Pyramid
    -   [cornice](https://cornice.readthedocs.org/en/latest/) - A REST framework for Pyramid.
-   Framework agnostic
    -   [falcon](http://falconframework.org/) - A high-performance framework for building cloud APIs and web app backends.
    -   [hug](https://github.com/timothycrosley/hug) <span> | ★ 3054, pushed 2 days ago | </span> - A Python3 framework for cleanly exposing APIs over HTTP and the Command Line with automatic documentation and validation.
    -   [sandman](https://github.com/jeffknupp/sandman) <span> | ★ 2216, pushed 51 days ago | </span> - Automated REST APIs for existing database-driven systems.
    -   [restless](http://restless.readthedocs.org/en/latest/) - Framework agnostic REST framework based on lessons learned from Tastypie.
    -   [ripozo](https://github.com/vertical-knowledge/ripozo) <span> | ★ 151, pushed 23 days ago | </span> - Quickly creating REST/HATEOAS/Hypermedia APIs.

Serialization
-------------

*Libraries for serializing complex data types*

-   [marshmallow](http://marshmallow.readthedocs.org/en/latest/) - marshmallow is an ORM/ODM/framework-agnostic library for converting complex datatypes, such as objects, to and from native Python datatypes.

Authentication
--------------

*Libraries for implementing authentications schemes.*

-   OAuth
    -   [Authomatic](http://peterhudec.github.io/authomatic/) - Simple but powerful framework agnostic authentication/authorization client.
    -   [django-allauth](https://github.com/pennersr/django-allauth) <span> | ★ 2303, pushed 10 days ago | </span> - Authentication app for Django that "just works."
    -   [django-oauth-toolkit](https://github.com/evonove/django-oauth-toolkit) <span> | ★ 719, pushed 30 days ago | </span> - OAuth2 goodies for the Djangonauts.
    -   [django-oauth2-provider](https://github.com/caffeinehit/django-oauth2-provider) <span> | ★ 294, pushed 43 days ago | </span> - Providing OAuth2 access to Django app.
    -   [Flask-OAuthlib](https://github.com/lepture/flask-oauthlib) <span> | ★ 686, pushed 47 days ago | </span> - OAuth 1.0/a, 2.0 implementation of client and provider for Flask.
    -   [OAuthLib](https://github.com/idan/oauthlib) <span> | ★ 1108, pushed 1 days ago | </span> - A generic and thorough implementation of the OAuth request-signing logic.
    -   [python-oauth2](https://github.com/joestump/python-oauth2) <span> | ★ 2379, pushed 30 days ago | </span> - A fully tested, abstract interface to creating OAuth clients and servers.
    -   [python-social-auth](https://github.com/omab/python-social-auth) <span> | ★ 2222, pushed 0 days ago | </span> - An easy-to-setup social authentication mechanism.
    -   [rauth](https://github.com/litl/rauth) <span> | ★ 1412, pushed 168 days ago | </span> - A Python library for OAuth 1.0/a, 2.0, and Ofly.
    -   [sanction](https://github.com/demianbrecht/sanction) <span> | ★ 149, pushed 708 days ago | </span> - A dead simple OAuth2 client implementation.
-   Others
    -   [jose](https://github.com/demonware/jose) <span> | ★ 43, pushed 43 days ago | </span> - JavaScript Object Signing and Encryption draft implementation.
    -   [PyJWT](https://github.com/jpadilla/pyjwt) <span> | ★ 744, pushed 49 days ago | </span> - Implementation of the JSON Web Token draft 01.
    -   [python-jws](https://github.com/brianloveswords/python-jws) <span> | ★ 40, pushed 157 days ago | </span> - Implementation of JSON Web Signatures draft 02.
    -   [python-jwt](https://github.com/davedoesdev/python-jwt) <span> | ★ 95, pushed 47 days ago | </span> - Module for generating and verifying JSON Web Tokens.

Template Engine
---------------

*Libraries and tools for templating and lexing.*

-   [Jinja2](https://github.com/pallets/jinja) <span> | ★ 3221, pushed 2 days ago | </span> - A modern and designer friendly templating language.
-   [Chameleon](https://chameleon.readthedocs.org/en/latest/) - An HTML/XML template engine. Modeled after ZPT, optimized for speed.
-   [Genshi](https://genshi.edgewall.org/) - Python templating toolkit for generation of web-aware output.
-   [Mako](http://www.makotemplates.org/) - Hyperfast and lightweight templating for the Python platform.

Queue
-----

*Libraries for working with event and task queues.*

-   [celery](http://www.celeryproject.org/) - An asynchronous task queue/job queue based on distributed message passing.
-   [huey](https://github.com/coleifer/huey) <span> | ★ 863, pushed 42 days ago | </span> - Little multi-threaded task queue.
-   [mrq](https://github.com/pricingassistant/mrq) <span> | ★ 370, pushed 2 days ago | </span> - Mr. Queue - A distributed worker task queue in Python using Redis & gevent.
-   [rq](http://python-rq.org/) - Simple job queues for Python.
-   [simpleq](https://github.com/rdegges/simpleq) <span> | ★ 100, pushed 339 days ago | </span> - A simple, infinitely scalable, Amazon SQS based queue.

Search
------

*Libraries and software for indexing and performing search queries on data.*

-   [django-haystack](https://github.com/django-haystack/django-haystack) <span> | ★ 1946, pushed 8 days ago | </span> - Modular search for Django.
-   [elasticsearch-py](https://www.elastic.co/guide/en/elasticsearch/client/python-api/current/index.html) - The official low-level Python client for [Elasticsearch](https://www.elastic.co/products/elasticsearch) .
-   [elasticsearch-dsl-py](https://github.com/elastic/elasticsearch-dsl-py) <span> | ★ 790, pushed 11 days ago | </span> - The official high-level Python client for Elasticsearch.
-   [esengine](https://github.com/catholabs/esengine) <span> | ★ 47, pushed 15 days ago | </span> - ElasticSearch ODM (Object Document Mapper) for Python.
-   [solrpy](https://github.com/edsu/solrpy) <span> | ★ 17, pushed 26 days ago | </span> - A Python client for [solr](http://lucene.apache.org/solr/) .
-   [Whoosh](http://whoosh.readthedocs.org/en/latest/) - A fast, pure Python search engine library.

News Feed
---------

*Libraries for building user's activities.*

-   [django-activity-stream](https://github.com/justquick/django-activity-stream) <span> | ★ 993, pushed 7 days ago | </span> - Generating generic activity streams from the actions on your site.
-   [Stream-Framework](https://github.com/tschellenbach/Stream-Framework) <span> | ★ 2060, pushed 0 days ago | </span> - Building newsfeed and notification systems using Cassandra and Redis.

Asset Management
----------------

*Tools for managing, compressing and minifying website assets.*

-   [django-compressor](https://github.com/django-compressor/django-compressor) <span> | ★ 1652, pushed 0 days ago | </span> - Compresses linked and inline JavaScript or CSS into a single cached file.
-   [django-storages](http://django-storages.readthedocs.org/en/latest/) - A collection of custom storage back ends for Django.
-   [fanstatic](http://www.fanstatic.org/en/latest/) - Packages, optimizes, and serves static file dependencies as Python packages.
-   [File Conveyor](http://fileconveyor.org/) - A daemon to detect and sync files to CDNs, S3 and FTP.
-   [Flask-Assets](http://flask-assets.readthedocs.org/en/latest/) - Helps you integrate webassets into your Flask app.
-   [jinja-assets-compressor](https://github.com/jaysonsantos/jinja-assets-compressor) <span> | ★ 36, pushed 6 days ago | </span> - A Jinja extension to compile and compress your assets.
-   [webassets](http://webassets.readthedocs.org/en/latest/) - Bundles, optimizes, and manages unique cache-busting URLs for static resources.

Caching
-------

*Libraries for caching data.*

-   [Beaker](http://beaker.readthedocs.org/en/latest/) - A library for caching and sessions for use with web applications and stand-alone Python scripts and applications.
-   [django-cache-machine](https://github.com/django-cache-machine/django-cache-machine) <span> | ★ 610, pushed 2 days ago | </span> - Automatic caching and invalidation for Django models.
-   [django-cacheops](https://github.com/Suor/django-cacheops) <span> | ★ 535, pushed 8 days ago | </span> - A slick ORM cache with automatic granular event-driven invalidation.
-   [django-viewlet](https://github.com/5monkeys/django-viewlet) <span> | ★ 54, pushed 113 days ago | </span> - Render template parts with extended cache control.
-   [dogpile.cache](http://dogpilecache.readthedocs.org/en/latest/) - dogpile.cache is next generation replacement for Beaker made by same authors.
-   [HermesCache](https://pypi.python.org/pypi/HermesCache) - Python caching library with tag-based invalidation and dogpile effect prevention.
-   [johnny-cache](https://github.com/jmoiron/johnny-cache) <span> | ★ 254, pushed 176 days ago | </span> - A caching framework for django applications.
-   [pylibmc](https://github.com/lericson/pylibmc) <span> | ★ 318, pushed 2 days ago | </span> - A Python wrapper around the [libmemcached](http://libmemcached.org/libMemcached.html) interface.
-   [DiskCache](http://www.grantjenks.com/docs/diskcache/) - SQLite and file backed cache backend with faster lookups than memcached and redis.

Email
-----

*Libraries for sending and parsing email.*

-   [django-celery-ses](https://github.com/StreetVoice/django-celery-ses) <span> | ★ 18, pushed 709 days ago | </span> - Django email back end with AWS SES and Celery.
-   [envelopes](http://tomekwojcik.github.io/envelopes/) - Mailing for human beings.
-   [flanker](https://github.com/mailgun/flanker) <span> | ★ 908, pushed 138 days ago | </span> - A email address and Mime parsing library.
-   [imbox](https://github.com/martinrusev/imbox) <span> | ★ 618, pushed 13 days ago | </span> - Python IMAP for Humans.
-   [inbox.py](https://github.com/kennethreitz/inbox.py) <span> | ★ 1214, pushed 77 days ago | </span> - Python SMTP Server for Humans.
-   [inbox](https://github.com/nylas/sync-engine) <span> | ★ 2859, pushed 0 days ago | </span> - The open source email toolkit.
-   [lamson](https://github.com/zedshaw/lamson) <span> | ★ 532, pushed 1141 days ago | </span> - Pythonic SMTP Application Server.
-   [mailjet](https://github.com/WoLpH/mailjet) <span> | ★ 16, pushed 50 days ago | </span> - Mailjet API implementation for batch mailing, statistics and more.
-   [marrow.mailer](https://github.com/marrow/mailer) <span> | ★ 98, pushed 11 days ago | </span> - High-performance extensible mail delivery framework.
-   [modoboa](https://github.com/tonioo/modoboa) <span> | ★ 516, pushed 1 days ago | </span> - A mail hosting and management platform including a modern and simplified Web UI.
-   [pyzmail](http://www.magiksys.net/pyzmail/) - Compose, send and parse emails.
-   [Talon](https://github.com/mailgun/talon) <span> | ★ 543, pushed 13 days ago | </span> - Mailgun library to extract message quotations and signatures.

Internationalization
--------------------

*Libraries for working with i18n.*

-   [Babel](http://babel.pocoo.org/en/latest/) - An internationalization library for Python.
-   [Korean](https://korean.readthedocs.org/en/latest/) - A library for [Korean](https://en.wikipedia.org/wiki/Korean_language) morphology.

URL Manipulation
----------------

*Libraries for parsing URLs.*

-   [furl](https://github.com/gruns/furl) <span> | ★ 894, pushed 0 days ago | </span> - A small Python library that makes manipulating URLs simple.
-   [purl](https://github.com/codeinthehole/purl) <span> | ★ 158, pushed 27 days ago | </span> - A simple, immutable URL class with a clean API for interrogation and manipulation.
-   [pyshorteners](https://github.com/ellisonleao/pyshorteners) <span> | ★ 109, pushed 10 days ago | </span> - A pure Python URL shortening lib.
-   [short\_url](https://github.com/Alir3z4/python-short_url) <span> | ★ 46, pushed 649 days ago | </span> - Python implementation for generating Tiny URL and bit.ly-like URLs.
-   [webargs](https://github.com/sloria/webargs) <span> | ★ 309, pushed 7 days ago | </span> - A friendly library for parsing HTTP request arguments, with built-in support for popular web frameworks, including Flask, Django, Bottle, Tornado, and Pyramid.

HTML Manipulation
-----------------

*Libraries for working with HTML and XML.*

-   [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
-   [bleach](http://bleach.readthedocs.org/en/latest/) - A whitelist-based HTML sanitization and text linkification library.
-   [cssutils](https://pypi.python.org/pypi/cssutils/) - A CSS library for Python.
-   [html5lib](https://github.com/html5lib/html5lib-python) <span> | ★ 468, pushed 0 days ago | </span> - A standards-compliant library for parsing and serializing HTML documents and fragments.
-   [lxml](http://lxml.de/) - A very fast, easy-to-use and versatile library for handling HTML and XML.
-   [MarkupSafe](https://github.com/pallets/markupsafe) <span> | ★ 120, pushed 10 days ago | </span> - Implements a XML/HTML/XHTML Markup safe string for Python.
-   [pyquery](https://github.com/gawel/pyquery) <span> | ★ 917, pushed 9 days ago | </span> - A jQuery-like library for parsing HTML.
-   [untangle](https://github.com/stchris/untangle) <span> | ★ 156, pushed 100 days ago | </span> - Converts XML documents to Python objects for easy access.
-   [xhtml2pdf](https://github.com/xhtml2pdf/xhtml2pdf) <span> | ★ 1117, pushed 2 days ago | </span> - HTML/CSS to PDF converter.
-   [xmltodict](https://github.com/martinblech/xmltodict) <span> | ★ 1964, pushed 16 days ago | </span> - Working with XML feel like you are working with JSON.

Web Crawling
------------

*Libraries for scraping websites.*

-   [Scrapy](http://scrapy.org/) - A fast high-level screen scraping and web crawling framework.
-   [cola](https://github.com/chineking/cola) <span> | ★ 879, pushed 21 days ago | </span> - A distributed crawling framework.
-   [Demiurge](https://github.com/matiasb/demiurge) <span> | ★ 32, pushed 165 days ago | </span> - PyQuery-based scraping micro-framework.
-   [feedparser](http://pythonhosted.org/feedparser/) - Universal feed parser.
-   [Grab](http://grablib.org/) - Site scraping framework.
-   [MechanicalSoup](https://github.com/hickford/MechanicalSoup) <span> | ★ 1332, pushed 51 days ago | </span> - A Python library for automating interaction with websites.
-   [portia](https://github.com/scrapinghub/portia) <span> | ★ 4120, pushed 1 days ago | </span> - Visual scraping for Scrapy.
-   [pyspider](https://github.com/binux/pyspider) <span> | ★ 6438, pushed 1 days ago | </span> - A powerful spider system.
-   [RoboBrowser](https://github.com/jmcarp/robobrowser) <span> | ★ 1303, pushed 35 days ago | </span> - A simple, Pythonic library for browsing the web without a standalone web browser.

Web Content Extracting
----------------------

*Libraries for extracting web contents.*

-   [Haul](https://github.com/vinta/Haul) <span> | ★ 56, pushed 211 days ago | </span> - An Extensible Image Crawler.
-   [html2text](https://github.com/Alir3z4/html2text) <span> | ★ 231, pushed 20 days ago | </span> - Convert HTML to Markdown-formatted text.
-   [lassie](https://github.com/michaelhelmick/lassie) <span> | ★ 301, pushed 162 days ago | </span> - Web Content Retrieval for Humans.
-   [micawber](https://github.com/coleifer/micawber) <span> | ★ 292, pushed 115 days ago | </span> - A small library for extracting rich content from URLs.
-   [newspaper](https://github.com/codelucas/newspaper) <span> | ★ 3070, pushed 28 days ago | </span> - News extraction, article extraction and content curation in Python.
-   [opengraph](https://github.com/erikriver/opengraph) <span> | ★ 66, pushed 71 days ago | </span> - A Python module to parse the Open Graph Protocol
-   [python-goose](https://github.com/grangier/python-goose) <span> | ★ 1866, pushed 31 days ago | </span> - HTML Content/Article Extractor.
-   [python-readability](https://github.com/buriy/python-readability) <span> | ★ 909, pushed 12 days ago | </span> - Fast Python port of arc90's readability tool.
-   [sanitize](https://github.com/Alir3z4/python-sanitize) <span> | ★ 16, pushed 562 days ago | </span> - Bringing sanity to world of messed-up data.
-   [sumy](https://github.com/miso-belica/sumy) <span> | ★ 412, pushed 39 days ago | </span> - A module for automatic summarization of text documents and HTML pages.
-   [textract](https://github.com/deanmalmgren/textract) <span> | ★ 1679, pushed 61 days ago | </span> - Extract text from any document, Word, PowerPoint, PDFs, etc.

Forms
-----

*Libraries for working with forms.*

-   [Deform](http://deform.readthedocs.org/en/latest/) - Python HTML form generation library influenced by the formish form generation library.
-   [django-bootstrap3](https://github.com/dyve/django-bootstrap3) <span> | ★ 1342, pushed 3 days ago | </span> - Bootstrap 3 integration with Django.
-   [django-crispy-forms](http://django-crispy-forms.readthedocs.org/en/latest/) - A Django app which lets you create beautiful forms in a very elegant and DRY way.
-   [django-remote-forms](https://github.com/WiserTogether/django-remote-forms) <span> | ★ 139, pushed 189 days ago | </span> - A platform independent Django form serializer.
-   [WTForms](http://wtforms.readthedocs.org/en/latest/) - A flexible forms validation and rendering library.
-   [WTForms-JSON](http://wtforms-json.readthedocs.org/en/latest/) - A WTForms extension for JSON data handling.

Data Validation
---------------

*Libraries for validating data. Used for forms in many cases.*

-   [Schematics](https://github.com/schematics/schematics) <span> | ★ 1550, pushed 10 days ago | </span> - Data Structure Validation.
-   [schema](https://github.com/keleshev/schema) <span> | ★ 826, pushed 64 days ago | </span> - A library for validating Python data structures.
-   [jsonschema](https://github.com/Julian/jsonschema) <span> | ★ 796, pushed 83 days ago | </span> - An implementation of [JSON Schema](http://json-schema.org/) for Python.
-   [Cerberus](https://github.com/nicolaiarocci/cerberus/) - A lightweight and extensible data validation library.
-   [colander](http://docs.pylonsproject.org/projects/colander/en/latest/) - Validating and deserializing data obtained via XML, JSON, an HTML form post.
-   [voluptuous](https://github.com/alecthomas/voluptuous) <span> | ★ 585, pushed 1 days ago | </span> - A Python data validation library.
-   [valideer](https://github.com/podio/valideer) <span> | ★ 165, pushed 123 days ago | </span> - Lightweight extensible data validation and adaptation library.

Anti-spam
---------

*Libraries for fighting spam.*

-   [django-simple-captcha](https://github.com/mbi/django-simple-captcha) <span> | ★ 352, pushed 13 days ago | </span> - A simple and highly customizable Django app to add captcha images to any Django form.
-   [django-simple-spam-blocker](https://github.com/moqada/django-simple-spam-blocker) <span> | ★ 9, pushed 1218 days ago | </span> - Simple spam blocker for Django.

Tagging
-------

*Libraries for tagging items.*

-   [django-taggit](https://github.com/alex/django-taggit) <span> | ★ 1438, pushed 2 days ago | </span> - Simple tagging for Django.

Admin Panels
------------

*Libraries for administrative interfaces.*

-   [Ajenti](https://github.com/Eugeny/ajenti) <span> | ★ 146, pushed 317 days ago | </span> - The admin panel your servers deserve.
-   [django-suit](http://djangosuit.com/) - Alternative Django Admin-Interface (free only for Non-commercial use).
-   [django-xadmin](https://github.com/sshwsfc/xadmin) <span> | ★ 1586, pushed 0 days ago | </span> - Drop-in replacement of Django admin comes with lots of goodies.
-   [flask-admin](https://github.com/flask-admin/flask-admin) <span> | ★ 1660, pushed 1 days ago | </span> - Simple and extensible administrative interface framework for Flask.
-   [flower](https://github.com/mher/flower) <span> | ★ 1655, pushed 11 days ago | </span> - Real-time monitor and web admin for Celery.
-   [Grappelli](http://grappelliproject.com) – A jazzy skin for the Django Admin-Interface.
-   [Wooey](https://github.com/wooey/wooey) <span> | ★ 630, pushed 8 days ago | </span> - A Django app which creates automatic web UIs for Python scripts.

Static Site Generator
---------------------

*Static site generator is a software that takes some text + templates as input and produces HTML files on the output.*

-   [Pelican](http://blog.getpelican.com/) - Uses Markdown or ReST for content and Jinja 2 for themes. Supports DVCS, Disqus. AGPL.
-   [Cactus](https://github.com/koenbok/Cactus/) – Static site generator for designers.
-   [Hyde](http://hyde.github.io/) - Jinja2-based static web site generator.
-   [Nikola](https://www.getnikola.com/) - A static website and blog generator.
-   [Tinkerer](http://tinkerer.me/) - Tinkerer is a blogging engine/.static website generator powered by Sphinx.
-   [Lektor](https://www.getlektor.com/) - An easy to use static CMS and blog engine.

Processes
---------

*Libraries for starting and communicating with OS processes.*

-   [envoy](https://github.com/kennethreitz/envoy) <span> | ★ 1663, pushed 617 days ago | </span> - Python [subprocess](https://docs.python.org/2/library/subprocess.html) for Humans™.
-   [sarge](http://sarge.readthedocs.org/en/latest/) - Yet another wrapper for subprocess.
-   [sh](https://github.com/amoffat/sh) <span> | ★ 3317, pushed 7 days ago | </span> - A full-fledged subprocess replacement for Python.

Concurrency and Parallelism
---------------------------

*Libraries for concurrent and parallel execution.*

-   [multiprocessing](https://docs.python.org/2/library/multiprocessing.html) - (Python standard library) Process-based "threading" interface.
-   [threading](https://docs.python.org/2/library/threading.html) - (Python standard library) Higher-level threading interface.
-   [eventlet](http://eventlet.net/) - Asynchronous framework with WSGI support.
-   [gevent](http://www.gevent.org/) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet) .
-   [Tomorrow](https://github.com/madisonmay/Tomorrow) <span> | ★ 1122, pushed 41 days ago | </span> - Magic decorator syntax for asynchronous code.

Networking
----------

*Libraries for networking programming.*

-   [asyncio](https://docs.python.org/3/library/asyncio.html) - (Python standard library) Asynchronous I/O, event loop, coroutines and tasks.
-   [Twisted](https://twistedmatrix.com/trac/) - An event-driven networking engine.
-   [pulsar](https://github.com/quantmind/pulsar) <span> | ★ 1238, pushed 0 days ago | </span> - Event-driven concurrent framework for Python.
-   [diesel](https://github.com/dieseldev/diesel) <span> | ★ 528, pushed 373 days ago | </span> - Greenlet-based event I/O Framework for Python.
-   [pyzmq](http://zeromq.github.io/pyzmq/) - A Python wrapper for the ZeroMQ message library.
-   [txZMQ](https://github.com/smira/txZMQ) <span> | ★ 120, pushed 251 days ago | </span> - Twisted based wrapper for the ZeroMQ message library.

WebSocket
---------

*Libraries for working with WebSocket.*

-   [AutobahnPython](https://github.com/crossbario/autobahn-python) <span> | ★ 1097, pushed 0 days ago | </span> - WebSocket & WAMP for Python on Twisted and [asyncio](https://docs.python.org/3/library/asyncio.html) .
-   [Crossbar](https://github.com/crossbario/crossbar/) - Open-source Unified Application Router (Websocket & WAMP for Python on Autobahn).
-   [django-socketio](https://github.com/stephenmcd/django-socketio) <span> | ★ 875, pushed 15 days ago | </span> - WebSockets for Django.
-   [WebSocket-for-Python](https://github.com/Lawouach/WebSocket-for-Python) <span> | ★ 658, pushed 58 days ago | </span> - WebSocket client and server library for Python 2 and 3 as well as PyPy.

WSGI Servers
------------

*WSGI-compatible web servers.*

-   [gunicorn](https://pypi.python.org/pypi/gunicorn) - Pre-forked, partly written in C.
-   [uwsgi](https://uwsgi-docs.readthedocs.org/en/latest/) - A project aims at developing a full stack for building hosting services, written in C.
-   [bjoern](https://pypi.python.org/pypi/bjoern) - Asynchronous, very fast and written in C.
-   [fapws3](http://www.fapws.org/) - Asynchronous (network side only), written in C.
-   [meinheld](https://pypi.python.org/pypi/meinheld) - Asynchronous, partly written in C.
-   [netius](https://github.com/hivesolutions/netius) <span> | ★ 35, pushed 4 days ago | </span> - Asynchronous, very fast.
-   [paste](http://pythonpaste.org/) - Multi-threaded, stable, tried and tested.
-   [rocket](https://pypi.python.org/pypi/rocket) - Multi-threaded.
-   [waitress](https://waitress.readthedocs.org/en/latest/) - Multi-threaded, poweres Pyramid.
-   [Werkzeug](http://werkzeug.pocoo.org/) - A WSGI utility library for Python that powers Flask and can easily be embedded into your own projects.

RPC Servers
-----------

*RPC-compatible servers.*

-   [SimpleJSONRPCServer](https://github.com/joshmarshall/jsonrpclib/) - This library is an implementation of the JSON-RPC specification.
-   [SimpleXMLRPCServer](https://docs.python.org/2/library/simplexmlrpcserver.html) - (Python standard library) Simple XML-RPC server implementation, single-threaded.
-   [zeroRPC](https://github.com/0rpc/zerorpc-python) <span> | ★ 1666, pushed 31 days ago | </span> - zerorpc is a flexible RPC implementation based on [ZeroMQ](http://zeromq.org/) and [MessagePack](http://msgpack.org/) .

Cryptography
------------

-   [cryptography](https://cryptography.io/en/latest/) - A package designed to expose cryptographic primitives and recipes to Python developers.
-   [hashids](https://github.com/davidaurelio/hashids-python) <span> | ★ 414, pushed 80 days ago | </span> - Implementation of [hashids](http://hashids.org) in Python.
-   [Paramiko](http://www.paramiko.org/) - A Python (2.6+, 3.3+) implementation of the SSHv2 protocol, providing both client and server functionality.
-   [Passlib](https://pythonhosted.org/passlib/) - Secure password storage/hashing library, very high level.
-   [PyCrypto](https://www.dlitz.net/software/pycrypto/) - The Python Cryptography Toolkit.
-   [PyNacl](https://github.com/pyca/pynacl) <span> | ★ 269, pushed 87 days ago | </span> - Python binding to the Networking and Cryptography (NaCl) library.

GUI
---

*Libraries for working with graphical user interface applications.*

-   [curses](https://docs.python.org/2/library/curses.html#module-curses) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
-   [enaml](https://github.com/nucleic/enaml) <span> | ★ 446, pushed 5 days ago | </span> - Creating beautiful user-interfaces with Declaratic Syntax like QML.
-   [kivy](https://kivy.org/) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
-   [pyglet](https://bitbucket.org/pyglet/pyglet/wiki/Home) - A cross-platform windowing and multimedia library for Python.
-   [PyQt](https://riverbankcomputing.com/software/pyqt/intro) - Python bindings for the [Qt](http://www.qt.io/) cross-platform application and UI framework, with support for both Qt v4 and Qt v5 frameworks.
-   [PySide](https://wiki.qt.io/PySide) - Python bindings for the [Qt](http://www.qt.io/) cross-platform application and UI framework, supporting the Qt v4 framework.
-   [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter is Python's de-facto standard GUI package.
-   [Toga](https://github.com/pybee/toga) <span> | ★ 753, pushed 29 days ago | </span> - A Python native, OS native GUI toolkit.
-   [urwid](http://urwid.org/) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
-   [wxPython](http://wxpython.org/) - A blending of the wxWidgets C++ class library with the Python.
-   [PyGObject](https://wiki.gnome.org/Projects/PyGObject) - Python Bindings for GLib/GObject/GIO/GTK+ (GTK+3)
-   [Flexx](https://github.com/zoofIO/flexx) <span> | ★ 903, pushed 3 days ago | </span> - Flexx is a pure Python toolkit for creating GUI's, that uses web technology for its rendering.

Game Development
----------------

*Awesome game development libraries.*

-   [Cocos2d](http://cocos2d.org/) - cocos2d is a framework for building 2D games, demos, and other graphical/interactive applications. It is based on pyglet.
-   [Panda3D](https://www.panda3d.org/) - 3D game engine developed by Disney and maintained by Carnegie Mellon's Entertainment Technology Center. Written in C++, completely wrapped in Python.
-   [Pygame](http://www.pygame.org/news.html) - Pygame is a set of Python modules designed for writing games.
-   [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python bindings for the Ogre 3D render engine, can be used for games, simulations, anything 3D.
-   [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes bindings for OpenGL and it's related APIs.
-   [PySDL2](http://pysdl2.readthedocs.org/en/latest/) - A ctypes based wrapper for the SDL2 library.
-   [RenPy](https://www.renpy.org/) - A Visual Novel engine.

Logging
-------

*Libraries for generating and working with logs.*

-   [logging](https://docs.python.org/2/library/logging.html) - (Python standard library) Logging facility for Python.
-   [logbook](http://pythonhosted.org/Logbook/) - Logging replacement for Python.
-   [Eliot](https://eliot.readthedocs.org/en/latest/) - Logging for complex & distributed systems.
-   [Raven](http://raven.readthedocs.org/en/latest/) - The Python client for Sentry.
-   [Sentry](https://pypi.python.org/pypi/sentry) - A realtime logging and aggregation server.

Testing
-------

*Libraries for testing codebases and generating test data.*

-   Testing Frameworks
    -   [unittest](https://docs.python.org/2/library/unittest.html) - (Python standard library) Unit testing framework.
    -   [nose](https://nose.readthedocs.org/en/latest/) - nose extends unittest.
    -   [pytest](http://pytest.org/latest/) - A mature full-featured Python testing tool.
    -   [hypothesis](https://github.com/HypothesisWorks/hypothesis-python) <span> | ★ 1167, pushed 3 days ago | </span> - Hypothesis is an advanced Quickcheck style property based testing library.
    -   [mamba](http://nestorsalceda.github.io/mamba/) - The definitive testing tool for Python. Born under the banner of BDD.
    -   [Robot Framework](https://github.com/robotframework/robotframework) <span> | ★ 880, pushed 1 days ago | </span> - A generic test automation framework.
-   Test Runners
    -   [tox](https://tox.readthedocs.org/en/latest/) - Auto builds and tests distributions in multiple Python versions
    -   [green](https://github.com/CleanCut/green) <span> | ★ 338, pushed 5 days ago | </span> - A clean, colorful test runner.
-   GUI / Web Testing
    -   [Selenium](https://pypi.python.org/pypi/selenium) - Python bindings for [Selenium](http://www.seleniumhq.org/) WebDriver.
    -   [locust](https://github.com/locustio/locust) <span> | ★ 3470, pushed 19 days ago | </span> - Scalable user load testing tool written in Python.
    -   [sixpack](https://github.com/seatgeek/sixpack) <span> | ★ 1050, pushed 28 days ago | </span> - A language-agnostic A/B Testing framework.
    -   [splinter](https://splinter.readthedocs.org/en/latest/) - Open source tool for testing web applications.
    -   [PyAutoGUI](https://github.com/asweigart/pyautogui) <span> | ★ 440, pushed 3 days ago | </span> - PyAutoGUI is a cross-platform GUI automation Python module for human beings.
-   Mock
    -   [mock](https://docs.python.org/3/library/unittest.mock.html) - (Python standard library) A mocking and patching library.
    -   [doublex](https://pypi.python.org/pypi/doublex) - Powerful test doubles framework for Python.
    -   [freezegun](https://github.com/spulec/freezegun) <span> | ★ 725, pushed 48 days ago | </span> - Travel through time by mocking the datetime module.
    -   [httmock](https://github.com/patrys/httmock) <span> | ★ 240, pushed 21 days ago | </span> - A mocking library for requests for Python 2.6+ and 3.2+.
    -   [httpretty](http://falcao.it/HTTPretty/) - HTTP request mock tool for Python.
    -   [responses](https://github.com/getsentry/responses) <span> | ★ 1207, pushed 0 days ago | </span> - A utility library for mocking out the requests Python library.
    -   [VCR.py](https://github.com/kevin1024/vcrpy) <span> | ★ 677, pushed 41 days ago | </span> - Record and replay HTTP interactions on your tests.
-   Object Factories
    -   [factory *boy*](https://github.com/rbarrois/factory_boy) <span> | ★ 886, pushed 1 days ago | </span> - A test fixtures replacement for Python.
    -   [mixer](https://github.com/klen/mixer) <span> | ★ 299, pushed 2 days ago | </span> - Another fixtures replacement. Supported Django, Flask, SQLAlchemy, Peewee and etc.
    -   [model](https://github.com/vandersonmota/model_mommy) <span> | ★ 567, pushed 3 days ago | </span>

mommy - Creating random fixtures for testing in Django.

Code Coverage

-   [coverage](https://pypi.python.org/pypi/coverage) - Code coverage measurement.

Fake Data

-   [faker](http://www.joke2k.net/faker/) - A Python package that generates fake data.
-   [fake2db](https://github.com/emirozer/fake2db) <span> | ★ 1639, pushed 123 days ago | </span> - Fake database generator.
-   [radar](https://pypi.python.org/pypi/radar) - Generate random datetime / time.

Error Handler

-   [FuckIt.py](https://github.com/ajalt/fuckitpy) <span> | ★ 2031, pushed 6 days ago | </span> - FuckIt.py uses state-of-the-art technology to make sure your Python code runs whether it has any right to or not.

Code Analysis and Linter
------------------------

*Libraries and tools for analysing, parsing and manipulation codebases.*

-   Code Analysis
    -   [code2flow](https://github.com/scottrogowski/code2flow) <span> | ★ 230, pushed 50 days ago | </span> - Turn your Python and JavaScript code into DOT flowcharts.
    -   [pycallgraph](https://github.com/gak/pycallgraph) <span> | ★ 600, pushed 9 days ago | </span> - A library that visualises the flow (call graph) of your Python application.
    -   [pysonar2](https://github.com/yinwang0/pysonar2) <span> | ★ 2049, pushed 0 days ago | </span> - A type inferencer and indexer for Python.
    -   [coala](http://coala-analyzer.org/) - Language independent and easily extendable code analysis application.
-   Linter
    -   [Flake8](https://pypi.python.org/pypi/flake8) - The modular source code checker: pep8, pyflakes and co.
    -   [Pylint](https://www.pylint.org/) - A Fully customizable source code analyzer.
    -   [pylama](https://pylama.readthedocs.org/en/latest/) - Code audit tool for Python and JavaScript.

Debugging Tools
---------------

*Libraries for debugging code.*

-   Debugger
    -   [ipdb](https://pypi.python.org/pypi/ipdb) - IPython-enabled [pdb](https://docs.python.org/2/library/pdb.html) .
    -   [pudb](https://pypi.python.org/pypi/pudb) – A full-screen, console-based Python debugger.
    -   [pyringe](https://github.com/google/pyringe) <span> | ★ 1353, pushed 712 days ago | </span> - Debugger capable of attaching to and injecting code into Python processes.
    -   [wdb](https://github.com/Kozea/wdb) <span> | ★ 849, pushed 13 days ago | </span> - An improbable web debugger through WebSockets.
    -   [winpdb](http://winpdb.org/) - A Python Debugger with GUI, capable of remote debugging based on `      rpdb2     ` .
    -   [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar) <span> | ★ 3568, pushed 56 days ago | </span> - Display various debug information for Django.
    -   [django-devserver](https://github.com/dcramer/django-devserver) <span> | ★ 1135, pushed 2 days ago | </span> - A drop-in replacement for Django's runserver.
    -   [flask-debugtoolbar](https://github.com/mgood/flask-debugtoolbar) <span> | ★ 453, pushed 232 days ago | </span> - A port of the django-debug-toolbar to flask.
-   Profiler
    -   [line *profiler*](https://github.com/rkern/line_profiler) <span> | ★ 774, pushed 9 days ago | </span> - Line-by-line profiling.
    -   [memory](https://github.com/fabianp/memory_profiler) <span> | ★ 735, pushed 73 days ago | </span>

profiler - Monitor Memory usage of Python code.

[profiling](https://github.com/what-studio/profiling) <span> | ★ 2381, pushed 29 days ago | </span> - An interactive Python profiler.

Others

-   [pyelftools](https://github.com/eliben/pyelftools) <span> | ★ 314, pushed 50 days ago | </span> - Parsing and analyzing ELF files and DWARF debugging information.
-   [python-statsd](https://github.com/WoLpH/python-statsd) <span> | ★ 84, pushed 247 days ago | </span> - Python Client for the [statsd](https://github.com/etsy/statsd/) server.

Science and Data Analysis
-------------------------

*Libraries for scientific computing and data analyzing.*

-   [astropy](http://www.astropy.org/) - A community Python library for Astronomy.
-   [bcbio-nextgen](https://github.com/chapmanb/bcbio-nextgen) <span> | ★ 292, pushed 0 days ago | </span> - A toolkit providing best-practice pipelines for fully automated high throughput sequencing analysis.
-   [bccb](https://github.com/chapmanb/bcbb) <span> | ★ 301, pushed 17 days ago | </span> - Collection of useful code related to biological analysis.
-   [Biopython](http://biopython.org/wiki/Main_Page) - Biopython is a set of freely available tools for biological computation.
-   [blaze](http://blaze.readthedocs.org/en/latest/index.html) - NumPy and Pandas interface to Big Data.
-   [cclib](http://cclib.github.io/) - A library for parsing and interpreting the results of computational chemistry packages.
-   [NetworkX](https://networkx.github.io/) - A high-productivity software for complex networks.
-   [Neupy](http://neupy.com/pages/home.html) - Running and testing different Artificial Neural Networks algorithms.
-   [NIPY](http://nipy.org) - A collection of neuroimaging toolkits.
-   [Numba](http://numba.pydata.org/) - Python JIT (just in time) complier to LLVM aimed at scientific Python by the developers of Cython and NumPy.
-   [NumPy](http://www.numpy.org/) - A fundamental package for scientific computing with Python.
-   [Open Babel](http://openbabel.org/wiki/Main_Page) - A chemical toolbox designed to speak the many languages of chemical data.
-   [Open Mining](https://github.com/mining/mining) <span> | ★ 554, pushed 48 days ago | </span> - Business Intelligence (BI) in Python (Pandas web interface)
-   [orange](http://orange.biolab.si/) - Data mining, data visualization, analysis and machine learning through visual programming or Python scripting.
-   [Pandas](http://pandas.pydata.org/) - A library providing high-performance, easy-to-use data structures and data analysis tools.
-   [PyDy](http://www.pydy.org/) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion based around NumPy, SciPy, IPython, and matplotlib.
-   [PyMC](https://github.com/pymc-devs/pymc3) <span> | ★ 1421, pushed 2 days ago | </span> - Markov Chain Monte Carlo sampling toolkit.
-   [RDKit](http://www.rdkit.org/) - Cheminformatics and Machine Learning Software.
-   [SciPy](http://www.scipy.org/) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
-   [statsmodels](https://github.com/statsmodels/statsmodels) <span> | ★ 1398, pushed 2 days ago | </span> - Statistical modeling and econometrics in Python.
-   [SymPy](https://github.com/sympy/sympy) <span> | ★ 2792, pushed 0 days ago | </span> - A Python library for symbolic mathematics.
-   [zipline](https://github.com/quantopian/zipline) <span> | ★ 3109, pushed 0 days ago | </span> - A Pythonic algorithmic trading library.

Data Visualization
------------------

*Libraries for visualizing data. See: [awesome-javascript](https://github.com/sorrycc/awesome-javascript#data-visualization) .*

-   [matplotlib](http://matplotlib.org/) - A Python 2D plotting library.
-   [bokeh](https://github.com/bokeh/bokeh) <span> | ★ 4103, pushed 0 days ago | </span> - Interactive Web Plotting for Python.
-   [ggplot](https://github.com/yhat/ggplot) <span> | ★ 2479, pushed 13 days ago | </span> - Same API as ggplot2 for R.
-   [plotly](https://plot.ly/python/) - Collaborative web plotting for Python and matplotlib.
-   [pygal](http://www.pygal.org/en/latest/) - A Python SVG Charts Creator.
-   [pygraphviz](https://pypi.python.org/pypi/pygraphviz) - Python interface to [Graphviz](http://www.graphviz.org/) .
-   [PyQtGraph](http://www.pyqtgraph.org/) - Interactive and realtime 2D/3D/Image plotting and science/engineering widgets.
-   [SnakeViz](http://jiffyclub.github.io/snakeviz/) - A browser based graphical viewer for the output of Python's cProfile module.
-   [vincent](https://github.com/wrobstory/vincent) <span> | ★ 1797, pushed 90 days ago | </span> - A Python to Vega translator.
-   [VisPy](http://vispy.org/) - High-performance scientific visualization based on OpenGL.

Computer Vision
---------------

*Libraries for computer vision.*

-   [OpenCV](http://opencv.org/) - Open Source Computer Vision Library.
-   [SimpleCV](http://simplecv.org/) - An open source framework for building computer vision applications.

Machine Learning
----------------

*Libraries for Machine Learning. See: [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python) .*

-   [Crab](https://github.com/muricoca/crab) <span> | ★ 662, pushed 1512 days ago | </span> - A ﬂexible, fast recommender engine.
-   [gensim](https://github.com/piskvorky/gensim) <span> | ★ 2450, pushed 0 days ago | </span> - Topic Modelling for Humans.
-   [hebel](https://github.com/hannes-brt/hebel) <span> | ★ 1137, pushed 252 days ago | </span> - GPU-Accelerated Deep Learning Library in Python.
-   [NuPIC](https://github.com/numenta/nupic) <span> | ★ 4050, pushed 0 days ago | </span> - Numenta Platform for Intelligent Computing.
-   [pattern](https://github.com/clips/pattern) <span> | ★ 4350, pushed 43 days ago | </span> - Web mining module for Python.
-   [PyBrain](https://github.com/pybrain/pybrain) <span> | ★ 1754, pushed 41 days ago | </span> - Another Python Machine Learning Library.
-   [Pylearn2](https://github.com/lisa-lab/pylearn2) <span> | ★ 2049, pushed 18 days ago | </span> - A Machine Learning library based on [Theano](https://github.com/Theano/Theano) .
-   [python-recsys](https://github.com/ocelma/python-recsys) <span> | ★ 560, pushed 127 days ago | </span> - A Python library for implementing a Recommender System.
-   [scikit-learn](http://scikit-learn.org/) - A Python module for machine learning built on top of SciPy.
-   [pydeep](https://github.com/andersbll/deeppy) <span> | ★ 860, pushed 15 days ago | </span> -Deep learning in python
-   [vowpal\_porpoise](https://github.com/josephreisinger/vowpal_porpoise) <span> | ★ 119, pushed 276 days ago | </span> - A lightweight Python wrapper for [Vowpal Wabbit](https://github.com/JohnLangford/vowpal_wabbit/) .
-   [skflow](https://github.com/tensorflow/skflow) <span> | ★ 2276, pushed 3 days ago | </span> - A simplified interface for [TensorFlow](https://github.com/tensorflow/tensorflow) (mimicking scikit-learn).

MapReduce
---------

*Frameworks and libraries for MapReduce.*

-   [dpark](https://github.com/douban/dpark) <span> | ★ 1727, pushed 37 days ago | </span> - Python clone of Spark, a MapReduce alike framework in Python.
-   [dumbo](https://github.com/klbostee/dumbo) <span> | ★ 965, pushed 1 days ago | </span> - Python module that allows one to easily write and run Hadoop programs.
-   [luigi](https://github.com/spotify/luigi) <span> | ★ 4461, pushed 0 days ago | </span> - A module that helps you build complex pipelines of batch jobs.
-   [mrjob](https://github.com/Yelp/mrjob) <span> | ★ 1760, pushed 3 days ago | </span> - Run MapReduce jobs on Hadoop or Amazon Web Services.
-   [PySpark](http://spark.apache.org/docs/latest/programming-guide.html) - The Spark Python API.
-   [streamparse](https://github.com/Parsely/streamparse) <span> | ★ 959, pushed 0 days ago | </span> - Run Python code against real-time streams of data. Integrates with [Apache Storm](http://storm.apache.org/) .

Functional Programming
----------------------

*Functional Programming with Python.*

-   [CyToolz](https://github.com/pytoolz/cytoolz/) - Cython implementation of Toolz: High performance functional utilities.
-   [fn.py](https://github.com/kachayev/fn.py) <span> | ★ 1908, pushed 22 days ago | </span> - Functional programming in Python: implementation of missing features to enjoy FP.
-   [funcy](https://github.com/Suor/funcy) <span> | ★ 1280, pushed 14 days ago | </span> - A fancy and practical functional tools.
-   [Toolz](https://github.com/pytoolz/toolz) <span> | ★ 1085, pushed 4 days ago | </span> - A collection of functional utilities for iterators, functions, and dictionaries.

Third-party APIs
----------------

*Libraries for accessing third party services APIs. See: [List of Python API Wrappers and Libraries](https://github.com/realpython/list-of-python-api-wrappers) .*

-   [apache-libcloud](https://libcloud.apache.org/) - One Python library for all clouds.
-   [boto](https://github.com/boto/boto) <span> | ★ 5434, pushed 3 days ago | </span> - Python interface to Amazon Web Services.
-   [django-wordpress](https://github.com/sunlightlabs/django-wordpress/) - WordPress models and views for Django.
-   [facebook-sdk](https://github.com/mobolic/facebook-sdk) <span> | ★ 1634, pushed 5 days ago | </span> - Facebook Platform Python SDK.
-   [facepy](https://github.com/jgorset/facepy) <span> | ★ 454, pushed 31 days ago | </span> - Facepy makes it really easy to interact with Facebook's Graph API
-   [gmail](https://github.com/charlierguo/gmail) <span> | ★ 1250, pushed 107 days ago | </span> - A Pythonic interface for Gmail.
-   [google-api-python-client](https://github.com/google/google-api-python-client) <span> | ★ 892, pushed 0 days ago | </span> - Google APIs Client Library for Python.
-   [gspread](https://github.com/burnash/gspread) <span> | ★ 1628, pushed 1 days ago | </span> - Google Spreadsheets Python API.
-   [twython](https://github.com/ryanmcgrath/twython) <span> | ★ 1153, pushed 23 days ago | </span> - A Python wrapper for the Twitter API.

DevOps Tools
------------

*Software and libraries for DevOps.*

-   [Ansible](https://github.com/ansible/ansible) <span> | ★ 16407, pushed 0 days ago | </span> - A radically simple IT automation platform.
-   [SaltStack](https://github.com/saltstack/salt) <span> | ★ 6445, pushed 0 days ago | </span> - Infrastructure automation and management system.
-   [OpenStack](http://www.openstack.org/) - Open source software for building private and public clouds.
-   [Docker Compose](https://docs.docker.com/compose/) - Fast, isolated development environments using [Docker](https://www.docker.com/) .
-   [Cloud-Init](http://cloudinit.readthedocs.org/en/latest/) - A multi-distribution package that handles early initialization of a cloud instance.
-   [cuisine](https://github.com/sebastien/cuisine) <span> | ★ 1167, pushed 150 days ago | </span> - Chef-like functionality for Fabric.
-   [Fabric](http://www.fabfile.org/) - A simple, Pythonic tool for remote execution and deployment.
-   [Fabtools](https://github.com/ronnix/fabtools) <span> | ★ 991, pushed 50 days ago | </span> - Tools for writing awesome Fabric files.
-   [honcho](https://github.com/nickstenning/honcho) <span> | ★ 747, pushed 8 days ago | </span> - A Python clone of [Foreman](https://github.com/ddollar/foreman) , for managing Procfile-based applications.
-   [pexpect](https://github.com/pexpect/pexpect) <span> | ★ 560, pushed 15 days ago | </span> - Controlling interactive programs in a pseudo-terminal like GNU expect.
-   [psutil](https://github.com/giampaolo/psutil) <span> | ★ 1523, pushed 10 days ago | </span> - A cross-platform process and system utilities module.
-   [supervisor](https://github.com/Supervisor/supervisor) <span> | ★ 2434, pushed 10 days ago | </span> - Supervisor process control system for UNIX.

Job Scheduler
-------------

*Libraries for scheduling jobs.*

-   [APScheduler](http://apscheduler.readthedocs.org/en/latest/) - A light but powerful in-process task scheduler that lets you schedule functions.
-   [django-schedule](https://github.com/thauber/django-schedule) <span> | ★ 621, pushed 5 days ago | </span> - A calendaring app for Django.
-   [doit](http://pydoit.org/) - A task runner and build tool.
-   [gunnery](https://github.com/gunnery/gunnery) - Multipurpose task execution tool for distributed systems with web-based interface.
-   [Joblib](http://pythonhosted.org/joblib/index.html) - A set of tools to provide lightweight pipelining in Python.
-   [Plan](https://github.com/fengsp/plan) <span> | ★ 873, pushed 35 days ago | </span> - Writing crontab file in Python like a charm.
-   [schedule](https://github.com/dbader/schedule) <span> | ★ 2110, pushed 46 days ago | </span> - Python job scheduling for humans.
-   [Spiff](https://github.com/knipknap/SpiffWorkflow) <span> | ★ 317, pushed 115 days ago | </span> - A powerful workflow engine implemented in pure Python.
-   [TaskFlow](http://docs.openstack.org/developer/taskflow/) - A Python library that helps to make task execution easy, consistent and reliable.

Foreign Function Interface
--------------------------

*Libraries for providing foreign function interface.*

-   [cffi](https://pypi.python.org/pypi/cffi) - Foreign Function Interface for Python calling C code.
-   [ctypes](https://docs.python.org/2/library/ctypes.html) - (Python standard library) Foreign Function Interface for Python calling C code.
-   [PyCUDA](https://mathema.tician.de/software/pycuda/) - A Python wrapper for Nvidia's CUDA API.
-   [SWIG](http://www.swig.org/Doc1.3/Python.html) - Simplified Wrapper and Interface Generator.

High Performance
----------------

*Libraries for making Python faster.*

-   [Cython](http://cython.org/) - Optimizing Static Compiler for Python. Uses type mixins to compile Python into C or C++ modules resulting in large performance gains.
-   [PeachPy](https://github.com/Maratyszcza/PeachPy) <span> | ★ 729, pushed 9 days ago | </span> - x86-64 assembler embedded in Python. Can be used as inline assembler for Python or as a stand-alone assembler for Windows, Linux, OS X, Native Client and Go.
-   [PyPy](http://pypy.org/) - An implementation of Python in Python. The interpreter uses black magic to make Python very fast without having to add in additional type information.
-   [Pyston](https://github.com/dropbox/pyston) <span> | ★ 3623, pushed 0 days ago | </span> - A Python implementation built using LLVM and modern JIT techniques with the goal of achieving good performance.
-   [Stackless Python](https://bitbucket.org/stackless-dev/stackless/overview) - An enhanced version of the Python.

Microsoft Windows
-----------------

*Python programming on Microsoft Windows.*

-   [Python(x,y)](http://python-xy.github.io/) - Scientific-applications-oriented Python Distribution based on Qt and Spyder.
-   [pythonlibs](http://www.lfd.uci.edu/~gohlke/pythonlibs/) - Unofficial Windows binaries for Python extension packages.
-   [PythonNet](https://github.com/pythonnet/pythonnet) <span> | ★ 146, pushed 1 days ago | </span> - Python Integration with the .NET Common Language Runtime (CLR).
-   [PyWin32](https://sourceforge.net/projects/pywin32/) - Python Extensions for Windows.
-   [WinPython](https://winpython.github.io/) - Portable development environment for Windows 7/8.

Network Virtualization and SDN
------------------------------

*Tools and libraries for Virtual Networking and SDN (Software Defined Networking).*

-   [Mininet](http://mininet.org/) - A popular network emulator and API written in Python.
-   [POX](https://github.com/noxrepo/pox) <span> | ★ 298, pushed 17 days ago | </span> - An open source development platform for Python-based Software Defined Networking (SDN) control applications, such as OpenFlow SDN controllers.
-   [Pyretic](http://frenetic-lang.org/pyretic/) - A member of the Frenetic family of SDN programming languages that provides powerful abstractions over network switches or emulators.
-   [SDX Platform](https://github.com/sdn-ixp/internet2award) <span> | ★ 8, pushed 876 days ago | </span> - SDN based IXP implementation that leverages Mininet, POX and Pyretic.

Hardware
--------

*Libraries for programming with hardware.*

-   [ino](http://inotool.org/) - Command line toolkit for working with [Arduino](https://www.arduino.cc/) .
-   [Pyro](http://pyrorobotics.com/) - Python Robotics.
-   [PyUserInput](https://github.com/SavinaRoja/PyUserInput) <span> | ★ 423, pushed 0 days ago | </span> - A module for cross-platform control of the mouse and keyboard.
-   [scapy](https://github.com/secdev/scapy) <span> | ★ 352, pushed 0 days ago | </span> - A brilliant packet manipulation library.
-   [wifi](https://wifi.readthedocs.org/en/latest/) - A Python library and command line tool for working with WiFi on Linux.
-   [Pingo](http://www.pingo.io/) - Pingo provides a uniform API to program devices like the Raspberry Pi, pcDuino, Intel Galileo, etc.

Compatibility
-------------

*Libraries for migrating from Python 2 to 3.*

-   [Python-Future](http://python-future.org/index.html) - The missing compatibility layer between Python 2 and Python 3.
-   [Python-Modernize](https://github.com/mitsuhiko/python-modernize) <span> | ★ 401, pushed 186 days ago | </span> - Modernizes Python code for eventual Python 3 migration.
-   [Six](https://pypi.python.org/pypi/six) - Python 2 and 3 compatibility utilities.

Miscellaneous
-------------

*Useful libraries or tools that don't fit in the categories above.*

-   [blinker](https://github.com/jek/blinker) <span> | ★ 322, pushed 6 days ago | </span> - A fast Python in-process signal/event dispatching system.
-   [itsdangerous](https://github.com/pallets/itsdangerous) <span> | ★ 863, pushed 8 days ago | </span> - Various helpers to pass trusted data to untrusted environments.
-   [pluginbase](https://github.com/mitsuhiko/pluginbase) <span> | ★ 371, pushed 0 days ago | </span> - A simple but flexible plugin system for Python.
-   [Pychievements](https://github.com/PacketPerception/pychievements) <span> | ★ 72, pushed 306 days ago | </span> - A framework for creating and tracking achievements.
-   [Tryton](http://www.tryton.org/) - A general purpose business framework.

Algorithms and Design Patterns
------------------------------

*Python implementation of algorithms and design patterns.*

-   [algorithms](https://github.com/nryoung/algorithms) <span> | ★ 1408, pushed 1 days ago | </span> - A module of algorithms for Python.
-   [python-patterns](https://github.com/faif/python-patterns) <span> | ★ 8282, pushed 1 days ago | </span> - A collection of design patterns in Python.
-   [sortedcontainers](http://www.grantjenks.com/docs/sortedcontainers/) - Fast, pure-Python implementation of SortedList, SortedDict, and SortedSet types.

Editor Plugins
--------------

*Plugins for editors and IDEs.*

-   Emacs
    -   [Elpy](https://github.com/jorgenschaefer/elpy) <span> | ★ 689, pushed 9 days ago | </span> - Emacs Python Development Environment.
-   Sublime Text
    -   [SublimeJEDI](https://github.com/srusskih/SublimeJEDI) <span> | ★ 619, pushed 120 days ago | </span> - A Sublime Text plugin to the awesome auto-complete library Jedi.
    -   [Anaconda](https://github.com/DamnWidget/anaconda) <span> | ★ 1033, pushed 0 days ago | </span> - Anaconda turns your Sublime Text 3 in a full featured Python development IDE.
-   Vim
    -   [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) <span> | ★ 10555, pushed 1 days ago | </span> - Includes [Jedi](https://github.com/davidhalter/jedi) -based completion engine for Python.
    -   [Jedi-vim](https://github.com/davidhalter/jedi-vim) <span> | ★ 2293, pushed 13 days ago | </span> - Vim bindings for the Jedi auto-completion library for Python.
    -   [Python-mode](https://github.com/klen/python-mode) <span> | ★ 2950, pushed 60 days ago | </span> - An all in one plugin for turning Vim into a Python IDE.
-   Visual Studio
    -   [PTVS](https://github.com/Microsoft/PTVS) <span> | ★ 1010, pushed 0 days ago | </span> - Python Tools for Visual Studio.

IDEs
----

*Popular Python IDEs.*

-   [PyCharm](https://www.jetbrains.com/pycharm/) - Commercial Python IDE by JetBrains. Has free community edition available.
-   [LiClipse](http://www.liclipse.com/) - Free polyglot IDE based on Eclipse. Uses PyDev for Python support.
-   [Spyder](https://github.com/spyder-ide/spyder) <span> | ★ 1010, pushed 0 days ago | </span> - Open Source Python IDE.

Services
========

Online tools and APIs to simplify development.

Continuous Integration
----------------------

*See: [awesome-CIandCD](https://github.com/ciandcd/awesome-ciandcd#online-build-system) .*

-   [Travis CI](https://travis-ci.org) - A popular CI service for your open source and [private](https://travis-ci.com) projects. (GitHub only)
-   [CircleCI](https://circleci.com/) - A CI service that can run very fast parallel testing. (GitHub only)
-   [Vexor CI](https://vexor.io) - A continuous integration tool for private apps with pay-per-minute billing model.
-   [Wercker](http://wercker.com/) - A Docker-based platform for building and deploying applications and microservices.

Code Quality
------------

-   [Codacy](https://www.codacy.com/) - Automated Code Review to ship better code, faster. Free for Open Source.
-   [QuantifiedCode](https://www.quantifiedcode.com/) - A data-driven, automated, continuous code review tool.

Resources
=========

Where to discover new Python libraries.

Websites
--------

-   [r/Python](https://www.reddit.com/r/python)
-   [CoolGithubProjects](https://www.coolgithubprojects.com/)
-   [Django Packages](https://www.djangopackages.com/)
-   [Full Stack Python](https://www.fullstackpython.com/)
-   [Python 3 Wall of Superpowers](http://python3wos.appspot.com/)
-   [Python Hackers](http://pythonhackers.com/open-source/)
-   [Python ZEEF](https://python.zeef.com/alan.richmond)
-   [Trending Python repositories on GitHub today](https://github.com/trending?l=python)
-   [PyPI Ranking](http://pypi-ranking.info/alltime)

Weekly
------

-   [Import Python Newsletter](http://importpython.com/newsletter/)
-   [Pycoder's Weekly](http://pycoders.com/)
-   [Python Weekly](http://www.pythonweekly.com/)

Twitter
-------

-   [@codetengu](https://twitter.com/codetengu)
-   [@getpy](https://twitter.com/getpy)
-   [@importpython](https://twitter.com/importpython)
-   [@planetpython](https://twitter.com/planetpython)
-   [@pycoders](https://twitter.com/pycoders)
-   [@pypi](https://twitter.com/pypi)
-   [@pythontrending](https://twitter.com/pythontrending)
-   [@PythonWeekly](https://twitter.com/PythonWeekly)

Other Awesome Lists
===================

List of lists.

-   Python
    -   [pycrumbs](https://github.com/kirang89/pycrumbs/blob/master/pycrumbs.md)
    -   [python-github-projects](https://github.com/checkcheckzz/python-github-projects) <span> | ★ 201, pushed 50 days ago | </span>
    -   [python\_reference](https://github.com/rasbt/python_reference) <span> | ★ 1502, pushed 11 days ago | </span>
    -   [pythonidae](https://github.com/svaksha/pythonidae) <span> | ★ 366, pushed 0 days ago | </span>
-   Monty
    -   [awesome](https://github.com/sindresorhus/awesome) <span> | ★ 34100, pushed 0 days ago | </span>
    -   [lists](https://github.com/jnv/lists) <span> | ★ 3754, pushed 0 days ago | </span>

Contributing
============

Your contributions are always welcome! Please take a look at the [contribution guidelines](https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md) first.

I would keep some pull requests open if I'm not sure whether the libraries are awesome, you could [vote for them](https://github.com/vinta/awesome-python/pulls) by adding :+1: to them.
