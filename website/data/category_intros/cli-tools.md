These Python CLI tools are commands you run, not libraries for building one. Several replace a stock command, like pgcli for psql and HTTPie for cURL.

How to choose:

- PostgreSQL from the terminal, in place of psql: pgcli
- Calling and debugging APIs by hand, in place of cURL: HTTPie
- MySQL or MariaDB, in place of the mysql client: mycli
- SQLite, in place of sqlite3: LiteCLI
- Redis, in place of redis-cli: IRedis
- Video or audio from YouTube and other sites: yt-dlp
- A new project from an existing cookiecutter template: Cookiecutter
- A project that keeps taking changes from its template: Copier
- An interactive shell that mixes Python and shell commands: xonsh
- tmux windows, panes, and their commands, loaded from one file: tmuxp

### pgcli

Pick pgcli in place of psql for interactive PostgreSQL sessions. It highlights your SQL and [completes by context](https://github.com/dbcli/pgcli#features): after `FROM`, it suggests only table names. It [accepts many of psql's backslash commands](https://www.pgcli.com/docs), like `\d` and `\l`. Connect with [a URL like `pgcli postgres://user@host:5432/app_db`](https://github.com/dbcli/pgcli#usage).

### mycli

Pick mycli in place of the mysql client, for MySQL and [compatible servers like MariaDB](https://www.mycli.net/). Its completion matches fuzzily, so [typing `djmi` finds the `django_migrations` table](https://www.mycli.net/completion).

### LiteCLI

Pick LiteCLI in place of sqlite3. Besides completing table and column names by context, it [suggests whole commands from your history](https://litecli.com/autocompletion/). Open a database with [`litecli <db_name>`](https://litecli.com/).

### IRedis

Pick IRedis in place of redis-cli. Its README says it [behaves exactly the same as redis-cli in most cases](https://github.com/laixintao/iredis), and that it stops you from running dangerous commands like `KEYS *` on a production server by accident. It [completes from earlier replies](https://github.com/laixintao/iredis#features): run `KEYS`, then `DEL` completes from the keys it returned.

### HTTPie

Pick HTTPie over cURL to call and debug APIs by hand, since its syntax is easier to remember. It's [designed for testing, debugging, and generally interacting with APIs](https://github.com/httpie/cli), with formatted, colorized output. It [sends JSON by default](https://httpie.io/docs/cli#json): `http PUT pie.dev/put X-API-Token:123 name=John` sends `X-API-Token` as a header and `name` in a JSON body.

### yt-dlp

Pick yt-dlp to download video and audio from YouTube and [thousands of other sites](https://github.com/yt-dlp/yt-dlp). Pass it one or more URLs. Install FFmpeg too: yt-dlp needs it [to merge separate video and audio files](https://github.com/yt-dlp/yt-dlp#strongly-recommended).

### Cookiecutter

Pick Cookiecutter to generate a project once from a template that exists as a cookiecutter. [A Cookiecutter template is just a directory with variables](https://github.com/cookiecutter/cookiecutter), so it works for any language. Run `cookiecutter gh:audreyfeldroy/cookiecutter-pypackage` and [answer its prompts](https://cookiecutter.readthedocs.io/en/latest/usage.html).

### Copier

Pick Copier over Cookiecutter when a project should keep taking changes from its template. Copier's docs call this [code lifecycle management for generated projects](https://copier.readthedocs.io/en/latest/updating/). Generate with `copier copy path/to/project/template path/to/destination`, and when the template changes, run `copier update` in the project.

### xonsh

Pick xonsh for an interactive shell where Python and shell commands mix. Its language is [a superset of Python 3 with seamless integration of shell functionality and commands](https://xon.sh/). Its install guide says [not to make it your login shell](https://xon.sh/install.html#before-installing), since it isn't POSIX-compatible: create a xonsh profile in your terminal emulator instead.

### tmuxp

Pick tmuxp to launch a whole tmux workspace [from a single YAML or JSON file](https://tmuxp.git-pull.com/quickstart/), with its windows, panes, and the commands inside them. Put a `.tmuxp.yaml` in a project, and [`tmuxp load path/to/my/project/`](https://github.com/tmux-python/tmuxp) starts it. To write that file from a session you've already arranged, [`tmuxp freeze`](https://tmuxp.git-pull.com/cli/freeze/) exports the running session.

### Trusting a template

Templates for both Cookiecutter and Copier can run code: Cookiecutter's [Python or shell hooks](https://cookiecutter.readthedocs.io/en/latest/advanced/hooks.html), and Copier's tasks. Copier's docs say to [generate projects only from trusted templates](https://copier.readthedocs.io/en/latest/generating/), since those tasks run with the same access as your user.
