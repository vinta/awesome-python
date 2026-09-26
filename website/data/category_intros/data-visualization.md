Pick your Python data visualization library by where the chart goes. Papers take Matplotlib figures, web pages take plotly charts, and data apps use Streamlit.

How to choose:

- Figures for papers and reports: Matplotlib
- Interactive charts on a web page: plotly
- Data dashboards and apps: Streamlit
- Statistical charts from a dataframe: seaborn
- Charts declared from dataframe columns: Vega-Altair
- Interactive plots that call back into Python: Bokeh
- Maps in any projection: Cartopy
- Graph diagrams laid out by Graphviz: PyGraphviz
- Knowledge graph of a codebase: graphify
- Demos for machine learning models: Gradio

Matplotlib has two interfaces. For complicated plots and code you reuse, its docs [suggest the explicit, object-oriented one](https://matplotlib.org/stable/users/explain/quick_start.html#the-explicit-and-the-implicit-interfaces): create the figure with `fig, ax = plt.subplots()`, then call methods on `ax`. The implicit pyplot style is fine for quick interactive work. When you make the same plot for many datasets, write a function that takes the `ax` to draw on.

plotly draws interactive charts in the browser with plotly.js. Start with [Plotly Express](https://plotly.com/python/plotly-express/), which its docs call the recommended starting point for most common figures: pass a DataFrame and column names, and one call builds the figure. Drop to `go.Figure` for figures Plotly Express can't make or makes awkward, like [subplots of different types or dual-axis plots](https://plotly.com/python/graph-objects/#When-to-use-Graph-Objects-vs-Plotly-Express). To share a chart, [`write_html`](https://plotly.com/python/interactive-html-export/) saves it as an HTML file that stays interactive in any browser.

seaborn builds statistical graphics on Matplotlib and works on whole datasets. Its docs [recommend the figure-level functions](https://seaborn.pydata.org/tutorial/function_overview.html#relative-merits-of-figure-level-functions), like `relplot()`, for most plots. For one figure that combines different kinds of plots, set it up in Matplotlib and fill it in with axes-level functions. Keep your data in [long form](https://seaborn.pydata.org/tutorial/data_structure.html), one column per variable and one row per observation, as most of seaborn's examples do.

Vega-Altair is declarative: you [link data columns to encoding channels](https://altair-viz.github.io/getting_started/overview.html) like the x-axis, y-axis, and color, and it handles the rest on top of Vega-Lite. Its docs say the API is [more limited than Matplotlib's or Bokeh's](https://altair-viz.github.io/getting_started/project_philosophy.html), a trade they make to keep exploring data simple. A chart carries its data inside the spec, so for a large dataset, [enable the VegaFusion data transformer](https://altair-viz.github.io/user_guide/large_datasets.html#vegafusion-data-transformer) or pass the data by URL.

Bokeh builds interactive plots for the browser without any JavaScript from you. Start with [`bokeh.plotting`, its primary interface](https://docs.bokeh.org/en/latest/docs/user_guide/intro.html#the-bokeh-plotting-interface), and `output_file()` for a standalone HTML file or `output_notebook()` for Jupyter. What sets it apart is the [Bokeh server](https://docs.bokeh.org/en/latest/docs/user_guide/server/server_introduction.html), which keeps data in sync between Python and the browser. Widgets can then run Python callbacks, and plots can stream data. Write the app as a script and [serve it with `bokeh serve`](https://docs.bokeh.org/en/latest/docs/user_guide/server/app.html#building-applications).

Cartopy draws maps on Matplotlib and [suits data over large areas](https://cartopy.readthedocs.io/stable/), where Cartesian math breaks down at the poles and the dateline. Set the map's projection on the axes, and [always pass `transform`](https://cartopy.readthedocs.io/stable/tutorials/understanding_transform.html) to say which coordinate system your data is in.

PyGraphviz is a Python interface to Graphviz. Build a graph with `AGraph` or read a DOT file into one, then [lay it out and draw it](https://pygraphviz.github.io/documentation/stable/tutorial.html#layout-and-drawing) with one of Graphviz's layout programs.

graphify maps a project's code, docs, PDFs, and images into a [knowledge graph your coding agent can query](https://github.com/Graphify-Labs/graphify). It draws the graph as a `graph.html` you can click through in a browser. It parses code locally, so code never leaves your machine; docs and media go through your agent's model. Install the `graphifyy` package, run `graphify install`, then type `/graphify .` in your agent.

Streamlit turns a Python script into a data app, and [reruns the whole script from top to bottom](https://docs.streamlit.io/get-started/fundamentals/main-concepts) every time something on screen changes. Start it with `streamlit run`. To skip repeated work on those reruns, [cache](https://docs.streamlit.io/get-started/fundamentals/advanced-concepts) data with `st.cache_data`, and shared resources like ML models or database connections with `st.cache_resource`. Keep per-user values in Session State.

Gradio wraps a Python function, often a machine learning model, in a web UI. [Use `gr.Interface`](https://gradio.app/guides/quickstart) for a demo with inputs and outputs, `gr.ChatInterface` for a chatbot, and `gr.Blocks` for custom layouts and data flows. `launch(share=True)` gives you a public link, and [Hugging Face Spaces](https://gradio.app/guides/sharing-your-app#hosting-on-hf-spaces) hosts the app for good. Anyone with the link can call your function, so [put a login in front of it](https://gradio.app/guides/sharing-your-app#password-protected-app) or keep sensitive data out. Its security docs also recommend that you [set `max_file_size` and keep `allowed_paths` as small as possible](https://gradio.app/guides/file-access#best-practices).

seaborn and Cartopy draw on Matplotlib Axes, so to [customize what they draw](https://matplotlib.org/stable/users/explain/figure/api_interfaces.html), use Matplotlib's explicit Axes interface. Streamlit shows [Matplotlib, plotly, and Vega-Altair figures](https://docs.streamlit.io/develop/api-reference/charts), and Gradio's [`gr.Plot`](https://gradio.app/docs/gradio/plot) takes those plus Bokeh, so your plotting code carries over into an app.
