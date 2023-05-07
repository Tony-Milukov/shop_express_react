const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createOrder, updateCustomStatus, deleteCustomStatus, updateOrderStatus, getOrderById, getAllOrders, updateDeliveryInfo,
} = require('../controllers/orderController.ts');

// user
router.put('/', createOrder);
// admin can see all, user only itself
router.post('/', getOrderById);
router.post('/all', getAllOrders);
router.post('/user/:userId', getAllOrders);
// admin
router.put('/customStatus', checkRole(process.env.ADMIN_ROLE), updateCustomStatus);
router.put('/delivery', checkRole(process.env.ADMIN_ROLE), updateDeliveryInfo);
router.put('/status', checkRole(process.env.ADMIN_ROLE), updateOrderStatus);
router.delete('/customStatus', checkRole(process.env.ADMIN_ROLE), deleteCustomStatus);
module.exports = router;
export {};
