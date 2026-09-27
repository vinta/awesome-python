Outside Django, declare each FastAPI endpoint with type hints. Django projects add a Python API framework on top instead: Django REST framework or Django Ninja.

How to choose:

- Django, with CRUD endpoints over your models: Django REST framework
- Django, with endpoints declared by type hints: Django Ninja
- A new service outside Django: FastAPI
- GraphQL over Django models: Strawberry GraphQL Django
- Django, with msgspec, attrs, or dataclass schemas: django-modern-rest
- A Flask app: APIFlask
- An OpenAPI spec written before the code: Connexion
- GraphQL on FastAPI, Flask, or another framework: Strawberry
- RPC between services in any language: gRPC

Django REST framework adds serializers and a [browsable API](https://www.django-rest-framework.org/) to Django. For CRUD over your models, [group the views in a `ModelViewSet` and register it with a router](https://www.django-rest-framework.org/tutorial/quickstart/). For an OpenAPI schema, its docs [recommend drf-spectacular](https://www.django-rest-framework.org/topics/documenting-your-api/#drf-spectacular). By default, the API [allows unrestricted access](https://www.django-rest-framework.org/api-guide/permissions/#setting-the-permission-policy), so set a policy in `DEFAULT_PERMISSION_CLASSES`.

Django Ninja is [heavily inspired by FastAPI](https://django-ninja.dev/motivation/) and works with Django's ORM, URLs, views, and auth. You write each endpoint as a function with type hints, and it [generates the OpenAPI docs](https://django-ninja.dev/) from them. Run async views on [an ASGI server](https://django-ninja.dev/guides/async-support/). If you use Django's cookie-based auth, [keep Django's CSRF protection on](https://django-ninja.dev/reference/csrf/#use-djangos-built-in-csrf-protection).

FastAPI builds [request validation and OpenAPI docs from standard type hints](https://fastapi.tiangolo.com/), on top of Pydantic and Starlette. Install `fastapi[standard]`, which brings Uvicorn and the `fastapi` command: run `fastapi dev` while you work and [`fastapi run` in production](https://fastapi.tiangolo.com/fastapi-cli/).

Strawberry GraphQL Django [builds types from your Django models](https://strawberry.rocks/docs/django), while Strawberry alone [only provides a GraphQL view](https://strawberry.rocks/docs/integrations/django) for Django. Add its [query optimizer](https://strawberry.rocks/docs/django/guide/optimizer), which calls `select_related()` and `prefetch_related()` for you to avoid N+1 queries.

django-modern-rest [drops into an existing Django app](https://django-modern-rest.readthedocs.io/en/latest/) and validates both requests and responses against your schemas: msgspec, Pydantic, attrs, dataclasses, and more. Its docs [recommend always installing msgspec](https://django-modern-rest.readthedocs.io/en/latest/pages/getting-started.html#installation) to parse JSON, even when your schemas are Pydantic models.

APIFlask is a [thin wrapper on Flask](https://apiflask.com/migrations/flask/): swap `Flask` for `APIFlask` and `Blueprint` for `APIBlueprint`, and your [Flask extensions keep working](https://apiflask.com/comparison/#apiflask-vs-fastapi). Declare each endpoint's input and output with `@app.input()` and `@app.output()`, as [marshmallow schemas or Pydantic models](https://apiflask.com/), and APIFlask generates the OpenAPI docs from them.

Connexion is spec-first: you write the OpenAPI spec, and Connexion [routes and validates requests against it](https://connexion.readthedocs.io/en/latest/#why-connexion), so server and client can be built in parallel. FastAPI goes the other way, and its maintainer says it's [not meant for writing the schema first](https://github.com/fastapi/fastapi/discussions/6169). Start a new project on [`AsyncApp`](https://connexion.readthedocs.io/en/latest/quickstart.html#creating-your-application), or on `FlaskApp` to keep the Flask ecosystem.

Strawberry builds a GraphQL schema from [dataclasses and type hints](https://strawberry.rocks/docs), and FastAPI's docs [recommend it for GraphQL](https://fastapi.tiangolo.com/how-to/graphql/#graphql-with-strawberry). Before you deploy, [turn off GraphiQL and introspection](https://strawberry.rocks/docs/operations/deployment), and add the [security extensions](https://strawberry.rocks/docs/operations/deployment#security-extensions) that limit query depth, aliases, and tokens.

gRPC has you [define a service once in a `.proto` file](https://grpc.io/docs/languages/python/basics/) and generate its clients and servers in any language gRPC supports. Install `grpcio` and `grpcio-tools`, and [compile the `.proto` file into Python code with `grpc_tools.protoc`](https://grpc.io/docs/languages/python/quickstart/). [Use TLS](https://grpc.io/docs/guides/auth/) to authenticate the server and encrypt the traffic.

Keep separate models for what an endpoint takes in and what it sends back. FastAPI [filters the response through the output model](https://fastapi.tiangolo.com/tutorial/response-model/#add-an-output-model), so fields the output model leaves out, like a password, never reach the client. APIFlask [recommends separate input and output schemas](https://apiflask.com/schema/#marshmallow) too.
