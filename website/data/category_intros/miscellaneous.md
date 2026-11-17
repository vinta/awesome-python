Some helpers aren't in the standard library, so before writing your own Python utility library, check boltons. Blinker dispatches signals between modules.

How to choose:

- Helpers the standard library lacks, like atomic file saves and chunked iteration: boltons
- Events inside one process, between modules that don't import each other: Blinker

boltons is a set of [pure-Python utilities missing from the standard library](https://boltons.readthedocs.io/en/latest/), like atomic file saves and chunked iteration. Run `pip install boltons`, then [import what you need from its modules](https://boltons.readthedocs.io/en/latest/#installation-and-integration), e.g. `from boltons.cacheutils import LRU`. It depends on no other packages and its modules are self-contained, so you can also [copy the whole package into your project, or just one module](https://boltons.readthedocs.io/en/latest/architecture.html#integration). Most modules aim to be good enough for basic uses. When you outgrow one, [its docs often point to a third-party alternative](https://boltons.readthedocs.io/en/latest/#third-party-packages).

Blinker lets [any number of interested parties subscribe to events, or signals](https://github.com/pallets-eco/blinker), inside one Python process. Create a named signal with [`signal('name')`](https://blinker.readthedocs.io/en/latest/#decoupling-with-named-signals): every call with that name returns the same object, so modules and plugins share it without importing each other. Register receivers with `connect()`, and when you call `send()`, [pass the object that emits the signal](https://blinker.readthedocs.io/en/latest/#emitting-signals), usually `self`. A receiver can then [subscribe to one sender only](https://blinker.readthedocs.io/en/latest/#subscribing-to-specific-senders).
