Exploring code is easier in IPython than in the default Python interactive interpreter. Jupyter Notebook mixes code with notes and plots.

How to choose:

- A better terminal prompt, with help on any object and magic commands: IPython
- Code, notes, and plots in one shareable document: Jupyter Notebook
- A reactive notebook saved as a Python file you can run as a script or app: marimo
- A terminal REPL with syntax highlighting, multiline editing, and Vi or Emacs keys: ptpython

IPython takes whatever you'd type at the standard Python prompt and adds [tab completion, object introspection, and system shell access](https://ipython.readthedocs.io/en/stable/overview.html). Its tutorial covers [the everyday commands](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html): `object?` shows an object's details, Tab after `object_name.` lists its attributes, and `!` runs a shell command. Magic commands start with `%`: `%timeit` times a statement, `%run` runs a script and loads its variables into your session, and `%debug` opens the debugger after an exception.

Start Jupyter Notebook with [`jupyter notebook`](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#starting-the-notebook-server), which runs a server on your machine and opens the app in your browser. Its docs suggest you [work on a problem in pieces](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#basic-workflow): put related ideas into cells, and move on once the earlier ones work. Python code runs in IPython, the default kernel. Notebooks are saved as `.ipynb` files, and nbconvert [turns them into HTML, PDF, or slides](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#notebook-documents).

marimo is [a reactive notebook](https://docs.marimo.io/): run a cell, and marimo runs the cells that depend on it, so code and outputs stay consistent. Each notebook is [stored as a plain Python file](https://docs.marimo.io/faq/#how-is-marimo-different-from-jupyter), so you can diff it in Git, run it as a script with `python`, or serve it as an app with `marimo run`. That model comes with two rules. [Each global variable is defined in only one cell](https://docs.marimo.io/guides/reactivity/#global-variable-names-must-be-unique), so prefix a scratch variable with `_` to keep it local to its cell. And since marimo doesn't track mutations, [mutate an object only in the cell that creates it](https://docs.marimo.io/guides/best_practices/). Unlike a Jupyter notebook, a marimo file [doesn't store outputs like plots](https://docs.marimo.io/guides/coming_from/jupyter/), and IPython magic commands and `!` shell commands don't work in it.

ptpython is [a better Python REPL](https://github.com/prompt-toolkit/ptpython) for the terminal, built on prompt_toolkit. It adds syntax highlighting, multiline editing where the up arrow works, autocompletion, Vi or Emacs key bindings, and a configuration menu. Run `ptpython` to start it, or `ptipython` to add IPython's magic functions and shell integration.

Both terminal REPLs can also open inside your program, with that scope's variables at hand: call [`IPython.embed()`](https://ipython.readthedocs.io/en/stable/interactive/reference.html#embedding-ipython), or ptpython's [`embed(globals(), locals())`](https://github.com/prompt-toolkit/ptpython#embedding-the-repl). For more Jupyter tools, see [awesome-jupyter](https://github.com/markusschanta/awesome-jupyter).
