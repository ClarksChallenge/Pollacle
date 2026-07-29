import { SITE_URL } from "@/app/lib/config";

export class CpxConfigurationError extends Error {}

/** Build the account-specific provider URL without committing it to source. */
export function buildCpxLaunchUrl(sessionId: string) {
  const template = process.env.CPX_SURVEY_URL_TEMPLATE;
  if (!template) {
    throw new CpxConfigurationError("CPX_SURVEY_URL_TEMPLATE is not configured");
  }
  if (!template.includes("{sessionId}")) {
    throw new CpxConfigurationError("CPX_SURVEY_URL_TEMPLATE must include {sessionId}");
  }
  if (template.includes("{callbackUrl}") && !SITE_URL) {
    throw new CpxConfigurationError(
      "NEXT_PUBLIC_SITE_URL is required when the CPX template uses {callbackUrl}"
    );
  }

  const callbackUrl = SITE_URL ? new URL("/api/cpx/callback", SITE_URL).toString() : "";
  const launchUrl = template
    .replaceAll("{sessionId}", encodeURIComponent(sessionId))
    .replaceAll("{callbackUrl}", encodeURIComponent(callbackUrl));

  let parsed: URL;
  try {
    parsed = new URL(launchUrl);
  } catch {
    throw new CpxConfigurationError("CPX_SURVEY_URL_TEMPLATE is not a valid URL");
  }
  if (parsed.protocol !== "https:") {
    throw new CpxConfigurationError("CPX survey URL must use HTTPS");
  }
  return parsed.toString();
}
