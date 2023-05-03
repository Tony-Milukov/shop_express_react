import React, { useEffect, useState } from 'react';
import './account.css';
import useRedirectNotLogin from '../../hooks/useAuth';
import userStore from '../../store/userStore';
import IUserInfoRequest from '../../types/userInfoRequest';
import getUserByToken from '../../utilits/getUserByToken';

const AccountPage = () => {
  useRedirectNotLogin();
  const token = userStore((state: any) => state.user.token);
  const [userInfo, setUserInfo] = useState<IUserInfoRequest>();

  const getUserInfo = async () => {
      const res = await getUserByToken(token);
      setUserInfo(res);
  };

  useEffect(() => {
    getUserInfo();
  }, [token]);
  return (
    <div>
      ACCOUNT
      <img src={`http://localhost:5000/${userInfo?.img}`} alt=""/>
    </div>
  );
};

export default AccountPage;
