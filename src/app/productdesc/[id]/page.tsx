import React from "react";
import { ProductContent } from "@/components";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { id } = params;
  return <ProductContent productId={id} />;
};

export default ProductPage;
