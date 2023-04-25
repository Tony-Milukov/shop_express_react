const apiError = require('../middelwares/apiError.ts');
const validateBody = require('./Validations/BodyValidations.ts');
const validatePrams = require('./Validations/ParamsValidation.ts');

const {
  createProductService, getProductByIdService,
  deleteProductService, getAllProductsService,
  checkExistence, checkIsArray,
} = require('../Service/productService.ts');
const { uploadImage, deleteOldImage } = require('../middelwares/updateImage.ts');
const {
  getBrandByIdService,
} = require('../Service/brandService.ts');
const {
  getCategoryByIdService,
} = require('../Service/categoryService.ts');

const createProduct = async (req:any, res:any) => {
  try {
    const title = validateBody(req, res, 'title');
    const price = validateBody(req, res, 'price');
    const description = validateBody(req, res, 'description');
    const brands = JSON.parse(validateBody(req, res, 'brands'));
    const categories = JSON.parse(validateBody(req, res, 'categories'));
    const img = req.files ? req.files.img : undefined;
    // check if image was send
    if (!img) {
      return res.status(404).json({ message: 'img was not send' });
    }

    // check isArray
    checkIsArray(categories, 'categories');
    checkIsArray(brands, 'brands');
    // check do all given brands / categories exist
    await checkExistence(brands, getBrandByIdService);
    await checkExistence(categories, getCategoryByIdService);

    const imgName = await uploadImage(img, 'products');
    const product = await createProductService(title, price, description, imgName, brands, categories);
    res.status(200).json({ message: `product ${product.title} with id ${product.id} was created` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteProduct = async (req:any, res:any) => {
  try {
    const productId = validateBody(req, res, 'productId');

    // check does it exist
    const product = await getProductByIdService(productId);

    // delete image of this product
    await deleteOldImage(product.img, '/products');

    // delete product
    await deleteProductService(productId);

    res.status(200).json({ message: 'Product was deleted succesfully' });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getProductById = async (req:any, res:any) => {
  try {
    const productId = validatePrams(req, res, 'id');

    // get product
    const product = await getProductByIdService(productId);
    res.status(200).json(product);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getAllProducts = async (req:any, res:any) => {
  try {
    // get products
    const pageSize = parseFloat(validateBody(req, res, 'pageSize'));
    const page = parseFloat(validateBody(req, res, 'page'));
    const offset = (page - 1) * pageSize;
    const products = await getAllProductsService(pageSize, offset);
    res.status(200).json(products);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
export {};
