import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import FounderCharts from '@/components/FounderCharts';
import FounderMetricsClient from '@/components/FounderMetricsClient';

export default async function FounderDashboard() {
  const session = await getServerSession(authOptions as any);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.email !== process.env.FOUNDER_EMAIL) {
    redirect("/");
  }

  const totalFundraisers = await prisma.fundraiser.count();

  const sums = await prisma.fundraiser.aggregate({
    _sum: { amountRaised: true, views: true, surveySupporters: true },
  });

  const totalRaised = sums._sum.amountRaised ?? 0;
  const totalViews = sums._sum.views ?? 0;
  const totalSupporters = sums._sum.surveySupporters ?? 0;

  const topFundraisers = await prisma.fundraiser.findMany({
    orderBy: { amountRaised: "desc" },
    take: 6,
  });

  const topReferrers = await prisma.surveySession.groupBy({
    by: ["referrer"],
    _count: { referrer: true },
    orderBy: { _count: { referrer: "desc" } },
    take: 10,
  });

  // Build last 30 days time series for completions
  const start = new Date();
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  const completions = await prisma.surveyCompletion.findMany({
    where: {
      completedAt: { not: null },
      completedAt: { gte: start },
    },
    select: { completedAt: true },
  });

  const buckets: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    buckets[key] = 0;
  }

  for (const c of completions) {
    const key = c.completedAt!.toISOString().slice(0, 10);
    if (buckets[key] !== undefined) buckets[key] += 1;
  }

  const timeSeries = Object.keys(buckets).sort().map((k) => ({ date: k, count: buckets[k] }));

  // Conversion & revenue metrics for last 30 days
  const sessionsStarted = await prisma.surveySession.count({ where: { startedAt: { gte: start } } });
  const completionsCount = await prisma.surveyCompletion.count({ where: { completedAt: { gte: start } } });

  const rewardsAgg = await prisma.surveyCompletion.aggregate({
    where: { completedAt: { gte: start } },
    _sum: { rewardAmount: true },
  });

  const totalRewards = rewardsAgg._sum.rewardAmount ?? 0;
  const conversionRate = sessionsStarted ? +(completionsCount / sessionsStarted).toFixed(3) : 0;

  // UTM source breakdown
  const utmSources = await prisma.surveySession.groupBy({
    by: ["utmSource"],
    _count: { utmSource: true },
    where: { startedAt: { gte: start } },
    orderBy: { _count: { utmSource: "desc" } },
    take: 20,
  });

  // Per-fundraiser completions & revenue in period
  const compsByFundraiser = await prisma.surveyCompletion.groupBy({
    by: ["fundraiserId"],
    where: { completedAt: { gte: start } },
    _count: { _all: true },
    _sum: { rewardAmount: true },
    orderBy: { _count: { _all: "desc" } },
    take: 20,
  });

  const fundraiserIds = compsByFundraiser.map((c) => c.fundraiserId);
  const fundInfos = await prisma.fundraiser.findMany({ where: { id: { in: fundraiserIds } } });

  const perFund = compsByFundraiser.map((c) => {
    const info = fundInfos.find((f) => f.id === c.fundraiserId);
    return {
      fundraiserId: c.fundraiserId,
      title: info?.title || 'Unknown',
      slug: info?.slug || '',
      completions: c._count._all,
      revenue: c._sum.rewardAmount ?? 0,
      views: info?.views ?? 0,
      totalRaised: info?.amountRaised ?? 0,
    };
  });

  const initialData = { timeSeries, sessionsStarted, completionsCount, totalRewards, conversionRate, utmSources, topFundraisers, perFund };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">Founder Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Overview of site-wide metrics</p>
          </div>
          <Link href="/dashboard" className="text-sm text-blue-600">Creator view</Link>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Fundraisers</div>
            <div className="text-2xl font-bold mt-2">{totalFundraisers}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Total Raised</div>
            <div className="text-2xl font-bold text-green-600 mt-2">${totalRaised.toFixed(2)}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">{totalViews}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Survey Completions</div>
            <div className="text-2xl font-bold text-purple-700 mt-2">{totalSupporters}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Sessions Started (30d)</div>
            <div className="text-2xl font-bold mt-2">{sessionsStarted}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Completions (30d)</div>
            <div className="text-2xl font-bold text-purple-700 mt-2">{completionsCount}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Conversion Rate</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">{(conversionRate * 100).toFixed(1)}%</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Rewards Paid (30d)</div>
            <div className="text-2xl font-bold text-green-600 mt-2">${totalRewards.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Top Fundraisers</h3>
            <ul className="space-y-3">
              {topFundraisers.map((f) => (
                <li key={f.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-gray-500">{f.slug}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${f.amountRaised.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{f.views} views</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FounderMetricsClient initialData={initialData} defaultStart={start.toISOString().slice(0,10)} defaultEnd={new Date().toISOString().slice(0,10)} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h3 className="font-semibold mb-4">Per-Fundraiser (30d)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="py-2">Fundraiser</th>
                  <th className="py-2">Completions</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">Views</th>
                  <th className="py-2">Total Raised</th>
                </tr>
              </thead>
              <tbody>
                {perFund.map((p) => (
                  <tr key={p.fundraiserId} className="border-t">
                    <td className="py-3">{p.title}</td>
                    <td className="py-3">{p.completions}</td>
                    <td className="py-3">${p.revenue.toFixed(2)}</td>
                    <td className="py-3">{p.views}</td>
                    <td className="py-3">${p.totalRaised.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
