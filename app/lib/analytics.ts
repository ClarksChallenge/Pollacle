import fs from 'fs';
import path from 'path';

type Mapping = { pattern: string; channel: string };

let mappings: Mapping[] | null = null;

function loadMappings(): Mapping[] {
  if (mappings) return mappings;
  const candidates = [path.join(process.cwd(), 'config', 'channel-mapping.json'), path.join(process.cwd(), 'channel-mapping.json')];
  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) {
        const raw = fs.readFileSync(c, 'utf8');
        const parsed = JSON.parse(raw) as Mapping[];
        mappings = parsed;
        return mappings;
      }
    } catch (e) {
      // ignore and continue
    }
  }

  mappings = [
    { pattern: 'facebook.com', channel: 'Facebook' },
    { pattern: 'twitter.com', channel: 'Twitter/X' },
    { pattern: 'x.com', channel: 'Twitter/X' },
    { pattern: 'instagram.com', channel: 'Instagram' },
    { pattern: 'linkedin.com', channel: 'LinkedIn' },
    { pattern: 'reddit.com', channel: 'Reddit' },
    { pattern: 'youtube.com', channel: 'YouTube' },
    { pattern: 'tiktok', channel: 'TikTok' },
    { pattern: 'pinterest', channel: 'Pinterest' },
    { pattern: 'google', channel: 'Search/Google' },
    { pattern: 'bing.com', channel: 'Search/Bing' },
  ];
  return mappings;
}

export function mapReferrerToChannel(referrer?: string | null) {
  if (!referrer) return 'Direct';
  const r = referrer.toLowerCase();
  const map = loadMappings();
  for (const m of map) {
    if (!m.pattern) continue;
    if (r.includes(m.pattern.toLowerCase())) return m.channel;
  }
  return 'Other';
}
