Desktop apps with room to grow start on Qt, through PySide6. A small tool needs no third-party Python GUI library, since tkinter is in the standard library.

How to choose:

- A desktop app that will grow, even a closed-source one: PySide6
- A small tool, built with the standard library: tkinter
- GNOME apps, or anything else on GTK: PyGObject
- Fast, GPU-drawn tools and live plots: Dear PyGui
- Touch UIs that also run on Android and iOS: Kivy
- Native widgets on Windows, macOS, and Linux: wxPython
- Native widgets on desktop and mobile: Toga
- A Qt app under the GPL, or with a commercial license: PyQt6
- A modern look and dark mode for tkinter apps: CustomTkinter
- Your own HTML, CSS, and JavaScript in a desktop window: pywebview
- A pure Python UI in the browser or a desktop window: NiceGUI
- One Python codebase for desktop, mobile, and web: Flet

PySide6 is [the official Python binding for Qt](https://doc.qt.io/qtforpython-6/), under the LGPL, which [lets your app's code stay closed](https://www.qt.io/licensing/open-source-lgpl-obligations) as long as you meet its terms. Build the UI with Qt Widgets for an app that [looks native](https://doc.qt.io/qtforpython-6/faq/whatisqt.html#widgets), or with QML, which was [first made for mobile apps](https://doc.qt.io/qtforpython-6/faq/whatisqt.html#qml) and runs on desktop too. To lay out forms visually, draw them in Qt Widgets Designer, and pyside6-uic [turns the .ui files into Python](https://doc.qt.io/qtforpython-6/tutorials/basictutorial/uifiles.html).

PyQt6 binds the same Qt, and PySide6 [aims to be API compatible with PyQt](https://doc.qt.io/qtforpython-6/considerations.html#api-changes), with some exceptions. The license is what splits them: PyQt6 is [GPL or commercial, never LGPL](https://www.riverbankcomputing.com/static/Docs/PyQt6/introduction.html#license), so with the GPL version your own code must use a compatible license.

tkinter is part of the standard library. Use the themed `tkinter.ttk` widgets, which [adapt to each platform's native theme](https://docs.python.org/3/library/tkinter.ttk.html). Most tutorials online still teach the old API, so [the docs point you to TkDocs](https://docs.python.org/3/library/tkinter.html), which teaches the modern one.

CustomTkinter widgets [work like normal Tkinter widgets](https://github.com/TomSchimansky/CustomTkinter) and mix with them, and they follow the system's light or dark mode.

PyGObject is [the way to go](https://pygobject.gnome.org/) for a GNOME app or any GTK app. Start with the GNOME Developer Documentation's [beginner lessons](https://developer.gnome.org/documentation/tutorials/beginners.html). In code, subclass `Gtk.Application` and build your window in `do_activate()`, as [the getting-started example](https://pygobject.gnome.org/getting_started.html) does.

Dear PyGui is built on Dear ImGui and [draws in immediate mode on your GPU](https://github.com/hoffstadt/DearPyGui), for [scientific, engineering, and data science apps](https://dearpygui.readthedocs.io/en/latest/) that need fast, interactive interfaces. Every main script [runs the same steps](https://dearpygui.readthedocs.io/en/latest/tutorials/first-steps.html#first-run): create the context and the viewport, set up, show the viewport, start, then destroy the context.

Kivy was built [from scratch for multi-touch](https://kivy.org/doc/stable/philosophy.html), and the same code runs on Windows, macOS, Linux, Android, and iOS. Subclass `App` and [return your root widget from `build()`](https://kivy.org/doc/stable/guide/basic.html#create-an-application). As the UI grows, move it into the KV language, which [separates your app's logic from its interface](https://kivy.org/doc/stable/guide/lang.html#concept-behind-the-language).

wxPython wraps the wxWidgets C++ library and, in most cases, [uses each platform's native widgets](https://wxpython.org/pages/overview/#what-is-wxpython). Its [Hello World](https://wxpython.org/pages/overview/#hello-world) subclasses `wx.Frame`, puts the widgets on a `wx.Panel`, and lays them out with a sizer.

Toga [uses native system widgets, not themes](https://toga.beeware.org/en/latest/about/philosophy/#native-widgets-not-themes), on macOS, Windows, Linux, Android, and iOS. It's part of BeeWare, whose [tutorial](https://tutorial.beeware.org/) builds an app with Toga.

pywebview [shows your HTML, CSS, and JavaScript in a native window](https://pywebview.flowrl.com/). It doesn't bundle a GUI toolkit or web renderer, so a frozen app [stays small](https://pywebview.flowrl.com/guide/). Point the window at a web server you already run, or call Python from JavaScript through its [JS API bridge](https://pywebview.flowrl.com/guide/architecture.html#js-api-with-internal-http-server) and serve static files from the built-in HTTP server.

NiceGUI keeps [all UI logic in Python](https://github.com/zauberzeug/nicegui#architecture) on a FastAPI backend and handles the web details for you. The UI shows up in your browser, or in a native desktop window.

Flet makes [web, desktop, and mobile apps](https://flet.dev/docs/) without HTML, CSS, or JavaScript, and [builds them with Flutter](https://flet.dev/docs/publish/). `flet run` [opens your app](https://github.com/flet-dev/flet) in a desktop window, and `flet run --web` in the browser. As the app gets more interactive, its docs [favor the declarative style](https://flet.dev/docs/cookbook/declarative-vs-imperative/), where the UI is derived from your app's state.
