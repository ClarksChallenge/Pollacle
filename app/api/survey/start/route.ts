import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fundraiserSlug,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign, } = body;

    if (!fundraiserSlug) {
      return NextResponse.json(
        {
          error: "Missing fundraiser slug",
        },
        {
          status: 400,
        }
      );
    }

    const fundraiser = await prisma.fundraiser.findUnique({
      where: {
        slug: fundraiserSlug,
      },
    });

    if (!fundraiser) {
      return NextResponse.json(
        {
          error: "Fundraiser not found",
        },
        {
          status: 404,
        }
      );
    }

    // Ensure fundraiser is the founder's during single-founder launch
    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      return NextResponse.json({ error: "Platform is not configured for public use." }, { status: 403 });
    }

    const founder = await prisma.user.findUnique({ where: { email: founderEmail } });
    if (!founder || fundraiser.userId !== founder.id) {
      return NextResponse.json({ error: "Fundraiser not available" }, { status: 403 });
    }

    // Count this visit
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

    // Create a Survey Session
    const session = await prisma.surveySession.create({
      data: {
        fundraiserId: fundraiser.id,
        status: "STARTED",
        provider: "CPX Research",
        referrer: referrer || "Direct",
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,

      },
    });

    // Placeholder CPX URL
    // Replace with the real CPX launch URL after approval
    const surveyUrl = `https://offers.cpx-research.com/?sid=${session.id}`;

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
    logServerError("survey-start", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
