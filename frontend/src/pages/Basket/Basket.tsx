import React, { useEffect, useState } from 'react';
import { IBasket } from '../../types/IBasket';
import axios from 'axios';
import userStore from '../../store/userStore';
import IProduct from '../../types/product';
import BasketItem from './components/BasketItem';
import { IBasketItem } from '../../types/IBaskertItem';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const Basket = () => {
  const token = userStore((state: any) => state.user.token);
  const [basket, setBasket] = useState<IBasket>();
  const adress = yup.object({
    fullName: yup.string(),
    country: yup.string(),
    number: yup.number().positive().integer(),
    street: yup.string(),
    city: yup.string(),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors: {
      fullName
    } }
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

  useEffect(() => {
    getBasket();
  }, []);

  useEffect(() => {
    getProducts();
  }, [basket]);
  const createOrder = (e:any) => {
    console.log(e);
  }
  return (
    <main className="main-cart">
      <div className="flex-cart">
        <div className="wares-cart">
          {products!.map(product => <BasketItem key={product.id} product={product}/>)}
          <div className="btns-cart">
            {products!.length > 0 ?
              <button className="clear-shopping-cart">clear shopping cart</button> : null}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(createOrder)}className="inputs-shipping-adress">
        <input {...register("fullName")} type="text"
               id="inputs-cart" placeholder="Country"/>
        {/* <span className="errorMSG_">{error.changeCountryError  && btnActive ? errors.changeCountryError : ""}</span> */}

        <input type="text" id="inputs-cart" placeholder="city"/>
        {/* <span className="errorMSG_">{error.changeCityError  && btnActive ? errors.changeCityError : ""}</span> */}
        <input min="0" max="999" type="number" id="inputs-cart" placeholder="Postcode / Zip"/>
        {/* <span className="errorMSG_">{error.changePostCodeError  && btnActive ? errors.changePostCodeError : ""}</span> */}
        <div className="proceed-to-checkout">
          <p className="sub-total-p">sub total<span className="sub-total">${}</span></p>
          <p className="grand-total-p">Grand total<span className="grand-total">${}</span></p>
          <div className="line-shipping"></div>
          <button type={"submit"} className="procced-btn">proceed to checkout</button>
        </div>
      </form>
      <div/>
    </main>

  );
};

export default Basket;
