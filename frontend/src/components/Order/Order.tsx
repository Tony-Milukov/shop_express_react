import React, { FC, useEffect, useState } from 'react';
import { List } from '@mui/material';
import axios from 'axios';
import userStore from '../../store/userStore';
import IOrder from '../../types/order';
import './order.css';
import IProduct from '../../types/product';
import ProductItem from '../ProductItem/ProductItem';
import Popup from '../Popup/Popup';
import StatusesTimeLine from './components/StatusesTimeLine';
import DeliveryInfo from './components/DeliveryInfo';
import OrderDetails from './components/OrderDetails';
import OrderAdress from './components/OrderAdress';
import OrderItem from '../../pages/Order/components/OrderItem';

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

  //getting order by id from server
  const getOrder = async () => {
    try {
      const { data } = await axios.get<IOrder>(`http://localhost:5000/api/order/id/${orderId}`, {
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
  };
  useEffect(() => {
    getOrder();
    console.log(order?.products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, update]);
  return <>
    {err || !orderId ? <Popup/> :
      <div className={'Order'}>
        <List className={'orderHeader'}>
          <OrderAdress order={order}/>
          <OrderDetails order={order}/>
        </List>
        <DeliveryInfo deliveryInfo={order?.order_delivery_info}/>
        {children}
        <StatusesTimeLine orderId={orderId} update={getOrder} statuses={order?.statuses}/>
        <div className="products">
          <span className={'orderProductsTitle'}>Ordered Products</span>
          {
            order?.products.map((item: IProduct) => <OrderItem key={item.id} product={item}/>)
          }
        </div>
      </div>
    }

  </>;
};

export default Order;
