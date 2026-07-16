# Pollacle — Single-Founder Launch

This repository contains Pollacle, a survey-to-support fundraising platform currently locked to a single founder for launch testing.

Important: before public launch consult legal counsel and replace the placeholder Privacy Policy and Terms of Service with reviewed documents.

Quick start

1. Copy `.env.example` to `.env` and fill values (required): `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_URL`, `CPX_CALLBACK_SECRET`, `FOUNDER_EMAIL`.
2. Install dependencies: `npm ci`.
3. Run locally: `npm run dev`.

Production and secrets

- For production use a secrets manager (AWS Secrets Manager, HashiCorp Vault, or GitHub Secrets) to store `DATABASE_URL`, `CPX_CALLBACK_SECRET`, OAuth credentials, and `FOUNDER_EMAIL`.
- Example: CI/CD should inject secrets into the environment when building or deploying the container.

Monitoring and error reporting

- Integrate Sentry or Datadog for error and performance monitoring. Add `SENTRY_DSN` to env and initialize SDK on server/start.

CI/CD

- A sample GitHub Actions workflow is included at `.github/workflows/ci.yml`. It builds the app and can be extended to deploy to your platform.

Legal

- The `app/privacy` and `app/terms` pages are placeholders. Do not launch publicly without legal review.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
