export type ProductApi = {
    id: string;
    createdAt: string|null; 
    name: string;
    description: string;
    additionalInfo: string;
    price: number;
    originalPrice: number|null;
    sku: string;
    category: string;
    colors: string[];
    sizes: string[];
    mainImage: string; 
    images: {
      url: string;
      alt: string; 
    }[];
    discount: string|null;
    rating: number; 
    reviews: {
      user: string; 
      rating: number; 
      comment: string; 
    }[];
  };
  