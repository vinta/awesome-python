Django saves you from building a Python admin panel: its admin comes built in. Flask-Admin and SQLAdmin add one to Flask and FastAPI apps.

How to choose:

- A Flask app: Flask-Admin
- SQLAlchemy models in FastAPI or Starlette: SQLAdmin
- A Django admin grown into dashboards and internal tools: Unfold
- A new look for the Django admin, on your stock ModelAdmin classes: Grappelli

Flask-Admin [gives each model a `ModelView`](https://flask-admin.readthedocs.io/en/latest/introduction/#adding-model-views): one `admin.add_view(ModelView(User, db.session))` line gets you list, create, and edit pages for it. To fit a model, [subclass `ModelView`](https://flask-admin.readthedocs.io/en/latest/introduction/#customizing-built-in-views) and set class attributes like `can_delete` or `column_list`. Expect fewer defaults than in Django's admin: [it's up to you to tell Flask-Admin](https://flask-admin.readthedocs.io/en/latest/advanced/#design-philosophy) what to display and how. Besides SQLAlchemy, it has [backends](https://flask-admin.readthedocs.io/en/latest/advanced/#using-different-database-backends) for Peewee, pymongo, and MongoEngine.

SQLAdmin brings Flask-Admin's approach to SQLAlchemy models on FastAPI or Starlette: Flask-Admin [inspired most of its features and configuration](https://smithyhq.github.io/sqladmin/#related-projects-and-inspirations). Create an `Admin` from your app and engine, then [write one `ModelView` subclass per model](https://smithyhq.github.io/sqladmin/#quickstart), declared with `model=User`, and register it with `admin.add_view`.

Unfold is a theme for Django's own admin, [made for building dashboards, internal tools, and business applications](https://github.com/unfoldadmin/django-unfold). Put `"unfold"` [before `django.contrib.admin`](https://unfoldadmin.com/docs/installation/quickstart/) in `INSTALLED_APPS`, then make your admin classes inherit from `unfold.admin.ModelAdmin`: the stock `ModelAdmin` leaves forms unstyled.

Grappelli is [a jazzy skin for the Django admin](https://django-grappelli.readthedocs.io/en/latest/) that also adds collapsibles, sortable inlines, and related and autocomplete lookups. Put `'grappelli'` [before `django.contrib.admin`](https://django-grappelli.readthedocs.io/en/latest/quickstart.html) in `INSTALLED_APPS`, and include `grappelli.urls`, which the lookups need. You switch features on with [attributes on your `admin.ModelAdmin` classes](https://django-grappelli.readthedocs.io/en/latest/customization.html#autocomplete-lookups), like `autocomplete_lookup_fields`.

By default, Django's admin [lets in only users with `is_staff` set](https://docs.djangoproject.com/en/stable/ref/contrib/admin/#overview). Flask-Admin and SQLAdmin leave access control to you: in Flask-Admin, [override `is_accessible`](https://flask-admin.readthedocs.io/en/latest/introduction/#rolling-your-own) on your views, and SQLAdmin [enforces no authentication](https://smithyhq.github.io/sqladmin/authentication/) until you pass it an `AuthenticationBackend`. Django's docs limit its admin to [an internal management tool](https://docs.djangoproject.com/en/stable/ref/contrib/admin/), and once you need a process-centric interface, they say to write your own views.
