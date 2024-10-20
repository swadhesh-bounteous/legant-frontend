import React from "react";

type Props = {};

const ProductInfoSkeleton = (props: Props) => {
  return (
    <div className="p-6 md:p-12 border-t border-gray-300 animate-pulse">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="space-y-6">
        <div className="w-[80%] mx-auto h-24 bg-gray-200 rounded-md"></div>
        <div className="w-[80%] mx-auto h-24 bg-gray-200 rounded-md"></div>
        <div className="w-[80%] mx-auto h-24 bg-gray-200 rounded-md"></div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 justify-around mt-6">
        <div className="w-full h-48 sm:h-72 bg-gray-200 rounded-md"></div>
        <div className="w-full h-48 sm:h-72 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
