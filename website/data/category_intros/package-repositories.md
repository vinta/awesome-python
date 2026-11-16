Self-host a Python package repository with pypiserver for private packages, devpi to cache PyPI alongside them, or bandersnatch to copy PyPI onto an offline network.

How to choose:

- One team's private packages, served from a directory: pypiserver
- A PyPI cache that keeps working offline, with or without your own packages: devpi
- Separate indexes for several teams, or staging releases before they go out: devpi
- A network with no route to PyPI, or a full or partial copy of PyPI: bandersnatch

### pypiserver

Pick pypiserver when one team needs to host its internal packages and nothing more. It's a [minimal PyPI-compatible server](https://github.com/pypiserver/pypiserver) that serves packages from a plain directory: [start it with `pypi-server run`](https://github.com/pypiserver/pypiserver#quickstart-installation-and-usage) and the directory's path. For a package it doesn't have, it [redirects pip to PyPI](https://github.com/pypiserver/pypiserver#more-details-about-pypi-server-run) by default and keeps no copy. When builds must run without PyPI, pick devpi or bandersnatch. Its README [strongly advises password-protecting uploads](https://github.com/pypiserver/pypiserver#uploading-packages-remotely).

### devpi

Pick devpi over pypiserver when you also want a PyPI cache, separate indexes for several teams, or a staging step before release. Its root/pypi index is a [self-updating PyPI cache](https://devpi.net/docs/devpi/devpi/latest/+doc/index.html) that works offline once files are first fetched. [Run `devpi-init`](https://devpi.net/docs/devpi/devpi/latest/+doc/quickstart-pypimirror.html) to set up a server with it. [Base your own index on that cache](https://devpi.net/docs/devpi/devpi/latest/+doc/quickstart-releaseprocess.html#initializing-a-basic-server-and-index), and all of PyPI shows up next to your uploads. To stage a tested release, push it [from one index to another](https://devpi.net/docs/devpi/devpi/latest/+doc/quickstart-releaseprocess.html#devpi-push-staging-a-release-to-another-index). By default, a package you upload [hides PyPI's releases of the same name](https://devpi.net/docs/devpi/devpi/latest/+doc/userman/devpi_indices.html#modifying-the-mirror-whitelist), which blocks dependency confusion attacks. Its docs warn that exposing devpi-server to the internet [isn't safe by default](https://devpi.net/docs/devpi/devpi/latest/+doc/adminman/security.html), so restrict who can create users first.

### bandersnatch

Pick bandersnatch when builds run on a network with no route to PyPI, or every dependency must be available offline. It's a [PyPI mirror client](https://bandersnatch.readthedocs.io/en/latest/): [`bandersnatch mirror`](https://github.com/pypa/bandersnatch#quickstart) syncs PyPI's files to local disk, and [any web server](https://bandersnatch.readthedocs.io/en/latest/serving.html) serves them from there. To keep the mirror to the projects you need, [filter it with an allowlist or blocklist](https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html#allowlist-blocklist-filtering-settings).

### Keeping installs safe

Set your server as pip's only index, rather than adding it as an extra index next to PyPI. pip [doesn't rank indexes](https://pip.pypa.io/en/latest/cli/pip_install/#finding-packages): it picks the best version match from all of them, so a public package with your private package's name can win. Serve the repository over [valid HTTPS](https://packaging.python.org/en/latest/guides/hosting-your-own-index/), since your users' installs are only as safe as every index they use.
