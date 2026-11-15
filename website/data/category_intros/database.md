Every Python database library here runs inside your process: DuckDB for SQL analytics, LanceDB for vector search, and TinyDB for a small JSON file of documents.

How to choose:

- SQL analytics on files and DataFrames: DuckDB
- Vector search over tables on local disk or in object storage: LanceDB
- A few Python dicts saved to one JSON file by one process: TinyDB
- ClickHouse's SQL dialect, or queries against your ClickHouse servers: chDB
- A vector search prototype that embeds your text for you: Chroma
- Vector search added to an existing app or search system: Zvec

### DuckDB

Pick DuckDB for SQL analytics in your Python process, unless you want ClickHouse's SQL, which chDB brings. It's [designed for analytical query workloads](https://duckdb.org/why_duckdb). Start with [`duckdb.sql()`](https://duckdb.org/docs/stable/clients/python/overview), which runs a query on an in-memory database. It reads Parquet, CSV, and JSON files named in a `FROM` clause, queries pandas and Polars DataFrames and Arrow tables, and hands results back with `.df()` or `.pl()`. To keep your data, `duckdb.connect("file.db")` opens a persistent database file.

### chDB

Pick chDB when you want ClickHouse's SQL dialect and functions, or already run ClickHouse servers. It gives you [the power of ClickHouse without needing to connect to a ClickHouse server](https://clickhouse.com/docs/chdb). It reads Parquet, CSV, JSON, Arrow, ORC, and many more formats, and works with pandas and Arrow. Its docs recommend [the connection-based API](https://clickhouse.com/docs/chdb/install/python): open `chdb.connect(":memory:")` or a file path, then run queries on a cursor. The same SQL reaches a ClickHouse server through [the `remoteSecure` function](https://clickhouse.com/docs/chdb/guides/query-remote-clickhouse).

### LanceDB

Pick LanceDB for vector search inside a local retrieval app or a single-node data pipeline, and for multimodal data. It's [an embedded retrieval library](https://docs.lancedb.com/oss/v0-41-0/basics/lancedb-embedded) that reads and writes tables on local disk or in object storage, with no server to deploy. It runs [vector, full-text, and hybrid search](https://docs.lancedb.com/oss/v0-41-0/search). `lancedb.connect("ex_lancedb")` [creates a directory for your tables](https://docs.lancedb.com/oss/v0-41-0/quickstart), and an `s3://`, `gs://`, or `az://` URI in its place keeps them in cloud storage.

### Chroma

Pick Chroma for a quick vector search prototype, since it embeds your documents for you. [Chroma will store your text and handle embedding and indexing](https://docs.trychroma.com/docs/overview/getting-started) with nothing to configure: create a collection on `chromadb.Client()`, `add()` documents with IDs, and `query()` with plain text. To keep data between runs, switch to [`PersistentClient`](https://docs.trychroma.com/docs/run-chroma/clients). Its docs call this embedded mode [a library for prototyping and experimentation](https://docs.trychroma.com/reference/architecture/overview). Pass on it for a collection bigger than your RAM, since [available memory caps a Chroma collection's size](https://docs.trychroma.com/guides/performance/single-node).

### Zvec

Pick Zvec to add vector search to an app or a search system you already run, such as a SQL database. It's [a vector database that runs entirely in-process](https://zvec.org/en/docs/db/), and it works as a standalone database too. It stores dense and sparse vectors and combines similarity with structured filters. Start from [a schema with fields for scalar data and vectors](https://zvec.org/en/docs/db/quickstart/), open a collection at a path with `zvec.create_and_open()`, and insert `zvec.Doc` records.

### TinyDB

Pick TinyDB to store a few Python dicts in a JSON file from a script or a small tool. It's [pure Python, with no server and no dependencies](https://tinydb.readthedocs.io/en/latest/intro.html). Its docs rule it out when you need access from several processes or threads, indexes, or ACID guarantees, or when performance matters. `TinyDB('db.json')` [stores its data in db.json](https://tinydb.readthedocs.io/en/latest/getting-started.html). `insert()` takes dicts, and `search()` takes a `Query`, like `Fruit.type == 'peach'`.
