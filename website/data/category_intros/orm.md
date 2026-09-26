SQLAlchemy is the Python ORM for most projects, and Django projects use the Django ORM. On MongoDB, pick Beanie for async code and MongoEngine for sync.

How to choose:

- A Django project: Django ORM
- Any other app on a relational database: SQLAlchemy
- A FastAPI app with simple tables: SQLModel
- A small app that wants one module and no dependencies: peewee
- MongoDB from async code: Beanie
- MongoDB from sync code: MongoEngine
- Amazon DynamoDB: PynamoDB

SQLAlchemy follows the [data mapper pattern](https://www.sqlalchemy.org/philosophy.html), so your classes and your schema can change separately. Open the Session [in a `with` block](https://docs.sqlalchemy.org/en/latest/orm/quickstart.html), and [keep its lifecycle outside](https://docs.sqlalchemy.org/en/latest/orm/session_basics.html) the functions that read or write data: one Session per thread, one AsyncSession per task. To avoid N+1 queries, load related objects up front with [eager loading](https://docs.sqlalchemy.org/en/latest/orm/queryguide/relationships.html).

The Django ORM follows the [Active Record pattern](https://docs.djangoproject.com/en/stable/misc/design-philosophies/): each model holds both the fields and the behavior of its data. Before you optimize, [find out what queries you run](https://docs.djangoproject.com/en/stable/topics/db/optimization/) and what they cost.

SQLModel is [designed for FastAPI apps](https://sqlmodel.tiangolo.com/): one class is both a Pydantic model and a SQLAlchemy model. Get the session from a [FastAPI dependency](https://sqlmodel.tiangolo.com/tutorial/fastapi/session-with-dependency/), so each request gets its own. When you need more complex features, [plug SQLAlchemy in directly](https://sqlmodel.tiangolo.com/features/).

For a small app, peewee is a [single module with no required dependencies](https://docs.peewee-orm.com/en/latest/), with few concepts to learn. In a web app, [open a connection per request](https://docs.peewee-orm.com/en/latest/peewee/database.html) and close it when the request ends. Once traffic grows, [switch to a pooled database](https://docs.peewee-orm.com/en/latest/peewee/framework_integration.html).

On the NoSQL side, Beanie is an [async MongoDB ODM built on Pydantic](https://beanie-odm.dev/), with one Document class per collection. Pass your document models to [`init_beanie()`](https://beanie-odm.dev/tutorial/initialization/), which creates the collections and the indexes you declared.

MongoEngine is the sync pick: it's [built on PyMongo only](https://mongoengine-odm.readthedocs.io/faq.html) and doesn't support async drivers. Its document schemas are [enforced in your app, not by MongoDB](https://mongoengine-odm.readthedocs.io/tutorial.html), and they catch wrong types and missing fields.

PynamoDB is a [Pythonic interface to DynamoDB](https://pynamodb.readthedocs.io/en/stable/). Build on its [Model API](https://pynamodb.readthedocs.io/en/stable/tutorial.html): one model class per table, each with a hash key. For tests, point it at a [local DynamoDB-compatible server](https://pynamodb.readthedocs.io/en/stable/local.html).

Track schema changes in migrations: Django [has them built in](https://docs.djangoproject.com/en/stable/topics/migrations/), SQLAlchemy has [Alembic](https://alembic.sqlalchemy.org/en/latest/), and Beanie [ships its own](https://beanie-odm.dev/tutorial/migrations/). Review every migration Alembic's autogenerate writes, since it's [not meant to be perfect](https://alembic.sqlalchemy.org/en/latest/autogenerate.html).
