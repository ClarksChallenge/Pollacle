export type Fundraiser = {
  id: string;
  userId: string;

  title: string;

  goalAmount?: number;
  currentImpact: number;

  causeType: "self" | "school" | "nonprofit" | "club" | "other";

  createdAt: string;

  cpxSessionsCompleted: number;
};