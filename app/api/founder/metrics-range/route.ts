import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

function parseDateParam(val: string | null) {
  if (!val) return null;
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email || session.user.email !== process.env.FOUNDER_EMAIL) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const startParam = url.searchParams.get('start');
  const endParam = url.searchParams.get('end');

  const start = parseDateParam(startParam) ?? (() => { const d = new Date(); d.setDate(d.getDate() - 29); d.setHours(0,0,0,0); return d; })();
  const end = parseDateParam(endParam) ?? new Date();
  end.setHours(23,59,59,999);

  // time series daily buckets
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000*60*60*24)) + 1);

  const completions = await prisma.surveyCompletion.findMany({
    where: { completedAt: { not: null, gte: start, lte: end } },
    select: { completedAt: true },
  });

  const buckets: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0,10);
    buckets[key] = 0;
  }
  for (const c of completions) {
    const key = c.completedAt!.toISOString().slice(0,10);
    if (buckets[key] !== undefined) buckets[key] += 1;
  }
  const timeSeries = Object.keys(buckets).sort().map(k=>({ date: k, count: buckets[k] }));

  const sessionsStarted = await prisma.surveySession.count({ where: { startedAt: { gte: start, lte: end } } });
  const completionsCount = completions.length;
  const rewardsAgg = await prisma.surveyCompletion.aggregate({ where: { completedAt: { gte: start, lte: end } }, _sum: { rewardAmount: true } });
  const totalRewards = rewardsAgg._sum.rewardAmount ?? 0;
  const conversionRate = sessionsStarted ? +(completionsCount / sessionsStarted) : 0;

  const utmSources = await prisma.surveySession.groupBy({
    by: ['utmSource'],
    _count: { utmSource: true },
    where: { startedAt: { gte: start, lte: end } },
    orderBy: { _count: { utmSource: 'desc' } },
    take: 50,
  });

  const topFundraisers = await prisma.fundraiser.findMany({ orderBy: { amountRaised: 'desc' }, take: 10, select: { id: true, title: true, slug: true, amountRaised: true, views: true, surveySupporters: true } });

  const compsByFundraiser = await prisma.surveyCompletion.groupBy({
    by: ['fundraiserId'],
    where: { completedAt: { gte: start, lte: end } },
    _count: { _all: true },
    _sum: { rewardAmount: true },
    orderBy: { _count: { _all: 'desc' } },
    take: 50,
  });

  const fundraiserIds = compsByFundraiser.map(c=>c.fundraiserId);
  const fundInfos = await prisma.fundraiser.findMany({ where: { id: { in: fundraiserIds } } });
  const perFund = compsByFundraiser.map((c)=>{
    const info = fundInfos.find(f=>f.id===c.fundraiserId);
    return { fundraiserId: c.fundraiserId, title: info?.title||'Unknown', slug: info?.slug||'', completions: c._count._all, revenue: c._sum.rewardAmount ?? 0, views: info?.views ?? 0, totalRaised: info?.amountRaised ?? 0 };
  });

  // Channel attribution: map referrers to channels
  const sessions = await prisma.surveySession.findMany({ where: { startedAt: { gte: start, lte: end } }, select: { referrer: true } });
  const { mapReferrerToChannel } = await import('@/app/lib/analytics');
  const channelCounts: Record<string, number> = {};
  for (const s of sessions) {
    const ch = mapReferrerToChannel(s.referrer);
    channelCounts[ch] = (channelCounts[ch] || 0) + 1;
  }

  const channels = Object.keys(channelCounts).map(k=>({ channel: k, count: channelCounts[k] }));

  return NextResponse.json({ timeSeries, sessionsStarted, completionsCount, totalRewards, conversionRate, utmSources, topFundraisers, perFund, channels });
}
