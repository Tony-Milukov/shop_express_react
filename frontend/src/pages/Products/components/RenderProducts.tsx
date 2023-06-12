import React, { FC } from 'react';
import IProduct from '../../../types/product';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { Grid } from '@mui/material';

interface RenderProductsProps {
  products: IProduct[];
}

const RenderProducts: FC<RenderProductsProps> = ({ products }) => {
  return (
   <>
     { products &&  products.length !== 0 ? <Grid container spacing={2} className="products productsMain">
       {
         products?.map((product: IProduct) => <ProductItem key={product.id} item={product}/>)
       }
     </Grid> : <span className={"noProductsMsg"}>Products were not defined</span>}
   </>
  );
};

export default RenderProducts;
