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
