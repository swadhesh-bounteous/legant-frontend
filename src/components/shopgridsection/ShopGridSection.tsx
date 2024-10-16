"use client";
import React, { useState } from "react";
import ProductCard from "../common/ProductCard";
import useGetProducts from "@/app/hooks/useGetProducts";
import { ProductApi } from "@/types/ProductApi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDown, Grid, List } from "lucide-react";
import ViewToggleButton from "../common/ViewToggleButton";
import Typography from "../common/Typography";

const categories = ["All", "Breguet", "Rolex", "Omega", "Audemars Piguet","Rado"];
const prices = ["All Price", "0 - 10000", "10001 - 50000", "50001 - 100000","100001-500000"];
const sortOptions = ["Price: Low to High", "Price: High to Low"];

const ShopGridSection = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All Price");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const { data: productDetails = [] } = useGetProducts();

  const sortedProducts = (products: ProductApi[]) => {
    const sorted = [...products];
    if (sortOrder === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const filteredProducts = () => {
    let filtered = sortedProducts(productDetails);

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedPrice !== "All Price") {
      const [min, max] = selectedPrice.split(" - ").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && (max ? product.price <= max : true)
      );
    }

    return filtered;
  };

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between w-[90%] mx-auto py-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <Typography variant="span" className="text-xs uppercase">
              Categories
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center border px-4 py-2 rounded w-full md:w-56 justify-between">
                {selectedCategory}
                <ChevronDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full md:w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Typography variant="span" className="text-xs uppercase">
              Price
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center border px-4 py-2 rounded w-full md:w-56 justify-between">
                {selectedPrice}
                <ChevronDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full md:w-56">
                {prices.map((price) => (
                  <DropdownMenuItem
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                  >
                    {price}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div>
            <Typography variant="span" className="text-xs uppercase">
              Sort By
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center border px-4 py-2 rounded w-full md:w-56 justify-between">
                {sortOrder}
                <ChevronDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full md:w-56">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortOrder(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex mt-2">
            <ViewToggleButton
              viewType="grid"
              currentViewType={viewType}
              Icon={Grid}
              onClick={() => setViewType("grid")}
            />
            <ViewToggleButton
              viewType="list"
              currentViewType={viewType}
              Icon={List}
              onClick={() => setViewType("list")}
            />
          </div>
        </div>
      </section>
      <section className="px-4 md:px-12 lg:px-24 py-12">
        <div className={`grid grid-cols-1 ${viewType === "grid" ? "md:grid-cols-2 lg:grid-cols-5" : ""} gap-y-4 gap-x-4`}>
          {filteredProducts().map((product) => (
            <ProductCard key={product.id} product={product} viewType={viewType} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ShopGridSection;
