import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

function csvEscape(s: any) {
  if (s === null || s === undefined) return '';
  const str = String(s);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) return `"${str.replace(/"/g,'""')}"`;
  return str;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email || session.user.email !== process.env.FOUNDER_EMAIL) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get('type') || 'perFund';
  const start = url.searchParams.get('start') ? new Date(url.searchParams.get('start')!) : ((): Date => { const d=new Date(); d.setDate(d.getDate()-29); d.setHours(0,0,0,0); return d; })();
  const end = url.searchParams.get('end') ? new Date(url.searchParams.get('end')!) : new Date();
  end.setHours(23,59,59,999);

  if (type === 'perFund') {
    const compsByFundraiser = await prisma.surveyCompletion.groupBy({
      by: ['fundraiserId'],
      where: { completedAt: { gte: start, lte: end } },
      _count: { _all: true },
      _sum: { rewardAmount: true },
      orderBy: { _count: { _all: 'desc' } },
      take: 100,
    });

    const fundraiserIds = compsByFundraiser.map(c=>c.fundraiserId);
    const fundInfos = await prisma.fundraiser.findMany({ where: { id: { in: fundraiserIds } } });

    let csv = 'Fundraiser,Completions,Revenue\n';
    for (const c of compsByFundraiser) {
      const info = fundInfos.find(f=>f.id===c.fundraiserId);
      csv += `${csvEscape(info?.title||c.fundraiserId)},${c._count._all},${(c._sum.rewardAmount||0).toFixed(2)}\n`;
    }

    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': `attachment; filename="per-fundraiser-${start.toISOString().slice(0,10)}-${end.toISOString().slice(0,10)}.csv"` } });
  }

  // utm export
  if (type === 'utm') {
    const utm = await prisma.surveySession.groupBy({
      by: ['utmSource'],
      _count: { utmSource: true },
      where: { startedAt: { gte: start, lte: end } },
      orderBy: { _count: { utmSource: 'desc' } },
      take: 200,
    });
    let csv = 'UTM Source,Count\n';
    for (const u of utm) csv += `${csvEscape(u.utmSource||'Direct')},${u._count.utmSource}\n`;
    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': `attachment; filename="utm-${start.toISOString().slice(0,10)}-${end.toISOString().slice(0,10)}.csv"` } });
  }

  return NextResponse.json({ error: 'unknown type' }, { status: 400 });
}
