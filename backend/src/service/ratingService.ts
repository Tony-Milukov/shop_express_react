const { Rating } = require('../models/index.ts');

const addRatingService = async (userId:number, productId:number, rating:number) => {
  const result = await Rating.create({
    productId,
    userId,
    rating,
  });
  if (!result) {
    throw {};
  }
};

const getRatingService = async (productId:number) => {
  const result = await Rating.findAndCountAll({
    where: {
      productId,
    },
  });
  if (!result) {
    throw {};
  } return result;
};
const userRatedService = async (userId: number, productId:number) => {
  const result = await Rating.findOne({
    where: {
      productId,
      userId,
    },
  });
  console.log(result);
  return !!result;
};
const updateRatingService = (userId: number, productId:number, rating:number) => {
  const result = Rating.update({ rating }, { where: { userId, productId } });
  if (!result) {
    throw {};
  }
};
module.exports = {
  addRatingService, getRatingService, userRatedService, updateRatingService,
};
export {};
