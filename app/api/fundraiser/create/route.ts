import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { CreateFundraiserSchema } from "@/app/lib/validation";
import { checkRateLimit } from "@/app/lib/rateLimit";

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`create:${ip}`, 50, 3600000)) {
      return NextResponse.json(
        { error: "Too many fundraiser creation requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = CreateFundraiserSchema.safeParse(body);
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

    const { title, story, goalAmount, category } = validation.data;

    let slug = createSlug(title);
    let counter = 1;

    while (await prisma.fundraiser.findUnique({ where: { slug } })) {
      slug = `${createSlug(title)}-${counter}`;
      counter++;
    }

    const fundraiser = await prisma.$transaction(async (tx) => {
      return await tx.fundraiser.create({
        data: {
          slug,
          title,
          story,
          category,
          goalAmount,
          amountRaised: 0,
          surveySupporters: 0,
          cashDonations: 0,
          status: "ACTIVE",
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        slug: fundraiser.slug,
        message: "Fundraiser created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Fundraiser creation error:", error);

    return NextResponse.json(
      {
        error: "Unable to create fundraiser. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
