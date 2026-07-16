export function mapReferrerToChannel(referrer?: string | null) {
  if (!referrer) return 'Direct';
  const r = referrer.toLowerCase();
  if (r.includes('facebook.com') || r.includes('fb.')) return 'Facebook';
  if (r.includes('x.com') || r.includes('twitter.com') || r.includes('t.co')) return 'Twitter/X';
  if (r.includes('instagram.com') || r.includes('instagr.am')) return 'Instagram';
  if (r.includes('linkedin.com')) return 'LinkedIn';
  if (r.includes('reddit.com')) return 'Reddit';
  if (r.includes('youtube.com') || r.includes('youtu.be')) return 'YouTube';
  if (r.includes('telegram')) return 'Telegram';
  if (r.includes('pinterest')) return 'Pinterest';
  if (r.includes('tiktok')) return 'TikTok';
  if (r.includes('google')) return 'Search/Google';
  if (r.includes('bing.com')) return 'Search/Bing';
  return 'Other';
}
