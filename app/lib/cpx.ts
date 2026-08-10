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
  const template =
    "https://offers.cpx-research.com/index.php?app_id={app_id}&ext_user_id={ext_user_id}&subid_1={fundraiserId}&subid_2={sessionId}";

  const appId = process.env.CPX_APP_ID;

  const callbackHost =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;

  const callbackUrl = callbackHost
    ? `${normalizeUrl(callbackHost)}/api/cpx/callback`
    : null;

  if (!callbackUrl) {
    throw new CpxConfigurationError(
      "Missing NEXT_PUBLIC_SITE_URL or NEXTAUTH_URL for CPX callback URL."
    );
  }

  if (!appId) {
    throw new CpxConfigurationError(
      "Missing CPX_APP_ID in environment variables."
    );
  }

  console.log("CPX DEBUG", {
    sessionId,
    fundraiserId,
    userId,
  });

  return template
    .replace(/\{app_id\}/g, appId)
    .replace(/\{sessionId\}/g, sessionId)
    .replace(/\{fundraiserId\}/g, fundraiserId)
    .replace(/\{userId\}/g, userId)
    .replace(/\{ext_user_id\}/g, userId);
}
