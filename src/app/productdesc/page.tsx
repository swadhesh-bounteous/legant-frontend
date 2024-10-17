"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ProductInfo from "@/components/productinfo/ProductInfo";
import ToggleImageSection from "@/components/toggleimagesection/ToggleImageSection";
import useGetProductById from "../hooks/useGetProductById";
import { ProductApi } from "@/types/ProductApi";
import RelatedProducts from "@/components/relatedproducts/RelatedProducts";
import BreadCrumbNavigator from "@/components/common/BreadCrumbNavigator";

const ProductPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
};

const ProductContent = () => {
  const SearchParams = useSearchParams();
  const id = SearchParams.get("id") ?? "id2";

  const { data: product, isLoading, isSuccess } = useGetProductById(id); 

  return (
    <div className="flex flex-col">
      <Navbar />
      <BreadCrumbNavigator product={product as ProductApi} isLoading={isLoading}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 my-8 w-[90%] mx-auto">
        <ToggleImageSection images={(product as ProductApi)?.images} isLoading={isLoading} isSuccess={isSuccess} />
        <ProductDetails product={product as ProductApi} isLoading={isLoading}/>
      </div>
      <ProductInfo product={product as ProductApi} isLoading={isLoading}/>
      <RelatedProducts category={(product as ProductApi)?.category}/>
      <Footer />
    </div>
  );
};

export default ProductPage;
