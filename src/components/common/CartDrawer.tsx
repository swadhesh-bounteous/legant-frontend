"use client";
import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import Typography from "@/components/common/Typography";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems } = useCartStore((state) => state); 
  const [cart, setCart] = useState(cartItems);
  
  useEffect(() => {
    setCart(cartItems); 
  }, [cartItems]);

  const handleIncrement = (id: string) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (id: string) => {
    const updatedCart = cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDelete = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-72 md:w-96 h-full bg-white shadow-lg z-50 transform px-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex justify-between items-center">
          <Typography variant="h6" className="text-2xl font-medium">Cart</Typography>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar border-t-2"> 
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between mt-4">
                  <Image 
                    src={item.mainImage} 
                    alt={item.name} 
                    className="w-16 h-24 object-cover bg-gray-100 p-1 rounded-md" 
                    width={64} 
                    height={64}
                  />
                  <div className="flex-1 ml-4 border-b-[1px] border-gray-300 py-4">
                    <Typography variant="span" className="text-sm line-clamp-1">{item.name}</Typography>
                    <Typography variant="span" className="text-sm text-gray-500 line-clamp-1">
                      Colors: {item.colors.join(", ")}
                    </Typography>
                    <Typography variant="span" className="text-xs">
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <div className="flex items-center mt-2 border-[1px] border-black px-4 py-2 rounded-md w-fit text-xs">
                      <button onClick={() => handleDecrement(item.id)}>−</button>
                      <Typography variant="span" className="mx-4">{item.quantity}</Typography>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Typography variant="span">Your cart is empty.</Typography>
          )}
        </div>
        {/* Fixed footer for subtotal, total, and checkout */}
        <div className="p-6 border-t border-gray-300">
          {cart.length > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <Typography variant="span">Subtotal:</Typography>
                <Typography variant="span">${calculateSubtotal()}</Typography>
              </div>
              <div className="flex justify-between mb-4">
                <Typography variant="span">Total:</Typography>
                <Typography variant="span">${calculateTotal()}</Typography>
              </div>
              <button className="w-full bg-black text-white py-2 rounded">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
