import * as React from 'react';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';
import './menu.css';
import userStore from '../../store/userStore';

export default function HeaderMenu() {
  const token = userStore((state: any) => state.user.token);
  const logout = userStore((state:any) => state.logout)
  return (
    <div className={'menu'}>
      <MenuList>
        {/* allUsers */}
        <Link className={'menuLink'} to={'/'}><Button variant="text">Home</Button></Link>
        <Link className={'menuLink'} to={'/profile'}><Button variant="text">Products</Button></Link>

        {/* onlyAuth */}
        <Link className={'menuLink'} to={'/profile'}><Button variant="text">Profile</Button></Link>

      </MenuList>
      {
        !token ?
          <Link className={'menuLink'} to={'/login'}>
            <Button className={'authButton '} variant="text">Login</Button>
          </Link>
          : <Button onClick={() => logout()} variant="text">Logout</Button>
      }
    </div>
  );
}
