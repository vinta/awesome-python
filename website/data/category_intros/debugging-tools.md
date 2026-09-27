Before you add another print call, try a Python debugging tool. Step through your code in ipdb, and when it's slow, find where the time goes with py-spy.

How to choose:

- Stepping through code with pdb's commands: ipdb
- Profiling without changing code, even in production: py-spy
- A full-screen debugger in the terminal: PuDB
- Tracing calls through a big application: Hunter
- Memory use and leaks, on Linux and macOS: Memray
- A call tree that includes time spent waiting on I/O: pyinstrument
- CPU, GPU, and memory profiles line by line: Scalene
- Debug panels in a Django or Flask app: Django Debug Toolbar or Flask-DebugToolbar
- Print debugging that shows each expression: IceCream

ipdb gives you the IPython debugger with [the same interface as pdb](https://github.com/gotcha/ipdb). It adds tab completion, syntax highlighting, and better tracebacks. Call `ipdb.set_trace()` where you want to stop and look around.

PuDB is a full-screen debugger that runs in your terminal, with the source, the stack, breakpoints, and variables [all visible at once](https://documen.tician.de/pudb/). Call `from pudb import set_trace; set_trace()` where you want to stop, or [run a whole script](https://documen.tician.de/pudb/starting.html) under it with `python -m pudb my-script.py`.

Hunter traces what your code does, to help you [understand and debug big applications](https://github.com/ionelmc/python-hunter). Its main selling point is filtering the events you see. Start it from code with `hunter.trace()`, from the `PYTHONHUNTER` environment variable, or with the `hunter-trace` CLI, which [attaches to a running process](https://python-hunter.readthedocs.io/en/latest/introduction.html#activation). To see only your own code, [set `stdlib=False`](https://python-hunter.readthedocs.io/en/latest/cookbook.html#typical).

py-spy shows where your program spends its time [without restarting it or changing its code](https://github.com/benfred/py-spy). It runs outside your program's process, so its docs call it safe to use on production code. `py-spy record -o profile.svg --pid 12345` writes a flame graph of a running process, or pass `-- python myprogram.py` in place of the PID to start one. When a program hangs, `py-spy dump` prints its current call stack.

pyinstrument records [wall-clock time](https://pyinstrument.readthedocs.io/en/latest/how-it-works.html#wall-clock-time-not-cpu-time), so the time your program spends downloading data, reading files, and talking to databases shows up in its call tree. It samples the call stack instead of tracing every call, which [keeps its overhead low](https://pyinstrument.readthedocs.io/en/latest/how-it-works.html#statistical-profiling-not-tracing). Type `pyinstrument script.py` instead of `python script.py`, or [wrap the code you want to profile](https://pyinstrument.readthedocs.io/en/latest/guide.html#profile-a-specific-chunk-of-code) in a `with pyinstrument.profile():` block.

Scalene profiles CPU, GPU, and memory [line by line](https://github.com/plasma-umass/scalene). It separates the time spent in Python from the time spent in native code, so you can focus on the code you can actually improve. It also points to the lines responsible for memory growth and likely leaks.

Memray tracks memory allocations [in Python code, native extension modules, and the interpreter itself](https://bloomberg.github.io/memray/overview.html). It traces every function call rather than sampling, so the call stacks it reports are accurate. Use it to find what's using memory, where it leaks, and which code allocates the most. Profile [in two steps](https://bloomberg.github.io/memray/getting_started.html): `memray run example.py` saves the allocations to a file, and `memray flamegraph` turns that file into a report. Memray only works on Linux and macOS, so on Windows, profile memory with Scalene.

Django Debug Toolbar adds panels with debug information about the current request and response. [Set it up](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) by adding its app, URLs, and middleware. The toolbar shows only for the IP addresses in `INTERNAL_IPS`, so add `"127.0.0.1"` there. Its docs warn that it [isn't hardened for production](https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#show-toolbar-callback) or public servers. Flask-DebugToolbar is [a port of it](https://github.com/pallets-eco/flask-debugtoolbar) for Flask: pass your app to `DebugToolbarExtension(app)`, and the toolbar [appears in HTML responses when debug mode is on](https://flask-debugtoolbar.readthedocs.io/en/latest/#usage).

IceCream's `ic()` is [like `print()`, but better](https://github.com/gruns/icecream): `ic(foo(123))` prints both the expression and its value: `ic| foo(123): 456`. With no arguments, it prints the file, line number, and function it's called from. It returns its arguments, so you can wrap it around code that's already there. When you're done, `ic.disable()` turns off all its output.

ipdb and PuDB both keep the interface of pdb, the debugger that ships with Python. You don't have to import either one in your code. Call the built-in `breakpoint()` instead, and set the `PYTHONBREAKPOINT` environment variable to [the function it should run](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONBREAKPOINT), like `ipdb.set_trace` or `pudb.set_trace`. Left unset, `breakpoint()` starts pdb.
