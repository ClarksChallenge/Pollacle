// Server-side Sentry init. Import this from a server-only module to initialize Sentry
if (typeof process !== 'undefined' && process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.05 });
    // Make available for other server helpers
    (globalThis as any).__SENTRY = Sentry;
  } catch (e) {
    // ignore init errors
    // eslint-disable-next-line no-console
    console.warn('Sentry init failed');
  }
}
