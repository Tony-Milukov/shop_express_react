import IStatus from './status';

export default interface IProductInfo {
  [key: string]: string | number | undefined |any;
  title?: string;
  count?: number | string;
  price?: number | string;
  description?: string;
  brands?: IStatus[];
  categories?: IStatus[];
}
