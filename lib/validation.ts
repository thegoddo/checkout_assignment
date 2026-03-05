import { z } from "zod";

export const shippingSchema = z.object({
    fullName: z.string().min(3, "Full Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    pinCode: z.string().length(6, "PIN code must be at least 6 digits"),
    city:z.string().min(1,"City is required"),
    state: z.string().min(1, "State is required"),
})