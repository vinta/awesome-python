"""Structured logging configuration for Leela Psychology AI.

Supports two output modes:
  plain  — human-readable for development (default)
  json   — machine-parseable for production / log aggregators

Configure via environment variable:
  LEE_LOG_LEVEL   — DEBUG | INFO | WARNING | ERROR  (default: INFO)
  LEE_LOG_FORMAT  — plain | json                    (default: plain)

Usage
-----
    from core.logging_config import get_logger

    log = get_logger(__name__)
    log.info("engine started", extra={"session_id": "...", "cell_id": 7})
"""
from __future__ import annotations

import json
import logging
import os
import sys
from typing import Any


class _JsonFormatter(logging.Formatter):
    """Emit each log record as a single JSON line."""

    def format(self, record: logging.LogRecord) -> str:  # noqa: A003
        payload: dict[str, Any] = {
            "ts":      self.formatTime(record, datefmt="%Y-%m-%dT%H:%M:%S"),
            "level":   record.levelname,
            "logger":  record.name,
            "msg":     record.getMessage(),
        }
        if record.exc_info:
            payload["exc"] = self.formatException(record.exc_info)
        # Merge any extra fields added via extra={}
        for key, val in record.__dict__.items():
            if key not in (
                "args", "asctime", "created", "exc_info", "exc_text",
                "filename", "funcName", "id", "levelname", "levelno",
                "lineno", "module", "msecs", "message", "msg", "name",
                "pathname", "process", "processName", "relativeCreated",
                "stack_info", "thread", "threadName", "taskName",
            ):
                payload[key] = val
        return json.dumps(payload, ensure_ascii=False, default=str)


def _build_handler() -> logging.Handler:
    handler = logging.StreamHandler(sys.stdout)
    fmt = os.environ.get("LEE_LOG_FORMAT", "plain").lower()
    if fmt == "json":
        handler.setFormatter(_JsonFormatter())
    else:
        handler.setFormatter(
            logging.Formatter(
                "%(asctime)s [%(levelname)-8s] %(name)s — %(message)s",
                datefmt="%H:%M:%S",
            )
        )
    return handler


def configure_logging() -> None:
    """Call once at application startup to install the root handler."""
    level_name = os.environ.get("LEE_LOG_LEVEL", "INFO").upper()
    level = getattr(logging, level_name, logging.INFO)

    root = logging.getLogger()
    if root.handlers:
        return  # Already configured (e.g. pytest captured logging)

    root.setLevel(level)
    root.addHandler(_build_handler())


def get_logger(name: str) -> logging.Logger:
    """Return a logger for *name*, ensuring root config is installed."""
    configure_logging()
    return logging.getLogger(name)
