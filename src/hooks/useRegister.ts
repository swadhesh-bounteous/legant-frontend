import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const registerFn = async (data: { email: string; password: string }) => {
  const response = await axios.post('https://localhost:7058/api/Auth/register', data);
  return response.data; 
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log('Register successful:', data);
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
      }
    },
    onError: (error) => {
      console.error('Register failed:', error);
    },
  });
};
