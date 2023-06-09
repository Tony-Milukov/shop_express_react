import React, { useEffect, useState } from 'react';
import RenderChips from './RenderChips';
import Dialog from '../../../../../../../components/Dialog/Dialog';
import { Button, IconButton } from '@mui/material';
import ICreateProductImg from '../../../../../../../types/ICreateProductImg';
import '../../products.css';
import IStatus from '../../../../../../../types/status';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CustomInfiniteSelect
  from '../../../../../../../components/infinitySelect/CustomInfiniteSelect';
import axios from 'axios';
import userStore from '../../../../../../../store/userStore';
import { enqueueSnackbar } from 'notistack';
import ProductInfoInput from './ProductInput';
import IProductInfo from '../../../../../../../types/IProductInfo';

const CreateNewProduct = () => {
  const openButton = (
    <Button variant="contained">new product</Button>
  );

  const [img, setImg] = useState<ICreateProductImg | null>();
  const [brands, setBrands] = useState<IStatus[]>([]);
  const [categories, setCategories] = useState<IStatus[]>([]);
  const token = userStore((state: any) => state.user.token);
  const [productInfo, setProductInfo] = useState<IProductInfo>({
    price: 0,
    count: 0
  });
  const createNewProduct = async () => {
    if (!img || brands.length < 1 || categories.length < 1) {
      return;
    }
    const data = new FormData();
    data.append('img', (img?.file) as File);
    data.append('categories', JSON.stringify(categories.map(i => i.id)));
    data.append('brands', JSON.stringify(brands.map(i => i.id)));
    data.append('title', productInfo.title!);
    data.append('count', productInfo.count! as string);
    data.append('price', productInfo.price! as string);
    data.append('description', productInfo.description!);
    await axios.put('http://localhost:5000/api/products', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    enqueueSnackbar('New product was created!', { variant: 'success' });
    //set up default inputs
    setBrands([]);
    setCategories([]);
    setImg(null);
    setProductInfo({
      price: 0,
      count: 0
    });
  };
  const handleImage = (e: any) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };
  const handleCategories = (category: IStatus) => {
    setCategories([...new Set([...categories, category])]);
  };
  const handleBrand = (brand: IStatus) => {
    setBrands([...new Set([...brands, brand])]);
  };
  const deleteCategory = (id: number | string) => {
    const filteredCategories = categories.filter((category: IStatus) => category.id !== id);
    if (categories.length === 1) {
      setCategories([]);
    } else {
      setCategories(filteredCategories);
    }
  };
  const deleteBrand = (id: number | string) => {
    const filteredBrands = brands.filter((brand: IStatus) => brand.id !== id);
    if (brands.length === 1) {
      setBrands([]);
    } else {
      setBrands(filteredBrands);
    }
  };

  return (
    <div>
      <Dialog OpenButton={openButton} failureValue={'back'} handler={createNewProduct}
              succesValue={'create'}>
        <main className="newProductMain">
          <Button className={'inputProductImage'} component="label">
            <input
                   hidden
                   multiple onChange={(e: any) => handleImage(e)}
                   type="file" accept="image/x-png,image/jpeg,image/jpg" alt={''}/>
            <div className="uploadImageContainer">
              {
                img ? <img src={img.url} width={'250px'} alt="product img"/> :
                  <div className={'uploadImgProductBtn'}><FileUploadIcon
                    fontSize={'inherit'}/></div>
              }
            </div>
          </Button>
          <div className="newProductInputs">
            <ProductInfoInput name={'title'} productInfo={productInfo}
                              setProductInfo={setProductInfo}/>
            <ProductInfoInput name={'price'} productInfo={productInfo}
                              setProductInfo={setProductInfo}/>
            <ProductInfoInput name={'count'} productInfo={productInfo}
                              setProductInfo={setProductInfo}/>
            <ProductInfoInput name={'description'} productInfo={productInfo}
                              setProductInfo={setProductInfo}/>
          </div>
        </main>
        <footer>
          <div className="selectProductInfo">
            <span className={'selectProductInfoTitle'}>Brands</span>
            <CustomInfiniteSelect onSelect={handleBrand}
                                  url={`http://localhost:5000/api/brand/all`}/>
            <RenderChips handler={deleteBrand} chips={brands}/>
          </div>
          <div className="selectProductInfo">
            <span className={'selectProductInfoTitle'}>Categories</span>
            <CustomInfiniteSelect onSelect={handleCategories}
                                  url={`http://localhost:5000/api/category/all`}/>
            <RenderChips handler={deleteCategory} chips={categories}/>
          </div>

        </footer>
      </Dialog>
    </div>
  );
};

export default CreateNewProduct;
