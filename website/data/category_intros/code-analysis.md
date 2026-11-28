Start Python code analysis with Ruff: it lints and formats. Ruff doesn't check types, so add a type checker, and have pre-commit run both on every commit.

How to choose:

- Linting and formatting: Ruff
- Type checks that rely on mypy plugins: mypy
- A type checker from the makers of Ruff: ty
- Type checking in your editor: Pyright through Pylance in VS Code, basedpyright elsewhere
- A new checker that reads your existing mypy config: Pyrefly
- Running your checks on every commit: pre-commit
- Rules for which modules may import which: Import Linter
- Dead code or tangled functions: Vulture, or complexipy for complexity
- Pylint, pycodestyle, and McCabe under one command: Prospector
- Inference-based checks on code that isn't fully typed: Pylint
- A lint plugin of your own: Flake8
- Security scans with a baseline of known issues: Bandit
- Refactoring: Rope, or ast-grep to rewrite code by pattern

### Ruff

Pick Ruff as your linter and formatter: its docs say it [can replace Flake8 and dozens of its plugins, Black, and isort](https://docs.astral.sh/ruff/). Start with [the default rule set](https://docs.astral.sh/ruff/rules/): it catches common errors like unused imports with zero configuration. Run `ruff check` to lint and `ruff format` to format. The formatter is a drop-in replacement for Black, but it [isn't meant to be used interchangeably with Black](https://docs.astral.sh/ruff/formatter/), so pick one per project. Ruff is [a linter, not a type checker](https://docs.astral.sh/ruff/faq/#how-does-ruff-compare-to-ty-mypy-pyright-or-pyre), and its docs recommend running one alongside it.

### mypy

Pick mypy when your code relies on a mypy plugin, since [Pyright](https://github.com/microsoft/pyright/blob/main/docs/mypy-comparison.md#plugins) and ty have no plugin system. Its [plugins](https://mypy.readthedocs.io/en/latest/extending_mypy.html) teach mypy about libraries that are hard to describe with standard type hints. By default, mypy [skips functions without annotations](https://mypy.readthedocs.io/en/latest/getting_started.html), while Pyright and ty check their bodies too. On an existing codebase, its docs say to [start small](https://mypy.readthedocs.io/en/latest/existing_code.html#start-small): get mypy passing on one part of the code before you add annotations.

### ty

Pick ty when you already run Ruff and want a type checker from the same team, [designed for adoption](https://docs.astral.sh/ty/) on partially typed code. It [doesn't flag missing annotations](https://docs.astral.sh/ty/reference/typing-faq/#why-doesnt-ty-warn-about-missing-type-annotations) and infers types where it can. For that check, its docs point you to Ruff's opt-in `ANN` rules. Run `ty check`, and it checks every Python file in your project.

### Pyright

Pick Pyright for type checking in VS Code, where its docs [recommend the Pylance extension](https://github.com/microsoft/pyright/blob/main/docs/installation.md). Pylance runs Pyright's checker and adds features like semantic highlighting. Pyright is [a standards-based type checker](https://github.com/microsoft/pyright) built for large codebases. Start with [a minimal `pyrightconfig.json`](https://github.com/microsoft/pyright/blob/main/docs/getting-started.md) that lists the code to check, run Pyright with its default settings, then add annotations as you go.

### basedpyright

Pick basedpyright for Pyright's checks with [every diagnostic rule on by default](https://docs.basedpyright.com/latest/benefits-over-pyright/better-defaults/), the less severe ones reported as warnings. It also brings [Pylance's features to any editor](https://docs.basedpyright.com/latest/benefits-over-pyright/pylance-features/) that supports the language server protocol. On an existing project, write [a baseline](https://docs.basedpyright.com/latest/benefits-over-pyright/baseline/) of the current errors and commit it, so only new or modified code reports errors.

### Pyrefly

Try Pyrefly on a project that runs mypy or Pyright today. When it finds that configuration and no Pyrefly config of its own, `pyrefly check` [reads it for the run](https://pyrefly.org/en/docs/compare/#try-it-alongside-your-current-checker) without writing anything to disk. To switch, run [`pyrefly init`](https://pyrefly.org/en/docs/installation/), which attempts to migrate that configuration.

### pre-commit

Use pre-commit to run your linters, formatters, and type checkers before every commit. It's [a multi-language package manager for git hooks](https://pre-commit.com/#introduction), and Ruff, Black, isort, Flake8, and Bandit all document a hook for it. List your hooks in `.pre-commit-config.yaml`, run `pre-commit install`, and [run them against all files](https://pre-commit.com/#quick-start) whenever you add one.

### Import Linter

Pick Import Linter to keep the parts of your architecture apart: it [imposes constraints on the imports](https://import-linter.readthedocs.io/en/latest/) between your modules. Write your contracts in a `.importlinter` file, and `lint-imports` fails whenever your code breaks one.

### Vulture

Pick Vulture to find unused code in a large codebase, from functions and classes to unreachable code. Point it at your files or packages, like [`vulture myscript.py mypackage/`](https://github.com/jendrikseipp/vulture#usage). Run it on your test suite too, and it also finds untested code.

### complexipy

Pick complexipy to flag functions whose control flow is hard to follow. It scores [cognitive complexity](https://complexipy.com/), where each level of nesting adds to a function's score. Run `complexipy .` on your project and set the score above which a function fails.

### Prospector

Pick Prospector to run several analysis tools as one: it [brings together](https://prospector.landscape.io/en/stable/) Pylint, pycodestyle, and McCabe complexity, with default profiles meant to be useful out of the box. Run `prospector` from your project root with no arguments, and it [figures out the rest](https://prospector.landscape.io/en/stable/usage.html) with sensible defaults.

### Pylint

Run Pylint next to Ruff for the checks its inference finds. Pylint [infers the actual values](https://pylint.readthedocs.io/en/latest/) in your code instead of trusting your type hints, so it finds more in code that isn't fully typed. Ruff's docs agree that [Pylint does more type inference](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-pylint), like checking the number of arguments in a call.

### Flake8

Keep Flake8 only when you depend on a plugin of your own, since Ruff [doesn't support custom lint rules](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8) and re-implements popular Flake8 plugins in Rust instead.

### Bandit

Keep Bandit next to Ruff when security checks need a workflow of their own. Bandit [finds common security issues](https://bandit.readthedocs.io/en/latest/) in Python code, and `bandit -r` scans a whole directory. It can compare a run against [a baseline report](https://bandit.readthedocs.io/en/latest/start.html#baseline) to skip known non-issues, report only high-severity issues, or run a single profile of tests, like ShellInjection. Its tests are plugins, so you can [write your own](https://bandit.readthedocs.io/en/latest/plugins/index.html).

### Rope

Pick Rope for refactorings like renaming and moving code: [many IDEs and editors use](https://rope.readthedocs.io/en/latest/overview.html) it to refactor Python, so you usually run it through your editor. From Python code, [start by making a project](https://rope.readthedocs.io/en/latest/library.html#making-a-project) for your folder, since refactorings change only the files inside it.

### ast-grep

Pick ast-grep to search and rewrite code by [syntax-tree patterns instead of text](https://ast-grep.github.io/guide/introduction.html), in Python and many other languages. It also lints with rules you write yourself: `ast-grep new` scaffolds a project, and [`ast-grep scan`](https://ast-grep.github.io/guide/scan-project.html) runs all its rules against your repo.

### More code analysis tools

For more, see [awesome-static-analysis](https://github.com/analysis-tools-dev/static-analysis) for linters in every language, [awesome-flake8-extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions) for Flake8 plugins, and [awesome-python-typing](https://github.com/typeddjango/awesome-python-typing) for type stubs, plugins, and tools.
