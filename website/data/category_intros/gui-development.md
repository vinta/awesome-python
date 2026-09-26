For a Python GUI library, use PySide6 for desktop apps, or tkinter to stay on the standard library. For a UI that runs in the browser, use NiceGUI.

How to choose:

- A full desktop app: PySide6, or PyQt6 for a codebase already on it
- A small tool on the standard library alone: tkinter
- A modern look on top of tkinter: CustomTkinter, or Tkinter Designer to turn a Figma design into tkinter code
- A GNOME or GTK app: PyGObject
- Native widgets on Windows, macOS, and Linux: wxPython
- Native widgets on desktop and mobile: Toga
- A touch-first app for desktop and mobile: Kivy
- Fast, interactive tools with lots of plots: Dear PyGui
- A UI in the browser, or in its own desktop window: NiceGUI
- An HTML, CSS, and JavaScript frontend in a native window: pywebview
- Web, desktop, and mobile apps from one codebase: Flet
- A GUI for an existing argparse script: Gooey

With PySide6, build desktop apps with Qt Widgets, which [respect the system style](https://doc.qt.io/qtforpython-6/faq/whatisqt.html), and save Qt Quick for fluid, touch-style UIs. Lay out windows in Qt Widgets Designer (`pyside6-designer`), then turn each `.ui` file into a Python class with `pyside6-uic`, which the docs call [the standard way](https://doc.qt.io/qtforpython-6/tutorials/basictutorial/uifiles.html) to use it. To ship the app, the docs recommend `pyside6-deploy` over PyInstaller and similar tools, since it's ["easier to use and also to get the most optimized executable."](https://doc.qt.io/qtforpython-6/deployment/index.html)

PySide6 and PyQt6 both bind Qt, so the license usually decides. PySide6 is available under the LGPLv3/GPLv3 and a commercial license. PyQt6 is GPLv3 or commercial, and in Riverbank's words: ["Unlike Qt, PyQt is not available under the LGPL."](https://www.riverbankcomputing.com/software/pyqt/) If your app can't be GPL, PyQt6 means buying a license.

With tkinter, import `tkinter.ttk` too and use its themed widgets. Be careful with tutorials: the docs warn that [most documentation you will find online still uses the old API](https://docs.python.org/3/library/tkinter.html) and can be woefully outdated. CustomTkinter adds modern, customizable widgets on top of tkinter, with [a consistent look across all desktop platforms](https://customtkinter.tomschimansky.com/).

NiceGUI serves your UI to the browser by default. Pass `native=True` to `ui.run()` and it [opens in a desktop window](https://nicegui.io/documentation/section_configuration_deployment#native_mode) instead, through pywebview. Use pywebview directly for your own HTML frontend, and pass a Python object as `js_api` to [call its methods from JavaScript](https://pywebview.flowrl.com/guide/interdomain) as `pywebview.api`.

Toga, Kivy, and Flet each have their own packager. Toga apps ship with Briefcase, BeeWare's tool for [turning a Python project into a standalone native app](https://briefcase.beeware.org/en/stable/). Kivy [recommends Buildozer](https://kivy.org/doc/stable/guide/packaging-android.html) for Android, and Flet has [`flet build`](https://flet.dev/docs/publish/).

In any toolkit, keep slow work out of event handlers, or the UI stops responding. The tkinter docs say [long-running computations](https://docs.python.org/3/library/tkinter.html#threading-model) belong in smaller pieces on a timer or in another thread, not in a handler. Run the slow work with Qt's threads and signals, or NiceGUI's `run.io_bound()` and `run.cpu_bound()`. In wxPython and Kivy, hand the result back to the UI thread with `wx.CallAfter()` or `@mainthread`.
