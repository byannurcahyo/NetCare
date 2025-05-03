import { z } from "zod";
import type { ZodSchema } from "zod";

export const REGISTER_USER_SCHEMA: ZodSchema = z.object({
    fullName: z.string().min(5, {
        message: "Name must be at least 5 characters",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
});

export const LOGIN_USER_SCHEMA: ZodSchema = z.object({
    email: z.string().email({
        message: "Email not valid",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
});
