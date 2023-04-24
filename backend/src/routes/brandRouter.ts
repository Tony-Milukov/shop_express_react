const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const router = express.Router();
const {
  createBrand, getBrands, deleteBrand, getBrandById,
} = require('../controllers/brandController.ts');

// admin
router.put('/', isLoggedIn, checkRole(3), createBrand);
router.delete('/', isLoggedIn, checkRole(3), deleteBrand);

// user
router.post('/all', getBrands);
router.get('/:id', getBrandById);

module.exports = router;
export {};
