module.exports = {
  dsn: process.env.SENTRY_DSN || "",
  tracesSampleRate: 0.05,
};
