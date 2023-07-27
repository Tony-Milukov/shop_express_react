import React, { useEffect, useState } from 'react';
import { IBasket } from '../../types/IBasket';
import axios from 'axios';
import userStore from '../../store/userStore';
import BasketItem from './components/BasketItem';
import { IBasketItem } from '../../types/IBaskertItem';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './basket.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import basketItem from './components/BasketItem';

interface IOrderCreated {
  message: string,
  orderId: number
}
const Basket = () => {
  const token = userStore((state: any) => state.user.token);
  const nav = useNavigate();
  const [basket, setBasket] = useState<IBasket>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const adress = yup.object({
    fullName: yup.string()
      .required(),
    country: yup.string()
      .required(),
    number: yup.number()
      .positive()
      .integer()
      .required(),
    street: yup.string()
      .required(),
    city: yup.string()
      .required(),
    zip: yup.number()
      .positive()
      .integer(),
    extraInfo: yup.string()
      .notRequired()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(adress)
  });
  const [products, setProducts] = useState<IBasketItem[]>([]);
  const getBasket = async () => {
    try {
      const { data } = await axios.get<IBasket[]>(`http://localhost:5000/api/basket/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBasket(data[0]);
    } catch (e) {
      console.log(e);
    }
  };
  const getProducts = async () => {
    try {
      const { data } = await axios.post<{
        products: IBasketItem[]
      }>(`http://localhost:5000/api/basket`, {
        basketId: basket?.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(data.products);

    } catch (e) {
      console.log(e);
    }
  };
  const doUpdateData = async () => {
    await getProducts();
  };
  useEffect(() => {
    getBasket();
  }, []);

  useEffect(() => {
    getProducts();
  }, [basket]);

  useEffect(() => {
    products.map((product: IBasketItem) => setTotalPrice(totalPrice + (product.price * product.basket_item.count)));
  }, [products, basket]);
  const clearBasket =  async () => {
    try {
      await axios.delete(`http://localhost:5000/api/basket/clear/${basket?.id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    await getProducts()
    } catch (e) {
      console.log(e);
    }
  }
  const createOrder = async (adress: any) => {
      try {
      const {data}  =  await axios.put<IOrderCreated>(`http://localhost:5000/api/order/`, {
          adress,
          products: products.map(product => {
            return {
              productId: product.id,
              count: product.count >= product.basket_item.count ? product.basket_item.count : product.count
            }
          }),
        }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await clearBasket()
      nav(`/order/${data.orderId}`)
      } catch (e) {
        console.log(e);
      }
  };
  return (
    <main className="cartContainer">
     <div className="productsContainer">
          <div className="cartProducts">
            {
              products.length >=1 ?
              products.map(product => <BasketItem update={doUpdateData} key={product.id}
                                            product={product}/>)
            :
                <span>No products in cart :/</span>
            }
            <div className="cartButtons">
              {products!.length > 0 ?
                <button className="clearCartBtn" onClick={clearBasket}>clear shopping cart</button> : null}
            </div>
          </div>
        </div>

      <form onSubmit={handleSubmit(createOrder)} className="adressInputsContainer">
        <TextField variant="outlined" {...register('fullName')} type="text" className={'adressInput'} placeholder="Fullname"/>
        {errors.fullName && <span className="errorMSG_">{errors.fullName.message}</span>}

        <TextField {...register('country')} type="text" className={'adressInput'}
                   placeholder="country"/>
        {errors.country && <span className="errorMSG_">{errors.country.message}</span>}

        <TextField {...register('zip')} type="text" className={'adressInput'} placeholder="zip"/>
        {errors.zip && <span className="errorMSG_">{errors.zip.message}</span>}

        <TextField {...register('city')} type="text" className={'adressInput'} placeholder="city"/>
        {errors.city && <span className="errorMSG_">{errors.city.message}</span>}

        <TextField {...register('street')} type="text" className={'adressInput'}
                   placeholder="street"/>
        {errors.street && <span className="errorMSG_">{errors.street.message}</span>}

        <TextField {...register('number')} type="text" className={'adressInput'}
                   placeholder="number"/>
        {errors.number && <span className="errorMSG_">{errors.number.message}</span>}

        <TextField {...register('extraInfo')} type="text" className={'adressInput'}
                   placeholder="*extra information"/>
        {errors.extraInfo && <span className="errorMSG_">{errors.extraInfo.message}</span>}

        <div className="placeOrderContainer">
          <p className="totalPrice">Grand total<span>${totalPrice}</span>
          </p>
          <span className="placeOrderHr"></span>
          <button disabled={products.length <= 0} type={'submit'}
                  className="placeOrderBtn">proceed to checkout
          </button>
        </div>
      </form>
      <div/>
    </main>

  );
};

export default Basket;
