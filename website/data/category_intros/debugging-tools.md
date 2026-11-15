Debug in VS Code through debugpy, or in a terminal with ipdb, or PuDB for a full-screen view. py-spy profiles a running program, and Memray its memory.

How to choose:

- Breakpoints in VS Code, or debugging on another machine: debugpy
- pdb's interface, with IPython's tab completion and highlighting: ipdb
- A full-screen debugger in the terminal: PuDB
- What's slow in a running program, without restarting it: py-spy
- Memory allocations and leaks on Linux or macOS, native code included: Memray
- Which call ran when, on a timeline: VizTracer
- Print debugging that labels each value: IceCream
- A call tree of your own script or web request: Pyinstrument
- CPU, GPU, and memory line by line in one report: Scalene
- SQL queries and templates on your Django pages: Django Debug Toolbar
- Requests and their SQL queries, recorded for a Django app: django-silk
- A debug toolbar for Flask: Flask-DebugToolbar

### debugpy

Pick debugpy to debug from your editor, with breakpoints and stepping in its UI, or to debug a program running on another machine. It's [an implementation of the Debug Adapter Protocol](https://github.com/microsoft/debugpy) for Python. VS Code's Python Debugger extension [debugs with it](https://code.visualstudio.com/docs/python/debugging), and it comes installed with the Python extension. Elsewhere, start your script with `python -m debugpy --listen localhost:5678 --wait-for-client myfile.py`: it [waits for your editor to attach](https://github.com/microsoft/debugpy#debugging-a-script-file) before running your code.

### ipdb

Pick ipdb if you already know pdb and want IPython's tab completion, syntax highlighting, and tracebacks at the same prompt. It [gives you the IPython debugger](https://github.com/gotcha/ipdb) with the same interface as pdb. Put `import ipdb; ipdb.set_trace()` where you want your code to stop.

### PuDB

Pick PuDB when you want to see the whole picture while you step through code in a terminal. It's [a full-screen console debugger](https://github.com/inducer/pudb) that keeps the source, the stack, breakpoints, and variables on screen at once and updates them as you go. [Run a whole script under it](https://documen.tician.de/pudb/starting.html) with `python -m pudb my-script.py`.

### py-spy

Pick py-spy to find what's slow in a program that's already running, like a production server you can't restart. It's [a sampling profiler that runs outside your program's process](https://github.com/benfred/py-spy), so you don't restart the program or change its code. Its README calls it safe to use against production code. `py-spy record -o profile.svg --pid 12345` [writes a flame graph](https://github.com/benfred/py-spy#record) of the process with that PID.

### Memray

Pick Memray when the problem is memory: what allocates it, and what leaks. It [tracks allocations in Python code, in native extension modules, and in the interpreter itself](https://bloomberg.github.io/memray/overview.html), and traces every call rather than sampling. It runs only on Linux and macOS. Profiling [takes two steps](https://bloomberg.github.io/memray/getting_started.html): `memray run example.py` records the allocations to a file, and `memray flamegraph` turns that file into an HTML report.

### VizTracer

Pick VizTracer to see which call ran when, on a timeline, across threads, processes, and async code. It's a tracer, so it [records every function entry and exit](https://github.com/gaogaotiantian/viztracer#performance): that costs more than a sampling profiler, and shows you more. [Run `viztracer my_script.py`](https://github.com/gaogaotiantian/viztracer#basic-usage) in place of `python3 my_script.py`, then open the `result.json` it writes with `vizviewer`.

### IceCream

Pick IceCream if you debug with `print()` and want each value labeled with the expression that produced it. After `from icecream import ic`, calling `ic(foo(123))` [prints `ic| foo(123): 456`](https://github.com/gruns/icecream#inspect-variables). Since `ic()` [returns its argument](https://github.com/gruns/icecream#return-value), you can wrap it around an expression already in your code.

### Pyinstrument

Pick Pyinstrument to see where your own script or web request spends its time, read as a call tree. It's [a statistical profiler](https://pyinstrument.readthedocs.io/en/latest/how-it-works.html) that records the whole stack and hides library frames by default. It measures wall-clock time, so time spent waiting on files and databases counts too. Type [`pyinstrument script.py`](https://pyinstrument.readthedocs.io/en/latest/guide.html#profile-a-python-script) instead of `python script.py`.

### Scalene

Pick Scalene when you want CPU, GPU, and memory profiled line by line in one run. It [separates time spent in Python from time in native code](https://github.com/plasma-umass/scalene#cpu-profiling), so you can focus on the lines you can actually speed up. It runs on Windows as well as Linux and macOS. Profile with `scalene run your_prog.py`, then [open the report](https://github.com/plasma-umass/scalene#using-scalene) with `scalene view`.

### Django Debug Toolbar

Pick Django Debug Toolbar to see a page's SQL queries, templates, and settings on the page itself while you develop a Django site. It's [a set of panels](https://github.com/django-commons/django-debug-toolbar) with debug information about the current request and response, and its SQL panel [shows each query's time](https://django-debug-toolbar.readthedocs.io/en/latest/panels.html) with a link to EXPLAIN it. [Install it](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) as an app, then add its URLs and middleware.

### Silk

Pick Silk to record the requests your Django app serves, with its SQL queries, and inspect them in Silk's own UI. Its middleware [stores requests and responses in your database](https://github.com/jazzband/django-silk#request-inspection), with the time each took and the queries it ran. [Install django-silk and add its middleware, app, and URLs](https://github.com/jazzband/django-silk#installation), then run `migrate`. [By default, anybody can open its UI](https://github.com/jazzband/django-silk#authenticationauthorisation) at `/silk/`, so have it require a login.

### Flask-DebugToolbar

Pick Flask-DebugToolbar to see debug panels on the pages of a Flask app. It's [a port of Django Debug Toolbar](https://github.com/pallets-eco/flask-debugtoolbar) that [adds the toolbar to HTML responses](https://flask-debugtoolbar.readthedocs.io/en/latest/) while debug mode is on. Pass your app to `DebugToolbarExtension(app)`, and setting `app.debug = False` in production turns it off.

### Starting a debugger with breakpoint()

Python's built-in `breakpoint()` [calls whatever debugger `sys.breakpointhook()` points to](https://docs.python.org/3/builtins/functions.html#breakpoint), which is pdb by default. So one call in your code can reach the debugger of your choice. PuDB's docs [set `PYTHONBREAKPOINT="pudb.set_trace"`](https://documen.tician.de/pudb/starting.html#starting-the-debugger) so that `breakpoint()` starts PuDB, and debugpy [pauses at `breakpoint()`](https://github.com/microsoft/debugpy#breakpoint-function) once an editor is attached.
