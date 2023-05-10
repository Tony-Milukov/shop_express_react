import React, { FC, useEffect, useState } from 'react';
import IOrderItemReqest from '../../../../../types/orderItemReqest';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import axios from 'axios';
import userStore from '../../../../../store/userStore';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IOrder from '../../../../../types/order';

interface IOrderItemProps {
  update: () => void,
  item: IOrderItemReqest
}

const OrderItem: FC<IOrderItemProps> = ({
  update,
  item
}) => {
  const [order, setOrder] = useState<IOrder>();
  const token = userStore((state: any) => state.user.token);

  useEffect(() => {
    (async () => {
      console.log(item);
      const { data } = await axios.get<IOrder>(`http://localhost:5000/api/order/${item.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOrder(data);
    })();
  }, []);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const currentStatus = (order?.statuses[order?.statuses.length-1]);
  const price = order?.products.reduce((acc: number, value: any) => {
    return acc + value.price;
  }, 0);
  return (
    <>
      <div className="mainOrder">
      <div className={"openOrderInfoButton"}>
        <ListItemButton onClick={() => setInfoOpen(!infoOpen)}>
          <ListItemText primary={`Order #${item.id} (${order?.adress?.fullname})`}/>
          {infoOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
       <Link to={`/admin/order/${item.id}`}> <Button variant="contained">to Order</Button></Link>
      </div>
      <Collapse className={"orderInfoContainer"} in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={"orderInfoListItem"} sx={{ pl: 4 }}>
            <ListItemText primary={`price : ${price}$`} />
            <ListItemText primary={`delivered : ${item.deliveredDate ?? "not delivered"}`} />
            <ListItemText primary={`delivered : ${currentStatus?.name ?? "not defined"}`} />
            <ListItemText primary={`country: ${item?.adress.country}`} />
            <ListItemText primary={`ordered: ${item?.createdAt}`} />
            <ListItemText primary={`updated: ${item?.updatedAt}`} />
          </ListItem>
        </List>

      </Collapse>
        </div>

    </>
  )
};

export default OrderItem;

