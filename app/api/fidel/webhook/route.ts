import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.text();

  console.log("========== FIDEL WEBHOOK TEST ==========");
  console.log(payload);
  console.log("=========================================");

  return NextResponse.json({ ok: true });
}
