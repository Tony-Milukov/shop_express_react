const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');
const checkRole = require('../middelwares/checkRole.ts');
const {
  createProduct, getAllProducts, deleteProduct, getProductById,
} = require('../controllers/productController.ts');

const router = express.Router();

// users
router.post('/all', getAllProducts);
router.get('/:id', getProductById);

// admins

router.put('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), createProduct);
router.delete('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), deleteProduct);
module.exports = router;
export {};
