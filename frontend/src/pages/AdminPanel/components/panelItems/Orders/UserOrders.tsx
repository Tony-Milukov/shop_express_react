import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../../../../../components/Popup/Popup';
import OrdersPage from '../../../../Orders/OrdersPage';
const UserOrders = () => {
  const { userId } = useParams();

  useEffect(() => {
    if(!userId) {
      setErr(true)
    }
  }, [userId])
  const [err, setErr] = useState<boolean>(false);

  return (
    !err ?
      <OrdersPage userId={userId} />
      : <Popup/>
  );
};

export default UserOrders;
