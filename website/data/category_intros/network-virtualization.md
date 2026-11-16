For Python network automation, Netmiko sends CLI commands over SSH to many vendors' devices, and NAPALM gives several platforms one API. Scapy crafts raw packets.

How to choose:

- CLI commands over SSH, on many vendors' devices: Netmiko
- A device NAPALM has no driver for: Netmiko
- One API across platforms, for device data and config changes: NAPALM
- Crafting, sending, sniffing, or dissecting packets: Scapy

### Netmiko

Pick Netmiko to run show commands and config changes on network devices, across [a very broad set of platforms](https://github.com/ktbyers/netmiko#why-netmiko). It's built on Paramiko and handles the low-level state control, so you write little regex pattern matching yourself. Describe the device in a dict keyed by `device_type` and [pass it to `ConnectHandler`](https://github.com/ktbyers/netmiko#getting-started-1). Then `send_command()` returns what a show command prints, and `send_config_set()` enters config mode and sends your lines.

### NAPALM

Pick NAPALM when you manage several network platforms and want [a unified API](https://napalm.readthedocs.io/en/latest/) for all of them. It covers fewer devices than Netmiko, though. Load the driver for your platform with `get_network_driver()`. Each getter returns the dictionary [the `NetworkDriver` base class documents](https://napalm.readthedocs.io/en/latest/base.html#napalm.base.base.NetworkDriver.get_facts), so `get_facts()` gives the same keys on each core platform. Config changes follow one workflow: load a candidate that [replaces the config entirely or merges into it](https://napalm.readthedocs.io/en/latest/tutorials/changing_the_config.html), check the diff with `compare_config()`, then commit or discard it. To undo a commit, call `rollback()`. Before you deploy config this way, NAPALM's docs say to [try to break things on a lab first](https://napalm.readthedocs.io/en/latest/support/index.html#configuration-support-matrix).

### Scapy

Pick Scapy when you work with the packets themselves rather than a device's CLI or API. It [sends, sniffs, dissects, and forges network packets](https://scapy.readthedocs.io/en/latest/introduction.html#about-scapy), from its interactive shell or as a library. You build a packet by stacking layers, like `IP(dst="10.0.0.1")/ICMP()`. Each field has a default you can override. A reply comes back as the whole decoded packet instead of a verdict like "port closed". So you can probe once and read the answers many ways. To use it in your own tool, [import what you need from `scapy.all`](https://scapy.readthedocs.io/en/latest/extending.html#using-scapy-in-your-tools) and call a function like `sr1()`, which sends a packet and returns its reply.
