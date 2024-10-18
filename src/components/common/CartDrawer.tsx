"use client";
import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import Typography from "@/components/common/Typography";
import Image from "next/image";
import useGetUserCartItems from "@/hooks/useGetUserCartItems";
import { CartItemResponse } from "@/types/CartItemResponse";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { data: cartData, isLoading, error } = useGetUserCartItems();
  console.log("Cart data",cartData);
  const [cart, setCart] = useState<CartItemResponse[]>([]);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const handleIncrement = (cartItemId: string) => {
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId
        ? {
            ...item,
            products: item.products.map((product) => ({
              ...product,
              productQuantity: product.productQuantity + 1,
            })),
          }
        : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (cartItemId: string) => {
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId
        ? {
            ...item,
            products: item.products.map((product) =>
              product.productQuantity > 1
                ? { ...product, productQuantity: product.productQuantity - 1 }
                : product
            ),
          }
        : item
    );
    setCart(updatedCart);
  };

  const handleDelete = (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => sum + item.products[0].productPrice, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (sum, item) =>
          sum +
          item.products[0].productPrice * item.products[0].productQuantity,
        0
      )
      .toFixed(2);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cart items.</div>;
  }

  return (
    <div
      className={`fixed top-0 right-0 w-72 md:w-96 h-full bg-white shadow-lg z-50 transform px-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex justify-between items-center">
          <Typography variant="h6" className="text-2xl font-medium">
            Cart
          </Typography>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar border-t-2">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between mt-4"
                >
                  <Image
                    src={item.products[0].productImage}
                    alt={item.products[0].productName}
                    className="w-16 h-24 object-cover bg-gray-100 p-1 rounded-md"
                    width={64}
                    height={64}
                  />
                  <div className="flex-1 ml-4 border-b-[1px] border-gray-300 py-4">
                    <Typography variant="span" className="text-sm line-clamp-1">
                      {item.products[0].productName}
                    </Typography>
                    <Typography variant="span" className="text-xs">
                      Price: ${item.products[0].productPrice.toFixed(2)}
                    </Typography>
                    <div className="flex items-center mt-2 border-[1px] border-black px-4 py-2 rounded-md w-fit text-xs">
                      <button onClick={() => handleDecrement(item.cartItemId)}>
                        −
                      </button>
                      <Typography variant="span" className="mx-4">
                        {item.products[0].productQuantity}
                      </Typography>
                      <button onClick={() => handleIncrement(item.cartItemId)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => handleDelete(item.cartItemId)}>
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
