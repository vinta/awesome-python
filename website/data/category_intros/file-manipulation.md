Without installing anything, two Python file manipulation libraries cover paths and file types by name: pathlib and mimetypes. python-magic reads the bytes.

How to choose:

- Building and joining paths, and listing directories: pathlib
- A MIME type from a file name or URL: mimetypes
- A file's type from its content, like the Unix `file` command: python-magic
- Rerunning or reloading code when files change: watchfiles
- Your own handler for each created, modified, or moved file: watchdog

If you aren't sure which pathlib class you need, the docs say [`Path` is most likely it](https://docs.python.org/3/library/pathlib.html): it makes a concrete path for the platform your code runs on. [Join paths with the `/` operator](https://docs.python.org/3/library/pathlib.html#basic-use), and list a directory with `iterdir()` or `glob()`.

mimetypes [maps a file name's extension to a MIME type](https://docs.python.org/3/library/mimetypes.html), and a MIME type back to extensions. A type guess returns 2 values: a type for the Content-Type header, and an encoding like gzip for the Content-Encoding header. The type is [`None` for a missing or unknown suffix](https://docs.python.org/3/library/mimetypes.html#mimetypes.guess_type).

python-magic wraps libmagic, which [identifies file types by checking their headers](https://github.com/ahupp/python-magic), the way the Unix `file` command does. It's a thin wrapper, so install libmagic too, with `apt-get install libmagic1` or `brew install libmagic`. Call `magic.from_file(path, mime=True)` for a MIME type, or `magic.from_buffer()` on bytes you already have.

watchfiles is built for [file watching and code reload](https://watchfiles.helpmanual.io/), and its Rust core groups changes into batches instead of firing once per file. `watch()` is a generator that [yields sets of changes](https://watchfiles.helpmanual.io/api/watch/#watchfiles.watch), and `awatch()` is the async version. To restart code when files change, use [`run_process()`](https://watchfiles.helpmanual.io/api/run_process/#watchfiles.run_process) with a function or a command. From a shell, the [`watchfiles` CLI](https://watchfiles.helpmanual.io/cli/) does the same: `watchfiles --filter python 'pytest --lf' src tests`.

watchdog gives you [an API and a shell tool](https://python-watchdog.readthedocs.io/en/latest/) for monitoring directories. Its [quickstart](https://python-watchdog.readthedocs.io/en/latest/quickstart.html) has you subclass `FileSystemEventHandler`, override methods like `on_created()` and `on_modified()`, schedule the handler on an `Observer`, and start that thread. An observer skips subdirectories unless you pass `recursive=True` to `schedule()`.
