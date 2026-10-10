Stepping through code in ipdb gets you pdb with IPython's tab completion. Python debugging tools cover slow code too: py-spy profiles a running Python program.

How to choose:

- pdb with tab completion and syntax highlighting: ipdb
- Finding where a running program spends its time, without changing it: py-spy
- A full-screen debugger in your terminal: PuDB
- A timeline of every function call: VizTracer
- Memory use and leaks, native extensions included: Memray
- A readable call tree of where your script spends wall-clock time: pyinstrument
- CPU, GPU, and memory use, line by line: Scalene
- SQL queries and request data on Django pages: Django Debug Toolbar
- Print debugging that labels each value: IceCream
- The same toolbar on Flask pages: Flask-DebugToolbar

ipdb gives you IPython's debugger, with [tab completion, syntax highlighting, and better tracebacks](https://github.com/gotcha/ipdb), behind the same interface as pdb. Drop into it with `import ipdb; ipdb.set_trace()`, or call `ipdb.pm()` for post-mortem debugging after an exception.

py-spy is a sampling profiler that shows what a program spends its time on [without restarting it or modifying its code](https://github.com/benfred/py-spy). It runs outside the profiled process, which makes it safe to use on production code. `py-spy record` writes a [flame graph](https://github.com/benfred/py-spy#record) of a process ID or a command you hand it, and `py-spy dump` prints [the call stack where a program is hung](https://github.com/benfred/py-spy#dump).

PuDB keeps the source, the stack, breakpoints, and variables [all visible at once](https://documen.tician.de/pudb/) in one full-screen terminal view. Start it from your code with `from pudb import set_trace; set_trace()`, or [run a whole script](https://documen.tician.de/pudb/starting.html#starting-the-debugger) with `python -m pudb my-script.py`.

VizTracer records every function's entry and exit time across a whole run, which [helps catch sporadic performance issues](https://viztracer.readthedocs.io/en/latest/). Run your script [with `viztracer my_script.py`](https://viztracer.readthedocs.io/en/latest/basic_usage.html#command-line) instead of `python`, then open the `result.json` it writes with `vizviewer`.

Memray tracks allocations [in Python code, native extension modules, and the interpreter itself](https://bloomberg.github.io/memray/overview.html), to find memory leaks and the code behind high memory use. Profiling [takes two steps](https://bloomberg.github.io/memray/getting_started.html): `memray run` saves the allocations to a file, then `memray flamegraph` builds a report from it.

pyinstrument measures wall-clock time, so time spent [downloading data, reading files, and talking to databases](https://pyinstrument.readthedocs.io/en/latest/how-it-works.html#wall-clock-time-not-cpu-time) counts too. Type [`pyinstrument script.py`](https://pyinstrument.readthedocs.io/en/latest/guide.html#profile-a-python-script) instead of `python script.py`, or wrap a block in `with pyinstrument.profile():`.

Scalene profiles CPU, GPU, and memory [line by line and per function](https://github.com/plasma-umass/scalene#fast-and-accurate). It [separates time in Python from time in native code](https://github.com/plasma-umass/scalene#cpu-profiling), so you can focus on code you can change. Run [`scalene run your_prog.py`](https://github.com/plasma-umass/scalene#using-scalene), then `scalene view` opens the profile in your browser.

Django Debug Toolbar adds [panels](https://django-debug-toolbar.readthedocs.io/en/latest/panels.html) to your pages for the current request's SQL queries, templates, cache calls, and more. [Its setup](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) adds the app, its URLs, and its middleware, and shows the toolbar only to IP addresses in `INTERNAL_IPS`.

IceCream's `ic()` [prints each expression along with its value](https://github.com/gruns/icecream). With no arguments, it prints [the file, line, and function it runs in](https://github.com/gruns/icecream#inspect-execution). Since `ic()` [returns its arguments](https://github.com/gruns/icecream#return-value), you can wrap an expression in existing code without rewriting the line.

Flask-DebugToolbar is [a port of Django Debug Toolbar](https://github.com/pallets-eco/flask-debugtoolbar) to Flask. Wrap your app in `DebugToolbarExtension(app)`, and the toolbar [shows up in HTML responses while debug mode is on](https://flask-debugtoolbar.readthedocs.io/en/latest/).

Both debuggers also open from the built-in `breakpoint()`: set the [`PYTHONBREAKPOINT` environment variable](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONBREAKPOINT) to `ipdb.set_trace` or `pudb.set_trace`. Among profilers, sampling ones like py-spy, pyinstrument, and Scalene [cost much less overhead than tracing ones](https://pyinstrument.readthedocs.io/en/latest/how-it-works.html#statistical-profiling-not-tracing), while a tracer like VizTracer records every call and [gives you more information](https://github.com/gaogaotiantian/viztracer#performance).
