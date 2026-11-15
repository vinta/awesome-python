For a Python scheduler inside your app, APScheduler runs cron rules and can keep jobs across restarts. A small script can use schedule; workflows need an orchestrator.

How to choose:

- Jobs inside a web app, service, or asyncio program, on cron rules or kept across restarts: APScheduler
- A small script that runs a few functions every so often: schedule
- Code that must finish despite crashes and waits of days, like payments or approvals: Temporal
- Tables, files, and models rebuilt on a schedule, with their lineage: Dagster
- Batch pipelines with a clear start and end, written as a DAG of tasks: Apache Airflow
- Python functions you already have, turned into scheduled, retried flows: Prefect

### APScheduler

Pick APScheduler to schedule jobs inside an application, whether a web app, a long-running service, or an asyncio program. You add a function with a trigger, and its user guide covers the [one-off, fixed-interval, and cron-style triggers](https://apscheduler.readthedocs.io/en/latest/userguide.html) it ships with. Jobs live in memory by default. Store them in a database, and they survive restarts, even the ones you added while the app was running.

### schedule

Pick schedule for a small script that runs a few functions periodically and sets up its schedule again each time it starts. It's an [in-process scheduler for periodic jobs](https://schedule.readthedocs.io/en/latest/) with no extra processes and no dependencies: write `schedule.every(10).minutes.do(job)`, then call `schedule.run_pending()` in a `while True` loop. Its own [when not to use](https://schedule.readthedocs.io/en/latest/#when-not-to-use-schedule) list rules out job persistence and concurrent execution. Jobs [run one after another](https://schedule.readthedocs.io/en/latest/parallel-execution.html), so a long job delays the rest. When jobs must survive a restart or run side by side, move to APScheduler.

### Temporal

Pick Temporal when code for payments, orders, or approvals must run to completion through crashes and waits of days. It runs your code as a [Durable Execution](https://docs.temporal.io/evaluate/understanding-temporal#durable-execution): if the process crashes, another one picks up the work and resumes where it stopped. A step that waits days becomes [a Timer in Workflow code](https://docs.temporal.io/evaluate/why-temporal), not a scheduler plus a polling job. Its companion is the Temporal Service, which you host yourself or get as Temporal Cloud, while your own Workers run your code. Calls to the outside world go in Activities. [Its Python setup guide](https://docs.temporal.io/develop/python/set-up-your-local-python) marks each Activity function with `@activity.defn`, and the Workflow class that calls them with `@workflow.defn`.

### Dagster

Pick Dagster when what you schedule is data assets, like tables, files, and ML models, and you want their lineage. In Dagster, an asset is [the core abstraction](https://dagster.io/docs/getting-started/concepts#asset), and assets that depend on other assets form that lineage. Airflow's core model is a DAG of tasks instead. You declare each asset as a Python function with `@dg.asset`, and its docs [strongly recommend assets rather than ops](https://dagster.io/docs/guides/build/ops) when you're getting started.

### Apache Airflow

Pick Airflow for scheduled batch pipelines written as a DAG of tasks, especially when its built-in operators cover the systems you work with. Its docs say [workflows that have a clear start and end and run on a schedule](https://airflow.apache.org/docs/apache-airflow/stable/index.html#why-airflow) are a great fit. You can also backfill runs to process historical data, or rerun only the failed tasks. A minimal install runs a scheduler and a metadata database, [among other components](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html). Write tasks with the [TaskFlow API](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html): you decorate plain Python functions, and Airflow wires up the dependencies and passes data between them.

### Prefect

Pick Prefect when Python functions you already have should become scheduled, retried flows with the least new structure. It [turns your Python functions into production-grade data pipelines](https://www.prefect.io/docs/v3/get-started) with no DSL or complex config files. [Its quickstart](https://www.prefect.io/docs/v3/get-started/quickstart) adds `@flow` to your script's entry point and `@task` to the functions it calls. The script still runs with `python`, so you can develop it locally. To run it on a schedule, start a Prefect server and call `serve()` on the flow.

### Making tasks safe to rerun

An orchestrator can retry a failed task, so write each task to give the same result when it runs twice. Airflow's best practices say [tasks should produce the same outcome on every re-run](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html#creating-a-task), so replace INSERT with UPSERT to keep a rerun from adding duplicate rows. Temporal [recommends that Activities be idempotent](https://docs.temporal.io/activity-definition#idempotency), since an Activity may be retried.
