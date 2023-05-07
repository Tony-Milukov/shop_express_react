import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './panelItems/users/Users';
import Roles from './panelItems/Roles';
import Products from './panelItems/Products';
import Orders from './panelItems/Orders';
import Categories from './panelItems/Categories';
import Brands from './panelItems/Brands';

const Router = () => {
  return (
    <Routes>
      <Route path={'users/:page?'} element={<Users/>}></Route>
      <Route path={'orders'} element={<Orders/>}></Route>
      <Route path={'products'} element={<Products/>}></Route>
      <Route path={'categories'} element={<Categories/>}> </Route>
      <Route path={'brands'} element={<Brands/>}></Route>
      <Route path={'roles'} element={<Roles/>}></Route>
    </Routes>
  );
};

export default Router;
