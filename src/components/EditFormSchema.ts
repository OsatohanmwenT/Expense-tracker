import {z} from "zod";

const formSchema = z.object({
    amount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
    description: z.string(),
    category: z.string(),
});

export type formData = z.infer<typeof formSchema>

export default formSchema;

