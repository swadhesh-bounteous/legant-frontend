import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Typography from "../common/Typography";

const ShopUpperSection = () => {
  return (
    <section className="relative bg-[url('/assets/images/shop_bg.png')] bg-opacity-30 bg-cover w-[90%] mx-auto rounded-lg bg-center h-[300px] md:h-[400px] font-Poppins">
      <div className="absolute inset-0"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <Breadcrumb className="text-gray-800 text-xs md:text-sm mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Typography variant="h1" className="text-3xl md:text-5xl lg:text-6xl font-medium text-black mb-4 md:mb-6">
          Shop
        </Typography>
        <Typography variant="h2" className="w-[60%] md:text-lg text-xs">Let's design the place you always imagined</Typography>
      </div>
    </section>
  );
};

export default ShopUpperSection;
