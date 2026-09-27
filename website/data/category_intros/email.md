One function call sends mail through Gmail or another SMTP server with yagmail. This Python email library aims to make sending mail painless.

How to choose:

- Gmail: yagmail, with an app password or OAuth2
- Another SMTP server: yagmail, pointed at its host
- An asyncio app: yagmail's async client

yagmail is a [wrapper around smtplib's SMTP connection](https://yagmail.readthedocs.io/en/latest/api.html#yagmail.Client) that connects to Gmail unless you pass another `host`. It builds the message for you: call `send()` with the recipients, a subject, and `contents`, a list whose strings it [reads as a local file, HTML, or text](https://yagmail.readthedocs.io/en/latest/usage.html#magical-contents). So one call sends text, HTML, and attachments. Wrap a string in `yagmail.raw` when it must stay plain text. In asyncio code, use its async client [as an async context manager](https://yagmail.readthedocs.io/en/latest/usage.html#starting-and-closing-connections).

Keep your password out of your script. Install `yagmail[all]` to get keyring, then [register your credentials once](https://yagmail.readthedocs.io/en/latest/setup.html#configuring-credentials) with `yagmail.register()`, and yagmail reads them from your system keyring. For Gmail, that password is an app password. For credentials you can revoke, [use OAuth2](https://yagmail.readthedocs.io/en/latest/setup.html#using-oauth2): whoever gets its token file can send mail, but nothing else.
