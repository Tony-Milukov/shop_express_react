const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');
const checkRole = require('../middelwares/checkRole.ts');
const {
  createProduct, getAllProducts, deleteProduct, getProductById,
} = require('../controllers/productController.ts');

const router = express.Router();

router.put('/', isLoggedIn, checkRole(3), createProduct);
router.delete('/', isLoggedIn, checkRole(3), deleteProduct);
router.post('/all', getAllProducts);
router.get('/:id', getProductById);
module.exports = router;
export {};
