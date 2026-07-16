import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";

// GET FEATURED ACTIVE FUNDRAISERS (founder-only during launch)
export async function GET() {
  try {
    const founderEmail = process.env.FOUNDER_EMAIL;

    if (!founderEmail) {
      return Response.json([], { status: 200 });
    }

    const founder = await prisma.user.findUnique({ where: { email: founderEmail } });

    if (!founder) return Response.json([], { status: 200 });

    const fundraisers = await prisma.fundraiser.findMany({
      where: { status: "ACTIVE", userId: founder.id },
      orderBy: { createdAt: "asc" },
      take: 6,
    });

    return Response.json(fundraisers);
  } catch (error: any) {
    logServerError("fundraiser-list", error);
    return Response.json({ error: "Failed to fetch fundraisers" }, { status: 500 });
  }
}
