import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './order.css';
import OrderComponent from '../../../../../components/Order/Order';
import { FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import IOrder from '../../../../../types/order';
import userStore from '../../../../../store/userStore';
import Popup from '../../../../../components/Popup/Popup';
import InfiniteScroll from 'react-infinite-scroll-component';
import { start } from 'repl';

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const [statuses, setStatuses] = useState<any>();
  const [err, setErr] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 2;
  const token = userStore((state: any) => state.user.token);
  const getOrders = async () => {
    try {
      setErr(false);
      const { data } = await axios.get<IOrder>(`http://localhost:5000/api/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOrder(data);
    } catch {
      setErr(true);
    }
  };

  const getStatuses = async () => {
    try {
      setErr(false);
      const { data } = await axios.post<any>(`http://localhost:5000/api/order/customStatus/all`, {
        page: page,
        pageSize: pageSize
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setStatuses(data);
      setPage(page + 1)
    } catch {
      setErr(true);
    }
  };
  useEffect(() => {
    getOrders();
    getStatuses();
  }, [orderId, token]);
  const currentStatus = order?.statuses[order?.statuses.length - 1];
  const [status, setStatus] = useState(currentStatus?.id ?? 1);
  const changeStatus = (e:any) => {
    setStatus(e.target.value)
  }
  const hasMore = page < Math.round(pageSize / statuses?.count);
  return (
    <>
      {
        err ? <Popup/> : <OrderComponent orderId={orderId}>
          <InputLabel id="demo-simple-select-label">Change Order status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label={'status'}
            onChange={(e: any) => changeStatus(e)}
          >
            <InfiniteScroll
              dataLength={statuses?.count}
              next={getStatuses}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              {statuses?.rows?.map((status: any) => (
                <MenuItem key={status?.id} value={status?.id}>
                  {status?.name}
                </MenuItem>
              ))}
            </InfiniteScroll>
          </Select>
        </OrderComponent>
      }
    </>
  );
};

export default Order;
