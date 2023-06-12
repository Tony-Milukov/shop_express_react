import React, { useEffect, useState } from 'react';
import IProduct from '../../types/product';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import userStore from '../../store/userStore';
import './products.css';
import RenderProducts from './components/RenderProducts';
import { Pagination } from '@mui/material';
import Popup from '../../components/Popup/Popup';
import CustomInfiniteSelect from '../../components/infinitySelect/CustomInfiniteSelect';
import { IProductsFilter } from '../../types/IProductsFilter';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import SearchProducts from '../../components/SearchProducts/SearchProducts';

interface IProductsRequest {
  count: number,
  rows: IProduct[]
}

const Products = () => {
  const [products, setProducts] = useState<IProductsRequest | null>();
  const [productsFilter, setProductsFilter] = useState<IProductsFilter | null>();
  const nav = useNavigate();
  const location = useLocation();
  const paginationUrl: string = '/products';
  const page = parseInt(useParams().page ?? '1');
  const pageSize: number = 50;
  const token = userStore((state: any) => state.token);
  const searchValue = userStore((state: any) => state.user.searchValue);
  useEffect(() => {
    setProductsFilter(null);
  }, [location]);
  const getProducts = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/products/all', {
        pageSize: pageSize,
        page: page,
        categoryId: productsFilter?.category?.id,
        brandId: productsFilter?.brand?.id,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  //redirect user on page change, to expected page
  const handlePagination = (event: any, page: number) => {
    nav(`${paginationUrl}/${page}`);
  };
  useEffect(() => {
    getProducts();
  }, [page, productsFilter, location]);

  return (
   searchValue.length >= 1 ? <SearchProducts/> :(products?.rows.length === 0 && page !== 1 ?
      <Popup btnText={"products"} redirect={'/products'} message={'sorry, no products were defined by this page'}/>
      : <div className={'products'}>
        <div className="filter">
          <div className="productsFilter">
            <span>Category{!productsFilter?.category ? <FilterListIcon/> :
              <IconButton
                onClick={() => setProductsFilter({
                  ...productsFilter,
                  category: undefined
                })}> <FilterListOffIcon/></IconButton>}</span>
            <span className={"selectedFilter"}>{productsFilter?.category?.name}</span>
            <CustomInfiniteSelect onSelect={(item: any) => setProductsFilter({
              ...productsFilter,
              category: item
            })} url={`http://localhost:5000/api/category/all`}/>
          </div>
          <div className="productsFilter">
            <span >Brand {!productsFilter?.brand ? <FilterListIcon/> : <IconButton
              onClick={() => setProductsFilter({
                ...productsFilter,
                brand: undefined
              })}> <FilterListOffIcon/></IconButton>}</span>
            <span className={"selectedFilter"}>{productsFilter?.brand?.name}</span>

            <CustomInfiniteSelect onSelect={(item: any) => setProductsFilter({
              ...productsFilter,
              brand: item
            })} url={`http://localhost:5000/api/brand/all`}/>
          </div>
        </div>
       <RenderProducts  products={products?.rows!}/>
        {
          products?.rows.length !== 0  ? <Pagination
                count={products?.count ? Math.ceil(products.count < pageSize ? 1 : products.count / pageSize) : 0}
                onChange={handlePagination}/> : null
        }
      </div>)
  );
};

export default Products;
