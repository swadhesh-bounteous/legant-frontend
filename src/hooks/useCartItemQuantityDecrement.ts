import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

const decrementCartItemFn = async (cartItemId: string) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await axios.post(
    `https://localhost:7058/api/Cart/decrement/${cartItemId}`,
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

const useCartItemQuantityDecrement = () => {
  return useMutation({
    mutationFn: decrementCartItemFn,
    onSuccess: () => {
      toast({
        title: "Decremented",
        description: "Decremented cart item quantity successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to decrement item",
        variant: "default",
      });
    },
  });
};

export default useCartItemQuantityDecrement;
