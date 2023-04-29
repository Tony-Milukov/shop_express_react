const { Basket, Product, BasketItem } = require('../models/index.ts');

const createBasketService = async (userId:number) => {
  const cart = await Basket.create({
    userId,
  });
  if (!cart) {
    throw {};
  } return cart;
};
const deleteBasketService = async (id:number) => {
  const cart = await Basket.destroy({
    where: {
      id,
    },
  });
  if (!cart) {
    throw {};
  }
};
const getBasketByIdService = async (userId:number, cartId: number) => {
  const cart = await Basket.findOne({
    where: {
      userId,
      id: cartId,
    },
    include: [
      {
        model: Product,
        through: BasketItem,
      },
    ],
  });
  if (!cart) {
    throw { errorMSG: 'this basket was not defined', status: 404 };
  }
  return cart;
};
const getBasketItemService = async (basketId:number, productId:number) => {
  const basketItem = await BasketItem.findOne({
    where: {
      basketId,
      productId,
    },
  });
  if (!basketItem) {
    throw { errorMSG: 'this basketItem was not defined', status: 404 };
  } return basketItem;
};
const updateBasketCountService = async (count: number, productId:number, basketId:number) => {
  const result = BasketItem.update({
    count,
  }, {
    where: {
      productId,
      basketId,
    },
  });
  if (!result) {
    throw { errorMSG: 'something went wrong on updating cartCount', status: 404 };
  }
};
module.exports = {
  createBasketService, getBasketByIdService, deleteBasketService, getBasketItemService, updateBasketCountService,
};
export {};
