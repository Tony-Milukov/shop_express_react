const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createOrder, updateCustomStatus, deleteCustomStatus,
} = require('../controllers/orderController.ts');

// user
router.put('/', createOrder);

// admin
router.put('/customStatus', checkRole(process.env.ADMIN_ROLE), updateCustomStatus);
router.delete('/customStatus', checkRole(process.env.ADMIN_ROLE), deleteCustomStatus);
module.exports = router;
export {};
