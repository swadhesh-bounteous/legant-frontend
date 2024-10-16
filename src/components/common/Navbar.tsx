"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "../ui/drawer";
import Link from "next/link";
import { UserIcon, Search, Heart, ShoppingBag, MenuIcon, X } from "lucide-react";
import Typography from "@/components/common/Typography";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
          <Link href="/cart">
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>

        <div className="lg:hidden flex gap-x-4 items-center">
          <Link href="/wishlist">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart">
            <ShoppingBag className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <div className="p-6">
            <ul className="flex flex-col gap-y-6 font-medium items-start text-md">
              <li>
                <Link href="/" onClick={toggleDrawer}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" onClick={toggleDrawer}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/product" onClick={toggleDrawer}>
                  Product
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={toggleDrawer}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
