import React from 'react'

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-16 space-y-4 animate-pulse">
        <div className="h-8 md:h-16 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 md:h-8 bg-gray-300 rounded w-1/4"></div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="h-6 w-6 bg-gray-300 rounded-full"></span>
            ))}
          </div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="flex flex-col items-start space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-300 rounded-md"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-gray-300"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-4 md:flex-row md:space-x-4 pb-8">
          <div className="flex space-x-4 items-center rounded-lg border-gray-400 border-[1px] w-full md:w-auto">
            <div className="px-3 py-4 text-xl md:text-base w-full md:w-auto bg-gray-300 rounded"></div>
            <div className="text-center flex-1 h-8 bg-gray-300 rounded"></div>
            <div className="px-3 py-4 text-xl md:text-base w-full md:w-auto bg-gray-300 rounded"></div>
          </div>
          <div className="h-10 w-full md:w-auto bg-gray-300 rounded"></div>
          <div className="h-10 w-full md:w-auto bg-gray-300 rounded"></div>
        </div>

        <div className="border-t border-gray-300 flex flex-col gap-3 text-gray-600 font-light pt-8 text-sm">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex space-x-4">
            <span className="h-4 bg-gray-300 rounded w-1/4"></span>
            <div className="flex space-x-4">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductDetailsSkeleton