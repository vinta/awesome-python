If a Python algorithms library has to run in production, Sorted Containers gives you sorted lists, dicts, and sets. To learn, read The Algorithms - Python.

How to choose:

- Lists, dicts, and sets that stay sorted as you add and remove: Sorted Containers
- Small, typed implementations you can install and read: algorithms
- Algorithm code to study, browsed by topic: The Algorithms - Python
- How classic design patterns look in Python, and which ones to skip: python-patterns
- Workflows as states and transitions, up to full statecharts: python-statemachine

Python's standard library [is great until you need a sorted collections type](https://grantjenks.com/docs/sortedcontainers/), and Sorted Containers fills that gap in pure Python, as fast as C extensions. SortedList keeps its values in order as you `add()` them, SortedDict is [a dict that keeps a sorted list of its keys](https://grantjenks.com/docs/sortedcontainers/introduction.html#sorted-dict), and SortedSet does the same for a set.

algorithms collects [minimal, clean, and well-documented implementations](https://github.com/keon/algorithms) of data structures and algorithms. Each file stands alone, with docstrings, type hints, and complexity notes, and its README says they're designed to be read and learned from. Install it with `pip install algorithms`, then [import an implementation by topic](https://github.com/keon/algorithms#quick-start), like a sort or a graph search.

The Algorithms - Python implements algorithms [for education](https://github.com/TheAlgorithms/Python), and its README says they may be less efficient than the standard library's own: read them to learn, not to ship. Start from [its directory](https://github.com/TheAlgorithms/Python/blob/master/DIRECTORY.md), which sorts them by topic. Its contributing guide asks each algorithm to [carry type hints and doctests](https://github.com/TheAlgorithms/Python/blob/master/CONTRIBUTING.md#what-is-an-algorithm) that test both valid and erroneous input, so the doctests show you how it behaves.

python-patterns is [a collection of design patterns and idioms](https://github.com/faif/python-patterns) in Python, one file per pattern, grouped as creational, structural, behavioral, and more. Its README asks you to pay more attention to why you choose a pattern than to how you implement it. It also lists the patterns [not recommended in Python](https://github.com/faif/python-patterns#-anti-patterns): skip a Singleton class, since modules are already singletons, and prefer composition and delegation over deep inheritance.

python-statemachine builds [flat state machines or full statecharts](https://python-statemachine.readthedocs.io/en/latest/) with compound states, parallel regions, and history, in sync and async code. Declare states as class attributes and transitions with `state.to(target)`, and the [events are the names you assign them to](https://python-statemachine.readthedocs.io/en/latest/tutorial.html#your-first-state-machine).

Before you hand-write python-patterns' State pattern for a real workflow, read python-statemachine's guide [for coming from the State pattern](https://python-statemachine.readthedocs.io/en/latest/how-to/coming_from_state_pattern.html). The whole workflow sits in one class body, and unreachable states fail when the class is defined, not at runtime. For more places to learn and practice algorithms, see [awesome-algorithms](https://github.com/tayllan/awesome-algorithms).
