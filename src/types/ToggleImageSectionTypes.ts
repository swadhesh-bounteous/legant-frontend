interface ImageProps {
  url: string;
  alt: string;
}

export interface ToggleImageSectionProps {
  images: ImageProps[];
  isLoading: boolean;
  isSuccess: boolean;
}
