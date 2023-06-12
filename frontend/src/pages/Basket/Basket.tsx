import React, { useEffect, useState } from 'react';
import { IBasket } from '../../types/IBasket';
import axios from 'axios';
import userStore from '../../store/userStore';
import IProduct from '../../types/product';
import BasketItem from './components/BasketItem';

const Basket = () => {
  const token = userStore((state: any) => state.user.token);
  const [basket, setBasket] = useState<IBasket>();
  const [products, setProducts] = useState<IProduct[]>([]);
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
      const { data } = await axios.post<{ products: IProduct[] }>(`http://localhost:5000/api/basket`, {
        basketId: basket?.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(data.products);
      console.log(data.products);
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
  return (
    <main className="main-cart">
      <div className="flex-cart">
        <div className="wares-cart">
          {/* {products!.map(product => <BasketItem key={product.id} product={product}/>)} */}
          <div className="btns-cart">
            {products!.length > 0 ?
              <button className="clear-shopping-cart">clear shopping cart</button> : null}
          </div>
        </div>
      </div>
      <div className="inputs-shipping-adress">
        <div className="proceed-to-checkout">
          <p className="sub-total-p">sub total<span className="sub-total">${}</span></p>
          <p className="grand-total-p">Grand total<span className="grand-total">${}</span></p>
          <div className="line-shipping"></div>
          <button className="procced-btn">proceed to checkout</button>

        </div>
      </div>
      <div/>
    </main>

  );
};

export default Basket;
