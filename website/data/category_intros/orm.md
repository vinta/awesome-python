Pick SQLAlchemy as your Python ORM unless you're on Django, which ships its own. In a FastAPI app, SQLModel adds Pydantic models on top of SQLAlchemy.

How to choose:

- Any app outside Django: SQLAlchemy
- A Django project: Django ORM
- A FastAPI app, with one class for both the table and the API schema: SQLModel
- A small app, with no required dependencies: Peewee
- Amazon DynamoDB: PynamoDB
- MongoDB from synchronous code: MongoEngine
- MongoDB from asyncio code, with Pydantic models: Beanie
- MongoDB in a Django project, through Django models: Django MongoDB Backend

### SQLAlchemy

Pick SQLAlchemy for any Python app that isn't built on Django. It gives you [the full power and flexibility of SQL](https://www.sqlalchemy.org/), and automates the repetitive work while [you stay in control](https://www.sqlalchemy.org/philosophy.html) of how the SQL is built. New users [should start with the Unified Tutorial](https://docs.sqlalchemy.org/en/latest/intro.html). Your models subclass [`DeclarativeBase`](https://docs.sqlalchemy.org/en/latest/orm/quickstart.html), and each column takes its type from its `Mapped[...]` annotation. For async code, the ORM also runs through [the asyncio extension](https://docs.sqlalchemy.org/en/latest/orm/extensions/asyncio.html). Migrations come from [Alembic](https://alembic.sqlalchemy.org/en/latest/), the migration tool built for SQLAlchemy.

### Django ORM

Use the Django ORM in a Django project, where it comes built in. Its models live in apps listed in [`INSTALLED_APPS`](https://docs.djangoproject.com/en/stable/topics/db/models/), so outside a Django project, pick SQLAlchemy instead. Each model class follows [the Active Record pattern](https://docs.djangoproject.com/en/stable/misc/design-philosophies/#include-all-relevant-domain-logic) and holds both the data and the logic about it. Run [`makemigrations` and `migrate`](https://docs.djangoproject.com/en/stable/intro/overview/#install-it), and Django creates the migrations and tables from your models, with no extra tool. In async code, every query method that might block has [an async variant](https://docs.djangoproject.com/en/stable/topics/db/queries/#asynchronous-queries), like `aget()`.

### SQLModel

Pick SQLModel for a FastAPI app, so you [don't duplicate models in SQLAlchemy and Pydantic](https://sqlmodel.tiangolo.com/). FastAPI's author built it as a thin layer on both, and every SQLModel model is also a SQLAlchemy model. Mark the class that maps to a table with `table=True`, keep the API input and output classes as plain data models, and [only inherit from data models](https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/#only-inherit-from-data-models). SQLModel covers [the most common use cases](https://sqlmodel.tiangolo.com/features/#based-on-sqlalchemy); when you need more, plug SQLAlchemy in directly.

### Peewee

Pick Peewee for a small app where SQLAlchemy's concepts are more than you need. It's [a simple and small ORM](https://docs.peewee-orm.com/en/latest/) with few concepts, in a single module with no required dependencies. An app starts with [a `Database` object and `Model` classes](https://docs.peewee-orm.com/en/latest/peewee/quickstart.html), and a `BaseModel` carries the database setting for every model.
### PynamoDB

PynamoDB is the pick for Amazon DynamoDB, and it [supports the entire DynamoDB API](https://pynamodb.readthedocs.io/en/latest/quickstart.html). Define each table as a `Model` subclass, with the table name in its `Meta` class and `hash_key=True` on the key attribute.

### MongoEngine

Pick MongoEngine for MongoDB from synchronous code, and Beanie for asyncio code. MongoEngine is [an object-document mapper based on PyMongo](https://docs.mongoengine.org/). Connect with `connect()`, then define your documents as classes: MongoDB never sees that schema, since MongoEngine [enforces it at the application level](https://docs.mongoengine.org/tutorial.html).

### Beanie

Pick Beanie for MongoDB from asyncio code. It's [an asynchronous object-document mapper](https://beanie-odm.dev/) whose models are Pydantic classes, with data and schema migrations built in. Subclass `beanie.Document` instead of `pydantic.BaseModel`, then call [`init_beanie()`](https://beanie-odm.dev/getting-started/#initialization) with your database and the list of models. It creates the collections if needed and sets up the indexes you defined.

### Django MongoDB Backend

Pick Django MongoDB Backend to run a Django project on MongoDB. It's MongoDB's [official Django database backend](https://www.mongodb.com/docs/languages/python/django-mongodb/current/), so you keep writing Django models. Start a new project from [its project template](https://django-mongodb-backend.readthedocs.io/en/latest/intro/configure/), which comes configured for MongoDB.

### Loading related data

In SQLAlchemy and the Django ORM, load related rows up front instead of running one query per object. SQLAlchemy's docs call [`selectinload()`](https://docs.sqlalchemy.org/en/latest/orm/queryguide/relationships.html#what-kind-of-loading-to-use) generally the best strategy for collections and `joinedload()` the most general one for many-to-one. Django's docs say to [use `select_related()` and `prefetch_related()`](https://docs.djangoproject.com/en/stable/topics/db/optimization/#use-queryset-select-related-and-prefetch-related). On MongoDB, embed data that belongs to a parent document instead of joining. MongoEngine's tutorial stores comments as an [`EmbeddedDocument`](https://docs.mongoengine.org/tutorial.html#comments) inside a post, and Django MongoDB Backend's FAQ calls [embedded models](https://django-mongodb-backend.readthedocs.io/en/latest/faq/#querying-across-relational-fields-like-foreignkey-and-manytomanyfield-is-really-slow-is-there-a-way-to-improve-the-speed-of-these-joins) the best practice for relational data.

### More SQLAlchemy resources

For more SQLAlchemy tools, see [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy).
