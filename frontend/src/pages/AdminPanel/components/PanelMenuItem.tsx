import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface IPanelItemProps {
  Icon: any,
  title: string,
  to: string,
}

const PanelMenuItem: FC<IPanelItemProps> = ({
  title,
  Icon,
  to
}) => {
  return (
    <>
     <Link className={"menuLink"} to={to}>
       <ListItem sx={{ padding: '8px' }}>
         <ListItemButton>
           <Icon/>
           <ListItemText className={'panelItem'} primary={title}/>
         </ListItemButton>
       </ListItem>
     </Link>
    </>
  );
};

export default PanelMenuItem;
