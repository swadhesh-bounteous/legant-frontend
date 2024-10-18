"use client";
import { ProductApi } from "@/types/ProductApi";
import React, { useState } from "react";
import Typography from "../common/Typography";
import ProductInfoSkeleton from "../skeletons/ProductInfoSkeleton";

type Props = {
  product: ProductApi;
  isLoading: boolean;
};

const SkeletonProductInfo = () => {
  return <ProductInfoSkeleton />;
};

const ProductInfo = ({ product, isLoading }: Props) => {
  const [activeTab, setActiveTab] = useState("additionalInfo");
  const [fadeIn, setFadeIn] = useState(true);

  const handleTabChange = (tab: string) => {
    setFadeIn(false);

    setTimeout(() => {
      setActiveTab(tab);
      setFadeIn(true);
    }, 300);
  };

  if (isLoading) {
    return <SkeletonProductInfo />;
  }

  return (
    <div className="p-6 md:p-12 border-y border-gray-300">
      <div>
        <ul className="flex space-x-8 md:space-x-24 justify-center text-sm md:text-xl">
          <li>
            <button
              className={`pb-2 ${
                activeTab === "additionalInfo"
                  ? "font-semibold text-black"
                  : "text-gray-500"
              } focus:outline-none`}
              onClick={() => handleTabChange("additionalInfo")}
            >
              Additional Info
            </button>
          </li>
          <li>
            <button
              className={`pb-2 ${
                activeTab === "reviews"
                  ? "font-semibold text-black"
                  : "text-gray-500"
              } focus:outline-none`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
            </button>
          </li>
        </ul>
      </div>

      <div
        className={`my-6 md:my-10 px-4 md:px-12 h-fit transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeTab === "additionalInfo" && (
          <div className="w-[80%] mx-auto">
            <Typography
              variant="p"
              className="text-xs md:text-sm mt-2 text-gray-500"
            >
              {product.additionalInfo}
            </Typography>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="w-[80%] mx-auto">
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-darkbeige"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-beigerounded-full flex items-center justify-center bg-beige rounded-full">
                        {review.user[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs md:text-sm">
                          {review.user}
                        </h4>
                        <div className="flex">
                          {[...Array(Math.floor(review.rating))].map((_, i) => (
                            <Typography
                              variant="span"
                              key={i}
                              className="text-yellow-400"
                            >
                              ★
                            </Typography>
                          ))}
                          {[...Array(5 - Math.floor(review.rating))].map(
                            (_, i) => (
                              <Typography
                                variant="span"
                                key={i}
                                className="text-gray-300"
                              >
                                ★
                              </Typography>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <Typography
                      variant="p"
                      className="mt-4 text-gray-600 text-sm md:text-base"
                    >
                      {review.comment}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <Typography variant="p" className="text-gray-500">
                No reviews yet. Be the first to review!
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
