"use client";
import React, { useState } from "react";
import ProductCard from "../common/ProductCard";
import useGetProducts from "@/hooks/useGetProducts";
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
import { ProductListComp } from "@/components/index";
import { Slider } from "../ui/slider";
import { LoadingSpinner } from "@/components/index";

const categories = [
  "All",
  "Breguet",
  "Rolex",
  "Omega",
  "Audemars Piguet",
  "Rado",
];
const sortOptions = ["Price: Low to High", "Price: High to Low"];

const ShopGridSection = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const { data: productDetails = [], isPending } = useGetProducts(
    selectedCategory === "All" ? undefined : selectedCategory,
    priceRange[0],
    priceRange[1],
    sortOrder === "default" ? undefined : sortOrder,
  );

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between w-[90%] mx-auto py-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
          <div className="w-full md:w-auto">
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

          <div className="w-full md:w-auto pt-2">
            <Typography variant="span" className="text-xs uppercase">
              Price Range
            </Typography>
            <div className="flex flex-col px-4 py-2 w-full md:w-56">
              <Slider
                min={0}
                max={200000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                step={1000}
              />
              <div className="flex justify-between mt-2 text-xs">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-4 w-full md:w-auto">
          <div className="w-full md:w-auto">
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
          <div className="flex space-x-2 mt-6">
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

      {isPending ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size={48} className="text-black" />
        </div>
      ) : (
        <section className="px-4 md:px-12 lg:px-24 py-12">
          {viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {productDetails.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productDetails.map((product) => (
                <ProductListComp key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ShopGridSection;
