Sending from Django, you learn no new Python email library API: django-anymail runs send_mail(). aiosmtplib and yagmail handle async code and Gmail scripts.

How to choose:

- A Django app sending through Amazon SES, Mailgun, Postmark, or another email service: django-anymail
- A Django app that tracks delivery or receives email through that service: django-anymail
- Async code talking to an SMTP server: aiosmtplib
- A script sending from Gmail, or any SMTP account, with attachments: yagmail

django-anymail extends Django's `django.core.mail` with features email services add, through [one API that doesn't lock your code to one service](https://anymail.dev/en/latest/). [Change Django's email backend to Anymail's backend for your service](https://anymail.dev/en/latest/installation/), and [`send_mail()`, `EmailMessage`, and even `mail_admins()`](https://anymail.dev/en/latest/sending/django_email/) send through it unchanged. Send from a background task, not the view: Anymail calls that a [best practice for sending email from Django](https://anymail.dev/en/latest/tips/transient_errors/), since your views respond faster. To track delivery or receive email, connect the service's webhooks to [Anymail's Django signals](https://anymail.dev/en/latest/sending/tracking/), and [protect them with https and a shared secret](https://anymail.dev/en/latest/tips/securing_webhooks/).

aiosmtplib is an [async version of smtplib](https://aiosmtplib.readthedocs.io/en/latest/), with similar APIs. Build each message as the standard library's `EmailMessage`, which makes headers easier to work with. Then pass it to the [`send()` coroutine](https://aiosmtplib.readthedocs.io/en/latest/usage.html), which the docs recommend for most use cases.

yagmail aims to make sending email as simple as possible, with Gmail as its default server. Its [contents argument is guessed](https://yagmail.readthedocs.io/en/latest/usage.html#magical-contents) item by item: a path to a local file becomes an attachment, valid HTML becomes HTML, and anything else is text. For Gmail, sign in with an [app password or OAuth2](https://github.com/kootenpv/yagmail).
