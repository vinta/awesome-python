Django ships its own admin panel, and Unfold and Grappelli theme it. Use Flask-Admin for Flask, and SQLAdmin for SQLAlchemy models in FastAPI or Starlette.

How to choose:

- Django's admin with dashboards and custom pages: Unfold
- Django's admin with a grid layout and drag-and-drop inlines: Grappelli
- A Flask app: Flask-Admin
- A FastAPI or Starlette app with SQLAlchemy models: SQLAdmin

### Unfold

Pick Unfold when you want more from Django's admin than a new look: it adds dashboards, custom pages, and widgets. After installing it, [switch your admin classes to `unfold.admin.ModelAdmin`](https://unfoldadmin.com/docs/installation/quickstart/), since the default class leaves forms unstyled.

### Grappelli

Pick Grappelli for a grid-based admin with a customizable dashboard, TinyMCE integration, and inlines you reorder by drag and drop. Its FAQ says that if you like how Django's admin already looks, [you probably shouldn't use it](https://django-grappelli.readthedocs.io/en/latest/faq.html). To start, [add `grappelli` to `INSTALLED_APPS` before `django.contrib.admin`](https://django-grappelli.readthedocs.io/en/latest/quickstart.html) and include its URLs.

### Flask-Admin

Pick Flask-Admin for a Flask app. It works with SQLAlchemy, other databases, and file stores. [Create a `ModelView` for each model](https://flask-admin.readthedocs.io/en/latest/introduction/#adding-model-views), and you get list, create, and edit pages for it.

### SQLAdmin

Pick SQLAdmin for SQLAlchemy models in a FastAPI or Starlette app, with sync or async engines. [Flask-Admin inspired it](https://smithyhq.github.io/sqladmin/#related-projects-and-inspirations), and most features and options work the same: subclass `ModelView` for each model and add it to the admin.

### Keeping the admin internal

Django's admin is for [an organization's internal management tool](https://docs.djangoproject.com/en/stable/ref/contrib/admin/), not your site's front end, and when your staff need a process instead of tables, write your own views.

Django has logins built in, but Flask-Admin and SQLAdmin leave them to you. Protect your data with Flask-Admin's [`is_accessible`](https://flask-admin.readthedocs.io/en/latest/introduction/#authorization-permissions) or SQLAdmin's [`AuthenticationBackend`](https://smithyhq.github.io/sqladmin/authentication/).
