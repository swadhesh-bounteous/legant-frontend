export interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
}

export interface CartItemResponse {
  cartItemId: string;
  userId: string;
  products: Product[];
}
