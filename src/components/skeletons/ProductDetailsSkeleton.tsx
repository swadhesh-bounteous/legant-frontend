import React from "react";
import { Skeleton } from "../ui/skeleton"; // Import the skeleton component from your UI library

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col px-8 sm:px-8 md:px-16 space-y-4 py-4">
      {/* Rating and reviews skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="w-24 h-6" /> {/* Rating stars */}
        <Skeleton className="w-16 h-6" /> {/* Reviews */}
      </div>
      {/* Product name skeleton */}
      <Skeleton className="h-8 md:h-10 w-2/3" /> {/* Name */}
      {/* Pricing skeleton */}
      <div className="flex space-x-2">
        <Skeleton className="w-16 h-8" /> {/* Price */}
        <Skeleton className="w-12 h-6" /> {/* Original Price */}
      </div>
      {/* Description skeleton */}
      <Skeleton className="w-full h-16" /> {/* Description */}
      {/* Size selection skeleton */}
      <div className="flex flex-col items-start space-y-2">
        <Skeleton className="w-16 h-4" /> {/* Size label */}
        <div className="flex space-x-2">
          <Skeleton className="w-12 h-12" /> {/* Size button 1 */}
          <Skeleton className="w-12 h-12" /> {/* Size button 2 */}
          <Skeleton className="w-12 h-12" /> {/* Size button 3 */}
        </div>
      </div>
      {/* Color selection skeleton */}
      <div className="flex flex-col items-start space-y-2">
        <Skeleton className="w-24 h-4" /> {/* Color label */}
        <div className="flex space-x-4">
          <Skeleton className="w-8 h-8 rounded-full" /> {/* Color circle 1 */}
          <Skeleton className="w-8 h-8 rounded-full" /> {/* Color circle 2 */}
          <Skeleton className="w-8 h-8 rounded-full" /> {/* Color circle 3 */}
        </div>
      </div>
      {/* Quantity selection skeleton */}
      <div className="flex flex-col gap-y-4 md:flex-row md:space-x-4 pb-2">
        <Skeleton className="w-full md:w-40 h-12" /> {/* Quantity selector */}
        <Skeleton className="w-full h-12" /> {/* Wishlist button */}
      </div>
      {/* Add to Cart button skeleton */}
      <Skeleton className="w-full h-12" /> {/* Add to Cart */}
      {/* Additional info skeleton */}
      <div className="border-t border-gray-300 flex flex-col gap-3 text-gray-600 font-light pt-8 text-sm">
        <div className="flex justify-start gap-x-3">
          <Skeleton className="w-16 h-4" /> {/* SKU label */}
          <Skeleton className="w-24 h-4" /> {/* SKU value */}
        </div>
        <div className="flex justify-start gap-x-3">
          <Skeleton className="w-20 h-4" /> {/* Category label */}
          <Skeleton className="w-32 h-4" /> {/* Category value */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
