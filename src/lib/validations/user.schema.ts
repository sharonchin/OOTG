import USERTYPE from "@/constants/USERTYPE";
import { z } from "zod";

export const LoginUserSchema = z.object({
  userType: z.nativeEnum(USERTYPE, {
    required_error: "Please choose your user type!",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
