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

module.exports = {
  createBasketService, getBasketByIdService, deleteBasketService,
};
export {};
