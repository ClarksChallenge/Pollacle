Legal Packet — Items to send to counsel

Purpose: provide counsel a concise set of questions and checklist to approve the site for tomorrow's founder-only launch.

1) Product summary
- Pollacle: converts survey participation into support credits for fundraisers.
- Current mode: single-founder launch (only `FOUNDER_EMAIL` can own fundraising).
- CPX Research integration: third-party survey provider that will POST callbacks to `/api/cpx/callback` with a shared secret.

2) Data flows
- Users: may sign in via OAuth (next-auth), minimal personal info stored (email, name).
- Survey flow: `survey/start` creates a `SurveySession` (sessionId) and returns CPX launch URL. CPX charges a reward and posts back to `/api/cpx/callback`.
- Consent: cookie consent banner records a `Consent` entry via `/api/consent`.
- Data retention: currently undefined — counsel should recommend retention periods per data type.

3) Legal documents requested
- Privacy Policy (GDPR, CCPA compliant) — required for public launch.
- Terms of Service — include refund policy and fundraising disclaimers.
- Data Processing Agreement (DPA) template for CPX Research.
- Any fundraising-specific legal disclosures required by jurisdiction.

4) Security & compliance questions
- Is a simple callback-secret verification sufficient, or require signed JWT/webhook signatures?
- Recommended contract terms for liability/indemnity with CPX Research.
- Required consumer disclosures for reward-based mechanisms in our jurisdiction.
- Whether age gating or parental consent is required.

5) Suggested timelines
- Urgent: counsel to provide draft Privacy + Terms within 24 hours for review.
- Within 48 hours: finalize DPA or use CPX's DPA template for staging tests.

6) Attachments to include when sending to counsel
- `docs/DEPLOY.md`
- `docs/SENTRY.md`
- `app/privacy/page.tsx` and `app/terms/page.tsx` (placeholders)
- Data schema excerpt (Prisma schema)


Use this packet to request a rapid review. If you want, I can format this into an email template addressed to counsel. Would you like that?