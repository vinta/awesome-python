"""MetricsCollector — lightweight in-process performance metrics.

Tracks per-school latency, throughput, and error rates without any
external dependency (no Prometheus, no InfluxDB required).

Design
------
- Thread-safe via a simple lock (no asyncio primitives needed — called
  from sync code after coroutine completion)
- Rolling window of the last N samples per metric
- Exported as a plain dict for JSON serialisation

Usage
-----
    from monitoring.metrics_collector import metrics

    with metrics.timer("jung_analysis"):
        ctx = analyzer.build_psychological_context(...)

    metrics.increment("consent_granted")
    summary = metrics.snapshot()
"""
from __future__ import annotations

import threading
import time
from collections import defaultdict, deque
from typing import Any, Deque, Dict, Generator

_WINDOW = 100  # keep last N samples per metric


class _Timer:
    """Context manager that records elapsed time into the collector."""

    def __init__(self, collector: "MetricsCollector", name: str) -> None:
        self._c = collector
        self._name = name
        self._start = 0.0

    def __enter__(self) -> "_Timer":
        self._start = time.perf_counter()
        return self

    def __exit__(self, *_: Any) -> None:
        elapsed_ms = (time.perf_counter() - self._start) * 1000
        self._c._record_timing(self._name, elapsed_ms)


class MetricsCollector:
    """Thread-safe rolling-window metrics store."""

    def __init__(self, window: int = _WINDOW) -> None:
        self._lock = threading.Lock()
        self._window = window
        # metric_name → deque of float (ms timings)
        self._timings: Dict[str, Deque[float]] = defaultdict(
            lambda: deque(maxlen=self._window)
        )
        # counter_name → int
        self._counters: Dict[str, int] = defaultdict(int)

    # ── Recording ─────────────────────────────────────────────────────────────

    def timer(self, name: str) -> _Timer:
        """Return a context manager that records elapsed ms under *name*."""
        return _Timer(self, name)

    def _record_timing(self, name: str, ms: float) -> None:
        with self._lock:
            self._timings[name].append(ms)

    def record_ms(self, name: str, ms: float) -> None:
        """Manually record a timing value (for async contexts)."""
        self._record_timing(name, ms)

    def increment(self, name: str, delta: int = 1) -> None:
        """Increment a named counter."""
        with self._lock:
            self._counters[name] += delta

    # ── Querying ──────────────────────────────────────────────────────────────

    def snapshot(self) -> Dict[str, Any]:
        """Return a JSON-serialisable performance snapshot."""
        with self._lock:
            timing_stats = {}
            for name, samples in self._timings.items():
                if not samples:
                    continue
                lst = list(samples)
                timing_stats[name] = {
                    "count":  len(lst),
                    "avg_ms": round(sum(lst) / len(lst), 2),
                    "min_ms": round(min(lst), 2),
                    "max_ms": round(max(lst), 2),
                    "p95_ms": round(sorted(lst)[int(len(lst) * 0.95)], 2),
                }
            return {
                "timings":  timing_stats,
                "counters": dict(self._counters),
            }

    def reset(self) -> None:
        """Clear all metrics (useful between test runs)."""
        with self._lock:
            self._timings.clear()
            self._counters.clear()


# Module-level singleton
metrics = MetricsCollector()
