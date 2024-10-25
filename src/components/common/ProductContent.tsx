"use client";
import React from "react";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ProductInfo from "@/components/productinfo/ProductInfo";
import ToggleImageSection from "@/components/toggleimagesection/ToggleImageSection";
import useGetProductById from "@/hooks/useGetProductById";
import { ProductApi, ProductContentProps } from "@/types";
import RelatedProducts from "@/components/relatedproducts/RelatedProducts";
import BreadCrumbNavigator from "@/components/common/BreadCrumbNavigator";
import AiImageAnalyzer from "../aiimageanalyzer/AiImageAnalyzer";

const ProductContent = ({ productId }: ProductContentProps) => {
  const { data: product, isLoading, isSuccess } = useGetProductById(productId);

  return (
    <div className="flex flex-col">
      <BreadCrumbNavigator
        product={product as ProductApi}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 my-8 w-[90%] mx-auto">
        <ToggleImageSection
          images={(product as ProductApi)?.images}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <ProductDetails product={product as ProductApi} isLoading={isLoading} />
      </div>
      <AiImageAnalyzer />
      <ProductInfo product={product as ProductApi} isLoading={isLoading} />
      <RelatedProducts category={(product as ProductApi)?.category} />
    </div>
  );
};

export default ProductContent;
