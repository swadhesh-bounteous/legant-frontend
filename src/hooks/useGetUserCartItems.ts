import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types/ProductApi";
import { CartItemResponse } from "@/types/CartItemResponse";

const fetchCartItemsByUserId = async (): Promise<CartItemResponse[]> => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const res = await fetch(
    `https://localhost:7058/api/Cart/user?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching product");
  }

  const data = await res.json();
  return data;
};

const useGetUserCartItems = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchCartItemsByUserId(),
    staleTime: 0,
  });
};

export default useGetUserCartItems;
