Read The Algorithms to see how algorithms work, not to ship. Install Sorted Containers when your code needs a Python algorithms library for sorted collections.

How to choose:

- Sorted lists, dicts, and sets: Sorted Containers
- Learning how an algorithm works: The Algorithms
- Algorithm code to read that also installs with pip: algorithms
- A state machine bound to an object you already have: transitions
- Design patterns, and which ones Python doesn't need: python-patterns
- A state machine declared as a class, up to full statecharts: python-statemachine

Python's standard library is great [until you need a sorted collections type](https://grantjenks.com/docs/sortedcontainers/). Sorted Containers fills that gap in pure Python, with no C compiler to install. `SortedList` is its core type: it [keeps its values in ascending order](https://grantjenks.com/docs/sortedcontainers/introduction.html#sorted-list) as you add them with `add()` or `update()`. `SortedDict` is a dict that also keeps a sorted list of its keys, and `SortedSet` is a set that keeps a sorted list of its values.

The Algorithms implements [algorithms in Python for education](https://github.com/TheAlgorithms/Python), from sorts and searches to graphs and dynamic programming. Browse them by topic in its [directory](https://github.com/TheAlgorithms/Python/blob/master/DIRECTORY.md).

The algorithms package puts each data structure and algorithm [in a self-contained file](https://github.com/keon/algorithms) with docstrings, type hints, and complexity notes, written to be read and learned from. It also installs with pip, so your code can import what you've read, like `from algorithms.graph import dijkstra`.

transitions is [a lightweight, object-oriented state machine](https://github.com/pytransitions/transitions) that you bind to an object you already have. [Pass `Machine`](https://github.com/pytransitions/transitions#basic-initialization) your model, its states, and its transitions as dicts, each with a trigger, a source, and a destination. The model then gets a method for each trigger, like `evaporate()`.

python-patterns is [a collection of design patterns and idioms](https://github.com/faif/python-patterns), one file per pattern, grouped as creational, structural, behavioral, and more. Its README asks you to care more about why you pick a pattern than how you implement it. [Its anti-patterns section](https://github.com/faif/python-patterns#-anti-patterns) lists the ones not recommended in Python: modules are already singletons, so use a module-level variable instead of a Singleton class.

python-statemachine defines [flat state machines or full statecharts](https://python-statemachine.readthedocs.io/en/latest/) in a declarative class that works in both sync and async code. Statecharts add compound states, parallel regions, and history. States are class attributes, like `green = State(initial=True)`. `green.to(yellow)` declares a transition, and `|` combines transitions into one event, as in `cycle = green.to(yellow) | yellow.to(red)`.

The Algorithms says its implementations [may be less efficient than the standard library's](https://github.com/TheAlgorithms/Python), so where the standard library has an algorithm, use its version in your code. python-statemachine's docs show how to [rewrite a hand-written State pattern declaratively](https://python-statemachine.readthedocs.io/en/latest/how-to/coming_from_state_pattern.html), like the one in python-patterns' `state.py`. For more places to learn and practice algorithms, see [awesome-algorithms](https://github.com/tayllan/awesome-algorithms).
