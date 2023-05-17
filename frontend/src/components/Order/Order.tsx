import React, { FC, useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import userStore from '../../store/userStore';
import IOrder from '../../types/order';
import './order.css';
import IProduct from '../../types/product';
import ProductItem from '../ProductItem/ProductItem';
import Popup from '../Popup/Popup';
import StatusesTimeLine from './components/StatusesTimeLine';

interface OrderProps {
  orderId?: number | string,
  children?: any,
  update?: number | null
}

const Order: FC<OrderProps> = ({
  update,
  orderId,
  children,
}) => {
  const [err, setErr] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder>();
  const token = userStore((state: any) => state.user.token);
  const price = order?.products.reduce((acc: number, value: any) => {
    return acc + value.price;
  }, 0);
  const getOrder = async () => {
    try {
      const { data } = await axios.get<IOrder>(`http://localhost:5000/api/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setErr(false);
      setOrder(data);
    } catch (e) {
      setErr(true);
    }
  }
  useEffect(() => {
    getOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId,update]);
  const adress = order?.adress;
  return <>
    {err || !orderId ? <Popup/> :
      <div className={'Order'}>
        <List className={'orderDetails'}>
          <ListItem disablePadding>
            <List>
              <ListItem>
                <ListItemText className={'DeliveryTitle'} primary="Delivery"/>
              </ListItem>
              <ListItem>
                <ListItemText primary={adress?.fullname}/>
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
        </List>
        {children}
        <StatusesTimeLine orderId={orderId} update={getOrder} statuses={order?.statuses}/>
        <div className="orderProducts">
          <span className={'orderProductsTitle'}>Ordered Products</span>
          {
            order?.products.map((item: IProduct) => <ProductItem key={item.id} item={item}/>)
          }
        </div>
      </div>
    }

  </>;
};

export default Order;
