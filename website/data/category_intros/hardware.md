Serial ports open with pySerial. Past those, pick a Python hardware library by the device you talk to, like Bleak for Bluetooth LE sensors.

How to choose:

- Serial ports on Windows, macOS, Linux, or BSD: pySerial
- Bluetooth Low Energy devices, like sensors: Bleak
- Controlling or monitoring the keyboard and mouse: pynput
- Global hotkeys: pynput
- Automated tests on real or virtual hardware, shared across a team or CI: Jumpstarter

pySerial is imported as `serial`, and `serial.Serial` opens a port as a context manager. [Set a timeout when you open it](https://pyserial.readthedocs.io/en/latest/shortintro.html#readline), or `readline()` can block forever when no newline arrives. The docs also suggest [`serial_for_url()`](https://pyserial.readthedocs.io/en/latest/pyserial_api.html#serial.serial_for_url) over creating `Serial` directly, so the same code takes a local port, a remote one, or a `loop://` loopback for your tests.

pynput sends input through a `Controller` and watches it through a `Listener`, for the keyboard and the mouse alike. A listener is a thread that runs your callbacks. On some platforms, notably Windows, a slow callback risks freezing input for every process, so [keep callbacks short](https://pynput.readthedocs.io/en/latest/keyboard.html#the-keyboard-listener-thread): hand events to a queue, and let another thread work through it.

Bleak is async, so [call `asyncio.run()` once](https://bleak.readthedocs.io/en/latest/troubleshooting.html#calling-asyncio-run-more-than-once) and do all your Bluetooth work in one async main function. Scan with `BleakScanner` and connect with `BleakClient`, each [in an `async with` block](https://bleak.readthedocs.io/en/latest/api/client.html#connecting-and-disconnecting), so the device disconnects when the block exits.

Jumpstarter puts your device behind an exporter, which manages its interfaces, and your tests reach it through a client. [Local mode](https://jumpstarter.dev/main/introduction/#local-mode) needs no Kubernetes or other infrastructure: run `jmp shell --exporter <name>`, then pytest inside it. When teams share hardware, especially in CI, distributed mode adds a Kubernetes-based controller that leases devices out. Write tests as subclasses of [`JumpstarterTest`](https://jumpstarter.dev/main/getting-started/guides/examples/testing.html), whose `client` fixture handles the connection.

Jumpstarter builds on the other picks: its serial driver runs on pySerial and takes the port [in pySerial's format](https://jumpstarter.dev/main/reference/package-apis/drivers/pyserial.html), and its Bluetooth LE driver runs on Bleak.
