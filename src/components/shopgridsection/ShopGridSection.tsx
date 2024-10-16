"use client";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"; 
import { ChevronDown, Grid, LayoutGrid, List, ListTree } from "lucide-react";

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
            <span className="block text-xs uppercase">Categories</span>
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
            <span className="block text-xs uppercase">Price</span>
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
        <span className="text-sm">Sort by</span>
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
          <button
            className={`p-2 rounded ${viewType === 'grid' ? 'bg-gray-200' : ''}`}
            onClick={() => setViewType('grid')}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded ${viewType === 'compact-grid' ? 'bg-gray-200' : ''}`}
            onClick={() => setViewType('compact-grid')}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded ${viewType === 'list' ? 'bg-gray-200' : ''}`}
            onClick={() => setViewType('list')}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded ${viewType === 'list-tree' ? 'bg-gray-200' : ''}`}
            onClick={() => setViewType('list-tree')}
          >
            <ListTree className="w-5 h-5" />
          </button>
        </div>
      </div>
      <section></section>
    </section>
  );
};

export default ShopGridSection;
