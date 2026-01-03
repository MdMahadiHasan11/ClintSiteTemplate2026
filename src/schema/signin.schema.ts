import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const otpSchema = z.object({
  identifier: z.string(),
  otp: z.string().min(6, "otp must be at least 6 characters"),
});
