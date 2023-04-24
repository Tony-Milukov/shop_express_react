const apiError = require('../middelwares/apiError.ts');
const validateParam = require('./Validations/paramsValidation.ts');

const addProduct = (req:any, res:any) => {
  try {
    const name = validateParam(req, res, 'name');
    const price = validateParam(req, res, 'price');
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  addProduct,
};
export {};
