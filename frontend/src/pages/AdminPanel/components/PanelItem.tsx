import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';

interface IPanelItemProps {
  Icon: any,
  title: string,
}

const PanelItem: FC<IPanelItemProps> = ({
  title,
  Icon,
}) => {
  return (
    <>
      <ListItem sx={{ padding: '8px' }}>
        <ListItemButton>
          <Icon/>
          <ListItemText className={'panelItem'} primary={title}/>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default PanelItem;
