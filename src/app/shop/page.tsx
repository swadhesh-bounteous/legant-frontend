import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ShopGridSection } from "@/components";
import { ShopUpperSection } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <ShopUpperSection />
      <ShopGridSection />
      <Footer />
    </div>
  );
};

export default page;
