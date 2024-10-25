import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useRouter } from "next/navigation";
import { BreadCrumbNavigatorProps } from "@/types";
import { Typography } from "@/components";

const BreadCrumbNavigator = ({
  product,
  isLoading,
}: BreadCrumbNavigatorProps) => {
  const router = useRouter();
  return (
    <Breadcrumb className="text-gray-800 text-xs md:text-sm mt-4 mx-16 md:mx-36 line-clamp-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" onClick={() => router.push("/")}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/shop" onClick={() => router.push("/shop")}>
            Shop
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Typography variant="span">{product?.name}</Typography>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbNavigator;
