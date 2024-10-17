import { ProductApi } from "@/types/ProductApi";
import { StarIcon, Heart } from "lucide-react"; // Assuming Heart is a valid icon from lucide-react
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Typography from "./Typography";

type Props = {
  product: ProductApi;
};

const ProductListComp = ({ product }: Props) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productdesc/?id=${product.id}`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer">
      <div className="relative w-full sm:w-1/2 rounded-l-lg overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.name}
          height={200}
          width={200}
          className="w-full h-full object-cover bg-gray-100 p-4"
          onClick={handleClick}
        />
        {product.discount && (
          <Typography
            variant="span"
            className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md"
          >
            -{product.discount}
          </Typography>
        )}
      </div>

      <div className="flex flex-col justify-between w-full sm:w-1/2 px-8 pr-12 pl-6 py-6">
        <div className="flex justify-start mb-4">
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

        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-baseline space-x-2 mt-1">
          <Typography
            variant="span"
            className="text-sm font-semibold text-primary"
          >
            ₹{product.price}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="span"
              className="text-sm text-gray-500 line-through"
            >
              ₹{product.originalPrice}
            </Typography>
          )}
        </div>

        <Typography
          variant="span"
          className="text-sm text-gray-600 mt-2 line-clamp-3"
        >
          {product.description}
        </Typography>

        <div className="flex flex-col gap-y-4 pt-12">
          <Button className="font-semibold rounded-sm w-full">
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full hover:border-1 hover:border-black"
          >
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
            {"Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductListComp;
