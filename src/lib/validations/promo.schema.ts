import PROMO_TYPE from "@/constants/PROMO_TYPE";
import { z } from "zod";

export const PromoCreationSchema = z.object({
  type: z.nativeEnum(PROMO_TYPE, {
    required_error: "Promo type is required!",
  }),

  discount: z.number().optional(),

  min_spend_amount: z.number().optional(),

  capped_amount: z.number().optional(),

  cafeId: z.string({
    required_error: "Cafe Id is required!",
  }),
});

export const PromoUpdateSchema = z.object({
  type: z.nativeEnum(PROMO_TYPE, {
    required_error: "Promo type is required!",
  }),

  discount: z.number().optional(),

  min_spend_amount: z.number().optional(),

  capped_amount: z.number().optional(),

  cafeId: z.string({
    required_error: "Cafe Id is required!",
  }),
});

export type CreatePromoInput = z.infer<typeof PromoCreationSchema>;
export type UpdatePromoInput = z.infer<typeof PromoUpdateSchema>;
