Quick Deploy Guide — Vercel + Cloudflare

Prereqs
- Vercel project linked to this GitHub repo
- Vercel CLI token (or create in Vercel dashboard)
- GitHub repo admin to add secrets
- Managed Postgres (Neon/Supabase) DATABASE_URL

Required environment variables (Vercel runtime + GitHub Secrets)
- DATABASE_URL — Postgres connection string (production)
- NEXTAUTH_URL — https://pollacle.com
- SITE_URL — https://pollacle.com
- FOUNDER_EMAIL — your founder email (seeding + guards)
- CPX_CALLBACK_SECRET — strong secret for CPX callbacks
- SENTRY_DSN (optional) — Sentry DSN for error reporting
- SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT (optional) — for Sentry issues listing
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID — for CI deploys

Set GitHub Secrets (examples using `gh`):
```
gh secret set DATABASE_URL --body "$DATABASE_URL"
gh secret set FOUNDER_EMAIL --body "you@yourdomain.com"
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID"
```

Vercel Project envs
- Add the same values under Project → Settings → Environment Variables (Production scope).
- Ensure `ALLOW_DEV_IMPERSONATION` is not set or is `0` in Production.

Deploy flow (what our workflows do)
1) On push to `main`, `.github/workflows/deploy.yml` will optionally run `prisma migrate deploy` and seed the founder, then build and call Vercel to deploy `--prod`.
2) CI `ci.yml` runs migrations and seeds before running Playwright E2E when CI has `DATABASE_URL` and `FOUNDER_EMAIL` secrets; it enables dev impersonation for tests only.

Manual steps to run once after setting envs (if you prefer manual control):
```
# Run migrations
npx prisma migrate deploy --schema=prisma/schema.prisma

# Seed founder (one-time)
FOUNDER_EMAIL=you@yourdomain.com npm run seed:founder

# Trigger Vercel deploy via CLI (optional)
npx vercel --prod
```

Verify after deploy
- curl https://pollacle.com/api/health  -> should show db: true
- Sign in as `FOUNDER_EMAIL`, visit /founder/dashboard
- Start a survey and simulate CPX callback to confirm credits

Cloudflare notes
- Add `pollacle.com` to Vercel domains and verify with TXT record on Cloudflare.
- Point the Vercel-assigned CNAME or A records in Cloudflare per Vercel instructions.
- Use Cloudflare proxy (orange) with Full TLS (origin cert on Vercel is fine).

Security reminders
- Do not enable `ALLOW_DEV_IMPERSONATION` in production.
- Keep `CPX_CALLBACK_SECRET` secure and rotate if compromised.
# Deploy Checklist

This document describes recommended steps to deploy Pollacle to production.

## Required environment variables (set in your host or GitHub Secrets)
- `DATABASE_URL` — Postgres connection string
- `NEXTAUTH_URL` — your site canonical URL (https://pollacle.example)
- `FOUNDER_EMAIL` — founder's email to lock fundraiser ownership
- `SENTRY_DSN` — optional, for Sentry
- `GITHUB_TOKEN` or `GHCR_PAT` — for publishing images

## Typical deploy flow (containerized)
1. Build image and push to GHCR (the provided workflow does this).
2. Run database migrations on the production database:

```bash
# on your host or in CI (requires prisma binary)
npx prisma migrate deploy --schema=prisma/schema.prisma
```

3. Seed the founder and initial fundraiser:

```bash
FOUNDER_EMAIL=you@example.com FOUNDER_NAME="Your Name" FOUNDER_FUNDRAISER_TITLE="Founder's Fundraiser" npm run seed:founder
```

4. Start your app in production:

```bash
NODE_ENV=production SENTRY_DSN=<dsn> npm run start:prod
```

## Provider-specific notes
- Vercel: prefer Vercel native deploys; add env vars in project settings. Do not use `next start` on Vercel.
- Cloud Run / GCP: deploy the built image or build in Cloud Build. Ensure `DATABASE_URL` and other secrets are set in Cloud Run service.
- AWS ECS / Fargate: push image to ECR (or GHCR), update task definition, and run migration/seed as a one-off task.
- Render / Fly.io: use their native deploy but ensure migrations and seed run during deploy (Render has a "predeploy" option).

## DNS & TLS
- Point your domain to the provider per their docs (A/AAAA for VMs, CNAME for platform services).
- Use provider-managed TLS (recommended) or issue certificates via Let's Encrypt and configure in your ingress/load balancer.

## Rollback
- Tag releases and keep DB migrations reversible when possible.
- To rollback, deploy previous image tag and run any necessary migration rollbacks (if you support them).

***
If you want, I can add provider-specific CI steps for a target (GCP Cloud Run, AWS ECS, Render, Fly.io). Tell me which provider to prioritize.
