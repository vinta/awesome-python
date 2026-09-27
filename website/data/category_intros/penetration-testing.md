Only run sqlmap and SET against targets you're authorized to test. Like mitmproxy and Sherlock, they're Python penetration testing tools with one job each.

How to choose:

- Testing a web app for SQL injection: sqlmap
- Testing user awareness in social-engineering assessments: Social-Engineer Toolkit (SET)
- Inspecting, changing, or scripting HTTP and HTTPS traffic: mitmproxy
- Finding which social networks a username is registered on: Sherlock

sqlmap [automates detecting and exploiting SQL injection flaws](https://github.com/sqlmapproject/sqlmap) and taking over database servers. Its docs prefer [cloning the Git repository](https://github.com/sqlmapproject/sqlmap/wiki/Download-and-update) to installing from PyPI: `git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev`. Run it from that checkout, where `python sqlmap.py -h` lists the basic options, and read the [user's manual](https://github.com/sqlmapproject/sqlmap/wiki/Usage) for the rest.

The Social-Engineer Toolkit (SET) is [a penetration testing framework for authorized social-engineering assessments](https://github.com/trustedsec/social-engineer-toolkit). It gives security teams guided attack vectors to test user awareness and run consent-based red-team exercises. On Kali Linux or WSL, install it with `sudo apt install set`. Elsewhere, install a source checkout into a virtual environment. Then `sudo setoolkit` launches its interactive console.

mitmproxy is [an interactive, TLS-capable intercepting proxy](https://docs.mitmproxy.org/stable/). It comes as three front ends to one core: the mitmproxy console, the mitmweb browser GUI, and mitmdump on the command line. The first two keep every flow in memory, so they're for small samples, while mitmdump records traffic and transforms it programmatically. On macOS, [install it](https://docs.mitmproxy.org/stable/overview/installation/) with `brew install --cask mitmproxy`. On Linux and Windows, download it from mitmproxy.org. It [starts as a regular HTTP proxy on localhost:8080](https://docs.mitmproxy.org/stable/overview/getting-started/): point your browser or device at it, then browse to mitm.it and install mitmproxy's certificate authority to see HTTPS traffic too. To change traffic in code, write a Python [addon](https://docs.mitmproxy.org/stable/addons/overview/#anatomy-of-an-addon) and load it with `-s`.

Sherlock [hunts down social media accounts by username](https://sherlockproject.xyz/) across social networks. Its docs [suggest pipx over pip](https://sherlockproject.xyz/installation): `pipx install sherlock-project`. Then `sherlock user123` [searches for one username](https://sherlockproject.xyz/usage), and `sherlock user1 user2 user3` for several. It saves the accounts it finds to a text file named after each username.

sqlmap and SET both put permission first. sqlmap calls [attacking targets without prior mutual consent illegal](https://github.com/sqlmapproject/sqlmap/wiki/License), and its FAQ says to practice [only against a target you own or have explicit permission to test](https://github.com/sqlmapproject/sqlmap/wiki/FAQ#where-can-i-practise-using-sqlmap). SET is [only for authorized testing](https://github.com/trustedsec/social-engineer-toolkit#responsible-use) where explicit permission and scope have been established, never against systems, accounts, networks, or people without consent.
