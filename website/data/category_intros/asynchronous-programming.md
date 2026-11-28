Use asyncio for I/O-bound work. concurrent.futures runs CPU-bound work in processes, and libraries with no async support in threads.

How to choose:

- Many network connections at once, in async/await code: asyncio
- CPU-bound work, or blocking calls from a library with no async support: concurrent.futures
- Trio-style structured concurrency in an asyncio app, or a library that runs on both: AnyIO
- A faster, drop-in event loop for an asyncio app: uvloop
- New async code built for correctness, on libraries made for Trio: Trio
- Synchronous code, like a Flask app, made concurrent without async/await: gevent
- Ready-made SSH, mail, DNS, or IRC protocols, or existing Twisted code: Twisted
- Processes that pass data to each other while they run: multiprocessing

### asyncio

Pick asyncio for new I/O-bound code, like a program that holds many network connections at once. Its docs say it's [often a perfect fit for IO-bound and high-level structured network code](https://docs.python.org/3/library/asyncio.html), and many async frameworks build on it, from web servers to database connection libraries. Start your program with [`asyncio.run()`](https://docs.python.org/3/library/asyncio-runner.html#running-an-asyncio-program), its main entry point. Run tasks side by side in a task group: when one fails, [the remaining tasks in the group are cancelled](https://docs.python.org/3/library/asyncio-task.html#task-groups).

### concurrent.futures

Pick concurrent.futures for CPU-bound work, and for blocking calls from a library with no async support. Python's docs [recommend processes](https://docs.python.org/3/library/threading.html) to make use of multiple CPU cores, and threads for I/O-bound tasks. Submit CPU-bound work to a `ProcessPoolExecutor`. The thread pool [implements the same interface](https://docs.python.org/3/library/concurrent.futures.html), so moving a job between threads and processes changes one class name. From asyncio code, [hand blocking calls to an executor](https://docs.python.org/3/library/asyncio-dev.html#running-blocking-code) instead of calling them directly, since they stall every other task while they run.

### AnyIO

Pick AnyIO when you want Trio-style structured concurrency without giving up asyncio's libraries, or when you write a library whose users may run either. It [implements Trio-like structured concurrency on top of asyncio](https://anyio.readthedocs.io/en/latest/), and code written against its API runs unmodified on asyncio or Trio. You can adopt it in an existing app bit by bit. Start with [`anyio.run()`](https://anyio.readthedocs.io/en/latest/basics.html#running-async-programs), which runs your program on asyncio unless you ask for Trio.

### uvloop

Add uvloop to an asyncio app when you want a faster event loop without changing your code. It's a fast, drop-in replacement for asyncio's built-in event loop. Its README's preferred way to use it is [`uvloop.run()`](https://github.com/MagicStack/uvloop#user-content-using-uvloop).

### Trio

Pick Trio for new async code when getting concurrency right matters more to you than reusing asyncio libraries. It's built with [an obsessive focus on usability and correctness](https://trio.readthedocs.io/en/latest/). Its tutorial builds on nurseries: tasks started in a [`trio.open_nursery()`](https://trio.readthedocs.io/en/latest/tutorial.html#okay-let-s-see-something-cool-already) block can't outlive it. asyncio libraries don't run under Trio, so you'll build on [libraries that support Trio](https://trio.readthedocs.io/en/latest/awesome-trio-libraries.html). If your code depends on asyncio libraries, pick AnyIO instead.

### gevent

Pick gevent to make synchronous code, like a Flask app, concurrent without rewriting it in async and await. Flask's docs call it [a reliable way to handle numerous, long lived, concurrent connections](https://flask.palletsprojects.com/en/latest/gevent/), with no async def or await anywhere. Call [`gevent.monkey.patch_all()`](https://www.gevent.org/intro.html#beyond-sockets) in the first lines your program runs: it swaps the standard library's blocking calls for cooperative ones, so even modules that know nothing about gevent run concurrently.

### Twisted

Pick Twisted when you need one of its ready-made protocol implementations, or when you already run Twisted code. Its docs cover [Conch for SSH, Mail for SMTP and IMAP, Names for DNS, and Words for IRC and XMPP](https://docs.twisted.org/en/latest/). A Twisted server starts as a [`Protocol`](https://docs.twisted.org/en/latest/core/howto/servers.html#protocols) subclass, whose methods run as events arrive from the network.

### multiprocessing

Use multiprocessing directly when your processes pass data to each other while they run. Start each one as a `Process`, and connect them with [queues or pipes](https://docs.python.org/3/library/multiprocessing.html#exchanging-objects-between-processes). For a plain pool of tasks, its docs [point to concurrent.futures' higher-level interface](https://docs.python.org/3/library/multiprocessing.html#introduction).

### More asyncio libraries

For more asyncio libraries, see [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio).
