import { createFundraiser, getAllFundraisers } from "../../lib/fundraiserStore";

export async function GET() {
  return Response.json(getAllFundraisers());
}

export async function POST(req: Request) {
  const body = await req.json();

  const fundraiser = createFundraiser(body);

  return Response.json(fundraiser);
}