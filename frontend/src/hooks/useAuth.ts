import { useState, useEffect } from 'react';
import userStore from '../store/userStore';
import getUserByToken from '../utilits/getUserByToken';

const useAuth = () => {
  const token = userStore((state: any) => state.user.token);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const logout = userStore((state: any) => state.logout);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserByToken(token);
        setIsAuth(true);
      } catch {
        setIsAuth(false);
        if(token) {
          logout()
        }
      }

    };
    if (token) {
      checkAuth();

    } else {
      setIsAuth(false);
    }
  }, [token,logout]);
  return isAuth;
};

export default useAuth;
