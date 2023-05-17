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

const Order = () => {
  const { orderId } = useParams();
  const [err, setErr] = useState<boolean>(false);
  const [update, setUpdate] = useState<number>();
  const token = userStore((state: any) => state.user.token);
  const [deliveryInfo, setDeliveryInfo] = useState<IDeliveryInfo>();
  const deliveryInfoFields = ['company', 'trackCode', 'trackLink', 'extraInfo',];
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
      setUpdate(id);
    } catch {
      setErr(true);
    }
  };
  const updateDeliveryInfo = () => {
    console.log(deliveryInfo);
  };
  useEffect(() => {
    updateDeliveryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryInfo]);

  return (
    <>
      {
        err ? <Popup/> : <OrderComponent orderId={orderId} update={update}>
          <Dialog succesValue={'update'} failureValue={'break'} handler={updateDeliveryInfo}
                  OpenButton={<Button className={'updateDeliveryBtn'}>Update delivery
                    Info</Button>}>
            {deliveryInfoFields.map(i =>
              <>
                <TextField
                  className={'deliveryInfoInput'}
                  onChange={(e: any) => setDeliveryInfo({
                    ...deliveryInfo,
                    [i]: e.target.value
                  })}
                  id="standard-multiline-flexible"
                  label={i}
                  multiline
                  maxRows={4}
                  variant="standard"
                /> <br/></>
            )}
          </Dialog>
          <InputLabel id="demo-simple-select-label">Change Order status</InputLabel>
          <CustomInfiniteSelect onSelect={changeStatus}
                                url={`http://localhost:5000/api/order/customStatus/all`}></CustomInfiniteSelect>
        </OrderComponent>
      }
    </>
  );
};

export default Order;
