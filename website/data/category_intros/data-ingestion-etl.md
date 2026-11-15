AWS SDK for pandas reads and writes DataFrames on AWS services. To load APIs, databases, and files into a warehouse, pip install dlt as your Python ETL library.

How to choose:

- pandas DataFrames in and out of S3, Athena, Glue, or Redshift: AWS SDK for pandas
- APIs, databases, or files loaded into a warehouse, lake, or database: dlt
- Yahoo Finance prices and fundamentals, for personal or research use: yfinance
- Data from Chinese finance sites, for academic research: AKShare
- SEC filings and financial statements as Python objects: EdgarTools
- Many data providers, like FRED, the IMF, and Cboe, behind one interface: OpenBB

### AWS SDK for pandas

Pick AWS SDK for pandas when your data sits in AWS and your code works in pandas. It [connects DataFrames to AWS data and analytics services](https://aws-sdk-pandas.readthedocs.io/en/latest/about.html), from S3 and Athena to Glue, Redshift, and DynamoDB. You install and import it as `awswrangler`. Its main pattern is one call: `wr.s3.to_parquet()` with `dataset=True`, a database, and a table [writes the DataFrame to S3 as Parquet and registers it in the Glue Catalog](https://aws-sdk-pandas.readthedocs.io/en/latest/tutorials/005%20-%20Glue%20Catalog.html). Then `wr.athena.read_sql_query()` queries that table with SQL.

### dlt

Pick dlt to load data from REST APIs, SQL databases, cloud storage, or your own Python generators into a warehouse, lake, or database. [It's a library, not a platform](https://github.com/dlt-hub/dlt#why-dlt): you pip install it into your existing code. When a pipeline runs, dlt [infers the schema, unnests nested data into child tables](https://dlthub.com/docs/reference/explainers/how-dlt-works#normalize), and evolves it when new columns show up. [Build and test your pipeline locally with DuckDB](https://dlthub.com/docs/reference/explainers/how-dlt-works#other-notable-dlt-features), then switch the destination when you deploy.

### yfinance

Pick yfinance for Yahoo Finance data in personal or research work. It [isn't affiliated with Yahoo](https://ranaroussi.github.io/yfinance/) and is meant for research and education. Its docs say the Yahoo Finance API is for personal use only, and Yahoo's terms decide your rights to the data, so read them before you build anything commercial. `yf.Ticker("MSFT")` gets one symbol's prices, financials, and options, and `yf.download()` fetches price history for several tickers at once.

### AKShare

Pick AKShare for financial data from Chinese sites like East Money and Sina Finance. It [collects stocks, futures, options, funds, bonds, FX, and macro data](https://akshare.akfamily.xyz/introduction.html) from those public sources and exchange websites, and returns pandas DataFrames with Chinese column names. Its docs are in Chinese, and [its statement](https://github.com/akfamily/akshare/blob/main/README_EN.md#statement) says all its data is for academic research only. To find an interface, [search the offline registry by keyword](https://github.com/akfamily/akshare/blob/main/README_EN.md#search) with `ak.search()`.

### EdgarTools

Pick EdgarTools for SEC EDGAR filings as structured data: it [turns a filing into a typed Python object](https://github.com/dgunning/edgartools), from financial statements to insider trades and fund holdings. The SEC asks automated tools to [declare who they are and keep to its request rate](https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data). EdgarTools keeps to the rate for you, and you [identify yourself once with `set_identity()`](https://edgartools.readthedocs.io/en/latest/quickstart/), passing your name and email. Then `Company("AAPL").get_financials()` loads the annual financials from its 10-K, and `.income_statement()` returns the income statement.

### OpenBB

Pick OpenBB when you pull from several data providers and want one interface to all of them. You call it from Python, or [serve it as a REST API, MCP tools, and OpenBB Workspace widgets](https://docs.openbb.co/odp/python). Each data source comes as its own provider package. Import it with `from openbb import obb`, and a call returns an OBBject: [`to_dataframe()` turns it into a pandas DataFrame](https://docs.openbb.co/odp/python/quickstart/user#3-make-a-call). OpenBB's license covers its code, not the data: [each source's own terms](https://docs.openbb.co/odp/python/faqs/license) may restrict storage, redistribution, or commercial use, so check them before you pass the data on.
