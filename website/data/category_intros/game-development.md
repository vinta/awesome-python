Write 2D games in pygame-ce, or in Arcade if you'd rather have the game loop and physics built in. Panda3D builds 3D games, and Ren'Py visual novels.

How to choose:

- 2D games where you write the game loop yourself: pygame-ce
- 2D games with the game loop and physics engines built in: Arcade
- 3D games, visualizations, and simulations: Panda3D
- Visual novels and other writing-heavy games: Ren'Py
- Windowing, input, OpenGL, and sound, with no game engine on top: pyglet
- Code already built on pygame: pygame
- Retro pixel-art games, with image, tilemap, and sound editors built in: Pyxel

### pygame-ce

Pick pygame-ce for a 2D game when you want [complete control of your game loop](https://pyga.me/). It's built on SDL and forked from pygame, and keeps the same `import pygame`. The fork aims for [more frequent releases, continuous bugfixes and enhancements](https://github.com/pygame-community/pygame-ce). Its docs start you on [a basic game loop](https://pyga.me/docs/) that opens the window, handles events, and updates the screen every frame. To move pygame code over, [uninstall pygame before you install pygame-ce](https://github.com/pygame-community/pygame-ce/wiki/Installing-pygame%E2%80%90ce).

### Arcade

Pick Arcade over pygame-ce when you'd rather have the game loop and [physics engines](https://api.arcade.academy/en/stable/tutorials/platform_tutorial/step_05.html) built in. Its focus [is on education](https://api.arcade.academy/en/stable/about/intro.html), and it's designed to be easy to use and to teach programming concepts. Your game subclasses `arcade.Window`, and Arcade [calls its update method every frame](https://api.arcade.academy/en/stable/tutorials/platform_tutorial/step_04.html).

### Panda3D

Panda3D is the pick for [3D games, visualizations, and simulations](https://www.panda3d.org/). Pass on it if you're new to programming: its manual says [you must be a skilled programmer](https://docs.panda3d.org/latest/python/introduction/index#panda3d-is-not-a-beginner-s-tool-or-a-toy). Your app [inherits from `ShowBase`](https://docs.panda3d.org/latest/python/introduction/tutorial/starting-panda3d), which opens the 3D window.

### Ren'Py

Pick Ren'Py for visual novels and other writing-heavy games. It comes with [the features players expect](https://www.renpy.org/why.html#features-players-want) from a visual novel, like saving, rollback, and skipping. Ren'Py isn't a library you pip install: [download it and run its launcher](https://www.renpy.org/doc/html/quickstart.html), which creates and runs your projects. You write the story in Ren'Py's script language, and drop into Python with [the `python` statement](https://www.renpy.org/doc/html/python.html) for complex game logic.

### pyglet

Pick pyglet when you want the layer that [Arcade builds on](https://pyglet.readthedocs.io/en/latest/external_resources.html#arcade): [windowing, input, OpenGL graphics, and sound](https://pyglet.readthedocs.io/en/latest/) for games and other visually rich applications. For most games, it [needs nothing else besides Python](https://pyglet.org/). Start at [Writing a pyglet application](https://pyglet.readthedocs.io/en/latest/programming_guide/quickstart.html), which creates a `pyglet.window.Window` and lets pyglet's event loop call your handlers.

### Pyxel

Pick Pyxel for a retro-style pixel-art game, with the art and sound made in its own editors. Run `pyxel edit` to open [Pyxel Editor](https://github.com/kitao/pyxel/blob/main/docs/editor-manual.md), which draws images and tilemaps, composes sounds and music, and saves them to a resource file you load with `pyxel.load()`. Your script [calls `pyxel.init()` with the screen size](https://github.com/kitao/pyxel/blob/main/docs/user-guide.md#create-a-program), then `pyxel.run()` with an `update` function for each frame's state and a `draw` function for the screen.
