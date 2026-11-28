Install Sorted Containers to keep a list, dict, or set sorted as it changes. To learn how an algorithm works, read The Algorithms - Python or the algorithms package.

How to choose:

- A list, dict, or set that stays sorted as you add and remove items: sortedcontainers
- Algorithms to read, browsed by topic, written for education: thealgorithms
- Algorithms to study that you can also import and run: algorithms
- Design patterns, and which ones to skip in Python: python-patterns
- A workflow of states and transitions, like an order's: python-statemachine

### Sorted Containers

Pick Sorted Containers when a list, dict, or set has to stay sorted while you add and remove items. Its docs explain that one long list kept sorted with the standard library's `bisect.insort()` [gets slow as it grows](https://grantjenks.com/docs/sortedcontainers/implementation.html), which Sorted Containers avoids. They also describe priority queues that needed more than heapq's add and pop: [membership tests, removal, and sorted iteration](https://grantjenks.com/docs/sortedcontainers/performance-workload.html). Pick `SortedList`, `SortedDict`, or `SortedSet`. [Add values to a `SortedList` with `add()`](https://grantjenks.com/docs/sortedcontainers/introduction.html) instead of `append()` or `insert()`, since the list decides each value's position.

### The Algorithms - Python

Read The Algorithms - Python to see how a known algorithm works. Its README says the implementations are [for learning purposes only](https://github.com/TheAlgorithms/Python). Browse them on GitHub, starting from [its directory](https://github.com/TheAlgorithms/Python/blob/master/DIRECTORY.md), which lists the algorithms by topic.

### algorithms

Pick the algorithms package over The Algorithms - Python when you want to run what you study. Its README says each file is [self-contained with docstrings, type hints, and complexity notes](https://github.com/keon/algorithms), designed to be read and learned from. After `pip install algorithms`, import by topic, like `merge_sort` from `algorithms.sorting` or `dijkstra` from `algorithms.graph`.

### python-patterns

Read python-patterns to learn a design pattern and decide whether your code needs it. Its README says [why you choose a pattern matters more than how you implement it](https://github.com/faif/python-patterns), and each pattern is one file you read on GitHub. Its [Anti-Patterns section](https://github.com/faif/python-patterns#-anti-patterns) lists patterns not recommended in Python: instead of a Singleton class, use a module-level variable, since every module is imported only once.

### python-statemachine

Pick python-statemachine when an object moves through states, like an order going from pending to ready, and you'd rather declare the workflow than hand-write the State pattern. Its guide for developers [coming from the State pattern](https://python-statemachine.readthedocs.io/en/latest/how-to/coming_from_state_pattern.html) trades one class per state, with transitions scattered across them, for one class body that shows the whole workflow. Unreachable states and missing transitions get caught before the machine runs. In [its tutorial](https://python-statemachine.readthedocs.io/en/latest/tutorial.html), states are class attributes, transitions come from `state.to(target)`, and events are the names you assign them to.

### More algorithm resources

For more places to learn and practice algorithms, see [awesome-algorithms](https://github.com/tayllan/awesome-algorithms).
