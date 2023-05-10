import React from 'react';
import PanelItems from '../../Paneltems';
import UserItem from './UserItem';


const UserPanel = () => {
  return (
      <PanelItems  dialog={false} ListItem={UserItem} url={'http://localhost:5000/api/user'} paginationUrl={"/admin/users"} name={"user"}/>
  );
};
export default UserPanel;
