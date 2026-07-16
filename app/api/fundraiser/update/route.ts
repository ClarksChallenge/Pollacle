import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";
import { authOptions } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    // Founder must be logged in
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Find logged in user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const formData = await request.formData();

    const fundraiserId = formData.get("id") as string;

    if (!fundraiserId) {
      return NextResponse.json(
        {
          error: "Missing fundraiser id.",
        },
        {
          status: 400,
        }
      );
    }

    // Verify ownership
    const fundraiser = await prisma.fundraiser.findFirst({
      where: {
        id: fundraiserId,
        userId: user.id,
      },
    });

    if (!fundraiser) {
      return NextResponse.json(
        {
          error: "You do not have permission to edit this fundraiser.",
        },
        {
          status: 403,
        }
      );
    }

    const title = (formData.get("title") as string)?.trim();
    const story = (formData.get("story") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const goalAmount = Number(formData.get("goalAmount"));

    if (!title || !story || !category || isNaN(goalAmount)) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.fundraiser.update({
      where: {
        id: fundraiser.id,
      },
      data: {
        title,
        story,
        category,
        goalAmount,
      },
    });

    return NextResponse.redirect(
      new URL("/founder/edit?saved=1", request.url),
      303
    );
  } catch (error) {
    logServerError("fundraiser-update", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
