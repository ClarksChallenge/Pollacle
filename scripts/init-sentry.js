// Initializes server-side Sentry if SENTRY_DSN is set. Safe to call during container start.
try {
  if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    // require our server initializer
    require('../app/lib/sentry-init');
    // eslint-disable-next-line no-console
    console.log('Sentry initialized');
  } else {
    // eslint-disable-next-line no-console
    console.log('Sentry init skipped (SENTRY_DSN missing or not production)');
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('Sentry init error', e && e.message ? e.message : e);
}
