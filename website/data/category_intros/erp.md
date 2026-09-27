Out of the box, Odoo's CRM, eCommerce, and accounting apps run alone or combine into a full Python ERP. Anything they lack, you add as a module.

How to choose:

- Trying Odoo, or customizing it without code: Odoo Online
- Writing your own modules: a source install
- Hosting your own modules in the cloud: Odoo.sh
- Free and open source: Odoo Community
- More features, with support and upgrades: Odoo Enterprise

Everything in Odoo starts and ends with modules, and [the main user-facing ones are flagged as Apps](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/01_architecture.html#odoo-modules). Odoo Enterprise is [extra modules installed on top of Community](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/01_architecture.html#odoo-editions). [Community is free and open source under the LGPL](https://www.odoo.com/documentation/latest/administration.html#editions). Enterprise is shared source, and its license [ties running it to an Enterprise subscription](https://www.odoo.com/documentation/latest/legal/licenses.html).

[Odoo Online](https://www.odoo.com/documentation/latest/administration/odoo_online.html) runs in your browser with nothing to install, and handles customizations that need no code. Your own modules need Odoo.sh or your own server. Odoo.sh is Odoo's official cloud platform, and it [builds your modules from a GitHub repository](https://www.odoo.com/documentation/latest/administration/odoo_sh/create_module.html).

To develop modules, Odoo's developer docs prefer [a source install](https://www.odoo.com/documentation/latest/developer/tutorials/setup_guide.html), which runs Odoo straight from its code. Odoo's logic is [written in Python, and it stores data only in PostgreSQL](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/01_architecture.html#multitier-application). Keep your modules in a directory of their own, and [start the server with `odoo-bin`](https://www.odoo.com/documentation/latest/administration/on_premise/source.html#running-odoo), adding that directory to `--addons-path`. Then work through [Server framework 101](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101.html), which builds one module chapter by chapter.

A module can [add new business logic or change what's already there](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/01_architecture.html#odoo-modules). To change a standard model, extend it from your own module: [model inheritance](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/12_inheritance.html#model-inheritance) adds fields and overrides methods on a model another module defines. Screens work the same way: [view inheritance](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/12_inheritance.html#view-inheritance) applies your extension views on top of the originals instead of overwriting them.

Before you write a module, [check whether Odoo already covers the case](https://www.odoo.com/documentation/latest/developer/tutorials/server_framework_101/02_newapp.html). A database with custom modules [can't be upgraded until they're ready for the new version](https://www.odoo.com/documentation/latest/administration/upgrade.html), so [cut what duplicates the standard modules](https://www.odoo.com/documentation/latest/developer/howtos/upgrade_custom_db.html#step-1-stop-the-developments).
