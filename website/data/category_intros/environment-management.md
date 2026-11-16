As a Python environment manager, uv installs interpreters and creates virtual environments. Add mise when a repo pins other languages, or pyenv to compile Python.

How to choose:

- Python versions and virtual environments in one tool: uv
- A repo that pins other languages' runtimes too: mise, with uv for Python
- Interpreters you compile with your own build options: pyenv
- Plugins, or a Python API to create environments from your own tool: virtualenv

### uv

Pick uv for a Python-only project: one tool installs the interpreter and creates the virtual environment, and it's built to [replace pyenv and virtualenv](https://docs.astral.sh/uv/). It downloads [prebuilt interpreters](https://docs.astral.sh/uv/concepts/python-versions/#managed-python-distributions) instead of compiling them. It also installs a missing version when a command needs it, so you [don't need to install Python to get started](https://docs.astral.sh/uv/guides/install-python/). uv keeps the project's environment in a `.venv` directory next to `pyproject.toml`, where your editor finds it, and [`uv run`](https://docs.astral.sh/uv/concepts/projects/layout/#the-project-environment) runs a command inside it.

### mise

Pick mise when a repo pins other languages' runtimes next to Python, and pair it with uv for the Python side. mise installs [a project's tools, sets its environment variables, and runs its tasks](https://mise.jdx.dev/) from one `mise.toml`. For a uv project, its docs say to [let uv own the environment](https://mise.jdx.dev/lang/python.html#uv-projects). Start with [`mise use`](https://mise.jdx.dev/lang/python.html#quick-start), which writes the Python version to `mise.toml`. In a project without uv, mise can still [create and activate the virtual environment](https://mise.jdx.dev/lang/python.html#python-venv).

### pyenv

Keep pyenv when you compile your own interpreters. It's a [single-purpose tool](https://github.com/pyenv/pyenv) for installing and switching Python versions. It [builds most releases from source](https://github.com/pyenv/pyenv#install-additional-python-versions), so you need Python's build dependencies installed, and you can pass your own options to customize the build. [`pyenv local`](https://github.com/pyenv/pyenv#switch-between-python-versions) selects a version for the current directory and everything under it. Pair it with virtualenv, which [resolves pyenv's shims](https://virtualenv.pypa.io/en/latest/how-to/usage.html#using-version-managers-pyenv-mise-asdf) to the real interpreter when it creates an environment.

### virtualenv

Pick virtualenv when you need its [plugins or its Python API](https://virtualenv.pypa.io/en/latest/explanation.html#virtualenv-vs-venv-vs-uv). [Several tools build on virtualenv](https://virtualenv.pypa.io/en/latest/#related-projects) for higher-level workflows. From your own code, call [`virtualenv.cli_run()`](https://virtualenv.pypa.io/en/latest/reference/api.html) with the same arguments the command line takes. If you want raw speed or already use uv, virtualenv's own docs point you to uv.

### Pinning the Python version

Pin the version in a `.python-version` file, which pyenv and uv both read. [`uv python pin`](https://docs.astral.sh/uv/concepts/python-versions/#python-version-files) writes it, and uv's docs recommend a plain version number in it for interoperability with other tools. mise reads the file only once you [turn on version files](https://mise.jdx.dev/lang/python.html#version-files), and a version in `mise.toml` takes precedence, so keep one source of truth.
