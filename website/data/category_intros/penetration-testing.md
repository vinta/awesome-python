Intercept HTTPS traffic with mitmproxy, test a web app for SQL injection with sqlmap, and script Windows protocols with impacket. pwntools writes CTF exploits.

How to choose:

- Intercepting and changing HTTPS traffic, by hand or from a Python script: mitmproxy
- Testing a web app for SQL injection: sqlmap
- Windows and Active Directory protocols, like SMB and Kerberos: impacket
- Exploit scripts for CTF challenges: pwntools
- Finding which sites have an account under a username: sherlock-project

### mitmproxy

Pick mitmproxy to [intercept, inspect, modify, and replay web traffic](https://mitmproxy.org/), especially when a script should make the changes instead of you. It comes as three tools: mitmweb for a browser GUI, mitmproxy for a terminal UI, and mitmdump for plain terminal output. To decrypt HTTPS, the client has to trust mitmproxy's certificate authority, and [its built-in certificate installation app](https://docs.mitmproxy.org/stable/concepts/certificates/) is the easiest way to set that up. To change traffic from Python, [write an addon](https://docs.mitmproxy.org/stable/addons/overview/): a function like `request()` runs on every request, and any of the three tools can load it.

### sqlmap

Pick sqlmap to [detect and exploit SQL injection flaws](https://github.com/sqlmapproject/sqlmap) automatically, like those in a web app's GET or POST parameters. Rather than passing a request's cookies and POST data as options, save the raw request to a file and [load it with `-r`](https://github.com/sqlmapproject/sqlmap/wiki/Usage#load-http-request-from-a-file).

### impacket

Pick impacket to work with Windows network protocols from Python, like SMB, MSRPC, and NTLM or Kerberos authentication. It's a [collection of Python classes](https://github.com/fortra/impacket) for those protocols. The tools it ships are [examples](https://github.com/fortra/impacket/tree/master/examples) of what the library can do, and installing it adds them as commands. Pass on it for code you ship: its disclaimer says it's [not meant for production environments or commercial products](https://github.com/fortra/impacket#disclaimer).

### pwntools

Pick pwntools to [write exploits](https://docs.pwntools.com/en/latest/) for CTF challenges. Its docs start an exploit script with `from pwn import *`, which imports everything you need into one namespace. When pwntools is part of another software project, [import pwnlib instead](https://docs.pwntools.com/en/latest/about.html#pwnlib-normal-python-library), which mostly gives you only the parts you import.

### Sherlock

Pick Sherlock to find which social networks have an account under a username. Run [`sherlock user123`](https://sherlockproject.xyz/usage).

### Testing with permission

Run these tools only against systems you own or have written permission to test. sqlmap's [legal disclaimer](https://github.com/sqlmapproject/sqlmap/blob/master/lib/core/settings.py) says attacking targets without prior mutual consent is illegal, and following the law is your responsibility.
