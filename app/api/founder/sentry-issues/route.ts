import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  if (!process.env.SENTRY_AUTH_TOKEN || !process.env.SENTRY_ORG || !process.env.SENTRY_PROJECT) {
    return NextResponse.json({ error: 'sentry_not_configured' }, { status: 501 });
  }

  const url = `https://sentry.io/api/0/projects/${encodeURIComponent(process.env.SENTRY_ORG)}/${encodeURIComponent(process.env.SENTRY_PROJECT)}/issues/?statsPeriod=24h&limit=12`;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.SENTRY_AUTH_TOKEN}` } });
  if (!res.ok) return NextResponse.json({ error: 'sentry_fetch_failed' }, { status: 502 });
  const json = await res.json();
  // Return a compact list
  const issues = json.map((i: any) => ({ id: i.id, title: i.title, shortId: i.shortId, culprit: i.culprit, level: i.level, count: i.count, firstSeen: i.firstSeen, lastSeen: i.lastSeen }));
  return NextResponse.json({ issues });
}
