# Production checklist

## 1. Environment variables
Set these in the deployment environment before launch:

- NEXT_PUBLIC_SITE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- DATABASE_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- FOUNDER_EMAIL

Use the production domain rather than localhost.

## 2. Database
Run the Prisma migrations in production:

```bash
npx prisma migrate deploy
```

If the database is fresh, also generate the client:

```bash
npx prisma generate
```

## 3. Auth
Confirm that:

- Google OAuth redirect URLs include the production domain
- NextAuth URL matches the live app URL exactly

## 4. Smoke test
After deployment, verify:

- /api/health returns success
- /login loads correctly
- Public campaign pages load correctly
- founder dashboard loads
