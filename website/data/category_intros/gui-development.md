Build a full desktop app with PySide6, and a small tool with tkinter, the Python GUI library bundled with Python. NiceGUI puts a Python-only UI in a browser.

How to choose:

- A full desktop app, with Qt's widgets and tools: PySide6
- A small tool with nothing to install: tkinter
- A dashboard or small tool in the browser, written only in Python: NiceGUI
- A GTK app, or an app for GNOME: PyGObject
- Fast, GPU-drawn tools for data, science, and engineering: Dear PyGui
- Touch apps that run on desktop, Android, and iOS: Kivy
- Code already built on wxPython: wxPython
- OS-native widgets from one Python API, on desktop and mobile: Toga
- Existing PyQt code, or an app you release under the GPL: PyQt6
- A tkinter app with a modern look and light and dark modes: CustomTkinter
- A desktop window around the HTML and JavaScript you write: pywebview
- One Python codebase for desktop, web, and mobile apps: Flet

### PySide6

Pick PySide6 for a full desktop app. It's [the official Python bindings for Qt](https://doc.qt.io/qtforpython-6/), available under the LGPL. PyQt6 wraps the same Qt, and PySide6 aims to be [API compatible with PyQt](https://doc.qt.io/qtforpython-6/considerations.html), so the license is the main reason to pick one over the other. The wheels [already include the Qt binaries](https://doc.qt.io/qtforpython-6/gettingstarted.html), so installing PySide6 brings Qt with it. The same page walks you through [your first Qt Widgets app](https://doc.qt.io/qtforpython-6/gettingstarted.html#create-your-first-qt-application-with-qt-widgets), the imperative way to build a UI. Qt Quick is the declarative way, written in QML.

### tkinter

Use tkinter for a small tool when you don't want to install anything. It's [the standard Python interface to Tcl/Tk](https://docs.python.org/3/library/tkinter.html), and it [usually comes bundled with Python](https://docs.python.org/3/library/tk.html). Build with the themed widgets in `tkinter.ttk`, which the docs say give [a much better appearance on different platforms](https://docs.python.org/3/library/tkinter.html#architecture) than classic Tk's dated look. Most tkinter docs online still use the old API, so learn from [the docs' Hello World program](https://docs.python.org/3/library/tkinter.html#a-hello-world-program) and [TkDocs](https://tkdocs.com/), which teach the modern one.

### NiceGUI

Pick NiceGUI for a UI that shows up in the browser while all your code stays in Python. It's [great for micro web apps, dashboards, robotics projects](https://github.com/zauberzeug/nicegui), and similar tools. [Three lines make a running app](https://nicegui.io/): create elements like `ui.label()`, then call `ui.run()` to serve them. To open the same app in a desktop window, NiceGUI's native mode [runs it through pywebview](https://nicegui.io/documentation/section_configuration_deployment).

### PyGObject

Pick PyGObject for an app built on GTK or meant for GNOME: its docs say [PyGObject is the way to go](https://pygobject.gnome.org/) for both. It's licensed under the LGPL, while Kivy, Toga, and Dear PyGui use permissive licenses. Its getting-started page has you write [a `Gtk.Application` subclass](https://pygobject.gnome.org/getting_started.html) that opens a window when it activates. For a full GNOME app, its docs point to the [GNOME tutorials](https://developer.gnome.org/documentation/tutorials/beginners.html).

### Dear PyGui

Pick Dear PyGui for [scientific, engineering, gaming, and data science apps](https://dearpygui.readthedocs.io/en/latest/) that need fast, interactive interfaces. It's built on Dear ImGui, but [gives you a retained mode API](https://dearpygui.readthedocs.io/en/latest/about/what-why.html), and it doesn't use native widgets: your graphics card draws them. Every main script follows [the same steps](https://dearpygui.readthedocs.io/en/latest/tutorials/first-steps.html): create the context and the viewport, set up, show, and start Dear PyGui, then clean up the context.

### Kivy

Pick Kivy for touch apps that run on desktop, Android, and iOS. It was created from scratch [for multi-touch](https://kivy.org/doc/stable/philosophy.html), and it [draws all its widgets](https://kivy.org/doc/stable/guide/architecture.html) with its own graphics API on top of OpenGL. An app [subclasses `App`](https://kivy.org/doc/stable/guide/basic.html) and returns its root widget from `build()`. Lay out the widget tree in [the KV language](https://kivy.org/doc/stable/guide/lang.html), which keeps your app's logic apart from its interface.

### wxPython

Keep wxPython for an app already built on it. It wraps the wxWidgets C++ library and [uses each platform's native widgets in most cases](https://wxpython.org/pages/overview/). The same page's Hello World creates a `wx.App` and a `wx.Frame`, shows the frame, and runs `MainLoop()`.

### Toga

Pick Toga when your app should use each OS's own widgets from one Python API, on desktop and mobile. It uses [native system widgets, not themes](https://toga.beeware.org/en/latest/about/philosophy/), and follows an 80% rule: its API covers most use cases and exposes enough internals for the rest. Its [tutorial](https://toga.beeware.org/en/latest/tutorial/tutorial-0/) builds a `toga.App` whose startup function returns a box of widgets. Its companion in BeeWare is Briefcase, which [turns your project into a standalone native app](https://briefcase.beeware.org/en/latest/).

### PyQt6

Keep PyQt6 for existing PyQt code, or for an app you release under the GPL. It's [GPL or commercial, and not available under the LGPL](https://www.riverbankcomputing.com/static/Docs/PyQt6/introduction.html), so under the GPL your own code must use a compatible license. If yours doesn't, you [need a commercial PyQt license](https://www.riverbankcomputing.com/commercial/license-faq).

### CustomTkinter

Pick CustomTkinter when a tkinter app should look modern, with [a consistent look across Windows, macOS, and Linux](https://customtkinter.tomschimansky.com/). Its widgets [work like normal tkinter widgets](https://github.com/TomSchimansky/CustomTkinter) and mix with them, and they follow the system's light or dark mode, or the one you set. [Every app starts with a `CTk` window](https://customtkinter.tomschimansky.com/tutorial/first-app) and ends with `mainloop()`.

### pywebview

Pick pywebview to build the GUI with JavaScript, HTML, and CSS, and [show it in its own native window](https://pywebview.flowrl.com/). Its [Hello world](https://pywebview.flowrl.com/guide/) passes a URL to `webview.create_window()`, then calls `webview.start()`. To call Python from your JavaScript without a web server, use [the JS API bridge](https://pywebview.flowrl.com/guide/architecture.html).

### Flet

Pick Flet when one Python codebase should run on desktop, web, and mobile. It builds apps [without HTML, CSS, or JavaScript](https://flet.dev/docs/), and on desktop [a Flutter client displays the UI](https://flet.dev/docs/getting-started/running-app) your Python code describes. [`flet create`](https://flet.dev/docs/getting-started/create-flet-app) makes a small counter app to start from, and `flet run` opens it.
