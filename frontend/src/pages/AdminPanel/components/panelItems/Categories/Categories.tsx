import React from 'react';
import PanelItems from '../../Paneltems';

const Categories = () => {
  return (
    <PanelItems url={'http://localhost:5000/api/category'} paginationUrl={"/admin/categories"} name={"category"}/>
  );
};

export default Categories;
