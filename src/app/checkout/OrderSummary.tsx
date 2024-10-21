"use client";
import React, { useEffect, useState } from "react";
import Typography from "@/components/common/Typography";
import { X } from "lucide-react";
import useGetUserCartItems from "@/hooks/useGetUserCartItems";
import Image from "next/image";
import IncrementDecrementButton from "@/components/common/IncrementDecrementButton";
import { useDeleteCartItem } from "@/hooks";
import { useCartItemQuantityIncrement } from "@/hooks";
import { useCartItemQuantityDecrement } from "@/hooks";
import { CartItemResponse } from "@/types/CartItemResponse";
import useOrderStore from "@/store/useOrderStore";
import OrderSummarySkeleton from "@/components/skeletons/OrderSummarySkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const OrderSummary = () => {
  const { data: cartData, isLoading, error } = useGetUserCartItems();
  const { mutate: deleteFromCart } = useDeleteCartItem();
  const { mutate: incrementQuantity } = useCartItemQuantityIncrement();
  const { mutate: decrementQuantity } = useCartItemQuantityDecrement();
  const [cart, setCart] = useState<CartItemResponse[]>([]);
  const setOrderDetails = useOrderStore((state) => state.setOrderDetails);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await deleteFromCart(cartItemId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["product"] });
        },
      });

      setCart((prevCart) =>
        prevCart.filter((item) => item.cartItemId !== cartItemId)
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleDecreaseQuantity = (cartItemId: string) => {
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
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
      onError: (error) => {
        console.error("Failed to decrement quantity:", error);
      },
    });
  };

  const handleIncreaseQuantity = (cartItemId: string) => {
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
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
      onError: (error) => {
        console.error("Failed to increment quantity:", error);
      },
    });
  };

  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => {
        const price = item.products[0].productPrice;
        const quantity = item.products[0].productQuantity;
        return sum + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = () => {
    try {
      const orderDetails = {
        orderId: new Date().toISOString(),
        totalAmount: parseFloat(calculateTotal()),
        items: cart.map((item) => ({
          id: item.cartItemId,
          name: item.products[0].productName,
          quantity: item.products[0].productQuantity,
          price: item.products[0].productPrice,
        })),
      };

      setOrderDetails(orderDetails);
      toast({
        title: "Order placed successfully",
        description: "Order placed",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Unable to place order",
        description: "Order not placed",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <OrderSummarySkeleton />;
  if (error)
    return <Typography variant="span">Error loading cart data</Typography>;

  return (
    <div className="p-6 w-[90%] mx-auto ">
      <Typography variant="h6" className="text-2xl font-medium mb-4">
        Order Summary
      </Typography>
      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto p-4 overflow-y-auto no-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-b-2 border-gray-300 pb-8">
                  <th className="pb-2 w-[40%] md:w-[45%]">Product</th>
                  <th className="pb-2 w-[20%]">Quantity</th>
                  <th className="pb-2 w-[20%]">Price</th>
                  <th className="pb-2 w-[15%]">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.cartItemId}
                    className="border-b-[1px] border-gray-300"
                  >
                    <td className="flex items-center py-4 w-56 md:w-[45%]">
                      <Image
                        src={item.products[0].productImage}
                        alt={item.products[0].productName}
                        className="w-16 h-16 object-cover bg-gray-100 p-1 rounded-md"
                        width={64}
                        height={64}
                      />
                      <div className="ml-4 flex flex-col justify-center items-start">
                        <Typography
                          variant="span"
                          className="text-sm md:text-base line-clamp-1"
                        >
                          {item.products[0].productName}
                        </Typography>
                        <button
                          className="text-red-500 text-xs mt-2"
                          onClick={() => handleRemoveItem(item.cartItemId)}
                        >
                          <X className="w-6" />
                        </button>
                      </div>
                    </td>
                    <td className="text-center w-[25%] md:w-[20%]">
                      <IncrementDecrementButton
                        quantity={item.products[0].productQuantity}
                        handleIncrement={() =>
                          handleIncreaseQuantity(item.cartItemId)
                        }
                        handleDecrement={() =>
                          handleDecreaseQuantity(item.cartItemId)
                        }
                      />
                    </td>
                    <td className="w-[20%] md:w-[20%]">
                      ${item.products[0].productPrice.toFixed(2)}
                    </td>
                    <td className="font-semibold w-[15%] sm:w-[10%]">
                      $
                      {(
                        item.products[0].productPrice *
                        item.products[0].productQuantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Typography variant="h6" className="text-lg md:text-xl font-medium">
              Total: ${calculateTotal()}
            </Typography>
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      ) : (
        <Typography variant="span">Your cart is empty.</Typography>
      )}
    </div>
  );
};

export default OrderSummary;
