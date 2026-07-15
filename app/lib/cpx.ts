import { prisma } from "./prisma";
import crypto from "crypto";

export function validateCPXSignature(params: {
  user_id: string;
  offer_id: string;
  payout: string;
  hash?: string;
}): boolean {
  if (!params.hash) {
    console.warn("CPX postback received without hash signature");
    return true;
  }

  const apiKey = process.env.CPX_API_KEY;
  if (!apiKey) {
    throw new Error("CPX_API_KEY environment variable not set");
  }

  const expectedHash = crypto
    .createHash("md5")
    .update(`${params.user_id}${params.offer_id}${params.payout}${apiKey}`)
    .digest("hex");

  if (params.hash !== expectedHash) {
    throw new Error("Invalid CPX signature - possible tampering detected");
  }

  return true;
}

export async function recordCPXCompletion(params: {
  fundraiserSlug: string;
  cpxSessionId: string;
  cpxUserId: string;
  cpxOfferId: string;
  cpxPayout: number;
}) {
  const fundraiser = await prisma.fundraiser.findUnique({
    where: { slug: params.fundraiserSlug },
  });

  if (!fundraiser) {
    throw new Error("Fundraiser not found");
  }

  if (fundraiser.status !== "ACTIVE") {
    throw new Error("Fundraiser is not currently active");
  }

  const existing = await prisma.surveyCompletion.findUnique({
    where: { cpxSessionId: params.cpxSessionId },
  });

  if (existing) {
    console.warn(
      `CPX session ${params.cpxSessionId} already recorded for fundraiser ${params.fundraiserSlug}`
    );
    return existing;
  }

  const completion = await prisma.$transaction(async (tx) => {
    const survey = await tx.surveyCompletion.create({
      data: {
        fundraiserId: fundraiser.id,
        provider: "CPX Research",
        rewardAmount: params.cpxPayout,
        cpxSessionId: params.cpxSessionId,
        cpxUserId: params.cpxUserId,
        cpxOfferId: params.cpxOfferId,
        cpxPayout: params.cpxPayout,
      },
    });

    await tx.fundraiser.update({
      where: { id: fundraiser.id },
      data: {
        amountRaised: { increment: params.cpxPayout },
        surveySupporters: { increment: 1 },
        cpxSessionsCompleted: { increment: 1 },
      },
    });

    return survey;
  });

  return completion;
}

export function formatCPXPayout(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
