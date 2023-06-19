import React, { FC } from 'react';
import IOrder from '../../../types/order';
import { List, ListItem, ListItemText } from '@mui/material';

interface OrderAdressProps {
  order?: IOrder
}
const OrderAdress: FC <OrderAdressProps>  = ({order}) => {
  const adress = order?.adress

  return (
    <ListItem disablePadding>
      <List>
        <ListItem>
          <ListItemText className={'DeliveryTitle'} primary="Shipping adress"/>
        </ListItem>
        <ListItem>
          <ListItemText primary={adress?.fullName}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={adress?.country}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={`${adress?.zip} , ${adress?.city}`}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={`${adress?.street} ${adress?.number}`}/>
        </ListItem>
        {
          adress?.extraInfo ? <ListItem>
            <ListItemText primary={adress?.extraInfo ?? null}/>
          </ListItem> : null
        }
      </List>
    </ListItem>
  );
};

export default OrderAdress;
