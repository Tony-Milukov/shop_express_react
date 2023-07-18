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
    <Grid className={"productItem"} item xs={12} sm={"auto"} md={3.5} lg={2.5}>
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
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        {/* <div className="card"> */}
        {/*   <Link to={`/product/${item.id}`}> <img height="420" className="img" src={`http://localhost:5000/${item.img}`} alt="photo"/></Link> */}
        {/*   <Link to={`/product/${item.id}`}><h1 className="h1-card capitalize">{item.title}</h1></Link> */}
        {/*   <Link to={`/product/${item.id}`}> */}
        {/*     <p className="p-card">Known for her sculptural takes on traditional  tailoring, Australian arbiter */}
        {/*       of cool Kym Ellery teams  up with Moda Operandi.</p></Link> */}
        {/*   <p className="prices">{item.price}$</p> */}
        {/* </div> */}
      </Link>
    </Grid>
);
};

export default ProductItem;
