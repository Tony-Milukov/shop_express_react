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
  List,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountItem from './components/AccountItem';
import Dialog from '../../components/Dialog/Dialog';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, img]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  const deleteAccount = () => {
    (async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      nav('/login');
      logout();
    } catch (e) {
      console.log(e);
    }

    })();

  };
const openButtonDialog = (
  <Button className={'deleteAcc'} variant={'outlined'} startIcon={<DeleteIcon/>}>DELETE</Button>
)

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
      <Dialog handler={deleteAccount}
              value={<>This is going to be deleted forever <br/> are you sure ? </>}
                  failureValue={'break'} OpenButton={openButtonDialog} succesValue={'delete'}/>
    </div> : null
  );
};

export default AccountPage;
