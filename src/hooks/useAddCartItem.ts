import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AddCartItemRequest } from "@/types/AddCartItemRequest";
import { toast } from "./use-toast";

const addToCartFn = async (data: AddCartItemRequest) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await axios.post(
    "https://localhost:7058/api/Cart/add",
    data,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  );
  return response.data;
};

const useAddCartItem = () => {
  return useMutation({
    mutationFn: addToCartFn,
    onSuccess: () => {
      toast({
        title: "Added item to cart successfully",
        description: "Cart Item added",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "default",
      });
    },
  });
};

export default useAddCartItem;
