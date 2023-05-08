import React from 'react';
import PanelItems from '../../Paneltems';
const Brands = () => {
  return (
    <PanelItems url={'http://localhost:5000/api/brand'} paginationUrl={"/admin/brands"} name={"brand"}/>
  );
};

export default Brands;
