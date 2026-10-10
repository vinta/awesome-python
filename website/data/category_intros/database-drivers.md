Each database calls for a Python database driver built for it. Reach PostgreSQL through Psycopg, and MySQL through mysqlclient. sqlite3 comes with Python.

How to choose:

- PostgreSQL, from sync or async code: Psycopg
- MySQL or MariaDB, Django projects included: mysqlclient
- SQLite with nothing to install: sqlite3
- MySQL in pure Python: PyMySQL
- An asyncio-only PostgreSQL service: asyncpg
- Loading JSON or CSV into SQLite, from Python or the shell: sqlite-utils
- ClickHouse, even behind proxies and load balancers: clickhouse-connect
- ClickHouse over its native TCP protocol: clickhouse-driver
- Any database with an ODBC driver: pyodbc
- Oracle Database: python-oracledb
- SQL Server or Azure SQL, with no driver manager to set up: mssql-python
- Redis, MongoDB, or Apache Cassandra: redis-py, PyMongo, or cassandra-driver

Psycopg is the PostgreSQL driver [Django recommends](https://docs.djangoproject.com/en/stable/ref/databases/#postgresql-notes). One design serves sync and async code: [`AsyncConnection` and `AsyncCursor`](https://www.psycopg.org/psycopg3/docs/advanced/async.html#asynchronous-operations) mirror the sync classes, so you mostly add `await`. Open each connection in a [`with` block](https://www.psycopg.org/psycopg3/docs/basic/usage.html#connection-context). It commits when the block ends, rolls back on an exception, and closes the connection either way.

asyncpg is built for asyncio only, and [skips DB-API on purpose](https://magicstack.github.io/asyncpg/current/faq.html) to fit PostgreSQL better. In a server, [create a pool](https://magicstack.github.io/asyncpg/current/usage.html#connection-pools) with `asyncpg.create_pool()` at startup, then take a connection per request with `async with pool.acquire()`.

Django calls mysqlclient [the recommended choice](https://docs.djangoproject.com/en/stable/ref/databases/#mysql-db-api-drivers) for MySQL, and ships its own adapter for it. It's a native driver built against MySQL's client library. Where you can't install that library and its headers, use PyMySQL, which SQLAlchemy calls [a pure Python port](https://docs.sqlalchemy.org/en/latest/dialects/mysql.html#mysql-python-compatibility) of MySQLdb that targets full compatibility. The licenses differ too: mysqlclient is [GPL](https://github.com/PyMySQL/mysqlclient/blob/main/LICENSE), and PyMySQL is MIT.

sqlite3 comes with Python, and SQLite needs no server. Use the connection as a [context manager](https://docs.python.org/3/library/sqlite3.html#sqlite3-connection-context-manager): it commits when the block succeeds and rolls back when it raises.

sqlite-utils sits on top of sqlite3 to create and fill databases, not to be a full ORM. Pass [`insert_all()`](https://sqlite-utils.datasette.io/en/latest/python-api.html#bulk-inserts) a list of dicts, and it creates the table and columns for you. Its command-line tool pipes JSON or CSV straight into a new database file.

clickhouse-connect is ClickHouse's official client and [talks HTTP](https://clickhouse.com/docs/integrations/language-clients/python), so it works through load balancers, proxies, and enterprise network controls. clickhouse-driver uses the [native TCP protocol](https://clickhouse-driver.readthedocs.io/en/latest/) instead, which its docs say is more configurable and sends compact binary data.

pyodbc reaches any database through that database's ODBC driver, plus one [driver manager](https://github.com/mkleehammer/pyodbc/wiki/Drivers-and-Driver-Managers) for all of them. Windows has one built in; on macOS and Unix, you install one first. For SQL Server and Azure SQL, Microsoft's own mssql-python [connects without an external driver manager](https://learn.microsoft.com/en-us/sql/connect/python/mssql-python/python-sql-driver-mssql-python).

python-oracledb is Oracle's official driver. In its default [Thin mode](https://python-oracledb.readthedocs.io/en/latest/user_guide/initialization.html), it connects straight to Oracle Database without Oracle Client libraries.

redis-py is [the Python client for Redis](https://redis.io/docs/latest/develop/clients/redis-py/), and MongoDB's docs call PyMongo [the recommended way](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/) to work with MongoDB from Python. cassandra-driver talks to Apache Cassandra over Cassandra's binary protocol, with sync and async APIs.

With any SQL database, pass values as query parameters instead of formatting them into the SQL string. The sqlite3 docs say this [avoids SQL injection](https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders). For more per database, see [awesome-mysql](https://github.com/shlomi-noach/awesome-mysql), [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres), and [awesome-sqlite](https://github.com/planetopendata/awesome-sqlite).
