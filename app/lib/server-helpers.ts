import crypto from "crypto";
// Sentry integration removed from automated init to avoid bundling/runtime issues.
// To enable Sentry, initialize `@sentry/node` in your server entry and call
// `Sentry.captureException(err)` from `logServerError` when appropriate.

export function safeCompare(a?: string, b?: string) {
  if (!a || !b) return false;
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // timingSafeEqual requires same length
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch (e) {
    return false;
  }
}

export function logServerError(context: string, error: unknown) {
  try {
    const message = (error && (error as any).message) || String(error);
    // Keep logs concise; stack can be noisy and may include sensitive info
    // eslint-disable-next-line no-console
    console.error(`[${context}] ${message}`);
    // Optionally forward to Sentry if you've initialized it separately.
    try {
      const Sentry = (globalThis as any).__SENTRY;
      if (Sentry && typeof Sentry.captureException === 'function') {
        Sentry.captureException(error);
      }
    } catch (e) {
      // swallow
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`[${context}] unknown error`);
  }
}
