import { z } from "zod";

export const ExpenseFormSchema = z.object({
    amount: z.string({ required_error: "Amount is required" }),
    description: z.string({ required_error: "Description is required" }),
    category: z.string({ required_error: "Category is required" }),
    date: z.date({ required_error: "Date is required" }),
  });