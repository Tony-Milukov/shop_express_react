import axios from 'axios';
import IUserInfoRequest from '../types/userInfoRequest';

export default async (token:string) => {
  const {data} = await axios.post<IUserInfoRequest>(`http://localhost:5000/api/user/account`, {},{
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     })
  return data
}
