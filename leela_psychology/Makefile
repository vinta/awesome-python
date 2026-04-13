# Leela Quest+Psychology AI — Developer Makefile
# ─────────────────────────────────────────────────────────────────────────────
# Usage:
#   make test         — run full test suite
#   make test-v       — verbose tests with traceback
#   make check        — pre-release validation (no tests)
#   make release      — full pre-release gate (tests + checks)
#   make docker-build — build Docker image
#   make docker-run   — run container locally (requires .env)
#   make secrets      — generate fresh HMAC + Fernet keys
#   make clean        — remove runtime artifacts
# ─────────────────────────────────────────────────────────────────────────────

PYTHON   := python
PYTEST   := $(PYTHON) -m pytest
TESTS    := tests/

.PHONY: test test-v check release docker-build docker-run secrets clean help

## Run full test suite (quiet)
test:
	$(PYTEST) $(TESTS) -q

## Run full test suite (verbose)
test-v:
	$(PYTEST) $(TESTS) -v --tb=short

## Pre-release checks without running tests
check:
	$(PYTHON) scripts/build_release.py --skip-tests

## Full pre-release gate: tests + all checks
release:
	$(PYTHON) scripts/build_release.py

## Build the Docker image
docker-build:
	docker build -t leela-psychology:latest .

## Run the container locally (requires .env with LEE_HMAC_KEY / LEE_FERNET_KEY)
docker-run:
	docker compose up

## Generate fresh HMAC and Fernet keys
secrets:
	bash scripts/init_secrets.sh

## Remove runtime data, cache, and compiled files
clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -name "*.pyc" -delete 2>/dev/null || true
	rm -rf .pytest_cache data/vectors/* data/emb_cache/* data/logs/* exports/clinical/*
	@echo "Clean complete."

## Show available targets
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  /'
