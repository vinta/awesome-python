Python's own argparse covers basic command-line apps. Beyond that, pick Click or Typer as your Python CLI library, and style the output with Rich.

How to choose:

- Basic command-line app with no dependencies: argparse
- Nested commands, or subcommands loaded lazily: Click
- Options declared once as type-hinted function parameters: Typer
- Interactive prompts and REPLs: prompt_toolkit
- CLI from existing code without writing a parser: Python Fire
- Progress bar for a loop: tqdm, or alive-progress for animated bars
- Colored text, tables, and logs: Rich, or colorama for ANSI colors on Windows
- Full-screen app in the terminal or a browser: Textual
- Terminal widgets on an event loop you already run: Urwid
- Full-screen forms and ASCII animations: asciimatics

argparse is in the standard library. Python's docs call it [the recommended choice](https://docs.python.org/3/library/optparse.html#choosing-an-argument-parser) when you have no more specific needs, since it gives you the most out of the box for the least code. It [writes the help and usage messages](https://docs.python.org/3/library/argparse.html) and reports invalid arguments for you. For commands written as decorated functions, the same docs point to Click, and for a CLI that works with static type checking, to Typer.

Click builds a CLI from [commands declared with decorators](https://click.palletsprojects.com/en/stable/quickstart/). You can nest them to any depth, and Click can [load subcommands lazily](https://click.palletsprojects.com/en/stable/) at runtime. It also [reads option values from environment variables](https://click.palletsprojects.com/en/stable/why/) and comes with helpers for ANSI colors, terminal size, and launching editors.

Typer builds a CLI from your function signatures: you [declare each argument and option once](https://typer.tiangolo.com/), as a type-hinted function parameter. Write those hints with `Annotated`, which its tutorial [recommends wherever possible](https://typer.tiangolo.com/tutorial/arguments/optional/). Its docs say you get [the best results by pairing it with Rich](https://typer.tiangolo.com/tutorial/printing/): Typer structures the commands and options, and Rich displays the output.

prompt_toolkit is for interactive input. It can [replace GNU readline](https://python-prompt-toolkit.readthedocs.io/en/stable/) or build full-screen apps. For a REPL, use a [`PromptSession`](https://python-prompt-toolkit.readthedocs.io/en/stable/pages/asking_for_input.html), which keeps the history for the whole session.

Python Fire turns any Python object into a CLI: [call `fire.Fire()`](https://github.com/google/python-fire/blob/master/docs/guide.md) at the end of your program. Its README pitches it for [developing and debugging your code](https://github.com/google/python-fire), exploring existing code, and turning other people's code into a CLI. It takes each argument's type from the value you pass, not from the function signature.

tqdm adds a progress bar to any loop: [wrap the iterable in `tqdm()`](https://github.com/tqdm/tqdm). Import it from `tqdm.auto`, which picks the console bar or the Jupyter widget for you. alive-progress wraps the loop in an [`alive_bar` context manager](https://github.com/rsalmei/alive-progress) instead, with a spinner that speeds up and slows down with your throughput.

Rich writes colored text, tables, Markdown, and syntax-highlighted code to the terminal. Start with its [drop-in `print`](https://rich.readthedocs.io/en/stable/introduction.html), then create [one `Console` at module level](https://rich.readthedocs.io/en/stable/console.html) for the rest of your app. For colored logs, send the logging module's output through [`RichHandler`](https://rich.readthedocs.io/en/stable/logging.html).

colorama makes ANSI escape codes work on Windows and does nothing on other platforms. If that's all you need, call [`just_fix_windows_console()`](https://github.com/tartley/colorama).

Textual apps run in the terminal, and the `textual serve` command from textual-dev [serves them in a browser](https://textual.textualize.io/guide/devtools/). Build one by [subclassing `App`](https://textual.textualize.io/guide/app/), and style its widgets with [CSS](https://textual.textualize.io/guide/CSS/).

Urwid is a [console widget construction set](https://urwid.org/manual/overview.html) rather than a finished UI library. It runs on [your choice of event loop](https://github.com/urwid/urwid): asyncio, or another one you already use. It's [licensed under the LGPL](https://github.com/urwid/urwid/blob/master/COPYING), while Textual and asciimatics use permissive licenses.

asciimatics does [full-screen text UIs, from interactive forms to ASCII animations](https://github.com/peterbrittain/asciimatics): create a Screen, build a Scene from Effect objects, and let the Screen play it.

Ship your CLI as an installable package with a `[project.scripts]` entry point, not a file users run with `python`. [Click recommends it](https://click.palletsprojects.com/en/stable/entry-points/), and shell completion in Click and [Typer](https://typer.tiangolo.com/tutorial/package/) works through that entry point. Test your commands in-process: Click and Typer both provide a [`CliRunner`](https://click.palletsprojects.com/en/stable/testing/), and Textual's [`run_test()`](https://textual.textualize.io/guide/testing/) drives your app as if you were using the keyboard and mouse.
