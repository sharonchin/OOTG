import CAFE_CATEGORY from "@/constants/CAFE_CATEGORY";
import CAFECATEGORY from "@/constants/CAFE_CATEGORY";
import { z } from "zod";

const phoneRegex = new RegExp(/^(0)(1)[0-46-9]*[0-9]{7,8}$/g);

export const RegisterCafeSchema = z
  .object({
    file: z.string().optional(),

    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required"),

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

    locId: z
      .string({
        required_error: "Location of cafe is required",
      })
      .min(1, "Location of cafe is required"),

    operatingHour: z
      .string({
        required_error: "Operating hour is required",
      })
      .min(1, "Operating hour is required"),

    cafeCategory: z.nativeEnum(CAFE_CATEGORY),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const LoginCafeSchema = z.object({
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

export type LoginCafeInput = z.infer<typeof LoginCafeSchema>;
export type RegisterCafeInput = z.infer<typeof RegisterCafeSchema>;
