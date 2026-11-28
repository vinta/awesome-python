NumPy arrays are the base of Python scientific computing, and SciPy runs the algorithms on them. When a loop won't vectorize, compile it with Numba.

How to choose:

- Arrays and math on whole arrays: NumPy
- Optimization, integration, interpolation, and other algorithms: SciPy
- Numeric loops that won't vectorize: Numba
- Exact, symbolic math: SymPy
- Estimating and testing statistical models: statsmodels, or pgmpy for causal graphs
- Molecules: RDKit, or Biopython for biological sequences
- Physical units: Pint, or Astropy and ObsPy for astronomy and seismology
- Bayesian models with priors and posteriors: PyMC
- Processes queuing for shared resources: SimPy, or Mesa for agent-based models
- Graphs and networks: NetworkX
- Points, lines, and polygons in a plane: Shapely
- Colour science conversions: Colour
- Animated math videos: Manim

### NumPy

Start with NumPy: much of the scientific Python software [takes and returns NumPy arrays](https://numpy.org/doc/stable/user/whatisnumpy.html), so you need them even when another library does the work. Write math on whole arrays instead of Python loops. NumPy calls this [vectorization](https://numpy.org/doc/stable/user/whatisnumpy.html#why-is-numpy-fast), and the looping runs in pre-compiled C code behind the scenes.

### SciPy

Add SciPy for the algorithms you run on those arrays: it covers [optimization, integration, interpolation, eigenvalue problems, differential equations, and statistics](https://scipy.org/), plus data structures like sparse matrices. Its algorithms live in subpackages such as `optimize`, `integrate`, and `stats`, and its docs say to [import through those namespaces](https://docs.scipy.org/doc/scipy/reference/index.html#guidelines-for-importing-functions-from-scipy), like `from scipy import optimize`, then `optimize.curve_fit()`.

### Numba

Reach for Numba when a numeric loop won't vectorize, like a step that depends on the one before it. Numba is [designed to be used with NumPy arrays and functions](https://numba.pydata.org/). Its docs say it's [perfectly happy with loops](https://numba.readthedocs.io/en/stable/user/performance-tips.html#loops), so write the loop the plain way, as you would in C. Decorate the function with `@njit`, which compiles it in [nopython mode, the recommended way to use Numba](https://numba.readthedocs.io/en/stable/user/5minguide.html#what-is-object-mode).

### SymPy

Use SymPy for symbolic math, where [expressions are represented exactly](https://docs.sympy.org/latest/tutorials/intro-tutorial/intro.html), not approximately, and variables stay as symbols. Most computer algebra systems invent their own language, while SymPy is [written entirely in Python](https://www.sympy.org/en/index.html) and embeds in your own code as a library. It [isn't designed to work with NumPy arrays](https://docs.sympy.org/latest/explanation/best-practices.html#separate-symbolic-and-numeric-code), so its docs suggest two steps. Define symbols with `symbols()` and model the problem symbolically, then turn the result into a numeric function with `lambdify()` that runs on NumPy arrays.

### statsmodels

Pick statsmodels to estimate a statistical model and test it, not only to predict with it. Its FAQ says it [focuses more on the statistics and diagnostics underlying the models](https://www.statsmodels.org/stable/faq.html#what-is-statsmodels) than on cutting-edge predictive models, and its results are tested against existing statistical packages. Fitting typically takes [three steps](https://www.statsmodels.org/stable/gettingstarted.html): describe the model, fit it, and read the results with `summary()`. Write the model as [an R-style formula on a pandas DataFrame](https://www.statsmodels.org/stable/index.html#introduction) through `statsmodels.formula.api`.

### pgmpy

Pick pgmpy when your question is about cause and effect between variables, modeled as a graph. It covers [the full workflow](https://pgmpy.org/), from learning causal graphs from data to estimating causal effects, running probabilistic inference, and simulating data from fitted models. Its docs start with [learning the graph](https://pgmpy.org/documentation.html), then estimating its conditional probability distributions from data.

### RDKit

Pick RDKit for cheminformatics: it's [a C++ toolkit with Python wrappers](https://www.rdkit.org/docs/Overview.html), covering 2D and 3D molecular operations and descriptor generation for machine learning. Most of what you need is [in `rdkit.Chem`](https://www.rdkit.org/docs/GettingStartedInPython.html): build one molecule with a function like `Chem.MolFromSmiles()`, and read a file of them through a Supplier, like `SDMolSupplier`.

### Biopython

Pick Biopython for computational molecular biology, starting with [parsing bioinformatics files](https://biopython.org/docs/latest/Tutorial/chapter_introduction.html) like FASTA, GenBank, and BLAST output into Python objects. Read sequences with [`Bio.SeqIO.parse()`](https://biopython.org/docs/latest/Tutorial/chapter_seqio.html#parsing-or-reading-sequences), which gives you `SeqRecord` objects one at a time, or with `Bio.SeqIO.read()` when the file holds exactly one record.

### Pint

Pick Pint to carry physical units through your calculations. A quantity is [a number times a unit](https://pint.readthedocs.io/en/stable/getting/overview.html), and arithmetic and unit conversions work on it, as do many NumPy operations. Start by [creating a `UnitRegistry`](https://pint.readthedocs.io/en/stable/getting/tutorial.html), multiply a number by one of its units, as in `42 * ureg.kilometers`, and convert the result with `.to()`.

### Astropy

Pick Astropy for astronomy and astrophysics: it holds [the key functionality and common tools](https://docs.astropy.org/en/stable/) for that work. Most of it lives in subpackages, so [import the one you need](https://docs.astropy.org/en/stable/importing_astropy.html), like `from astropy import units as u`. Then [multiply a value by one of its units](https://docs.astropy.org/en/stable/units/index.html) to get a `Quantity`.

### ObsPy

Pick ObsPy for seismology: it gives you [parsers for common file formats, clients for data centers, and signal processing](https://docs.obspy.org/) for seismic time series. [Load seismograms with `read()`](https://docs.obspy.org/tutorial/code_snippets/reading_seismograms.html), which takes formats like SAC and MiniSEED and returns a `Stream` of `Trace` objects, each holding its samples in a NumPy array.

### PyMC

Pick PyMC to build a Bayesian model and fit it with [algorithms like Markov chain Monte Carlo](https://www.pymc.io/). You write the model [in Python code, not a domain-specific language](https://www.pymc.io/projects/docs/en/stable/learn/core_notebooks/pymc_overview.html), declaring priors and the likelihood inside a `with pm.Model()` block. Then `pm.sample()` draws from the posterior. PyMC integrates with ArviZ, which plots and diagnoses the results.

### SimPy

Pick SimPy when processes wait on limited shared resources, like customers at checkout counters. It's [a process-based discrete-event simulation framework](https://simpy.readthedocs.io/en/stable/), and its docs call it overkill for fixed-step simulations whose processes don't interact with each other or with shared resources. Each process is [a Python generator that yields events](https://simpy.readthedocs.io/en/stable/simpy_intro/basic_concepts.html) to wait for them, and all processes live in one environment.

### Mesa

Pick Mesa for agent-based models, where many agents act and interact in a space. It gives you [built-in components like spatial grids](https://mesa.readthedocs.io/stable/) and a browser-based interface to visualize the model, and you analyze the results with Python's data analysis tools. Most models are [one `Model` class and one or more `Agent` classes](https://mesa.readthedocs.io/stable/overview.html), and each agent's `step()` method says what it does when activated.

### NetworkX

Pick NetworkX to build and analyze graphs: it's for [the creation, manipulation, and study of complex networks](https://networkx.org/documentation/stable/), like social, biological, and infrastructure networks. Create one with `nx.Graph()` and add nodes and edges, where [any hashable object can be a node](https://networkx.org/documentation/stable/reference/introduction.html), like a string or a tuple.

### Shapely

Pick Shapely to analyze points, lines, and polygons in a plane. It [wraps the GEOS geometry library](https://shapely.readthedocs.io/en/stable/), with a Geometry interface for single geometries and NumPy ufuncs that run one operation over a whole array of them. Every operation [presumes your features share one Cartesian plane](https://shapely.readthedocs.io/en/stable/manual.html#coordinate-systems).

### Colour

Pick Colour for colour science: it's [a comprehensive set of algorithms and datasets](https://www.colour-science.org/) for the field. Most objects sit in the `colour` namespace, and [`colour.convert()`](https://colour.readthedocs.io/en/latest/) finds the conversion path between two representations for you, such as from a spectral distribution to sRGB.

### Manim

Pick Manim to animate math in code. This Community Edition is [a fork of Grant Sanderson's original Manim](https://docs.manim.community/en/latest/). Its docs [recommend it especially for beginners](https://docs.manim.community/en/latest/faq/installation.html#which-version-should-i-use), since it's more stable, better tested, and documented. Write each animation in [the `construct()` method of a `Scene` subclass](https://docs.manim.community/en/latest/tutorials/quickstart.html), then render it with the `manim` command.

### More scientific Python libraries

For more scientific Python libraries and resources, see [Python-for-Scientists](https://github.com/TomNicholas/Python-for-Scientists).
