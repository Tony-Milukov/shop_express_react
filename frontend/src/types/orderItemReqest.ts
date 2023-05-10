import IAdress from './adress';

export default interface IOrderItemReqest {
  id: number | string;
  adress: IAdress,
  createdAt: string,
  updatedAt: string,
  userId: number,
  deliveredDate: null | any
}
