Type hints alone let FastAPI validate requests and document your API. Python API frameworks for Django include Django Ninja, which reads them too.

How to choose:

- A new API, not tied to Django or Flask: FastAPI
- Typed endpoints in a Django project: Django Ninja
- CRUD endpoints over Django models, with a browsable API: Django REST framework
- GraphQL types generated from Django models: Strawberry Django
- msgspec, attrs, or dataclass schemas on Django: django-modern-rest
- Flask resources grouped into namespaces, with Swagger docs: Flask-RESTX
- marshmallow schemas on Flask blueprints: flask-smorest
- A Flask app validated with Pydantic models or marshmallow: APIFlask
- GraphQL on FastAPI or any other framework: Strawberry
- An OpenAPI spec written before the code: Connexion
- Calls between services written in different languages: gRPC

FastAPI is [based on standard Python type hints](https://fastapi.tiangolo.com/). Declare path, query, and body parameters as typed function arguments, and it validates them and serves interactive docs at `/docs`. As the app grows, split it into modules with [`APIRouter`, a "mini FastAPI"](https://fastapi.tiangolo.com/tutorial/bigger-applications/).

Django Ninja was [heavily inspired by FastAPI](https://django-ninja.dev/) and integrates with Django's core and ORM. You declare parameter and body types once, as function arguments, and the interactive docs show up at `/api/docs`. For a bigger project, [create an `api.py` with a `Router` in each Django app](https://django-ninja.dev/guides/routers/).

Django REST framework [splits an API into](https://www.django-rest-framework.org/) serializers for the representation, viewsets for the behavior, and routers for the URLs. [Viewsets get you running quickly](https://www.django-rest-framework.org/api-guide/viewsets/) and keep URLs consistent across a large API, while plain views are more explicit. For OpenAPI schemas, its docs [recommend drf-spectacular](https://www.django-rest-framework.org/topics/documenting-your-api/).

APIFlask has you [use `APIFlask` instead of `Flask`](https://apiflask.com/), then declare request and response schemas with [`@app.input` and `@app.output`](https://apiflask.com/usage/). flask-smorest [organizes resources as `MethodView` classes in blueprints](https://flask-smorest.readthedocs.io/en/latest/quickstart.html), with marshmallow schemas on `Blueprint.arguments` and `Blueprint.response`. Flask-RESTX [splits your app into reusable namespaces](https://flask-restx.readthedocs.io/en/latest/scaling.html), much like blueprints, and describes them for Swagger through decorators.

Strawberry [builds on dataclasses and type hints](https://strawberry.rocks/docs), and FastAPI's docs [recommend it for GraphQL](https://fastapi.tiangolo.com/how-to/graphql/). Before going to production, [disable GraphiQL and introspection](https://strawberry.rocks/docs/operations/deployment), and turn on Strawberry's security extensions that limit query depth, aliases, and tokens.

Strawberry Django [creates GraphQL types from your Django models](https://strawberry.rocks/docs/django). Add its [`DjangoOptimizerExtension`](https://strawberry.rocks/docs/django/guide/optimizer), which calls `select_related()` and `prefetch_related()` for you to avoid N+1 queries.

Connexion flips the usual order: you [write the OpenAPI spec first](https://connexion.readthedocs.io/en/latest/), then the code, and Connexion validates requests against the spec. Each `operationId` in the spec [names the Python function that handles it](https://connexion.readthedocs.io/en/latest/routing.html). Start new projects on [`AsyncApp`, or on `FlaskApp` to use the Flask ecosystem](https://connexion.readthedocs.io/en/latest/quickstart.html).

gRPC lets you [define a service once in a `.proto` file](https://grpc.io/docs/languages/python/basics/) and generate clients and servers in any language it supports. For asyncio code, gRPC has [`grpc.aio`](https://grpc.github.io/grpc/python/grpc_asyncio.html).
