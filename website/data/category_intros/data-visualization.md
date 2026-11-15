Matplotlib is the Python data visualization library for figures you publish or print, and Plotly for interactive charts. Streamlit turns a script into a dashboard.

How to choose:

- Figures for papers and print, with control over every detail: Matplotlib
- Interactive charts with hover and zoom, in notebooks or web pages: Plotly
- A dashboard or data app built from a Python script: Streamlit
- Statistical plots from a pandas DataFrame in a few lines: seaborn
- Charts declared as data columns mapped to x, y, and color: Vega-Altair
- Browser plots with low-level control, or live data on its own server: Bokeh
- Graphs of nodes and edges, rendered by Graphviz: graphviz
- Maps of large areas, in the projection you choose: Cartopy
- A clickable knowledge graph of your codebase, for your coding agent: Graphify
- A larger analytical app with explicit callbacks, built around Plotly charts: Dash
- A web demo for an ML model or any Python function: Gradio

### Matplotlib

Pick Matplotlib for figures that go into papers and print, or whenever you need control over every detail of a plot. It's [a comprehensive library for creating static, animated, and interactive visualizations](https://matplotlib.org/), and seaborn and Cartopy both draw on top of it. Its docs suggest [the explicit, object-oriented style](https://matplotlib.org/stable/users/explain/quick_start.html#the-explicit-and-the-implicit-interfaces) for complicated plots and for code you reuse. Create the figure with `fig, ax = plt.subplots()`, then call methods like `ax.plot()` on the Axes. The `pyplot` style is fine for quick interactive work.

### Plotly

Pick Plotly for interactive charts with hover tooltips and zoom. It draws [web-based charts that show up in Jupyter notebooks, save as standalone HTML files, or run inside a Dash app](https://plotly.com/python/getting-started/). Start with Plotly Express, which its docs call [the recommended starting point for most common figures](https://plotly.com/python/plotly-express/): one function call per chart, like `px.scatter()`. For figures that are cumbersome in Plotly Express, like [subplots of different types or dual-axis plots](https://plotly.com/python/graph-objects/), build from an empty `graph_objects.Figure` and add traces to it.

### seaborn

Pick seaborn for statistical plots from a pandas DataFrame in a few lines of code. It [builds on Matplotlib and integrates closely with pandas](https://seaborn.pydata.org/tutorial/introduction.html), and its dataset-oriented API lets you focus on what each part of the plot means rather than how to draw it. Full customization still takes some Matplotlib knowledge. Its docs [recommend the figure-level functions](https://seaborn.pydata.org/tutorial/function_overview.html), like `relplot()` and `displot()`, for most plots.

### Vega-Altair

Pick Vega-Altair for the grammar-of-graphics approach. You [declare links between data columns and visual encoding channels](https://altair-viz.github.io/getting_started/overview.html), like the x-axis, y-axis, and color, and Vega-Altair handles the rest of the plot: `alt.Chart(df).mark_point().encode(x=..., y=..., color=...)`. Its docs call the declarative API [deliberately limited compared to the full programmatic APIs](https://altair-viz.github.io/getting_started/project_philosophy.html) of Matplotlib and Bokeh, so reach for one of those when you need that control.

### Bokeh

Pick Bokeh for interactive plots in the browser when you want low-level control over how they behave, or live data pushed from Python. [Start with `bokeh.plotting`](https://bokeh.org/) for a first chart, and move to layouts, widgets, and Bokeh models as you build a custom app. A plot saves as a standalone HTML file or embeds in a page, with no Python server. Add the Bokeh server only when the browser needs to [stay in sync with your Python code](https://docs.bokeh.org/en/latest/docs/user_guide/server/server_introduction.html).

### graphviz

Pick graphviz to draw graphs of nodes and edges from Python. It's [a simple pure-Python interface](https://graphviz.readthedocs.io/en/stable/manual.html) to the Graphviz software: it writes the graph in the DOT language, and [Graphviz, installed on its own, renders it](https://graphviz.readthedocs.io/en/stable/). Create a `Graph` or `Digraph`, add nodes and edges with `node()` and `edge()`, then call `render()` to save the DOT source and the rendered file.

### Cartopy

Pick Cartopy for maps, especially of large areas, where [Cartesian assumptions break down](https://cartopy.readthedocs.io/stable/). It builds on Matplotlib to make publication quality maps. The core idea is that [your axes' projection is independent of your data's coordinate system](https://cartopy.readthedocs.io/stable/tutorials/understanding_transform.html). Pass `projection=` when you create the axes, and `transform=` to each plotting call to say what coordinates your data uses.

### Graphify

Graphify is a skill for your coding agent. It [maps your project, from code and docs to PDFs, images, and videos, into a knowledge graph](https://github.com/Graphify-Labs/graphify) you can query instead of grepping through files. Its output includes `graph.html`, which opens in any browser so you can click nodes, filter, and search.

### Streamlit

Pick Streamlit for the fastest path from a Python script to a dashboard or data app. Apps are [plain Python, with no frontend or API layer](https://docs.streamlit.io/), and `streamlit run app.py` starts one. Streamlit [reruns your whole script from top to bottom](https://docs.streamlit.io/get-started/fundamentals/main-concepts) whenever a user changes a widget. So you write the app as a script that reads each widget's current value into a variable.

### Dash

Pick Dash when a dashboard grows into a larger analytical app built around Plotly charts, and you want explicit control over what each input updates. Dash [ties dropdowns, sliders, and graphs to your Python code](https://github.com/plotly/dash). Lay out the page from components, then [write callbacks](https://dash.plotly.com/basic-callbacks): functions Dash calls whenever an input component's property changes, to update a property of an output component.

### Gradio

Pick Gradio to put a web demo in front of an ML model or any Python function, where inputs go in and outputs come out. [`gr.Interface` builds the demo](https://gradio.app/guides/quickstart) around your function, from the components you pick for its arguments and return values. Switch to `gr.Blocks` for custom layouts and data flows, or `gr.ChatInterface` for a chatbot.

### Charts inside apps

Streamlit and Gradio don't tie you to one plotting library. Streamlit [shows charts from Vega-Altair, Plotly, and Matplotlib](https://docs.streamlit.io/develop/api-reference/charts), plus Graphviz diagrams. Gradio's [`Plot` component](https://gradio.app/docs/gradio/plot) takes a Matplotlib, Plotly, Vega-Altair, or Bokeh figure.
