import React, { FC } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import IDeliveryInfo from '../../../types/deliveryInfo';
import { Link } from '@mui/material';
import "../order.css"
interface DeliveryInfoItemProps {
  deliveryInfo?: IDeliveryInfo;
}

const DeliveryInfo: FC<DeliveryInfoItemProps> = ({ deliveryInfo }) => {
  return (
    <List className={'deliveryInfo'}>
      <ListItem>
        <ListItemText className={'DeliveryTitle'} primary="Delivery Informaiton"/>
      </ListItem>
      {
        deliveryInfo ?
          <div className={"deliveryInfoMain"}>
            <div className="deliveryInfoLeft">
              <ListItem className={"deliveryInfoItem"}>
                Shiping company:  <b>{String(deliveryInfo?.company)}</b>
              </ListItem>
              <ListItem className={"deliveryInfoItem"}>
                Shipping company:  <b>{String(deliveryInfo?.company)}</b>
              </ListItem>
              {deliveryInfo?.extraInfo ? <ListItem className={"deliveryInfoItem"}>
                *extra:  <b>{String(deliveryInfo?.extraInfo)}</b>
              </ListItem> : null }

            </div>
            <div className="deliveryInfoRight">
              <ListItem className={"deliveryInfoItem"}>
              <Link className={"trackOrderBtn"} target={'_blank'} href={String(deliveryInfo?.link)}><Button variant="contained">Track your order</Button></Link>
              </ListItem>
              <ListItem className={"deliveryInfoItem"}>
                Tracking code:  <b>{String(deliveryInfo?.code)}</b>
              </ListItem>
            </div>
          </div> : <span>Not sent yet</span>
      }
    </List>
  );
};

export default DeliveryInfo;
