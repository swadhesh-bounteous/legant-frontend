import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useRouter } from "next/navigation";
import { ProductApi } from "@/types/ProductApi";

type Props = {
    product: ProductApi;
    isLoading: boolean;
};

const BreadCrumbNavigator = ({product, isLoading}: Props) => {
  const router = useRouter();
  return (
    <Breadcrumb className="text-gray-800 text-xs md:text-sm mt-4 mx-16 md:mx-36 line-clamp-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" onClick={() => router.push("/")}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/shop" onClick={() => router.push("/shop")}>Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{product?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbNavigator;
