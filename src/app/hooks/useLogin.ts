import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const login = async (data: { email: string; password: string }) => {
  const response = await axios.post('https://localhost:7058/api/Auth/login', data);
  return response.data; 
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
