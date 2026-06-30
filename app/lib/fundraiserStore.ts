import { Fundraiser } from "./fundraiser";

let fundraisers: Fundraiser[] = [];

export function createFundraiser(data: Omit<Fundraiser, "id" | "createdAt" | "currentImpact" | "cpxSessionsCompleted">) {
  const newFundraiser: Fundraiser = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),

    currentImpact: 0,
    cpxSessionsCompleted: 0,

    ...data,
  };

  fundraisers.push(newFundraiser);

  return newFundraiser;
}

export function getAllFundraisers() {
  return fundraisers;
}