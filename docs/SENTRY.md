# Sentry Setup (Server)

We intentionally avoid initializing Sentry at module import time for files that may be bundled into edge/runtime code.

Recommended setup:

1. Store `SENTRY_DSN` in your production environment or GitHub Secrets.
2. On server start (before `next start`), call the initializer script included in the repo:

```bash
# initialize Sentry then start
NODE_ENV=production SENTRY_DSN=<dsn> npm run start:prod
```

3. The repo includes `app/lib/sentry-init.ts` which performs a safe `require('@sentry/node')` and attaches the Sentry instance to `globalThis.__SENTRY`.
4. `logServerError(context, err)` forwards exceptions to Sentry when the instance is available.

Notes:
- If you prefer Vercel or another platform, follow `@sentry/nextjs` docs to initialize in their recommended server entrypoint.
- Avoid requiring `@sentry/node` from files imported by edge/SSR routes during build to prevent bundling errors.
