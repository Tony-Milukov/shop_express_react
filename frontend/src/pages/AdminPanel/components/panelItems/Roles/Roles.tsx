import React from 'react';
import PanelItems from '../../Paneltems';
const Roles = () => {
  return (
      <PanelItems url={'http://localhost:5000/api/role'} paginationUrl={"/admin/role"} name={"role"}/>
  );
};

export default Roles;
