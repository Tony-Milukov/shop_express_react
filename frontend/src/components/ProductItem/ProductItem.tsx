import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import IProduct from '../../types/product';
import "./product.css"
interface ProductItemProps {
  item: IProduct
}

const ProductItem: FC <ProductItemProps> = ({item}) => {

  return (
    <Grid  className={"productItem"} item xs={12} sm={"auto"} md={4} lg={3}>
      <Link className={"menuLink productContainer"} to={`/product/${item.id}`}>
        <Card>
          <CardMedia
            sx={{ height: 140 }}
            image={`http://localhost:5000/${item.img}`}
            title="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description.slice(1, 50)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
);
};

export default ProductItem;
