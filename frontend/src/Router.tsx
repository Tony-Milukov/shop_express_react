import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Nav from './components/Menu/Nav';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path={'/login'} element={<LoginPage/>}></Route>
          <Route path={'/register'} element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
