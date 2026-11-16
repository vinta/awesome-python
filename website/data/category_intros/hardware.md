A serial-port device talks to Python through pySerial, and a Bluetooth Low Energy sensor through Bleak. pynput sends and listens for keyboard and mouse input.

How to choose:

- Reading and writing a serial port: pySerial
- Connecting to a Bluetooth Low Energy device from asyncio code: Bleak
- Sending or listening for keyboard and mouse input: pynput
- Automated tests on real or virtual hardware, at your desk and in CI: Jumpstarter

### pySerial

Pick pySerial to read and write a serial port from Python, with [the same class-based interface](https://pyserial.readthedocs.io/en/latest/pyserial.html) on Windows, macOS, Linux, and BSD. [Open a port with `serial.Serial`](https://pyserial.readthedocs.io/en/latest/shortintro.html#opening-serial-ports).

### Bleak

Pick Bleak to connect async code to Bluetooth Low Energy devices like sensors. It's a GATT client with [an asynchronous, cross-platform Python API](https://bleak.readthedocs.io/en/latest/). Connect with `BleakClient`, and past a simple script, [pass it a device found by a scan instead of an address](https://bleak.readthedocs.io/en/latest/api/client.html#bleak.BleakClient).

### pynput

Pick pynput to send keyboard and mouse input from Python, and to listen for what the user types and clicks. Watch the keyboard with a [`Listener`](https://pynput.readthedocs.io/en/latest/keyboard.html#monitoring-the-keyboard).

### Jumpstarter

Pick Jumpstarter when your tests have to run on real or virtual boards [with the same scripts at your desk and in CI](https://jumpstarter.dev/main/). Its [local mode](https://jumpstarter.dev/main/introduction/index.html#local-mode) suits a developer with devices on the desk and needs no Kubernetes or other infrastructure. Write the tests in pytest by subclassing [`JumpstarterTest`](https://jumpstarter.dev/main/getting-started/guides/examples/testing.html#the-jumpstartertest-base-class), which handles the connection so your tests hold only test logic.
