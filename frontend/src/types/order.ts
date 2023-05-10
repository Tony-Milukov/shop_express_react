import IAdress from './adress';
import IDeliveryInfo from './deliveryInfo';
import IProduct from './product';
import IStatus from './status';

export default interface IOrder {
  adress: IAdress,
  createdAt: string,
  deliveredDate: string | null,
  id: number,
  order_delivery_info: IDeliveryInfo,
  products: IProduct[],
  statuses: IStatus[],
  updatedAt: string,
  userId: number
}
