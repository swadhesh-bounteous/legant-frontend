"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ToggleImageSectionSkeleton from "../skeletons/ToggleImageSectionSkeleton";
import { useImageStore } from "@/store/useImageStore";
import { ToggleImageSectionProps } from "@/types";
import { handleMouseMove } from "@/utils/Helper";

const ToggleImageSection: FC<ToggleImageSectionProps> = ({
  images,
  isLoading,
  isSuccess,
}) => {
  const { selectedImage, setSelectedImage } = useImageStore(); 
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: "0% 0%" });
  const [highlightStyle, setHighlightStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isSuccess && images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    }
  }, [images, isSuccess, selectedImage, setSelectedImage]);

  if (isLoading) {
    return <ToggleImageSectionSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-4 px-4 sm:px-8 md:px-16">
      {selectedImage && (
        <div
          className="relative w-full h-64 sm:h-80 md:h-96 max-w-full md:max-w-lg"
          onMouseMove={(e) => handleMouseMove(e, setZoomStyle, setHighlightStyle)}
          onMouseEnter={() => setIsZoomActive(true)}
          onMouseLeave={() => setIsZoomActive(false)}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            fill
            className="rounded-lg border border-gray-300 p-1 object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
            quality={10}
            priority
          />

          {isZoomActive && (
            <>
              <div
                className="absolute border w-[100px] h-[100px] border-blue-500 bg-blue-300 opacity-30 pointer-events-none"
                style={{
                  top: `${highlightStyle.top}px`,
                  left: `${highlightStyle.left}px`,
                }}
              ></div>

              <div
                className="absolute bottom-0 w-64 h-64 sm:w-96 sm:h-96 border border-gray-300 rounded-lg p-2 bg-white"
                style={{
                  left: "calc(100% + 20px)",
                  backgroundImage: `url(${selectedImage.url})`,
                  backgroundSize: "300%",
                  backgroundPosition: zoomStyle.backgroundPosition,
                }}
              ></div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-row space-x-4">
        {images?.map((image, index) => {
          if (image !== selectedImage) {
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(image)} 
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  height={100}
                  width={100}
                  className="w-16 h-16 sm:w-32 sm:h-32 rounded-lg object-cover transition-transform transform group-hover:scale-105 duration-300 border border-gray-300"
                  loading="lazy"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ToggleImageSection;
