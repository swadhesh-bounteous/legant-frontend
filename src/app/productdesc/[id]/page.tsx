import React from "react";
import { ProductContent } from "@/components";
import { ProductDescPageProps } from "@/types";

const ProductDescriptionPage: React.FC<ProductDescPageProps> = ({ params }) => {
  const { id } = params;
  return <ProductContent productId={id} />;
};

export default ProductDescriptionPage;
