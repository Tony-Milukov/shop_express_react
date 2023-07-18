const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');
const checkRole = require('../middelwares/checkRole.ts');
const {
  createProduct, getAllProducts, deleteProduct, getProductById, updateCount, searchProduct, getRandomProducts,
} = require('../controllers/productController.ts');

const router = express.Router();

// users
router.post('/all', getAllProducts);
router.get('/id/:id', getProductById);
router.get('/search/:title', searchProduct);
router.get('/random/:limit', getRandomProducts);
// admins

router.put('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), createProduct);
router.put('/count', isLoggedIn, checkRole(process.env.ADMIN_ROLE), updateCount);
router.delete('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), deleteProduct);
module.exports = router;
export {};
