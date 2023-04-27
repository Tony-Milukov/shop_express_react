const validateBody = require('../validations/bodyValidations.ts');
const apiError = require('../utilits/apiError.ts');
const { getUserByToken } = require('../Service/userService.ts');
const { getProductByIdService } = require('../Service/productService.ts');
const { createBasketService, getBasketByIdService, deleteBasketService } = require('../Service/basketService.ts');

const createBasket = async (req:any, res:any) => {
  try {
    const user = await getUserByToken(req, res);
    const cart = await createBasketService(user.id);
    res.status(200).json({ message: `Basket was created for user ${user.username}, basket id: ${cart.id}` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteBasket = async (req:any, res:any) => {
  try {
    /// check does user exist and getIt
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));

    // check do the basket exist, and owner is user gotten by JWT
    await getBasketByIdService(user.id, basketId);

    // if deleting was not succesfull, it will throw an error
    await deleteBasketService(basketId);

    res.status(200).json({ message: `Basket was deleted for user ${user.username}, cart id: ${basketId}` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getBasketById = async (req:any, res:any) => {
  try {
    /// check does user exist and getIt
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);

    res.status(200).json(basket);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const addProduct = async (req:any, res:any) => {
  try {
    /// check does user exist and get it
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));
    const productId = parseFloat(validateBody(req, res, 'productId'));

    // getting product
    const product = await getProductByIdService(productId);

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);
    const result = await basket.addProduct(product);
    if (!result) {
      return res.status(200).json({ message: `Product ${product.title} is already in the basket` });
    }
    res.status(200).json({ message: `Product ${product.title} was added to basket succesfully` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteProduct = async (req:any, res:any) => {
  try {
    /// check does user exist and get it
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));
    const productId = parseFloat(validateBody(req, res, 'productId'));

    // getting product
    const product = await getProductByIdService(productId);

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);

    const result = await basket.removeProduct(product); // = 1 / 0

    if (!result) {
      return res.status(404).json({ message: `Product ${product.title} was not defined in this basket` });
    }
    res.status(200).json({ message: `Product ${product.title} was deleted from basket succesfully` });
  } catch (e:any) {
    console.log(e);
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  createBasket, deleteBasket, getBasketById, addProduct, deleteProduct,
};
export {};
