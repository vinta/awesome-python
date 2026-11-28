Send email from asyncio code with aiosmtplib, and from a Gmail script with yagmail. A Django app that sends through Amazon SES, Mailgun, or Postmark uses Anymail.

How to choose:

- Sending from asyncio code: aiosmtplib
- A script that sends from a Gmail account: yagmail
- A Django app on an email service like Amazon SES or Mailgun: django-anymail

### aiosmtplib

Pick aiosmtplib to send mail from asyncio code. It's an [async version of the `smtplib` module, with similar APIs](https://aiosmtplib.readthedocs.io/en/stable/). Its docs [recommend the `send()` coroutine for most use cases](https://aiosmtplib.readthedocs.io/en/stable/usage.html): build an `EmailMessage` and pass it in with your server's hostname and port. Where your server offers TLS from the start of the connection on port 465, [use that](https://aiosmtplib.readthedocs.io/en/stable/encryption.html) over a STARTTLS upgrade.

### Anymail

Pick Anymail when a Django app sends through a transactional email service and you want what the service's API offers [beyond SMTP](https://docs.djangoproject.com/en/stable/topics/email/#third-party-backends). Set its backend for your service as [its quickstart](https://anymail.dev/en/stable/quickstart/) shows, and Django's `send_mail()` sends through the service's API instead of SMTP. You get tags, metadata, template sends, and delivery events as Django signals, with [code that isn't locked to one service](https://anymail.dev/en/stable/). Tracking and inbound mail arrive through webhooks [open to the internet, so serve them over HTTPS with a webhook secret](https://anymail.dev/en/stable/installation/#configuring-tracking-and-inbound-webhooks).

### yagmail

Pick yagmail for a Gmail script when you'd rather not build the message yourself. Its `send()` takes a list of contents and [guesses what each item is](https://github.com/kootenpv/yagmail#magical-contents): a path to a PDF or image becomes an attachment, and an HTML string becomes HTML. Keep the password out of your script by [registering it in your system keyring](https://yagmail.readthedocs.io/en/latest/setup.html#configuring-credentials), or use [OAuth2 for credentials you can revoke](https://yagmail.readthedocs.io/en/latest/setup.html#using-oauth2). yagmail hands extra keyword arguments to `smtplib`, so pass `context=ssl.create_default_context()` to [verify the server's certificate](https://docs.python.org/3/library/ssl.html#best-defaults) before it logs in.
