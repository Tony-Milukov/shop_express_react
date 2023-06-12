import IProduct from './product';

export interface IBasketItem extends IProduct {
  basket_item: {
    basketId: number,
    count: number
  }
}
