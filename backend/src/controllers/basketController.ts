const validateBody = require('../validations/bodyValidations.ts');
const validateParams = require('../validations/paramsValidation.ts');
const apiError = require('../utilits/apiError.ts');
const { getUserByToken } = require('../service/userService.ts');
const { getProductByIdService } = require('../service/productService.ts');
const {
  createBasketService,
  getBasketByIdService,
  deleteBasketService,
  updateBasketCountService,
  getBasketItemService,
  clearBasketByIdService,
} = require('../service/basketService.ts');

const createBasket = async (req: any, res: any) => {
  try {
    const user = await getUserByToken(req, res);
    const cart = await createBasketService(user.id);
    res.status(200)
      .json({ message: `Basket was created for user ${user.username}, basket id: ${cart.id}` });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteBasket = async (req: any, res: any) => {
  try {
    /// check does user exist
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));

    // check do the basket exist, and owner is user gotten by JWT
    await getBasketByIdService(user.id, basketId);

    // if deleting was not succesfull, it will throw an error
    await deleteBasketService(basketId);

    res.status(200)
      .json({ message: `Basket was deleted for user ${user.username}, cart id: ${basketId}` });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getBasketById = async (req: any, res: any) => {
  try {
    /// check does user exist and getIt
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);

    res.status(200)
      .json(basket);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const addProduct = async (req: any, res: any) => {
  try {
    /// check does user exist and get it
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateBody(req, res, 'basketId'));
    const productId = parseFloat(validateBody(req, res, 'productId'));
    const count = parseFloat(req.body.count);
    // getting product
    const product = await getProductByIdService(productId);

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);
    const result = await basket.addProduct(product);
    if (!result) {
      const basketItem = await getBasketItemService(basketId, productId);
      await updateBasketCountService(count || basketItem.count + 1, productId, basketId);
    } else if (count) {
      await updateBasketCountService(count, productId, basketId);
    }
    res.status(200)
      .json({ message: `Product ${product.title} was added to basket succesfully` });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteProduct = async (req: any, res: any) => {
  try {
    /// check does user exist and get it
    const user = await getUserByToken(req, res);
    const basketId = parseFloat(validateParams(req, res, 'basketId'));
    const productId = parseFloat(validateParams(req, res, 'productId'));
    const deleteAll = req.params.all ?? false;

    // getting product
    const product = await getProductByIdService(productId);

    // check do the basket exist, and owner is user gotten by JWT
    const basket = await getBasketByIdService(user.id, basketId);
    const basketItem = await getBasketItemService(basketId, productId);
    if (basketItem.count >= 2 && !deleteAll) {
      await updateBasketCountService(basketItem.count - 1, productId, basketId);
      return res.status(200)
        .json({ message: `cart product count was updated ${product.title}, new count for ${product.title} : ${basketItem.count - 1}` });
    }
    const result = await basket.removeProduct(product); // = 1 / 0

    if (!result) {
      return res.status(404)
        .json({ message: `Product ${product.title} was not defined in this basket` });
    }
    res.status(200)
      .json({ message: `Product ${product.title} was deleted from basket succesfully` });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getUserBaskets = async (req: any, res: any) => {
  try {
    const user = await getUserByToken(req, res);
    const baskets = await user.getBaskets();
    res.status(200)
      .json(baskets);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const clearBasketById = async (req: any, res: any) => {
  try {
    const basketId = validateParams(req, res, 'basketId');
    const user = await getUserByToken(req, res);
    // check do the basket exist, and owner is user gotten by JWT
    await getBasketByIdService(user.id, basketId);
    await clearBasketByIdService(basketId);
    res.status(200)
      .json({ message: 'Basket was cleared successfully' });
  } catch (e: any) {
    console.log(e);
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  createBasket,
  deleteBasket,
  getBasketById,
  addProduct,
  deleteProduct,
  getUserBaskets,
  clearBasketById,
};
export {};
