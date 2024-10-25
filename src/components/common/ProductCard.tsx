"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Typography } from "@/components";
import { useAddCartItem } from "@/hooks";
import { AddCartItemRequest } from "@/types/AddCartItemRequest";
import useLazyLoadImage from "@/hooks/useLazyLoadImage";
import { useQueryClient } from "@tanstack/react-query";
import { ProductCardProps } from "@/types";

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { isVisible, imgRef } = useLazyLoadImage(product.mainImage);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userId = localStorage.getItem("userId");
  const queryClient = useQueryClient();

  const handleClick = () => {
    router.push(`/productdesc/${product.id}`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  const { mutate: addToCart } = useAddCartItem();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const addToCartRequest: AddCartItemRequest = {
      UserId: userId || "",
      ProductId: product.id,
      Quantity: 1,
    };

    addToCart(addToCartRequest, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
    });
  };

  const calculateDiscount = () => {
    if (!product.originalPrice || !product.price) return null;
    const discountPercentage = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    return `-${discountPercentage}%`;
  };

  return (
    <div
      className="relative border border-gray-200 rounded-sm overflow-hidden shadow-sm group cursor-pointer"
      onClick={handleClick}
    >
      <div ref={imgRef} className="relative w-full md:w-auto">
        {isVisible ? (
          <Image
            src={product.mainImage}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-72 object-cover bg-gray-100 p-6"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-72 bg-gray-100 animate-pulse" />
        )}

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-end transition-opacity duration-300 p-4">
          <Button
            className="hover:border-2 focus:border-white font-semibold py-2 px-14 rounded-sm"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            Add to Cart
          </Button>
        </div>

        <div className="absolute top-2 right-2">
          <Heart
            size={24}
            fill={isWishlisted ? "red" : "none"}
            stroke={isWishlisted ? "red" : "black"}
            className={`${
              isWishlisted ? "text-red-500" : "text-gray-300"
            } bg-white rounded-full p-1 shadow-lg`}
            onClick={(e) => {
              e.stopPropagation();
              handleWishlistToggle();
            }}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between w-full">
        {calculateDiscount() && (
          <div className="absolute top-2 left-2 bg-green-800 text-white text-xs font-bold px-2 py-1 rounded">
            {calculateDiscount()}
          </div>
        )}

        <div className="flex justify-start mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={16}
              fill={`${i < Math.round(product.rating) ? "yellow" : "white"}`}
              className={`${
                i < Math.round(product.rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <Typography
          variant="h2"
          className="text-base font-medium mb-1 text-start line-clamp-1"
        >
          {product.name}
        </Typography>

        <div className="flex justify-start items-end space-x-2 text-xs md:text-sm">
          <Typography variant="span" className="text-black font-medium">
            ${product.price}
          </Typography>
          {product.originalPrice && (
            <Typography variant="span" className="text-gray-400 line-through">
              ${product.originalPrice}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
