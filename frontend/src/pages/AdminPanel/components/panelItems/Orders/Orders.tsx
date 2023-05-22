import React from 'react';
import PanelItems from '../../Paneltems';
import OrderItem from './components/OrderItem';
import "./orders.css"
const Orders = () => {
  return (
    <>
      <PanelItems dialog={false} ListItem={OrderItem} url={'http://localhost:5000/api/order'} paginationUrl={"/admin/orders"} name={"order"}/>
    </>
  );
};

export default Orders;
