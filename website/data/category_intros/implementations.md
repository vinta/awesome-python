Unless you need MicroPython on a microcontroller or Pyodide in the browser, CPython is the Python implementation to run. Cython compiles your slow code to C.

How to choose:

- Most projects: CPython
- Microcontrollers and other constrained devices: MicroPython
- Python in the browser or Node.js: Pyodide
- Slow code to compile, or a C library to wrap: Cython
- Long-running programs in pure Python: PyPy

CPython is the [original and most-maintained implementation](https://docs.python.org/3/reference/introduction.html#alternate-implementations) of Python, written in C, and new language features generally show up there first. Give each app its own [virtual environment](https://docs.python.org/3/installing/index.html) from venv, and install packages into it with pip.

MicroPython is a lean implementation of Python 3, [optimized to run on microcontrollers](https://micropython.org/) and in constrained environments. It includes a small subset of the standard library, plus modules like `machine` for the hardware. Flash your board with firmware from [the download page](https://micropython.org/download/), then manage it from your computer with [mpremote](https://docs.micropython.org/en/latest/reference/mpremote.html). `mpremote mip install` [installs packages](https://docs.micropython.org/en/latest/reference/packages.html#installing-packages-with-mpremote) from micropython-lib by default, not PyPI. When RAM runs short, [freeze the modules that rarely change](https://docs.micropython.org/en/latest/reference/packages.html#freezing-packages) into the firmware.

Pyodide is [a port of CPython to WebAssembly](https://pyodide.org/en/stable/) that runs in the browser and Node.js. It installs any pure Python wheel from PyPI, and many packages with C extensions, like NumPy and pandas, have been ported for it. Install packages with [`micropip.install()`](https://pyodide.org/en/stable/usage/loading-packages.html#how-to-chose-between-micropip-install-and-pyodide-loadpackage), which its docs recommend for almost everything. In a web page, run Pyodide [in a web worker](https://pyodide.org/en/stable/usage/webworker.html), so long computations don't freeze your UI.

Cython isn't a separate interpreter: it [translates Python code to C](https://cython.readthedocs.io/en/latest/src/quickstart/overview.html) that runs inside CPython, to speed up slow code or wrap C libraries. Write your code in [pure Python syntax](https://cython.readthedocs.io/en/latest/src/tutorial/pure.html) to keep the file runnable by the plain interpreter, and use `.pyx` files for what that syntax can't express. The annotation report from `cython -a` shows [where types help](https://cython.readthedocs.io/en/latest/src/quickstart/cythonize.html#determining-where-to-add-types). Build your package with [a build backend](https://cython.readthedocs.io/en/latest/src/userguide/source_files_and_compilation.html#compiling-with-a-build-backend), and ship [prebuilt wheels](https://cython.readthedocs.io/en/latest/src/userguide/source_files_and_compilation.html#compiling-with-pyximport) to your users.

PyPy is a replacement for CPython, and speed is the reason to use it. It works best on [long-running programs that spend much of their time in Python code](https://pypy.org/features.html#speed), not on short scripts. Code built on C extension modules is a poor fit, since they [often run much slower on PyPy than on CPython](https://doc.pypy.org/faq.html#do-c-extension-modules-work-with-pypy). Packages installed for CPython aren't available to PyPy, so [install them for PyPy](https://doc.pypy.org/faq.html#module-xyz-does-not-work-with-pypy-importerror) in its own virtual environment with `pypy -m pip`.

Before you switch implementations or compile anything for speed, [measure first](https://pypy.org/performance.html#profiling-vmprof) to confirm the slowdown is real. Then profile to find the slow parts, and only optimize those.
