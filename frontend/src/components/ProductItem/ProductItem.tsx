import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import IProduct from '../../types/product';

interface ProductItemProps {
  item: IProduct
}
const ProductItem: FC <ProductItemProps> = ({item}) => {
  return (
   <Link className={"menuLink"} to={`/product/${item.id}`}>
     <Card className={"product"} sx={{ display: 'flex' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
         <CardContent sx={{ flex: '1 0 auto' }}>
           <Typography component="div" variant="h5">
             {item.title}
           </Typography>
           <Typography variant="subtitle1" color="text.secondary" component="div">
             {item.price}$
           </Typography>
         </CardContent>
       </Box>
       <CardMedia
         component="img"
         sx={{ width: 151 }}
         image={`http://localhost:5000/${item.img}`}
         alt="product image"
       />
     </Card>
   </Link>
);
};

export default ProductItem;
