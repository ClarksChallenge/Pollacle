import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  try {
    // Require login
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Please sign in first.",
        },
        {
          status: 401,
        }
      );
    }

    // Find the logged-in user
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

    const body = await request.json();

    const {
      title,
      story,
      goalAmount,
      category,
    } = body;

    if (
      !title ||
      !story ||
      !goalAmount ||
      !category
    ) {
      return NextResponse.json(
        {
          error: "Please complete all fields.",
        },
        {
          status: 400,
        }
      );
    }

    let slug = createSlug(title);

    let counter = 1;

    while (
      await prisma.fundraiser.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug = `${createSlug(title)}-${counter}`;
      counter++;
    }

    const fundraiser = await prisma.fundraiser.create({
      data: {
        userId: user.id,

        slug,
        title,
        story,
        category,

        goalAmount: Number(goalAmount),

        amountRaised: 0,
        surveySupporters: 0,
        cashDonations: 0,

        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      success: true,
      slug: fundraiser.slug,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create fundraiser.",
      },
      {
        status: 500,
      }
    );
  }
}
