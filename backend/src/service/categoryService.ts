const { Category } = require('../models/index.ts');

const addCategoryService = async (category: string) => {
  const result = await Category.create({
    name: category,
  });
  // return true as success and false as not success
  return !!result;
};
const getCategoryByIdService = async (categoryId:number) => {
  const result = await Category.findByPk(categoryId);
  if (!result) {
    throw { errorMSG: `category with id ${categoryId} doesn't exist`, status: 404 };
  }
  // if  exist
  return result;
};
const deleteCategoryService = async (categoryId: number) => {
  const result = await Category.destroy({ where: { id: categoryId } });
  return !!result;
};

const getAllCategoriesService = async (limit:number, offset:number) => {
  const categories = await Category.findAndCountAll({
    offset,
    limit,
  });
  if (categories.rows.length >= 1) {
    return categories;
  } throw { errorMSG: 'categories by this page do not exist', status: 404 };
};

module.exports = {
  addCategoryService,
  deleteCategoryService,
  getCategoryByIdService,
  getAllCategoriesService,

};
