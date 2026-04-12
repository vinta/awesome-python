#!/usr/bin/env python3
"""build_release.py — Pre-release validation and packaging for Leela Psychology AI.

Steps performed:
  1. Run full test suite (pytest)
  2. Verify no PII fields present in _SAFE_FIELDS whitelist
  3. Check required environment variable names are documented
  4. Verify all v1.2.0 package __init__.py files exist
  5. Verify all critical v1.2.0 modules exist
  6. Print release summary

Usage:
    python scripts/build_release.py [--skip-tests]
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run_tests() -> bool:
    print("── Running test suite ──────────────────────────────────────────")
    result = subprocess.run(
        [sys.executable, "-m", "pytest", "tests/", "-v", "--tb=short"],
        cwd=ROOT,
    )
    return result.returncode == 0


def verify_safe_fields() -> bool:
    print("── Verifying _SAFE_FIELDS whitelist ────────────────────────────")
    vs_path = ROOT / "storage" / "vector_storage.py"
    source = vs_path.read_text(encoding="utf-8")
    forbidden = ["session_id", "user_id", "email", "name", "raw_text", "comment"]
    safe_block_start = source.find("_SAFE_FIELDS = {")
    safe_block_end = source.find("}", safe_block_start)
    safe_block = source[safe_block_start:safe_block_end]
    pii_in_block = [f for f in forbidden if f in safe_block]
    if pii_in_block:
        print(f"  FAIL — PII fields found in _SAFE_FIELDS: {pii_in_block}")
        return False
    print("  PASS — no PII fields in _SAFE_FIELDS whitelist")
    return True


def check_env_docs() -> bool:
    print("── Checking env-var documentation ──────────────────────────────")
    required_vars = ["LEE_HMAC_KEY", "LEE_FERNET_KEY", "LEE_EMB_PROVIDER"]
    env_example = (ROOT / ".env.example").read_text(encoding="utf-8")
    missing = [v for v in required_vars if v not in env_example]
    if missing:
        print(f"  FAIL — env vars not documented in .env.example: {missing}")
        return False
    print("  PASS — all required env vars documented")
    return True


def check_package_init_files() -> bool:
    print("── Verifying package __init__.py files ─────────────────────────")
    required_packages = [
        "core", "storage", "ai", "agents", "agents/qa",
        "agents/feedback", "agents/learning", "agents/devops",
        "models", "game", "exporters", "journals", "monitoring", "web",
        "tests",
    ]
    missing = [p for p in required_packages if not (ROOT / p / "__init__.py").exists()]
    if missing:
        print(f"  FAIL — missing __init__.py in: {missing}")
        return False
    print(f"  PASS — all {len(required_packages)} packages have __init__.py")
    return True


def check_v120_modules() -> bool:
    print("── Verifying v1.2.0 modules ────────────────────────────────────")
    required_modules = {
        "ai/embedding_synthesizer.py":          "EmbeddingSynthesizer",
        "agents/devops/health_agent.py":         "HealthAgent",
        "monitoring/metrics_collector.py":       "MetricsCollector",
        "journals/journal_manager.py":           "JournalManager",
        "docs/architecture.md":                  "Architecture Reference",
        "web/static/leela.css":                  "--bg-base",
    }
    failed = []
    for rel_path, marker in required_modules.items():
        fpath = ROOT / rel_path
        if not fpath.exists():
            failed.append(f"{rel_path} (missing)")
        elif marker not in fpath.read_text(encoding="utf-8"):
            failed.append(f"{rel_path} (marker '{marker}' not found)")
    if failed:
        print(f"  FAIL — v1.2.0 module issues:\n    " + "\n    ".join(failed))
        return False
    print(f"  PASS — all {len(required_modules)} v1.2.0 modules verified")
    return True


def check_version() -> bool:
    print("── Verifying package version ───────────────────────────────────")
    init_path = ROOT / "__init__.py"
    if not init_path.exists():
        print("  FAIL — leela_psychology/__init__.py missing")
        return False
    content = init_path.read_text(encoding="utf-8")
    if '__version__ = "1.2.0"' not in content:
        print("  FAIL — __version__ not set to 1.2.0 in __init__.py")
        return False
    print("  PASS — __version__ = 1.2.0")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Leela Psychology release build")
    parser.add_argument("--skip-tests", action="store_true")
    args = parser.parse_args()

    checks = [
        verify_safe_fields,
        check_env_docs,
        check_package_init_files,
        check_v120_modules,
        check_version,
    ]
    if not args.skip_tests:
        checks = [run_tests] + checks

    results = [fn() for fn in checks]
    print()
    if all(results):
        print("✓  All checks passed — release candidate is ready.")
        sys.exit(0)
    else:
        failed = sum(1 for r in results if not r)
        print(f"✗  {failed} check(s) failed — do not release.")
        sys.exit(1)


if __name__ == "__main__":
    main()
