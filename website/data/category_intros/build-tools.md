Tasks like running your tests go in pyproject.toml for Poe the Poet to run. C and C++ projects that replace Make with a Python build tool pick SCons.

How to choose:

- Project tasks in pyproject.toml, run in your uv or Poetry environment: Poe the Poet
- Compiling C or C++ in place of Make: SCons
- Tasks written as Python functions that run shell commands: Invoke
- Steps that skip when their input files haven't changed: doit

Poe the Poet reads tasks from a [`[tool.poe.tasks]` table](https://poethepoet.natn.io/tasks/index.html) in pyproject.toml. A string like `test = "pytest"` is a whole task, run as a command without a shell. In a uv or Poetry project, poe [runs tasks in the project's virtualenv](https://poethepoet.natn.io/#quick-start), so you don't type `uv run` or `poetry run` in front.

Invoke tasks are Python functions in a [`tasks.py` file](https://docs.pyinvoke.org/en/latest/getting-started.html#defining-and-running-task-functions), decorated with `@task` and taking a context as their first argument. Inside, `c.run()` runs a shell command. A function's arguments [become CLI flags](https://docs.pyinvoke.org/en/latest/getting-started.html#task-parameters), and a task can name [pre-tasks](https://docs.pyinvoke.org/en/latest/getting-started.html#declaring-pre-tasks) to always run before it.

doit reads tasks from a [`dodo.py` file](https://pydoit.org/tutorial-1.html), where each `task_` function returns a dict of actions, file dependencies, and targets instead of running anything. It saves a [signature of each `file_dep`](https://pydoit.org/tasks.html#file-dep) and skips a task whose inputs haven't changed. A task that [declares no input](https://pydoit.org/dependencies.html#doit-up-to-date-definition) never counts as up to date, so list the files each task reads in `file_dep`.

SCons reads your build from an [`SConstruct` file, which is a Python script](https://scons.org/doc/production/HTML/scons-user.html#sect-sconstruct-python): `Program('hello.c')` there is enough for `scons` to compile a program. Calling a builder like `Program()` [declares what you want built](https://scons.org/doc/production/HTML/scons-user.html#sect-order-independent) instead of building it on that line, and SCons works out when to run each step.
