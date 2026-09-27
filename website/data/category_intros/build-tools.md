Where Make would go, a Python build tool takes over, and SCons compiles C and C++. Invoke runs shell commands as tasks, and doit reruns only what changed.

How to choose:

- C, C++, or Fortran code compiled from source: SCons
- Shell commands run as named tasks with CLI flags: Invoke
- Tasks that rerun only when their input files change: doit
- Your own CLI program built from tasks: Invoke

SCons builds software from source code. Its site calls it [an improved, cross-platform substitute for the classic Make utility](https://scons.org/), with dependency analysis for C, C++, and Fortran built in. Your build file [is a Python script](https://scons.org/doc/production/HTML/scons-user/ch02s05.html#sect-sconstruct-python) named `SConstruct`: [put `Program('hello.c')` in it](https://scons.org/doc/production/HTML/scons-user/ch02.html) and run `scons`. You declare what to build, and SCons works out the build order, [whatever order you call the builders in](https://scons.org/doc/production/HTML/scons-user/ch02s05.html#sect-order-independent). For a source tree with subdirectories, [split the build into `SConscript` files](https://scons.org/doc/production/HTML/scons-user/ch14.html#sect-sconscript-files) that the top-level `SConstruct` pulls in. SCons [puts a correct build first](https://scons.org/doc/production/HTML/scons-user/pr01.html#sect-principles): by default, it [decides a file has changed from a hash of its contents](https://scons.org/doc/production/HTML/scons-user/ch06.html#sect-contentsigs), not its modification time.

Invoke turns your project's shell commands into Python tasks. [Write them in a `tasks.py`](https://docs.pyinvoke.org/en/stable/getting-started.html#defining-and-running-task-functions) as `@task` functions whose first argument is a context, and [run commands with `c.run()`](https://docs.pyinvoke.org/en/stable/getting-started.html#running-shell-commands). [Each parameter becomes a CLI flag](https://docs.pyinvoke.org/en/stable/getting-started.html#task-parameters), and `invoke --list` shows your tasks. A task can name [pre-tasks](https://docs.pyinvoke.org/en/stable/getting-started.html#declaring-pre-tasks) to run first, like `clean` before `build`. When one flat list of tasks gets crowded, [group them into namespaces](https://docs.pyinvoke.org/en/stable/getting-started.html#creating-namespaces) with `Collection`.

Invoke can also [power your own CLI program](https://docs.pyinvoke.org/en/stable/concepts/library.html#reusing-invoke-s-cli-module-as-a-distinct-binary), with your tasks as its commands. It [sticks to local commands](https://www.pyinvoke.org/faq.html#why-was-invoke-split-off-from-the-fabric-project) and leaves servers and network commands to a separate library built on it.

doit runs only what changed. [Tasks live in a `dodo.py`](https://pydoit.org/tasks.html#intro): each function whose name starts with `task_` returns a dict, and its [actions](https://pydoit.org/tasks.html#actions) are shell commands or Python functions. [List a task's `file_dep` and `targets`](https://pydoit.org/tasks.html#dependencies-targets), and doit skips it when its dependencies haven't changed and its targets exist. Inputs [don't have to be files](https://pydoit.org/dependencies.html#uptodate): an `uptodate` check such as `config_changed` reruns a task when a config string or dict changes.

Looking for the tool that builds your package's wheels and publishes them to PyPI? That's packaging, covered in [Package Management](/categories/package-management/).
