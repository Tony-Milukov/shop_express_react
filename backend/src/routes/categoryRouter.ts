const express = require('express');

const router = express.Router();
const {
  addCategory, deleteCategory, getAllCategories, getCategoryById,
} = require('../controllers/categoryController.ts');

router.put('/', addCategory);
router.delete('/', deleteCategory);
router.post('/all', getAllCategories);
router.post('/', getCategoryById);
module.exports = router;
export {};
