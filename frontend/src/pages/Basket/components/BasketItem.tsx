import React, { FC } from 'react';
import { IBasketItem } from '../../../types/IBaskertItem';

interface IBasketItemProps {
  product: IBasketItem
}
const BasketItem: FC <IBasketItemProps> = ({product}) => {
  console.log(product);
  return (
    <div>
      {`${product.title}, count: ${product.basket_item.count}`}
    </div>
  );
};

export default BasketItem;
