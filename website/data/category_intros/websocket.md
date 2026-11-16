Use websockets for a standalone WebSocket server or client, Channels in a Django app, and Flask-SocketIO in a Flask app whose clients speak Socket.IO.

How to choose:

- A standalone WebSocket server or client: websockets
- WebSockets in a Django app: Channels
- A Flask app whose clients speak Socket.IO: Flask-SocketIO
- WAMP RPC and PubSub, or Twisted code: autobahn-python
- Audio, video, or data channels over WebRTC: aiortc

### websockets

Pick websockets for a standalone WebSocket server or client. Its [default asyncio implementation](https://websockets.readthedocs.io/en/latest/) suits servers that handle many connections, and its threading implementation is a good alternative for clients. Start with [`serve()`](https://websockets.readthedocs.io/en/latest/intro/examples.html) for a server, or `connect()` for a client. An app on FastAPI, Starlette, or Litestar can skip this choice: use the framework's [built-in WebSocket routes](https://starlette.dev/websockets/).

### Channels

Pick Channels to add WebSockets to a Django app. It [extends Django beyond HTTP](https://channels.readthedocs.io/en/latest/) on ASGI, and works with Django's auth and sessions. You write a consumer class, the Channels version of a Django view. Its docs [recommend sync consumers by default](https://channels.readthedocs.io/en/latest/topics/consumers.html). Running it takes an ASGI server, plus a channel layer once instances need to talk to each other. For a small set of real-time features, like notifications, websockets' docs suggest [a separate WebSocket server](https://websockets.readthedocs.io/en/latest/howto/django.html) next to Django instead.

### Flask-SocketIO

Pick Flask-SocketIO for real-time features in a Flask app whose clients speak Socket.IO. Socket.IO adds rooms, automatic reconnection, and an HTTP long-polling fallback on top of WebSocket. But it isn't plain WebSocket: a plain WebSocket client [can't connect to a Socket.IO server](https://socket.io/docs/v4/), so Flask-SocketIO doesn't fit those clients. Start by wrapping your app in [`SocketIO(app)`](https://flask-socketio.readthedocs.io/en/latest/getting_started.html). Its docs call the standard library's threading [the most compatible option](https://flask-socketio.readthedocs.io/en/latest/intro.html) to run it on.

### Autobahn|Python

Pick Autobahn|Python for WAMP, or when your code runs on Twisted. It [runs on both Twisted and asyncio](https://autobahn.readthedocs.io/en/stable/overview.html). WAMP adds routed RPC and PubSub on top of WebSocket, and every WAMP client [needs a WAMP router](https://autobahn.readthedocs.io/en/stable/wamp/programming.html), such as Crossbar.io. Its plain WebSocket API uses callbacks, which websockets doesn't offer: you write a protocol class and override [`onMessage`](https://autobahn.readthedocs.io/en/stable/websocket/programming.html).

### aiortc

Pick aiortc to exchange audio, video, and data channels over WebRTC from Python. Its API [follows the JavaScript one](https://aiortc.readthedocs.io/en/latest/), with coroutines in place of promises, so start with [`RTCPeerConnection`](https://aiortc.readthedocs.io/en/latest/api.html#aiortc.RTCPeerConnection). You can plug in your own media processing, like running OpenCV on video frames.
