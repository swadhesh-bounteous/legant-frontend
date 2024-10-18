import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteFromCartFn = async (cartItemId: string) => {
  const response = await axios.delete(`https://localhost:7058/api/Cart/delete/${cartItemId}`);
  return response.data;
};

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: deleteFromCartFn,
    onSuccess: (cartItemId) => {
      console.log('Deleted item from cart successfully:', cartItemId);
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error);
    },
  });
};
