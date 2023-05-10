import React, { useEffect, useState } from 'react';
import userStore from '../../store/userStore';
import getUserByToken from '../../utilits/getUserByToken';
import IUserInfoRequest from '../../types/userInfoRequest';
import InventoryIcon from '@mui/icons-material/Inventory';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './admin.css';
import PanelMenuItem from './components/PanelMenuItem';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Shop2Icon from '@mui/icons-material/Shop2';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Router from './components/Router';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className={'adminPanel'}>
      <Box className={'panelNav'} sx={{
        width: '100%',
        maxWidth: 360,
      }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <PanelMenuItem to={'users'} title={'Users'} Icon={PeopleAltIcon}/>
            <PanelMenuItem to={'orders'} title={'Orders'} Icon={Shop2Icon}/>
            <PanelMenuItem to={'products'} title={'Products'} Icon={InventoryIcon}/>
            <PanelMenuItem to={'categories'} title={'Categories'} Icon={CategoryIcon}/>
            <PanelMenuItem to={'brands'} title={'Brands'} Icon={ApartmentIcon}/>
            <PanelMenuItem to={'roles'} title={'Roles'} Icon={AccessibilityIcon}/>
          </List>
        </nav>
      </Box>
      <main>
        <Router/>
      </main>
    </div>
  );
};

export default AdminPanel;
