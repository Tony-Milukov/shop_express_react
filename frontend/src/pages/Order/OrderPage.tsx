import React from 'react';
import { useParams } from 'react-router-dom';
import "./orderPage.css"
import Order from '../../components/Order/Order';

const OrderPage = () => {
  const { orderId } = useParams();
  return (
    <div className={'orderPage'}>
      <Order orderId={orderId}/>
    </div>
  );
};

export default OrderPage;
