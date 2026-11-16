Manage a new project with uv. Use pip where you can't install more tools, and conda when your packages need non-Python libraries.

How to choose:

- A new project: uv
- Learning Python, or no tools beyond a standard install: pip
- Non-Python libraries, as scientific stacks often need: conda
- A project already on Poetry, or one built around its plugins: Poetry
- Testing a library across Python versions: Hatch
- Command-line apps, when you don't already use uv: pipx
- A build backend for C or C++ extensions: setuptools
- A build backend for a pure-Python package: Hatchling
- A build backend for a Poetry project: poetry-core
- A minimal build backend with no plugins: flit-core
- A build backend for a pure-Python uv project: uv-build

### uv

Pick uv for a new project. It [manages your project's dependencies and environments](https://docs.astral.sh/uv/) and keeps a lockfile. Its docs pitch it as one tool to replace pip, pipx, and Poetry, among others. Add each dependency with [`uv add`](https://docs.astral.sh/uv/guides/projects/#managing-dependencies), which writes it to pyproject.toml and updates the lockfile and the project's environment.

### pip

Use pip when you're learning Python, or where you can't install tools beyond a standard Python setup. It's [the standard tool to install packages from PyPI](https://packaging.python.org/en/latest/guides/tool-recommendations/#installing-packages), and it comes with most Python installations. Pip manages the packages in an environment, and leaves creating environments and [managing the overall project](https://pip.pypa.io/en/latest/topics/workflow/) to other tools. To repeat an install on another machine, [`pip freeze`](https://pip.pypa.io/en/latest/topics/repeatable-installs/#pinning-the-package-versions) writes a requirements file that pins every package, dependencies included.

### conda

Pick conda when your packages need non-Python libraries, as scientific stacks often do. Conda manages packages [for any language](https://packaging.python.org/en/latest/key_projects/#conda), but installs only those built for conda, not the ones on PyPI. Start with `conda create` to make an environment. When you also need PyPI packages, [install as much as you can with conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#using-pip-in-an-environment), then use pip for the rest.

### Poetry

Keep Poetry on a project already built on it, especially one that relies on a plugin: Poetry [supports plugins](https://python-poetry.org/docs/plugins/) that alter or expand what it does. On such a project, [`poetry install`](https://python-poetry.org/docs/basic-usage/#installing-with-poetrylock) installs the exact versions listed in poetry.lock.

### Hatch

Pick Hatch to test a library across Python versions. Its environments can define [a matrix](https://hatch.pypa.io/latest/config/environment/advanced/#matrix) of Python versions, and [`hatch test`](https://hatch.pypa.io/latest/tutorials/testing/overview/#environment-selection) runs your tests in one of them or in all of them.

### pipx

Use pipx to install command-line apps when you don't already use uv. Its own docs [point you to `uv tool`](https://pipx.pypa.io/latest/explanation/comparisons.html#picking-one) when you already run uv for Python installs or scripts and want one binary for everything. [`pipx install`](https://pipx.pypa.io/latest/) puts each app in its own virtual environment, so their dependencies never collide.

### setuptools

Pick setuptools to build C or C++ extension modules, which Hatch's docs [leave to setuptools](https://hatch.pypa.io/latest/why/#build-backend) or a backend built for compilers. Declare each module as a [`setuptools.Extension`](https://setuptools.pypa.io/en/latest/userguide/ext_modules.html) in setup.py, and keep everything else in pyproject.toml.

### Hatchling

Pick Hatchling for a pure-Python package. For such a package, the backend matters little. The Python Packaging User Guide's tutorial [uses Hatchling by default](https://packaging.python.org/en/latest/tutorials/packaging-projects/#choosing-a-build-backend), and says its steps work the same with any backend that reads the standard `[project]` table. Name `hatchling.build` as the build backend in pyproject.toml.

### poetry-core

Use poetry-core as the build backend of a Poetry project, where `poetry new` sets it up. With it in place, [pip can build and install your project](https://github.com/python-poetry/poetry-core) without Poetry installed.

### flit-core

Pick flit-core for plain Python code with no build step, when you want [a minimal backend with no plugins](https://packaging.python.org/en/latest/guides/tool-recommendations/#build-backends). It [takes the version number](https://flit.pypa.io/en/latest/rationale.html) from your package's `__version__`, and includes subpackages and data files automatically.

### uv-build

Use uv-build for a pure-Python package in a uv project, where `uv init` sets it up. It checks your metadata and project layout to catch common mistakes. When you need build scripts or a more flexible layout, uv's docs [suggest Hatchling instead](https://docs.astral.sh/uv/concepts/build-backend/).

### Committing the lockfile

In a uv or Poetry project, commit the lockfile, so every machine installs the same versions. uv's docs say [uv.lock should be checked into version control](https://docs.astral.sh/uv/guides/projects/#uvlock), and Poetry's tell app developers to [commit poetry.lock](https://python-poetry.org/docs/basic-usage/#committing-your-poetrylock-file-to-version-control).
