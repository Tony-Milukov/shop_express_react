const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createOrder, updateCustomStatus, deleteCustomStatus, updateOrderStatus, getOrderById, getAllOrdersForUser, updateDeliveryInfo, getAllOrders, getAllCustomStatuses,
} = require('../controllers/orderController.ts');

// user
router.put('/', createOrder);
// admin can see all, user only itself
router.get('/:orderId', getOrderById);
router.get('/user/all', getAllOrdersForUser);
router.post('/user/:userId', getAllOrdersForUser);

// admin
router.put('/customStatus', checkRole(process.env.ADMIN_ROLE), updateCustomStatus);
router.post('/all', checkRole(process.env.ADMIN_ROLE), getAllOrders);
router.put('/delivery', checkRole(process.env.ADMIN_ROLE), updateDeliveryInfo);
router.put('/status', checkRole(process.env.ADMIN_ROLE), updateOrderStatus);
router.delete('/customStatus', checkRole(process.env.ADMIN_ROLE), deleteCustomStatus);
router.post('/customStatus/all', checkRole(process.env.ADMIN_ROLE), getAllCustomStatuses);
module.exports = router;
export {};
