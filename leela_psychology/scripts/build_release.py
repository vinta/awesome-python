#!/usr/bin/env python3
"""build_release.py — Pre-release validation and packaging for Leela Psychology AI.

Steps performed:
  1. Run full test suite (pytest)
  2. Verify no PII fields present in _SAFE_FIELDS whitelist
  3. Check required environment variable names are documented
  4. Print release summary

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
    found = [f for f in forbidden if f'"' + f + '"' in source and "_SAFE_FIELDS" in source.split(f'"' + f + '"')[0].split("\n")[-1]]
    # Simple heuristic: check the _SAFE_FIELDS block doesn't contain PII names
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


def main() -> None:
    parser = argparse.ArgumentParser(description="Leela Psychology release build")
    parser.add_argument("--skip-tests", action="store_true")
    args = parser.parse_args()

    checks = [verify_safe_fields, check_env_docs]
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
