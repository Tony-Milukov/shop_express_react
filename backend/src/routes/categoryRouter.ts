const express = require('express');

const router = express.Router();
const { addCategory, deleteCategory } = require('../controllers/categoryController.ts');

router.put('/', addCategory);
router.delete('/', deleteCategory);
module.exports = router;
export {};
