// src/components/Navbar/CustomDrawer.tsx

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Typography from "@/components/common/Typography";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <Typography variant="h6">Menu</Typography>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="mt-6 flex flex-col gap-y-6 font-medium items-start text-md">
          <li>
            <Link href="/" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link href="/shop" onClick={onClose}>Shop</Link>
          </li>
          <li>
            <Link href="/product" onClick={onClose}>Product</Link>
          </li>
          <li>
            <Link href="/contact" onClick={onClose}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomDrawer;
