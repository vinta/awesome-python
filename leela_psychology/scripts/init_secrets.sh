#!/usr/bin/env bash
# init_secrets.sh — Generate fresh cryptographic keys for Leela Psychology AI
# Run once per deployment environment; store output in your secrets manager.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

echo "=== Leela Quest+Psychology AI — Secret Initialisation ==="
echo ""

HMAC_KEY=$(python3 -c "import secrets; print(secrets.token_hex(32))")
FERNET_KEY=$(python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")

echo "LEE_HMAC_KEY=${HMAC_KEY}"
echo "LEE_FERNET_KEY=${FERNET_KEY}"
echo ""
echo "⚠  Store these values in your secrets manager (AWS Secrets Manager,"
echo "   HashiCorp Vault, or equivalent).  Do NOT commit them to source control."
echo ""
echo "To export to current shell session:"
echo "  export LEE_HMAC_KEY=${HMAC_KEY}"
echo "  export LEE_FERNET_KEY=${FERNET_KEY}"
