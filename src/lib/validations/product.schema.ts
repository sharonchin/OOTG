import PRODUCT_CATEGORY from "@/constants/PRODUCT_CATEGORY";
import { z } from "zod";

export const ProductCreationSchema = z.object({
  img: z
    .string({
      required_error: "Please upload your picture.",
    })
    .min(1, "Please upload your picture"),

  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),

  price: z.number({
    required_error: "Price is required",
  }),

  desc: z.string().optional(),

  productCategory: z.nativeEnum(PRODUCT_CATEGORY),

  cafeId: z
    .string({
      required_error: "Cafe is required",
    })
    .min(1, "Cafe is required"),

  keywords: z
    .array(
      z
        .string({
          required_error: "Keywords are required",
        })
        .min(1, "Keywords are required")
    )
    .min(1, "Keywords are required"),
});

export const ProductUpdateSchema = z.object({
  img: z
    .string({
      required_error: "Please upload your picture.",
    })
    .min(1, "Please upload your picture"),

  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),

  price: z.number({
    required_error: "Price is required",
  }),

  desc: z.string().optional(),

  productCategory: z.nativeEnum(PRODUCT_CATEGORY),
});

export type CreateProductInput = z.infer<typeof ProductCreationSchema>;
export type UpdateProductInput = z.infer<typeof ProductUpdateSchema>;
