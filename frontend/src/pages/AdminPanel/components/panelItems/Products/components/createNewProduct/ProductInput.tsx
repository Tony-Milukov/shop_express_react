import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { productInfoRegExp, productInfoRegExpErrs } from './productInfoInputsRegExps';
import IProductInfo from '../../../../../../../types/IProductInfo';

interface ProductInfoInputProps {
  setProductInfo: (productInfo: IProductInfo) => any,
  productInfo: IProductInfo,
  name: string,

}

const ProductInfoInput: FC<ProductInfoInputProps> = ({
    name,
    setProductInfo,
    productInfo
  }) => {
    const showErr = () => {
      if (!productInfoRegExp[name].test(productInfo[name])) {
        return <span className={'errorMSG'}>{productInfoRegExpErrs[name]}</span>;
      }
    };
    return (
      <TextField
        className={'newProductInput'}
        id="standard-multiline-flexible"
        multiline
        label={name}
        onChange={(e: any) => setProductInfo({
          ...productInfo,
          [name]: e.target.value
        })}
        helperText={showErr()}
        value={productInfo[name]}/>
    );
  }
;

export default ProductInfoInput;
