import { prisma } from "@/app/lib/prisma";

// GET all fundraisers
export async function GET() {
  try {
    const fundraisers = await prisma.fundraiser.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(fundraisers);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to fetch fundraisers", details: error?.message },
      { status: 500 }
    );
  }
}

// CREATE fundraiser
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔥 INCOMING FUNDRAISER DATA:", body);

    const { title, story, category, goalAmount, slug } = body;

    if (!title || !story || !slug) {
      console.log("❌ VALIDATION FAILED");
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await prisma.fundraiser.create({
      data: {
        title,
        story,
        category: category || "general",
        goalAmount: Number(goalAmount || 0),
        slug,
      },
    });

    console.log("✅ CREATED FUNDRAISER:", result);

    return Response.json(result);
  } catch (error: any) {
    console.error("🔥 PRISMA ERROR FULL:", error);

    return Response.json(
      {
        error: "Backend crash",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
