Pick Celery for a Python task queue with batteries included, RQ for less to learn when you already run Redis, and Taskiq when your code is built on asyncio.

How to choose:

- A full-featured queue with many brokers and result stores: Celery
- Plain functions queued on the Redis server you already run: RQ
- An asyncio codebase, with tasks written as `async def`: Taskiq
- Tasks retried after an error or a worker crash, without extra setup: Dramatiq
- Background tasks with no broker server to run, on SQLite: Huey

### Celery

Pick Celery when you want brokers, result stores, and workflows in one package. It calls itself [a task queue with batteries included](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html). [RabbitMQ and Redis are feature complete](https://docs.celeryq.dev/en/stable/getting-started/introduction.html#what-do-i-need) as brokers, and Amazon SQS works too. Results can go to Redis, a SQL database, the Django ORM, and many other stores. Its [canvas](https://docs.celeryq.dev/en/stable/userguide/canvas.html#the-primitives) links tasks into chains that run one after another and groups that run in parallel. Its FAQ says [Windows is no longer supported](https://docs.celeryq.dev/en/stable/faq.html#does-celery-support-windows). Create a `Celery` app with a broker URL and decorate a function with `@app.task`. Call `add.delay(4, 4)` to queue it, and start a worker with `celery -A tasks worker`.

### RQ

Pick RQ when your app already runs Redis and you want a queue with little to learn. It's [backed by Redis/Valkey and designed to have a low barrier to entry](https://python-rq.org/). A job is a plain function: [any Python function call can be put on an RQ queue](https://python-rq.org/docs/#enqueueing-jobs), with no decorator. Create a `Queue(connection=Redis())`, pass your function and its arguments to `q.enqueue()`, and start a worker with `rq worker`.

### Dramatiq

Pick Dramatiq over Celery when a task that raises or loses its worker should run again without extra setup. By default, Celery [acknowledges a task message just before running it](https://docs.celeryq.dev/en/stable/userguide/tasks.html), so a task cut short by a worker crash never runs again. Celery also retries no exceptions unless you ask. Dramatiq [acknowledges a message only after it's processed](https://dramatiq.io/advanced.html#message-persistence), and when a task raises, it [retries it with exponential backoff](https://dramatiq.io/guide.html#error-handling). [RabbitMQ is its recommended broker](https://dramatiq.io/installation.html), and it supports Redis too. Dramatiq is LGPL, while Celery, RQ, Huey, and Taskiq use permissive licenses. Decorate a function with `@dramatiq.actor`, call `count_words.send(url)` to queue it, and start workers with `dramatiq count_words`.

### Huey

Pick Huey to run background tasks without a broker server. It has [no dependencies outside the standard library](https://huey.readthedocs.io/en/latest/installation.html), and its SQLite, file-system, and in-memory storage work out of the box. Its docs say [SqliteHuey may be a good choice](https://huey.readthedocs.io/en/latest/guide.html#storage-options) for moderate workloads where running a separate server like Redis is undesirable. Create a `SqliteHuey` with a filename and decorate a function with `@huey.task()`. Calling that function [queues it and returns a result handle](https://huey.readthedocs.io/en/latest/) right away. Start the consumer with `huey_consumer demo.huey`.

### Taskiq

Pick Taskiq when your code is built on asyncio. Its docs call it [an asyncio Celery implementation](https://taskiq-python.github.io/#what-is-taskiq-in-a-nutshell) that can't send tasks from synchronous code. They [send fully synchronous projects to Celery or Dramatiq](https://taskiq-python.github.io/guide/#why-not-use-existing-libraries). Decorate an `async def` with `@broker.task` and call [`await broker.startup()`](https://taskiq-python.github.io/guide/getting-started.html) first. Queue the task with `await add_one.kiq(1)`, and start a worker with `taskiq worker broker:broker`.

### Passing data to tasks

Pass a task the ID of a database row, not the object, and load the row inside the task. Celery's docs warn that a Django model object passed as an argument [carries old data into the task](https://docs.celeryq.dev/en/stable/userguide/tasks.html#state), which can lead to race conditions. Dramatiq's best practices say to [send the user's id rather than the serialized user](https://dramatiq.io/best_practices.html#simple-messages), since every message goes over the wire.
