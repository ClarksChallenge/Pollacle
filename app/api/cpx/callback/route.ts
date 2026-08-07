import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";

function isSuccessStatus(status: string | null) {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return ["1", "success", "completed", "ok", "approved"].includes(normalized);
}

async function handleCpxCallback(params: Record<string, string | null>) {
  const status = params.status || null;
  const transId = params.trans_id || params.transId || null;
  const sessionId = params.sid || params.sessionId || null;
  const fundraiserId = params.subid_1 || params.fundraiserId || null;
  const userId = params.user_id || params.userId || null;
  const amountLocal = params.amount_local || params.amount || null;
  const incomingHash = params.hash || null;

  const secureHashSecret =
    process.env.CPX_CALLBACK_SECRET || process.env.CPX_SECURE_HASH_SECRET;

  if (!transId || !incomingHash || !secureHashSecret) {
    return new NextResponse("Missing baseline tracking data", { status: 400 });
  }

  const computedHash = crypto
    .createHash("md5")
    .update(`${transId}-${secureHashSecret}`)
    .digest("hex");

  if (incomingHash !== computedHash) {
    return new NextResponse("Security keys do not match", { status: 401 });
  }

  const success = isSuccessStatus(status);
  const rewardAmount = Number(amountLocal || "0") || 0;
  const now = new Date();

  const session = sessionId
    ? await prisma.surveySession.findUnique({ where: { id: sessionId } })
    : null;

  let fundraiser = null;
  if (session) {
    fundraiser = await prisma.fundraiser.findUnique({
      where: { id: session.fundraiserId },
    });
  }

  if (!fundraiser && fundraiserId) {
    fundraiser = await prisma.fundraiser.findUnique({
      where: { id: fundraiserId },
    });
  }

  if (!fundraiser) {
    return new NextResponse("Fundraiser not found", { status: 404 });
  }

  await prisma.surveyCompletion.upsert({
    where: { transactionId: transId },
    update: {
      userId: userId || undefined,
      rewardAmount,
      status: success ? "COMPLETED" : status || "FAILED",
      completedAt: success ? now : null,
    },
    create: {
      fundraiserId: fundraiser.id,
      userId: userId || undefined,
      provider: "CPX Research",
      transactionId: transId,
      rewardAmount,
      status: success ? "COMPLETED" : status || "FAILED",
      startedAt: now,
      completedAt: success ? now : null,
    },
  });

  if (success) {
    await prisma.fundraiser.update({
      where: { id: fundraiser.id },
      data: {
        surveySupporters: {
          increment: 1,
        },
        amountRaised: {
          increment: rewardAmount,
        },
      },
    });
  }

  if (session) {
    await prisma.surveySession.update({
      where: { id: session.id },
      data: {
        status: success ? "COMPLETED" : status || "FAILED",
        completedAt: now,
      },
    });
  }

  console.log(
    `CPX callback accepted: transaction=${transId} fundraiser=${fundraiser.id} amount=${rewardAmount} status=${status}`
  );

  return new NextResponse("1", { status: 200 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params: Record<string, string | null> = {};
  searchParams.forEach((value, key) => (params[key] = value));

  return handleCpxCallback(params);
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const params: Record<string, string | null> = {};

  if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      for (const [k, v] of Object.entries(body || {})) {
        params[k] = v == null ? null : String(v);
      }
    } catch (e) {
      return new NextResponse("Invalid JSON body", { status: 400 });
    }
  } else {
    try {
      const form = await request.formData();
      for (const [k, v] of form.entries()) {
        params[k] = typeof v === "string" ? v : String(v);
      }
    } catch (e) {
      // fallback to parsing url search string if form parsing fails
      const url = new URL(request.url);
      url.searchParams.forEach((value, key) => (params[key] = value));
    }
  }

  return handleCpxCallback(params);
}
