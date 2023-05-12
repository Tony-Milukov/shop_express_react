import axios from 'axios';
export default async (token:string) => {
 try {
   const result = await axios.post("http://localhost:5000/api/role",{
     roleId: 3
   },{
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     }
   })
   return !!result
 } catch (e) {
   return false
 }
  return false
}
