import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";
import { buildCpxLaunchUrl, CpxConfigurationError } from "@/app/lib/cpx";

const surveyStartRateLimiter = new Map<string, number[]>();

function getClientIdentifier(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fundraiserSlug, referrer, utmSource, utmMedium, utmCampaign } = body;

    const userAgent = req.headers.get("user-agent") || "";
    if (/bot|crawl|spider|headless|curl|python/i.test(userAgent)) {
      return NextResponse.json({ error: "Automated traffic is not permitted." }, { status: 403 });
    }

    const clientId = getClientIdentifier(req);
    const now = Date.now();
    const windowMs = 5 * 60 * 1000;
    const recentStarts = (surveyStartRateLimiter.get(clientId) || []).filter((timestamp) => now - timestamp < windowMs);

    if (recentStarts.length >= 3) {
      return NextResponse.json({ error: "Too many survey starts from this connection. Please try again later." }, { status: 429 });
    }

    recentStarts.push(now);
    surveyStartRateLimiter.set(clientId, recentStarts);

    if (!fundraiserSlug) {
      return NextResponse.json({ error: "Missing fundraiser slug" }, { status: 400 });
    }

    const fundraiser = await prisma.fundraiser.findUnique({
      where: {
        slug: fundraiserSlug,
      },
    });

    if (!fundraiser || fundraiser.status !== "ACTIVE") {
      return NextResponse.json({ error: "Fundraiser not found" }, { status: 404 });
    }

    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      return NextResponse.json({ error: "Platform is not configured for public use." }, { status: 403 });
    }

    const founder = await prisma.user.findUnique({ where: { email: founderEmail } });
    if (!founder || fundraiser.userId !== founder.id) {
      return NextResponse.json({ error: "Fundraiser not available" }, { status: 403 });
    }

    await prisma.fundraiser.update({
      where: {
        id: fundraiser.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const session = await prisma.surveySession.create({
      data: {
        fundraiserId: fundraiser.id,
        userId: fundraiser.userId || fundraiser.id,
        status: "STARTED",
        provider: "CPX Research",
        referrer: referrer || "Direct",
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
    });

    const surveyUrl = buildCpxLaunchUrl(session.id, fundraiser.userId || fundraiser.id);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      fundraiser: {
        id: fundraiser.id,
        title: fundraiser.title,
        slug: fundraiser.slug,
      },
      surveyUrl,
    });
  } catch (error) {
    if (error instanceof CpxConfigurationError) {
      logServerError("survey-start", error);
      return NextResponse.json(
        { error: "Surveys are not configured yet. Please try again later." },
        { status: 503 }
      );
    }
    logServerError("survey-start", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
