import React from "react";
import { Skeleton } from "../ui/skeleton"; // Import the skeleton component from your UI library

const ToggleImageSectionSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 px-4 sm:px-8 md:px-16">
      {/* Skeleton for the main image */}
      <Skeleton className="w-full h-64 sm:h-80 md:h-96 max-w-full md:max-w-lg rounded-lg" />

      {/* Skeletons for thumbnail images */}
      <div className="flex flex-row space-x-4 overflow-x-auto animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ToggleImageSectionSkeleton;
