import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItem_ from './MenuItem_';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import MoreIcon from '@mui/icons-material/MoreVert';
import userStore from '../../../store/userStore';
import checkIsAdmin from '../../../utilits/checkIsAdmin';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AuthItems = () => {
  const token = userStore((state: any) => state.user.token);
  const logout = userStore((state: any) => state.logout);
  const nav = useNavigate()
  const [isAdmin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    (
      async () => {
        setAdmin(await checkIsAdmin(token));
      }
    )();
  }, [token]);

  const doLogout = () => {
    logout();
    nav('/login');
  };
  return (
   token ?  <>
     {
       isAdmin ?  <MenuItem_ link={'/admin'} Icon={AdminPanelSettingsIcon}/> : null
     }
      <Link to={'/cart'} className="menuLink">
        <IconButton
          size="large"
          color="inherit"
        >
          <ShoppingCartIcon/>
        </IconButton>
      </Link>

      <MenuItem_ link={'/account'} Icon={AccountCircle}/>

      <IconButton
        onClick={doLogout}
        size="large"
        color="inherit">
        <LogoutIcon/>
      </IconButton>
      <Box sx={{
        display: {
          xs: 'flex',
          md: 'none'
        }
      }}>


      </Box>

    </> : null
  );
};

export default AuthItems;
