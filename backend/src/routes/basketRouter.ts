const express = require('express');

const router = express.Router();
const {
  createBasket, deleteBasket, getBasketById, deleteProduct, addProduct,
} = require('../controllers/basketController.ts');

router.put('/', createBasket);
router.delete('/', deleteBasket);
router.post('/', getBasketById);
router.put('/product', addProduct);
router.delete('/product', deleteProduct);
module.exports = router;
export {};
