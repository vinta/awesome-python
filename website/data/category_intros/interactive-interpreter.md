In a terminal, IPython is the Python interactive interpreter with magic commands. Notebooks go in Jupyter Notebook, or marimo for cells that rerun themselves.

How to choose:

- A terminal prompt with magic commands and shell access: IPython
- A browser notebook, in Python or another language: Jupyter Notebook
- A notebook that reruns dependent cells and saves as a .py file: marimo
- A notebook you also serve as a web app: marimo
- A REPL you set up through a menu instead of magic commands: ptpython

### IPython

Pick IPython for a terminal prompt built for exploring code. Besides Python, it takes its own commands. `object?` [prints details about any object](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html#the-four-most-helpful-commands), [magic commands](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html#magic-functions) like `%run` start with `%`, and `!` [runs a line in your system shell](https://ipython.readthedocs.io/en/stable/interactive/tutorial.html#system-shell-commands). IPython is also [the Jupyter kernel](https://ipython.readthedocs.io/en/stable/) that runs Python in notebooks, with the same main features as the shell. Run `ipython` and type `?` for an overview.

### Jupyter Notebook

Pick Jupyter Notebook for a browser notebook that holds code, text, and charts in one document. Stay on it when you need [kernels for other languages](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#installing-kernels). It offers [a lightweight, simplified experience compared to JupyterLab](https://jupyter-notebook.readthedocs.io/en/stable/), and since it's based on JupyterLab, it [supports many JupyterLab extensions](https://jupyter-notebook.readthedocs.io/en/stable/notebook_7_features.html#support-for-many-jupyterlab-extensions). Run `jupyter notebook` from [the top-level directory that holds your notebooks](https://docs.jupyter.org/en/latest/running.html). Each notebook is saved as an `.ipynb` file, JSON that keeps [the inputs and outputs](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html#notebook-documents) of your session.

### marimo

Pick marimo when a notebook's outputs should stay consistent with its code. Run a cell, and marimo [automatically runs every cell that references the variables it defines](https://docs.marimo.io/guides/reactivity/#how-marimo-runs-cells). It stores each notebook [as Python, not JSON](https://docs.marimo.io/guides/coming_from/jupyter/#marimos-file-format), so you can version it with git and run it as a script, but outputs like plots aren't saved in the file. Open a notebook with `marimo edit`, and [serve it as an app](https://docs.marimo.io/getting_started/quickstart/#deploy-as-apps) with `marimo run`, which hides the code. Stay on Jupyter Notebook if you rely on IPython magic commands or `!` lines, since [marimo notebooks are just Python](https://docs.marimo.io/guides/coming_from/jupyter/#magic-commands). The same goes if you want to run cells in your own order: marimo [allows each variable in only one cell](https://docs.marimo.io/guides/coming_from/jupyter/#redefining-variables), so it can work out the order itself.

### ptpython

Pick ptpython if you'd rather set up your prompt through a configuration menu than type IPython's magic commands. It's [an advanced Python REPL](https://github.com/prompt-toolkit/ptpython). Start it by typing `ptpython`. For IPython's magic functions with ptpython's interface, run [`ptipython`](https://github.com/prompt-toolkit/ptpython#ipython-support).

### More Jupyter resources

For more Jupyter projects, see [awesome-jupyter](https://github.com/markusschanta/awesome-jupyter).
