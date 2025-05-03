import { z } from "zod";
import type { ZodSchema } from "zod";

export const CREATE_TRANSACTION_SCHEMA: ZodSchema = z.object({
    userId: z.string().min(1, {
        message: "User ID is required",
    }),
    fullName: z.string().min(1, {
        message: "Name is required",
    }),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number too long")
        .regex(/^\d+$/, "Must contain only numbers"),
    packageId: z.string().min(1, {
        message: "Package ID is required",
    }),
    packageName: z.string().min(1, {
        message: "Package name is required",
    }),
    price: z.number().min(1, {
        message: "Price is required",
    }),
    status: z.enum(["pending", "success", "failed"]).refine((val) => !!val, {
        message: "Status is required",
    }),
    date: z.string().min(1, {
        message: "Date is required",
    }),
});

export const UPDATE_TRANSACTION_SCHEMA: ZodSchema = z.object({
    userId: z.string().optional(),
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    packageId: z.string().optional(),
    packageName: z.string().optional(),
    price: z.number().optional(),
    status: z.enum(["pending", "success", "failed"]).refine((val) => !!val, {
        message: "Status is required",
    }),
    date: z.string().optional(),
});
