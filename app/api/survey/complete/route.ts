import { getAllFundraisers } from "../../lib/fundraiserStore";

export async function POST(req: Request) {
  const { fundraiserId } = await req.json();

  const fundraisers = getAllFundraisers();

  const target = fundraisers.find((f) => f.id === fundraiserId);

  if (target) {
    target.currentImpact += 5;
    target.cpxSessionsCompleted += 1;
  }

  return Response.json({ success: true });
}