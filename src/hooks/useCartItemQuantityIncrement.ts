import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

const incrementCartItemFn = async (cartItemId: string) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await axios.post(
    `https://localhost:7058/api/Cart/increment/${cartItemId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  return response.data;
};

const useCartItemQuantityIncrement = () => {
  return useMutation({
    mutationFn: incrementCartItemFn,
    onSuccess: () => {
      toast({
        title: "Incremented",
        description: "Incremented cart item quantity successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to Increment item",
        variant: "default",
      });
    },
  });
};

export default useCartItemQuantityIncrement;
