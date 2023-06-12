import IStatus from './status';

export default interface IProduct {
  count: number,
  createdAt: string,
  description:string,
  id: number,
  img:string,
  price: number,
  title:string,
  updatedAt: string,
  order_product: any,
  brands: IStatus[],
  categories: IStatus[]
}
