// **** Types **** //

export interface IBasketItem {
  productId: number;
  variantId: number;
  count: number;
}

export interface IBasket {
  id: number;
  items: IBasketItem[];
  totalPrice: number;
}
