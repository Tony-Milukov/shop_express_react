import React from 'react';
import MenuItem_ from './MenuItem_';
import LoginIcon from '@mui/icons-material/Login';
import userStore from '../../../store/userStore';
import AuthItems from './AuthItems';

const Menu = () => {
  const token = userStore((state: any) => state.user.token);
  return (
    <>
      <AuthItems/>
      {!token ? <MenuItem_ link={'/login'} Icon={LoginIcon} /> : null }
    </>
  );
};

export default Menu;
