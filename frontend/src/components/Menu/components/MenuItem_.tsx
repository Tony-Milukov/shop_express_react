import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
interface IMenuItemProps {
  Icon: any,
  link: string,
}

const MenuItem:FC<IMenuItemProps> = ({Icon,link}) => {
  return (
      <Link to={link} className="menuLink">
        <IconButton
          size="large"
          color="inherit"
        >
            <Icon/>
        </IconButton>
      </Link>
  );
};

export default MenuItem;
