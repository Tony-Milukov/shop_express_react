import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Nav from './components/Menu/Nav';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AccountPage from './pages/Account/AccountPage';
import useAuth from './hooks/useAuth';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import checkIsAdmin from './utilits/checkIsAdmin';
import userStore from './store/userStore';
import { useEffect, useState } from 'react';
function Router() {
  const token = userStore((state: any) => state.user.token);
  const isAuth = useAuth()
  const [isAdmin,setAdmin] = useState<boolean>(false)
  useEffect(() => {
    (
      async () => {
        setAdmin(await checkIsAdmin(token))
      }
    )()
  },[token])
  const adminRoutes  = (
    <>
      <Route path={'/admin'} element={<AdminPanel/>}></Route>
    </>
  )
  const authRoutes  = (
    <Routes>
      <Route path={'/account'} element={<AccountPage/>}></Route>
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
