import React, { FC } from 'react';
import IProduct from '../../../types/product';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { Grid } from '@mui/material';

interface RenderProductsProps {
  products: IProduct[]
}
const RenderProducts: FC <RenderProductsProps> = ({products}) => {
  return (
    <Grid container  spacing={2} className="products productsMain">
      {
        products?.map((product:IProduct) => <ProductItem item={product}/>)
      }
    </Grid>
  );
};

export default RenderProducts;
