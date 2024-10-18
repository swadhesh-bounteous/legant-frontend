import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import { ProductApi } from "@/types/ProductApi";

type CartItem = ProductApi & {
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: ProductApi) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const customStorage: PersistStorage<CartStore> = {
  getItem: async (name: string): Promise<StorageValue<CartStore> | null> => {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item) as StorageValue<CartStore>;
    }
    return null;
  },
  setItem: async (
    name: string,
    value: StorageValue<CartStore>
  ): Promise<void> => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product: ProductApi) =>
        set((state) => {
          const exists = state.cartItems.find((item) => item.id === product.id);
          if (exists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          };
        }),
      removeFromCart: (id: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: customStorage,
    }
  )
);
