import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const decrementCartItemFn = async (cartItemId: string) => {
  const response = await axios.post(`https://localhost:7058/api/Cart/decrement/${cartItemId}`);
  return response.data;
};

export const useCartItemQuantityDecrement = () => {
  return useMutation({
    mutationFn: decrementCartItemFn,
    onSuccess: (cartItemId) => {
      console.log('Decremented item quantity:', cartItemId);
    },
    onError: (error) => {
      console.error('Failed to inc:', error);
    },
  });
};
