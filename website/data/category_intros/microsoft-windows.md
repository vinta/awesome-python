On Windows, pywin32 gives Python the Win32 API and COM, from registry keys to Excel. Calling .NET needs a Python Windows library of its own: pythonnet.

How to choose:

- Win32 API calls, the registry, the event log, or COM automation of apps like Excel: pywin32
- .NET assemblies from Python, or Python embedded in a .NET app: pythonnet
- Several Python versions on one machine, switched per folder: pyenv-win
- A portable Python that runs from a folder, a network share, or a USB key: WinPython

pywin32 provides [access to many of the Windows APIs, including COM](https://github.com/mhammond/pywin32). Install it with `python -m pip install --upgrade pywin32`. Outside a virtual environment, its post-install script sets up COM objects and services. [Never run it inside one](https://github.com/mhammond/pywin32#installing-via-pip). To drive an app over COM, [pass its name to `win32com.client.Dispatch()`](https://mhammond.github.io/pywin32/html/com/win32com/HTML/QuickStartClientCom.html), like `"Excel.Application"`. Then call its methods and set its properties as on any Python object.

pythonnet [integrates CPython with the .NET runtime](https://pythonnet.github.io/pythonnet/) instead of compiling Python to .NET code, so your existing Python code and C extensions keep working. Install it with `pip install pythonnet`. [Pick the runtime before you import `clr`](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime), with `load("coreclr")` or the `PYTHONNET_RUNTIME` environment variable, or you get the default one. Then [load each assembly with `clr.AddReference()`](https://pythonnet.github.io/pythonnet/python.html#importing-modules) and import its namespaces like Python packages. It also works the other way, to [embed Python in a .NET app](https://pythonnet.github.io/pythonnet/dotnet.html).

pyenv-win [brings pyenv to Windows](https://github.com/pyenv-win/pyenv-win#introduction), so you get pyenv's commands for switching between Python versions. Install it with [the PowerShell script from its quick start](https://github.com/pyenv-win/pyenv-win#quick-start), then set your default with `pyenv install <version>` and `pyenv global <version>`. In a project folder, [`pyenv local <version>`](https://github.com/pyenv-win/pyenv-win#usage) picks the Python that `python` runs there, with nothing to activate.

WinPython is a [portable Python distribution](https://winpython.github.io/). Unzip it anywhere, like a network share or a USB key, and it runs, with nothing installed or written to the registry. Pick a build by [how much comes preinstalled](https://winpython.github.io/#builds): a bare Python you fill yourself, or the scientific stack with Spyder and JupyterLab ready to open. [Add packages with pip or wppm](https://winpython.github.io/#about), then zip the folder and hand it to your students or colleagues.
