import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useParams } from 'react-router-dom';
import userStore from '../../../../../store/userStore';
import IBrandsRequest from '../../../../../types/brandsRequest';
import "../Brands/brands.css"
const Categories = () => {
  const [categories,setCategories] = useState<IBrandsRequest>()
  const token = userStore((state: any) => state.user.token);
  const page = (useParams()).page ?? 1
  const pageSize = 5
  const location = useLocation()
  const getCategories = async () => {
    try {
      const { data } = await axios.post<IBrandsRequest>('http://localhost:5000/api/category/all', {
        pageSize:pageSize,
        page: page
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCategories(data)
      console.log(categories);

    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])


  return (
<div>
  Catgs
</div>
);
};


export default Categories;
