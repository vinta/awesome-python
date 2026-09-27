Run Ruff for Python code analysis: it lints and formats. Add a type checker, since Ruff doesn't check types, and pre-commit to run Ruff on every commit.

How to choose:

- Rules on which modules may import which: Import Linter
- Dead code: Vulture, or repowise to index the repo for your agent
- Deeply nested functions that are hard to read: complexipy
- Several analysis tools behind one command: Prospector
- Checks before every commit: pre-commit
- Linting, formatting, and import sorting: Ruff
- Formatting without Ruff: Black, with isort on its black profile
- Deeper inference and checks of your own: Pylint
- Flake8 plugins Ruff doesn't have: Flake8
- Security issues: Bandit
- Refactoring: Rope
- Type checking: mypy, or Pyright, ty, or Pyrefly to also check unannotated code
- Type hints from the types your code sees at runtime: MonkeyType

Ruff lints and formats in one tool, and its FAQ lists what it [can replace](https://docs.astral.sh/ruff/faq/#which-tools-does-ruff-replace): Flake8 and dozens of its plugins, Black, and isort. To sort imports and format, [run the linter, then the formatter](https://docs.astral.sh/ruff/formatter/#sorting-imports): `ruff check --select I --fix`, then `ruff format`. When you turn on a new rule in an existing codebase, [`--add-noqa`](https://docs.astral.sh/ruff/tutorial/#adding-rules) marks the current violations, so the rule only applies to new code.

Pick one formatter and stay with it. Ruff's formatter is designed as a drop-in replacement for Black, but it's [not meant to be used interchangeably with Black](https://docs.astral.sh/ruff/formatter/) over time. If you pick Black, set isort's black profile [in a config file at the root of your repo](https://isort.readthedocs.io/en/latest/configuration/black_compatibility.html), so it applies however isort runs. To adopt Black, [reformat everything in one commit](https://black.readthedocs.io/en/stable/guides/introducing_black_to_your_project.html) and list that commit in `.git-blame-ignore-revs`, so `git blame` skips it.

Ruff can be a [drop-in replacement for Flake8](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8) when your code is formatted with Black and uses few or no Flake8 plugins. Keep Flake8 when you depend on a plugin Ruff doesn't cover. In pre-commit, install the plugin [through `additional_dependencies`](https://flake8.pycqa.org/en/latest/user/using-hooks.html).

Pylint [doesn't trust your type hints](https://pylint.readthedocs.io/en/stable/). It infers the actual values instead, which makes it slower but finds more issues in code that isn't fully typed. You can also write plugins for checks of your own. On a legacy project, start with `--errors-only`, then turn more messages on over time. Because of its speed, Pylint's docs suggest running it [in CI or a pre-push hook](https://pylint.readthedocs.io/en/stable/user_guide/installation/pre-commit-integration.html), not on every commit.

Bandit [finds common security issues](https://github.com/PyCQA/bandit) by walking each file's syntax tree. On an existing project, [save a baseline](https://bandit.readthedocs.io/en/latest/start.html) to ignore the findings you've judged to be non-issues. When you skip a line, write `# nosec B602` instead of a bare `# nosec`, so [a new issue on that line still shows up](https://bandit.readthedocs.io/en/latest/config.html).

Ruff is [a linter, not a type checker](https://docs.astral.sh/ruff/faq/#how-does-ruff-compare-to-mypy-or-pyright-or-pyre), so add one. mypy is [designed for gradual typing](https://mypy.readthedocs.io/en/stable/), and by default it skips functions without annotations. On an existing codebase, its docs suggest [starting with part of the code](https://mypy.readthedocs.io/en/stable/existing_code.html), running it in CI early, turning on `check_untyped_defs` as soon as you can, and aiming for `mypy --strict`.

Pyright, ty, and Pyrefly each come with a language server for your editor, and they check unannotated code too. Pyright [checks all code regardless of annotations](https://github.com/microsoft/pyright/blob/main/docs/mypy-comparison.md). Commit its config, [run it in CI](https://github.com/microsoft/pyright/blob/main/docs/getting-started.md), and turn on strict mode file by file with `# pyright: strict`.

ty is [designed for adoption](https://docs.astral.sh/ty/), with support for partially typed code. Add it as a [dev dependency](https://docs.astral.sh/ty/installation/), so everyone runs the same version. Pick Pyrefly when your code uses [Pydantic, Django, or attrs](https://pyrefly.org/en/docs/compare/) and you don't want the overhead of plugins. To switch to it, `pyrefly init` [migrates your existing type checker config](https://pyrefly.org/en/docs/installation/), and `pyrefly suppress` marks the current errors as ignored, so you start from a clean check.

Import Linter checks [contracts on your imports](https://import-linter.readthedocs.io/en/stable/), such as layers: higher layers may import lower ones, not the other way around. Vulture finds unused code. For its false positives, it recommends [a whitelist over `noqa` comments](https://github.com/jendrikseipp/vulture). After you delete dead code, run it again, since it may find more. complexipy measures how hard code is for people to understand, and its docs say to [run it alongside Ruff](https://complexipy.com/comparison-with-ruff/): Ruff catches wide functions, complexipy catches deep ones. On a large existing codebase, [take a snapshot](https://complexipy.com/usage-guide/) first, so only new complexity fails.

Prospector wraps several analysis tools and aims to be [useful out of the box](https://github.com/prospector-dev/prospector). repowise indexes your repo for coding agents and developers, with dead code and git history in the same index. It's licensed under the [AGPL, or a commercial license](https://github.com/repowise-dev/repowise).

Rope is a refactoring library, and its wiki suggests [starting with its language server plugin](https://github.com/python-rope/rope/wiki/How-to-use-Rope-in-my-IDE-or-Text-editor%3F) before the native editor integrations. MonkeyType records the types your code sees at runtime and writes annotations from them, which its docs call [an informative first draft](https://monkeytype.readthedocs.io/en/latest/) for you to check and fix. mypy's docs suggest [collecting types from test runs](https://mypy.readthedocs.io/en/stable/existing_code.html) this way.

pre-commit runs your hooks [before every commit](https://pre-commit.com/). Run `pre-commit install` after every clone, `pre-commit run --all-files` when you add a hook, and the same command in CI. With Ruff's hooks, [put the lint hook with `--fix` before the formatter](https://docs.astral.sh/ruff/integrations/#pre-commit), since its fixes can leave code that needs reformatting.

The checkers here do static code analysis: they check your code without running it. MonkeyType is the exception, since it records types while your code runs. Run Ruff [in your editor](https://docs.astral.sh/ruff/editors/) and on every commit, and Pylint and your type checker in CI.
