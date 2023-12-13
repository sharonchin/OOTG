import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";
import { FilteredCafe } from "./Cafe.type";
import PROMO_TYPE from "@/constants/PROMO_TYPE";

export type Promo = {
  id: string;
  createdAt: string;
  type: PROMO_TYPE;
  discount: number;
  min_spend_amount: number;
  capped_amount: number;
  amount?: number;
  status: boolean;
  cafeId: string;
};

export interface PromoResponse {
  status: string;
  data: {
    promo: Promo;
  };
}
