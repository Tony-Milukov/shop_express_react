const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const router = express.Router();
const {
  addCategory, deleteCategory, getAllCategories, getCategoryById,
} = require('../controllers/categoryController.ts');

// admin
router.put('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), addCategory);
router.delete('/:categoryId', isLoggedIn, checkRole(process.env.ADMIN_ROLE), deleteCategory);

// user
router.post('/all', getAllCategories);
router.get('/:id/:products?', getCategoryById);

module.exports = router;
export {};
