import { z } from "zod";

export const CreateFundraiserSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  story: z
    .string()
    .min(20, "Story must be at least 20 characters")
    .max(5000, "Story must be less than 5000 characters")
    .trim(),
  goalAmount: z
    .number()
    .int("Goal amount must be a whole number")
    .min(1, "Goal amount must be at least $1")
    .max(1000000, "Goal amount cannot exceed $1,000,000"),
  category: z.enum(
    ["Medical", "Animals", "Education", "Community", "Emergency", "Other"],
    { errorMap: () => ({ message: "Invalid category selected" }) }
  ),
});

export type CreateFundraiserInput = z.infer<typeof CreateFundraiserSchema>;

export const SurveyCompleteSchema = z.object({
  slug: z
    .string()
    .min(1, "Fundraiser slug is required")
    .max(200, "Invalid fundraiser"),
  reward: z
    .number()
    .min(0, "Reward cannot be negative")
    .max(100, "Reward amount too high")
    .optional()
    .default(1.5),
});

export type SurveyCompleteInput = z.infer<typeof SurveyCompleteSchema>;

export const CPXPostbackSchema = z.object({
  user_id: z.string().min(1, "User ID required"),
  offer_id: z.string().min(1, "Offer ID required"),
  payout: z
    .string()
    .or(z.number())
    .refine(
      (val) => {
        const num = typeof val === "string" ? parseFloat(val) : val;
        return num >= 0 && num <= 100;
      },
      "Invalid payout amount"
    ),
  hash: z.string().optional(),
  custom: z.string().min(1, "Fundraiser slug required"),
});

export type CPXPostbackInput = z.infer<typeof CPXPostbackSchema>;
