Shipping to users without Python means converting a Python script to an executable, which PyInstaller does in one command. Pyarmor can obfuscate it first.

How to choose:

- Standalone executable for most apps: PyInstaller
- Obfuscated scripts, bound to a machine or set to expire: Pyarmor
- Compiled code instead of bundled bytecode: Nuitka
- Tools for machines that already run Python: shiv
- Installers and Linux packages: cx_Freeze

PyInstaller [bundles your app and all its dependencies](https://pyinstaller.org/en/latest/) into one package, so users run it without installing Python or any modules. For most programs, that's [one short command](https://pyinstaller.org/en/latest/operating-mode.html): `pyinstaller myscript.py`.

Pyarmor [obfuscates Python scripts](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html), and can bind them to a machine or make them expire. `pyarmor gen foo.py` writes the obfuscated script to `dist/`. To ship an executable, Pyarmor [packs through PyInstaller](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#packing-obfuscated-scripts): `pyarmor gen --pack onefile foo.py`.

Without obfuscation, a PyInstaller bundle holds `.pyc` files that [could in principle be decompiled](https://pyinstaller.org/en/latest/operating-mode.html#hiding-the-source-code). Pyarmor is commercial: its free version is only for scripts that [won't make you a lot of money](https://pyarmor.readthedocs.io/en/latest/licenses.html#terms-of-use).

Nuitka is an optimizing Python compiler, and it [needs a C compiler](https://nuitka.net/user-documentation/user-manual.html). Its default mode needs Python on the machine, so [build in standalone mode to distribute](https://nuitka.net/user-documentation/tutorial-setup-and-build.html#distribute), and copy the resulting folder. Compiling protects your source code, but Nuitka's docs say constants stay readable unless you buy [Nuitka Commercial](https://nuitka.net/doc/commercial.html).

shiv builds [self-contained zipapps with all their dependencies included](https://shiv.readthedocs.io/en/latest/). `shiv -c hello -o hello .` packages your project the way `pip install .` would, with `-c` naming its console script. The result [depends on a pre-installed Python](https://packaging.python.org/en/latest/overview/#depending-on-a-pre-installed-python), which you can count on in your data centers and on developers' machines, but not on every user's computer.

cx_Freeze [freezes a script and its modules into a standalone executable](https://cx-freeze.readthedocs.io/en/latest/script.html), and also [builds installers and packages](https://cx-freeze.readthedocs.io/en/latest/): MSI for Windows, DMG for macOS, and deb, RPM, and AppImage for Linux. Put your options in `pyproject.toml` under `[tool.cxfreeze]` and build with [`cxfreeze build`](https://cx-freeze.readthedocs.io/en/latest/setup_script.html).

Get a folder build working before you switch to a single file, since problems are easier to diagnose in a folder. PyInstaller's docs [say so for one-folder mode](https://pyinstaller.org/en/latest/operating-mode.html#bundling-to-one-file), and Nuitka's [for standalone mode](https://nuitka.net/user-documentation/use-cases.html#standalone-program-distribution).

For an executable, plan to build on each OS you ship to. PyInstaller [isn't a cross-compiler](https://pyinstaller.org/en/latest/), cx_Freeze [only makes executables for the platform it runs on](https://cx-freeze.readthedocs.io/en/latest/faq.html#freezing-for-other-platforms), and Nuitka's docs suggest [Nuitka-Action](https://nuitka.net/user-documentation/use-cases.html#building-with-github-workflows) to build on all 3 OSes in GitHub workflows.
