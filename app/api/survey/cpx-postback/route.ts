import { NextResponse } from "next/server";
import { validateCPXSignature, recordCPXCompletion } from "@/app/lib/cpx";
import { CPXPostbackSchema } from "@/app/lib/validation";
import { checkRateLimit } from "@/app/lib/rateLimit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      user_id: searchParams.get("user_id") || "",
      offer_id: searchParams.get("offer_id") || "",
      payout: searchParams.get("payout") || "0",
      hash: searchParams.get("hash") || undefined,
      custom: searchParams.get("custom") || "",
    };

    const validation = CPXPostbackSchema.safeParse(params);
    if (!validation.success) {
      console.warn("Invalid CPX postback:", validation.error.issues);
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const { user_id, offer_id, payout, hash, custom: fundraiserSlug } =
      validation.data;

    try {
      validateCPXSignature({
        user_id,
        offer_id,
        payout: payout.toString(),
        hash,
      });
    } catch (error: any) {
      console.error("CPX signature validation failed:", error.message);
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Signature validation failed" },
          { status: 403 }
        );
      }
    }

    if (!checkRateLimit(`cpx:${user_id}`, 50, 3600000)) {
      console.warn(`CPX user ${user_id} rate limited`);
      return NextResponse.json(
        { error: "Rate limited" },
        { status: 429 }
      );
    }

    const sessionId = `cpx_${user_id}_${offer_id}_${Date.now()}`;
    const payoutAmount = typeof payout === "string" ? parseFloat(payout) : payout;

    const completion = await recordCPXCompletion({
      fundraiserSlug,
      cpxSessionId: sessionId,
      cpxUserId: user_id,
      cpxOfferId: offer_id,
      cpxPayout: payoutAmount,
    });

    console.info(
      `CPX completion recorded: ${fundraiserSlug} +${payoutAmount} (User: ${user_id})`
    );

    return NextResponse.json({ status: "ok", success: true });
  } catch (error: any) {
    console.error("CPX Postback Error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = new URLSearchParams(body);
    const url = new URL(request.url);
    url.search = params.toString();
    const getRequest = new Request(url, { method: "GET" });
    return GET(getRequest);
  } catch (error) {
    console.error("CPX POST handler error:", error);
    return NextResponse.json(
      { status: "error", error: "Invalid request" },
      { status: 400 }
    );
  }
}
