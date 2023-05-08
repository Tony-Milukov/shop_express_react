import React, { FC } from 'react';
import IOrderItemReqest from '../../../../../types/orderItemReqest';
import { idID } from '@mui/material/locale';

interface IOrderItemProps {
  update: () => void,
  item:IOrderItemReqest
}
const OrderItem:FC <IOrderItemProps>= ({update,item}) => {
  return (
    <div>
      {item.id}
      </div>
  );
};

export default OrderItem;
