Server setup goes in YAML playbooks that Ansible runs, unless you'd rather write Python with pyinfra. Neither Python DevOps tool needs an agent: SSH is enough.

How to choose:

- Server setup over SSH: Ansible in YAML, pyinfra in Python
- Cloud APIs: Boto3, Azure SDK for Python, Google Cloud client libraries, and the AWS CLI from your shell
- First-boot setup of a new cloud instance: cloud-init
- Large fleets, with an agent on every host: Salt
- Shell commands on remote servers, run from Python: Fabric
- Serverless apps on AWS Lambda: Chalice
- CPU, memory, disk, and process stats: psutil
- Errors from your app, sent to Sentry: Sentry SDK
- Processes kept running and restarted after a crash: Supervisor
- Celery workers and tasks in a browser: Flower
- Shell programs called as Python functions: sh
- Deduplicated, encrypted backups: BorgBackup

Ansible is [agentless](https://github.com/ansible/ansible): it uses the SSH daemon your servers already run. You install it on one control node and [declare the desired state](https://docs.ansible.com/projects/ansible/latest/getting_started/introduction.html) of each machine in a playbook. When a machine already matches, Ansible changes nothing, however many times the playbook runs.

pyinfra calls itself ["ansible but Python instead of YAML"](https://github.com/pyinfra-dev/pyinfra). Its getting-started guide puts your hosts in an `inventory.py` and your operations in a `deploy.py`, then runs `pyinfra inventory.py deploy.py`. The target hosts [need nothing but an SSH daemon](https://docs.pyinfra.com/en/latest/getting-started.html). Most operations describe an end state: pyinfra [checks the host first](https://docs.pyinfra.com/en/latest/using-operations.html) and runs commands only if reality doesn't match.

Boto3 is the AWS SDK for Python. Its [clients](https://docs.aws.amazon.com/boto3/latest/guide/clients.html) map close to 1:1 onto AWS service APIs and support every service operation. Resources are a higher-level, object-oriented layer on top.

The AWS CLI gives you [direct access to AWS's public APIs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) from your terminal, to explore a service or write shell scripts.

The Azure SDK for Python is a set of per-service packages, so you install only what you use. [Management libraries](https://learn.microsoft.com/en-us/azure/developer/python/sdk/azure-sdk-overview), named `azure-mgmt-*`, create and configure Azure resources, while client libraries work with services already provisioned.

The Google Cloud client libraries are [the recommended way](https://docs.cloud.google.com/python/docs/reference) to call Google Cloud APIs from code.

cloud-init handles a new instance's first boot. It [takes an initial configuration you supply](https://docs.cloud-init.io/en/latest/explanation/introduction.html) and applies it when the instance is created, from the hostname and network to user accounts and scripts. [Most clouds and Linux distributions ship it](https://github.com/canonical/cloud-init), so there's nothing to install. Write that configuration as [cloud-config](https://docs.cloud-init.io/en/latest/explanation/format/cloud-config.html), YAML that describes the state you want.

Salt has [a master managing minions](https://docs.saltproject.io/salt/user-guide/en/latest/topics/overview.html): an agent runs on each host and listens on an event bus. One command can reach thousands of systems in seconds.

Fabric runs shell commands on remote servers over SSH and [hands you back Python objects](https://www.fabfile.org/). A [`Connection`](https://docs.fabfile.org/en/latest/getting-started.html#run-commands-via-connections-and-run) is the core of its API: `run()` a command on it, and `put()` or `get()` files. For deploys and sysadmin jobs, write `@task` functions in a `fabfile.py` and [run them with `fab -H web1,web2`](https://docs.fabfile.org/en/latest/getting-started.html#addendum-the-fab-command-line-tool).

Chalice deploys Python apps to AWS Lambda. You write handlers with [a decorator-based API](https://github.com/aws/chalice) for API Gateway, S3, SQS, and other AWS services. Then `chalice deploy` provisions what your app needs, including its IAM policy.

psutil reads process and system information, like CPU, memory, disks, and network, across platforms. It covers [what tools like `ps`, `top`, and `netstat` show](https://github.com/giampaolo/psutil).

The Sentry SDK reports your app's errors to Sentry. [Call `sentry_sdk.init()`](https://docs.sentry.io/platforms/python/#initialize-the-sentry-sdk) with your DSN as early as possible, in your app's entry point. Its [integrations](https://docs.sentry.io/platforms/python/integrations/) for Django, Flask, Celery, and many other libraries turn on by themselves.

Supervisor runs your programs as its subprocesses on UNIX-like systems and [can restart them after a crash](https://supervisord.org/introduction.html). Add a [`[program:x]` section](https://supervisord.org/running.html#adding-a-program) per program to its INI-style config, start `supervisord`, and control processes with `supervisorctl`.

Flower is Celery's [recommended monitor](https://docs.celeryq.dev/en/stable/userguide/monitoring.html): a web app that shows workers and tasks in real time, and can restart worker pools or shut workers down. Start it with your app's configuration, [`celery -A tasks.app flower`](https://flower.readthedocs.io/en/latest/install.html).

sh lets you [call any program as if it were a function](https://sh.readthedocs.io/en/latest/): `from sh import git`, then `git("status", "--short")`. It runs the real binary on your `$PATH`, and a non-zero exit code raises an exception like `sh.ErrorReturnCode_2`.

BorgBackup is a [deduplicating backup program](https://borgbackup.readthedocs.io/en/stable/). It stores only changes, so it suits daily backups, and its authenticated encryption suits backup targets you don't fully trust. Initialize an encrypted repository, create an archive per backup, and prune old ones on a schedule. The repository is useless without its key, so the quick start says to [back up the key](https://borgbackup.readthedocs.io/en/stable/quickstart.html#repository-encryption) and test your backups.

Keep secrets out of your code and plain files, whichever tool you pick. Let each cloud's SDK find credentials: Boto3 [searches a chain of locations](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html#configuring-credentials), Azure recommends [token-based authentication through Microsoft Entra ID](https://learn.microsoft.com/en-us/azure/developer/python/sdk/authentication/overview#recommended-approach-for-app-authentication), and Google's client libraries pick up [Application Default Credentials](https://docs.cloud.google.com/docs/authentication/application-default-credentials). In config management, encrypt secrets with [Ansible Vault](https://docs.ansible.com/projects/ansible/latest/tips_tricks/ansible_tips_tricks.html#keep-vaulted-variables-safely-visible) or keep them in [Salt's pillar](https://docs.saltproject.io/en/latest/topics/best_practices.html#storing-secure-data).
