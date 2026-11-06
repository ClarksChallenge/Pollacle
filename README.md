# Pollacle — Community Support Platform

This repository contains Pollacle, a fundraising and community-support platform evolving toward more reliable ways for people, partners, and organizations to support campaigns.

Important: before public launch, consult legal counsel and have the Privacy Policy and Terms of Service reviewed for the final product and business model.

Quick start

1. Copy `.env.example` to `.env` and fill the required values: `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, and `NEXTAUTH_URL`. Founder-only launch settings may also require `FOUNDER_EMAIL`.
2. Install dependencies: `npm ci`.
3. Run locally: `npm run dev`.

Production and secrets

- For production, use a secrets manager (AWS Secrets Manager, HashiCorp Vault, GitHub Secrets, or your deployment platform's encrypted environment variables) for `DATABASE_URL`, OAuth credentials, and other sensitive configuration such as `FOUNDER_EMAIL`.
- Example: CI/CD should inject secrets into the environment when building or deploying the container.

Monitoring and error reporting

- Integrate Sentry or Datadog for error and performance monitoring. Add `SENTRY_DSN` to env and initialize SDK on server/start.

CI/CD

- A sample GitHub Actions workflow is included at `.github/workflows/ci.yml`. It builds the app and can be extended to deploy to your platform.

Legal

- The `app/privacy` and `app/terms` pages provide the current website policies. Have them reviewed by qualified legal counsel before public launch.
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

## Founder setup

The platform is intentionally locked down during launch testing. Public fundraiser creation is disabled, and only the configured founder campaign may be used.

To create the founder fundraiser:

1. Set `FOUNDER_EMAIL` in your environment to the founder email address.
2. Optionally set `FOUNDER_NAME` and `FOUNDER_FUNDRAISER_TITLE`.
3. Run:

```bash
npm run seed:founder
```

This script creates or updates the founder user and the founder fundraiser in the Neon database. Use it when the live site is locked down and you need the protected founder campaign.

## Pollacle Revenue Lab

The private founder dashboard includes an AI workspace at `/founder/boardroom` to help develop Pollacle's corporate-card/card-linked rewards revenue opportunity. Sarah Vance works through customer, revenue, and validation strategy; David Chen pressure-tests feasibility and can propose an MVP data model for the current Next.js, Vercel, and PostgreSQL stack. Their answers receive live, aggregate fundraiser and survey metrics and can search and read public web pages for research.

Pollacle's Fidel card-link integration is currently a sandbox test, not a production revenue integration. Corporate employee-spend rewards and consumer/supporter card-linked offers are distinct business models; the Revenue Lab helps compare and validate them but does not create offers, process card transactions, or establish partner terms.

The private `/founder/sponsor-opportunity` report helps demonstrate sponsor value without relying on Pollacle already having a large linked-card user base. Upload a sponsor's anonymized CSV export with `date`, `merchant`, and `amount` columns. The report parses the file in the browser only, calculates historical spend, and models customer rewards, estimated unredeemed rewards, and possible incremental sales using editable assumptions. These are explicitly estimates—not measured rewards lost, proven breakage, or causal sales lift. Never include card numbers or personal information in sponsor files.

Set `GROQ_API_KEY` in the server environment to enable the Revenue Lab. `GROQ_MODEL` is optional and defaults to `llama-3.3-70b-versatile`. Never expose either setting with a `NEXT_PUBLIC_` prefix. Chat history is stored in the founder's browser only; prompts and live aggregate metrics are processed by Groq, and research uses public search/source websites. Do not submit sensitive personal, payment, or supporter information.
