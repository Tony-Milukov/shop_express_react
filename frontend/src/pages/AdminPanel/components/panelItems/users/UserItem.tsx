import React, { FC } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import IUser from '../../../../../types/userInfoRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import userStore from '../../../../../store/userStore';
import Dialog from '../../../../../components/Dialog/Dialog';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface IUserItemProps {
  item: IUser;
  update: any;
}

const UserItem: FC<IUserItemProps> = ({
  item,
  update
}) => {
  const token = userStore((state: any) => state.user.token);
  const openButtonDialog = (
    <DeleteIcon className={'deleteUserAdmin'}/>
  );

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${item.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      update();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ListItem className={'userItem'}>
        <ListItemAvatar>
          <Avatar src={`http://localhost:5000/${item.img}`}/>
        </ListItemAvatar>

        <ListItemText primary={item.username} secondary={item.email}/>
        <Link className={'menuLink adminUserOrders'} to={`/admin/orders/user/${item.id}`}> <Button
          variant="outlined" size="small">
          orders
        </Button></Link>

        <Dialog title={'Are you sure you want to delete this account?'}
                handler={deleteUser}
                value={<>This is going to be deleted forever <br/> are you sure ? </>}
                failureValue={'break'} OpenButton={openButtonDialog} succesValue={'delete'}/>
      </ListItem>

    </>
  )
    ;
};
export default UserItem;
