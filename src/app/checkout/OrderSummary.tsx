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

const OrderSummary = () => {
  const { data: cartData, isLoading, error } = useGetUserCartItems();
  const { mutate: deleteFromCart } = useDeleteCartItem();
  const { mutate: incrementQuantity } = useCartItemQuantityIncrement();
  const { mutate: decrementQuantity } = useCartItemQuantityDecrement();
  const [cart, setCart] = useState<CartItemResponse[]>([]);
  const setOrderDetails = useOrderStore((state) => state.setOrderDetails);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await deleteFromCart(cartItemId);
      setCart((prevCart) =>
        prevCart.filter((item) => item.cartItemId !== cartItemId),
      );
      console.log(`Removed item with ID: ${cartItemId}`);
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
                      : product,
                  ),
                }
              : item,
          ),
        );
        console.log(`Decremented quantity for item ID: ${cartItemId}`);
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
              : item,
          ),
        );
        console.log(`Incremented quantity for item ID: ${cartItemId}`);
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
  };

  if (isLoading) return <Typography variant="span">Loading...</Typography>;
  if (error)
    return <Typography variant="span">Error loading cart data</Typography>;

  return (
    <div className="p-6 w-[90%] mx-auto ">
      <Typography variant="h6" className="text-2xl font-medium mb-4">
        Order Summary
      </Typography>
      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto p-4 border-2 border-gray-300 rounded-lg overflow-y-auto no-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-b-2 border-gray-300 pb-8">
                  <th className="pb-2 w-[40%]">Product</th>
                  <th className="pb-2 w-[20%]">Quantity</th>
                  <th className="pb-2 w-[20%]">Price</th>
                  <th className="pb-2 w-[20%]">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.cartItemId}
                    className="border-b-[1px] border-gray-300"
                  >
                    <td className="flex items-center py-4 w-[50%]">
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
                          className="text-base line-clamp-1"
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
                    <td className="text-center w-[20%]">
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
                    <td style={{ width: "20%" }}>
                      ${item.products[0].productPrice.toFixed(2)}
                    </td>
                    <td className="font-semibold w-[20%]">
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
            <Typography variant="h6" className="text-xl font-medium">
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
