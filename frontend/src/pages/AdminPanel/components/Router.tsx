import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './panelItems/users/Users';
import Roles from './panelItems/Roles';
import Products from './panelItems/Products';
import Orders from './panelItems/Orders';
import Categories from './panelItems/Categories/Categories';
import Brands from './panelItems/Brands/Brands';

const Router = () => {
  return (
    <Routes>
      <Route path={'users/:page?'} element={<Users/>}></Route>
      <Route path={'orders/:page?'} element={<Orders/>}></Route>
      <Route path={'products/:page?'} element={<Products/>}></Route>
      <Route path={'categories/:page?'} element={<Categories/>}> </Route>
      <Route path={'brands/:page?'} element={<Brands/>}></Route>
      <Route path={'roles/:page?'} element={<Roles/>}></Route>
    </Routes>
  );
};

export default Router;
