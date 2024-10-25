"use client";
import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import Typography from "@/components/common/Typography";
import Image from "next/image";
import useGetUserCartItems from "@/hooks/useGetUserCartItems";
import { CartItemResponse } from "@/types/CartItemResponse";
import { useDeleteCartItem } from "@/hooks";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import IncrementDecrementButton from "./IncrementDecrementButton";
import { useCartItemQuantityIncrement } from "@/hooks";
import { useCartItemQuantityDecrement } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { CartDrawerProps } from "@/types";

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { data: cartData } = useGetUserCartItems();
  const { mutate: deleteFromCart } = useDeleteCartItem();
  const { mutate: incrementQuantity } = useCartItemQuantityIncrement();
  const { mutate: decrementQuantity } = useCartItemQuantityDecrement();
  const [cart, setCart] = useState<CartItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const handleIncrement = (cartItemId: UUID) => {
    incrementQuantity(cartItemId, {
      onSuccess: () => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  products: item.products.map((product) => ({
                    ...product,
                    productQuantity: product.productQuantity + 1,
                  })),
                }
              : item
          )
        );
        console.log(`Incremented quantity for item ID: ${cartItemId}`);
      },
      onError: (error) => {
        console.error("Failed to increment quantity:", error);
      },
    });
  };

  const handleDecrement = (cartItemId: UUID) => {
    decrementQuantity(cartItemId, {
      onSuccess: () => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  products: item.products.map((product) =>
                    product.productQuantity > 1
                      ? {
                          ...product,
                          productQuantity: product.productQuantity - 1,
                        }
                      : product
                  ),
                }
              : item
          )
        );
        console.log(`Decremented quantity for item ID: ${cartItemId}`);
      },
      onError: (error) => {
        console.error("Failed to decrement quantity:", error);
      },
    });
  };

  const handleDelete = async (cartItemId: UUID) => {
    try {
      await deleteFromCart(cartItemId);
      const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
    }
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

  const handleCheckout = () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "You need to login to proceed to checkout",
          variant: "default",
        });
        return;
      }
      router.push("/checkout");
    } catch (err) {
      toast({
        title: "Unauthorized",
        description: "You have to Create/ Log-in account to checkout",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  <div className="flex-1 ml-6 mr-2 border-b-[1px] border-gray-300 py-4">
                    <Typography variant="span" className="text-sm line-clamp-1">
                      {item.products[0].productName}
                    </Typography>
                    <Typography variant="span" className="text-xs mt-2">
                      Price: ${item.products[0].productPrice.toFixed(2)}
                    </Typography>
                    <div className="mt-4">
                      <IncrementDecrementButton
                        quantity={item.products[0].productQuantity}
                        handleIncrement={() => handleIncrement(item.cartItemId)}
                        handleDecrement={() => handleDecrement(item.cartItemId)}
                      />
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
              <button
                className={`w-full bg-black text-white py-2 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleCheckout}
                disabled={isLoading} 
              >
                {isLoading ? <LoadingSpinner /> : "Checkout"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
