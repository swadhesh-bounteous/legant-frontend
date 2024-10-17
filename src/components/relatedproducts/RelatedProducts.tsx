import useGetProductByCategory from "@/app/hooks/useGetProductByCategory";
import React, { useState } from "react";
import ProductCard from "../common/ProductCard";
import { ProductApi } from "@/types/ProductApi";
import Typography from "../common/Typography";

type Props = {
  category: string;
};

const RelatedProducts = ({ category }: Props) => {
  const {
    data: productDetails = [],
    isLoading,
    isError,
  } = useGetProductByCategory(category);

  const [visibleCount, setVisibleCount] = useState(4); 
  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 4); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load products.</div>;
  }

  if (!Array.isArray(productDetails) || productDetails.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <div className="flex flex-col py-6 px-4 md:py-12 ">
      <Typography variant="span" className="text-lg md:text-2xl font-semibold pb-8 text-center">Related Products</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 px-8 md:px-24 py-2">
        {productDetails.slice(0, visibleCount).map((product: ProductApi) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
      {visibleCount < productDetails.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMoreProducts}
            className="bg-transparent border-2 border-darkbeige text-darkbeige font-semibold py-2 px-4 rounded hover:bg-beige transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
