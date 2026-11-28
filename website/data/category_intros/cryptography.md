Default to cryptography, the general-purpose Python cryptography library. For public-key encryption between two parties, PyNaCl's Box makes the choices for you.

How to choose:

- Encrypting data with one secret key: cryptography's Fernet
- Keys and certificates that other systems must read, like X.509: cryptography
- Public-key encryption between two parties: PyNaCl
- NaCl's design, with the algorithms already picked: PyNaCl
- SSH at a low level, or an SSH server in Python: Paramiko
- Links and cookies you sign but don't need to hide: ItsDangerous

### cryptography

Pick cryptography as your default, and for anything that has to work with other systems, like [X.509 certificates](https://cryptography.io/en/stable/x509/). It has two layers, and its docs recommend [the recipes layer whenever possible](https://cryptography.io/en/stable/#layout). Recipes need few decisions, while the low-level "hazmat" primitives are easy to use incorrectly. For secret-key encryption, that recipe is [`Fernet`](https://cryptography.io/en/stable/fernet/), and a message encrypted with it can't be read or changed without the key.

### PyNaCl

Pick PyNaCl for public-key encryption between two parties, or whenever you'd take NaCl's design over a general-purpose library. cryptography's FAQ says NaCl features a collection of hand-selected algorithms, and [recommends PyNaCl](https://cryptography.io/en/stable/faq/#how-does-cryptography-compare-to-nacl-networking-and-cryptography-library) if you prefer that design. It comes from the same PyCA team as cryptography. Its [`Box`](https://pynacl.readthedocs.io/en/latest/public/#nacl-public-box) encrypts with your private key and the other party's public key. It authenticates both sides, so the receiver can spot a forgery.

### Paramiko

Use Paramiko directly when you need [low-level SSH primitives or an SSH server in Python](https://www.paramiko.org/). For running remote commands or transferring files, its docs recommend a higher-level library built on it instead. Clients start from an [`SSHClient`](https://docs.paramiko.org/en/latest/api/client.html#paramiko.client.SSHClient). As a client, [checking the server's host key is your job](https://docs.paramiko.org/en/latest/), and by default a server missing from your known hosts gets rejected.

### ItsDangerous

Pick ItsDangerous to send data somewhere untrusted, like a URL or a cookie, and get it back unchanged. It signs the data, so the receiver [can see it but can't modify it](https://itsdangerous.palletsprojects.com/en/stable/) without your key. When the contents must stay secret too, encrypt them with cryptography's Fernet, which also catches tampering. Its docs say you'll [typically want a serializer](https://itsdangerous.palletsprojects.com/en/stable/concepts/#serializer-vs-signer), like `URLSafeSerializer` for links. Sign each kind of token with [its own salt](https://itsdangerous.palletsprojects.com/en/stable/concepts/#the-salt), so a token from an account activation link can't also upgrade the account. For standard JWTs, its docs point you to [a dedicated JWT library](https://itsdangerous.palletsprojects.com/en/stable/changes/) instead.

### Generating and storing keys

When you make a key yourself, take its bytes from `os.urandom()`. cryptography's docs [recommend the operating system's random number generator](https://cryptography.io/en/stable/random-numbers/) over the `random` module, and ItsDangerous's docs generate a key the same way. Keep keys out of source code and version control, and [read them from an environment variable](https://itsdangerous.palletsprojects.com/en/stable/concepts/#the-secret-key).
