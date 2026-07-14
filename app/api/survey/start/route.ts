import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fundraiserSlug } = body;

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
    console.error(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
