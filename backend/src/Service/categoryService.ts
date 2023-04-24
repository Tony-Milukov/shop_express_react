const { Category } = require('../models/models.ts');

const addCategoryService = async (category: string) => {
  const result = await Category.create({
    name: category,
  });

  return !!result;
};
const deleteCategoryService = (categoryId: number) => {
  // code
};
module.exports = {
  addCategoryService,
  deleteCategoryService,
};
