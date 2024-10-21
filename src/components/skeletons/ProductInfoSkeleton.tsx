import React from "react";
import { Skeleton } from "../ui/skeleton"; 

const ProductInfoSkeleton = () => {
  return (
    <div className="p-6 md:p-12 border-t border-gray-300 animate-pulse">
      {/* Skeleton for the rating */}
      <div className="flex justify-center mb-6">
        <Skeleton className="w-24 h-6" /> {/* Rating placeholder */}
      </div>
      <div className="space-y-6">
        {/* Skeletons for product description sections */}
        <Skeleton className="w-[80%] mx-auto h-24" /> {/* Description section 1 */}
        <Skeleton className="w-[80%] mx-auto h-24" /> {/* Description section 2 */}
        <Skeleton className="w-[80%] mx-auto h-24" /> {/* Description section 3 */}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 justify-around mt-6">
        {/* Skeletons for product images */}
        <Skeleton className="w-full h-48 sm:h-72" /> {/* Image placeholder 1 */}
        <Skeleton className="w-full h-48 sm:h-72" /> {/* Image placeholder 2 */}
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
