import crypto from "crypto";
import { SITE_URL } from "@/app/lib/config";

export class CpxConfigurationError extends Error {}

/** Build the account-specific provider URL without committing it to source. */
export function buildCpxLaunchUrl(sessionId: string, accountId: string) {
  const template = process.env.CPX_SURVEY_URL_TEMPLATE;
  if (!template) {
    throw new CpxConfigurationError("CPX_SURVEY_URL_TEMPLATE is not configured");
  }

  if (template.includes("{callbackUrl}") && !SITE_URL) {
    throw new CpxConfigurationError(
      "NEXT_PUBLIC_SITE_URL is required when the CPX template uses {callbackUrl}"
    );
  }

  const callbackUrl = SITE_URL ? new URL("/api/cpx/callback", SITE_URL).toString() : "";
  const secureHashSecret = process.env.CPX_SECURE_HASH_SECRET || process.env.CPX_CALLBACK_SECRET;
  const secureHash = secureHashSecret
    ? crypto.createHash("sha256").update(`${sessionId}:${accountId}:${secureHashSecret}`).digest("hex")
    : "";

  let launchUrl = template;
  launchUrl = launchUrl.replaceAll("{sessionId}", encodeURIComponent(sessionId));
  launchUrl = launchUrl.replaceAll("{userId}", encodeURIComponent(accountId));
  launchUrl = launchUrl.replaceAll("{accountId}", encodeURIComponent(accountId));
  launchUrl = launchUrl.replaceAll("{fundraiserId}", encodeURIComponent(accountId));
  launchUrl = launchUrl.replaceAll("{secureHash}", encodeURIComponent(secureHash));
  launchUrl = launchUrl.replaceAll("{callbackUrl}", encodeURIComponent(callbackUrl));

  let parsed: URL;
  try {
    parsed = new URL(launchUrl);
  } catch {
    throw new CpxConfigurationError("CPX_SURVEY_URL_TEMPLATE is not a valid URL");
  }

  if (parsed.protocol !== "https:") {
    throw new CpxConfigurationError("CPX survey URL must use HTTPS");
  }

  parsed.searchParams.set("session_id", sessionId);
  parsed.searchParams.set("user_id", accountId);
  if (secureHash) {
    parsed.searchParams.set("secure_hash", secureHash);
  }
  if (callbackUrl) {
    parsed.searchParams.set("callback_url", callbackUrl);
  }

  return parsed.toString();
}
