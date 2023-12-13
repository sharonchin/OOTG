import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";
import { FilteredCafe } from "./Cafe.type";

export type Product = {
  id: string;
  createdAt: string;
  name: string;
  img: string;
  productCategory: string;
  desc: string;
  price: number;
  availability: boolean;
  cafeId: string;
  cafe: FilteredCafe;
};

export interface ProductResponse {
  status: string;
  data: {
    product: Product;
  };
}
export interface CartItemType {
  id: string;
  name: string;
  price: number;
  img: string;
  amount: number;
  quantity: number;
  noteToCafe: string;
  cafeId: string;
  cafe: FilteredCafe;
}

export interface CartType {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
  deliveryOption: DELIVERY_OPTION;
}

export interface ActionTypes {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  selectDeliveryOption: (option: DELIVERY_OPTION) => void;
  reset: () => void;
}
