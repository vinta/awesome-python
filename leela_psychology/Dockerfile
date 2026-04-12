# ─── Leela Quest+Psychology AI — Docker image ─────────────────────────────────
FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install only the mandatory runtime deps first (smaller layer)
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install flask flask-cors cryptography anyio numpy

# ─── Application source ───────────────────────────────────────────────────────
COPY . .

# Data directories (mounted as volumes in production)
RUN mkdir -p data/vectors data/emb_cache data/exports

# ─── Non-root user for least-privilege execution ──────────────────────────────
RUN addgroup --system leela && adduser --system --ingroup leela leela \
 && chown -R leela:leela /app
USER leela

# ─── Runtime ─────────────────────────────────────────────────────────────────
EXPOSE 5000

# Secrets are injected via environment variables; never baked into the image.
# Required: LEE_HMAC_KEY, LEE_FERNET_KEY
# Optional: LEE_EMB_PROVIDER (default: mock)
ENV LEE_EMB_PROVIDER=mock

CMD ["python", "-m", "flask", "--app", "web.feedback_api:create_app", "run", \
     "--host", "0.0.0.0", "--port", "5000"]
