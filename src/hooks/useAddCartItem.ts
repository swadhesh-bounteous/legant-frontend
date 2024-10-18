import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AddCartItemRequest } from '@/types/AddCartItemRequest'; 

const addToCartFn = async (data: AddCartItemRequest) => {
  const response = await axios.post('https://localhost:7058/api/Cart/add', data);
  return response.data;
};

export const useAddCartItem = () => {
  return useMutation({
    mutationFn: addToCartFn,
    onSuccess: (data) => {
      console.log('Item added to cart successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error);
    },
  });
};
