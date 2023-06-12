import React, { FC, useEffect, useState } from 'react';
import IProduct from '../../types/product';
import axios from 'axios';
import RenderProducts from '../../pages/Products/components/RenderProducts';
import userStore from '../../store/userStore';

const SearchProducts = () => {
  const [products, setProducts] = useState<IProduct[] | []>();
  const searchValue = userStore((state: any) => state.user.searchValue);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/search/${searchValue}`);
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, [searchValue]);
  return (
    <>

      <RenderProducts products={products!}/>

    </>
  );
};

export default SearchProducts;
