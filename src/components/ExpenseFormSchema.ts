import { z } from "zod";
import {format} from "date-fns";

export const ExpenseFormSchema = z.object({
    amount: z
        .string({ required_error: "Amount is required" })
        .min(1, "Amount is required"),
    name: z
        .string({ required_error: "Description is required" })
        .min(1, "Description is required"),
    category_name: z
        .string({ required_error: "Category is required" })
        .min(1, "Category is required"),
    date: z
        .date({ required_error: "Date is required" })
        .transform((date) => format(date, "yyyy-MM-dd")),
  });

export type ExpenseFormData = z.infer<typeof ExpenseFormSchema>;