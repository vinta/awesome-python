Audit your dependencies for known vulnerabilities as part of Python supply chain security. A uv project has uv audit built in; other projects run pip-audit.

How to choose:

- A project managed by uv: uv audit
- Environments, requirements files, and projects outside uv: pip-audit
- Leaked secrets in a repo's history or files: Betterleaks

`uv audit` comes with uv. Run it in your project, and it [audits the project's dependencies](https://docs.astral.sh/uv/reference/cli/#uv-audit) for known vulnerabilities and for statuses like deprecation and quarantine. By default, it covers every extra and dependency group.

pip-audit [scans Python environments for packages with known vulnerabilities](https://github.com/pypa/pip-audit), using the Python Packaging Advisory Database. Run `pip-audit` for the current environment, `pip-audit -r requirements.txt` for a requirements file, or `pip-audit .` for a local project. In CI, run it with its [official GitHub Action](https://github.com/pypa/pip-audit#github-actions). Only audit a requirements file you would install, since `pip-audit -r` is [functionally equivalent to `pip install -r`](https://github.com/pypa/pip-audit#security-model).

Betterleaks [scans git history, directories, and files for leaked secrets](https://github.com/betterleaks/betterleaks). Install it with Homebrew, Docker, or `go install`, then run `betterleaks git .` to scan your repository's full history. To catch a secret before it lands in a commit, add its [pre-commit hook](https://github.com/betterleaks/betterleaks/blob/main/docs/scanning.md#git), which scans staged changes and redacts the secrets it reports.

Also control what gets installed, since an audit only finds vulnerabilities someone has already reported. For requirements files, pip's docs recommend [hash-checking mode](https://pip.pypa.io/en/stable/topics/secure-installs/) to protect against remote tampering. In a uv project, uv's docs suggest a [dependency cooldown](https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns), which holds back new releases until the community has had a chance to vet them.
