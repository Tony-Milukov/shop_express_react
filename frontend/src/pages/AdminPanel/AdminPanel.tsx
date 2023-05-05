import React, { useEffect, useState } from 'react';
import userStore from '../../store/userStore';
import getUserByToken from '../../utilits/getUserByToken';
import IUserInfoRequest from '../../types/userInfoRequest';
import InventoryIcon from '@mui/icons-material/Inventory';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './admin.css';
import PanelItem from './components/PanelItem';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Shop2Icon from '@mui/icons-material/Shop2';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
const AdminPanel = () => {
  const token = userStore((state: any) => state.user.token);
  const [user, setUser] = useState<IUserInfoRequest>();
  useEffect(() => {
    (async () => {
      setUser(await getUserByToken(token));
    })();
  }, []);

  return (
    <div>
      <Box className={'panelNav'} sx={{
        width: '100%',
        maxWidth: 360,
      }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <PanelItem title={'Users'} Icon={PeopleAltIcon}/>
            <PanelItem title={"Orders"} Icon={Shop2Icon}/>
            <PanelItem title={'Products'} Icon={InventoryIcon}/>
            <PanelItem title={'Categories'} Icon={CategoryIcon}/>
            <PanelItem title={"Brands"} Icon={ApartmentIcon}/>
            <PanelItem title={"Roles"} Icon={AccessibilityIcon}/>
          </List>
        </nav>
      </Box>
      <main>

      </main>
    </div>
  );
};

export default AdminPanel;
