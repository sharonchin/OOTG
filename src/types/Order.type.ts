import STATUS from "@/constants/STATUS";
import { CartItemType } from "./Product.type";
import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";
import { FilteredStudent } from "@/types/Student.type";
import { FilteredCafe } from "./Cafe.type";

export type Order = {
  id: string;
  createdAt: string;
  totalPrice: number;
  intendId?: string;
  studentId: string;
  paymentType: string;
  products: CartItemType[];
  status: STATUS;
  cafeId: string;
  deliveryOption: DELIVERY_OPTION;
  student: FilteredStudent;
  cafe: FilteredCafe;
};
