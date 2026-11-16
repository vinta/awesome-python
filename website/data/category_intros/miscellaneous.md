For helpers the standard library lacks, like atomic file saves, use boltons. Blinker sends signals between modules that don't import each other.

How to choose:

- Helpers missing from the standard library, with no dependencies: boltons
- Signals between modules that don't import each other: Blinker
- Your own signals in a Flask app: Blinker

### boltons

Pick boltons for the small helpers [conspicuously missing from the standard library](https://boltons.readthedocs.io/en/latest/), like atomic file saving, a multi-value dict, and recursive transforms of nested data. It [depends on no packages](https://boltons.readthedocs.io/en/latest/architecture.html#integration), and nearly every module stands on its own. When you need only one or two functions, copy that one module into your project instead of adding the dependency. Most helpers aim to be [good enough for basic uses](https://boltons.readthedocs.io/en/latest/#third-party-packages), and a module's docs often name the specialized library to move to once you outgrow it. Each helper is one import away, like `from boltons.cacheutils import LRU`.

### Blinker

Pick Blinker when one part of your code announces an event and other parts react to it, all inside one process. [Every call to `signal('name')` returns the same signal object](https://blinker.readthedocs.io/en/latest/#decoupling-with-named-signals), so a plugin can subscribe by name without importing the module that sends it. A receiver can [listen to one sender only](https://blinker.readthedocs.io/en/latest/#subscribing-to-specific-senders), and it disconnects itself once it's garbage-collected. Flask's own signals [are built on Blinker](https://flask.palletsprojects.com/en/latest/signals/). Flask suggests signals for testing, metrics, and auditing, since a receiver can subscribe temporarily and can't directly affect the app.
