Build your Python CMS on Wagtail, where editors fill in pages you define in code. Pick django CMS if editors must click and edit content on the live page.

How to choose:

- Editors fill in structured pages in an admin: Wagtail
- Editors compose pages on the live site: django CMS

### Wagtail

Pick Wagtail over django CMS for most sites: it's easier for editors to learn, and better at structured content. Its docs ask you to [give each kind of content its own page type](https://docs.wagtail.org/en/stable/getting_started/the_zen_of_wagtail.html#a-cms-should-get-information-out-of-an-editor-s-head-and-into-a-database-as-efficiently-and-directly-as-possible), like an Event page with date and location fields. Editors fill those in, while design and layout stay in your code. For pages without a fixed structure, like blog posts, [StreamField](https://docs.wagtail.org/en/stable/topics/streamfield.html) lets editors stack headings, images, and quotes as blocks in any order. Start with [`wagtail start mysite`](https://docs.wagtail.org/en/stable/getting_started/tutorial.html).

### django CMS

Pick django CMS when your editors want to click and edit content where it appears on the site. It [gives editors a toolbar on the live site](https://docs.django-cms.org/en/stable/explanation/philosophy.html), where they build pages by dropping reusable plugins into placeholders. Start with [`djangocms mysite`](https://docs.django-cms.org/en/stable/). For a very small or static site, its docs call it [overkill](https://docs.django-cms.org/en/stable/explanation/philosophy.html#when-django-cms-may-not-be-the-right-fit): a [static site generator](/categories/static-site-generators/) is lighter.

### Who builds the site

Neither one is a no-code site builder. Wagtail's docs say [you should expect to write code](https://docs.wagtail.org/en/stable/getting_started/the_zen_of_wagtail.html#wagtail-is-not-an-instant-website-in-a-box), and django CMS calls itself [a developer's CMS](https://docs.django-cms.org/en/stable/explanation/philosophy.html#when-django-cms-may-not-be-the-right-fit). So plan on someone who writes Django to set up the page types or plugins your editors use.
