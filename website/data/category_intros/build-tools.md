Run the commands named in pyproject.toml with Poe the Poet, or tasks written in Python with Invoke. To rebuild only what changed, use doit, or SCons for C and C++.

How to choose:

- Short names for a project's commands, kept in pyproject.toml: Poe the Poet
- Tasks written as Python functions that run shell commands: Invoke
- Tasks that skip work whose input files haven't changed: doit
- Replacing Make in a C or C++ project: SCons

### Poe the Poet

Pick Poe the Poet over Invoke when you'd rather declare your tasks than code them. It keeps them in `pyproject.toml` and [runs them in your project's virtual environment](https://poethepoet.natn.io/), so with Poetry or uv you skip `poetry run` and `uv run`. List your tasks under `[tool.poe.tasks]`, where a string is [a command run without a shell](https://poethepoet.natn.io/tasks/index.html), an array runs other tasks in order, and a `script` task calls a Python function. Then run one by name, like `poe test`.

### Invoke

Pick Invoke when you'd rather write tasks as Python functions that run shell commands. [Make a file called `tasks.py`](https://docs.pyinvoke.org/en/latest/getting-started.html), decorate each function with `@task`, and give it a context argument as its first parameter, `c` by convention. `c.run()` runs a shell command and returns a result with its output and exit code. The function's arguments become command-line flags, and [one call can run several tasks](https://www.pyinvoke.org/), like `invoke clean build`.

### doit

Pick doit when a rerun should skip tasks whose inputs haven't changed: it [tracks file dependencies](https://pydoit.org/). Write tasks in `dodo.py` as functions named `task_*` that [return dictionaries](https://pydoit.org/tasks.html): `actions` holds shell commands or Python functions, `file_dep` the input files, and `targets` the files a task creates. Run `doit`, and a second run with unchanged inputs does nothing.

### SCons

Pick SCons to replace Make in a C or C++ project when you'd rather write the build in Python. Its `SConstruct` file is [the SCons equivalent of a Makefile](https://scons.org/doc/latest/HTML/scons-user/ch02s05.html), and it's a Python script: [`Program('hello.c')`](https://scons.org/doc/latest/HTML/scons-user/ch02.html) is a complete one. SCons [scans your source files for `#include` lines](https://scons.org/doc/latest/HTML/scons-user/ch06s02.html) and records each header it includes as a dependency, with no `make depend` step. It decides whether a file changed [by a hash of its contents](https://scons.org/doc/latest/HTML/scons-user/ch06.html), not its modification time, so touching a file doesn't trigger a rebuild.

### Packaging a Python project

To build or publish your own Python package, see [Package Management](/categories/package-management/).
