// Minimal runtime config and env validation for production readiness
const required = [
  "NEXT_PUBLIC_SITE_URL",
  "DATABASE_URL",
  "CPX_CALLBACK_SECRET",
  "NEXTAUTH_URL",
];

const missing = required.filter((k) => !process.env[k]);

if (missing.length > 0) {
  // Warn but don't throw during build; deployment scripts should enforce envs.
  // eslint-disable-next-line no-console
  console.warn(
    `Warning: missing env vars: ${missing.join(", ")}. Set these before production deploy.`
  );
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "";

export const isProduction = process.env.NODE_ENV === "production";

export default {
  SITE_URL,
  isProduction,
};
