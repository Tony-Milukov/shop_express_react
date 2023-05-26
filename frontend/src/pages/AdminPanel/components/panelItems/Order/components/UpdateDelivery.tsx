import React, { FC, useEffect, useState } from 'react';
import Dialog from '../../../../../../components/Dialog/Dialog';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import IDeliveryInfo from '../../../../../../types/deliveryInfo';
import axios from 'axios';
import IOrder from '../../../../../../types/order';
import userStore from '../../../../../../store/userStore';
import { deliveryInfoRegExp, deliveryInfoRegExpErrs } from './updateDeliveryRegExp';

interface IUpdateDeliveryProps {
  orderId?: number | string;
  updateOrder: () => void;
}


const UpdateDelivery: FC<IUpdateDeliveryProps> = ({
  orderId,
  updateOrder
}) => {
  const token = userStore((state: any) => state.user.token);

  //delivery info obj
  const [deliveryInfo, setDeliveryInfo] = useState<IDeliveryInfo>();

  // updateInputs will be generated by this
  const deliveryInfoFields: { [key: string]: string } = {
    company: 'company',
    code: 'tracking code',
    link: 'tracking link',
    extraInfo: '* extra info',
  };

  //send request to get Data
  const getDeliveryInfo = async () => {
    const { data: { order_delivery_info } } = await axios.get<IOrder>(`http://localhost:5000/api/order/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    setDeliveryInfo(order_delivery_info);
  };

  //update deliveryInfo on server, if all inputs are good
  const updateDeliveryInfo = async () => {
    const regExpTest = deliveryInfo ?
      Object.keys(deliveryInfoFields)
        .every(
          key => deliveryInfoRegExp[key].test(`${deliveryInfo && deliveryInfo[key] ? deliveryInfo[key] : ''}`)) : false;

    if (regExpTest) {
      await axios.put('http://localhost:5000/api/order/delivery', {
        orderId: orderId,
        deliveryInfo: deliveryInfo
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      //get delivery items
      getDeliveryInfo();

      //update to show new data
      updateOrder();
    }
  };
  useEffect(() => {
    getDeliveryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //if the regExp for this input is not good it would return an error,
  const showErr = (key: string) => {
    if (!deliveryInfoRegExp[key].test(`${deliveryInfo && deliveryInfo[key] ? deliveryInfo[key] : ''}`)) {
      return <span className={'errorMSG'}>{deliveryInfoRegExpErrs[key]}</span>;
    }
  };
  return (
    <Dialog succesValue={'update'} failureValue={'back'} handler={updateDeliveryInfo}
            OpenButton={<Button className={'updateDeliveryBtn'}>Update delivery
              Info</Button>}>
      {Object.keys(deliveryInfoFields)
        .map((key: string | keyof typeof deliveryInfo) => (
          <>
            <TextField
              key={key}
              className={'deliveryInfoInput'}
              onChange={(e: any) => setDeliveryInfo({
                ...deliveryInfo,
                [key]: e.target.value
              })}
              id="standard-multiline-flexible"
              multiline
              value={deliveryInfo && deliveryInfo[key] ? deliveryInfo[key] : ''}
              label={deliveryInfoFields[key]}
              maxRows={4}
              variant="standard"
              helperText={showErr(key)}/>
            <br/>
          </>
        ))}
    </Dialog>
  );
};

export default UpdateDelivery;
