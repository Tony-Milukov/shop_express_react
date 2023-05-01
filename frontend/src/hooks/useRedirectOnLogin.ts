import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';
import axios from 'axios';

export default () => {
  const nav = useNavigate();
  const token = userStore((state: any) => state.user.token);
  useEffect(() => {
    if (token) {
      nav('/');
    } else {

   //getting the user to prove if the token is active

      (async () => {
        try {
          await axios.post('http://localhost:5000/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (e: any) {
          if (e.response.status !== 401) {
            nav('/');
          }
        }
      })();
    }

  }, []);
  return true

}
