import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");         
  const transId = searchParams.get("trans_id");       
  const userId = searchParams.get("user_id");         
  const amountLocal = searchParams.get("amount_local"); 
  const incomingHash = searchParams.get("hash");       

  const secureHashSecret = process.env.CPX_SECURE_HASH_SECRET;

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

  console.log(`SUCCESS: User ${userId} earned ${amountLocal} credits. Status: ${status}`);

  return new NextResponse("1", { status: 200 });
}
