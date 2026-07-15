const requests = new Map<string, number[]>();
const CLEANUP_INTERVAL = 60000;

if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, times] of requests.entries()) {
      const filtered = times.filter((t) => now - t < 3600000);
      if (filtered.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, filtered);
      }
    }
  }, CLEANUP_INTERVAL);
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const userRequests = requests.get(identifier) || [];
  const filtered = userRequests.filter((t) => now - t < windowMs);

  if (filtered.length >= maxRequests) {
    return false;
  }

  requests.set(identifier, [...filtered, now]);
  return true;
}

export function getRequestCount(
  identifier: string,
  windowMs: number = 60000
): number {
  const now = Date.now();
  const userRequests = requests.get(identifier) || [];
  return userRequests.filter((t) => now - t < windowMs).length;
}

export function resetRateLimit(identifier: string): void {
  requests.delete(identifier);
}
