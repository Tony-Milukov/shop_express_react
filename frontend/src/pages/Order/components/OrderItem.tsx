import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import IProduct from '../../../types/product';
import IOrderProduct from '../../../types/IOrderProduct';
interface IOrderItemProps {
  product: IOrderProduct
}
const OrderItem:FC <IOrderItemProps> = ({
  product
}) => {
  return (
    <Card className="cartItem">
      <Link to={`/product/${product.id}`}><CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`http://localhost:5000/${product.img}`}
        alt={`image of ${product.title}`}
      /></Link>
      <Box sx={{
        display: 'flex',
      }}>
        <CardContent style={{ maxWidth: '150px', overflow: 'auto' }} className={'cartItemInfo'}>
          <Typography component="div" variant="h5">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product.description}
          </Typography>
          <span className="cartItemPrice">Price: <span
            className="price-dollar-cart">{product.price}$</span></span>
          <div className="cartItemCount">
            <div className="cartItemChangeCount">Quantyty: <span className="quantyty-value-cart"> <input
              value={product.order_product.count}
              disabled
              min="0" max="999" type="number"/></span></div>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};

export default OrderItem;
