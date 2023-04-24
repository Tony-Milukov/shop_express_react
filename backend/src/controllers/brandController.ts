const validateParam = require('./Validations/paramsValidation.ts');
const apiError = require('../middelwares/apiError.ts');
const {
  createBrandService, getAllBrandsService, getBrandByIdService, deleteBrandService,
} = require('../Service/brandService.ts');

const createBrand = async (req:any, res:any) => {
  try {
    const brand = validateParam(req, res, 'brand');
    const response = await createBrandService(brand);
    if (response) {
      res.status(200).json({ message: 'Brand was created succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getBrands = async (req:any, res:any) => {
  try {
    const pageSize = validateParam(req, res, 'pageSize');
    const page = validateParam(req, res, 'page');
    const offset = pageSize * (page - 1);
    const roles = await getAllBrandsService(pageSize, offset);
    res.status(200).json(roles);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getBrandById = async (req:any, res:any) => {
  try {
    const brandId = validateParam(req, res, 'brandId');
    const brand = await getBrandByIdService(brandId);
    res.status(200).json(brand);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteBrand = async (req:any, res:any) => {
  try {
    const brandId = validateParam(req, res, 'brandId');

    // check does the brand exist
    await getBrandByIdService(brandId);

    const response = await deleteBrandService(brandId);
    if (response) {
      res.status(200).json({ message: 'brand was deleted succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  deleteBrand,
};
export {};
