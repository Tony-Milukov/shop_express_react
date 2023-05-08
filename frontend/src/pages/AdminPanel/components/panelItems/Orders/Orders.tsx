import React from 'react';
import PanelItems from '../../Paneltems';
import OrderItem from './OrderItem';

const Orders = () => {
  return (
    <PanelItems addItem={false} ListItem={OrderItem} url={'http://localhost:5000/api/order'} paginationUrl={"/admin/orders"} name={"order"}/>
  );
};

export default Orders;
