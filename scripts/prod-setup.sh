#!/usr/bin/env bash
set -euo pipefail

# Simple production setup helper (manual run on host or CI step)
# Requires: DATABASE_URL and (optionally) FOUNDER_EMAIL in env

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Aborting." >&2
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma

if [ -n "${FOUNDER_EMAIL:-}" ]; then
  echo "Seeding founder: $FOUNDER_EMAIL"
  FOUNDER_EMAIL="$FOUNDER_EMAIL" npm run seed:founder || true
else
  echo "FOUNDER_EMAIL not set; skipping founder seed."
fi

echo "Done."
