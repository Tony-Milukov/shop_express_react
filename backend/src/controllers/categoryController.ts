const { Category } = require('../models/models.ts');
const apiError = require('../middelwares/apiError.ts');
const validateParam = require('./Validations/paramsValidation.ts');

const {
  addCategoryService, deleteCategoryService,
} = require('../Service/categoryService.ts');

const addCategory = async (req:any, res:any) => {
  try {
    const category = validateParam(req, res, 'category');
    const response = await addCategoryService(category);
    if (response) {
      res.status(200).json({ message: 'Category was added succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteCategory = async (req:any, res:any) => {
  try {
    const categoryId = validateParam(req, res, 'categoryId');
    const response = await deleteCategoryService(categoryId);
    if (response) {
      res.status(200).json({ message: 'category was deleted succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = {
  addCategory,
  deleteCategory,
};
export {};
