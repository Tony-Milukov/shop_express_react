import React, { FC } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import IOrder from '../../../types/order';

interface OrderDetailsProps {
  order?: IOrder,
}
const OrderDetails:FC<OrderDetailsProps>  = ({order}) => {
  //calculating full price of products in the order
  const price = order?.products.reduce((acc: number, value: any) => {
    return acc + value.price;
  }, 0);

  return (

        <ListItem disablePadding>
          <List>
            <ListItem>
              <ListItemText className={'DeliveryTitle'} primary="Details"/>
            </ListItem>
            <ListItem>
              <ListItemText primary={`total: ${price}$`}/>
            </ListItem>
            <ListItem>
              <ListItemText primary={`ordered: ${order?.createdAt}$`}/>
            </ListItem>
          </List>
        </ListItem>

  );
};

export default OrderDetails;
