import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './order.css';
import OrderComponent from '../../../../../components/Order/Order';
import { InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import userStore from '../../../../../store/userStore';
import Popup from '../../../../../components/Popup/Popup';
import CustomInfiniteSelect from '../../../../../components/infinitySelect/CustomInfiniteSelect';
import Dialog from '../../../../../components/Dialog/Dialog';
import Button from '@mui/material/Button';
import './order.css';
import IDeliveryInfo from '../../../../../types/deliveryInfo';
import UpdateDelivery from './components/UpdateDelivery';

const Order = () => {
  const { orderId } = useParams();
  const [err, setErr] = useState<boolean>(false);
  //Order will be updated by this state
  const [update, setUpdate] = useState<number>(1);
  const token = userStore((state: any) => state.user.token);

  //Order will be updated by this state
  const updateOrder = () => {
    setUpdate(update + 1);
  }
  const changeStatus = async (id: number) => {
    try {
      setErr(false);
      await axios.put('http://localhost:5000/api/order/status', {
        orderId: orderId,
        statusId: id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      updateOrder()
    } catch {
      setErr(true);
    }
  };

  return (
    <>
      {
        err ? <Popup/> : <OrderComponent orderId={orderId} update={update}>
          <UpdateDelivery updateOrder={updateOrder} orderId={orderId}/>
          <InputLabel id="demo-simple-select-label">Change Order status</InputLabel>
          <CustomInfiniteSelect onSelect={changeStatus}
                                url={`http://localhost:5000/api/order/customStatus/all`}></CustomInfiniteSelect>
        </OrderComponent>
      }
    </>
  );
};

export default Order;
