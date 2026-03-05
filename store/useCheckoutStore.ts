import { create } from "zustand";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutState {
  cart: CartItem[];
  shipping: ShippingDetails;
  shippingFee: number;
  setCart: (items: CartItem[]) => void;
  setShipping: (details: ShippingDetails) => void;
}
export const useCheckoutStore = create<CheckoutState>((set) => ({
  cart: [],
  shipping: {
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  },
  shippingFee: 50,
  setCart: (items) => set({ cart: items }),
  setShipping: (details) => set({ shipping: details }),
}));
