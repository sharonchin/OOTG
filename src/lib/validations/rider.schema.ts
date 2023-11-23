import DELIVERY_MODE from "@/constants/DELIVERY_MODE";
import { z } from "zod";

const phoneRegex = new RegExp(/^(0)(1)[0-46-9]*[0-9]{7,8}$/g);

export const RegisterRiderSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "First name is required"),

    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .min(1, "Last name is required"),
      
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

    confirmPassword: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),

    phoneNo: z
      .string({
        required_error: "Phone number is required",
      })
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Phone number is invalid"),

    deliveryMode: z.nativeEnum(DELIVERY_MODE),

    vehicleNo: z
      .string({
        required_error: "Vehicle number is required",
      })
      .min(1, "Vehicle number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const LoginRiderSchema = z.object({
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

export type LoginRiderInput = z.infer<typeof LoginRiderSchema>;
export type RegisterRiderInput = z.infer<typeof RegisterRiderSchema>;
