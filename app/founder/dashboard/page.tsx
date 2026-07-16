import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

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

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Top Referrers</h3>
            <ul className="space-y-2">
              {topReferrers.map((r) => (
                <li key={r.referrer} className="flex items-center justify-between">
                  <div className="truncate">{r.referrer || "Direct"}</div>
                  <div className="text-sm text-gray-600">{r._count.referrer}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
