# Pollacle Launch Guide

Complete guide to deploying Pollacle to production on Vercel with your pollacle.com domain.

## Prerequisites

- GitHub account with Pollacle repo
- Vercel account (vercel.com)
- Neon account (neon.tech) for PostgreSQL
- CPX Research account with API key
- pollacle.com domain

## Step 1: Prepare Your Domain

### DNS Setup Options

**Option A: Vercel Nameservers (Recommended)**
1. Get Vercel nameservers from Vercel dashboard
2. Update your domain registrar to point to Vercel nameservers
3. Wait 24-48 hours for DNS propagation
4. Vercel auto-generates SSL certificate

**Option B: CNAME Records**
1. In your domain registrar, add CNAME:
   ```
   www.pollacle.com → cname.vercel-dns.com
   ```
2. Vercel will detect and configure
3. Auto-generates SSL certificate

## Step 2: Database Setup (Neon)

1. Create Neon account: https://neon.tech
2. Create new project (PostgreSQL)
3. Copy connection string:
   ```
   postgresql://user:password@region.neon.tech/pollacle
   ```
4. Save for Vercel setup

## Step 3: CPX Research Configuration

1. Sign up: https://www.cpx-research.com/publisher-sign-up
2. Get API Key from dashboard
3. Configure postback URL in CPX:
   ```
   https://pollacle.com/api/survey/cpx-postback?user_id={user_id}&offer_id={offer_id}&payout={payout}&custom={custom}&hash={hash}
   ```
4. Test postback with CPX test tools
5. Save API Key

## Step 4: Deploy to Vercel

1. Go to vercel.com/new
2. Select Pollacle repository from GitHub
3. Configure project settings:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
4. Set Environment Variables:
   ```
   DATABASE_URL = postgresql://user:password@region.neon.tech/pollacle
   CPX_API_KEY = your_cpx_api_key_here
   NODE_ENV = production
   NEXT_PUBLIC_APP_URL = https://pollacle.com
   ```
5. Click Deploy
6. Wait for build to complete

## Step 5: Add Custom Domain to Vercel

1. In Vercel dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter: `pollacle.com`
4. Choose DNS setup option (nameservers or CNAME)
5. Follow instructions for your registrar
6. Vercel auto-generates SSL certificate (usually 5 mins)

## Step 6: Run Database Migrations

```bash
# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Or if using existing database
npx prisma db push
```

## Step 7: Verify Deployment

- [ ] Visit https://pollacle.com
- [ ] Check if page loads
- [ ] Verify SSL certificate (lock icon)
- [ ] Test homepage functionality
- [ ] Create a test fundraiser
- [ ] Check Vercel logs: `vercel logs pollacle`

## Step 8: CPX Postback Verification

1. In CPX dashboard, use their postback test tools
2. Send test completion to: `https://pollacle.com/api/survey/cpx-postback`
3. Check Vercel logs for successful receipt:
   ```bash
   vercel logs pollacle | grep "CPX"
   ```
4. Verify fundraiser amount increased

## Step 9: Email Configuration

Set up email endpoints (optional, for production):
- `privacy@pollacle.com` (privacy inquiries)
- `legal@pollacle.com` (legal questions)
- `security@pollacle.com` (security reports)
- `support@pollacle.com` (general support)

You can forward these to your actual email via your domain registrar.

## Monitoring

### View Real-time Logs
```bash
vercel logs pollacle --follow
```

### Check for Errors
```bash
vercel logs pollacle --since 1h
```

### Performance Monitoring
- Vercel dashboard shows build times, function calls, bandwidth
- Neon dashboard shows database query performance

## Post-Launch Checklist

- [ ] HTTPS working (SSL certificate active)
- [ ] Custom domain (pollacle.com) resolving
- [ ] Database connected and migrations ran
- [ ] CPX postback endpoint tested
- [ ] Rate limiting active
- [ ] Privacy and Legal pages accessible
- [ ] Social sharing working (uses pollacle.com URLs)
- [ ] Backup strategy configured (Neon)
- [ ] Error logging set up (optional: Sentry)
- [ ] CDN working (Vercel auto-enables)

## Scaling as You Grow

### When Traffic Increases
- Vercel Pro plan: $20/month for more resources
- Neon scales automatically with usage
- Monitor via dashboard and adjust as needed

### When CPX Volume Increases
- Rate limiting still in place
- Consider Redis for distributed rate limiting
- Monitor database performance via Neon

## Troubleshooting

### Domain Not Resolving
- Verify DNS propagation: https://dnschecker.org/
- Check Vercel dashboard for domain status
- May take 24-48 hours

### SSL Certificate Not Active
- Wait 5-10 minutes after adding domain
- Check Vercel domain settings
- Try clearing browser cache

### CPX Postback Not Working
- Verify API key in environment variables
- Check CPX dashboard for postback URL
- Review Vercel logs for validation errors
- Ensure signature validation passes

### Database Connection Failed
- Verify DATABASE_URL format
- Check Neon project is active
- Verify IP is whitelisted (Neon does this auto)
- Run: `npx prisma db push` to verify connection

## Next Steps

1. Monitor performance for first week
2. Set up automated backups (Neon handles this)
3. Plan for user authentication
4. Consider admin dashboard for moderation
5. Set up error tracking (Sentry)
6. Plan marketing and launch announcement

---

**Support Resources:**
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- CPX Documentation: https://www.cpx-research.com/publisher-documentation
- Next.js Docs: https://nextjs.org/docs
