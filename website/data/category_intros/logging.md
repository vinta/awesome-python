Start with the standard library's logging, which ships with Python. Pick structlog for key-value logs as JSON, or Loguru for one ready-made logger.

How to choose:

- A library, or an app happy with the standard setup: logging
- Key-value entries, rendered as JSON in production: structlog
- One ready-made logger with little setup: Loguru
- Logs and traces sent to a hosted observability service: Logfire

### logging

Use logging in a library you publish, or in an app where the standard setup does the job. It ships with Python, and [all Python modules can participate in logging](https://docs.python.org/3/library/logging.html), so your app's log holds your own messages next to those from the libraries you use. Each module gets its own logger with [`logging.getLogger(__name__)`](https://docs.python.org/3/howto/logging.html#advanced-logging-tutorial), so logger names follow your package layout. The app sets handlers and levels in one place.

### structlog

Pick structlog when you want each entry as key-value pairs instead of a prose message: pretty in your terminal, and [JSON in production](https://www.structlog.org/en/latest/logging-best-practices.html), where log aggregators parse it. It can render output itself or [forward entries to logging](https://www.structlog.org/en/latest/standard-library.html) and the handlers you already have. You bind key-value pairs to a logger, or to context variables scoped to the current request, and every later entry carries them. Each file needs only `logger = structlog.get_logger()`, and the app [calls `structlog.configure()` once](https://www.structlog.org/en/latest/configuration.html).

### Loguru

Pick Loguru when you want one logger that works on import, instead of [setting up named loggers with handlers, formatters, and filters](https://loguru.readthedocs.io/en/latest/resources/migration.html). `from loguru import logger` writes to stderr right away, and a single `add()` call sends entries to other sinks, like a file with [rotation, retention, and compression](https://loguru.readthedocs.io/en/latest/overview.html#easier-file-logging-with-rotation-retention-compression).

### Pydantic Logfire

Pick Logfire when your logs should land in an observability service, next to the traces from the rest of your code. It's built on OpenTelemetry. Its SDK is open source and [can export to any OpenTelemetry backend](https://pydantic.dev/docs/logfire/guides/alternative-backends/), but by default it sends data to Pydantic's hosted, commercial platform. [Self-hosting that platform takes an Enterprise plan](https://pydantic.dev/docs/logfire/deploy/self-hosted-deployment/overview/). It works alongside the other picks: [attach its handler to logging](https://pydantic.dev/docs/logfire/integrations/logging/logging/), its sink to Loguru, or its processor to structlog. A new app can [log with Logfire directly](https://pydantic.dev/docs/logfire/instrument/python/integrate/), starting with `logfire.configure()` and calls like `logfire.info()`.

### Logging from a library

Whichever logger your app uses, a library you publish leaves log output to the app that imports it. With logging, [use a logger named after your package and add no handlers](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library) other than an optional NullHandler: setting up handlers is the app developer's call. A library that uses Loguru [never calls `add()`](https://loguru.readthedocs.io/en/latest/overview.html#suitable-for-scripts-and-libraries), since it shares the only logger with the app. Instead, it calls `logger.disable()` with its package name, so its log calls do nothing until the app turns them back on with `enable()`.
