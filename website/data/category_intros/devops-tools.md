Across a fleet of servers, Ansible applies YAML playbooks over SSH with no agent to install. Clouds publish their own Python DevOps tools, like Boto3 for AWS.

How to choose:

- Servers configured from YAML playbooks over SSH: Ansible
- AWS, Azure, or Google Cloud from Python code: Boto3, the Azure SDK for Python, or google-cloud-python
- AWS from your terminal and shell scripts: AWS CLI
- A new cloud instance set up on its first boot: cloud-init
- Server configuration written in Python instead of YAML: pyinfra
- An agent on every server, run from a central master: Salt
- Shell commands on remote servers, run from Python code: Fabric
- Python APIs and event handlers on AWS Lambda: Chalice
- Process and system stats, or other programs called as functions: psutil, sh
- Your app's errors, or Celery workers and tasks, monitored live: Sentry SDK, Flower
- Your app's processes kept running on Unix: Supervisor
- Encrypted backups, or chaos engineering experiments: BorgBackup, Chaos Toolkit

Ansible playbooks [declare the state you want each system in](https://docs.ansible.com/projects/ansible/latest/getting_started/introduction.html), written in YAML. Ansible connects over SSH with your existing credentials, so the servers it manages need no extra software. When a system already matches the playbook, Ansible changes nothing. Run a playbook with `ansible-playbook`, and run it [with `--check` first](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html#running-playbooks-in-check-mode) to get a report of the changes it would make, without making them.

Boto3 is the AWS SDK for Python, and it [shares its low-level core with the AWS CLI](https://docs.aws.amazon.com/boto3/latest/guide/quickstart.html). The AWS CLI calls the same AWS APIs from your shell, for exploring a service and writing shell scripts. [Install it from AWS's own installers](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html): the builds in package managers are unofficial.

The Azure SDK for Python is a set of separate libraries for specific Azure services. Its [management libraries, named `azure-mgmt-*`](https://learn.microsoft.com/en-us/azure/developer/python/sdk/azure-sdk-overview#create-and-manage-azure-resources-with-management-libraries), create and configure resources, while its client libraries work with resources that already exist. On Google Cloud, google-cloud-python holds the [Cloud Client Libraries, the option Google recommends](https://docs.cloud.google.com/apis/docs/client-libraries-explained) for calling its APIs from code.

cloud-init gives a new cloud instance [its configuration on first boot](https://docs.cloud-init.io/en/latest/), with nothing to install, and every major public cloud supports it. Write that configuration as [cloud-config](https://docs.cloud-init.io/en/latest/explanation/format/cloud-config.html), YAML whose keys describe the state you want, like packages, users, and SSH keys. For more complex configuration, cloud-init [can hand over to a tool like Ansible](https://docs.cloud-init.io/en/latest/explanation/introduction.html).

pyinfra [turns Python code into shell commands and runs them on your servers](https://github.com/pyinfra-dev/pyinfra): think Ansible, but Python instead of YAML. A deploy is [an `inventory.py` of hosts and a `deploy.py` of operations](https://docs.pyinfra.com/en/latest/getting-started.html), run with `pyinfra inventory.py deploy.py`. Operations declare a state, like a package being installed, and pyinfra changes only what differs. The target hosts need nothing but an SSH server.

Salt is [a remote execution framework for configuration management and orchestration](https://docs.saltproject.io/salt/user-guide/en/latest/topics/overview.html). A Salt master sends commands to minions: the systems it manages, each running the salt-minion service. salt-ssh reaches systems without that agent. Still, Salt's docs [recommend the standard install](https://docs.saltproject.io/salt/install-guide/en/latest/topics/overview.html#standard-installation-overview) of a master plus minions for most organizations, since the agentless setup lacks some features.

Fabric is [a library that runs shell commands over SSH](https://www.fabfile.org/) and returns the results as Python objects, built on Invoke and Paramiko. Open a `Connection` to a host and call `run()` on it. To run your code from the shell, [write `@task` functions in a `fabfile.py`](https://docs.fabfile.org/en/latest/getting-started.html#addendum-the-fab-command-line-tool) and call them with `fab`.

Chalice is [a framework for serverless apps on AWS](https://aws.github.io/chalice/). Flask-style decorators hook your functions up to HTTP routes, schedules, and S3 events. Then [`chalice deploy`](https://aws.github.io/chalice/quickstart.html) provisions what they need on API Gateway and Lambda.

psutil [reads process and system stats](https://psutil.io/), like CPU, memory, disks, and network, with one API on every platform it supports. Its docs call [parsing the output of `ps` or `top`](https://psutil.io/alternatives/) fragile, since psutil reads the same kernel data directly. sh [calls any program as if it were a function](https://sh.readthedocs.io/en/latest/), on Unix-like systems only.

The Sentry SDK reports your app's errors and uncaught exceptions to Sentry. [Initialize it in your app's entry point](https://docs.sentry.io/platforms/python/), as early as possible. For Django, FastAPI, or another web framework, follow that framework's guide instead.

Supervisor [monitors and controls your project's processes](https://supervisord.org/) on Unix-like systems, without replacing init. Run each program [in the foreground, not as a daemon](https://supervisord.org/subprocess.html#nondaemonizing-of-subprocesses), so Supervisor can control it.

Flower is a web app showing the status of Celery workers and tasks in real time, and it's [Celery's recommended monitor](https://docs.celeryq.dev/en/stable/userguide/monitoring.html#flower-real-time-celery-web-monitor). [Start it with `celery -A <your app> flower`](https://flower.readthedocs.io/en/latest/install.html).

BorgBackup makes compressed, deduplicated backups [with authenticated encryption](https://www.borgbackup.org/), so your backup server only ever sees ciphertext. [Keep a copy of your key](https://borgbackup.readthedocs.io/en/stable/quickstart.html#repository-encryption) with `borg key export`.

Chaos Toolkit runs chaos engineering experiments. [Each experiment declares](https://chaostoolkit.org/reference/concepts/) a steady-state hypothesis, which describes what normal looks like for your system. Its method runs actions and probes, and rollbacks can revert those actions.

Whatever cloud your code talks to, keep access keys out of it. On the cloud's own machines, use the identity the machine already has: [an IAM role on EC2](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html#best-practices-for-configuring-credentials), [a managed identity on Azure](https://learn.microsoft.com/en-us/azure/developer/python/sdk/authentication/overview), [the attached service account on Google Cloud](https://docs.cloud.google.com/docs/authentication/application-default-credentials#attached-sa). On your own machine, sign in with the cloud's command-line tool. The SDK's [credential chain](https://learn.microsoft.com/en-us/azure/developer/python/sdk/authentication/credential-chains) picks up that login, so the same code runs in both places.
