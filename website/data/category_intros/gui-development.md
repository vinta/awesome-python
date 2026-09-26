Among Python GUI libraries, PySide6 is the default for desktop apps and tkinter for small tools. For a UI in the browser, pick NiceGUI.

How to choose:

- Full desktop app: PySide6, or PyQt6 if your app can be GPL or you buy a license
- Small tool without third-party packages: tkinter
- Modern look for a tkinter app: [CustomTkinter](https://customtkinter.tomschimansky.com/)
- tkinter layout drawn in Figma: [Tkinter Designer](https://github.com/ParthJadhav/Tkinter-Designer)
- Native widgets on Windows, macOS, and Linux: [wxPython](https://wxpython.org/pages/overview/)
- GNOME app on Linux: [PyGObject](https://pygobject.gnome.org/)
- GPU-rendered tools for your scripts: [Dear PyGui](https://dearpygui.readthedocs.io/en/latest/about/what-why.html)
- Multi-touch apps on Android and iOS: Kivy
- Native widgets on desktop and mobile: Toga
- One codebase for web, desktop, and mobile: Flet
- Dashboards and web UIs: NiceGUI
- HTML/JavaScript frontend in a desktop window: [pywebview](https://pywebview.flowrl.com/guide/)
- GUI for an existing argparse script: [Gooey](https://github.com/chriskiehl/Gooey)

PySide6 is Qt for Python, the [official Python bindings for Qt](https://doc.qt.io/qtforpython-6/), under the LGPL, the GPL, or a commercial license. Qt's docs [recommend a virtual environment](https://doc.qt.io/qtforpython-6/gettingstarted.html) over installing it into your system Python. Ship it with [pyside6-deploy](https://doc.qt.io/qtforpython-6/deployment/index.html).

PyQt6 wraps the same Qt, but Riverbank [licenses it under the GPL or a commercial license, not the LGPL](https://www.riverbankcomputing.com/software/pyqt/). So a closed-source app needs a commercial PyQt6 license, while PySide6 can stay on the LGPL.

tkinter is the standard Python interface to Tcl/Tk. Python's docs recommend the [themed tkinter.ttk widgets](https://docs.python.org/3/library/tkinter.ttk.html), which follow the platform's native theme, over the classic ones most online docs still use.

NiceGUI runs a web server and shows your UI in the browser, which suits dashboards, micro web apps, and robotics projects. Pass `native=True` to `ui.run()` to [open it in a desktop window](https://nicegui.io/documentation/section_configuration_deployment) instead, or bundle it into an executable with nicegui-pack.

Kivy runs the same code on Android, iOS, Linux, macOS, and Windows. Declare the widget tree in the [KV language](https://kivy.org/doc/stable/guide/lang.html) to keep the UI apart from your logic, and build Android packages with [Buildozer](https://kivy.org/doc/stable/guide/packaging-android.html).

Toga [uses native system widgets, not themes](https://toga.beeware.org/en/stable/about/philosophy/), so a Toga app is a native app on each platform. Start with the [BeeWare tutorial](https://tutorial.beeware.org/), which packages your app with Briefcase.

Flet builds web, desktop, and mobile apps from one Python codebase, [without HTML, CSS, or JavaScript](https://flet.dev/docs/). Package it for each platform with [flet build](https://flet.dev/docs/publish/).

Whatever you pick, keep slow work out of event handlers, or the window freezes. The [tkinter docs](https://docs.python.org/3/library/tkinter.html) say to break it into smaller pieces with timers or run it in another thread, and Qt's docs suggest threads for the same reason.
