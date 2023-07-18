import React, { useState } from 'react';
import IProduct from '../../../types/product';
import axios from 'axios';
import RenderProducts from '../../Products/components/RenderProducts';

const HomeProducts = () => {
  const [products,setProducts] = useState<IProduct[]>()
  const getProducts = async () => {
      const {data} =  await axios.get("http://localhost:5000/api/products/random/10")
    setProducts(data)
  }
  useState(() => {
      getProducts()
  })
  return (
    <>
      <RenderProducts products={products!}/>
    </>
  );
};

export default HomeProducts;
