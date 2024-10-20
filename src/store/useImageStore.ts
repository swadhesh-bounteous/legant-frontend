import { create } from 'zustand';

interface ImageProps {
  url: string;
  alt: string;
}

interface ImageStore {
  selectedImage: ImageProps | null;
  setSelectedImage: (image: ImageProps) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
}));
