import { UUID } from "crypto";

export interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
}

export interface CartItemResponse {
  cartItemId: UUID;
  userId: string;
  products: Product[];
}
