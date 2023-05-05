import React, { useEffect, useState } from 'react';
import './account.css';
import useRedirectNotLogin from '../../hooks/useAuth';
import userStore from '../../store/userStore';
import IUserInfoRequest from '../../types/userInfoRequest';
import getUserByToken from '../../utilits/getUserByToken';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Avatar,
  Button,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountItem from './components/AccountItem';

const AccountPage = () => {
  useRedirectNotLogin();
  const token = userStore((state: any) => state.user.token);
  const logout = userStore((state: any) => state.logout);
  const [userInfo, setUserInfo] = useState<IUserInfoRequest>();
  const [img, setImg] = useState<File>();
  const nav = useNavigate();
  const getUserInfo = async () => {
    const res = await getUserByToken(token);
    setUserInfo(res);
  };

  useEffect(() => {
    getUserInfo();
  }, [token,img]);

  useEffect(() => {
    (async () => {
      if (img) {
        const formData = new FormData();
        formData.append('img', img);
        await axios.put('http://localhost:5000/api/user/img', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        await getUserInfo();
      }
    })();
  }, [img]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const deleteAccount = () => {
    (async () => {
      await axios.delete('http://localhost:5000/api/user/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    })();
    nav('/login');
    logout()
  };
  return (
    userInfo ? <div className={'accountPage'}>
      <Container className={'accountMain'} maxWidth="sm"><Avatar alt="Remy Sharp"
                                                                 src={`http://localhost:5000/${userInfo?.img}`}
                                                                 sx={{
                                                                   width: 100,
                                                                   height: 100
                                                                 }}
      /><Stack className={'uploadImg'} direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label">
          Update
          <input onChange={(e: any) => setImg(e.target.files[0])} hidden
                 accept="image/x-png,image/jpeg,image/jpg"
                 multiple type="file"/>
        </Button>
      </Stack>
        <List sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}>
          <AccountItem Icon={EmailIcon} value={userInfo.email}/>
          <AccountItem Icon={PersonIcon} value={userInfo.username}/>
        </List>
      </Container>
      <Button onClick={handleOpenDialog} className={'deleteAcc'} variant="outlined"
              startIcon={<DeleteIcon/>}>
        Delete Account
      </Button>
      <Dialog
        open={dialogOpen}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Are you sure you want to delete your account?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            It is going to be deleted forever <br/> and cannot be recovered!

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>no</Button>
          <Button onClick={deleteAccount}>delete</Button>
        </DialogActions>
      </Dialog>
    </div> : null
  );
};

export default AccountPage;
