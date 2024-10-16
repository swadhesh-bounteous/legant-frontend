import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types/ProductApi";

const fetchProducts = async (): Promise<Array<ProductApi>> => {
  const res = await fetch("https://localhost:7058/api/products");
  const data = await res.json();
  console.log(data);
  return data;
};

const useGetProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: () => fetchProducts(),
      staleTime: 0
    })
  }

export default useGetProducts