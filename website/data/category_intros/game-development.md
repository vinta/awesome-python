2D games need a game loop: pygame-ce has you write it; Arcade runs it. Ren'Py is built for visual novels, as Panda3D is for 3D in Python game development.

How to choose:

- A game loop you write and control yourself: pygame-ce
- A game loop, physics, and screen switching built in: Arcade
- 3D games, visualizations, and simulations: Panda3D
- Visual novels and other writing-heavy games: Ren'Py
- Windowing, OpenGL graphics, and media with no dependencies: pyglet
- Code already written for pygame: pygame-ce

pygame-ce installs as `pygame-ce` and still imports as `pygame`. It [gives you full control of program execution](https://pyga.me/docs/): you write the loop that handles events, draws the frame, and flips the display. pygame-ce is LGPL, which [still allows closed-source and commercial games](https://github.com/pygame-community/pygame-ce); only changes to pygame-ce itself must be released under a compatible license.

Arcade is built on pyglet, and it's [ideal for beginning programmers](https://github.com/pythonarcade/arcade) or anyone who wants 2D games without learning a complex framework. Give each screen its own `arcade.View` subclass that overrides `on_draw()` and `on_update()`, then [hand control to `arcade.run()`](https://api.arcade.academy/en/stable/tutorials/views/index.html). Draw sprites through a `SpriteList`, [the only way to draw a sprite](https://api.arcade.academy/en/stable/programming_guide/performance_tips.html), which batches them for you. For movement and collisions, start with the [built-in physics engines](https://api.arcade.academy/en/stable/api_docs/api/physics_engines.html): a simple one for top-down games, and a platformer one with gravity and moving platforms.

Panda3D is a C++ engine scripted in Python, and [its manual says you must be a skilled programmer](https://docs.panda3d.org/latest/python/introduction/index) to use it. Subclass `ShowBase`, which opens the 3D window, and [call `run()` once, as the last line](https://docs.panda3d.org/latest/python/introduction/tutorial/starting-panda3d). A model shows up only once it's [attached to the scene graph](https://docs.panda3d.org/latest/python/programming/scene-graph/index), a tree rooted at `render`.

To use Ren'Py, you [download it and work in its launcher](https://www.renpy.org/doc/html/quickstart.html), which creates, edits, and runs your projects. Write the story in its script language, and reach for [its screen language and Python](https://www.renpy.org/why.html) when you need custom interfaces or game logic.

pyglet is a windowing and multimedia library [with no external dependencies](https://pyglet.readthedocs.io/en/latest/), for games and other visually rich apps. Attach handlers like `on_draw()` with `@window.event` and call `pyglet.app.run()`, since [writing your own event loop is generally not necessary](https://pyglet.readthedocs.io/en/latest/programming_guide/quickstart.html). Draw many sprites in [a `Batch`, which the docs strongly recommend](https://pyglet.readthedocs.io/en/latest/programming_guide/image.html).
