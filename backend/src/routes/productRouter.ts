const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');
const checkRole = require('../middelwares/checkRole.ts');
const { addProduct } = require('../controllers/productController.ts');

const router = express.Router();

router.put('/', isLoggedIn, checkRole(3), addProduct);

module.exports = router;
export {};
