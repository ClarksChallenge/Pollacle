function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return "";
  return baseUrl.replace(/\/$/, "");
}

function resolveShareUrl(url, baseUrl) {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const origin = normalizeBaseUrl(baseUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "");

  if (!origin) {
    return url;
  }

  return new URL(url, origin).toString();
}

function buildAbsoluteShareUrl(path, baseUrl) {
  if (!path) return "";

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const origin = normalizeBaseUrl(baseUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "");

  if (!origin) {
    return normalizedPath;
  }

  return new URL(normalizedPath, `${origin}/`).toString();
}

module.exports = {
  resolveShareUrl,
  buildAbsoluteShareUrl,
};
