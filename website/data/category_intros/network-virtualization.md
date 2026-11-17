Netmiko is where to start with Python network automation libraries; when many vendors need one API, move to NAPALM. Scapy works a layer down, on raw packets.

How to choose:

- Running show and config commands on devices over SSH: Netmiko
- Config changes across vendors, with a diff before commit: NAPALM
- Forging, sending, sniffing, or dissecting packets: Scapy

Netmiko gathers show-command output and makes config changes [across a very broad set of platforms](https://github.com/ktbyers/netmiko#why-netmiko), and spares you most of the low-level regex matching on device prompts. Describe the device in a dict with its `device_type`, host, and credentials, and pass it to `ConnectHandler`, which [picks the right class and opens the SSH connection](https://pynet.twb-tech.com/blog/netmiko-python-library.html). Run show commands with `send_command()`, and config commands with `send_config_set()`, which [enters config mode for you](https://github.com/ktbyers/netmiko#getting-started-1).

NAPALM puts [a unified API over different network operating systems](https://napalm.readthedocs.io/en/latest/). Get a driver with `get_network_driver()` and open the device in a `with` block, which [the docs say to stick with for most situations](https://napalm.readthedocs.io/en/latest/tutorials/context_manager.html), since it opens and closes the session for you. To change config, load a candidate that replaces or merges into the running one, check it with `compare_config()`, then [commit or discard it](https://napalm.readthedocs.io/en/latest/tutorials/changing_the_config.html). The docs also say to [test your workflow and try to break things on a lab first](https://napalm.readthedocs.io/en/latest/support/index.html#configuration-support-matrix).

Scapy [sends, sniffs, dissects, and forges network packets](https://scapy.readthedocs.io/en/latest/introduction.html#about-scapy), as an interactive shell or as a library you import. Build a packet by [stacking layers with the `/` operator](https://scapy.readthedocs.io/en/latest/usage.html#stacking-layers), like `IP()/TCP()`, and override only the fields whose defaults you don't want. [Sending packets needs root privileges](https://scapy.readthedocs.io/en/latest/usage.html#starting-scapy), so start the shell with `sudo scapy`.
