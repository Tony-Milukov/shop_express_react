/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userStore from '../../../../../store/userStore';
import IBrandsRequest from '../../../../../types/brandsRequest';
import IBrand from '../../../../../types/IBrand';
import BrandItem from './BrandItem';
import { Fab, List, Pagination, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "./brands.css"
const Brands = () => {
  const [brands,setBrands] = useState<IBrandsRequest>()
  const token = userStore((state: any) => state.user.token);
  const nav = useNavigate()
  const page = (useParams()).page ?? 1
  const pageSize = 5
  const location = useLocation()
  const getBrands = async () => {
    try {
      const { data } = await axios.post<IBrandsRequest>('http://localhost:5000/api/brand/all', {
        pageSize:pageSize,
        page: page
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setBrands(data)
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if(!brands?.rows) {
      nav('/admin/brands/1')
    }
    getBrands()
  },[location])
  const handlePagination = (event:any,page:number) => {
    nav(`/admin/brands/${page}`)
  }

  return (
    <div className={"brandsMain"}>
          <List className={"brandsList"}>
            {
              brands?.rows.map((brand: IBrand) => <BrandItem update={getBrands} brand={brand}/>)
            }
          </List>
      <Fab className={"addButton"} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Stack spacing={2}>
        <Pagination count={brands?.count ? (brands.count < pageSize ? 1 : brands.count / pageSize) : 0} onChange={handlePagination}/>
      </Stack>
    </div>
  );
};


export default Brands;
