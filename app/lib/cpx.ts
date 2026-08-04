// Define the custom error class that your API route is trying to import
export class CpxConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CpxConfigurationError";
  }
}

function normalizeUrl(value: string) {
  return value.replace(/\/$/, "");
}

export function buildCpxLaunchUrl(
  sessionId: string,
  fundraiserId: string,
  userId: string
) {
  const template = process.env.CPX_SURVEY_URL_TEMPLATE;
  const callbackHost = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;
  const callbackUrl = callbackHost
    ? `${normalizeUrl(callbackHost)}/api/cpx/callback`
    : null;

  if (template) {
    if (!callbackUrl) {
      throw new CpxConfigurationError(
        "Missing NEXT_PUBLIC_SITE_URL or NEXTAUTH_URL for CPX callback URL."
      );
    }

    return template
      .replace(/\{sessionId\}/g, sessionId)
      .replace(/\{fundraiserId\}/g, fundraiserId)
      .replace(/\{userId\}/g, userId)
      .replace(/\{ext_user_id\}/g, userId)
      .replace(/\{callbackUrl\}/g, encodeURIComponent(callbackUrl))
      .replace(/\{callback_url\}/g, encodeURIComponent(callbackUrl));
  }

  const appId = process.env.CPX_APP_ID;
  if (!appId) {
    throw new CpxConfigurationError(
      "Missing CPX_SURVEY_URL_TEMPLATE or CPX_APP_ID in your environment variables."
    );
  }

  if (!callbackUrl) {
    throw new CpxConfigurationError(
      "Missing NEXT_PUBLIC_SITE_URL or NEXTAUTH_URL for CPX callback URL."
    );
  }

  const url = new URL("https://cpx-research.com");
  url.searchParams.set("app_id", appId);
  url.searchParams.set("ext_user_id", userId);
  url.searchParams.set("subid_1", fundraiserId);
  url.searchParams.set("sid", sessionId);
  url.searchParams.set("callback_url", callbackUrl);

  return url.toString();
}
