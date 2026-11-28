Use Psycopg on PostgreSQL, or asyncpg when asyncio code needs raw speed, and mysqlclient on MySQL. For SQLite, the Python database driver is built in: sqlite3.

How to choose:

- PostgreSQL, from sync or asyncio code: Psycopg
- PostgreSQL from asyncio code, for raw speed over DB-API: asyncpg
- MySQL or MariaDB: mysqlclient
- SQLite, through the standard library: sqlite3
- MySQL with no C library to build, or without GPL terms: PyMySQL
- Vector similarity search in PostgreSQL: pgvector-python
- Every SQLite feature, through SQLite's own API: APSW
- A SQLite database built from data you already have: sqlite-utils
- ClickHouse: ClickHouse Connect, or clickhouse-driver for code already on the native protocol
- SQL Server or Azure SQL: mssql-python
- Any other database with an ODBC driver: pyodbc
- Oracle Database: python-oracledb
- Redis, MongoDB, or Cassandra: redis-py, PyMongo, or cassandra-driver

### Psycopg

Pick Psycopg for PostgreSQL, whether your code is sync or asyncio: its site says [new projects should use Psycopg 3](https://www.psycopg.org/). It follows DB-API 2.0, so it [presents a familiar interface](https://www.psycopg.org/psycopg3/docs/) to anyone who has used another DB-API adapter. Start with [`psycopg.connect()`](https://www.psycopg.org/psycopg3/docs/basic/usage.html), or `AsyncConnection.connect()` in asyncio code.

### asyncpg

Pick asyncpg when your code is all asyncio and raw speed matters more than DB-API compatibility. It [implements PostgreSQL's server protocol natively](https://github.com/MagicStack/asyncpg) and exposes its features directly, so it [doesn't support DB-API](https://magicstack.github.io/asyncpg/current/faq.html#does-asyncpg-support-db-api). Connect with [`await asyncpg.connect()`](https://magicstack.github.io/asyncpg/current/usage.html), then run queries with methods like `fetchrow()`.

### pgvector-python

Add pgvector-python when your embeddings live in PostgreSQL. It isn't a driver of its own: it [adds pgvector support](https://github.com/pgvector/pgvector-python) to Psycopg, asyncpg, SQLAlchemy, and Django, so you keep the library you already use. Enable the pgvector extension with `CREATE EXTENSION vector`, then register the vector type on your connection with `register_vector()`.

### mysqlclient

Pick mysqlclient for MySQL or MariaDB. It's backed by the MySQL C client library, and Django's MySQL backend [provides an adapter for mysqlclient](https://docs.djangoproject.com/en/stable/ref/databases/#mysql-db-api-drivers). PyMySQL's own maintainer says [a driver backed by a C library can speed up packet processing](https://github.com/PyMySQL/PyMySQL/issues/1267). It's a fork of MySQLdb with Python 3 support, so its [user guide](https://mysqlclient.readthedocs.io/user_guide.html) starts from `import MySQLdb` and `MySQLdb.connect()`.

### PyMySQL

Pick PyMySQL when you can't install the MySQL client library that mysqlclient builds against: PyMySQL is [pure Python](https://github.com/PyMySQL/PyMySQL). It's also MIT-licensed, where mysqlclient is GPL. Its maintainer names [gevent or eventlet code that monkey-patches sockets](https://github.com/PyMySQL/PyMySQL/issues/342) as a reason to use it.

### sqlite3

Use sqlite3 for SQLite unless you need SQLite-specific features. It ships with Python, and APSW's own docs suggest it [if your needs are simple](https://rogerbinns.github.io/apsw/pysqlite.html) and you want to switch databases easily. Its [tutorial](https://docs.python.org/3/library/sqlite3.html#sqlite3-tutorial) starts from `sqlite3.connect()`.

### APSW

Pick APSW when your code talks to SQLite alone and wants all of it. Where sqlite3 hides some of SQLite's nuances to behave like other DB-API databases, APSW [makes no effort to hide how SQLite is different](https://rogerbinns.github.io/apsw/pysqlite.html). Start with [`apsw.bestpractice`](https://rogerbinns.github.io/apsw/bestpractice.html), which configures SQLite for best performance and catches common mistakes.

### sqlite-utils

Reach for sqlite-utils to build a SQLite database from data you already have, from Python or the command line. Insert rows as Python dicts, and it [creates the table for you](https://sqlite-utils.datasette.io/en/latest/python-api.html). It's [not intended to be a full ORM](https://sqlite-utils.datasette.io/en/latest/): its helpers focus on creating the database and filling it with data.

### ClickHouse Connect

Pick ClickHouse Connect for ClickHouse: it's ClickHouse's own driver, documented on its site. It talks over the HTTP interface, which [supports HTTP load balancers, proxies, and enterprise network controls](https://clickhouse.com/docs/integrations/language-clients/python/index). It has both a synchronous `Client` and an `AsyncClient`. Start with `clickhouse_connect.get_client()`, then call `query()` and `insert()` on the client.

### clickhouse-driver

Keep clickhouse-driver in code already built on it, or when you need ClickHouse's native TCP protocol, which it [uses instead of HTTP](https://clickhouse-driver.readthedocs.io/en/latest/). It offers a plain `Client` with `execute()`, plus a DB-API interface.

### mssql-python

Pick mssql-python for SQL Server and Azure SQL. It's Microsoft's own driver, and it [connects without an external driver manager to install](https://learn.microsoft.com/en-us/sql/connect/python/mssql-python/python-sql-driver-mssql-python), where pyodbc needs an ODBC driver set up first. Microsoft also lists [native Microsoft Entra authentication](https://learn.microsoft.com/en-us/sql/connect/python/mssql-python/migrate-from-pyodbc) among its reasons to choose it. Pass `mssql_python.connect()` a connection string, with no `DRIVER` keyword.

### pyodbc

Use pyodbc for databases other than SQL Server that you reach through an ODBC driver. It's a DB-API module that [makes accessing ODBC databases simple](https://github.com/mkleehammer/pyodbc). Connect with an ODBC connection string that [names the driver or a DSN](https://github.com/mkleehammer/pyodbc/wiki/Getting-started).

### python-oracledb

Use python-oracledb for Oracle Database. Oracle maintains it as [the renamed successor to cx_Oracle](https://python-oracledb.readthedocs.io/en/stable/user_guide/introduction.html), which its docs say not to use for new development. It [runs in Thin mode by default](https://python-oracledb.readthedocs.io/en/stable/user_guide/initialization.html), connecting directly with no Oracle Client libraries, and its docs say most applications can stay there.

### redis-py

redis-py is [the Python client for Redis](https://redis.io/docs/latest/develop/clients/redis-py/). Start with `redis.Redis()`, and the same package has [async and cluster clients](https://github.com/redis/redis-py) when you need them.

### PyMongo

PyMongo is MongoDB's official driver and [the recommended way to work with MongoDB from Python](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/). Connect with `MongoClient`, and switch to `AsyncMongoClient` for [large, highly concurrent workloads](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/reference/migration/#synchronous-versus-asynchronous) or an app built on async libraries.

### cassandra-driver

cassandra-driver is the Python driver for Apache Cassandra, with [sync and async APIs and an object mapper](https://github.com/apache/cassandra-python-driver) in one package. Its [getting started guide](https://github.com/apache/cassandra-python-driver/blob/trunk/docs/getting_started.rst) opens a `Session` with `Cluster().connect()`.

### Query parameters

With any SQL database, pass values as query parameters instead of formatting them into the SQL string. The sqlite3 docs say to [always use placeholders instead of string formatting](https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders) to avoid SQL injection attacks, and the Psycopg and pyodbc docs say the same. The placeholder differs by driver: `%s` in Psycopg, mysqlclient, and PyMySQL, `?` in sqlite3 and pyodbc, and `$1` in asyncpg.

### More database resources

For more MySQL, PostgreSQL, and SQLite tools, see [awesome-mysql](https://github.com/shlomi-noach/awesome-mysql), [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres), and [awesome-sqlite](https://github.com/planetopendata/awesome-sqlite).
