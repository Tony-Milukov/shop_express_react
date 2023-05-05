import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC } from 'react';
interface IAccItemProps {
  Icon: any,
  value: string
}
const AccountItem:FC<IAccItemProps> = ({Icon,value}) => {
  return (
      <ListItem className={'userInfoItem'}>
        <ListItemIcon>
          <Icon/>
        </ListItemIcon>
        <ListItemText primary={value}/>
      </ListItem>
  );
};

export default AccountItem;
