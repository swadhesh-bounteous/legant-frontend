import React from 'react';
import { Skeleton } from '../ui/skeleton';

const OrderSummarySkeleton = () => {
  return (
    <div className="p-6 w-[90%] mx-auto">
      <div className="overflow-x-auto p-4 border-2 border-gray-300 rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b-2 border-gray-300 pb-8">
              <th className="pb-2 w-[40%] md:w-[45%]">
                <Skeleton className="h-6" />
              </th>
              <th className="pb-2 w-[20%]">
                <Skeleton className="h-6" />
              </th>
              <th className="pb-2 w-[20%]">
                <Skeleton className="h-6" />
              </th>
              <th className="pb-2 w-[15%]">
                <Skeleton className="h-6" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b-[1px] border-gray-300">
                <td className="flex items-center py-4 w-56 md:w-[45%]">
                  <Skeleton className="w-16 h-16 bg-gray-100 rounded-md" />
                  <div className="ml-4 flex flex-col justify-center items-start">
                    <Skeleton className="text-sm md:text-base line-clamp-1 w-32" />
                    <Skeleton className="w-20 h-5 mt-2" />
                  </div>
                </td>
                <td className="text-center w-[25%] md:w-[20%]">
                  <Skeleton className="w-24 h-8 mx-auto" />
                </td>
                <td className="w-[20%] md:w-[20%]">
                  <Skeleton className="w-16 h-8 mx-auto" />
                </td>
                <td className="font-semibold w-[15%] sm:w-[10%]">
                  <Skeleton className="w-16 h-8 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Skeleton className="w-32 h-8" />
      </div>
      <Skeleton className="w-full h-12 mt-4" />
    </div>
  );
};

export default OrderSummarySkeleton;
