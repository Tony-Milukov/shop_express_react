import React from 'react';
import PanelItems from '../../Paneltems';
const Statuses = () => {
  return (
    <PanelItems url={'http://localhost:5000/api/order/customStatus'} paginationUrl={"/admin/brands"} name={"name"}/>
  );
};

export default Statuses;
