const validateBody = require('./Validations/BodyValidations.ts');
const validateParams = require('./Validations/ParamsValidation.ts');
const apiError = require('../middelwares/apiError.ts');
const { getUserByIdService } = require('../Service/userService.ts');
const { getProductByIdService } = require('../Service/productService.ts');
const {
  addRatingService, getRatingService, userRatedService, updateRatingService,
} = require('../Service/ratingService.ts');

const updateRating = async (req:any, res:any) => {
  try {
    const productId = validateBody(req, res, 'productId');
    const userId = validateBody(req, res, 'userId');
    const rating = parseFloat(validateBody(req, res, 'rating'));
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 - 5' });
    }
    // did user already rate //true //false
    const userRated = await userRatedService(userId, productId);
    // update rating if user already rated
    if (userRated) {
      await updateRatingService(userId, productId, rating);
      return res.status(200).json({ message: 'Rating was updated succesfully' });
    }
    // check user exist, throw err if not exist
    await getUserByIdService(userId);

    // check product exist, throw err if not exist
    await getProductByIdService(productId);

    await addRatingService(userId, productId, rating);
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
