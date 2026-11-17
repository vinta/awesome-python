With permission to test a web app, intercept its traffic in mitmproxy and test its inputs for SQL injection with sqlmap: two Python penetration testing tools.

How to choose:

- Intercepting, inspecting, and scripting HTTP(S) traffic: mitmproxy
- Detecting and exploiting SQL injection in a web app: sqlmap
- Windows network protocols like SMB, MSRPC, and Kerberos: Impacket
- Writing exploits and solving CTF challenges: pwntools
- Finding a username's accounts across social networks: Sherlock

mitmproxy is [an interactive, SSL/TLS-capable intercepting proxy](https://docs.mitmproxy.org/stable/) with 3 front ends to the same core: mitmproxy in the console, mitmweb in the browser, and mitmdump on the command line. It [starts as a regular HTTP proxy on localhost:8080](https://docs.mitmproxy.org/stable/overview/getting-started/), so point your browser or device at it, then visit mitm.it to install the mitmproxy CA certificate, which lets it decrypt HTTPS. To script the traffic, write an [addon](https://docs.mitmproxy.org/stable/addons/overview/): a module with a `request(flow)` function is enough. Load it with `-s`.

sqlmap [automates detecting and exploiting SQL injection flaws and taking over database servers](https://github.com/sqlmapproject/sqlmap). Pass it a URL with a parameter, and it [finds the vulnerable parameter, the injection techniques that work, and the back-end database](https://github.com/sqlmapproject/sqlmap/wiki/Introduction).

Impacket is [a collection of Python classes for working with network protocols](https://github.com/fortra/impacket), with low-level access to packets and, for protocols like SMB and MSRPC, the protocol implementation itself. The scripts it ships are [tools written as examples of what the library can do](https://github.com/fortra/impacket/tree/master/examples).

pwntools is [a CTF framework and exploit development library](https://github.com/Gallopsled/pwntools), split into [2 modules](https://docs.pwntools.com/en/stable/about.html): `pwn` for CTFs and `pwnlib` as a clean Python library. `from pwn import *` gives you everything you need to write an exploit, but it also puts your terminal in raw mode and parses `sys.argv`, so import `pwnlib` when pwntools is part of another project. Either way, [tubes](https://docs.pwntools.com/en/stable/intro.html#making-connections) give you one interface to talk to processes, sockets, and SSH sessions.

Sherlock [hunts down social media accounts by username](https://github.com/sherlock-project/sherlock). Run `sherlock user123`, or pass several usernames at once, and it [saves the accounts it finds to a text file per username](https://github.com/sherlock-project/sherlock#general-usage), like `user123.txt`.

Run any of these tools only against systems you own or have explicit permission to test. That's [sqlmap's answer to where to practice](https://github.com/sqlmapproject/sqlmap/wiki/FAQ#where-can-i-practise-using-sqlmap), and every sqlmap run prints a disclaimer that attacking targets without prior mutual consent is illegal.
