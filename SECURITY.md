# Security Policy for Pollacle

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email security@pollacle.com instead of using the public issue tracker.

## Security Features Implemented

### 1. Input Validation
- All user inputs validated with Zod schemas
- Fundraiser title, story, amount, category validated
- CPX postback data validated

### 2. Rate Limiting
- Fundraiser creation: 50 per IP per hour
- Survey completion: 100 per IP per hour
- CPX completions: 50 per user per hour
- Prevents abuse and DOS attacks

### 3. Atomic Transactions
- Database updates use transactions
- Prevents race conditions on counter increments
- Prevents double-counting survey completions

### 4. CPX Security
- MD5 signature validation on postbacks
- Unique session ID tracking prevents duplicates
- Payout amount validated (0-100)

### 5. API Security
- Proper HTTP status codes
- Minimal error messages in production
- Rate limiting on all endpoints
- No sensitive data in logs

### 6. Data Protection
- HTTPS only (enforced on production)
- Database encryption in transit
- No plaintext passwords stored
- Periodic data cleanup

## Privacy Compliance

### GDPR (EU Users)
- Consent-based data collection
- Privacy policy linked on signup
- Data minimization principles applied
- CPX data sharing disclosed

### CCPA (California Users)
- "Do Not Sell" links provided
- Data collection notices displayed
- User rights documented

## Known Limitations

- In-memory rate limiting (use Redis for production scale)
- SQLite not suitable for high concurrency (migrate to PostgreSQL)
- No authentication (fundraiser creators unverified)
- No email verification

## Security Checklist for Production

- [ ] Switch to PostgreSQL database
- [ ] Implement Redis rate limiting
- [ ] Add user authentication
- [ ] Enable HTTPS/SSL certificates (auto via Vercel)
- [ ] Set up error tracking (Sentry)
- [ ] Implement CORS properly
- [ ] Add security headers
- [ ] Regular security audits
- [ ] Database backup strategy
- [ ] Monitor rate limiting effectiveness

## Deployment Security

### Vercel Deployment
- Use environment variables for all secrets
- Never commit .env files
- Enable branch protection on main
- Require PR reviews before merge
- Use HTTPS for all URLs (auto-enabled)

### Database Security
- Use Neon PostgreSQL with SSL
- Enable point-in-time backups
- Monitor access logs
- Use strong credentials

### CPX Integration Security
- Store API key in environment only
- Validate all postback signatures
- Monitor for suspicious patterns
- Log all completions for audit

## Version History

- v0.1.0 - Initial security implementation
  - Input validation
  - Rate limiting
  - CPX signature validation
  - Atomic transactions
