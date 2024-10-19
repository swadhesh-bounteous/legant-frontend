import { create } from 'zustand';

interface OrderDetails {
  orderId: string;
  totalAmount: number;
  items: { id: string; name: string; quantity: number; price: number }[];
}

interface OrderStore {
  orderDetails: OrderDetails | null;
  setOrderDetails: (orderDetails: OrderDetails) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  orderDetails: null,
  setOrderDetails: (orderDetails) => set({ orderDetails }),
}));

export default useOrderStore;
