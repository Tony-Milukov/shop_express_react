import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import userStore from '../../../../../store/userStore';
import IOrder from '../../../../../types/order';
import './order.css';
import IProduct from '../../../../../types/product';
import ProductItem from './ProductItem';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const token = userStore((state: any) => state.user.token);
  const currentStatus = (order?.statuses[order?.statuses.length - 1]);
  const price = order?.products.reduce((acc: number, value: any) => {
    return acc + value.price;
  }, 0);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<IOrder>(`http://localhost:5000/api/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOrder(data);
    })();
  }, []);
  const adress = order?.adress;
  return (
    <div className={'Order'}>
      <List  className={'orderDetails'} >
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
            <ListItem>
              <ListItemText primary={`Status: ${currentStatus?.name}`}/> <AutorenewIcon/>
            </ListItem>
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

      <div className="orderProducts">
        <span className={"orderProductsTitle"}>Ordered Products</span>
        {
          order?.products.map((item: IProduct) => <ProductItem item={item}/>)
        }
      </div>
    </div>
  );
};

export default Order;
