CPython is the default Python implementation. Switch to PyPy for long-running pure-Python code, MicroPython for microcontrollers, or Pyodide for the browser.

How to choose:

- Most projects, and the widest support for packages: CPython
- A long-running program that spends its time in Python code, not C libraries: PyPy
- Python on a microcontroller: MicroPython
- Python in a web page or Node.js, with packages from PyPI: Pyodide
- A lean web page that needs no packages from PyPI: MicroPython
- Compiling hot functions, or wrapping a C library, while staying on CPython: Cython

### CPython

Stay on CPython unless your code needs what another implementation is built for. It's [the original and most-maintained implementation of Python](https://docs.python.org/3/reference/introduction.html#alternate-implementations), and new language features generally appear there first. Compiled packages are written for it too: [the C extension interface is specific to CPython](https://docs.python.org/3/extending/index.html).

### PyPy

Pick PyPy for a long-running program that spends much of its time in Python code rather than in C libraries. That's [where PyPy works best](https://pypy.org/features.html#speed), since its JIT compiler needs a few seconds to warm up. It replaces CPython, and [pure Python code works](https://pypy.org/compat.html#tl-dr) on it. Extension modules are [the most likely stumbling block](https://doc.pypy.org/faq.html#is-pypy-a-drop-in-replacement-for-cpython), and they often run much slower than on CPython, so check the dependencies that use C extensions before you switch. Then benchmark your real program, since PyPy's FAQ warns that [your tests are not a benchmark](https://doc.pypy.org/faq.html#how-fast-is-pypy).

### MicroPython

Pick MicroPython to run Python on a microcontroller. It's [optimised for microcontrollers and constrained environments](https://micropython.org/), with a small subset of the standard library and modules such as `machine` for talking to the hardware. Since it's a subset, its docs list [where it differs from CPython](https://docs.micropython.org/en/latest/genrst/index.html). Start by flashing [the firmware for your board](https://micropython.org/download/). Packages come through mip, which [uses micropython-lib as its index by default, not PyPI](https://docs.micropython.org/en/latest/reference/packages.html).

### Pyodide

Pick Pyodide to run Python in a web page or Node.js with packages from PyPI. It's [a port of CPython to WebAssembly](https://pyodide.org/en/stable/#what-is-pyodide). It installs any pure Python package with a wheel on PyPI, plus many ported packages with C extensions, like NumPy and pandas. For a lean page that needs none of those, MicroPython [also runs in the web browser](https://www.python.org/download/alternatives/). In a page, [load pyodide.js and call `loadPyodide()`](https://pyodide.org/en/stable/usage/index.html#web-browsers).

### Cython

Pick Cython to speed up the hot spots profiling finds while staying on CPython, or to [wrap a C library](https://cython.org/). PyPy swaps the interpreter without a rewrite. Cython instead compiles your Python to C extension modules that [run within the CPython runtime](https://cython.readthedocs.io/en/stable/src/quickstart/overview.html), so your other compiled packages keep working. The Python Packaging User Guide [lists both](https://packaging.python.org/en/latest/guides/packaging-binary-extensions/#alternatives-to-handcoded-accelerator-modules) as alternatives to writing C by hand. You don't need to add types everywhere: in Cython's words, [a few types in the right spots go a long way](https://cython.readthedocs.io/en/stable/src/quickstart/cythonize.html). To compile a single file, run `cythonize`.
