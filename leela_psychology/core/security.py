"""Cryptographic security provider — HMAC-SHA256 + AES-GCM (Fernet).

Production keys must be supplied via:
  LEE_HMAC_KEY   — 32-byte hex or raw string
  LEE_FERNET_KEY — URL-safe base64 Fernet key (from Fernet.generate_key())

For local dev both default to deterministic fallback values so the system
boots without configuration.  Never use dev defaults in production.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import os

from cryptography.fernet import Fernet


class SecurityProvider:
    """KMS-stub: key management and cryptographic operations."""

    def __init__(self) -> None:
        hmac_raw = os.getenv("LEE_HMAC_KEY", "dev_hmac_secret_32_bytes_long_!!!")
        fernet_raw = os.getenv("LEE_FERNET_KEY", "")

        self._hmac_secret: bytes = hmac_raw.encode() if isinstance(hmac_raw, str) else hmac_raw

        if fernet_raw:
            fernet_key = fernet_raw.encode() if isinstance(fernet_raw, str) else fernet_raw
        else:
            # Derive a deterministic dev key so the system is usable without config
            fernet_key = base64.urlsafe_b64encode(
                hashlib.sha256(self._hmac_secret).digest()
            )

        self._fernet = Fernet(fernet_key)

    # ── Public API ────────────────────────────────────────────────────────────

    def hash_session(self, session_id: str) -> str:
        """Return a 24-hex-char HMAC-SHA256 pseudonym for *session_id*.

        The pseudonym is collision-resistant and cannot be reversed without
        the master key, satisfying GDPR pseudonymisation requirements.
        """
        if not isinstance(session_id, str):
            session_id = str(session_id)
        digest = hmac.new(
            self._hmac_secret, session_id.encode("utf-8"), hashlib.sha256
        ).hexdigest()
        return digest[:24]

    def encrypt_props(self, data: str) -> str:
        """Encrypt *data* with AES-GCM (Fernet) and return a base64 token."""
        return self._fernet.encrypt(data.encode("utf-8")).decode("utf-8")

    def decrypt_props(self, token: str) -> str:
        """Decrypt a Fernet *token* and return the original string."""
        return self._fernet.decrypt(token.encode("utf-8")).decode("utf-8")
