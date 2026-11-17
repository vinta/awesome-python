SQLAlchemy maps classes to tables in apps outside Django, which has its own ORM. Write Python instead of raw SQL, and a Python ORM returns rows as objects.

How to choose:

- An app outside Django, sync or async: SQLAlchemy
- A Django project: Django ORM
- A small app, with few concepts to learn: Peewee
- One set of model classes for Pydantic and SQLAlchemy, as in FastAPI: SQLModel
- Amazon DynamoDB tables: PynamoDB
- MongoDB from synchronous code: MongoEngine
- MongoDB from async code, with Pydantic models: Beanie
- A Django project on MongoDB: Django MongoDB Backend

SQLAlchemy builds its ORM [on top of Core](https://docs.sqlalchemy.org/en/latest/tutorial/index.html), its SQL toolkit, which you can also use alone. The ORM follows the [data mapper pattern](https://www.sqlalchemy.org/philosophy.html), so your classes and your database schema can change independently of each other. Declare models with typed `Mapped[]` attributes, as in the [ORM Quick Start](https://docs.sqlalchemy.org/en/latest/orm/quickstart.html#declare-models). Keep the session [outside the functions that query data](https://docs.sqlalchemy.org/en/latest/orm/session_basics.html#session-faq-whentocreate). Open it with `with Session(engine) as session:` around one unit of work, like a web request, and keep transactions short. For schema changes over time, its docs point you to [Alembic](https://docs.sqlalchemy.org/en/latest/tutorial/metadata.html#tutorial-emitting-ddl). In asyncio code, the [asyncio extension](https://docs.sqlalchemy.org/en/latest/orm/extensions/asyncio.html) covers both Core and the ORM.

Django comes with an ORM in which you [describe your database layout in Python code](https://docs.djangoproject.com/en/stable/intro/overview/). It follows [the Active Record pattern](https://docs.djangoproject.com/en/stable/misc/design-philosophies/#include-all-relevant-domain-logic), so a model holds its domain logic along with its fields. Change a model, then run `makemigrations` and `migrate`, and [migrations](https://docs.djangoproject.com/en/stable/topics/migrations/) carry the change into your schema. In async code, every QuerySet method that runs a query has [an `a`-prefixed variant](https://docs.djangoproject.com/en/stable/topics/async/#queries-the-orm), like `afirst()`.

Peewee is [a simple and small ORM](https://docs.peewee-orm.com/en/latest/) with few concepts, in a single module with no required dependencies. It works with SQLite, MySQL, MariaDB, and PostgreSQL. As in [its README](https://github.com/coleifer/peewee), set the database once in a `BaseModel`'s `Meta.database` and subclass that for every model. A [`with db:` block](https://docs.peewee-orm.com/en/latest/peewee/database.html#context-managers) opens a connection and a transaction, commits when the block exits normally, rolls back on an exception, and closes the connection.

SQLModel is [a thin layer on top of Pydantic and SQLAlchemy](https://sqlmodel.tiangolo.com/): each model is both a Pydantic model and a SQLAlchemy model. FastAPI's author built it for FastAPI apps, but it [works in any other kind of app](https://sqlmodel.tiangolo.com/features/) too. Mark the classes that are tables with `table=True`, and keep what your API reads and returns in [data models](https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/#multiple-models-with-inheritance), which are only Pydantic models.

PynamoDB wraps DynamoDB's verbose API in [a simple, elegant one](https://github.com/pynamodb/PynamoDB). Write [a model per table](https://pynamodb.readthedocs.io/en/latest/tutorial.html#defining-a-model), with the table's name in `Meta.table_name` and its hash key marked `hash_key=True`, since every DynamoDB table has one.

MongoEngine is [an ORM-like layer on top of PyMongo](https://github.com/MongoEngine/mongoengine), and synchronous: it's [based on PyMongo alone](https://mongoengine-odm.readthedocs.io/faq.html), not on async drivers. Your document classes define a schema that MongoDB never sees, since it's [enforced at the application level](https://mongoengine-odm.readthedocs.io/tutorial.html#defining-our-documents). Store data that belongs to one document, like a post's comments, [as embedded documents](https://mongoengine-odm.readthedocs.io/tutorial.html#comments) on it.

Beanie is [an asynchronous ODM whose data models are based on Pydantic](https://beanie-odm.dev/). [Setting it up](https://beanie-odm.dev/getting-started/) takes three steps: subclass `beanie.Document` instead of `pydantic.BaseModel`, create PyMongo's async client, and call `init_beanie()` with your database and models inside your event loop. That call also [creates the collections and sets up the indexes](https://beanie-odm.dev/tutorial/initialization/) your models define.

Django MongoDB Backend is [a Django database backend that uses PyMongo](https://github.com/mongodb/django-mongodb-backend). MongoDB's docs say it [translates Django ORM methods into MongoDB queries](https://www.mongodb.com/docs/drivers/odm/), so your project keeps Django's models and ORM. Start from [its project template](https://django-mongodb-backend.readthedocs.io/en/latest/intro/configure/), which sets `ObjectIdAutoField` as the default primary key.

With SQLAlchemy, the Django ORM, or Peewee, load related rows up front instead of running one query per row in a loop. SQLAlchemy calls [`selectinload()` the best strategy](https://docs.sqlalchemy.org/en/latest/orm/queryguide/relationships.html#what-kind-of-loading-to-use) for collections and `joinedload()` the most general one for many-to-one. Django has [`select_related()` and `prefetch_related()`](https://docs.djangoproject.com/en/stable/topics/db/optimization/#use-queryset-select-related-and-prefetch-related), and Peewee [joins or eager-loads](https://docs.peewee-orm.com/en/latest/peewee/relationships.html#the-n-1-problem) depending on which way the relationship goes.

For more SQLAlchemy extensions and resources, see [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy).
