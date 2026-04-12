"""KMS-lite: lightweight key management without external dependencies.

In production replace this stub with AWS KMS / HashiCorp Vault / Azure Key Vault.
The interface intentionally mirrors boto3 KMS so swapping is straightforward.
"""
from __future__ import annotations

import os
from cryptography.fernet import Fernet


class KMSLite:
    """Local key-management provider (dev / MVP tier)."""

    @staticmethod
    def get_keys() -> tuple[bytes, bytes]:
        """Return ``(hmac_key, fernet_key)`` loaded from environment variables.

        Falls back to deterministic dev values when variables are absent so
        the system boots in CI without secret configuration.
        """
        hmac_key = os.getenv("LEE_HMAC_KEY", "fallback_must_be_32_bytes_long!!!")
        fernet_key = os.getenv("LEE_FERNET_KEY", Fernet.generate_key().decode())
        return hmac_key.encode(), fernet_key.encode()
