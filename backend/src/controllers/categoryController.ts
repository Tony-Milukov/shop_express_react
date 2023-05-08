const apiError = require('../utilits/apiError.ts');
const validateBody = require('../validations/bodyValidations.ts');
const validateParams = require('../validations/paramsValidation.ts');

const {
  addCategoryService, deleteCategoryService, getCategoryByIdService, getAllCategoriesService,
} = require('../service/categoryService.ts');

const addCategory = async (req:any, res:any) => {
  try {
    const category = validateBody(req, res, 'category');
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
    const categoryId = validateParams(req, res, 'categoryId');

    // check does the category exist
    await getCategoryByIdService(categoryId);

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
const getAllCategories = async (req:any, res:any) => {
  try {
    // how much elem must be given
    const pageSize = parseFloat(validateBody(req, res, 'pageSize'));
    const page = parseFloat(validateBody(req, res, 'page'));
    const offset = pageSize * (page - 1);
    const categories = await getAllCategoriesService(pageSize, offset);
    res.status(200).json(categories);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getCategoryById = async (req:any, res:any) => {
  try {
    const categoryId = validateParams(req, res, 'id');
    const getProducts = req.params.products || false;
    const category = await getCategoryByIdService(categoryId);
    if (getProducts) {
      const products = await category.getProducts();
      return res.status(200).json(products);
    }
    res.status(200).json(category);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
export {};
