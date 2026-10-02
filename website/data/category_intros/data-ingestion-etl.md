dlt loads data from APIs, databases, and files into your warehouse. You pip install the Python ETL library into your own code, with no platform to run.

How to choose:

- Data from APIs, databases, or files, loaded into a warehouse or DuckDB: dlt
- pandas DataFrames in and out of S3, Athena, Redshift, and other AWS services: awswrangler
- Stock prices, financials, and options from Yahoo Finance, for personal research: yfinance
- Chinese stocks, futures, and funds, for academic research: AKShare
- US company filings and financial statements from SEC EDGAR: EdgarTools
- Many data providers behind one Python API, also served over REST and MCP: OpenBB

dlt [loads data from messy sources into well-structured datasets](https://dlthub.com/docs/intro): it infers the schema and data types, normalizes the data, and handles nested structures. Start a project with [`dlt init rest_api duckdb`](https://dlthub.com/docs/tutorial/rest-api), which sets up a pipeline script with a REST API source and a DuckDB destination. Build and test on DuckDB, then [switch out the destination](https://dlthub.com/docs/reference/explainers/how-dlt-works) when you deploy. Beyond the built-in sources, any Python iterable can feed it, since [a resource is just a generator](https://github.com/dlt-hub/dlt). dlt [runs anywhere Python runs](https://dlthub.com/docs/walkthroughs/deploy-a-pipeline), so schedule it with the orchestrator you already have.

AWS SDK for pandas [extends pandas to AWS](https://aws-sdk-pandas.readthedocs.io/en/stable/about.html): import it as `awswrangler`, and it connects DataFrames to S3, Athena, Glue, Redshift, and DynamoDB. Its [quick start](https://github.com/aws/aws-sdk-pandas) stores a DataFrame on S3 as a Parquet dataset with `wr.s3.to_parquet()`, passing a database and table name. Then `wr.athena.read_sql_query()` queries that table with SQL.

yfinance offers [a Pythonic way to fetch financial and market data](https://github.com/ranaroussi/yfinance) from Yahoo Finance. Its [quick start](https://ranaroussi.github.io/yfinance/) uses `Ticker` for one symbol's prices, financial statements, and options, and `download` for prices across several symbols at once.

AKShare [aims to simplify fetching financial data](https://github.com/akfamily/akshare), with one function call per dataset, like `ak.stock_zh_a_hist()` for the daily history of a Chinese stock. Its README credits mostly Chinese exchanges and finance sites as its sources. Its [docs are in Chinese](https://akshare.akfamily.xyz/introduction.html), and each data interface comes with an example you can copy and paste.

EdgarTools [turns any SEC filing into a typed Python object](https://github.com/dgunning/edgartools), so a 10-K's revenue is one line instead of an afternoon of XBRL parsing. EDGAR requires an email with every request, so [set your identity](https://edgartools.readthedocs.io/en/latest/configuration/) with `set_identity()` before anything else. Everything starts with a `Company` or a `Filing`. `Company("AAPL").get_financials().income_statement()` returns a standardized income statement, and `.obj()` turns a filing into an object built for its form, with its data as pandas DataFrames.

OpenBB is a ["connect once, consume everywhere" layer](https://docs.openbb.co/odp) over financial data sources. [Each provider package](https://docs.openbb.co/odp/python) connects one source and adds its own namespace to the `obb` client. The same commands run from Python, as a REST API, and as MCP tools. A call returns an OBBject, and [`to_dataframe()`](https://docs.openbb.co/odp/python/quickstart/user) turns it into a pandas DataFrame.

Before you build on financial data, check whose terms you're under. yfinance [isn't affiliated with Yahoo](https://ranaroussi.github.io/yfinance/) and is meant for research and education, and Yahoo's API is for personal use only. AKShare's data is [for academic research](https://github.com/akfamily/akshare#statement) only. OpenBB [hosts no data itself](https://docs.openbb.co/odp/python/extensions/providers): each provider sets its own coverage and terms of use.
