import React, { FC } from 'react';
import { IBasketItem } from '../../../types/IBaskertItem';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import userStore from '../../../store/userStore';
import { Link } from 'react-router-dom';

interface IBasketItemProps {
  product: IBasketItem;
  update: any;
}

const BasketItem: FC<IBasketItemProps> = ({
  product,
  update
}) => {
  const token = userStore((state: any) => state.user.token);

  const removeCartItem = async () => {
    try {
      await axios.delete<any>(`http://localhost:5000/api/basket/product/${product.id}/${product.basket_item.basketId}/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await update()
    } catch (e) {
      console.log(e);
    }
  };
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
              <div className="cartItemChangeCount">Quantyty: <span> <input
                value={product.basket_item.count}
                min="0" max="999" disabled type="number"/></span></div>
            </div>
          </CardContent>
          <CardActions className={'removeFromCartBtn'}>
            <span  onClick={removeCartItem}>X</span>
          </CardActions>
        </Box>
      </Card>
  );
};

export default BasketItem;
