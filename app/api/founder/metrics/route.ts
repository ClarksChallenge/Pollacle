import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions as any);

  if (!session?.user?.email || session.user.email !== process.env.FOUNDER_EMAIL) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const totalFundraisers = await prisma.fundraiser.count();

  const sums = await prisma.fundraiser.aggregate({
    _sum: {
      amountRaised: true,
      views: true,
      surveySupporters: true,
    },
  });

  const totalRaised = sums._sum.amountRaised ?? 0;
  const totalViews = sums._sum.views ?? 0;
  const totalSupporters = sums._sum.surveySupporters ?? 0;

  const totalSurveyCompletions = await prisma.surveyCompletion.count();

  const topFundraisers = await prisma.fundraiser.findMany({
    orderBy: { amountRaised: "desc" },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      amountRaised: true,
      views: true,
      surveySupporters: true,
    },
  });

  const topReferrers = await prisma.surveySession.groupBy({
    by: ["referrer"],
    _count: { referrer: true },
    orderBy: { _count: { referrer: "desc" } },
    take: 10,
  });

  return NextResponse.json({
    totalFundraisers,
    totalRaised,
    totalViews,
    totalSupporters,
    totalSurveyCompletions,
    topFundraisers,
    topReferrers,
  });
}
