import DELIVERY_OPTION from "@/constants/DELIVERY_OPTION";
import { ActionTypes, CartType } from "@/types/Product.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0 as number,
  deliveryOption: "DELIVERY" as DELIVERY_OPTION,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      deliveryOption: INITIAL_STATE.deliveryOption,
      addToCart(item) {
        set((state) => ({
          products: [...state.products, item],
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.amount,
        }));
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.amount,
        }));
      },
      selectDeliveryOption(option) {
        set((state) => ({ ...state, deliveryOption: option }));
      },
      reset: () => set({ products: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "cart", skipHydration: true }
  )
);
