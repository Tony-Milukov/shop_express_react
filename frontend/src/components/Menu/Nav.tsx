import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import MenuItem_ from './components/MenuItem_';

import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import userStore from '../../store/userStore';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './menu.css';
import { useEffect, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import checkIsAdmin from '../../utilits/checkIsAdmin';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const token = userStore((state: any) => state.user.token);
  const logout = userStore((state: any) => state.logout);
  const nav = useNavigate();
  const [isAdmin, setAdmin] = useState<boolean>(false);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const doLogout = () => {
    logout();
    nav('/login');
  };
  useEffect(() => {
    (
      async () => {
        setAdmin(await checkIsAdmin(token));
      }
    )();
  }, [token]);
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <MenuItem_ link={'/profile'} Icon={AccountCircle}/>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const renderAuthItems = (
    <>
      <Link to={'/cart'} className="menuLink">
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={12} color="error">
            <ShoppingCartIcon/>
          </Badge>
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
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon/>
        </IconButton>
      </Box>

    </>

  );

  const renderNoAuthItems = (
    <>
      <MenuItem_ link={'/login'} Icon={LoginIcon}/>
    </>
  );
  const renderAdminItems = (
    <>
      <MenuItem_ link={'/admin'} Icon={AdminPanelSettingsIcon}/>
    </>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link className={'menuLink'} to={'/'}><Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}
          >
            TonyZon
          </Typography></Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }}/>
          <Box sx={{
            display: {
              xs: 'none',
              md: 'flex'
            }
          }}> {token ? <>  {isAdmin ? renderAdminItems : null} {renderAuthItems}</> : renderNoAuthItems}</Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  )
    ;
}
