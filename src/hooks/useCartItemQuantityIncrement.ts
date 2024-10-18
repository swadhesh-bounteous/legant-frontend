import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const incrementCartItemFn = async (cartItemId: string) => {
  const response = await axios.post(`https://localhost:7058/api/Cart/increment/${cartItemId}`);
  return response.data;
};

export const useCartItemQuantityIncrement = () => {
  return useMutation({
    mutationFn: incrementCartItemFn,
    onSuccess: (cartItemId) => {
      console.log('Incremented item quantity:', cartItemId);
    },
    onError: (error) => {
      console.error('Failed to inc:', error);
    },
  });
};
