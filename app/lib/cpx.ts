export function buildCpxLaunchUrl(fundraiserId: string, userId: string) {
  const appId = process.env.CPX_APP_ID;
  if (!appId) {
    throw new Error("Missing CPX_APP_ID in your environment variables.");
  }

  const url = new URL("https://cpx-research.com");
  url.searchParams.set("app_id", appId);
  url.searchParams.set("ext_user_id", userId);
  url.searchParams.set("subid_1", fundraiserId);

  return url.toString();
