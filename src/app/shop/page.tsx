import { ShopGridSection } from "@/components";
import { ShopUpperSection } from "@/components";
import React from "react";

const ShopPage = () => {
  return (
    <div className="flex flex-col">
      <ShopUpperSection />
      <ShopGridSection />
    </div>
  );
};

export default ShopPage;
