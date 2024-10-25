import React from "react";
import { ProductContent } from "@/components";

interface ProductDescPageProps {
  params: {
    id: string;
  };
}

const ProductDescriptionPage: React.FC<ProductDescPageProps> = ({ params }) => {
  const { id } = params;
  return <ProductContent productId={id} />;
};

export default ProductDescriptionPage;
