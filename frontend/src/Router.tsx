import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Nav from './components/Menu/Nav';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AccountPage from './pages/Account/AccountPage';
import useAuth from './hooks/useAuth';

function Router() {
  const isAuth = useAuth()

  const authRoutes  = (
    <Routes>
      <Route path={'/account'} element={<AccountPage/>}></Route>
    </Routes>
  )
  const guestRoutes  = (
    <Routes>
      <Route path={'/login'} element={<LoginPage/>}></Route>
      <Route path={'/register'} element={<RegisterPage/>}></Route>
    </Routes>
  )
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
        {
          isAuth ?
            //only auth paths
            authRoutes
            //only not auth paths
            : guestRoutes
        }
      </BrowserRouter>
    </div>
  );
}

export default Router;
