Provisioning a production Postgres (Neon or Supabase)

Option A — Neon (recommended for serverless workloads)
1) Sign up at https://neon.tech and create a new project.
2) Create a branch (main) and a database; copy the connection string.
3) In Neon dashboard, enable connection pooling if offered (Neon serverless handles pooling).

Option B — Supabase
1) Sign up at https://app.supabase.com and create a new project.
2) Choose a strong DB password; copy `DATABASE_URL` from Settings → Database → Connection Pooling (or connection string).

Prisma notes
- Update `DATABASE_URL` in Vercel and GitHub Secrets.
- Use `npx prisma migrate deploy` on the server (or CI job) — DO NOT run `migrate dev` in production.
- Connection limits: ensure the DB supports enough connections; prefer Neon or Supabase with pooling for serverless.

Example DATABASE_URL format (Postgres):
```
postgresql://USER:PASSWORD@host:5432/dbname?schema=public
```

After provisioning
1) Set `DATABASE_URL` in Vercel (Project → Settings → Environment Variables).
2) Run migrations (CI or manual):
```
npx prisma migrate deploy --schema=prisma/schema.prisma
```
3) Seed the founder:
```
FOUNDER_EMAIL=you@yourdomain.com npm run seed:founder
```

Free-tier considerations
- Free tiers are fine for small traffic but monitor connection/CPU limits.
- If you see connection errors, add a pooling layer or upgrade plan.
