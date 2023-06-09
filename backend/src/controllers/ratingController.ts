const validateBody = require('../validations/bodyValidations.ts');
const validateParams = require('../validations/paramsValidation.ts');
const apiError = require('../utilits/apiError.ts');
const { getUserByToken } = require('../service/userService.ts');
const { getProductByIdService } = require('../service/productService.ts');
const {
  addRatingService, getRatingService, userRatedService, updateRatingService,
} = require('../service/ratingService.ts');

const updateRating = async (req:any, res:any) => {
  try {
    const productId = validateBody(req, res, 'productId');
    const user = await getUserByToken(req, res);
    const rating = parseFloat(validateBody(req, res, 'rating'));

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 - 5' });
    }
    // did user already rate //true //false
    const userRated = await userRatedService(user.id, productId);
    // update rating if user already rated
    if (userRated) {
      await updateRatingService(user.id, productId, rating);
      return res.status(200).json({ message: 'Rating was updated succesfully' });
    }

    // check product exist, throw err if not exist
    await getProductByIdService(productId);

    await addRatingService(user.id, productId, rating);
    res.status(200).json({ message: 'Rating was added succesfully' });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const getRating = async (req:any, res:any) => {
  try {
    const productId = validateParams(req, res, 'productId');
    // check product exist, throw err if not exist
    await getProductByIdService(productId);
    const rating = await getRatingService(productId);
    res.status(200).json(rating);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = { updateRating, getRating };
export {};
