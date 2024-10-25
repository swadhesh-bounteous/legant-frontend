interface Image {
  url: string;
  alt: string;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface ProductApi {
  id: string;
  createdAt?: string | null;
  name: string;
  description: string;
  additionalInfo?: string;
  price: number;
  originalPrice?: number | null;
  sku: string;
  category: string;
  colors: string[];
  sizes: string[];
  mainImage: string;
  images: Image[];
  discount?: string | null;
  rating: number;
  reviews: Review[];
}

