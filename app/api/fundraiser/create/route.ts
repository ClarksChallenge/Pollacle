import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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

    // Make sure the slug is unique
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
