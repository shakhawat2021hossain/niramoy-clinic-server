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

export const createDoctorZodSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(3, "Name should be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    registrationNumber: z.string(),
    designation: z.string(),
    qualification: z.string(),
    appointmentFee: z.number().min(0),
    currentWorkingPlace: z.string(),
    contactNumber: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
    address: z.string().optional()
});


