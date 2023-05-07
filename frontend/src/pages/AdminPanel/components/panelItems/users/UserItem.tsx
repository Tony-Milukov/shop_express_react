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
  user: IUser;
  update: any;
}

const UserItem: FC<IUserItemProps> = ({
  user,
  update
}) => {
  const token = userStore((state: any) => state.user.token);
  const openButtonDialog = (
    <DeleteIcon className={'deleteUserAdmin'}/>
  );

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${user.id}`, {
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
          <Avatar src={`http://localhost:5000/${user.img}`}/>
        </ListItemAvatar>

        <ListItemText primary={user.username} secondary={user.email}/>
        <Link className={'menuLink adminUserOrders'} to={`/user/${user.id}/orders`}> <Button variant="outlined" size="small">
          orders
        </Button></Link>

        <Dialog handler={deleteUser}
                value={<>This is going to be deleted forever <br/> are you sure ? </>}
                failureValue={'no'} OpenButton={openButtonDialog} succesValue={'delete'}/>
      </ListItem>

    </>
  )
    ;
};
export default UserItem;
