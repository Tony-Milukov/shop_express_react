import React, { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import IProduct from '../../types/product';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import userStore from '../../store/userStore';
import "./products.css"


interface IProductsRequest {
  count: number,
  rows: IProduct[]
}

const Products = () => {
  const [produts,setProducts] = useState<IProductsRequest | null>()
  const page = useParams().page ?? 1
  const pageSize: number = 50
  const token = userStore((state:any) => state.token)
  const getProducts = async () => {
     try {
       const {data} =  await axios.post("http://localhost:5000/api/products/all", {
         pageSize:pageSize,
         page:page
       }, {
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         }
       })
       setProducts(data)
     }catch(err) {
       console.log(err);
     }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="products productsMain">
      {
        produts?.rows.map((product:IProduct) => <ProductItem item={product}/>)
      }
    </div>
  );
};

export default Products;
