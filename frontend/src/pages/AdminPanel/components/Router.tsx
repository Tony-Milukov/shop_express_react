import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './panelItems/users/Users';
import Roles from './panelItems/Roles/Roles';
import Products from './panelItems/Products/Products';
import Categories from './panelItems/Categories/Categories';
import Brands from './panelItems/Brands/Brands';
import Orders from './panelItems/Orders/Orders';
import Order from './panelItems/Order/Order';
import Statuses from './panelItems/Statuses/Statuses';

const Router = () => {
  return (
    <Routes>
      <Route path={'users/:page?'} element={<Users/>}></Route>
      <Route path={'orders/:page?'} element={<Orders/>}></Route>
      <Route path={'products/:page?'} element={<Products/>}></Route>
      <Route path={'categories/:page?'} element={<Categories/>}> </Route>
      <Route path={'brands/:page?'} element={<Brands/>}></Route>
      <Route path={'roles/:page?'} element={<Roles/>}></Route>
      <Route path={'order/:orderId'} element={<Order/>}></Route>
      <Route path={'statuses/:page?'} element={<Statuses/>}></Route>
    </Routes>
  );
};

export default Router;
