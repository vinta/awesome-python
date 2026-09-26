Use SQLAlchemy for most projects, and the Django ORM inside Django. With FastAPI, use SQLModel, so your tables and API schemas share the same fields.

How to choose:

- Any framework, or full control over the SQL: SQLAlchemy
- A Django project: the Django ORM, which needs Django's settings even outside a web app
- A FastAPI app: SQLModel
- A simple ORM with few concepts to learn: peewee
- MongoDB: Beanie for async code, MongoEngine for sync code
- DynamoDB: PynamoDB

With SQLAlchemy, write [typed models](https://docs.sqlalchemy.org/en/latest/orm/declarative_styles.html) with `DeclarativeBase`, `Mapped[]`, and `mapped_column()`. Create one `sessionmaker` at startup and open one session per request. Load relationships with `selectinload()`, and run migrations with Alembic, which comes from the SQLAlchemy project itself.

Sync code is the safe default, even in an async framework. FastAPI's own docs put it plainly: ["If you just don't know, use normal `def`."](https://fastapi.tiangolo.com/async/) If you do go async, give each task its own `AsyncSession`.

In Django, let `makemigrations` and `migrate` own the schema, and use `select_related()` or `prefetch_related()` whenever you touch related rows. Reach for raw SQL last: ["Explore the ORM before using raw SQL!"](https://docs.djangoproject.com/en/stable/topics/db/sql/)

With SQLModel, follow its FastAPI tutorial: a base model for the shared fields, a `table=True` model for the database, and [separate models for create, read, and update](https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/). When you outgrow it, plug SQLAlchemy in directly.

For MongoDB and DynamoDB, model around your queries, not your tables. MongoDB's rule is that ["data that's accessed together should be stored together."](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/) AWS goes further: [don't design a DynamoDB schema](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html) until you know the questions it needs to answer.
