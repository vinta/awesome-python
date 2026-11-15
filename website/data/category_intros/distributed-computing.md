Run SQL and ETL jobs on PySpark, and scale pandas or NumPy code with Dask. Ray scales ML training and serving, and Python apps built from tasks and actors.

How to choose:

- SQL and ETL jobs, or an existing Spark setup: PySpark
- Scaling pandas, NumPy, or scikit-learn code: Dask
- ML training, tuning, and serving: Ray
- A Python app built from tasks and stateful actors: Ray
- Parallel loops and disk caching on one machine: joblib
- MPI programs on an HPC cluster: mpi4py

### PySpark

Pick PySpark for SQL and ETL work on structured data, or when your team already runs Spark or other JVM infrastructure. Even Dask's own comparison lists [preferring SQL and running mostly JVM infrastructure](https://docs.dask.org/en/latest/spark.html#reasons-you-might-choose-spark) as reasons to choose Spark. PySpark is [the Python API for Apache Spark](https://spark.apache.org/docs/latest/api/python/index.html), with Spark SQL, DataFrames, Structured Streaming, and MLlib. Your Python and SQL code run on the same engine. If you're new to Spark, its docs say to [start with PySpark's DataFrame API](https://spark.apache.org/docs/latest/api/python/tutorial/pandas_on_spark/faq.html) rather than the pandas API on Spark, which is for people who already know pandas. A program opens with [`SparkSession.builder.getOrCreate()`](https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_df.html) and builds DataFrames from that session.

### Dask

Pick Dask to scale pandas, NumPy, and scikit-learn code [with minimal rewriting](https://docs.dask.org/en/latest/why.html#dask-has-a-familiar-api), staying in pure Python. It beats PySpark when your code base is already Python or your problem [doesn't fit the Spark computing model](https://docs.dask.org/en/latest/spark.html#reasons-you-might-choose-dask). A Dask DataFrame is [a collection of pandas DataFrames](https://docs.dask.org/en/latest/) on different machines, and Dask Arrays parallelize NumPy for data larger than your RAM. Dask [runs without any setup](https://docs.dask.org/en/latest/deploying.html#local-machine), using threads on your own machine.

### Ray

Pick Ray to scale ML training, tuning, and serving, or a Python app built from tasks and actors. Its getting-started guide [sends ML workloads](https://docs.ray.io/en/latest/ray-overview/getting-started.html#choose-your-path) to Ray's libraries (Data, Train, Tune, Serve, and RLlib) and general Python applications to Ray Core. In Ray Core, decorate a function with `@ray.remote`, call it with `.remote()`, and fetch the result with `ray.get()`. For state that lasts between calls, use [actors](https://docs.ray.io/en/latest/ray-core/walkthrough.html#calling-an-actor), Ray's stateful workers. Ray Data handles batch processing too, with [a streaming design suited to GPU workloads](https://docs.ray.io/en/latest/data/comparisons.html) for deep learning inference. A data pipeline with no ML in it fits PySpark or Dask better.

### joblib

Pick joblib when one machine's cores are enough. It runs a for loop in parallel or caches a slow function's results on disk, and leaves your code [as unmodified as possible](https://joblib.readthedocs.io/en/latest/). scikit-learn's `n_jobs` parameter [runs its parallelism through joblib](https://scikit-learn.org/stable/computing/parallelism.html#higher-level-parallelism-with-joblib). Write the loop as a generator passed to [`Parallel(n_jobs=2)`, with each call wrapped in `delayed()`](https://joblib.readthedocs.io/en/latest/user_guide/parallel.html#common-usage). For caching, decorate the function with `@memory.cache` from a [`Memory`](https://joblib.readthedocs.io/en/latest/user_guide/memory.html) object, and calls with the same arguments skip the rerun. joblib runs on one machine by default; a Dask, Ray, or Spark cluster can take its jobs through [a backend](https://joblib.readthedocs.io/en/latest/user_guide/parallel.html#setting-up-joblib-s-backend-with-parallel-config).

### MPI for Python

Pick MPI for Python (mpi4py) for MPI programs on HPC clusters and supercomputers, where you write the message passing between processes yourself. It provides [Python bindings for the MPI standard](https://mpi4py.readthedocs.io/en/latest/), so it needs an MPI implementation such as [MPICH or Open MPI](https://mpi4py.readthedocs.io/en/latest/intro.html). Run your script with [`mpiexec -n 4 python script.py`](https://mpi4py.readthedocs.io/en/latest/tutorial.html#running-python-scripts-with-mpi) to start 4 processes. Lowercase methods like `comm.send()` pass any picklable Python object, and capitalized ones like `comm.Send()` pass buffers such as NumPy arrays directly.

### Scaling out

Parallelism brings extra complexity and overhead, and Dask's best practices say [it's often not necessary](https://docs.dask.org/en/latest/best-practices.html#start-small). Before adding a cluster, profile to see why your code is slow. Then try better algorithms in the libraries you use, efficient binary file formats, or a sample of your data. When one framework isn't enough, you can run two on the same hardware. Dask's docs say it's easy to use [Dask and Spark on the same data and the same cluster](https://docs.dask.org/en/latest/spark.html#reasons-to-choose-both), and Ray can run [Dask's collections on a Ray cluster](https://docs.ray.io/en/latest/ray-more-libs/dask-on-ray.html).
