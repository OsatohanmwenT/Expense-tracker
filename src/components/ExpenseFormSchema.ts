import { z } from "zod";

export const ExpenseFormSchema = z.object({
    amount: z
        .string({ required_error: "Amount is required" })
        .min(1, "Amount is required"),
    description: z
        .string({ required_error: "Description is required" })
        .min(1, "Description is required"),
    category: z
        .string({ required_error: "Category is required" })
        .min(1, "Category is required"),
    date: z
        .date({ required_error: "Date is required" })
        .transform((date) => date.toISOString().split("T")[0]),
  });

export type ExpenseFormData = z.infer<typeof ExpenseFormSchema>;