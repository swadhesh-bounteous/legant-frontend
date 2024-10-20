"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ProductApi } from "@/types/ProductApi";
import { Heart } from "lucide-react";
import Typography from "../common/Typography";
import ProductDetailsSkeleton from "../skeletons/ProductDetailsSkeleton";
import IncrementDecrementButton from "../common/IncrementDecrementButton";
import { AddCartItemRequest } from "@/types/AddCartItemRequest";
import { useAddCartItem } from "@/hooks";

type Props = {
  product: ProductApi;
  isLoading: boolean;
};

const ProductDetails = ({ product, isLoading }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWished, setIsWished] = useState(false);
  const userId = localStorage.getItem("userId");

  const toggleWishlist = () => {
    setIsWished((prev) => !prev);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleColorSelect = (color: string) => setSelectedColor(color);

  if (!userId) {
    console.error("User ID not found. Please log in.");
    return;
  }

  const { mutate: addToCart } = useAddCartItem();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const addToCartRequest: AddCartItemRequest = {
      UserId: userId,
      ProductId: product.id,
      Quantity: 1,
    };

    addToCart(addToCartRequest);
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="flex flex-col px-8 sm:px-8 md:px-16 space-y-4 py-4">
      <div className="flex items-center space-x-2">
        <div className="flex text-sm">
          {[...Array(Math.floor(product.rating))].map((_, i) => (
            <Typography variant="span" key={i} className="text-black">
              ★
            </Typography>
          ))}
        </div>
        <Typography variant="p" className="text-sm">
          {product.reviews.length} Reviews
        </Typography>
      </div>
      <h1 className="text-2xl md:text-4xl font-medium">{product.name}</h1>
      <div className="flex justify-start items-end space-x-2 text-lg">
        <Typography variant="span" className="text-black font-medium">
          ${product.price}
        </Typography>
        {product.originalPrice && (
          <Typography variant="span" className="text-gray-400 line-through">
            ${product.originalPrice}
          </Typography>
        )}
      </div>

      <Typography variant="p" className="font-normal text-sm">
        {product.description}
      </Typography>

      <div className="flex flex-col items-start">
        <Typography variant="span" className="mb-2">
          Size
        </Typography>
        <div className="flex space-x-2">
          {product.sizes.map((size, index) => (
            <Button
              key={index}
              variant={selectedSize === size ? "default" : "outline"}
              className={`text-black ${
                selectedSize === size ? "text-white" : ""
              }`}
              onClick={() => handleSizeSelect(size)}
              aria-label="Size button"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <Typography variant="p" className="mb-2">
          Choose Color{" >"}
        </Typography>
        <Typography variant="span">{selectedColor}</Typography>
        <div className="flex space-x-4">
          {product.colors.map((color, index) => (
            <span
              key={index}
              className={`w-8 h-8 rounded-full inline-block cursor-pointer ${
                selectedColor === color ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            ></span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-4 md:flex-row md:space-x-4 pb-2">
        <IncrementDecrementButton
          quantity={quantity}
          handleDecrement={decrementQuantity}
          handleIncrement={incrementQuantity}
        />
        <Button
          variant="outline"
          size="lg"
          onClick={toggleWishlist}
          className="w-full hover:border-1 hover:border-black"
        >
          <Heart
            className={`mr-2 ${isWished ? "text-red-500" : "text-gray-600"}`}
          />
          {isWished ? "Added to Wishlist" : "Wishlist"}
        </Button>
      </div>
      <Button variant="default" size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      <div className="border-t border-gray-300 flex flex-col gap-3 text-gray-600 font-light pt-8 text-sm">
        <div className="flex justify-start gap-x-3">
          <Typography variant="span">SKU:</Typography>
          <Typography variant="span">{product.sku}</Typography>
        </div>
        <div className="flex justify-start gap-x-3">
          <Typography variant="span">Category:</Typography>
          <Typography variant="span">{product.category}</Typography>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
