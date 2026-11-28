Pick Typer for a Python CLI if your code uses type hints, or Click for decorated commands. Small scripts need only the built-in argparse.

How to choose:

- A new CLI from functions with type hints: Typer
- Decorated commands in nested groups, or an existing Click CLI: Click
- A small script, or no room for a dependency: argparse
- A type-hinted CLI with each parameter's help in the docstring: Cyclopts
- Styled output, tables, tracebacks, and log formatting: Rich
- Progress bars: tqdm around loops and in notebooks, alive-progress for animated long tasks
- Raw ANSI color codes that must work on Windows: Colorama
- Banner text in ASCII-art fonts: pyfiglet
- A full-screen app that also runs in a browser: Textual
- Interactive prompts with history and autocompletion: prompt_toolkit
- A lower-level widget set for Unix-like systems: Urwid
- Full-screen forms and ASCII animations: asciimatics

### Typer

Pick Typer for a new CLI when your code already uses type hints. Typer [builds on Click's features](https://typer.tiangolo.com/alternatives/#click) but reads arguments and options from your function's typed parameters. Click declares each option in a decorator instead, so you repeat its name next to the variable. Pass a single function to `typer.run()`, or for several commands, [create a `typer.Typer()` app and register each with `@app.command()`](https://typer.tiangolo.com/). The function's docstring [becomes its help text](https://typer.tiangolo.com/tutorial/first-steps/).

### Click

Pick Click when you'd rather declare commands with decorators and compose them into nested groups, or when you're extending a CLI already built on it. Its core is [arbitrary nesting of commands](https://click.palletsprojects.com/en/latest/), with help pages generated for you and subcommands loaded lazily at runtime. [Commands are declared through decorators](https://click.palletsprojects.com/en/latest/quickstart/): `@click.command()` and `@click.option()` on a function, and `@click.group()` for a parent that other commands attach to.

### argparse

Use argparse for a small script, or wherever you can't add a dependency, since it ships with Python. The Python docs call it [the recommended choice](https://docs.python.org/3/library/optparse.html#choosing-an-argument-parser) for command-line apps when you have no more specific design constraints. Create an `ArgumentParser`, declare each input with `add_argument()`, and `parse_args()` returns them, with [help and usage messages generated automatically](https://docs.python.org/3/library/argparse.html).

### Cyclopts

Pick Cyclopts for a CLI built from type-hinted functions when you want to document each parameter in the docstring. It [generates help pages from docstrings](https://cyclopts.readthedocs.io/en/latest/), down to each entry in the docstring's Parameters section, which shows up next to that option. Pass a function to `cyclopts.run()`, or for more control, create an `App`, register commands with `@app.command`, and use `@app.default` for what runs when no command is given.

### Rich

Pick Rich for styled output: [color and style, tables, Markdown, and syntax-highlighted code](https://rich.readthedocs.io/en/latest/introduction.html). The quickest start is `from rich import print`, a drop-in replacement for the built-in. Add [`RichHandler`](https://rich.readthedocs.io/en/latest/logging.html) to logging to colorize your log output. [Install Rich as the traceback handler](https://rich.readthedocs.io/en/latest/traceback.html) to render uncaught exceptions with highlighting.

### tqdm

Pick tqdm to put a progress bar on a loop: [wrap any iterable with `tqdm(iterable)`](https://tqdm.github.io/), and you're done. It works in any console and in Jupyter notebooks, which suits data processing and ML loops.

### alive-progress

Pick alive-progress for long-running tasks where you want the bar animated. Its spinner [reacts to your actual processing speed](https://github.com/rsalmei/alive-progress). It also shows throughput and an ETA, and ends with a final receipt. Wrap your loop in `with alive_bar(total) as bar:` and call `bar()` per item.

### Colorama

Keep Colorama for code that writes raw ANSI escape codes and must run on Windows: it [makes those sequences work under MS Windows](https://github.com/tartley/colorama) and does nothing on other platforms. If that's all you need, call `just_fix_windows_console()`. For styling, its own docs point you to a fuller library like Rich, with Colorama only converting the codes. Rich [supports Windows terminals](https://rich.readthedocs.io/en/latest/introduction.html) on its own.

### pyfiglet

Use pyfiglet for banner text. It's [a full port of FIGlet](https://github.com/pwaller/pyfiglet) to pure Python, so it renders text in ASCII-art fonts without running an external program. `pyfiglet.figlet_format("text", font="slant")` returns the rendered string.

### Textual

Pick Textual for a full-screen app with widgets that [runs in the terminal or a web browser](https://textual.textualize.io/), and over SSH. It's built by the makers of Rich. Subclass `App`, build the interface from widgets in [`compose()`](https://textual.textualize.io/tutorial/), and call `run()`. To put it in a browser, [`textual serve`](https://textual.textualize.io/guide/devtools/#serve) turns your terminal app into a web application.

### prompt_toolkit

Pick prompt_toolkit when your CLI asks for input. It's [a pure Python replacement for GNU readline](https://python-prompt-toolkit.readthedocs.io/en/latest/), with syntax highlighting as you type, autocompletion, fish-style suggestions, and Emacs and Vi key bindings. Start with `prompt()`, which works [just like `input()`](https://python-prompt-toolkit.readthedocs.io/en/latest/pages/getting_started.html). For repeated input, use [a `PromptSession`](https://python-prompt-toolkit.readthedocs.io/en/latest/pages/asking_for_input.html), which keeps a history for the session. It also builds [full-screen applications](https://python-prompt-toolkit.readthedocs.io/en/latest/pages/full_screen_apps.html) from a layout and a set of key bindings.

### Urwid

Pick Urwid to assemble a terminal UI from lower-level parts. It handles the tedious parts of using curses directly, and its docs call it [a console widget construction set](https://urwid.org/manual/overview.html) rather than a finished UI library. It's LGPL, unlike the other TUI frameworks listed, and [fully supports Unix-like systems](https://urwid.org/), with limited support on Windows. The tutorial's first app puts a `Text` widget in a `Filler` and runs it with [`urwid.MainLoop(...).run()`](https://urwid.org/tutorial/index.html).

### asciimatics

Pick asciimatics for full-screen forms or ASCII animation effects, like sprites, particle systems, and banners. To animate, [create a `Screen`, put together a `Scene` from `Effect` objects, and have the `Screen` play it](https://asciimatics.readthedocs.io/en/latest/intro.html). Forms use [widgets with strong parallels to web input forms](https://asciimatics.readthedocs.io/en/latest/widgets.html), arranged in a `Layout` inside a `Frame`.

### Installing your CLI as a command

Whichever parser you pick, ship your CLI as an installable package with an entry point, so users run it by name instead of `python hello.py`. Click's docs [recommend it](https://click.palletsprojects.com/en/latest/entry-points/), and Typer's [packaging tutorial](https://typer.tiangolo.com/tutorial/package/) declares the command under `[project.scripts]` in `pyproject.toml`.
