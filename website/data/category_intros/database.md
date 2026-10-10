Inside your process, a Python database library runs without a server. DuckDB handles analytical SQL there; to search vectors, start with Chroma.

How to choose:

- Analytical SQL over Parquet, CSV, or DataFrames: DuckDB
- Vector search in a prototype or notebook: Chroma
- ClickHouse's SQL dialect, or pandas code that runs on ClickHouse: chDB
- Vectors stored with their raw images and text, on disk: LanceDB
- Vector search embedded in an app or an edge device: Zvec
- A small JSON document store for one script: TinyDB

Start DuckDB with `duckdb.sql()`, which runs on an [in-memory database kept inside the module](https://duckdb.org/docs/current/clients/python/overview#basic-api-usage). It queries Parquet, CSV, and JSON files by name, and [pandas DataFrames, Polars DataFrames, and Arrow tables](https://duckdb.org/docs/current/clients/python/overview#dataframes) by variable name, with no import step. When the data should stay, [pass a file name to `duckdb.connect()`](https://duckdb.org/docs/current/clients/python/overview#persistent-storage).

chDB runs ClickHouse inside your process, so you get its SQL dialect without a ClickHouse server. If you come from pandas, [start with the DataStore API](https://clickhouse.com/docs/chdb#for-pandas-users): change the import, and your pandas code works unchanged. For SQL, use the [connection-based API](https://clickhouse.com/docs/chdb/install/python#connection-based-api), and query DataFrames with the [`Python()` table engine](https://clickhouse.com/docs/chdb/install/python#python-table-engine-recommended).

Chroma's [in-memory client](https://docs.trychroma.com/docs/run-chroma/clients) is the quick way to try it in a notebook, and `PersistentClient` keeps the data on disk. Add text documents, and Chroma [embeds and indexes them for you](https://docs.trychroma.com/docs/overview/getting-started), so you can query with text too.

LanceDB starts as an [embedded library pointed at a local directory](https://docs.lancedb.com/quickstart). Its indexes live on disk, and a table [stores the raw data, metadata, and embeddings together](https://docs.lancedb.com/faq/faq-oss), which suits images and other multimodal data. Its [embedding function registry](https://docs.lancedb.com/embedding) generates vectors as you insert rows, and Python code can then query with text.

Zvec runs entirely in-process, with no server or daemon, and its docs pitch it [from prototypes to embedded apps and edge devices](https://zvec.org/en/docs/db/). Its [quickstart](https://zvec.org/en/docs/db/quickstart/) defines a schema of scalar and vector fields first, then combines vector search with filters on those scalar fields.

TinyDB is pure Python with no dependencies, and stores Python dicts in a JSON file: [open it with `TinyDB('db.json')` and search with `Query()`](https://tinydb.readthedocs.io/en/latest/getting-started.html). Its own docs say to [pick something else](https://tinydb.readthedocs.io/en/latest/intro.html#why-not-use-tinydb) when you need access from several processes or threads, indexes, or ACID guarantees.
