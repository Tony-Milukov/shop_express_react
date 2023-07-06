const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createOrder, updateCustomStatus, deleteCustomStatus, addOrderStatus, getOrderById, deleteOrderStatus, getAllOrdersForUser, updateDeliveryInfo, getAllOrders, getAllCustomStatuses,
} = require('../controllers/orderController.ts');

// user
router.put('/', createOrder);

// admin can see all, user only itself
router.get('/id/:orderId', getOrderById);
router.get('/user/:userId?', getAllOrdersForUser);

// admin
router.put('/customStatus', checkRole(process.env.ADMIN_ROLE), updateCustomStatus);
router.post('/all', checkRole(process.env.ADMIN_ROLE), getAllOrders);
router.put('/delivery', checkRole(process.env.ADMIN_ROLE), updateDeliveryInfo);
router.put('/status', checkRole(process.env.ADMIN_ROLE), addOrderStatus);
router.delete('/status/:orderId/:statusId', checkRole(process.env.ADMIN_ROLE), deleteOrderStatus);
router.delete('/customStatus/:statusId', checkRole(process.env.ADMIN_ROLE), deleteCustomStatus);
router.post('/customStatus/all', checkRole(process.env.ADMIN_ROLE), getAllCustomStatuses);
module.exports = router;
export {};
