import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types";

const fetchProducts = async (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sortOrder?: string
): Promise<Array<ProductApi>> => {
  const jwtToken = localStorage.getItem("jwtToken");
  const queryParams = new URLSearchParams();
  if (category && category !== "All") queryParams.append("category", category);
  if (minPrice !== undefined)
    queryParams.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined)
    queryParams.append("maxPrice", maxPrice.toString());
  if (sortOrder) queryParams.append("sortOrder", sortOrder);

  const queryString = queryParams.toString();
  const url = `https://localhost:7058/api/products${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log(data);
  return data;
};

const useGetProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sortOrder?: string
) => {
  return useQuery({
    queryKey: ["products", category, minPrice, maxPrice, sortOrder],
    queryFn: () => fetchProducts(category, minPrice, maxPrice, sortOrder),
    staleTime: 0,
  });
};

export default useGetProducts;
