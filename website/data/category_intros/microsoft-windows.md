pywin32 lets Python call Windows APIs and drive COM apps like Excel. To use .NET assemblies from Python, load them with Python.NET.

How to choose:

- Windows API calls and COM automation: pywin32
- .NET assemblies from Python, or Python inside a .NET app: pythonnet
- Several Python versions on one machine, switched per folder: pyenv-win
- A portable Python that runs from a folder, with nothing installed: winpython

### pywin32

Pick pywin32 when your Python code needs Windows itself: COM objects, the event log, or other Win32 API calls. Python's own Windows docs [point to it for advanced Windows-specific support](https://docs.python.org/3/using/windows.html#pywin32). To drive an app through COM, pass its name to `win32com.client.Dispatch()`, as [the quick start does with Excel](https://mhammond.github.io/pywin32/html/com/win32com/HTML/QuickStartClientCom.html).

### Python.NET

Pick Python.NET when your Python code needs a .NET library, or a .NET app needs to run Python. It [runs the CPython engine with a .NET runtime](https://pythonnet.github.io/pythonnet/) instead of compiling Python to .NET code, so your existing Python packages and their C extensions keep working. Load each assembly with [`clr.AddReference()`](https://pythonnet.github.io/pythonnet/python.html), and its namespaces import like Python packages. When a .NET app embeds Python, [restrict its use to trusted code](https://pythonnet.github.io/pythonnet/dotnet.html), since the docs call Python code running under Python.NET unverifiable.

### pyenv-win

Pick pyenv-win to keep several Python versions on one Windows machine and switch between them. It's pyenv ported to Windows. Run `pyenv local` with an installed version in a project folder, and [that version runs whenever you call `python` there](https://github.com/pyenv-win/pyenv-win#usage).

### WinPython

Pick WinPython for a Python that runs from a folder. [Unzip it anywhere](https://winpython.github.io/), like a USB key, and nothing gets installed or written to the registry. It's aimed at scientific, data, and educational work, and its builds range from bare Python with pip to Spyder, JupyterLab, and the scientific stack. Add packages to the folder, then zip it up to hand the same setup to your students or colleagues.
