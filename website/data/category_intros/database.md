No server to run: a Python database library can live inside your process. Pick DuckDB when you run analytical SQL, LanceDB when you search vectors.

How to choose:

- Analytical SQL over DataFrames and Parquet files: DuckDB
- Vector search with the raw data stored beside its embeddings: LanceDB
- ClickHouse SQL in a notebook, the same queries your ClickHouse server runs: chDB
- A RAG prototype that embeds your text for you: Chroma
- Vector search, full-text search, and filters in one query: Zvec
- Tables whose columns run AI models on every insert: Pixeltable
- Python dicts in a JSON file, for a small app with one process: TinyDB

DuckDB is built for [analytical queries](https://duckdb.org/why_duckdb), and it runs inside your Python process with no database server to install. `duckdb.sql()` runs on an in-memory database, while [`duckdb.connect()` with a file name](https://duckdb.org/docs/current/clients/python/overview#persistent-storage) keeps your tables on disk. It [queries pandas and Polars DataFrames and Arrow tables directly](https://duckdb.org/docs/current/clients/python/overview#dataframes), and Parquet files by their file name. In a package others import, [create your own connection objects](https://duckdb.org/docs/current/clients/python/overview#connection-object-and-module) instead of calling the module's functions, which share one global database.

chDB is an [in-process SQL engine powered by ClickHouse](https://clickhouse.com/docs/chdb), for ClickHouse SQL without a ClickHouse server. It speaks [the full ClickHouse SQL dialect](https://clickhouse.com/resources/engineering/what-is-chdb), so a query you write in a notebook runs unchanged on a ClickHouse server later. `chdb.query()` is stateless. For tables that last across queries, open a `Session`, and [give it a directory name](https://clickhouse.com/docs/chdb/getting-started#creating-a-table-from-json-file) to keep them on disk.

Chroma's embedded mode is for [prototyping and experimentation](https://docs.trychroma.com/reference/architecture/overview). It gets a RAG prototype running fast, since it [embeds and indexes your documents for you](https://docs.trychroma.com/docs/overview/getting-started) with a default model that runs on your machine. Save data to a directory with [`PersistentClient`](https://docs.trychroma.com/docs/run-chroma/clients#persistent-client). For production, its docs [prefer a Chroma server](https://docs.trychroma.com/reference/python/client#persistentclient) that your app connects to as a client.

LanceDB is an [embedded retrieval library](https://docs.lancedb.com/) that runs in your process: [point it at a local directory](https://docs.lancedb.com/quickstart#connect-via-local-directory-path), or at an object storage URI like `s3://`. It [stores the raw data, metadata, and embeddings together](https://docs.lancedb.com/faq/faq-oss#what-makes-lancedb-different), and its indexes live on disk.

Zvec is a vector database that [runs entirely in-process](https://zvec.org/en/docs/db/), from notebooks and servers to edge devices. [Define a schema](https://zvec.org/en/docs/db/quickstart/) with scalar fields and vectors, then create a collection from it. One query can [combine vector similarity, full-text search, and filters](https://github.com/alibaba/zvec#user-content--features).

Pixeltable is more than a vector store: it's [the database, orchestration, and serving](https://docs.pixeltable.com/overview/pixeltable) in one Python file. [Model inference can go in a computed column](https://docs.pixeltable.com/tutorials/computed-columns), which [runs on insert and on update](https://docs.pixeltable.com/overview/how-it-works). Each new row gets its model outputs without a pipeline you rerun. Put an embedding index on a column, and [each insert keeps it current](https://docs.pixeltable.com/howto/coming-from), with no separate vector database.

TinyDB is pure Python with no dependencies, and [`TinyDB('db.json')`](https://tinydb.readthedocs.io/en/latest/getting-started.html) gives you a database that stores Python dicts in that JSON file. Its docs call it [the wrong database](https://tinydb.readthedocs.io/en/latest/intro.html#why-not-use-tinydb) when you need access from several processes or threads, indexes, ACID guarantees, or high performance.

Most of these databases expect one process to write at a time. DuckDB lets [one process read and write](https://duckdb.org/docs/current/connect/concurrency#single-process), or several processes only read. A chDB data directory [opens in one process at a time](https://clickhouse.com/docs/chdb/getting-started). Zvec shares a collection across processes [in read-only mode](https://zvec.org/en/docs/db/collections/open/), and Pixeltable keeps [one writer process](https://docs.pixeltable.com/howto/deployment/operations) even with several API workers.
