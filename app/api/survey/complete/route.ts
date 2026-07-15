import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { SurveyCompleteSchema } from "@/app/lib/validation";
import { checkRateLimit } from "@/app/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`survey:${ip}`, 100, 3600000)) {
      return NextResponse.json(
        { error: "Rate limited. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = SurveyCompleteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { slug, reward } = validation.data;
    const fundraiser = await prisma.fundraiser.findUnique({
      where: { slug },
    });

    if (!fundraiser) {
      return NextResponse.json(
        { error: "Fundraiser not found" },
        { status: 404 }
      );
    }

    if (fundraiser.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This fundraiser is not currently accepting support" },
        { status: 403 }
      );
    }

    const updated = await prisma.$transaction(async (tx) => {
      return await tx.fundraiser.update({
        where: { slug },
        data: {
          amountRaised: { increment: reward },
          surveySupporters: { increment: 1 },
          surveyCompletions: {
            create: {
              provider: "Pollacle Test Survey",
              rewardAmount: reward,
            },
          },
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        fundraiser: {
          slug: updated.slug,
          amountRaised: updated.amountRaised,
          surveySupporters: updated.surveySupporters,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Survey completion error:", error);

    return NextResponse.json(
      {
        error: "Server error processing survey completion",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
