# Awesome Python

An opinionated list of Python frameworks, libraries, tools, and resources.

# **Sponsors**

> The **#10 most-starred repo on GitHub**. Put your product in front of Python developers. [Become a sponsor](SPONSORSHIP.md).

# Categories

**AI & ML**

- [AI and Agents](#ai-and-agents)
- [Deep Learning](#deep-learning)
- [Machine Learning](#machine-learning)
- [Natural Language Processing](#natural-language-processing)
- [Computer Vision](#computer-vision)
- [Recommender Systems](#recommender-systems)

**Web Development**

- [Web Frameworks](#web-frameworks)
- [Web APIs](#web-apis)
- [Web Servers](#web-servers)
- [WebSocket](#websocket)
- [Template Engines](#template-engines)
- [Web Asset Management](#web-asset-management)
- [Authentication](#authentication)
- [Admin Panels](#admin-panels)
- [CMS](#cms)
- [Static Site Generators](#static-site-generators)

**HTTP & Scraping**

- [HTTP Clients](#http-clients)
- [Web Scraping](#web-scraping)
- [Email](#email)

**Database & Storage**

- [ORM](#orm)
- [Database Drivers](#database-drivers)
- [Database](#database)
- [Caching](#caching)
- [Search](#search)
- [Serialization](#serialization)

**Data & Science**

- [Data Analysis](#data-analysis)
- [Data Validation](#data-validation)
- [Data Visualization](#data-visualization)
- [Geolocation](#geolocation)
- [Science](#science)
- [Quantum Computing](#quantum-computing)

**Developer Tools**

- [Algorithms and Design Patterns](#algorithms-and-design-patterns)
- [Interactive Interpreter](#interactive-interpreter)
- [Code Analysis](#code-analysis)
- [Testing](#testing)
- [Debugging Tools](#debugging-tools)
- [Build Tools](#build-tools)
- [Documentation](#documentation)

**DevOps**

- [DevOps Tools](#devops-tools)
- [Distributed Computing](#distributed-computing)
- [Task Queues](#task-queues)
- [Job Schedulers](#job-schedulers)
- [Logging](#logging)
- [Network Virtualization](#network-virtualization)

**CLI & GUI**

- [CLI Development](#cli-development)
- [CLI Tools](#cli-tools)
- [GUI Development](#gui-development)

**Text & Documents**

- [Text Processing](#text-processing)
- [HTML Manipulation](#html-manipulation)
- [File Format Processing](#file-format-processing)
- [File Manipulation](#file-manipulation)

**Media**

- [Image Processing](#image-processing)
- [Audio & Video Processing](#audio--video-processing)
- [Game Development](#game-development)

**Python Language**

- [Implementations](#implementations)
- [Built-in Classes Enhancement](#built-in-classes-enhancement)
- [Functional Programming](#functional-programming)
- [Asynchronous Programming](#asynchronous-programming)
- [Date and Time](#date-and-time)

**Python Toolchain**

- [Environment Management](#environment-management)
- [Package Management](#package-management)
- [Package Repositories](#package-repositories)
- [Distribution](#distribution)
- [Configuration Files](#configuration-files)

**Security**

- [Cryptography](#cryptography)
- [Penetration Testing](#penetration-testing)

**Miscellaneous**

- [Hardware](#hardware)
- [Microsoft Windows](#microsoft-windows)
- [Miscellaneous](#miscellaneous)

---

**AI & ML**

## AI and Agents

_Libraries for building AI applications, LLM integrations, and autonomous agents._

- Agent Skills
  - [django-ai-plugins](https://github.com/vintasoftware/django-ai-plugins) - Django backend agent skills for Django, DRF, Celery, and Django-specific code review.
  - [sentry-skills](https://github.com/getsentry/skills) - Python-focused engineering skills for code review, debugging, and backend workflows.
  - [trailofbits-skills](https://github.com/trailofbits/skills) - Python-friendly security skills for auditing, testing, and safer backend development.
- Orchestration
  - [autogen](https://github.com/microsoft/autogen) - A programming framework for building agentic AI applications.
  - [crewai](https://github.com/crewAIInc/crewAI) - A framework for orchestrating role-playing autonomous AI agents for collaborative task solving.
  - [dspy](https://github.com/stanfordnlp/dspy) - A framework for programming, not prompting, language models.
  - [hermes-agent](https://github.com/nousresearch/hermes-agent) - An adaptive AI agent framework that grows with you.
  - [langchain](https://github.com/langchain-ai/langchain) - Building applications with LLMs through composability.
  - [pydantic-ai](https://github.com/pydantic/pydantic-ai) - A Python agent framework for building generative AI applications with structured schemas.
  - [TradingAgents](https://github.com/TauricResearch/TradingAgents) - A multi-agents LLM financial trading framework.
- Data Layer
  - [instructor](https://github.com/567-labs/instructor) - A library for extracting structured data from LLMs, powered by Pydantic.
  - [llama-index](https://github.com/run-llama/llama_index) - A data framework for your LLM application.
  - [mem0](https://github.com/mem0ai/mem0) - An intelligent memory layer for AI agents enabling personalized interactions.
- Pre-trained Models and Inference
  - [diffusers](https://github.com/huggingface/diffusers) - A library that provides pre-trained diffusion models for generating and editing images, audio, and video.
  - [sglang](https://github.com/sgl-project/sglang) - A high-performance serving framework for large language models and multimodal models.
  - [transformers](https://github.com/huggingface/transformers) - A framework that lets you easily use pre-trained transformer models for NLP, vision, and audio tasks.
  - [unsloth](https://github.com/unslothai/unsloth) - A library for faster LLM fine-tuning and training with reduced memory usage.
  - [vllm](https://github.com/vllm-project/vllm) - A high-throughput and memory-efficient inference and serving engine for LLMs.

## Deep Learning

_Frameworks for Neural Networks and Deep Learning. Also see [awesome-deep-learning](https://github.com/ChristosChristofidis/awesome-deep-learning)._

- [jax](https://github.com/jax-ml/jax) - A library for high-performance numerical computing with automatic differentiation and JIT compilation.
- [keras](https://github.com/keras-team/keras) - A high-level deep learning library with support for JAX, TensorFlow, and PyTorch backends.
- [pytorch-lightning](https://github.com/Lightning-AI/pytorch-lightning) - Deep learning framework to train, deploy, and ship AI products Lightning fast.
- [pytorch](https://github.com/pytorch/pytorch) - Tensors and Dynamic neural networks in Python with strong GPU acceleration.
- [stable-baselines3](https://github.com/DLR-RM/stable-baselines3) - PyTorch implementations of Stable Baselines (deep) reinforcement learning algorithms.
- [tensorflow](https://github.com/tensorflow/tensorflow) - The most popular Deep Learning framework created by Google.

## Machine Learning

_Libraries for Machine Learning. Also see [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python)._

- [catboost](https://github.com/catboost/catboost) - A fast, scalable, high performance gradient boosting on decision trees library.
- [feature_engine](https://github.com/feature-engine/feature_engine) - sklearn compatible API with the widest toolset for feature engineering and selection.
- [h2o](https://github.com/h2oai/h2o-3) - Open Source Fast Scalable Machine Learning Platform.
- [lightgbm](https://github.com/lightgbm-org/LightGBM) - A fast, distributed, high performance gradient boosting framework.
- [mindsdb](https://github.com/mindsdb/mindsdb) - MindsDB is an open source AI layer for existing databases that allows you to effortlessly develop, train and deploy state-of-the-art machine learning models using standard queries.
- [pgmpy](https://github.com/pgmpy/pgmpy) - A Python library for probabilistic graphical models and Bayesian networks.
- [scikit-learn](https://github.com/scikit-learn/scikit-learn) - The most popular Python library for Machine Learning with extensive documentation and community support.
- [spark.ml](https://github.com/apache/spark) - [Apache Spark](https://spark.apache.org/)'s scalable [Machine Learning library](https://spark.apache.org/docs/latest/ml-guide.html) for distributed computing.
- [TabGAN](https://github.com/Diyago/Tabular-data-generation) - Synthetic tabular data generation using GANs, Diffusion Models, and LLMs.
- [xgboost](https://github.com/dmlc/xgboost) - A scalable, portable, and distributed gradient boosting library.

## Natural Language Processing

_Libraries for working with human languages._

- General
  - [gensim](https://github.com/piskvorky/gensim) - Topic Modeling for Humans.
  - [nltk](https://github.com/nltk/nltk) - A leading platform for building Python programs to work with human language data.
  - [spacy](https://github.com/explosion/spaCy) - A library for industrial-strength natural language processing in Python and Cython.
  - [stanza](https://github.com/stanfordnlp/stanza) - The Stanford NLP Group's official Python library, supporting 60+ languages.
- Chinese
  - [funnlp](https://github.com/fighting41love/funNLP) - A collection of tools and datasets for Chinese NLP.

## Computer Vision

_Libraries for Computer Vision._

- [easyocr](https://github.com/JaidedAI/EasyOCR) - Ready-to-use OCR with 40+ languages supported.
- [kornia](https://github.com/kornia/kornia/) - Open Source Differentiable Computer Vision Library for PyTorch.
- [opencv](https://github.com/opencv/opencv-python) - Open Source Computer Vision Library.
- [pytesseract](https://github.com/madmaze/pytesseract) - A wrapper for [Google Tesseract OCR](https://github.com/tesseract-ocr).

## Recommender Systems

_Libraries for building recommender systems._

- [annoy](https://github.com/spotify/annoy) - Approximate Nearest Neighbors in C++/Python optimized for memory usage.
- [implicit](https://github.com/benfred/implicit) - A fast Python implementation of collaborative filtering for implicit datasets.
- [scikit-surprise](https://github.com/NicolasHug/Surprise) - A scikit for building and analyzing recommender systems.

**Web Development**

## Web Frameworks

_Traditional full stack web frameworks. Also see [Web APIs](#web-apis)._

- Synchronous
  - [bottle](https://github.com/bottlepy/bottle) - A fast and simple micro-framework distributed as a single file with no dependencies.
  - [django](https://github.com/django/django) - The most popular web framework in Python.
    - [awesome-django](https://github.com/shahraizali/awesome-django)
  - [flask](https://github.com/pallets/flask) - A microframework for Python.
    - [awesome-flask](https://github.com/humiaozuzu/awesome-flask)
  - [pyramid](https://github.com/Pylons/pyramid) - A small, fast, down-to-earth, open source Python web framework.
    - [awesome-pyramid](https://github.com/uralbash/awesome-pyramid)
  - [fasthtml](https://github.com/AnswerDotAI/fasthtml) - The fastest way to create an HTML app.
    - [awesome-fasthtml](https://github.com/amosgyamfi/awesome-fasthtml)
  - [masonite](https://github.com/MasoniteFramework/masonite) - The modern and developer centric Python web framework.
- Asynchronous
  - [litestar](https://github.com/litestar-org/litestar) - Production-ready, capable and extensible ASGI Web framework.
  - [microdot](https://github.com/miguelgrinberg/microdot) - The impossibly small web framework for Python and MicroPython.
  - [reflex](https://github.com/reflex-dev/reflex) - A framework for building reactive, full-stack web applications entirely with Python.
  - [robyn](https://github.com/sparckles/Robyn) - A high-performance async Python web framework with a Rust runtime.
  - [starlette](https://github.com/Kludex/starlette) - A lightweight ASGI framework and toolkit for building high-performance async services.
  - [tornado](https://github.com/tornadoweb/tornado) - A web framework and asynchronous networking library.

## Web APIs

_Libraries for building RESTful and GraphQL APIs._

- Django
  - [django-ninja](https://github.com/vitalik/django-ninja) - Fast, Django REST framework based on type hints and Pydantic.
  - [django-rest-framework](https://github.com/encode/django-rest-framework) - A powerful and flexible toolkit to build web APIs.
  - [strawberry-django](https://github.com/strawberry-graphql/strawberry-django) - Strawberry GraphQL integration with Django.
- Flask
  - [apiflask](https://github.com/apiflask/apiflask) - A lightweight Python web API framework based on Flask and Marshmallow.
- Framework Agnostic
  - [connexion](https://github.com/spec-first/connexion) - A spec-first framework that automatically handles requests based on your OpenAPI specification.
  - [falcon](https://github.com/falconry/falcon) - A high-performance framework for building cloud APIs and web app backends.
  - [fastapi](https://github.com/fastapi/fastapi) - A modern, fast, web framework for building APIs with standard Python type hints.
  - [sanic](https://github.com/sanic-org/sanic) - A Python 3.6+ web server and web framework that's written to go fast.
  - [strawberry](https://github.com/strawberry-graphql/strawberry) - A GraphQL library that leverages Python type annotations for schema definition.
  - [webargs](https://github.com/marshmallow-code/webargs) - A friendly library for parsing HTTP request arguments with built-in support for popular web frameworks.

## Web Servers

_ASGI and WSGI compatible web servers._

- ASGI
  - [daphne](https://github.com/django/daphne) - An HTTP, HTTP/2 and WebSocket protocol server for ASGI and ASGI-HTTP.
  - [granian](https://github.com/emmett-framework/granian) - A Rust HTTP server for Python applications built on top of Hyper and Tokio, supporting WSGI/ASGI/RSGI.
  - [hypercorn](https://github.com/pgjones/hypercorn) - An ASGI and WSGI Server based on Hyper libraries and inspired by Gunicorn.
  - [uvicorn](https://github.com/Kludex/uvicorn) - A lightning-fast ASGI server implementation, using uvloop and httptools.
- WSGI
  - [gunicorn](https://github.com/benoitc/gunicorn) - Pre-forked, ported from Ruby's Unicorn project.
  - [uwsgi](https://github.com/unbit/uwsgi) - A project aims at developing a full stack for building hosting services, written in C.
  - [waitress](https://github.com/Pylons/waitress) - Multi-threaded, powers Pyramid.
- RPC
  - [grpcio](https://github.com/grpc/grpc) - HTTP/2-based RPC framework with Python bindings, built by Google.
  - [rpyc](https://github.com/tomerfiliba-org/rpyc) (Remote Python Call) - A transparent and symmetric RPC library for Python.

## WebSocket

_Libraries for working with WebSocket._

- [autobahn-python](https://github.com/crossbario/autobahn-python) - WebSocket & WAMP for Python on Twisted and [asyncio](https://docs.python.org/3/library/asyncio.html).
- [channels](https://github.com/django/channels) - Developer-friendly asynchrony for Django.
- [flask-socketio](https://github.com/miguelgrinberg/Flask-SocketIO) - Socket.IO integration for Flask applications.
- [picows](https://github.com/tarasko/picows) - Fastest WebSocket clients and servers with a frame level interface for the most demanding use-cases.
- [websockets](https://github.com/python-websockets/websockets) - A library for building WebSocket servers and clients with a focus on correctness and simplicity.

## Template Engines

_Libraries and tools for templating and lexing._

- [jinja](https://github.com/pallets/jinja) - A modern and designer friendly templating language.
- [mako](https://github.com/sqlalchemy/mako) - Hyperfast and lightweight templating for the Python platform.

## Web Asset Management

_Tools for managing, compressing and minifying website assets._

- [django-compressor](https://github.com/django-compressor/django-compressor) - Compresses linked and inline JavaScript or CSS into a single cached file.
- [django-storages](https://github.com/jschneier/django-storages) - A collection of custom storage back ends for Django.

## Authentication

_Libraries for implementing authentication schemes._

- OAuth
  - [authlib](https://github.com/authlib/authlib) - JavaScript Object Signing and Encryption draft implementation.
  - [django-allauth](https://github.com/pennersr/django-allauth) - Authentication app for Django that "just works."
  - [django-oauth-toolkit](https://github.com/django-oauth/django-oauth-toolkit) - OAuth 2 goodies for Django.
  - [oauthlib](https://github.com/oauthlib/oauthlib) - A generic and thorough implementation of the OAuth request-signing logic.
- JWT
  - [pyjwt](https://github.com/jpadilla/pyjwt) - JSON Web Token implementation in Python.
- Permissions
  - [django-guardian](https://github.com/django-guardian/django-guardian) - Implementation of per object permissions for Django 1.2+
  - [django-rules](https://github.com/dfunckt/django-rules) - A tiny but powerful app providing object-level permissions to Django, without requiring a database.

## Admin Panels

_Libraries for administrative interfaces._

- [ajenti](https://github.com/ajenti/ajenti) - The admin panel your servers deserve.
- [django-grappelli](https://github.com/sehmaschine/django-grappelli) - A jazzy skin for the Django Admin-Interface.
- [django-unfold](https://github.com/unfoldadmin/django-unfold) - Elevate your Django admin with a stunning modern interface, powerful features, and seamless user experience.
- [flask-admin](https://github.com/pallets-eco/flask-admin) - Simple and extensible administrative interface framework for Flask.
- [flower](https://github.com/mher/flower) - Real-time monitor and web admin for Celery.
- [func-to-web](https://github.com/offerrall/FuncToWeb) - Instantly create web UIs from Python functions using type hints. Zero frontend code required.
- [jet-bridge](https://github.com/jet-admin/jet-bridge) - Admin panel framework for any application with nice UI (ex Jet Django).

## CMS

_Content Management Systems._

- [django-cms](https://github.com/django-cms/django-cms) - The easy-to-use and developer-friendly enterprise CMS powered by Django.
- [indico](https://github.com/indico/indico) - A feature-rich event management system, made @ [CERN](https://en.wikipedia.org/wiki/CERN).
- [wagtail](https://github.com/wagtail/wagtail) - A Django content management system.

## Static Site Generators

_Static site generator is a software that takes some text + templates as input and produces HTML files on the output._

- [lektor](https://github.com/lektor/lektor) - An easy to use static CMS and blog engine.
- [nikola](https://github.com/getnikola/nikola) - A static website and blog generator.
- [pelican](https://github.com/getpelican/pelican) - Static site generator that supports Markdown and reST syntax.

**HTTP & Scraping**

## HTTP Clients

_Libraries for working with HTTP._

- [aiohttp](https://github.com/aio-libs/aiohttp) - Asynchronous HTTP client/server framework for asyncio and Python.
- [furl](https://github.com/gruns/furl) - A small Python library that makes parsing and manipulating URLs easy.
- [httptap](https://github.com/ozeranskii/httptap) - Dissects an HTTP request into DNS, TCP, TLS, wait, and transfer phases and renders the timings as a waterfall.
- [httpx](https://github.com/encode/httpx) - A next generation HTTP client for Python.
- [requests](https://github.com/psf/requests) - HTTP Requests for Humans.
- [urllib3](https://github.com/urllib3/urllib3) - A HTTP library with thread-safe connection pooling, file post support, sanity friendly.

## Web Scraping

_Libraries to automate web scraping and extract web content._

- Frameworks
  - [browser-use](https://github.com/browser-use/browser-use) - Make websites accessible for AI agents with easy browser automation.
  - [crawl4ai](https://github.com/unclecode/crawl4ai) - An open-source, LLM-friendly web crawler that provides lightning-fast, structured data extraction specifically designed for AI agents.
  - [mechanicalsoup](https://github.com/MechanicalSoup/MechanicalSoup) - A Python library for automating interaction with websites.
  - [scrapy](https://github.com/scrapy/scrapy) - A fast high-level screen scraping and web crawling framework.
- Content Extraction
  - [feedparser](https://github.com/kurtmckee/feedparser) - Universal feed parser.
  - [html2text](https://github.com/Alir3z4/html2text) - Convert HTML to Markdown-formatted text.
  - [micawber](https://github.com/coleifer/micawber) - A small library for extracting rich content from URLs.
  - [sumy](https://github.com/miso-belica/sumy) - A module for automatic summarization of text documents and HTML pages.
  - [trafilatura](https://github.com/adbar/trafilatura) - A tool for gathering text and metadata from the web, with built-in content filtering.

## Email

_Libraries for sending and parsing email, and mail server management._

- [modoboa](https://github.com/modoboa/modoboa) - A mail hosting and management platform including a modern Web UI.
- [yagmail](https://github.com/kootenpv/yagmail) - Yet another Gmail/SMTP client.

**Database & Storage**

## ORM

_Libraries that implement Object-Relational Mapping or data mapping techniques._

- Relational Databases
  - [django.db.models](https://github.com/django/django) - The Django [ORM](https://docs.djangoproject.com/en/dev/topics/db/models/).
  - [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) - The Python SQL Toolkit and Object Relational Mapper.
    - [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy)
  - [dataset](https://github.com/pudo/dataset) - Store Python dicts in a database - works with SQLite, MySQL, and PostgreSQL.
  - [peewee](https://github.com/coleifer/peewee) - A small, expressive ORM.
  - [pony](https://github.com/ponyorm/pony/) - ORM that provides a generator-oriented interface to SQL.
  - [sqlmodel](https://github.com/fastapi/sqlmodel) - SQLModel is based on Python type annotations, and powered by Pydantic and SQLAlchemy.
  - [tortoise-orm](https://github.com/tortoise/tortoise-orm) - An easy-to-use asyncio ORM inspired by Django, with relations support.
- NoSQL Databases
  - [beanie](https://github.com/BeanieODM/beanie) - An asynchronous Python object-document mapper (ODM) for MongoDB.
  - [mongoengine](https://github.com/MongoEngine/mongoengine) - A Python Object-Document-Mapper for working with MongoDB.
  - [pynamodb](https://github.com/pynamodb/PynamoDB) - A Pythonic interface for [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).

## Database Drivers

_Libraries for connecting and operating databases._

- MySQL - [awesome-mysql](https://github.com/shlomi-noach/awesome-mysql)
  - [mysqlclient](https://github.com/PyMySQL/mysqlclient) - MySQL connector with Python 3 support ([mysql-python](https://sourceforge.net/projects/mysql-python/) fork).
  - [pymysql](https://github.com/PyMySQL/PyMySQL) - A pure Python MySQL driver compatible to mysql-python.
- PostgreSQL - [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres)
  - [psycopg](https://github.com/psycopg/psycopg) - The most popular PostgreSQL adapter for Python.
- SQLite - [awesome-sqlite](https://github.com/planetopendata/awesome-sqlite)
  - [sqlite-utils](https://github.com/simonw/sqlite-utils) - Python CLI utility and library for manipulating SQLite databases.
  - [sqlite3](https://docs.python.org/3/library/sqlite3.html) - (Python standard library) SQLite interface compliant with DB-API 2.0.
- Other Relational Databases
  - [clickhouse-driver](https://github.com/mymarilyn/clickhouse-driver) - Python driver with native interface for ClickHouse.
  - [mssql-python](https://github.com/microsoft/mssql-python) - Official Microsoft driver for SQL Server and Azure SQL, built on ODBC for high performance and low memory usage.
- NoSQL Databases
  - [cassandra-driver](https://github.com/apache/cassandra-python-driver) - The Python Driver for Apache Cassandra.
  - [django-mongodb-backend](https://github.com/mongodb/django-mongodb-backend) - Official MongoDB database backend for Django.
  - [pymongo](https://github.com/mongodb/mongo-python-driver) - The official Python client for MongoDB.
  - [redis-py](https://github.com/redis/redis-py) - The Python client for Redis.

## Database

_Databases implemented in Python._

- [chromadb](https://github.com/chroma-core/chroma) - An open-source embedding database for building AI applications with embeddings and semantic search.
- [duckdb](https://github.com/duckdb/duckdb) - An in-process SQL OLAP database management system; optimized for analytics and fast queries, similar to SQLite but for analytical workloads.
- [pickledb](https://github.com/patx/pickledb) - A simple and lightweight key-value store for Python.
- [tinydb](https://github.com/msiemens/tinydb) - A tiny, document-oriented database.
- [ZODB](https://github.com/zopefoundation/ZODB) - A native object database for Python. A key-value and object graph database.

## Caching

_Libraries for caching data._

- [cachetools](https://github.com/tkem/cachetools) - Extensible memoizing collections and decorators.
- [django-cacheops](https://github.com/Suor/django-cacheops) - A slick ORM cache with automatic granular event-driven invalidation.
- [dogpile.cache](https://github.com/sqlalchemy/dogpile.cache) - dogpile.cache is a next generation replacement for Beaker made by the same authors.
- [python-diskcache](https://github.com/grantjenks/python-diskcache) - SQLite and file backed cache backend with faster lookups than memcached and redis.

## Search

_Libraries and software for indexing and performing search queries on data._

- [django-haystack](https://github.com/django-haystack/django-haystack) - Modular search for Django.
- [elasticsearch-py](https://github.com/elastic/elasticsearch-py) - The official low-level Python client for [Elasticsearch](https://www.elastic.co/products/elasticsearch).
- [pysolr](https://github.com/django-haystack/pysolr) - A lightweight Python wrapper for [Apache Solr](https://lucene.apache.org/solr/).

## Serialization

_Libraries for serializing complex data types._

- [marshmallow](https://github.com/marshmallow-code/marshmallow) - A lightweight library for converting complex objects to and from simple Python datatypes.
- [msgpack](https://github.com/msgpack/msgpack-python) - MessagePack serializer implementation for Python.
- [orjson](https://github.com/ijl/orjson) - Fast, correct JSON library.

**Data & Science**

## Data Analysis

_Libraries for data analysis._

- General
  - [aws-sdk-pandas](https://github.com/aws/aws-sdk-pandas) - Pandas on AWS.
  - [datasette](https://github.com/simonw/datasette) - An open source multi-tool for exploring and publishing data.
  - [desbordante](https://github.com/desbordante/desbordante-core/) - An open source data profiler for complex pattern discovery.
  - [ibis](https://github.com/ibis-project/ibis) - A portable Python dataframe library with a single API for 20+ backends.
  - [modin](https://github.com/modin-project/modin) - A drop-in pandas replacement that scales workflows by changing a single line of code.
  - [pandas](https://github.com/pandas-dev/pandas) - A library providing high-performance, easy-to-use data structures and data analysis tools.
  - [pathway](https://github.com/pathwaycom/pathway) - Real-time data processing framework for Python with reactive dataflows.
  - [polars](https://github.com/pola-rs/polars) - A fast DataFrame library implemented in Rust with a Python API.
- Financial Data
  - [akshare](https://github.com/akfamily/akshare) - A financial data interface library, built for human beings!
  - [edgartools](https://github.com/dgunning/edgartools) - Library for downloading structured data from SEC EDGAR filings and XBRL financial statements.
  - [lumibot](https://github.com/Lumiwealth/lumibot) - Algorithmic trading framework for backtesting and live deployment across stocks, options, crypto, futures, and forex.
  - [openbb](https://github.com/OpenBB-finance/OpenBB) - A financial data platform for analysts, quants and AI agents.
  - [yfinance](https://github.com/ranaroussi/yfinance) - Easy Pythonic way to download market and financial data from Yahoo Finance.

## Data Validation

_Libraries for validating data. Used for forms in many cases._

- [cerberus](https://github.com/pyeve/cerberus) - A lightweight and extensible data validation library.
- [jsonschema](https://github.com/python-jsonschema/jsonschema) - An implementation of [JSON Schema](http://json-schema.org/) for Python.
- [pandera](https://github.com/unionai-oss/pandera) - A data validation library for dataframes, with support for pandas, polars, and Spark.
- [pydantic](https://github.com/pydantic/pydantic) - Data validation using Python type hints.
- [voluptuous](https://github.com/alecthomas/voluptuous) - A Python data validation library primarily intended for validating data from untrusted sources.

## Data Visualization

_Libraries for visualizing data. Also see [awesome-javascript](https://github.com/sorrycc/awesome-javascript#data-visualization)._

- Plotting
  - [altair](https://github.com/vega/altair) - Declarative statistical visualization library for Python.
  - [bokeh](https://github.com/bokeh/bokeh) - Interactive Web Plotting for Python.
  - [bqplot](https://github.com/bqplot/bqplot) - Interactive Plotting Library for the Jupyter Notebook.
  - [matplotlib](https://github.com/matplotlib/matplotlib) - A Python 2D plotting library.
  - [plotly](https://github.com/plotly/plotly.py) - Interactive graphing library for Python.
  - [plotnine](https://github.com/has2k1/plotnine) - A grammar of graphics for Python based on ggplot2.
  - [pygal](https://github.com/Kozea/pygal) - A Python SVG Charts Creator.
  - [pyqtgraph](https://github.com/pyqtgraph/pyqtgraph) - Interactive and realtime 2D/3D/Image plotting and science/engineering widgets.
  - [seaborn](https://github.com/mwaskom/seaborn) - Statistical data visualization using Matplotlib.
  - [ultraplot](https://github.com/ultraplot/UltraPlot) - Matplotlib wrapper for publication-ready scientific figures with minimal code. Includes advanced subplot management, panel layouts, and batteries-included geoscience plotting.
  - [vispy](https://github.com/vispy/vispy) - High-performance scientific visualization based on OpenGL.
- Specialized
  - [cartopy](https://github.com/SciTools/cartopy) - A cartographic python library with matplotlib support.
  - [pygraphviz](https://github.com/pygraphviz/pygraphviz/) - Python interface to [Graphviz](http://www.graphviz.org/).
- Dashboards and Apps
  - [gradio](https://github.com/gradio-app/gradio) - Build and share machine learning apps, all in Python.
  - [streamlit](https://github.com/streamlit/streamlit) - A framework which lets you build dashboards, generate reports, or create chat apps in minutes.

## Geolocation

_Libraries for geocoding addresses and working with latitudes and longitudes._

- [django-countries](https://github.com/SmileyChris/django-countries) - A Django app that provides a country field for models and forms.
- [geodjango](https://github.com/django/django) - A world-class geographic web framework that is part of [Django](https://docs.djangoproject.com/en/dev/ref/contrib/gis/).
- [geojson](https://github.com/jazzband/geojson) - Python bindings and utilities for GeoJSON.
- [geopandas](https://github.com/geopandas/geopandas) - Python tools for geographic data (GeoSeries/GeoDataFrame) built on pandas.
- [geopy](https://github.com/geopy/geopy) - Python Geocoding Toolbox.

## Science

_Libraries for scientific computing. Also see [Python-for-Scientists](https://github.com/TomNicholas/Python-for-Scientists)._

- Core
  - [numba](https://github.com/numba/numba) - Python JIT compiler to LLVM aimed at scientific Python.
  - [numpy](https://github.com/numpy/numpy) - A fundamental package for scientific computing with Python.
  - [scipy](https://github.com/scipy/scipy) - A Python-based ecosystem of open-source software for mathematics, science, and engineering.
  - [statsmodels](https://github.com/statsmodels/statsmodels) - Statistical modeling and econometrics in Python.
  - [sympy](https://github.com/sympy/sympy) - A Python library for symbolic mathematics.
- Biology and Chemistry
  - [biopython](https://github.com/biopython/biopython) - Biopython is a set of freely available tools for biological computation.
  - [cclib](https://github.com/cclib/cclib) - A library for parsing and interpreting the results of computational chemistry packages.
  - [openbabel](https://github.com/openbabel/openbabel) - A chemical toolbox designed to speak the many languages of chemical data.
  - [rdkit](https://github.com/rdkit/rdkit) - Cheminformatics and Machine Learning Software.
- Physics and Engineering
  - [astropy](https://github.com/astropy/astropy) - A community Python library for Astronomy.
  - [obspy](https://github.com/obspy/obspy) - A Python toolbox for seismology.
  - [pydy](https://github.com/pydy/pydy) - Short for Python Dynamics, used to assist with workflow in the modeling of dynamic motion.
  - [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics) - This is a compilation of various robotics algorithms with visualizations.
- Simulation and Modeling
  - [pathsim](https://github.com/pathsim/pathsim) - A block-based system modeling and simulation framework with a browser-based visual editor.
  - [pymc](https://github.com/pymc-devs/pymc) - Probabilistic programming and Bayesian modeling in Python.
  - [simpy](https://gitlab.com/team-simpy/simpy) - A process-based discrete-event simulation framework.
- Other
  - [colour](https://github.com/colour-science/colour) - Implementing a comprehensive number of colour theory transformations and algorithms.
  - [manim](https://github.com/ManimCommunity/manim) - An animation engine for explanatory math videos.
  - [networkx](https://github.com/networkx/networkx) - A high-productivity software for complex networks.
  - [shapely](https://github.com/shapely/shapely) - Manipulation and analysis of geometric objects in the Cartesian plane.

## Quantum Computing

_Libraries for quantum computing._

- [Cirq](https://github.com/quantumlib/Cirq) — A Google-developed framework focused on hardware-aware quantum circuit design for NISQ devices.
- [pennylane](https://github.com/PennyLaneAI/pennylane) — A hybrid quantum-classical machine learning library with automatic differentiation support.
- [qiskit](https://github.com/Qiskit/qiskit) — An IBM-backed quantum SDK for building, simulating, and running circuits on real quantum hardware.
- [qutip](https://github.com/qutip/qutip) - Quantum Toolbox in Python.

**Developer Tools**

## Algorithms and Design Patterns

_Python implementation of data structures, algorithms and design patterns. Also see [awesome-algorithms](https://github.com/tayllan/awesome-algorithms)._

- Algorithms
  - [algorithms](https://github.com/keon/algorithms) - Minimal examples of data structures and algorithms.
  - [sortedcontainers](https://github.com/grantjenks/python-sortedcontainers) - Fast and pure-Python implementation of sorted collections.
  - [thealgorithms](https://github.com/TheAlgorithms/Python) - All Algorithms implemented in Python.
- Design Patterns
  - [python-patterns](https://github.com/faif/python-patterns) - A collection of design patterns in Python.
  - [transitions](https://github.com/pytransitions/transitions) - A lightweight, object-oriented finite state machine implementation.

## Interactive Interpreter

_Interactive Python interpreters (REPL)._

- [jupyter](https://github.com/jupyter/notebook) - A rich toolkit to help you make the most out of using Python interactively.
  - [awesome-jupyter](https://github.com/markusschanta/awesome-jupyter)
- [marimo](https://github.com/marimo-team/marimo) - Transform data and train models, feels like a next-gen notebook, stored as Git-friendly Python.
- [ptpython](https://github.com/prompt-toolkit/ptpython) - Advanced Python REPL built on top of the [python-prompt-toolkit](https://github.com/prompt-toolkit/python-prompt-toolkit).

## Code Analysis

_Tools of static analysis, linters and code quality checkers. Also see [awesome-static-analysis](https://github.com/analysis-tools-dev/static-analysis)._

- Code Analysis
  - [code2flow](https://github.com/scottrogowski/code2flow) - Turn your Python and JavaScript code into DOT flowcharts.
  - [prospector](https://github.com/prospector-dev/prospector) - A tool to analyze Python code.
  - [vulture](https://github.com/jendrikseipp/vulture) - A tool for finding and analyzing dead Python code.
- Code Linters
  - [bandit](https://github.com/PyCQA/bandit) - A tool designed to find common security issues in Python code.
  - [flake8](https://github.com/PyCQA/flake8) - A wrapper around `pycodestyle`, `pyflakes` and McCabe.
    - [awesome-flake8-extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions)
  - [pylint](https://github.com/pylint-dev/pylint) - A fully customizable source code analyzer.
  - [ruff](https://github.com/astral-sh/ruff) - An extremely fast Python linter and code formatter.
- Code Formatters
  - [black](https://github.com/psf/black) - The uncompromising Python code formatter.
  - [isort](https://github.com/PyCQA/isort) - A Python utility / library to sort imports.
  - [ruff](https://github.com/astral-sh/ruff) - An extremely fast Python linter and code formatter.
- Refactoring
  - [rope](https://github.com/python-rope/rope) - Rope is a python refactoring library.
- Type Checkers - [awesome-python-typing](https://github.com/typeddjango/awesome-python-typing)
  - [mypy](https://github.com/python/mypy) - Check variable types during compile time.
  - [pyre-check](https://github.com/facebook/pyre-check) - Performant type checking.
  - [ty](https://github.com/astral-sh/ty) - An extremely fast Python type checker and language server.
  - [typeshed](https://github.com/python/typeshed) - Collection of library stubs for Python, with static types.
- Type Annotations Generators
  - [monkeytype](https://github.com/Instagram/MonkeyType) - A system for Python that generates static type annotations by collecting runtime types.
  - [pytype](https://github.com/google/pytype) - Pytype checks and infers types for Python code - without requiring type annotations.

## Testing

_Libraries for testing codebases and generating test data._

- Frameworks
  - [hypothesis](https://github.com/HypothesisWorks/hypothesis) - Hypothesis is an advanced Quickcheck style property based testing library.
  - [pytest](https://github.com/pytest-dev/pytest) - A mature full-featured Python testing tool.
  - [robotframework](https://github.com/robotframework/robotframework) - A generic test automation framework.
  - [scanapi](https://github.com/scanapi/scanapi) - Automated Testing and Documentation for your REST API.
  - [unittest](https://docs.python.org/3/library/unittest.html) - (Python standard library) Unit testing framework.
- Test Runners
  - [nox](https://github.com/wntrblm/nox) - Flexible test automation for Python.
  - [tox](https://github.com/tox-dev/tox) - Auto builds and tests distributions in multiple Python versions
- GUI / Web Testing
  - [locust](https://github.com/locustio/locust) - Scalable user load testing tool written in Python.
  - [playwright-python](https://github.com/microsoft/playwright-python) - Python version of the Playwright testing and automation library.
  - [pyautogui](https://github.com/asweigart/pyautogui) - PyAutoGUI is a cross-platform GUI automation Python module for human beings.
  - [schemathesis](https://github.com/schemathesis/schemathesis) - A tool for automatic property-based testing of web applications built with Open API / Swagger specifications.
  - [selenium](https://github.com/SeleniumHQ/selenium) - Python bindings for [Selenium](https://selenium.dev/) [WebDriver](https://selenium.dev/documentation/webdriver/).
- Mock
  - [freezegun](https://github.com/spulec/freezegun) - Travel through time by mocking the datetime module.
  - [mock](https://docs.python.org/3/library/unittest.mock.html) - (Python standard library) A mocking and patching library.
  - [mocket](https://github.com/mindflayer/python-mocket) - A socket mock framework with gevent/asyncio/SSL support.
  - [responses](https://github.com/getsentry/responses) - A utility library for mocking out the requests Python library.
  - [vcrpy](https://github.com/kevin1024/vcrpy) - Record and replay HTTP interactions on your tests.
- Object Factories
  - [factory_boy](https://github.com/FactoryBoy/factory_boy) - A test fixtures replacement for Python.
  - [polyfactory](https://github.com/litestar-org/polyfactory) - mock data generation library with support to classes (continuation of `pydantic-factories`)
- Code Coverage
  - [coverage](https://github.com/coveragepy/coveragepy) - Code coverage measurement.
- Fake Data
  - [faker](https://github.com/joke2k/faker) - A Python package that generates fake data.
  - [mimesis](https://github.com/lk-geimfari/mimesis) - is a Python library that help you generate fake data.

## Debugging Tools

_Libraries for debugging code._

- pdb-like Debugger
  - [ipdb](https://github.com/gotcha/ipdb) - IPython-enabled [pdb](https://docs.python.org/3/library/pdb.html).
  - [pudb](https://github.com/inducer/pudb) - A full-screen, console-based Python debugger.
- Tracing
  - [manhole](https://github.com/ionelmc/python-manhole) - Debugging UNIX socket connections and present the stacktraces for all threads and an interactive prompt.
  - [python-hunter](https://github.com/ionelmc/python-hunter) - A flexible code tracing toolkit.
- Profiler
  - [py-spy](https://github.com/benfred/py-spy) - A sampling profiler for Python programs. Written in Rust.
  - [scalene](https://github.com/plasma-umass/scalene) - A high-performance, high-precision CPU, GPU, and memory profiler for Python.
- Others
  - [django-debug-toolbar](https://github.com/django-commons/django-debug-toolbar) - Display various debug information for Django.
  - [flask-debugtoolbar](https://github.com/pallets-eco/flask-debugtoolbar) - A port of the django-debug-toolbar to flask.
  - [icecream](https://github.com/gruns/icecream) - Inspect variables, expressions, and program execution with a single, simple function call.
  - [memory_graph](https://github.com/bterwijn/memory_graph) - Visualize Python data at runtime to debug references, mutability, and aliasing.

## Build Tools

_Compile software from source code._

- [bitbake](https://github.com/openembedded/bitbake) - A make-like build tool for embedded Linux.
- [invoke](https://github.com/pyinvoke/invoke) - A tool for managing shell-oriented subprocesses and organizing executable Python code into CLI-invokable tasks.
- [platformio](https://github.com/platformio/platformio-core) - A console tool to build code with different development platforms.
- [pybuilder](https://github.com/pybuilder/pybuilder) - A continuous build tool written in pure Python.
- [doit](https://github.com/pydoit/doit) - A task runner and build tool.
- [scons](https://github.com/SCons/scons) - A software construction tool.

## Documentation

_Libraries for generating project documentation._

- [sphinx](https://github.com/sphinx-doc/sphinx/) - Python Documentation generator.
  - [awesome-sphinxdoc](https://github.com/ygzgxyz/awesome-sphinxdoc)
- [diagrams](https://github.com/mingrammer/diagrams) - Diagram as Code.
- [mkdocs](https://github.com/mkdocs/mkdocs/) - Markdown friendly documentation generator.
- [pdoc](https://github.com/mitmproxy/pdoc) - Epydoc replacement to auto generate API documentation for Python libraries.

**DevOps**

## DevOps Tools

_Software and libraries for DevOps._

- Cloud Providers
  - [awscli](https://github.com/aws/aws-cli) - Universal Command Line Interface for Amazon Web Services.
  - [boto3](https://github.com/boto/boto3) - Python interface to Amazon Web Services.
- Configuration Management
  - [ansible](https://github.com/ansible/ansible) - A radically simple IT automation platform.
  - [cloudinit](https://github.com/canonical/cloud-init) - A multi-distribution package that handles early initialization of a cloud instance.
  - [openstack](https://github.com/openstack/openstack) - Open source software for building private and public clouds.
  - [pyinfra](https://github.com/pyinfra-dev/pyinfra) - A versatile CLI tools and python libraries to automate infrastructure.
  - [saltstack](https://github.com/saltstack/salt) - Infrastructure automation and management system.
- Deployment
  - [chalice](https://github.com/aws/chalice) - A Python serverless microframework for AWS.
  - [fabric](https://github.com/fabric/fabric) - A simple, Pythonic tool for remote execution and deployment.
- Monitoring and Processes
  - [psutil](https://github.com/giampaolo/psutil) - A cross-platform process and system utilities module.
  - [sentry-python](https://github.com/getsentry/sentry-python) - Sentry SDK for Python.
  - [sh](https://github.com/amoffat/sh) - A full-fledged subprocess replacement for Python.
  - [supervisor](https://github.com/Supervisor/supervisor) - Supervisor process control system for UNIX.
- Other
  - [borg](https://github.com/borgbackup/borg) - A deduplicating archiver with compression and encryption.
  - [chaostoolkit](https://github.com/chaostoolkit/chaostoolkit) - A Chaos Engineering toolkit & Orchestration for Developers.
  - [pre-commit](https://github.com/pre-commit/pre-commit) - A framework for managing and maintaining multi-language pre-commit hooks.

## Distributed Computing

_Frameworks and libraries for Distributed Computing._

- Batch Processing
  - [dask](https://github.com/dask/dask) - A flexible parallel computing library for analytic computing.
  - [luigi](https://github.com/spotify/luigi) - A module that helps you build complex pipelines of batch jobs.
  - [mpi4py](https://github.com/mpi4py/mpi4py) - Python bindings for MPI.
  - [pyspark](https://github.com/apache/spark) - [Apache Spark](https://spark.apache.org/) Python API.
  - [joblib](https://github.com/joblib/joblib) - A set of tools to provide lightweight pipelining in Python.
  - [ray](https://github.com/ray-project/ray/) - A system for parallel and distributed Python that unifies the machine learning ecosystem.

## Task Queues

_Libraries for working with task queues._

- [celery](https://github.com/celery/celery) - An asynchronous task queue/job queue based on distributed message passing.
- [dramatiq](https://github.com/Bogdanp/dramatiq) - A fast and reliable background task processing library for Python 3.
- [huey](https://github.com/coleifer/huey) - Little multi-threaded task queue.
- [rq](https://github.com/rq/rq) - Simple job queues for Python.

## Job Schedulers

_Libraries for scheduling jobs._

- [airflow](https://github.com/apache/airflow) - Airflow is a platform to programmatically author, schedule and monitor workflows.
- [apscheduler](https://github.com/agronholm/apscheduler) - A light but powerful in-process task scheduler that lets you schedule functions.
- [dagster](https://github.com/dagster-io/dagster) - An orchestration platform for the development, production, and observation of data assets.
- [prefect](https://github.com/PrefectHQ/prefect) - A modern workflow orchestration framework that makes it easy to build, schedule and monitor robust data pipelines.
- [schedule](https://github.com/dbader/schedule) - Python job scheduling for humans.
- [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow) - A powerful workflow engine implemented in pure Python.

## Logging

_Libraries for generating and working with logs._

- [logfmter](https://github.com/josheppinette/python-logfmter) - A standard library compatible logfmt formatter.
- [logging](https://docs.python.org/3/library/logging.html) - (Python standard library) Logging facility for Python.
- [loguru](https://github.com/Delgan/loguru) - Library which aims to bring enjoyable logging in Python.
- [structlog](https://github.com/hynek/structlog) - Structured logging made easy.

## Network Virtualization

_Tools and libraries for Virtual Networking and SDN (Software Defined Networking)._

- [mininet](https://github.com/mininet/mininet) - A popular network emulator and API written in Python.
- [napalm](https://github.com/napalm-automation/napalm) - Cross-vendor API to manipulate network devices.
- [scapy](https://github.com/secdev/scapy) - A brilliant packet manipulation library.

**CLI & GUI**

## CLI Development

_Libraries for building command-line applications._

- CLI Development
  - [argparse](https://docs.python.org/3/library/argparse.html) - (Python standard library) Command-line option and argument parsing.
  - [cement](https://github.com/datafolklabs/cement) - CLI Application Framework for Python.
  - [click](https://github.com/pallets/click/) - A package for creating beautiful command line interfaces in a composable way.
  - [python-fire](https://github.com/google/python-fire) - A library for creating command line interfaces from absolutely any Python object.
  - [python-prompt-toolkit](https://github.com/prompt-toolkit/python-prompt-toolkit) - A library for building powerful interactive command lines.
  - [typer](https://github.com/fastapi/typer) - Modern CLI framework that uses Python type hints. Built on Click and Pydantic.
- Terminal Rendering
  - [alive-progress](https://github.com/rsalmei/alive-progress) - A new kind of Progress Bar, with real-time throughput, eta and very cool animations.
  - [asciimatics](https://github.com/peterbrittain/asciimatics) - A package to create full-screen text UIs (from interactive forms to ASCII animations).
  - [colorama](https://github.com/tartley/colorama) - Cross-platform colored terminal text.
  - [rich](https://github.com/Textualize/rich) - Python library for rich text and beautiful formatting in the terminal. Also provides a great `RichHandler` log handler.
  - [textual](https://github.com/Textualize/textual) - A framework for building interactive user interfaces that run in the terminal and the browser.
  - [tqdm](https://github.com/tqdm/tqdm) - Fast, extensible progress bar for loops and CLI.

## CLI Tools

_Useful CLI-based tools for productivity._

- Productivity Tools
  - [cookiecutter](https://github.com/cookiecutter/cookiecutter) - A command-line utility that creates projects from cookiecutters (project templates).
  - [copier](https://github.com/copier-org/copier) - A library and command-line utility for rendering projects templates.
  - [doitlive](https://github.com/sloria/doitlive) - A tool for live presentations in the terminal.
  - [thefuck](https://github.com/nvbn/thefuck) - Correcting your previous console command.
  - [tmuxp](https://github.com/tmux-python/tmuxp) - A [tmux](https://github.com/tmux/tmux) session manager.
  - [xonsh](https://github.com/xonsh/xonsh/) - A Python-powered shell. Full-featured and cross-platform.
  - [yt-dlp](https://github.com/yt-dlp/yt-dlp) - A command-line program to download videos from YouTube and other video sites, a fork of youtube-dl.
- CLI Enhancements
  - [httpie](https://github.com/httpie/cli) - A command line HTTP client, a user-friendly cURL replacement.
  - [iredis](https://github.com/laixintao/iredis) - Redis CLI with autocompletion and syntax highlighting.
  - [litecli](https://github.com/dbcli/litecli) - SQLite CLI with autocompletion and syntax highlighting.
  - [mycli](https://github.com/dbcli/mycli) - MySQL CLI with autocompletion and syntax highlighting.
  - [pgcli](https://github.com/dbcli/pgcli) - PostgreSQL CLI with autocompletion and syntax highlighting.

## GUI Development

_Libraries for working with graphical user interface applications._

- Desktop
  - [customtkinter](https://github.com/tomschimansky/customtkinter) - A modern and customizable python UI-library based on Tkinter.
  - [dearpygui](https://github.com/hoffstadt/DearPyGui) - A Simple GPU accelerated Python GUI framework
  - [enaml](https://github.com/nucleic/enaml) - Creating beautiful user-interfaces with Declarative Syntax like QML.
  - [kivy](https://github.com/kivy/kivy) - A library for creating NUI applications, running on Windows, Linux, Mac OS X, Android and iOS.
  - [pyglet](https://github.com/pyglet/pyglet) - A cross-platform windowing and multimedia library for Python.
  - [pygobject](https://github.com/GNOME/pygobject) - Python Bindings for GLib/GObject/GIO/GTK+ (GTK+3).
  - [PyQt](https://www.riverbankcomputing.com/static/Docs/PyQt6/) - Python bindings for the [Qt](https://www.qt.io/) cross-platform application and UI framework.
  - [pyside](https://github.com/pyside/pyside-setup) - Qt for Python offers the official Python bindings for [Qt](https://www.qt.io/), this is same as PyQt but it's the official binding with different licensing.
  - [tkinter](https://docs.python.org/3/library/tkinter.html) - (Python standard library) The standard Python interface to the Tcl/Tk GUI toolkit.
  - [toga](https://github.com/beeware/toga) - A Python native, OS native GUI toolkit.
  - [wxPython](https://github.com/wxWidgets/Phoenix) - A blending of the wxWidgets C++ class library with the Python.
- Web-based
  - [flet](https://github.com/flet-dev/flet) - Cross-platform GUI framework for building modern apps in pure Python.
  - [nicegui](https://github.com/zauberzeug/nicegui) - An easy-to-use, Python-based UI framework, which shows up in your web browser.
  - [pywebview](https://github.com/r0x0r/pywebview/) - A lightweight cross-platform native wrapper around a webview component.
- Terminal
  - [curses](https://docs.python.org/3/library/curses.html) - Built-in wrapper for [ncurses](http://www.gnu.org/software/ncurses/) used to create terminal GUI applications.
  - [urwid](https://github.com/urwid/urwid) - A library for creating terminal GUI applications with strong support for widgets, events, rich colors, etc.
- Wrappers
  - [gooey](https://github.com/chriskiehl/Gooey) - Turn command line programs into a full GUI application with one line.

**Text & Documents**

## Text Processing

_Libraries for parsing and manipulating plain texts._

- General
  - [babel](https://github.com/python-babel/babel) - An internationalization library for Python.
  - [chardet](https://github.com/chardet/chardet) - Python 2/3 compatible character encoding detector.
  - [difflib](https://docs.python.org/3/library/difflib.html) - (Python standard library) Helpers for computing deltas.
  - [ftfy](https://github.com/rspeer/python-ftfy) - Makes Unicode text less broken and more consistent automagically.
  - [pangu.py](https://github.com/vinta/pangu.py) - Paranoid text spacing.
  - [pyfiglet](https://github.com/pwaller/pyfiglet) - An implementation of figlet written in Python.
  - [pypinyin](https://github.com/mozillazg/python-pinyin) - Convert Chinese hanzi (漢字) to pinyin (拼音).
  - [python-slugify](https://github.com/un33k/python-slugify) - A Python slugify library that translates unicode to ASCII.
  - [textdistance](https://github.com/life4/textdistance) - Compute distance between sequences with 30+ algorithms.
  - [unidecode](https://github.com/avian2/unidecode) - ASCII transliterations of Unicode text.
- Unique identifiers
  - [sqids](https://github.com/sqids/sqids-python) - A library for generating short unique IDs from numbers.
  - [shortuuid](https://github.com/skorokithakis/shortuuid) - A generator library for concise, unambiguous and URL-safe UUIDs.
- Parser
  - [pygments](https://github.com/pygments/pygments) - A generic syntax highlighter.
  - [pyparsing](https://github.com/pyparsing/pyparsing) - A general purpose framework for generating parsers.
  - [python-nameparser](https://github.com/derek73/python-nameparser) - Parsing human names into their individual components.
  - [python-phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Parsing, formatting, storing and validating international phone numbers.
  - [python-user-agents](https://github.com/selwin/python-user-agents) - Browser user agent parser.
  - [sqlparse](https://github.com/andialbrecht/sqlparse) - A non-validating SQL parser.

## HTML Manipulation

_Libraries for working with HTML and XML._

- [beautifulsoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) - Providing Pythonic idioms for iterating, searching, and modifying HTML or XML.
- [justhtml](https://github.com/EmilStenstrom/justhtml/) - A pure Python HTML5 parser that just works.
- [lxml](https://github.com/lxml/lxml) - A very fast, easy-to-use and versatile library for handling HTML and XML.
- [markupsafe](https://github.com/pallets/markupsafe) - Implements a XML/HTML/XHTML Markup safe string for Python.
- [pyquery](https://github.com/gawel/pyquery) - A jQuery-like library for parsing HTML.
- [tinycss2](https://github.com/Kozea/tinycss2) - A low-level CSS parser and generator written in Python.
- [xmltodict](https://github.com/martinblech/xmltodict) - Working with XML feel like you are working with JSON.

## File Format Processing

_Libraries for parsing and manipulating specific text formats._

- General
  - [docling](https://github.com/docling-project/docling) - Library for converting documents into structured data.
  - [kreuzberg](https://github.com/kreuzberg-dev/kreuzberg) - High-performance document extraction library with a Rust core, supporting 62+ formats including PDF, Office, images with OCR, HTML, email, and archives.
  - [pyelftools](https://github.com/eliben/pyelftools) - Parsing and analyzing ELF files and DWARF debugging information.
  - [tablib](https://github.com/jazzband/tablib) - A module for Tabular Datasets in XLS, CSV, JSON, YAML.
- MS Office
  - [docxtpl](https://github.com/elapouya/python-docx-template) - Editing a docx document by jinja2 template
  - [openpyxl](https://openpyxl.readthedocs.io/en/stable/) - A library for reading and writing Excel 2010 xlsx/xlsm/xltx/xltm files.
  - [pyexcel](https://github.com/pyexcel/pyexcel) - Providing one API for reading, manipulating and writing csv, ods, xls, xlsx and xlsm files.
  - [python-docx](https://github.com/python-openxml/python-docx) - Reads, queries and modifies Microsoft Word 2007/2008 docx files.
  - [python-pptx](https://github.com/scanny/python-pptx) - Python library for creating and updating PowerPoint (.pptx) files.
  - [xlsxwriter](https://github.com/jmcnamara/XlsxWriter) - A Python module for creating Excel .xlsx files.
  - [xlwings](https://github.com/xlwings/xlwings) - A BSD-licensed library that makes it easy to call Python from Excel and vice versa.
- PDF
  - [pdf_oxide](https://github.com/yfedoseev/pdf_oxide) - A fast PDF library for text extraction, image extraction, and markdown conversion, powered by Rust.
  - [pdfminer.six](https://github.com/pdfminer/pdfminer.six) - Pdfminer.six is a community maintained fork of the original PDFMiner.
  - [pikepdf](https://github.com/pikepdf/pikepdf) - A powerful library for reading and editing PDF files, based on qpdf.
  - [pypdf](https://github.com/py-pdf/pypdf) - A library capable of splitting, merging, cropping, and transforming PDF pages.
  - [reportlab](https://www.reportlab.com/opensource/) - Allowing Rapid creation of rich PDF documents.
  - [weasyprint](https://github.com/Kozea/WeasyPrint) - A visual rendering engine for HTML and CSS that can export to PDF.
- Markdown
  - [markdown-it-py](https://github.com/executablebooks/markdown-it-py) - Markdown parser with 100% CommonMark support, extensions, and syntax plugins.
  - [markdown](https://github.com/waylan/Python-Markdown) - A Python implementation of John Gruber’s Markdown.
  - [markitdown](https://github.com/microsoft/markitdown) - Python tool for converting files and office documents to Markdown.
  - [mistune](https://github.com/lepture/mistune) - Fastest and full featured pure Python parsers of Markdown.
- Data Formats
  - [csvkit](https://github.com/wireservice/csvkit) - Utilities for converting to and working with CSV.
  - [pyyaml](https://github.com/yaml/pyyaml) - YAML implementations for Python.
  - [tomllib](https://docs.python.org/3/library/tomllib.html) - (Python standard library) Parse TOML files.

## File Manipulation

_Libraries for file manipulation._

- [mimetypes](https://docs.python.org/3/library/mimetypes.html) - (Python standard library) Map filenames to MIME types.
- [pathlib](https://docs.python.org/3/library/pathlib.html) - (Python standard library) A cross-platform, object-oriented path library.
- [python-magic](https://github.com/ahupp/python-magic) - A Python interface to the libmagic file type identification library.
- [watchdog](https://github.com/gorakhargosh/watchdog) - API and shell utilities to monitor file system events.
- [watchfiles](https://github.com/samuelcolvin/watchfiles) - Simple, modern and fast file watching and code reload in python.

**Media**

## Image Processing

_Libraries for manipulating images._

- [pillow](https://github.com/python-pillow/Pillow) - Pillow is the friendly [PIL](https://www.pythonware.com/products/pil/) fork.
- [pymatting](https://github.com/pymatting/pymatting) - A library for alpha matting.
- [python-barcode](https://github.com/WhyNotHugo/python-barcode) - Create barcodes in Python with no extra dependencies.
- [python-qrcode](https://github.com/lincolnloop/python-qrcode) - A pure Python QR Code generator.
- [pyvips](https://github.com/libvips/pyvips) - A fast image processing library with low memory needs.
- [scikit-image](https://github.com/scikit-image/scikit-image) - A Python library for (scientific) image processing.
- [thumbor](https://github.com/thumbor/thumbor) - A smart imaging service. It enables on-demand crop, re-sizing and flipping of images.
- [wand](https://github.com/emcconville/wand) - Python bindings for [MagickWand](https://www.imagemagick.org/script/magick-wand.php), C API for ImageMagick.

## Audio & Video Processing

_Libraries for manipulating audio, video, and their metadata._

- Audio
  - [gtts](https://github.com/pndurette/gTTS) - Python library and CLI tool for converting text to speech using Google Translate TTS.
  - [librosa](https://github.com/librosa/librosa) - Python library for audio and music analysis.
  - [matchering](https://github.com/sergree/matchering) - A library for automated reference audio mastering.
  - [pydub](https://github.com/jiaaro/pydub) - Manipulate audio with a simple and easy high level interface.
- Video
  - [moviepy](https://github.com/Zulko/moviepy) - A module for script-based movie editing with many formats, including animated GIFs.
  - [vidgear](https://github.com/abhiTronix/vidgear) - Most Powerful multi-threaded Video Processing framework.
- Metadata
  - [beets](https://github.com/beetbox/beets) - A music library manager and [MusicBrainz](https://musicbrainz.org/) tagger.
  - [mutagen](https://github.com/quodlibet/mutagen) - A Python module to handle audio metadata.
  - [tinytag](https://github.com/devsnd/tinytag) - A library for reading music meta data of MP3, OGG, FLAC and Wave files.

## Game Development

_Awesome game development libraries._

- [arcade](https://github.com/pythonarcade/arcade) - Arcade is a modern Python framework for crafting games with compelling graphics and sound.
- [panda3d](https://github.com/panda3d/panda3d) - 3D game engine developed by Disney.
- [py-sdl2](https://github.com/py-sdl/py-sdl2) - A ctypes based wrapper for the SDL2 library.
- [pygame](https://github.com/pygame/pygame) - Pygame is a set of Python modules designed for writing games.
- [pyopengl](https://github.com/mcfletch/pyopengl) - Python ctypes bindings for OpenGL and it's related APIs.
- [renpy](https://github.com/renpy/renpy) - A Visual Novel engine.

**Python Language**

## Implementations

_Implementations of Python._

- [cpython](https://github.com/python/cpython) - Default, most widely used implementation of the Python programming language written in C.
- [cython](https://github.com/cython/cython) - Optimizing Static Compiler for Python.
- [ironpython](https://github.com/IronLanguages/ironpython3) - Implementation of the Python programming language written in C#.
- [micropython](https://github.com/micropython/micropython) - A lean and efficient Python programming language implementation.
- [pyodide](https://github.com/pyodide/pyodide) - Python distribution for the browser and Node.js based on WebAssembly.
- [pypy](https://github.com/pypy/pypy) - A very fast and compliant implementation of the Python language.

## Built-in Classes Enhancement

_Libraries for enhancing Python built-in classes._

- [attrs](https://github.com/python-attrs/attrs) - Replacement for `__init__`, `__eq__`, `__repr__`, etc. boilerplate in class definitions.
- [bidict](https://github.com/jab/bidict) - Efficient, Pythonic bidirectional map data structures and related functionality.
- [box](https://github.com/cdgriffith/Box) - Python dictionaries with advanced dot notation access.

## Functional Programming

_Functional Programming with Python._

- [coconut](https://github.com/evhub/coconut) - A variant of Python built for simple, elegant, Pythonic functional programming.
- [functools](https://docs.python.org/3/library/functools.html) - (Python standard library) Higher-order functions and operations on callable objects.
- [funcy](https://github.com/Suor/funcy) - A fancy and practical functional tools.
- [more-itertools](https://github.com/erikrose/more-itertools) - More routines for operating on iterables, beyond `itertools`.
- [returns](https://github.com/dry-python/returns) - A set of type-safe monads, transformers, and composition utilities.
- [toolz](https://github.com/pytoolz/toolz) - A collection of functional utilities for iterators, functions, and dictionaries. Also available as [cytoolz](https://github.com/pytoolz/cytoolz/) for Cython-accelerated performance.

## Asynchronous Programming

_Libraries for asynchronous, concurrent and parallel execution. Also see [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio)._

- [anyio](https://github.com/agronholm/anyio) - A high-level async concurrency and networking framework that works on top of asyncio or trio.
- [asyncio](https://docs.python.org/3/library/asyncio.html) - (Python standard library) Asynchronous I/O, event loop, coroutines and tasks.
  - [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio)
- [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html) - (Python standard library) A high-level interface for asynchronously executing callables.
- [gevent](https://github.com/gevent/gevent) - A coroutine-based Python networking library that uses [greenlet](https://github.com/python-greenlet/greenlet).
- [multiprocessing](https://docs.python.org/3/library/multiprocessing.html) - (Python standard library) Process-based parallelism.
- [trio](https://github.com/python-trio/trio) - A friendly library for async concurrency and I/O.
- [twisted](https://github.com/twisted/twisted) - An event-driven networking engine.
- [uvloop](https://github.com/MagicStack/uvloop) - Ultra fast asyncio event loop.

## Date and Time

_Libraries for working with dates and times._

- [dateparser](https://github.com/scrapinghub/dateparser) - A Python parser for human-readable dates in dozens of languages.
- [dateutil](https://github.com/dateutil/dateutil) - Extensions to the standard Python [datetime](https://docs.python.org/3/library/datetime.html) module.
- [pendulum](https://github.com/python-pendulum/pendulum) - Python datetimes made easy.
- [zoneinfo](https://docs.python.org/3/library/zoneinfo.html) - (Python standard library) IANA time zone support. Brings the [tz database](https://en.wikipedia.org/wiki/Tz_database) into Python.

**Python Toolchain**

## Environment Management

_Libraries for Python version and virtual environment management._

- [pyenv](https://github.com/pyenv/pyenv) - Simple Python version management.
- [pyenv-win](https://github.com/pyenv-win/pyenv-win) - Pyenv for Windows.
- [uv](https://github.com/astral-sh/uv) - An extremely fast Python version, package and project manager, written in Rust.
- [virtualenv](https://github.com/pypa/virtualenv) - A tool to create isolated Python environments.

## Package Management

_Libraries for package and dependency management._

- [conda](https://github.com/conda/conda/) - Cross-platform, Python-agnostic binary package manager.
- [pip](https://github.com/pypa/pip) - The package installer for Python.
- [pipx](https://github.com/pypa/pipx) - Install and Run Python Applications in Isolated Environments. Like `npx` in Node.js.
- [poetry](https://github.com/python-poetry/poetry) - Python dependency management and packaging made easy.
- [uv](https://github.com/astral-sh/uv) - An extremely fast Python version, package and project manager, written in Rust.

## Package Repositories

_Local PyPI repository server and proxies._

- [bandersnatch](https://github.com/pypa/bandersnatch/) - PyPI mirroring tool provided by Python Packaging Authority (PyPA).
- [devpi](https://github.com/devpi/devpi) - PyPI server and packaging/testing/release tool.
- [warehouse](https://github.com/pypa/warehouse) - Next generation Python Package Repository (PyPI).

## Distribution

_Libraries to create packaged executables for release distribution._

- [cx-Freeze](https://github.com/marcelotduarte/cx_Freeze) - It is a Python tool that converts Python scripts into standalone executables and installers for Windows, macOS, and Linux.
- [Nuitka](https://github.com/Nuitka/Nuitka) - Compiles Python programs into high-performance standalone executables (cross-platform, supports all Python versions).
- [pyarmor](https://github.com/dashingsoft/pyarmor) - A tool used to obfuscate python scripts, bind obfuscated scripts to fixed machine or expire obfuscated scripts.
- [pyinstaller](https://github.com/pyinstaller/pyinstaller) - Converts Python programs into stand-alone executables (cross-platform).
- [shiv](https://github.com/linkedin/shiv) - A command line utility for building fully self-contained zipapps (PEP 441), but with all their dependencies included.

## Configuration Files

_Libraries for storing and parsing configuration options._

- [configparser](https://docs.python.org/3/library/configparser.html) - (Python standard library) INI file parser.
- [dynaconf](https://github.com/dynaconf/dynaconf) - Dynaconf is a configuration manager with plugins for Django, Flask and FastAPI.
- [hydra](https://github.com/facebookresearch/hydra) - Hydra is a framework for elegantly configuring complex applications.
- [python-decouple](https://github.com/HBNetwork/python-decouple) - Strict separation of settings from code.
- [python-dotenv](https://github.com/theskumar/python-dotenv) - Reads key-value pairs from a `.env` file and sets them as environment variables.

**Security**

## Cryptography

- [cryptography](https://github.com/pyca/cryptography) - A package designed to expose cryptographic primitives and recipes to Python developers.
- [paramiko](https://github.com/paramiko/paramiko) - The leading native Python SSHv2 protocol library.
- [pynacl](https://github.com/pyca/pynacl) - Python binding to the Networking and Cryptography (NaCl) library.

## Penetration Testing

_Frameworks and tools for penetration testing._

- [mitmproxy](https://github.com/mitmproxy/mitmproxy) - An interactive TLS-capable intercepting HTTP proxy for penetration testers and software developers.
- [setoolkit](https://github.com/trustedsec/social-engineer-toolkit) - A toolkit for social engineering.
- [sherlock](https://github.com/sherlock-project/sherlock) - Hunt down social media accounts by username across social networks.
- [sqlmap](https://github.com/sqlmapproject/sqlmap) - Automatic SQL injection and database takeover tool.

**Miscellaneous**

## Hardware

_Libraries for programming with hardware._

- [bleak](https://github.com/hbldh/bleak) - A cross platform Bluetooth Low Energy Client for Python using asyncio.
- [pynput](https://github.com/moses-palmer/pynput) - A library to control and monitor input devices.

## Microsoft Windows

_Python programming on Microsoft Windows._

- [pythonnet](https://github.com/pythonnet/pythonnet) - Python Integration with the .NET Common Language Runtime (CLR).
- [pywin32](https://github.com/mhammond/pywin32) - Python Extensions for Windows.
- [winpython](https://github.com/winpython/winpython) - Portable development environment for Windows 10/11.

## Miscellaneous

_Useful libraries or tools that don't fit in the categories above._

- [blinker](https://github.com/jek/blinker) - A fast Python in-process signal/event dispatching system.
- [boltons](https://github.com/mahmoud/boltons) - A set of pure-Python utilities.
- [itsdangerous](https://github.com/pallets/itsdangerous) - Various helpers to pass trusted data to untrusted environments.
- [tryton](https://github.com/tryton/tryton) - A general-purpose business framework.

# Resources

Where to discover learning resources or new Python libraries.

## Newsletters

- [Awesome Python Newsletter](http://python.libhunt.com/newsletter)
- [Pycoder's Weekly](https://pycoders.com/)
- [Python Tricks](https://realpython.com/python-tricks/)
- [Python Weekly](https://www.pythonweekly.com/)

## Podcasts

- [Django Chat](https://djangochat.com/)
- [PyPodcats](https://pypodcats.live)
- [Python Bytes](https://pythonbytes.fm)
- [Talk Python To Me](https://talkpython.fm/)
- [The Real Python Podcast](https://realpython.com/podcasts/rpp/)

# Contributing

Your contributions are always welcome! Please take a look at the [contribution guidelines](https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md) first.

---

If you have any question about this opinionated list, do not hesitate to contact [@vinta](https://x.com/vinta) on X (Twitter).
