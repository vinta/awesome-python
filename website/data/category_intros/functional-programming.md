Past the built-in functools, pick more-itertools for iterator tools, toolz for curried pipelines, funcy for decorators like retry, and returns for typed errors.

How to choose:

- Partial application, caching, and dispatch by type, with nothing to install: functools
- Chunking, windowing, or peeking at iterators, plus the itertools recipes: more-itertools
- Curried pipelines over iterators and dicts, with a compiled drop-in for speed: toolz
- Decorators that retry or silence errors, and transforms that keep a collection's type: funcy
- Errors and missing values as typed results that mypy checks: returns

### functools

Start with functools, the standard library's module for [higher-order functions: functions that act on or return other functions](https://docs.python.org/3/library/functools.html). Call `partial()` to [freeze some of a function's arguments](https://docs.python.org/3/library/functools.html#functools.partial) and get back a new function with a simpler signature.

### more-itertools

Add more-itertools when the iterator tool you need isn't in itertools. CPython's own itertools docs [point to it](https://docs.python.org/3/library/itertools.html#itertools-recipes) for their recipes "and many, many others". The recipes [come in its top-level package](https://more-itertools.readthedocs.io/en/latest/), next to new tools like `chunked()`, which [breaks an iterable into lists of length n](https://more-itertools.readthedocs.io/en/latest/api.html#more_itertools.chunked).

### toolz

Pick toolz to build pipelines out of small functions over iterators and dicts. Each toolz function [consumes and produces just iterables, dictionaries, and functions](https://toolz.readthedocs.io/en/latest/composition.html), so one function's output feeds the next. Once partial application shows up several times in your code, its docs suggest [switching your imports to `toolz.curried`](https://toolz.readthedocs.io/en/latest/curry.html#the-curried-namespace), where every function curries. When speed matters, cytoolz [implements the same API](https://github.com/pytoolz/cytoolz) in compiled code.

### funcy

Pick funcy for everyday helpers that reach past iterators and function composition. It's [a collection of functional tools focused on practicality](https://github.com/Suor/funcy), and it has decorators that [retry a call](https://funcy.readthedocs.io/en/latest/flow.html#retry) or silence its errors. Its [`walk()`](https://funcy.readthedocs.io/en/latest/colls.html#walk) works like map but keeps the collection's type, so walking a dict returns a dict. Many of its functions also [take a string as a regex, or a dict as a lookup](https://funcy.readthedocs.io/en/latest/extended_fns.html), where they expect a function.

### returns

Pick returns when you'd rather get failures and missing values back as typed values than catch exceptions or check for None. Its containers [work with exceptions and None in a type-safe way](https://returns.readthedocs.io/en/latest/pages/quickstart.html#why). Start by decorating a function that can raise with [`@safe`](https://returns.readthedocs.io/en/latest/pages/result.html#safe), which makes it return a result container instead. Its docs [really recommend type-checking with mypy](https://returns.readthedocs.io/en/latest/pages/quickstart.html#typechecking-and-other-integrations) and their plugin.

### When plain Python reads better

Python's Functional Programming HOWTO finds [many uses of `reduce()` clearer as for loops](https://docs.python.org/3/howto/functional.html#small-functions-and-the-lambda-expression), and toolz's own docs call comprehensions [the more Pythonic syntax](https://toolz.readthedocs.io/en/latest/streaming-analytics.html#selecting-with-map-and-filter) for simple map and filter.

### More functional Python resources

For more libraries, books, and talks, see [awesome-functional-python](https://github.com/sfermigier/awesome-functional-python).
