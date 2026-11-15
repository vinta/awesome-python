Configure servers with Ansible's YAML playbooks, or with pyinfra if you'd rather write Python. Fabric just runs your deploy commands over SSH.

How to choose:

- Server setup in YAML, with ready-made modules for many devices: ansible
- Server setup written in Python, on hosts with only a shell: pyinfra
- Deploy steps and one-off commands over SSH, as Python functions: fabric
- Your cloud from Python code: boto3, azure-sdk-for-python, or google-cloud-python
- AWS from the terminal and shell scripts: awscli
- A new cloud instance, set up on its first boot: cloud-init
- Servers that respond to events on their own: salt
- A serverless app on AWS Lambda: chalice
- Process and system stats on any major OS: psutil
- Errors and crashes from production, reported to Sentry: sentry-sdk
- Unix processes kept running, or commands called as functions: supervisor, sh
- Celery workers and tasks, watched in a browser: flower
- Encrypted, deduplicated backups, local or over SSH: borgbackup

### Ansible

Pick Ansible to configure servers when you'd rather describe the result in YAML than program it, and want ready-made modules to do it. You [declare the desired state](https://docs.ansible.com/projects/ansible/latest/getting_started/introduction.html) of your machines in a playbook, and when a machine is already in that state, a rerun changes nothing. Ansible connects over SSH with your existing credentials, so there's no agent to install, and the machines it manages [need Python but not Ansible](https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html). Its getting-started guide has you install it and [create a project folder](https://docs.ansible.com/projects/ansible/latest/getting_started/get_started_ansible.html) for your inventory and playbooks, which keeps them easy to put under version control.

### pyinfra

Pick pyinfra over Ansible when you'd rather write your server setup as Python code than as YAML. It [turns Python code into shell commands](https://github.com/pyinfra-dev/pyinfra) and runs them over SSH. Target hosts [need nothing but the SSH daemon](https://docs.pyinfra.com/en/latest/getting-started.html), while Ansible's managed nodes also need Python. Most deploys use its declarative operations, which check what's already on the host and [emit only the commands needed](https://docs.pyinfra.com/en/latest/using-operations.html), so a rerun changes nothing. A deploy is an `inventory.py` listing your hosts and a `deploy.py` of operations, run with `pyinfra inventory.py deploy.py`.

### Fabric

Pick Fabric to script deploy steps and one-off commands over SSH as plain Python functions. It's a library that [executes shell commands remotely over SSH](https://www.fabfile.org/) and returns each result as a Python object. Fabric runs exactly the commands you write, where Ansible and pyinfra describe the state a server should end up in and are safe to rerun. Start with a `Connection` to one host, then [use a `Group`](https://docs.fabfile.org/en/latest/getting-started.html) to run the same command on several. The `fab` command calls your functions as tasks, like `fab deploy`.

### Boto3

Use Boto3 to call AWS from Python code, and the AWS CLI from the terminal. Boto3 has low-level clients and higher-level resources; start with clients, whose methods map close to 1:1 to service APIs and [support every service operation](https://docs.aws.amazon.com/boto3/latest/guide/clients.html). Create one with `boto3.client()` and the name of the service you call.

### AWS CLI

Use the AWS CLI to work with AWS from your terminal. It gives you direct access to the public APIs of AWS services. You can explore what a service does and [develop shell scripts](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) to manage your resources.

### Azure SDK for Python

Use the Azure SDK for Python to work with Azure from Python. It's not one big package: each service has [its own set of libraries](https://github.com/Azure/azure-sdk-for-python), and you install only the ones you use. Packages named `azure-mgmt-*` [create and configure Azure resources](https://learn.microsoft.com/en-us/azure/developer/python/sdk/azure-sdk-overview), and client libraries named just `azure-*` [connect your app code](https://learn.microsoft.com/en-us/azure/developer/python/sdk/azure-sdk-install) to resources that already exist. Sign in through the Azure Identity library, since Microsoft [recommends token-based authentication](https://learn.microsoft.com/en-us/azure/developer/python/sdk/authentication/overview) over connection strings or keys. Its `DefaultAzureCredential` is [generally the quickest way](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/identity/azure-identity/README.md) to authenticate.

### Cloud Client Libraries for Python

Use Google's Cloud Client Libraries for Python, [the recommended way](https://docs.cloud.google.com/python/docs/reference) to call Google Cloud APIs from code. Each API has its own package, so for Cloud Storage you'd [install `google-cloud-storage`](https://docs.cloud.google.com/python/docs/setup). Authenticate through Application Default Credentials. On your own machine, `gcloud auth application-default login` creates them, and your code [runs in development or production](https://docs.cloud.google.com/docs/authentication/application-default-credentials) without changing how it authenticates.

### cloud-init

Use cloud-init to set up a new cloud instance on its first boot. It runs on the instance itself, finds out which cloud it's on, and [applies the configuration you supply](https://docs.cloud-init.io/en/latest/explanation/introduction.html) as user-data when the instance is created. Write it as cloud-config: [YAML whose keys describe the desired instance state](https://docs.cloud-init.io/en/latest/explanation/format/cloud-config.html), starting with a `#cloud-config` line. For more complex configuration, cloud-init works with tools like Ansible, and its Ansible module [installs Ansible during boot](https://docs.cloud-init.io/en/latest/reference/modules.html) and runs your playbook repository with ansible-pull.

### Salt

Pick Salt for servers that should react to events on their own: its README describes [self-healing systems](https://github.com/saltstack/salt) that respond to outages and other important events. Its standard setup is a Salt master managing minions, each running the salt-minion service, with an event system between them. Salt SSH and proxy minions can [manage machines without an agent](https://docs.saltproject.io/salt/user-guide/en/latest/topics/overview.html). Still, Salt's install guide [recommends the standard installation](https://docs.saltproject.io/salt/install-guide/en/latest/topics/overview.html) for most organizations, especially if you're just starting out. Its state files are YAML by default.

### Chalice

Pick Chalice to build a serverless Python app on AWS Lambda. You write routes with [decorators](https://aws.github.io/chalice/), and Chalice generates your app's policies by scanning your source code. `chalice new-project` [creates a sample app](https://aws.github.io/chalice/quickstart.html), and `chalice deploy` puts it on Lambda behind API Gateway.

### psutil

Use psutil to read CPU, memory, disk, network, and process information from Python on Linux, Windows, macOS, and the BSDs. It's [useful mainly for](https://psutil.io/) system monitoring, profiling, limiting process resources, and managing running processes. Its docs call it [fragile](https://psutil.io/alternatives/) to run `ps` or `top` through subprocess and parse their output, since output formats differ across OS versions and locales. psutil reads the same data directly.

### Sentry Python SDK

Use the Sentry Python SDK to report your app's errors and crashes to Sentry. With a Sentry account and project set up, error monitoring [starts as soon as you call `sentry_sdk.init()`](https://docs.sentry.io/platforms/python/). Call it as early as possible, in your app's entry point.

### Supervisor

Use Supervisor to keep a project's processes running. It [works on just about everything except Windows](https://supervisord.org/introduction.html). Its supervisord process starts your programs as subprocesses and can restart them when they crash. You set it all up in one INI-style config file. It's [not meant to replace init](https://supervisord.org/) as process ID 1. It controls one project's processes and starts at boot like any other program.

### sh

Pick sh to call programs from Python as if they were functions, in place of subprocess calls: after `from sh import git`, `git("status")` runs `git status`. It finds each program by [resolving your `$PATH`](https://sh.readthedocs.io/en/latest/), much like your shell does. sh only works on Unix-like systems, and Windows isn't supported.

### Flower

Use Flower to watch your Celery workers and tasks in a browser. It's [a web app for monitoring and managing Celery clusters](https://flower.readthedocs.io/en/latest/), with real-time status of each worker and task, and Celery's docs call it [the recommended monitor](https://docs.celeryq.dev/en/stable/userguide/monitoring.html). [Run it as a Celery subcommand](https://flower.readthedocs.io/en/latest/install.html) pointed at your app, like `celery -A tasks.app flower`.

### BorgBackup

Pick BorgBackup for backups to a local disk or to any host you can reach over SSH. It's [a deduplicating backup program](https://borgbackup.readthedocs.io/en/stable/) with optional compression and authenticated encryption. Since only changes are stored, it suits daily backups, and the encryption makes it suitable for targets you don't fully trust. Start by initializing an encrypted repository, as [its quickstart](https://borgbackup.readthedocs.io/en/stable/quickstart.html) shows, and keep a backup of the key: without it, the repository's data is totally inaccessible.

### Sharing AWS credentials

Boto3, the AWS CLI, and Chalice read the same AWS credentials, so a machine [set up for Boto3 or the AWS CLI](https://aws.github.io/chalice/quickstart.html) is ready for Chalice too. Run `aws configure` to [write your credentials file](https://docs.aws.amazon.com/boto3/latest/guide/quickstart.html), and keep credentials out of your source code, as [Boto3's docs advise](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html).
