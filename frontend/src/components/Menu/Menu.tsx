import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import userStore from '../../store/userStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './menu.css';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './components/MobileMenu';
import Menu from './components/Menu';

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
  const searchValue = userStore((state: any) => state.user.searchValue);
  const setSearchValue = userStore((state: any) => state.setSearchValue);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const nav = useNavigate();
  const location = useLocation();
  //we are getting a current path
  const currentPath = location.pathname.split('/')[1];

  //setting searchValue to default
  window.onload = function () {
    setSearchValue('');
  };


  useEffect(() => {
    if (searchValue && currentPath !== 'products') {
      nav(`/products`);
    }
  }, [searchValue]);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
}

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
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            {searchValue ? <IconButton className={'clearButton'}
                                       onClick={() => setSearchValue('')}><ClearIcon/></IconButton> : null}
          </Search>

          <Box sx={{ flexGrow: 1 }}/>
          <Box sx={{
            display: {
              xs: 'none',
              md: 'flex'
            }
          }}>
            <Menu/>
          </Box>
          <IconButton
            onClick={handleMobileMenu}
            className={"openMobileMenuIcon"}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

      </AppBar>
     <MobileMenu handleMobileMenu={handleMobileMenu} isMobileMenuOpen={isMobileMenuOpen}/>

    </Box>
  );
}
