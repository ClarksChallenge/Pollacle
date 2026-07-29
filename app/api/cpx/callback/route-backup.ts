import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { safeCompare, logServerError } from "@/app/lib/server-helpers";

/**
 * CPX must be configured to POST JSON containing sessionId, reward, secret,
 * and its transactionId. Credits are applied atomically and only once.
 */
export async function POST(req: Request) {
  try {
    const { sessionId, reward, secret, transactionId } = await req.json();

    if (!safeCompare(secret, process.env.CPX_CALLBACK_SECRET)) {
      return NextResponse.json({ error: "Unauthorized CPX callback" }, { status: 401 });
    }
    if (typeof sessionId !== "string" || !sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const rewardAmount = Number(reward);
    if (!Number.isFinite(rewardAmount) || rewardAmount <= 0) {
      return NextResponse.json({ error: "Invalid reward amount" }, { status: 400 });
    }

    const session = await prisma.surveySession.findUnique({ where: { id: sessionId } });
    if (!session) {
      return NextResponse.json({ error: "Survey session not found" }, { status: 404 });
    }

    const credited = await prisma.$transaction(async (tx) => {
      // updateMany makes concurrent callbacks idempotent: only the first one
      // can transition a STARTED session to COMPLETED.
      const claimed = await tx.surveySession.updateMany({
        where: { id: session.id, status: "STARTED" },
        data: { status: "COMPLETED", completedAt: new Date() },
      });
      if (claimed.count === 0) return false;

      await tx.surveyCompletion.create({
        data: {
          fundraiserId: session.fundraiserId,
          provider: "CPX Research",
          transactionId: typeof transactionId === "string" ? transactionId : null,
          rewardAmount,
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
      await tx.fundraiser.update({
        where: { id: session.fundraiserId },
        data: {
          amountRaised: { increment: rewardAmount },
          surveySupporters: { increment: 1 },
        },
      });
      return true;
    });

    return NextResponse.json({
      success: true,
      message: credited ? "Survey credited successfully" : "Survey already credited",
      rewardAmount: credited ? rewardAmount : undefined,
    });
  } catch (error) {
    logServerError("cpx-callback", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
