"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, Search, Heart, ShoppingBag, MenuIcon } from "lucide-react";
import Typography from "@/components/common/Typography";
import CustomDrawer from "./CustomDrawer";
import CartDrawer from "./CartDrawer"; 
import useGetUserCartItems from "@/hooks/useGetUserCartItems";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const { data: cartData, isLoading, error } = useGetUserCartItems();

  const cartItemCount = cartData
    ? cartData.reduce(
        (total, item) => total + item.products[0].productQuantity,
        0
      )
    : 0;

  return (
    <header className="bg-white">
      <nav className="container mx-auto flex justify-between items-center py-6 px-6">
        <div className="flex items-center gap-x-2">
          <button onClick={toggleDrawer} className="md:hidden">
            <MenuIcon className="w-6 h-6 mr-2" />
          </button>
          <Typography variant="span" className="text-xl font-semibold">
            3legant.
          </Typography>
        </div>

        <ul className="hidden lg:flex gap-x-8 font-medium items-center text-md">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/product">Product</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="hidden lg:flex gap-x-6 items-center">
          <Link href="/search">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/user">
            <UserIcon className="w-5 h-5" />
          </Link>
          <Link href="/wishlist">
            <Heart className="w-5 h-5" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {/* Display the cart item count */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="lg:hidden flex gap-x-4 items-center">
          <Link href="/wishlist">
            <Heart className="w-5 h-5" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {/* Display the cart item count */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {(isDrawerOpen || isCartDrawerOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsDrawerOpen(false);
            setIsCartDrawerOpen(false);
          }}
        />
      )}

      {/* Use the CustomDrawer and CartDrawer components */}
      <CustomDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={toggleCartDrawer} />
    </header>
  );
};

export default Navbar;
