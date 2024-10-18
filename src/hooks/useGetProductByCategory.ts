import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types/ProductApi";

const fetchProductsByCategory = async (
  category: string
): Promise<ProductApi> => {
  const jwtToken = localStorage.getItem("jwtToken");
  const res = await fetch(
    `https://localhost:7058/api/products/category/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching products");
  }

  const data = await res.json();
  return data;
};

const useGetProductByCategory = (category: string) => {
  return useQuery({
    queryKey: ["product", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
};

export default useGetProductByCategory;
