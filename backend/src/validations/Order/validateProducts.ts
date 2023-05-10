const { getProductByIdService } = require('../../service/productService.ts');

// env is possibly be undefined, we need to prove it
const MAX_PRODUCTS_PER_ORDER = process.env.MAX_PRODUCTS_PER_ORDER || '15';

const checkProductsAvailable = async (req:any, res:any, products:any) => {
  for (const product of products) {
    const productItem = await getProductByIdService(product.productId);
    console.log(productItem);
    if (productItem.count === 0) {
      throw { errorMSG: `Sorry, but the product ${product.title}  #${product.id} is unavailable now`, status: 400 };
    }
  }
};
const checkProductsLength = (req:any, res:any, products:any) => {
  if (products.length > Number(MAX_PRODUCTS_PER_ORDER)) {
    throw { errorMSG: `Sorry, but you can only order ${process.env.MAX_PRODUCTS_PER_ORDER} products at a time, but you can do another order then`, status: 400 };
  }
  if (products.length < 1) {
    throw { errorMSG: 'Minimal products length is 1', status: 400 };
  }
};

module.exports = { checkProductsAvailable, checkProductsLength };

export {};
