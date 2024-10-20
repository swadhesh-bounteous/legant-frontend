export interface AddCartItemRequest {
  UserId: string;
  ProductId: string;
  Quantity?: number;
}
