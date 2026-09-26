For a Python CLI framework, use Typer, or argparse when a script can't take dependencies. For a full-screen terminal app, use Textual.

How to choose:

- A new CLI: Typer
- A script that runs on the standard library alone: argparse
- Decorators instead of type hints, or subcommands loaded lazily at runtime: Click
- A quick CLI over an existing function or class, for debugging or exploring code: Fire
- An interactive prompt with completion, history, and key bindings: prompt_toolkit
- Colored output, tables, and pretty logs: Rich
- A progress bar on a loop: tqdm, or alive-progress for animated bars
- A full-screen terminal UI: Textual, or urwid inside an event loop you already run, such as Twisted or Trio
- ASCII animations and effects: asciimatics
- ANSI colors on Windows consoles: colorama

With Typer, declare each parameter with `Annotated`. Its tutorial keeps repeating one line: ["Prefer to use the `Annotated` version if possible."](https://typer.tiangolo.com/tutorial/arguments/optional/) Create one `typer.Typer()` app and register your commands on it. Test them with `CliRunner`, which calls the app with a list of arguments and gives you back the exit code and output.

Typer builds on Click, so reach for Click itself when you'd rather write decorators, or when your app has so many subcommands that they should [load lazily at runtime](https://click.palletsprojects.com/en/stable/). Group commands with `@click.group()`, and test them with `click.testing.CliRunner`.

Use argparse when the tool has to run without installing anything. Python's own docs call it [the recommended choice](https://docs.python.org/3/library/optparse.html#choosing-an-argument-parser) among the standard library's parsers, and `add_subparsers()` handles subcommands.

With Rich, create one `Console` and share it across the app: ["Most applications will require a single Console instance"](https://rich.readthedocs.io/en/stable/console.html). Add a second one with `stderr=True` for errors, and pass `RichHandler` to `logging.basicConfig()` so your logs get the same formatting.

With Textual, keep styles in a separate `.tcss` file and run `textual run --dev` to [live edit them](https://textual.textualize.io/guide/CSS/). For tests, `run_test()` starts the app headless and gives you a `Pilot` that presses keys and clicks widgets.

Whatever you pick, ship the CLI as a package, not a script. Click's docs put it plainly: ["It's recommended to write command line utilities as installable packages with entry points instead of telling users to run `python hello.py`."](https://click.palletsprojects.com/en/stable/entry-points/) Declare the command under `[project.scripts]` in `pyproject.toml`, and users can install it with pipx or `uv tool install`.
