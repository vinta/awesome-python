uv manages your project with a lockfile, and doubles as a Python package manager. Its uv-build backend packages pure-Python code with reasonable defaults.

How to choose:

- A new project, from installing Python to locking dependencies: uv
- Packaging pure-Python code in a uv project: uv-build
- Installing packages with only what ships with Python: pip
- A project already on Poetry, or one that relies on its plugins: Poetry
- Tests across a matrix of Python versions: Hatch
- Command-line apps, each in its own environment: pipx, or `uv tool` on uv
- Scientific stacks with non-Python libraries: conda
- C or C++ extension modules: setuptools
- Build hooks, or a layout uv-build doesn't expect: Hatchling
- Building a Poetry project without Poetry installed: poetry-core

uv is [a single tool](https://docs.astral.sh/uv/) for Python versions, virtual environments, dependencies, and command-line tools. Start a project with `uv init`, add packages with `uv add`, and run code with `uv run`, which [checks that the lockfile and environment are up to date](https://docs.astral.sh/uv/guides/projects/#running-commands) before every run. The `uv pip` commands are [for projects not ready to move away from pip](https://docs.astral.sh/uv/pip/), not the main interface.

uv-build is uv's own build backend, and `uv init` [sets it up](https://docs.astral.sh/uv/concepts/projects/init/) with your code in `src/<project_name>/`. When you need build scripts or a more flexible layout, uv's docs [suggest Hatchling instead](https://docs.astral.sh/uv/concepts/build-backend/#choosing-a-build-backend).

pip [installs packages](https://pip.pypa.io/en/stable/) from PyPI and other indexes. It comes with Python, but managing environments, the interpreter, and the project as a whole is [outside its scope](https://pip.pypa.io/en/stable/topics/workflow/). Run it as `python -m pip`, so you [know which Python](https://pip.pypa.io/en/stable/user_guide/#running-pip) gets the package.

Poetry [manages your dependencies and builds your package](https://python-poetry.org/docs/), with a lockfile for repeatable installs. For a project you won't publish, [turn off package mode](https://python-poetry.org/docs/basic-usage/#operating-modes) and use Poetry for dependencies only. Its build backend, poetry-core, lets pip [build and install your project](https://github.com/python-poetry/poetry-core) without Poetry.

Hatch [manages environments, builds, and Python installs](https://hatch.pypa.io/latest/) for your project. `hatch run test:pytest` [runs pytest in a `test` environment](https://hatch.pypa.io/latest/tutorials/environment/basic-usage/) without activating it, and creates that environment on first use. A [matrix](https://hatch.pypa.io/latest/environment/#matrix) repeats an environment across Python versions.

Hatchling is Hatch's build backend, [developed with Hatch but separate from it](https://packaging.python.org/en/latest/guides/tool-recommendations/). It [takes the files to ship from your `.gitignore`](https://hatch.pypa.io/latest/why/#build-backend) and builds reproducible wheels and sdists by default.

pipx installs command-line apps [each in its own virtual environment](https://pipx.pypa.io/latest/), so their dependencies never collide, and puts their commands on your PATH. To try an app once, [`pipx run`](https://pipx.pypa.io/latest/tutorial/getting-started.html) runs it in a temporary environment. `uv tool` does the same job on uv, and pipx's docs say [running both is fine](https://pipx.pypa.io/latest/explanation/comparisons.html#picking-one).

conda manages [packages and environments for any language](https://docs.conda.io/projects/conda/en/latest/), and [its packages](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/packages.html) can hold system libraries and programs, not only Python modules. Keep your requirements in a file, and [use pip only after conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#pip-in-env) has installed everything it can.

setuptools [builds C and C++ extension modules](https://setuptools.pypa.io/en/latest/userguide/ext_modules.html), and Hatch's docs [recommend it](https://hatch.pypa.io/latest/why/#build-backend) for them. Keep its configuration in pyproject.toml and `setup.py` [minimal, if you need one at all](https://setuptools.pypa.io/en/latest/userguide/quickstart.html#setuppy-discouraged), and don't run `setup.py` as a script.

Whichever tool writes your lockfile, commit it to version control, as [uv](https://docs.astral.sh/uv/guides/projects/#uvlock) and [Poetry](https://python-poetry.org/docs/basic-usage/#committing-your-poetrylock-file-to-version-control) both recommend, so every machine installs the same versions.
