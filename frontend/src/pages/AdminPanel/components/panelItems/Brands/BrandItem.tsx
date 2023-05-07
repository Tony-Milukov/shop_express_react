import React, { FC } from 'react';
import IBrand from '../../../../../types/IBrand';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Dialog from '../../../../../components/Dialog/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import userStore from '../../../../../store/userStore';

interface IBrandItemProps {
  brand: IBrand;
  update: () => void
}

const BrandItem: FC<IBrandItemProps> = ({ brand ,update}) => {
  const token = userStore((state: any) => state.user.token);
  const deleteBrand = async () => {
    await axios.delete(`http://localhost:5000/api/brand/${brand.id}`, {
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
  value={<>If you delete this, <br/> all products with that brand will be
  deleted! <br/> are you sure? </>} failureValue={'break'} succesValue={"delete"} OpenButton={openDialogButton}></Dialog>
}
>
  <ListItemText
    primary={`Brand: ${brand.name}`}
  />
  </ListItem>
  </>
  </div>
);
};

  export default BrandItem;
