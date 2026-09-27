Your own Python package repository can mirror PyPI with bandersnatch, or host private packages over a PyPI cache with devpi. Warehouse is the code behind PyPI.

How to choose:

- A full or filtered mirror of PyPI: bandersnatch
- Private packages, with PyPI served from the same index: devpi
- A PyPI cache that keeps working offline: devpi
- Testing and staging your releases before PyPI: devpi
- Learning how PyPI works, or contributing to it: Warehouse

bandersnatch is what [PyPI's help page recommends](https://pypi.org/help/#mirroring) for running your own mirror. It only syncs the static files installers need: it takes no uploads and skips PyPI's dynamic APIs. [Its quickstart](https://github.com/pypa/bandersnatch#quickstart) has you run `bandersnatch mirror` once to write a config file, then adapt that file. Run it again to fill the mirror, and on a schedule to keep it current. [Add an allowlist or blocklist](https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html#allowlist-blocklist-filtering-settings) to cut the mirror down, and serve its `web/` directory with any static web server.

devpi is what [PyPI's help page recommends](https://pypi.org/help/#private-indices) for private packages, which PyPI doesn't host. devpi-server sets up `root/pypi`, [a caching mirror of PyPI](https://devpi.net/docs/devpi/devpi/stable/+doc/quickstart-pypimirror.html) that downloads each release on first request and works offline after that. When a cache is all you need, point pip at it. For your own packages, [create an index with `root/pypi` as its base](https://devpi.net/docs/devpi/devpi/stable/+doc/quickstart-releaseprocess.html#initializing-a-basic-server-and-index), so one URL serves your uploads and all of PyPI. By default, a name you upload there [hides the PyPI package with the same name](https://devpi.net/docs/devpi/devpi/stable/+doc/userman/devpi_indices.html#modifying-the-mirror-whitelist), which stops dependency confusion attacks. devpi-client handles the release steps: `devpi upload`, `devpi test` to run their tox tests, and `devpi push` to a staging index or on to PyPI. Before you put the server on the internet, [secure it](https://devpi.net/docs/devpi/devpi/stable/+doc/adminman/security.html): its docs warn that exposing it isn't safe by default.

Warehouse powers PyPI itself, and [its own docs say](https://warehouse.pypa.io/application/#usage-assumptions-and-concepts) people who run their own package index usually use other tools, like devpi. Read it to learn how PyPI works, or [set up its development environment](https://warehouse.pypa.io/development/getting-started/) with Docker to contribute.

Whichever you run, point pip at your server as its only index. [pip's docs call `--extra-index-url` unsafe](https://pip.pypa.io/en/stable/cli/pip_install/#cmdoption-extra-index-url) for private packages: pip checks every index with no priority, so a package with the same name on PyPI can win. And [serve your repository over valid HTTPS](https://packaging.python.org/en/latest/guides/hosting-your-own-index/).
