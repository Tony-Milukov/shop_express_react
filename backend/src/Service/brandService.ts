const { Brand } = require('../models/models.ts');

const getBrandByIdService = async (brandId:number) => {
  const result = await Brand.findByPk(brandId);
  if (result) {
    return result;
  }
  // if not exist
  throw { errorMSG: `brand with id ${brandId} doesn't exist`, status: 404 };
};
const createBrandService = async (brand: string) => {
  const result = await Brand.create({
    name: brand,
  });
  // return true as success and false as not success
  return !!result;
};
const getAllBrandsService = async (limit:number, offset:number) => {
  const brands = await Brand.findAndCountAll({
    offset,
    limit,
  });
  if (brands.rows.length >= 1) {
    return brands;
  } throw { errorMSG: 'brands by this page do not exist', status: 404 };
};
const deleteBrandService = async (brandId: number) => {
  const result = await Brand.destroy({ where: { id: brandId } });
  return !!result;
};
module.exports = {
  getBrandByIdService,
  createBrandService,
  getAllBrandsService,
  deleteBrandService,
};
export {};
