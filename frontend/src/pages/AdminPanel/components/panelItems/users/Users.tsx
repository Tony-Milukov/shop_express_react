import React, { useEffect, useState } from 'react';
import userStore from '../../../../../store/userStore';
import IUser from '../../../../../types/userInfoRequest';
import axios from 'axios';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import UserItem from './UserItem';
import IUsersAdmin from '../../../../../types/usersAdmin';
import { List, Pagination, PaginationItem, Stack } from '@mui/material';

const UserPanel = () => {
  const token = userStore((state: any) => state.user.token);
  const [users, setUsers] = useState<IUsersAdmin>();
  const page = useParams().page ?? 1;
  const nav = useNavigate()
  const location = useLocation()
  const pageSize = 5
  const getUsers = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/all', {
        pageSize:pageSize ,
        page: page
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(!users?.rows) {
      nav('/admin/users/1')
    }
    getUsers();

  }, [location]);

  const handlePagination = (event:any,page:number) => {
    nav(`/admin/users/${page}`)
  }
  return (
    <>
      <List className={'usersAdmin'} sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
      }}>
        {users?.rows?.map(((user: IUser) => <UserItem update={getUsers} key={user.id}
                                                      user={user}/>))}
      </List>
         <Stack spacing={2}>
          <Pagination count={users?.count ? (users.count < pageSize ? 1 : users.count / pageSize) : 0} onChange={handlePagination}/>
        </Stack>
    </>
  );
};
export default UserPanel;
