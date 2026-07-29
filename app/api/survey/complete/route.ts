import { NextResponse } from "next/server";

// Survey credits may only come from the authenticated provider callback.
export async function POST() {
  return NextResponse.json(
    { error: "Survey credits are only accepted from the configured provider callback." },
    { status: 410 }
  );
}
