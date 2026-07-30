export function resolveShareUrl(url: string, baseUrl?: string): string {
  if (!url) return '';

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const origin = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || '';

  if (!origin) {
    return url;
  }

  return new URL(url, origin).toString();
}

export function buildAbsoluteShareUrl(path: string, baseUrl?: string): string {
  if (!path) return '';

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const origin = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || '';

  if (!origin) {
    return normalizedPath;
  }

  return new URL(normalizedPath, `${origin}/`).toString();
}
