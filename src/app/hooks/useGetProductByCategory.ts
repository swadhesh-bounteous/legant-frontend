import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/types/ProductApi";

const fetchProductsByCategory = async (category: string): Promise<ProductApi> => {
  const res = await fetch(`https://localhost:7058/api/products/category/${category}`);
  
  if (!res.ok) {
    throw new Error('Error fetching products');
  }

  const data = await res.json();
  return data;
};

const useGetProductByCategory = (category: string) => {
  return useQuery({
    queryKey: ['product', category],  
    queryFn: () => fetchProductsByCategory(category), 
    enabled: !! category,  
  });
};

export default useGetProductByCategory;
