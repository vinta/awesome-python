Not every Python hardware library needs a board: pynput drives your keyboard and mouse, Bleak your Bluetooth LE devices. Jumpstarter automates hardware tests.

How to choose:

- Controlling or monitoring the keyboard and mouse: pynput
- Bluetooth Low Energy devices, like sensors: Bleak
- Automated tests on real or virtual hardware: Jumpstarter

pynput [controls and monitors input devices](https://pynput.readthedocs.io/en/latest/): the mouse and the keyboard. To send input, create a `Controller` and [call its methods](https://pynput.readthedocs.io/en/latest/keyboard.html#controlling-the-keyboard), like `press()`, `release()`, or `type()` for a whole string. To react to input, open a `Listener` with your callbacks in a `with` block and [call `join()`](https://pynput.readthedocs.io/en/latest/keyboard.html#monitoring-the-keyboard). In a GUI app with its own main loop, call `start()` instead, so your code keeps running.

Bleak is a [GATT client](https://bleak.readthedocs.io/en/latest/): it connects to Bluetooth Low Energy devices, like sensors, through one asynchronous, cross-platform API. Connect in an `async with BleakClient(...)` block and start your program with `asyncio.run()`. That's [the recommended way](https://bleak.readthedocs.io/en/latest/api/client.html#connecting-and-disconnecting), and the device disconnects even when your program is interrupted or raises. Scan the same way, in an [`async with BleakScanner(...)` block](https://bleak.readthedocs.io/en/latest/api/scanner.html#starting-and-stopping).

Jumpstarter is an [open source framework for hardware-in-the-loop testing](https://jumpstarter.dev/main/introduction/index.html#introduction) on physical hardware and virtual devices. A person in `jmp shell`, a pytest script, and a CI pipeline all use the same APIs. [Local mode](https://jumpstarter.dev/main/introduction/index.html#local-mode) needs no Kubernetes and suits one developer with the hardware at hand. [Distributed mode](https://jumpstarter.dev/main/introduction/index.html#distributed-mode) runs a Kubernetes-based controller that leases devices, so teams can share them, including from CI. Write tests on the `JumpstarterTest` base class from jumpstarter-testing, which [handles the connection](https://jumpstarter.dev/main/getting-started/guides/examples/testing.html#the-jumpstartertest-base-class) for you. Set a `selector` for the device you need: the class connects from inside `jmp shell`, or leases a matching device outside it.
