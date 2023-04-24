const {
  Product, ProductsCategory, ProductsBrand, Category, Brand,
} = require('../models/models.ts');

const createProductService = async (title:string, price:number, description:string, img:string, brands:any, categories:any) => {
  const product = await Product.create({
    title,
    price,
    description,
    img,
  });
  if (!product) {
    // default error
    throw {};
  } else {
    // check there are array
    if (!Array.isArray(categories)) {
      throw { errorMSG: 'categories must be an array!', status: 400 };
    } if (!Array.isArray(brands)) {
      throw { errorMSG: 'brands must be an array!', status: 400 };
    }
    // add brands
    await brands.forEach((brandId:number) => {
      ProductsBrand.create({
        brandId,
        productId: product.id,
      });
    });

    // add categories
    if (Array.isArray(categories)) {
      await categories.forEach((categoryId:number) => {
        ProductsCategory.create({
          categoryId,
          productId: product.id,
        });
      });
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
        model: ProductsBrand,
        include: [
          {
            model: Brand,
          },
        ],
      },
      {
        model: ProductsCategory,
        include: [
          {
            model: Category,
          },
        ],
      },
    ],
  });
  if (!product) {
    throw { errorMSG: 'this product was not defined', status: 404 };
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

const deleteProductBrand = (productId:number) => {
  const res = ProductsBrand.destroy({
    where: {
      productId,
    },
  });
  if (!res) {
    // deafult error
    throw {};
  }
};
const deleteProductCategory = (productId:number) => {
  const res = ProductsCategory.destroy({
    where: {
      productId,
    },
  });
  if (!res) {
    // deafult error
    throw {};
  }
};
const getAllProductsService = async (limit:number, offset:number) => {
  try {
    const products = await Product.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: ProductsBrand,
          include: [
            {
              model: Brand,
            },
          ],
        },
        {
          model: ProductsCategory,
          include: [
            {
              model: Category,
            },
          ],
        },
      ],
    });
    if (!products) {
      throw { errorMSG: 'Products by this page were not defined', status: 404 };
    } else {
      return products;
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
};

module.exports = {
  createProductService, getProductByIdService, deleteProductService, deleteProductBrand, deleteProductCategory, getAllProductsService,
};
export {};
