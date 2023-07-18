import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Nav from './components/Menu/Menu';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AccountPage from './pages/Account/AccountPage';
import useAuth from './hooks/useAuth';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import checkIsAdmin from './utilits/checkIsAdmin';
import userStore from './store/userStore';
import { useEffect, useState } from 'react';
import OrderPage from './pages/Order/OrderPage';
import Products from './pages/Products/Products';
import ProductPage from './pages/ProductPage/ProductPage';
import Basket from './pages/Basket/Basket';
import OrdersPage from './pages/Orders/OrdersPage';
import Footer from './components/Footer/Footer';
function Router() {
  const token = userStore((state: any) => state.user.token);
  const isAuth = useAuth()
  const [isAdmin,setAdmin] = useState<boolean>(false)
  useEffect(() => {
    (
      async () => {
       try {
         setAdmin(await checkIsAdmin(token))
       } catch (e) {
         console.log(e);
       }
      }
    )()
  },[token])
  const adminRoutes  = (
    <>
      <Route path={'/admin/*'} element={<AdminPanel/>}></Route>
    </>
  )
  const authRoutes  = (
    <Routes>
      <Route path={'/account'} element={<AccountPage/>}></Route>
      <Route path={'/order/:orderId'} element={<OrderPage/>}></Route>
      <Route path={'/orders'} element={<OrdersPage/>}></Route>
      <Route path="/cart" element={<Basket/>}/>
      {isAdmin ? adminRoutes : null}
    </Routes>
  )
  const guestRoutes  = (
    <Routes>
      <Route path={'/login'} element={<LoginPage/>}></Route>
      <Route path={'/register'} element={<RegisterPage/>}></Route>
    </Routes>
  )
  return (
    <div id={"index"}>
      <div className="content">
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/products/:page?" element={<Products/>}/>
            <Route path="/product/:productId" element={<ProductPage/>}/>
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
      <Footer/>
    </div>
  );
}

export default Router;
