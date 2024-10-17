import React from "react";

const ToggleImageSectionSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 px-4 sm:px-8 md:px-16">
      <div className="w-full h-64 sm:h-80 md:h-96 max-w-full md:max-w-lg animate-pulse bg-gray-300 rounded-lg"></div>

      <div className="flex flex-row space-x-4 overflow-x-auto animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ToggleImageSectionSkeleton;
