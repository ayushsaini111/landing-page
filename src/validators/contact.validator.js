import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    query: z.string().min(10, "Please describe your case"),
});
