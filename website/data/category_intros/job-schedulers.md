A function that runs every hour fits in APScheduler inside your app. A pipeline of tasks outgrows a Python scheduler and needs Airflow, Prefect, or Dagster.

How to choose:

- Jobs inside a running app, on cron or one-off triggers, kept across restarts: APScheduler
- Batch pipelines with a clear start and end that run on a schedule: Airflow
- Your Python functions as pipelines, with tasks created at runtime: Prefect
- Pipelines built around the data assets they produce, like tables and models: Dagster
- A simple loop of periodic jobs in one script: schedule

APScheduler [schedules your Python code to run later](https://github.com/agronholm/apscheduler/blob/3.x/README.rst), once or periodically. It runs inside your existing application, not as a service. Give each job [a trigger](https://apscheduler.readthedocs.io/en/latest/userguide.html#choosing-the-right-scheduler-job-store-s-executor-s-and-trigger-s): `date` runs it once, `interval` at fixed intervals, and `cron` at set times of day. Jobs [live in memory by default](https://apscheduler.readthedocs.io/en/latest/userguide.html#basic-concepts). When they must survive restarts and crashes, add a persistent job store.

schedule is an [in-process scheduler for periodic jobs](https://schedule.readthedocs.io/en/latest/), with no extra processes and no dependencies. Write `schedule.every(10).minutes.do(job)`, then call `schedule.run_pending()` in a loop. Its docs call it [a simple solution for simple scheduling problems](https://schedule.readthedocs.io/en/latest/#when-not-to-use-schedule), and say to look elsewhere when jobs must persist between restarts or run concurrently.

Airflow is [a platform for orchestrating batch workflows](https://airflow.apache.org/docs/apache-airflow/stable/index.html#why-airflow). Its docs say workflows with a clear start and end that run on a schedule are a great fit. It comes with a wide range of built-in operators for integrating other technologies. It's a set of services: [a minimal install](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html#required-components) runs a scheduler, a processor that parses your workflow files, and an API server with the UI. It also needs a metadata database, usually PostgreSQL or MySQL. Write tasks with [the TaskFlow API](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html): decorate plain Python functions, and Airflow creates the tasks, wires their dependencies, and passes data between them.

Prefect [turns your Python functions into data pipelines](https://docs.prefect.io/v3/get-started), with no DSLs or complex config files. Put [`@flow` on your script's entrypoint and `@task` on each function it calls](https://docs.prefect.io/v3/get-started/quickstart). Prefect tracks each task's state, so a failed run can resume from its point of failure. With the open-source server running, call `.serve()` on your flow with a `cron` schedule: it starts a process that runs the flow on that schedule. Its docs call serving [simple to reason about](https://docs.prefect.io/v3/concepts/deployments#static-infrastructure) for flows on a machine you control.

Dagster is [a data orchestrator built for data engineers](https://docs.dagster.io/), with lineage and observability built in. You [declare data assets like tables, datasets, and ML models as Python functions](https://github.com/dagster-io/dagster). Dagster runs them at the right time to keep them up to date. If you're just starting out, its docs [strongly recommend assets rather than ops](https://docs.dagster.io/guides/build/ops). Run assets on [a cron schedule](https://docs.dagster.io/guides/automate/schedules).

In an orchestrator, make every task safe to run twice. Airflow [can retry a failed task](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html#creating-a-task), so its docs say a task should produce the same outcome on every re-run. Prefect tasks are [retryable units of work](https://docs.prefect.io/v3/concepts/tasks) too.
