import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { List } from '@mui/material';
import OrderItem from '../AdminPanel/components/panelItems/Orders/components/OrderItem';
import IOrderItemReqest from '../../types/orderItemReqest';
import Popup from '../../components/Popup/Popup';
import userStore from '../../store/userStore';
import "./orders.css"
interface IOrdersProps {
  userId?: number | string;
}

const OrdersPage: FC<IOrdersProps> = ({ userId }) => {
  const [err, setErr] = useState<boolean>(false);
  const token = userStore((state: any) => state.user.token);
  const [items, setItems] = useState<IOrderItemReqest[]>();
  const getItems = async () => {
    try {
      const { data } = await axios.get<IOrderItemReqest[]>((userId ? `http://localhost:5000/api/order/user/${userId}` : `http://localhost:5000/api/order/user`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setErr(false);
      setItems(data);
    } catch (e) {
      console.log(e);
      setErr(true);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (

    !err ? <div className="itemsMain orders">
      <List className={'customList'}>
        {
          items?.map((order: IOrderItemReqest) => <OrderItem key={order.id} item={order}/>)
        }
      </List>
    </div> : <Popup/>
)
  ;
};

export default OrdersPage;
