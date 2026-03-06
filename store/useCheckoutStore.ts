import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

export interface Address extends ShippingDetails {
  id: string;
}

interface CheckoutState {
  cart: CartItem[];
  addresses: Address[];
  selectedAddressId: string | null;
  shippingFee: number;
  setCart: (items: CartItem[]) => void;
  addAddress: (address: ShippingDetails) => void;
  selectAddress: (id: string) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      cart: [],
      addresses: [],
      selectedAddressId: null,
      shippingFee: 50,
      setCart: (items) => set({ cart: items }),
      addAddress: (details) =>
        set((state) => {
          const newAddress = {
            ...details,
            id: Math.random().toString(36).substring(2, 9),
          };
          return {
            addresses: [...state.addresses, newAddress],
            selectedAddressId: newAddress.id,
          };
        }),
      selectAddress: (id) => set({ selectedAddressId: id }),
    }),
    { name: "ecoyaan-checkout-storage" },
  ),
);
