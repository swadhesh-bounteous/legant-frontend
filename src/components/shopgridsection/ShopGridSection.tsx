"use client";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"; 
import { ChevronDown, Grid, LayoutGrid, List, ListTree } from "lucide-react";
import ViewToggleButton from "../common/ViewToggleButton";
import Typography from "../common/Typography";

type Props = {};

const ShopGridSection = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const [selectedPrice, setSelectedPrice] = useState("All Price");
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [viewType, setViewType] = useState("grid");

  const categories = ["All Price","Living Room", "All Rooms", "Bedroom", "Bathroom"];
  const prices = ["$0 - $100", "$101 - $500", "$501 - $1000"];
  const sortOptions = ["Price: Low to High", "Price: High to Low"];

  return (
    <section>
      <div className="flex items-center justify-between w-[90%] mx-auto py-4">
        <div className="flex items-center space-x-4">
          <div>
            <Typography variant="span" className="block text-xs uppercase">Categories</Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center border px-4 py-2 rounded w-56">
                {selectedCategory}
                <ChevronDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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
            <Typography variant="span" className="block text-xs uppercase">Price</Typography>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center border px-4 py-2 rounded w-56 justify-between">
                {selectedPrice}
                <ChevronDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
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

        <div className="flex items-center space-x-4">
        <Typography variant="span" className="text-sm">Sort By</Typography>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center border px-4 py-2 rounded w-56 justify-between">
              {sortBy}
              <ChevronDown className="ml-2 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewToggleButton
            viewType="grid"
            currentViewType={viewType}
            Icon={Grid}
            onClick={() => setViewType("grid")}
          />
          <ViewToggleButton
            viewType="compact-grid"
            currentViewType={viewType}
            Icon={LayoutGrid}
            onClick={() => setViewType("compact-grid")}
          />
          <ViewToggleButton
            viewType="list"
            currentViewType={viewType}
            Icon={List}
            onClick={() => setViewType("list")}
          />
          <ViewToggleButton
            viewType="list-tree"
            currentViewType={viewType}
            Icon={ListTree}
            onClick={() => setViewType("list-tree")}
          />
        </div>
      </div>
      <section></section>
    </section>
  );
};

export default ShopGridSection;
