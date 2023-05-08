import React, { FC } from 'react';
import IITemPanelList from '../../../../types/IITemPanelList';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Dialog from '../../../../components/Dialog/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import userStore from '../../../../store/userStore';

interface IBrandItemProps {
  item: IITemPanelList,
  update: () => void,
  deleteUrl: string
}

const ListItemAdmin: FC<IBrandItemProps> = ({ item ,update,deleteUrl}) => {
  const token = userStore((state: any) => state.user.token);
  const deleteBrand = async () => {
    await axios.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    await update()
  };
  const openDialogButton = (
    <IconButton edge="end" aria-label="delete">
    <DeleteIcon/>
    </IconButton>
);
  return (
    <div>
      <>
        <ListItem className={'userItem'}
  secondaryAction={
    <Dialog handler={deleteBrand}
            title={'Are you sure you want to delete this?'}
            value={<>If you delete this, <br/> all products with that brand will be
  deleted!</>} failureValue={'break'} succesValue={"delete"} OpenButton={openDialogButton}></Dialog>

}
>
  <ListItemText
    primary={`${item.name}`}
  />
  </ListItem>
  </>
  </div>
);
};

  export default ListItemAdmin;
