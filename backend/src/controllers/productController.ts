const apiError = require('../utilits/apiError.ts');
const validateBody = require('../validations/bodyValidations.ts');
const validatePrams = require('../validations/paramsValidation.ts');

const {
  createProductService,
  getProductByIdService,
  deleteProductService,
  getAllProductsService,
  updateProductCountService,
  searchProductService,
  checkExistence,
  getAllFilteredProductsService,
  getRandomProductsService,
} = require('../service/productService.ts');
const checkIsArray = require('../validations/checkIsArray.ts');
const {
  uploadImage,
  deleteOldImage,
} = require('../middelwares/updateImage.ts');
const {
  getBrandByIdService,
} = require('../service/brandService.ts');
const {
  getCategoryByIdService,
} = require('../service/categoryService.ts');

const createProduct = async (req: any, res: any) => {
  try {
    const title = validateBody(req, res, 'title');
    const count = parseFloat(validateBody(req, res, 'count'));
    const price = validateBody(req, res, 'price');
    const description = validateBody(req, res, 'description');

    const brands = JSON.parse(validateBody(req, res, 'brands'));
    const categories = JSON.parse(validateBody(req, res, 'categories'));
    const img = req.files ? req.files.img : undefined;

    // check if image was send
    if (!img) {
      return res.status(404)
        .json({ message: 'img was not send' });
    }
    // check isArray
    checkIsArray(categories, 'categories');
    checkIsArray(brands, 'brands');
    // check do all given brands / categories exist
    await checkExistence(brands, getBrandByIdService);
    await checkExistence(categories, getCategoryByIdService);

    const imgName = await uploadImage(img, 'products');
    const product = await createProductService(
      title,
      price,
      description,
      imgName,
      brands,
      categories,
      count,
    );
    res.status(200)
      .json({ message: `product ${product.title} with id ${product.id} was created` });
  } catch (e: any) {
    console.log(e);
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteProduct = async (req: any, res: any) => {
  try {
    const productId = validateBody(req, res, 'productId');

    // check does it exist
    const product = await getProductByIdService(productId);

    // delete image of this product
    await deleteOldImage(product.img, '/products');

    // delete product
    await deleteProductService(productId);

    res.status(200)
      .json({ message: 'ProductPage was deleted succesfully' });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getProductById = async (req: any, res: any) => {
  try {
    const productId = validatePrams(req, res, 'id');
    // get product
    const product = await getProductByIdService(productId);
    res.status(200)
      .json(product);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getAllProducts = async (req: any, res: any) => {
  try {
    // get products
    const pageSize = parseFloat(validateBody(req, res, 'pageSize'));
    const page = parseFloat(validateBody(req, res, 'page'));
    const offset = (page - 1) * pageSize;
    const {
      categoryId,
      brandId,
    } = req.body;
    // if there is a filter property, do filter
    if (categoryId || brandId) {
      const products = await getAllFilteredProductsService(categoryId, brandId, pageSize, offset);
      return res.status(200)
        .json(products);
    }

    const products = await getAllProductsService(pageSize, offset);
    res.status(200)
      .json(products);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const updateCount = async (req: any, res: any) => {
  try {
    const count = parseFloat(validateBody(req, res, 'count'));
    const productId = parseFloat(validateBody(req, res, 'productId'));
    // checking if the product exist
    const product = await getProductByIdService(productId);
    if (count < 0) {
      return res.status(400)
        .json({ message: 'the minimal count is 0' });
    }
    await updateProductCountService(count, productId);
    res.status(200)
      .json({ message: `count for the product ${product.title} #${product.id} was updated successfully` });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const searchProduct = async (req: any, res: any) => {
  try {
    const title = validatePrams(req, res, 'title');
    const products = await searchProductService(title);
    res.status(200)
      .json(products);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getRandomProducts = async (req:any, res:any) => {
  try {
    const limit = parseFloat(validatePrams(req, res, 'limit'));
    const products = await getRandomProductsService(limit);
    res.status(200)
      .json(products);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  updateCount,
  searchProduct,
  getRandomProducts,
};
export {};
