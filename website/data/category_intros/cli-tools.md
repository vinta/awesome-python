Swap cURL for HTTPie, and your database's own client for a Python CLI tool with autocompletion: pgcli, mycli, litecli, or IRedis.

How to choose:

- Calling HTTP APIs from the terminal: HTTPie
- A database shell with autocompletion: pgcli for PostgreSQL, mycli for MySQL, litecli for SQLite, IRedis for Redis
- Downloading video or audio from YouTube and other sites: yt-dlp
- A new project from a template: Cookiecutter, or Copier to pull in later template changes
- A shell you script in Python: xonsh
- A tmux session with its windows and panes, from one YAML file: tmuxp

HTTPie is a command-line HTTP client for [testing, debugging, and generally interacting with APIs](https://httpie.io/docs/cli) and HTTP servers. It formats and colors the output. A request reads like `http PUT pie.dev/put X-API-Token:123 name=John`: `Header:Value` items set headers, and `field=value` items fill the body, which HTTPie [sends as JSON by default](https://httpie.io/docs/cli/json).

pgcli, mycli, litecli, and IRedis are terminal clients with autocompletion and syntax highlighting, one per database. Give [pgcli](https://github.com/dbcli/pgcli) a database name or a `postgresql://` URI, and [litecli](https://github.com/dbcli/litecli) the path to a SQLite file. mycli also [works with MariaDB](https://github.com/dbcli/mycli), Percona, TiDB, and Apache Doris. IRedis behaves like Redis's own client in most cases, but it's [safer on production servers](https://github.com/laixintao/iredis): it stops you from accidentally running dangerous commands like `KEYS *`.

yt-dlp downloads audio and video from [thousands of sites](https://github.com/yt-dlp/yt-dlp). Install ffmpeg too: yt-dlp [needs it to merge separate video and audio files](https://github.com/yt-dlp/yt-dlp#dependencies).

Cookiecutter creates projects from templates, and its templates [work for any language](https://github.com/cookiecutter/cookiecutter), not only Python. [Run `cookiecutter gh:audreyfeldroy/cookiecutter-pypackage`](https://cookiecutter.readthedocs.io/en/stable/usage.html), answer its prompts, and you get a new project from that GitHub template.

Copier also generates projects from templates, but it calls itself [a code lifecycle management tool](https://copier.readthedocs.io/en/stable/comparisons/). When the template changes, `copier update` brings the changes into projects you already generated. [It works best](https://copier.readthedocs.io/en/stable/updating/) when both are in Git: the template tagged, your project clean, with the `.copier-answers.yml` file that records your answers. Templates can run code: Cookiecutter's [pre- and post-generate scripts](https://github.com/cookiecutter/cookiecutter), Copier's tasks. [Generate projects only from templates you trust](https://copier.readthedocs.io/en/stable/generating/).

xonsh is a shell whose language is [a superset of Python](https://github.com/xonsh/xonsh), with shell commands built in. It isn't POSIX-compatible, so don't make it your login shell with `chsh`. Its docs [recommend a xonsh profile in your terminal emulator](https://xon.sh/install.html#before-installing) instead.

tmuxp launches a whole tmux session [from one YAML or JSON file](https://tmuxp.git-pull.com/quickstart/): its windows, its panes, and the commands in them. Save the file as `.tmuxp.yaml` in a project, and [`tmuxp load path/to/project/`](https://github.com/tmux-python/tmuxp) builds the session.

Several of these tools' docs have you [install them as CLI tools](https://github.com/cookiecutter/cookiecutter), and add them to a project only to use them from Python. Looking for a library to build your own Python CLI tool? That's [CLI Development](/categories/cli-development/).
