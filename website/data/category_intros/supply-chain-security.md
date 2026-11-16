If uv locks your Python dependencies, uv audit checks them for known vulnerabilities; otherwise run pip-audit. Betterleaks catches secrets leaked into git history.

How to choose:

- A project with a uv.lock: uv audit
- Requirements files or an installed environment: pip-audit
- Secrets in your git history or staged changes: betterleaks

### uv audit

Pick uv audit when uv manages your project: it works from the lockfile uv already keeps, so you need no separate tool. Run [`uv audit`](https://docs.astral.sh/uv/reference/cli/#uv-audit) in your project to check its locked dependencies against OSV.

### pip-audit

Pick pip-audit when uv doesn't lock your dependencies: it audits requirements files and installed environments. It's a PyPA project, and it checks the Python Packaging Advisory Database by default, with OSV as an option. Run [`pip-audit`](https://github.com/pypa/pip-audit#examples) inside your virtual environment to audit what's installed.

### Betterleaks

Pick Betterleaks to catch secrets before they get committed, and to find the ones already [in your git history](https://github.com/betterleaks/betterleaks/blob/main/docs/scanning.md#git). It comes from [Gitleaks' original author](https://github.com/betterleaks/betterleaks). It's written in Go, so in a Python project, run it from its [pre-commit hook](https://github.com/betterleaks/betterleaks/blob/main/.pre-commit-hooks.yaml), which scans your staged changes before each commit.

### What audits miss

Both audit tools look up known vulnerabilities, so neither one is a malware scanner: pip-audit's docs say you [must not assume it defends you against malicious packages](https://github.com/pypa/pip-audit#security-model). uv's docs also call [dependency cooldowns](https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns) a good way to improve your security posture. A cooldown holds back versions newer than a set age, so the community has time to vet a release before you install it.
