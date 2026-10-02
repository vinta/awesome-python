Lint and format with Ruff. It doesn't check types, so add a type checker, and let pre-commit run each Python code analysis tool on every commit.

How to choose:

- Linting, formatting, and import sorting in one tool: Ruff
- Running every check before each commit: pre-commit
- Rules on which of your modules may import which: Import Linter
- Unused code: Vulture
- Functions too complex for people to read: complexipy
- Several analyzers under one command, with ready-made profiles: Prospector
- Black's own formatting, with imports sorted to match: Black and isort
- Checks Ruff can't run: Pylint for deeper inference, Flake8 for your own plugins
- Security issues: Bandit
- Renaming and moving code from your editor or a script: Rope
- Type checking Django or Pydantic code: mypy with its plugins, Pyrefly without
- Adding types to a partly typed codebase: ty
- Type checking in VS Code: Pyright, which Pylance runs on

Ruff [can replace Flake8, Black, and isort](https://docs.astral.sh/ruff/), plus dozens of Flake8 plugins. Its docs suggest you [start with a small rule set](https://docs.astral.sh/ruff/linter/#rule-selection), add one group at a time, and list them explicitly in `select`. Ruff is [a linter, not a type checker](https://docs.astral.sh/ruff/faq/#how-does-ruff-compare-to-ty-mypy-pyright-or-pyre), so run a type checker alongside it.

pre-commit installs and runs the hooks you list in `.pre-commit-config.yaml`, [written in any language](https://pre-commit.com/). Run `pre-commit install` [first thing after you clone](https://pre-commit.com/#usage) a repo that uses it, so the hooks run on every `git commit`, and add `pre-commit run --all-files` [as a CI step](https://pre-commit.com/#usage-in-continuous-integration).

Import Linter checks [contracts on the imports between your modules](https://import-linter.readthedocs.io/en/stable/): `lint-imports` fails when code breaks one. A [layers contract](https://import-linter.readthedocs.io/en/stable/contract_types/layers/) lets higher layers import lower ones but not the other way around, and it counts chains of imports through other modules too.

Vulture finds unused code, and [running it on your tests too](https://github.com/jendrikseipp/vulture) shows you untested code.

complexipy measures [cognitive complexity](https://complexipy.com/): how hard code is for people to understand. Unlike cyclomatic complexity, it counts nesting. Its docs recommend [running it alongside Ruff](https://complexipy.com/comparison-with-ruff/#use-both-recommended), whose complexity rule measures something else.

Prospector runs Pylint and other analyzers together, and aims to be [useful out of the box](https://prospector.landscape.io/en/stable/), with default profiles so you don't have to sort out which warnings matter. When your project uses Django, Flask, or Celery, it [adapts its checks](https://prospector.landscape.io/en/stable/#adapting-to-dependencies) to that framework.

With Black, you [give up control over hand-formatting](https://black.readthedocs.io/en/stable/), and in return, code looks the same in every project and diffs stay small. Its style options are [deliberately limited](https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html). If you sort imports with isort, set [the black profile](https://isort.readthedocs.io/en/latest/configuration/black_compatibility.html) so the two agree.

Pylint [infers the actual values](https://pylint.readthedocs.io/en/latest/#what-differentiates-pylint) in your code instead of trusting its type hints. That makes it slower than other linters, but it finds more in code that isn't fully typed, and it's why Ruff [isn't a drop-in replacement](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-pylint) for Pylint. Because of that speed, run it [in CI or a pre-push hook](https://pylint.readthedocs.io/en/latest/user_guide/installation/pre-commit-integration.html) rather than on every commit.

Flake8 [wraps pyflakes, pycodestyle, and McCabe](https://github.com/PyCQA/flake8) in one command, and [its plugins](https://flake8.pycqa.org/en/latest/user/using-plugins.html) are much of its appeal. Keep it when you depend on a plugin of your own, since Ruff [doesn't support custom lint rules](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8).

Bandit [finds common security issues](https://bandit.readthedocs.io/en/latest/) in Python code. Scan a whole tree with [`bandit -r`](https://bandit.readthedocs.io/en/latest/start.html).

Rope is a refactoring library that [many IDEs and editors use](https://rope.readthedocs.io/en/latest/overview.html) to rename, extract, and move code, and scripts can run the same refactorings through [its library API](https://rope.readthedocs.io/en/latest/library.html).

mypy is [designed for gradual typing](https://mypy.readthedocs.io/en/stable/): by default, it [skips functions without annotations](https://mypy.readthedocs.io/en/stable/getting_started.html#dynamic-vs-static-typing), so you can add type hints slowly. Check in one config file, [run mypy in CI](https://mypy.readthedocs.io/en/stable/existing_code.html#run-mypy-consistently-and-prevent-regressions) so new type errors don't land, and aim for `--strict`. Its [plugins](https://mypy.readthedocs.io/en/stable/extending_mypy.html#extending-mypy-using-plugins) teach it libraries the standard type system can't describe.

Pyrefly is a type checker and language server with [built-in support for Pydantic and Django](https://github.com/facebook/pyrefly), so those work without plugins. It reads an existing mypy or Pyright config, so you can [try it alongside your current checker](https://pyrefly.org/en/docs/compare/#try-it-alongside-your-current-checker) before you switch.

ty is a type checker and language server [designed for adoption](https://docs.astral.sh/ty/) on partly typed code. Unlike mypy, it [checks the bodies of unannotated functions](https://docs.astral.sh/ty/coming-from-mypy-or-pyright/), and it leaves [missing-annotation checks](https://docs.astral.sh/ty/reference/typing-faq/#why-doesnt-ty-warn-about-missing-type-annotations) to Ruff's `ANN` rules.

Pyright [checks all code by default](https://github.com/microsoft/pyright/blob/main/docs/mypy-comparison.md#type-checking-unannotated-code), annotated or not, which its language server features rely on. In VS Code, its docs [recommend Pylance](https://github.com/microsoft/pyright/blob/main/docs/installation.md), which includes Pyright. Run it [in CI to keep the project type clean](https://github.com/microsoft/pyright/blob/main/docs/getting-started.md), then turn on `# pyright: strict` file by file.

Pylint, Prospector, Import Linter, and ty all need to see your project's dependencies, so run them [from the project's own environment](https://pylint.readthedocs.io/en/latest/user_guide/installation/pre-commit-integration.html), not a separate one. For more Python code analysis tools, see [awesome-static-analysis](https://github.com/analysis-tools-dev/static-analysis).
