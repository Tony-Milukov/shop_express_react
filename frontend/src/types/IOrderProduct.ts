import IProduct from './product';

export default interface IOrderProduct extends IProduct{
  order_product: {
    count: number
  }
}
