Convert a Python script to an exe with PyInstaller, or with Nuitka to ship compiled code instead of bytecode. cx_Freeze also builds installers like MSI and DMG.

How to choose:

- A standalone exe from your script: pyinstaller
- Compiled code that's harder to decompile: Nuitka
- An MSI, DMG, AppImage, or deb installer: cx-Freeze
- One file for servers that already run Python: pex
- Obfuscated scripts, bound to one machine or set to expire: pyarmor

### PyInstaller

Start with PyInstaller for your first exe. It bundles your app with its dependencies, so users run it [without installing Python](https://pyinstaller.org/en/stable/), and it handles major packages like NumPy, matplotlib, and PyQt out of the box. Run `pyinstaller your_program.py`, and the app shows up in the `dist` folder.

### Nuitka

Pick Nuitka over PyInstaller when you'd rather not ship your code as bytecode. PyInstaller bundles `.pyc` files, which [can be decompiled](https://pyinstaller.org/en/stable/operating-mode.html#hiding-the-source-code). Nuitka turns your Python into C code and compiles it, so the binary is harder to read back. CPU-bound pure-Python code may also run faster. The cost is a C compiler and much slower builds. Build in its standalone mode, since its default mode makes a binary that [still needs your Python installation](https://nuitka.net/user-documentation/user-manual.html).

### cx_Freeze

Pick cx_Freeze when what you ship is an installer: it builds [an MSI on Windows, a DMG on macOS](https://cx-freeze.readthedocs.io/en/stable/overview.html), and AppImage, deb, or RPM packages on Linux. Configure it in `pyproject.toml`, then run the installer command for your platform, like [`cxfreeze bdist_msi`](https://cx-freeze.readthedocs.io/en/stable/bdist_msi.html).

### pex

Pick pex when every machine you deploy to already runs Python, like your servers. It packs your app and its dependencies into one `.pex` file, so [deploying is just copying that file](https://docs.pex-tool.org/whatispex.html). For machines without Python, its [scie mode](https://docs.pex-tool.org/scie.html) embeds an interpreter and builds a native executable.

### Pyarmor

Add Pyarmor when you want to [obfuscate your scripts](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html), bind them to one machine, or make them expire. Run `pyarmor gen foo.py` to obfuscate a script. It doesn't build executables itself, so it [calls PyInstaller](https://pyarmor.readthedocs.io/en/latest/topic/repack.html) to pack one.

### Building on each platform

Build on each operating system you ship to: PyInstaller [isn't a cross-compiler](https://pyinstaller.org/en/stable/), and cx_Freeze [makes an executable only for the platform it runs on](https://cx-freeze.readthedocs.io/en/stable/faq.html#freezing-for-other-platforms). Get the folder build working before you switch to a single file, since problems are [much easier to diagnose](https://pyinstaller.org/en/stable/operating-mode.html#bundling-to-one-file) in a folder.
