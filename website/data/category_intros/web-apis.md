FastAPI is the Python API framework for a new standalone service. In a Django project, use Django REST framework, or Django Ninja for type-hinted endpoints.

How to choose:

- A new standalone API: FastAPI
- A REST API in a Django project: Django REST framework
- Type hints and Pydantic in Django: Django Ninja
- GraphQL over Django models: Strawberry Django
- Django schemas in msgspec or Pydantic: django-modern-rest
- Flask with Swagger docs from decorators: Flask-RESTX
- Flask with marshmallow schemas: flask-smorest
- Flask with Pydantic models: APIFlask
- A GraphQL API: Strawberry
- Writing the OpenAPI spec first: Connexion
- Calls between your own backend services: gRPC

### FastAPI

Pick FastAPI for a new API that doesn't live inside a Django project. You declare parameters and request bodies once, as type-hinted function arguments, and FastAPI validates requests and generates interactive OpenAPI docs from those same declarations. Pass on it if you want Django's ORM, admin, and auth, and pick a Django toolkit instead. Once the app outgrows one file, split it into [`APIRouter` modules](https://fastapi.tiangolo.com/tutorial/bigger-applications/). For a full-stack site that renders HTML pages, look at the [web frameworks](/categories/web-frameworks/) instead.

### Django REST framework

Pick Django REST framework for an API inside a Django project, especially one that's mostly CRUD over your models. It also has a much larger ecosystem of third-party packages than Django Ninja. Start the way its quickstart does: group a model's endpoints into a ViewSet and [register it with a router](https://www.django-rest-framework.org/tutorial/quickstart/), which writes the URL conf for you.

### Django Ninja

Pick Django Ninja for new Django code written FastAPI's way: type-hinted function arguments, Pydantic validation, and generated OpenAPI docs. You don't have to leave Django REST framework to try it. A `NinjaAPI` instance is just another entry in `urls.py`, so it runs next to your existing API URLs and you can [adopt it one endpoint at a time](https://django-ninja.dev/motivation/).

### django-modern-rest

Pick django-modern-rest for typed, validated schemas on both requests and responses, in the schema library you choose. It bundles serializers for Pydantic and msgspec, and you can write your own for other libraries. It runs in both of Django's modes, sync and async, the same way plain Django does. Each endpoint group is a [`Controller`](https://django-modern-rest.readthedocs.io/en/latest/pages/core-concepts.html), a subclass of Django's `View`, so it goes into your URL routing like any other view.

### Strawberry Django

Pick Strawberry Django for a GraphQL API over Django models, the integration [Strawberry's docs recommend](https://strawberry.rocks/docs/integrations/django) for the Django ORM. Decorate a class with `@strawberry_django.type` and it infers each field's type from the model.

### Flask-RESTX

Pick Flask-RESTX to describe a Flask API with decorators and its own field models, and get Swagger docs from them. Each endpoint is a [`Resource` class](https://flask-restx.readthedocs.io/en/latest/quickstart.html) routed by its `@api.route` decorator.

### flask-smorest

Pick flask-smorest for a Flask API built on marshmallow: it reads requests and writes responses through marshmallow schemas, and builds the OpenAPI spec from them. Its docs ask you to split the app into Blueprints and write each endpoint as a Flask [`MethodView` class](https://flask-smorest.readthedocs.io/en/latest/quickstart.html).

### APIFlask

Pick APIFlask for a Flask API with Pydantic models, since it [supports both Pydantic models and marshmallow schemas](https://apiflask.com/). It's a framework rather than an extension, so you replace the `Flask` class with `APIFlask` and keep using your Flask extensions.

### Strawberry

Pick Strawberry for a GraphQL API, which pays off when clients need to pick exactly the fields they fetch. For plain resources that HTTP caching can serve, REST stays simpler. FastAPI's docs [recommend Strawberry](https://fastapi.tiangolo.com/how-to/graphql/) because it is built on type annotations, like FastAPI itself. Strawberry is [code-first](https://strawberry.rocks/docs/general/schema-basics): you write the schema as `@strawberry.type` classes, on top of dataclasses and type hints.

### Connexion

Pick Connexion when you [write the OpenAPI spec first](https://connexion.readthedocs.io/en/latest/) and want the server held to it. Client and server teams can then build in parallel against the agreed spec. Code-first frameworks like FastAPI go the other way and generate the spec from your code. For a new project, Connexion's docs recommend the [`AsyncApp`](https://connexion.readthedocs.io/en/latest/quickstart.html).

### gRPC

Pick gRPC for calls between your own backend services, especially ones written in different languages or that stream data. You [define the service once in a `.proto` file](https://grpc.io/docs/languages/python/basics/) and generate typed clients and servers from it, in Python with grpcio-tools.
