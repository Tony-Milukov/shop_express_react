const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const router = express.Router();
const {
  addCategory, deleteCategory, getAllCategories, getCategoryById,
} = require('../controllers/categoryController.ts');

// admin
router.put('/', isLoggedIn, checkRole(3), addCategory);
router.delete('/', isLoggedIn, checkRole(3), deleteCategory);

// user
router.post('/all', getAllCategories);
router.get('/:id', getCategoryById);
module.exports = router;
export {};
