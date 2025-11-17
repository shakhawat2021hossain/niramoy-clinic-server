import z from "zod";

export const createPatientZodSchema = z.object({
    password: z
        .string(),
    name: z
        .string({ message: "Name is required" })
        .min(3, "Name should be at least 3 char"),
    email: z
        .string({ message: "email is required" }),
    address: z
        .string()
        .optional(),
})

