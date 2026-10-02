Charts for print come from Matplotlib, and interactive web ones from Plotly. Put either Python data visualization library in a Streamlit script for a dashboard.

How to choose:

- Publication figures you control down to the last detail: Matplotlib
- Interactive charts with little code: Plotly
- A dashboard or data app from a plain Python script: Streamlit
- Statistical charts straight from a pandas DataFrame: seaborn
- Charts you declare by mapping columns to x, y, and color: Vega-Altair
- Interactive browser plots with full control, or Python code behind them: Bokeh
- Diagrams of nodes and edges, drawn by Graphviz: graphviz
- Maps of large areas, in the projection you choose: Cartopy
- A knowledge graph of your codebase for your AI coding assistant: graphify
- Dashboards built from callbacks and custom layouts: Dash
- A demo UI for an ML model or any Python function: Gradio

Matplotlib [makes easy things easy and hard things possible](https://matplotlib.org/), and it's built for publication-quality plots. Start with `fig, ax = plt.subplots()` and draw on the `Axes` it returns. The docs [suggest this object-oriented style](https://matplotlib.org/stable/users/explain/quick_start.html#coding-styles) for complicated plots and for code you'll reuse. The pyplot style, like `plt.plot()`, is handy for quick interactive work.

Plotly draws interactive charts that show up in Jupyter or [run inside Dash apps](https://plotly.com/python/getting-started/). Start with Plotly Express, the [recommended starting point](https://plotly.com/python/plotly-express/) for most common figures. Every Plotly Express function returns a graph objects `Figure`, so you can still fine-tune it with `update_layout()` and `add_trace()`.

Streamlit turns a Python script into a web app: add a few `st.` calls, then run it with `streamlit run`. Whenever something on the screen must update, Streamlit [reruns your entire script from top to bottom](https://docs.streamlit.io/get-started/fundamentals/main-concepts#data-flow). So wrap slow work in a cached function: [`st.cache_data`](https://docs.streamlit.io/develop/concepts/architecture/caching) for data like a loaded DataFrame or a query result, and `st.cache_resource` for ML models and database connections.

seaborn builds on Matplotlib and [integrates closely with pandas](https://seaborn.pydata.org/tutorial/introduction.html): you name DataFrame columns, and it draws the statistical chart. Its docs [recommend figure-level functions](https://seaborn.pydata.org/tutorial/function_overview.html#relative-merits-of-figure-level-functions) like `displot()` for most plots.

Vega-Altair is declarative: you [declare links between data columns and encoding channels](https://altair-viz.github.io/getting_started/overview.html) like the x-axis, y-axis, and color, and it handles the rest.

Bokeh [creates JavaScript-powered visualizations without writing any JavaScript](https://docs.bokeh.org/en/latest/index.html). Build plots with `figure()` from `bokeh.plotting`, its primary interface. Add the Bokeh server when your plots need to [respond to browser events with Python code](https://docs.bokeh.org/en/latest/docs/user_guide/server/server_introduction.html), like widgets that rerun a query.

graphviz writes graphs in the DOT language, and [renders them with Graphviz](https://graphviz.readthedocs.io/en/latest/), which you install separately. Build a `Graph` or `Digraph`, add nodes and edges, then call [`render()`](https://graphviz.readthedocs.io/en/latest/manual.html) to save the DOT source and the rendered file.

Cartopy draws maps on Matplotlib, and its docs say it's [especially useful for large areas](https://cartopy.readthedocs.io/latest/), where flat-map assumptions break down at the poles and the dateline. [Give the axes a map projection](https://cartopy.readthedocs.io/latest/matplotlib/intro.html), like `plt.axes(projection=ccrs.PlateCarree())`, then add coastlines and your data. Your data's coordinate system is separate from that projection, so [always pass `transform=`](https://cartopy.readthedocs.io/latest/tutorials/understanding_transform.html) when you plot.

graphify maps your project into a knowledge graph that your AI coding assistant can [query instead of grepping](https://github.com/Graphify-Labs/graphify) through files. Code is parsed locally, with no LLM, and you can click through the graph in a browser.

Dash [ties UI elements like dropdowns, sliders, and graphs](https://github.com/plotly/dash) to your Python code, and draws charts with Plotly through `dcc.Graph`. You add interactivity with [callbacks](https://dash.plotly.com/basic-callbacks): functions Dash calls whenever an input changes, to update another component.

Gradio [builds a demo or web app](https://www.gradio.app/guides/quickstart) for an ML model, an API, or any Python function, with no JavaScript or CSS. Start with `gr.Interface`, which takes your function plus its inputs and outputs. Use `gr.ChatInterface` for a chatbot, and `gr.Blocks` when you need your own layout and data flow.

Pick the chart library and the way you share it separately. Plotly, Vega-Altair, and Bokeh all save interactive charts as standalone HTML files: [`write_html()`](https://plotly.com/python/interactive-html-export/), [`chart.save("chart.html")`](https://altair-viz.github.io/user_guide/saving_charts.html), and [`output_file()`](https://docs.bokeh.org/en/latest/docs/user_guide/intro.html). Streamlit has [chart elements](https://docs.streamlit.io/develop/api-reference/charts) for Matplotlib, Vega-Altair, Plotly, and Graphviz, and Gradio's [`gr.Plot`](https://www.gradio.app/docs/gradio/plot) takes Matplotlib, Plotly, Vega-Altair, and Bokeh figures.
