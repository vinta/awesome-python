Start with pandas, the Python data analysis library for exploring tables in memory. Move large-file pipelines to Polars, and let Ibis query your SQL database.

How to choose:

- Exploring and cleaning tables that fit in memory: pandas
- Data headed for statistics, plotting, or machine learning libraries: pandas
- A repeatable pipeline over large files, even ones larger than memory: Polars
- Data that stays in a SQL database or warehouse: Ibis
- The same code run locally, then on a production engine: Ibis

### pandas

Pick pandas to explore and clean tables that fit in memory, and when the next step is a statistics, plotting, or machine learning library. Its docs call it [the right tool for tabular data](https://pandas.pydata.org/docs/getting_started/index.html), like spreadsheets and database tables. It's also [built to integrate well with many third-party libraries](https://pandas.pydata.org/docs/getting_started/overview.html) in scientific Python. Load data with a `read_*` function, like `read_csv()`, and work on whole columns, since [operations are element-wise, with no need to loop over rows](https://pandas.pydata.org/docs/getting_started/intro_tutorials/05_add_columns.html). pandas keeps everything in memory. Its docs say [datasets that are a sizable fraction of memory become unwieldy](https://pandas.pydata.org/docs/user_guide/scale.html), so take those to Polars.

### Polars

Pick Polars for repeatable pipelines over large files, and for data that outgrows pandas on one machine. Its Rust engine [uses all your cores, optimizes each query, and handles datasets much larger than your RAM](https://docs.pola.rs/). [Prefer the lazy API](https://docs.pola.rs/user-guide/concepts/lazy-api/) unless you're exploring and don't yet know what the query will look like. Start from a file with a `scan_*` function like `pl.scan_csv()`, so [the optimizer may read less of the file](https://docs.pola.rs/user-guide/lazy/using/). Then write expressions inside contexts like `filter()`, `with_columns()`, and `group_by()`, and call `.collect()` at the end.

### Ibis

Pick Ibis when your data lives in a SQL database or warehouse, or when the same analysis should run on your laptop and then on a production engine. Ibis [compiles one dataframe API into each backend's native language](https://ibis-project.org/why), so the engine itself does the work. Local data runs on DuckDB by default. Its syntax borrows from pandas, but [its primary domain is SQL](https://ibis-project.org/tutorials/coming-from/pandas): rows have no guaranteed order, and nothing runs until you call a method like `to_pandas()`. Connect with `ibis.connect()`: [going from local to remote takes changing that single line](https://ibis-project.org/).
