const {
  Product, ProductsCategory, ProductsBrand, Category, Brand,
} = require('../models/index.ts');
const {
  getBrandByIdService,
} = require('./brandService.ts');
const {
  getCategoryByIdService,
} = require('./categoryService.ts');

const createProductService = async (
  title:string,
  price:number,
  description:string,
  img:string,
  brands:any,
  categories:any,
) => {
  const product = await Product.create({
    title,
    price,
    img,
    description,
  });
  if (!product) {
    throw { errorMSG: 'brands must be an array!', status: 400 };
  } else {
    // add brands
    for (const brandId of brands) {
      const brand = await getBrandByIdService(brandId);
      await product.addBrand(brand);
    }
    // add categories
    for (const categoryId of categories) {
      const brand = await getCategoryByIdService(categoryId);
      await product.addCategory(brand);
    }
    return product;
  }
};
const getProductByIdService = async (productId:number) => {
  const product = await Product.findOne({
    where: {
      id: productId,
    },
    include: [
      {
        model: Brand,
        through: ProductsBrand,
      },
      {
        model: Category,
        through: ProductsCategory,
      },
    ],
  });
  if (!product) {
    throw { errorMSG: `this product with id < ${productId} > was not defined`, status: 404 };
  } else {
    return product;
  }
};

const deleteProductService = (productId:number) => {
  const res = Product.destroy({
    where: {
      id: productId,
    },
  });
  if (!res) {
    // deafult error
    throw {};
  }
};

const getAllProductsService = async (limit:number, offset:number) => {
  const products = await Product.findAndCountAll({
    offset,
    limit,
    include: [
      {
        model: Brand,
        through: ProductsBrand,
      },
      {
        model: Category,
        through: ProductsCategory,
      },
    ],
  });
  if (!products) {
    throw { errorMSG: 'Products by this page were not defined', status: 404 };
  } else {
    return products;
  }
};
const checkExistence = async (value:any, getService:any) => {
  for (const id of value) {
    await getService(id);
  }
};
module.exports = {
  createProductService, getProductByIdService, deleteProductService, getAllProductsService, checkExistence,
};
export {};
