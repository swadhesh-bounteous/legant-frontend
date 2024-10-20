import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

const deleteFromCartFn = async (cartItemId: string) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await axios.delete(
    `https://localhost:7058/api/Cart/delete/${cartItemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  );
  return response.data;
};

const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: deleteFromCartFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Cart item deleted successfully",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to delete item",
        variant: "default",
      });
    },
  });
};

export default useDeleteCartItem;
