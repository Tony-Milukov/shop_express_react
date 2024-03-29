/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import IProduct from '../../types/product';
import Popup from '../../components/Popup/Popup';
import './productPage.css';
import { IBasket } from '../../types/IBasket';
import userStore from '../../store/userStore';
import { useSnackbar } from 'notistack';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const token = userStore((state: any) => state.user.token);
  const nav = useNavigate();
  const [basket, setBasket] = useState<IBasket>();
  const getProduct = async () => {
    try {
      const { data } = await axios.get<IProduct>(`http://localhost:5000/api/products/id/${productId}`);
      setProduct(data);
      setIsLoaded(true);
    } catch (e) {
      setIsErr(true);
    }
  };
  const getBasket = async () => {
    try {
      const { data } = await axios.get<IBasket[]>(`http://localhost:5000/api/basket/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(data[0]);
      setBasket(data[0]);
    } catch (e) {
      setIsErr(true);
    }
  };
  const addToBasket = async () => {
    if (!token) {
      nav('/login');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/basket/product`, {
        productId: product!.id,
        basketId: basket!.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      enqueueSnackbar(`Product "${product?.title}" was added to cart`, { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };
  useEffect(() => {
    getProduct();
    if (token) {
      getBasket();
    }
  }, []);
  // eslint-disable-next-line no-mixed-operators
  return (!product && isLoaded || isErr && isLoaded ?
      <Popup redirect={'/products'} btnText={'products'}
             message={'Sorry, this product was not defined :/'}/> : <>
        <div className="productPageContainer">
          <main className="productPageMain">
            <img src={`http://localhost:5000/${product?.img}`} alt="img"/>
          </main>
          <section className="productsContent">
            <h2 className="productPageTitle">{product?.title}</h2>
            <p className="productPageDescription">{product?.description}</p>
            <p className="priceProductPage">{product?.price}$</p>
            <p className="productPageTitle">available: {product?.count}</p>
            <div className="hrProductsPage"/>
            <div className="buyOptionButtons">
              <button disabled={product?.count === 0} onClick={addToBasket}
                      className="addToCartBtn">
                <span>{product?.count === 0 ? 'Unavailable now' : 'Add to Basket'}</span></button>
            </div>
          </section>
        </div>
      </>
  );
};

export default ProductPage;
