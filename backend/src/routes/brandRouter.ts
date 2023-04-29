const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const router = express.Router();
const {
  createBrand, getBrands, deleteBrand, getBrandById,
} = require('../controllers/brandController.ts');

// admin
router.put('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), createBrand);
router.delete('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), deleteBrand);

// user
router.post('/all', getBrands);
router.get('/:id/:products?', getBrandById);

module.exports = router;
export {};
