import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types/ProductApi";

const fetchProductById = async (id: string): Promise<ProductApi> => {
  const res = await fetch(`https://localhost:7058/api/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Error fetching product');
  }

  const data = await res.json();
  return data;
};

const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],  
    queryFn: () => fetchProductById(id), 
    enabled: !!id,  
  });
};

export default useGetProductById;
