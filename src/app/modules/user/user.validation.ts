import z from "zod";

const createPatientZodSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z
            .string({ message: "Name is required" })
            .min(3, "Name should be at least 3 char"),
        email: z.string({ message: "email is required" }),
        address: z.string().optional(),
    })
})


export const userValidations = {
    createPatientZodSchema
}