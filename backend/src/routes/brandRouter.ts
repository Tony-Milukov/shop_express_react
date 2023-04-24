const express = require('express');

const router = express.Router();
const {
  createBrand, getBrands, deleteBrand, getBrandById,
} = require('../controllers/brandController.ts');

router.put('/', createBrand);
router.post('/all', getBrands);
router.delete('/', deleteBrand);
router.post('/', getBrandById);
module.exports = router;
export {};
