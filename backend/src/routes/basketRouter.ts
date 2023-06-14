const express = require('express');

const router = express.Router();
const {
  createBasket,
  deleteBasket,
  getBasketById,
  deleteProduct,
  addProduct,
  getUserBaskets,
  clearBasketById,
} = require('../controllers/basketController.ts');

router.put('/', createBasket);
router.get('/user', getUserBaskets);
router.delete('/', deleteBasket);
router.post('/', getBasketById);
router.put('/product', addProduct);
router.delete('/product/:productId/:basketId/:all?', deleteProduct);
router.delete('/clear/:basketId', clearBasketById);
module.exports = router;
export {};
